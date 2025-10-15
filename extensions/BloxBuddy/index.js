(async function () {
    // Add the BloxBuddy stylesheet
    var style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    if(document.currentScript.src.includes('localhost')) {
        style.href = 'http://localhost:4000/bloxbuddy.css';
    } else {
        style.href = 'https://extensions.netsblox.org/extensions/BloxBuddy/bloxbuddy.css';
    }
    document.head.appendChild(style);

    function promptAPIKey() {
        const key = prompt('Enter API Key');
        if (key) {
            localStorage.setItem('openai-api-key', key);
        }
    }

    const isLocal = document.currentScript.src.includes('localhost');
    
    // Function to load a script and return a promise that resolves when it's loaded
    function loadScript(src) {
        const script = document.createElement('script');
        script.src = isLocal ? `http://localhost:4000/${src}` : `https://extensions.netsblox.org/extensions/BloxBuddy/${src}`;
        document.head.appendChild(script);
        return new Promise((resolve) => {
            script.onload = resolve;
        });
    }

    const scripts = ['ui.js', 'prompts.js', 'utils.js'];
    const scriptPromises = scripts.map(src => loadScript(src));

    var script = document.createElement('script');

    script.onload = async function () {
    window.BloxBuddyCurrentChat = [{ role: 'system', content: "" }];

    window.BloxBuddyMainModel = 'gemini-2.5-flash';
    window.BloxBuddyChatRefinerModel = 'learnlm-2.0-flash-experimental';

    window.BloxBuddyResetChat = function() {
        window.BloxBuddyCurrentChat = [{ role: 'system', content: "" }];

        // Remove all chat messages
        var messages = document.querySelectorAll('.bloxbuddy-chat-message');
        for(let i = 0; i < messages.length; i++) {
            messages[i].remove();
        }

        var responseBtns = document.querySelectorAll('.bloxbuddy-response-btn');
        for(let i = 0; i < responseBtns.length; i++) {
            responseBtns[i].remove();
        }

        window.BloxBuddyUI.addChatMessage('Hello! How can I help you today?');

        // Add the system message and remove the first message
        window.BloxBuddyCurrentChat = [{ role: 'system', content: "" }];

        window.BloxBuddyUI.addResponseButtons(window.BloxBuddyPrompts.defaultQuestions);
    }

    await Promise.all(scriptPromises);

    class BloxBuddy extends Extension {
        constructor(ide) {
            super('BloxBuddy');
            this.ide = ide;

            // Require an API key
            let apiKey = localStorage.getItem('openai-api-key');
            if (!apiKey) {
                promptAPIKey();
            }

            // Initialize UI (ui.js exposes window.BloxBuddyUI)
            try {
                if (window.BloxBuddyUI) {
                    window.BloxBuddyUI.initUI();
                }
            } catch (e) { console.error(e); }

            // Start chat state
            window.BloxBuddyResetChat();
        }

        onOpenRole() {
            console.log('onOpenRole');
            setTimeout(() => {
                window.BloxBuddyResetChat();
            }, 1000);
        }

        getMenu() {
            var options = {
                'Print current sprite scripts': function () {
                    let activeScripts = NetsBloxExtensions.ide.getActiveScripts().children;

                    let output = currentSpriteScriptsToCode(activeScripts);

                    console.log(output);
                },
                'Print All Scripts': function () {
                    let output = allScriptsToCode();
                    console.log(output);
                },
                'Set API Key...': function () {
                    promptAPIKey();
                },
                // 'Set OpenAI Text Model...': function () {
                //     const model = prompt('Enter OpenAI Model');
                //     if (model) {
                //         localStorage.setItem('openai-model', model);
                //     }
                // },
                'Set API Endpoint...': function () {
                    const endpoint = prompt('Enter OpenAI compatible API Endpoint');
                    if (endpoint) {
                        localStorage.setItem('openai-endpoint', endpoint);
                    }
                },
            };

            return options;
        }

        getCategories() {
            return [];
        }

        getPalette() {
            return [];
        }

        getBlocks() {
            return [];
        }

        getLabelParts() {
            return [];
        }

        onRunScripts() {
            console.log('onRunScripts');    
        }

        onStopAllScripts() {
            console.log('onStopAllScripts');    
        }

        onPauseAll() {
            console.log('onPauseAll');    
        }

        onResumeAll() {
            console.log('onResumeAll');    
        }

        onNewSprite() {
            console.log('onNewSprite');    
        }

        onSetStageSize() {
            console.log('onSetStageSize');    
        } 

        onRenameSprite(spriteID, name) {
            console.log('sprite ' + spriteID + ' new name: ' + name);    
        } 
    }

    window.BloxBuddyCompletion = async function(dialog, modelOverride = null) {
        dialog = window.BloxBuddyUtils.parseDialog(dialog);
        const { apiKey, model, endpoint } = window.BloxBuddyUtils.getSettings();
        try {
            const res = await fetch(`${endpoint}chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: modelOverride ?? model,
                    messages: dialog,
                    response_format: { type: 'json_object' },
                }),
            });
            const data = await res.json();
            return data.choices[0].message.content;
        } catch (e) {
            console.error(e);
            throw Error('Error generating response');
        }
    }

    NetsBloxExtensions.register(BloxBuddy);
}

    // Check if we are running locally
    if(document.currentScript.src.includes('localhost')) {
        script.src = 'http://localhost:4000/blockstocode.js';
    } else {
        script.src = 'https://extensions.netsblox.org/extensions/BloxBuddy/blockstocode.js';
    }
    
    document.head.appendChild(script);
})();
