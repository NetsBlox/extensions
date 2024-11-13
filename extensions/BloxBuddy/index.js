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

    class BloxBuddy extends Extension {
        constructor(ide) {
            super('BloxBuddy');
            this.ide = ide;

            this.currentChat = [];

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

                    for(let i = 0; i < activeScripts.length; i++) {
                        let tempProcess = new Process(activeScripts[i], null, null, null);
                        
                        if(tempProcess.topBlock instanceof HatBlockMorph){
                            let {hatBlockName, code} = processToCode(tempProcess);

                            console.log(hatBlockName, code);
                        }
                    }
                },
                'Print All Scripts': function () {
                    let sprites = NetsBloxExtensions.ide.sprites.asArray();
                    let output = '';

                    const globalVars = Object.keys(NetsBloxExtensions.ide.stage.globalVariables().vars);
                    if(globalVars.length > 0) {
                        output += 'Global Variables: ' + globalVars.join(', ') + '\n';
                    }
                    
                    const msgTypes = Object.keys(NetsBloxExtensions.ide.stage.messageTypes.msgTypes);
                    if(msgTypes.length > 0) {
                        let msgDescs = msgTypes.map(type => {
                            let t = NetsBloxExtensions.ide.stage.messageTypes.msgTypes[type];

                            return t.name + ' (' + t.fields.join(', ') + ')';
                        });
                        output += 'Message Types: ' + msgDescs.join(', ') + '\n';
                    }


                    const globalCustomBlocks = NetsBloxExtensions.ide.stage.globalBlocks;
                    if(globalCustomBlocks.length > 0) {
                        let tempProcess = new Process(null, null, null, null);
                        for(let i = 0; i < globalCustomBlocks.length; i++) {
                            output += '\nGlobal Custom Block: ' + globalCustomBlocks[i].spec + '\n';
                            output += blocksToCode.call(tempProcess, globalCustomBlocks[i].body) + '\n';
                        }
                    }

                    for(let i = 0; i < sprites.length; i++) {
                        let scripts = sprites[i].scripts.children;
                        sprites[i].edit();

                        output += '\n\nSprite: ' + sprites[i].name + '\n';

                        const vars = Object.keys(sprites[i].variables.vars);
                        if(vars.length > 0) {
                            output += 'Local Variables: ' + vars.join(', ') + '\n';
                        }

                        const customBlocks = sprites[i].customBlocks;
                        if(customBlocks.length > 0) {
                            let tempProcess = new Process(null, null, null, null);
                            for(let i = 0; i < customBlocks.length; i++) {
                                output += '\nLocal Custom Block: ' + customBlocks[i].spec + '\n';
                                output += blocksToCode.call(tempProcess, customBlocks[i].body) + '\n';
                            }
                        }


                        for(let j = 0; j < scripts.length; j++) {
                            let tempProcess = new Process(scripts[j], null, null, null);
                            
                            if(tempProcess.topBlock instanceof HatBlockMorph){
                                let {hatBlockName, code} = processToCode(tempProcess);

                                output += hatBlockName + "\n";
                                output += code + "\n";
                            }
                        }

                    }

                    output += '\n\nStage:\n';
                    let stage = NetsBloxExtensions.ide.stage;
                    stage.edit();
                    for(let i = 0; i < stage.scripts.children.length; i++) {
                        let tempProcess = new Process(stage.scripts.children[i], null, null, null);
                        
                        if(tempProcess.topBlock instanceof HatBlockMorph){
                            let {hatBlockName, code} = processToCode(tempProcess);

                            output += hatBlockName + "\n";
                            output += code + "\n";
                        }
                    }

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

    // Function to create a new chat message from the user
    function addChatMessage(text) {
        var message = document.createElement('div');
        message.classList.add('bloxbuddy-chat-message');
        message.textContent = text;
        document.querySelector('.bloxbuddy-chat-content').appendChild(message);
    }

    // Function to create a response button
    function addResponseButton(text) {
        var responseBtn = document.createElement('button');
        responseBtn.classList.add('bloxbuddy-response-btn');
        responseBtn.textContent = text;
        responseBtn.onclick = function() {
            addChatMessage(text); // Add user message to chat when response is clicked
            // Remove response buttons
            var responseBtns = document.querySelectorAll('.bloxbuddy-response-btn');
            for(let i = 0; i < responseBtns.length; i++) {
                responseBtns[i].remove();
            }
            // TODO: Add response from AI
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
        const { apiKey, model } = getSettings();
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

    NetsBloxExtensions.register(BloxBuddy);
})();