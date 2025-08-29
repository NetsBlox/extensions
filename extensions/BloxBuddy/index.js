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

    // Import blockstocode.js and ui.js
    var script = document.createElement('script');
    var uiScript = document.createElement('script');
    var promptsScript = document.createElement('script');

    var uiPromise = new Promise((resolve) => {
        uiScript.onload = resolve;
    });

    var promptsPromise = new Promise((resolve) => {
        promptsScript.onload = resolve;
    });

    if(document.currentScript.src.includes('localhost')) {
        uiScript.src = 'http://localhost:4000/ui.js';
        promptsScript.src = 'http://localhost:4000/prompts.js';
    } else {
        uiScript.src = 'https://extensions.netsblox.org/extensions/BloxBuddy/ui.js';
        promptsScript.src = 'https://extensions.netsblox.org/extensions/BloxBuddy/prompts.js';
    }
    document.head.appendChild(uiScript);
    document.head.appendChild(promptsScript);

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

    await Promise.all([uiPromise, promptsPromise]);

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
            return [
            ];
        }

        getBlocks() {
            
            return [
                
            ];
        }

        getLabelParts() {
            return [
            ];
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

    function parseDialog(dialog) {
        if (typeof(dialog) === 'string') {
            return [{ role: 'system', content: dialog }];
        }

        if(Array.isArray(dialog)) {
            if(dialog.length === 0) {
                throw Error('dialog should not be empty');
            }
            
            if(typeof(dialog[0]) === 'string') {
                // First message is system message, then alternating user and assistant
                let parsed = [{ role: 'system', content: dialog[0] }];
                for(let i = 1; i < dialog.length; i++) {
                    parsed.push({ role: i % 2 === 1 ? 'user' : 'assistant', content: dialog[i] });
                }
                return parsed;
            } else {
                return dialog;
            }
        }


        if (!dialog || !Array.isArray(dialog.contents)) {
            throw Error('prompt should either be text or a list of dialog entries');
        }

        const res = [];
        for (const row of dialog.contents) {
            if (typeof(row) === 'string') {
                res.push({ role: 'user', content: row });
                continue;
            }
            if (!row || !Array.isArray(row.contents) || row.contents.length !== 2) {
                throw Error('dialog entries should either be text or a list of two values: speaker and text');
            }
            const role = row.contents[0].toLowerCase();
            const content = row.contents[1];
            if (!['system', 'user', 'assistant'].some((x) => x === role)) {
                throw Error('speaker must be \'system\', \'user\', or \'assistant\'');
            }
            res.push({ role, content });
        }
        return res;
    }

    function getSettings() {
        const apiKey = localStorage.getItem('openai-api-key');
        const model = localStorage.getItem('openai-model') || 'gpt-3.5-turbo';
        const endpoint = localStorage.getItem('openai-endpoint') || 'https://api.openai.com/v1/';

        if (!apiKey) {
            throw Error('OpenAI API Key not set - see extension menu');
        }

        return { apiKey, model, endpoint };
    }

    window.BloxBuddyCompletion = async function(dialog, modelOverride = null) {
        dialog = parseDialog(dialog);
        const { apiKey, model, endpoint } = getSettings();
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

    function fetchRPCDocumentation(service, func) {
        // Fetch the RPC documentation
        if(service && func) {
            let f = fetch(`https://editor.netsblox.org/docs/services/${service}/index.html`).then(response => response.text());
            
            // Find the function in the documentation
            let funcDoc = f.then(doc => {
                // Parse the documentation
                let parser = new DOMParser();
                let docHTML = parser.parseFromString(doc, 'text/html');

                let funcElement = docHTML.querySelector(`#${service}.${func}`);
                if(funcElement) {
                    return funcElement.textContent;
                } else {
                    return 'Function not found';
                }
            });

            return funcDoc;
        } else if(service) {
            let f = fetch(`https://editor.netsblox.org/docs/services/${service}/index.html`).then(response => response.text());

            // Give just the list of functions
            let funcs = f.then(doc => {
                // Parse the documentation
                let parser = new DOMParser();
                let docHTML = parser.parseFromString(doc, 'text/html');

                let funcList = docHTML.querySelector('#rpcs');
                if(funcList) {
                    return funcList.textContent;
                } else {
                    return 'No functions found';
                }
            });

            return funcs;
        } else {
            let f = fetch(`https://editor.netsblox.org/docs/index.html`).then(response => response.text());

            // Give just the list of services
            let services = f.then(doc => {
                // Parse the documentation
                let parser = new DOMParser();
                let docHTML = parser.parseFromString(doc, 'text/html');

                let serviceList = docHTML.querySelector('#netsblox-documentation');
                if(serviceList) {
                    // Get the list of services
                    serviceList = serviceList.querySelectorAll('.caption');

                    for(let i = 0; i < serviceList.length; i++) {
                        if(serviceList[i].textContent === 'Services') {
                            return serviceList[i].nextElementSibling.textContent;
                        }
                    }

                } else {
                    return 'No services found';
                }
            });

            return f;
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
