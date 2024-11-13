(function () {

    // Import blockstocode.js
    var script = document.createElement('script');

    // Check if we are running locally
    if(document.currentScript.src.includes('localhost')) {
        script.src = 'http://localhost:4000/blockstocode.js';
    } else {
        script.src = 'https://extensions.netsblox.org/extensions/BloxBuddy/blockstocode.js';
    }
    document.head.appendChild(script);

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

    var currentChat = [];

    function enhanceTask(task) {
        if (task === 'Explain my code') {
            task = 
`Explain the code of the project on a conceptual level. 
Do not simply repeat the code back to the user, they want to understand the logic and purpose behind it. You do not need to tell them the names of the sprites or variables, but you should explain what the code is doing and why.
Keep your response concise and easy to understand.`;
        } else if (task === 'What should I do next?') {
            task = 
`Provide guidance on what the user should do next in their project.
Assume that the project is likely incomplete or has significant room for improvement.
This could be a suggestion for a new feature, a bug to fix, or a way to improve their code. 
Be specific and provide clear instructions.`;
        } else if (task === 'What else can I add to my project?') {
            task = 
`Suggest new features or improvements that the user can add to their project. 
This could be a new sprite, a new behavior, or a new interaction. Be creative and think outside the box.
It should be something that is achievable for a beginner and feasible within the constraints of NetsBlox.`;
        } else if (task === 'Can you help me with this bug?') {
            task = 
`Help the user debug a specific issue in their code. 
Do not regurgitate the code back to them, but instead identify the problem and suggest a solution.
If there is an obvious logic error, feel free to point it out and suggest a fix.
Ask for more information if needed, and provide a clear explanation of the problem and how to fix it.`;
        }
        return task;
    }

    function generateSystemMessage() {
        return `
You are a helpful programming assistant for students learning to code in NetsBlox, a block-based programming language based on Snap!, but with additional features for distributed computing tasks.

Some things to keep in mind:
 - The code given to you will be in a LISP-like syntax, with parentheses nested inside each other. The user created this code using blocks in NetsBlox, so assume syntax errors are not present in their code. Logic errors are more likely.
 - Students are not aware of the LISP-like syntax, so you should explain the code in plain English when speaking to them directly.
 - NetsBlox only runs in a web browser, so you can't run the code yourself. You can only read and analyze the code. 
 - Student code may contain bugs. Do not assume that the code is correct, and be prepared to help debug it.
    - Not only may the code contain bugs, but it may also be incomplete or have room for improvement.
 - While distributed computing is a key feature of NetsBlox, you do not need to focus on this aspect of the language. Most student projects will not involve distributed computing.
 - Variables, sprites, message types, and custom blocks are named by the user and may not have any specific meaning. You can refer to them by their type or purpose, but do not assume that the names are accurate or meaningful.

Your task is to help students with their projects, answer questions, and provide guidance on how to improve their code. You can also help debug code and suggest new features to add to their projects.

Their current project is: 
${allScriptsToCode()}

----

Please provide helpful responses to the user based on the information provided above.
Remember that the user is a beginner and may not understand complex programming concepts. 
Keep your responses clear, concise, and easy to understand. Do not overwhelm the user with too much information at once.`;
    }

    class BloxBuddy extends Extension {
        constructor(ide) {
            super('BloxBuddy');
            this.ide = ide;


            // Create the BloxBuddy button
            var btn = document.createElement('button');
            btn.classList.add('bloxbuddy-btn');
            document.body.appendChild(btn);

            // Create the sparkle icon inside the button
            var sparkles = document.createElement('div');
            sparkles.classList.add('bloxbuddy-sparkles');
            sparkles.innerHTML = '✨';
            btn.appendChild(sparkles);

            // Create the chat popup interface
            var chatPopup = document.createElement('div');
            chatPopup.classList.add('bloxbuddy-chat-popup');
            document.body.appendChild(chatPopup);

            // Inner chat popup content
            var chatContent = document.createElement('div');
            chatContent.classList.add('bloxbuddy-chat-content');
            chatPopup.appendChild(chatContent);

            // Optionally, toggle the chat popup display on button click
            btn.addEventListener('click', function() {
                chatPopup.style.display = chatPopup.style.display === 'block' ? 'none' : 'block';
            });

            addChatMessage('Hello! How can I help you today?');
            addResponseButtons(['Explain my code', 'What should I do next?', 'What else can I add to my project?', 'Can you help me with this bug?']);

        }

        onOpenRole() {
            console.log('onOpenRole');
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
                'Set OpenAI API Key...': function () {
                    const key = prompt('Enter OpenAI API Key');
                    if (key) {
                        localStorage.setItem('openai-api-key', key);
                    }
                },
                'Set OpenAI Text Model...': function () {
                    const model = prompt('Enter OpenAI Model');
                    if (model) {
                        localStorage.setItem('openai-model', model);
                    }
                },
                'Set OpenAI API Endpoint...': function () {
                    const endpoint = prompt('Enter OpenAI API Endpoint');
                    if (model) {
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
                new Extension.PaletteCategory(
                    'operators',
                    [
                        new Extension.Palette.Block('blocksToCode'),
                        new Extension.Palette.Block('codeToBlocks'),
                    ],
                    SpriteMorph
                ),
                new Extension.PaletteCategory(
                    'operators',
                    [
                        new Extension.Palette.Block('blocksToCode'),
                        new Extension.Palette.Block('codeToBlocks'),
                    ],
                    StageMorph
                )
            ];
        }

        getBlocks() {
            
            return [
                new Extension.Block(
                    'blocksToCode',
                    'reporter',
                    'operators',
                    'blocks to code %blocks',
                    [],
                    blocksToCode
                ).for(SpriteMorph, StageMorph),
                new Extension.Block(
                    'codeToBlocks',
                    'reporter',
                    'operators',
                    'code to blocks %code',
                    [],
                    codeToBlocks
                ).for(SpriteMorph, StageMorph),
            ];
        }

        getLabelParts() {
            return [
                new Extension.LabelPart(
                    '%code',
                    () => {
                        const part = new InputSlotMorph(
                            null, // text
                            false, // non-numeric
                            null,
                            false
                        );
                        return part;
                    }
                ),
                new Extension.LabelPart(
                    '%blocks',
                    () => {
                        const part = new InputSlotMorph(
                            null, // text
                            false, // non-numeric
                            null,
                            false
                        );
                        return part;
                    }
                ),
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

    // Function to create a new chat message
    function addChatMessage(text, user = false ) {
        var message = document.createElement('div');
        message.classList.add('bloxbuddy-chat-message');

        if(user){
            message.classList.add('bloxbuddy-chat-message-user');
        }

        // Basic Markdown support
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');

        message.innerHTML = text;
        document.querySelector('.bloxbuddy-chat-content').appendChild(message);
    }

    // Function to create a response button
    function addResponseButton(text) {
        var responseBtn = document.createElement('button');
        responseBtn.classList.add('bloxbuddy-response-btn');
        responseBtn.textContent = text;
        responseBtn.onclick = function() {
            addChatMessage(text, true); // Add user message to chat when response is clicked
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

            // Add response from AI
            try {
                let response = completion([generateSystemMessage(), enhanceTask(text)]).then(response => {
                    addChatMessage(response);
                    addResponseButtons(['Explain my code', 'What should I do next?', 'What else can I add to my project?', 'Can you help me with this bug?']);
                    spinnerParent.remove();
                });
            } catch (e) {
                console.error(e);
                addChatMessage('Sorry, I was unable to generate a response. Please try again later.');
                addResponseButtons(['Explain my code', 'What should I do next?', 'What else can I add to my project?', 'Can you help me with this bug?']);
                spinnerParent.remove();
            }
        };
        document.querySelector('.bloxbuddy-chat-content').appendChild(responseBtn);
    }

    function addResponseButtons(responses) {
        for(let i = 0; i < responses.length; i++) {
            addResponseButton(responses[i]);
        }
    }

    function processToCode(tempProcess) {
        let code = blocksToCode.call(tempProcess, tempProcess.topBlock.components());

        let hatBlockParts = tempProcess.topBlock.children.map(child => {
            console.log(child);

            if (child instanceof MessageOutputSlotMorph) {
                return "socket message \"" + child.lastValue + "\"";
            } else if (child instanceof InputSlotMorph) {
                return child.contents().text;
            } else if (child instanceof BlockSymbolMorph) {
                return child.name;
            } else if (child instanceof BooleanSlotMorph) {
                return child.value;
            } else if (child instanceof BlockMorph) {
                if(child.selector == 'receiveSocketMessage'){
                    return '';
                } else {
                    return blocksToCode.call(tempProcess, child.components());
                }
            } else if (child.text) {
                return child.text;
            } else {
                return '';
            }
        });

        // Remove last part
        hatBlockParts.pop();

        let hatBlockName = hatBlockParts.join(' ');
        return {hatBlockName, code};
    }

    function blocksToCode(blocks) {
        if (blocks instanceof Context) {
            blocks = blocks.components();
        }

        if (this.isAST(blocks)) {
            return this.toTextSyntax(blocks).encode();
        }

        return "()";
    }

    /// Must be run inside a Process
    function codeToBlocks(code) {
        if (typeof code === 'string') {
            if (code.trim().startsWith('(')) {
                code = this.parseCode(code);
            }
        } else {
            this.assertType(string, ['command', 'reporter', 'predicate']);
            code = code.components();
        }

        if (this.isAST(code)) {
            return this.assemble(code);
        }

        throw Error("Invalid code");
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

    async function completion(dialog) {
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
                    model: model,
                    messages: dialog,
                }),
            });
            const data = await res.json();
            return data.choices[0].message.content;
        } catch (e) {
            console.error(e);
            throw Error('Error generating response');
        }
    }

    function currentSpriteScriptsToCode(activeScripts) {
        let output = '';
        for (let i = 0; i < activeScripts.length; i++) {
            if(activeScripts[i] instanceof CommentMorph) {
                continue;
            }
            
            let tempProcess = new Process(activeScripts[i], null, null, null);
            
            if (tempProcess.topBlock instanceof HatBlockMorph) {
                let { hatBlockName, code } = processToCode(tempProcess);
                output += hatBlockName + "\n";
                output += code + "\n";
                output += "\n";
            }
        }
        return output;
    }

    function allScriptsToCode() {
        let sprites = NetsBloxExtensions.ide.sprites.asArray();
        let output = '';

        const globalVars = Object.keys(NetsBloxExtensions.ide.stage.globalVariables().vars);
        if (globalVars.length > 0) {
            output += 'Global Variables: ' + globalVars.join(', ') + '\n';
        }

        const msgTypes = Object.keys(NetsBloxExtensions.ide.stage.messageTypes.msgTypes);
        if (msgTypes.length > 0) {
            let msgDescs = msgTypes.map(type => {
                let t = NetsBloxExtensions.ide.stage.messageTypes.msgTypes[type];

                if(t.name == 'message') {
                    return t.name + ' (' + t.fields.join(', ') + ') (default, not added by user)';
                }
                return t.name + ' (' + t.fields.join(', ') + ')';
            });
            output += 'Message Types: ' + msgDescs.join(', ') + '\n';
        }


        const globalCustomBlocks = NetsBloxExtensions.ide.stage.globalBlocks;
        if (globalCustomBlocks.length > 0) {
            let tempProcess = new Process(null, null, null, null);
            for (let i = 0; i < globalCustomBlocks.length; i++) {
                output += '\nGlobal Custom Block: ' + globalCustomBlocks[i].spec + '\n';
                output += blocksToCode.call(tempProcess, globalCustomBlocks[i].body) + '\n';
            }
        }

        const currentSprite = NetsBloxExtensions.ide.currentSprite;

        for (let i = 0; i < sprites.length; i++) {
            let scripts = sprites[i].scripts.children;
            sprites[i].edit();

            output += '\n\nSprite: ' + sprites[i].name + '\n';

            const vars = Object.keys(sprites[i].variables.vars);
            if (vars.length > 0) {
                output += 'Local Variables: ' + vars.join(', ') + '\n';
            }

            const customBlocks = sprites[i].customBlocks;
            if (customBlocks.length > 0) {
                let tempProcess = new Process(null, null, null, null);
                for (let i = 0; i < customBlocks.length; i++) {
                    output += '\nLocal Custom Block: ' + customBlocks[i].spec + '\n';
                    output += blocksToCode.call(tempProcess, customBlocks[i].body) + '\n';
                }
            }

            if (scripts.length === 0) {
                output += 'No scripts\n';
            } else {
                for (let j = 0; j < scripts.length; j++) {
                    if(scripts[j] instanceof CommentMorph) {
                        continue;
                    }

                    let tempProcess = new Process(scripts[j], null, null, null);

                    if (tempProcess.topBlock instanceof HatBlockMorph) {
                        let { hatBlockName, code } = processToCode(tempProcess);

                        output += hatBlockName + "\n";
                        output += code + "\n";
                    }
                }
            }
        }

        output += '\n\nStage:\n';
        let stage = NetsBloxExtensions.ide.stage;
        stage.edit();
        if(stage.scripts.children.length > 0) {
            for (let i = 0; i < stage.scripts.children.length; i++) {
                let tempProcess = new Process(stage.scripts.children[i], null, null, null);

                if (tempProcess.topBlock instanceof HatBlockMorph) {
                    let { hatBlockName, code } = processToCode(tempProcess);

                    output += hatBlockName + "\n";
                    output += code + "\n";
                }
            }
        } else {
            output += 'No scripts on stage\n';
        }

        currentSprite.edit();

        return output;
    }


    NetsBloxExtensions.register(BloxBuddy);
})();
