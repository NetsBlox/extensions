(function () {
    const UI = {};

    function promptAPIKey() {
        const key = prompt('Enter OpenAI API Key');
        if (key) {
            localStorage.setItem('openai-api-key', key);
        } else {
            alert('API Key is required to use BloxBuddy');
        }
    }

    function createToggleButton() {
        var btn = document.createElement('button');
        btn.classList.add('bloxbuddy-btn');

        // Sparkles icon
        var sparkles = document.createElement('div');
        sparkles.classList.add('bloxbuddy-sparkles');
        sparkles.innerHTML = '✨';
        btn.appendChild(sparkles);

        return btn;
    }

    function createChatPopup() {
        var chatPopup = document.createElement('div');
        chatPopup.classList.add('bloxbuddy-chat-popup');

        var chatContent = document.createElement('div');
        chatContent.classList.add('bloxbuddy-chat-content');
        chatPopup.appendChild(chatContent);

        return { chatPopup, chatContent };
    }

    function initUI() {
        if (UI.inited) return UI;

        var btn = createToggleButton();
        document.body.appendChild(btn);

        var { chatPopup, chatContent } = createChatPopup();
        document.body.appendChild(chatPopup);

        btn.addEventListener('click', function() {
            chatPopup.style.display = chatPopup.style.display === 'block' ? 'none' : 'block';
        });

        let apiKey = localStorage.getItem('openai-api-key');
        if (!apiKey) {
            promptAPIKey();
            apiKey = localStorage.getItem('openai-api-key');
        }

        UI.button = btn;
        UI.chatPopup = chatPopup;
        UI.chatContent = chatContent;
        UI.inited = true;

        return UI;
    }

    function addChatMessage(text, user = false ) {
        var message = document.createElement('div');
        message.classList.add('bloxbuddy-chat-message');

        if(user){
            message.classList.add('bloxbuddy-chat-message-user');
        }

        function escapeHtml(unsafe) {
            return unsafe
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }

        text = escapeHtml(text);
        
        // Basic Markdown support
        text = text.replace(/\n/g, '<br>');
        text = text.replace(/\\n/g, '<br>');
        text = text.replace(/\*\*(\S.*?)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/\*(\S.*?)\*/g, '<em>$1</em>');
        text = text.replace(/\n\*\s+/g, '<br> &bull; ');

        message.innerHTML = text;
        document.querySelector('.bloxbuddy-chat-content').appendChild(message);
        if(user) {
            try { window.BloxBuddyCurrentChat.push({ role: 'user', content: window.BloxBuddyPrompts.enhanceTask(text) }); } catch(e) { console.error(e); }
        } else {
            try { window.BloxBuddyCurrentChat.push({ role: 'assistant', content: text }); } catch(e) { console.error(e); }

            var buttons = document.createElement('div');
            buttons.classList.add('bloxbuddy-message-buttons');
            
            if(window.speechSynthesis) {
                var readBtn = document.createElement('button');
                readBtn.classList.add('bloxbuddy-read-btn');
                readBtn.textContent = '🔊';

                readBtn.onclick = function() {
                    speechSynthesis.cancel();
                    const utterance = new SpeechSynthesisUtterance(text);
                    speechSynthesis.speak(utterance);
                }
                buttons.appendChild(readBtn);
            }
            
            message.appendChild(buttons);
        }

        console.log(window.BloxBuddyCurrentChat);
    }

    function addResponseButton(text) {
        var responseBtn = document.createElement('button');
        responseBtn.classList.add('bloxbuddy-response-btn');
        responseBtn.textContent = text;
        responseBtn.onclick = function() {
            // delegate to existing completion flow in index.js by adding the user message and letting
            // the rest of the logic (which relies on globals) handle the response.
            addChatMessage(text, true);

            // Remove response buttons
            var responseBtns = document.querySelectorAll('.bloxbuddy-response-btn');
            for(let i = 0; i < responseBtns.length; i++) {
                responseBtns[i].remove();
            }

            // Add spinner
            var spinner = document.createElement('div');
            spinner.classList.add('bloxbuddy-spinner');
            var spinnerParent = document.createElement('div');
            spinnerParent.classList.add('bloxbuddy-spinner-parent');
            spinnerParent.appendChild(spinner);
            document.querySelector('.bloxbuddy-chat-content').appendChild(spinnerParent);

            try {
                window.BloxBuddyCurrentChat[0].content = window.BloxBuddyPrompts.generateSystemMessage();
                let response = window.BloxBuddyCompletion(window.BloxBuddyCurrentChat, window.BloxBuddyMainModel).then(async response => {
                    console.log(response);

                    async function cleanAndParse(resp) {
                        if (typeof resp !== 'string') return resp;
                        let s = resp.replace(/^```(json)?/, '').trim().replace(/```$/, '').trim();
                        console.log(s);
                        return JSON.parse(s);
                    }

                    let parsed;
                    try {
                        parsed = await cleanAndParse(response);
                        console.log(parsed);
                    } catch (e) {
                        console.error('Failed to parse initial response', e);
                        throw e;
                    }

                    // Process tool chain until there's no tool requested
                    while (parsed && parsed.tool) {
                        let toolResult = 'Unknown tool';

                        switch (parsed.tool) {
                            case 'rpcdoc':
                                if (parsed.service && parsed.function) {
                                    toolResult = window.BloxBuddyUtils.fetchRPCDocumentation(parsed.service, parsed.function);
                                } else if (parsed.service) {
                                    toolResult = window.BloxBuddyUtils.fetchRPCDocumentation(parsed.service);
                                } else {
                                    toolResult = window.BloxBuddyUtils.fetchRPCDocumentation();
                                }
                                break;
                            default:
                                toolResult = 'Unknown tool';
                                break;
                        }

                        try {
                            if (toolResult instanceof Promise) {
                                toolResult = await toolResult;
                            }
                        } catch (e) {
                            console.error('Tool execution failed', e);
                            toolResult = `Tool error: ${e.message || e}`;
                        }

                        // Normalize tool result to string for chat and push it so the model can consume it
                        const toolContent = (typeof toolResult === 'string') ? toolResult : JSON.stringify(toolResult, null, 2);
                        console.log('Tool result:', toolContent);
                        window.BloxBuddyCurrentChat.push({ role: 'user', content: toolContent });

                        // Ask the model to continue from updated chat
                        try {
                            response = await window.BloxBuddyCompletion(window.BloxBuddyCurrentChat);
                        } catch (e) {
                            console.error('Model call after tool failed', e);
                            throw e;
                        }

                        try {
                            parsed = await cleanAndParse(response);
                            console.log(parsed);
                        } catch (e) {
                            console.error('Failed to parse response after tool', e);
                            throw e;
                        }
                    }

                    // No tool requested — return the final parsed object
                    return parsed;
                }).catch(e => {
                    console.error(e);
                    window.BloxBuddyUI.addChatMessage('Sorry, I was unable to generate a response. Please try again later.');
                    window.BloxBuddyUI.addResponseButtons(window.BloxBuddyPrompts.defaultQuestions);
                    spinnerParent.remove();
                }).then(response => {
                    let parsed = response;

                    if(typeof(parsed) === 'string') {
                        console.log(response);
                        response = response.replace(/^```(json)?/, '').trim().replace(/```$/, '').trim();
                        console.log(response);
                        parsed = JSON.parse(response);
                        console.log(parsed);
                    }

                    window.BloxBuddyCompletion([
                        { role: 'system', content: window.BloxBuddyPrompts.generateSystemMessage() },
                        { role: 'user', content: `
Rewrite the following text so that it would be easier to read for a student in middle school:

${parsed.response}

Continuations (if any):
${parsed.continuation ? (Array.isArray(parsed.continuation) ? parsed.continuation.map(c => '- ' + c).join('\n') : '- ' + parsed.continuation) : 'None'}

---

Note that the student will not see the original text, only the rewritten version. The goal is to make the text more accessible and easier to understand for a beginner. Be friendly but not overly poetic or too excited.
Keep in mind that the student is may not understand complex programming concepts, and that the response should be clear, concise, and easy to understand.
However, terms like "variable" or "function" are fine to use, along with NetsBlox-specific terms like "RPC" or "service".
If the original text includes code, you should explain the code in plain English when speaking to the student directly and DO NOT include the code in your response.
Do not try to use tools. Tools are not available to you in this response. Assume the original text is correct regarding RPCs and services.
Do not start your response with "Sure!" or "Here is a simplified version of the text you provided" or similar phrases. Just provide the rewritten text.

Also include possible continuations in the response, if relevant. It is acceptable to not include any continuations if none are relevant to end the conversation.
Write the continuations so that the student will understand what they mean, but they must remain short. Please limit the number of them when possible, so that the conversation remains focused and short. The student will know how to explore on their own without you offering to do it for them.
DO NOT turn continuations into questions if they are not questions in the original text.
DO NOT include continuations in the "response" section of the json. Include the continuations only under the "continuation" key in the json.
The user should start a new conversation if they need more help. No need to let the user go off on tangents. Do not ask for free-form text input from the user, as this is not supported. All interactions should be guided by the options you provide in the "continuation" field. Make sure to only provide continuations that you are confident the user will understand and you be able to respond accurately to.

Remember to keep our guidelines for them in mind.

Please keep responses short. Convey necessary information in a concise manner. Don't be overly verbose or wordy or the student may lose interest, but do not change details or meaning of the original text.
`
                        },
                    ], window.BloxBuddyChatRefinerModel).then(refined => {
                        console.log(refined);
                        refined = refined.replace(/^```(json)?/, '').trim().replace(/```$/, '').trim();
                        refined = JSON.parse(refined);
                        
                        parsed.response = refined.response;
                        parsed.continuation = refined.continuation;

                        window.BloxBuddyUI.addChatMessage(parsed.response);

                        if(parsed.continuation) {
                            if(typeof(parsed.continuation) === 'string') {
                                window.BloxBuddyUI.addResponseButton(parsed.continuation);
                            } else if (Array.isArray(parsed.continuation)) {
                                window.BloxBuddyUI.addResponseButtons(parsed.continuation);
                            } else {
                                window.BloxBuddyUI.addResponseButtons(window.BloxBuddyPrompts.defaultQuestions);
                            }
                        } else {
                            window.BloxBuddyUI.addResponseButtons(window.BloxBuddyPrompts.defaultQuestions);
                        }
                        
                        spinnerParent.remove();
                    }).catch(e => {
                        console.error(e);
                        window.BloxBuddyUI.addChatMessage(parsed.response);

                        if(parsed.continuation) {
                            if(typeof(parsed.continuation) === 'string') {
                                window.BloxBuddyUI.addResponseButton(parsed.continuation);
                            } else if (Array.isArray(parsed.continuation)) {
                                window.BloxBuddyUI.addResponseButtons(parsed.continuation);
                            } else {
                                window.BloxBuddyUI.addResponseButtons(window.BloxBuddyPrompts.defaultQuestions);
                            }
                        }
                    });
                });
            } catch (e) {
                console.error(e);
                window.BloxBuddyUI.addChatMessage('Sorry, I was unable to generate a response. Please try again later.');
                window.BloxBuddyUI.addResponseButtons(window.BloxBuddyPrompts.defaultQuestions);
                try { spinnerParent.remove(); } catch(e) {}
            }
        };
        document.querySelector('.bloxbuddy-chat-content').appendChild(responseBtn);
    }

    function addResponseButtons(responses) {
        for(let i = 0; i < responses.length; i++) {
            addResponseButton(responses[i]);
        }

        // Add start over button
        try {
            if(window.BloxBuddyCurrentChat.length > 1) {
                var startOverBtn = document.createElement('button');
                startOverBtn.classList.add('bloxbuddy-response-btn');
                startOverBtn.textContent = '↺ Start Over';

                startOverBtn.onclick = function() {
                    if (window.BloxBuddyResetChat) window.BloxBuddyResetChat();
                }

                document.querySelector('.bloxbuddy-chat-content').appendChild(startOverBtn);
            }
        } catch(e) { console.error(e); }

    }

    function clearMessages() {
        var messages = document.querySelectorAll('.bloxbuddy-chat-message');
        for(let i = 0; i < messages.length; i++) {
            messages[i].remove();
        }

        var responseBtns = document.querySelectorAll('.bloxbuddy-response-btn');
        for(let i = 0; i < responseBtns.length; i++) {
            responseBtns[i].remove();
        }
    }

    function teardown() {
        if (UI.button && UI.button.parentNode) UI.button.remove();
        if (UI.chatPopup && UI.chatPopup.parentNode) UI.chatPopup.remove();
        UI.button = null;
        UI.chatPopup = null;
        UI.chatContent = null;
        UI.inited = false;
    }

    UI.initUI = initUI;
    UI.addChatMessage = addChatMessage;
    UI.addResponseButton = addResponseButton;
    UI.addResponseButtons = addResponseButtons;
    UI.clearMessages = clearMessages;
    UI.teardown = teardown;
    UI.promptAPIKey = promptAPIKey;

    window.BloxBuddyUI = UI;
})();
