(function () {
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

    // Import blockstocode.js
    var script = document.createElement('script');

script.onload = function () {
    var currentChat = [{ role: 'system', content: "" }];

    const chatRefinerModel = 'learnlm-1.5-pro-experimental';

    function resetChat() {
        currentChat = [{ role: 'system', content: "" }];

        // Remove all chat messages
        var messages = document.querySelectorAll('.bloxbuddy-chat-message');
        for(let i = 0; i < messages.length; i++) {
            messages[i].remove();
        }

        var responseBtns = document.querySelectorAll('.bloxbuddy-response-btn');
        for(let i = 0; i < responseBtns.length; i++) {
            responseBtns[i].remove();
        }

        addChatMessage('Hello! How can I help you today?');

        // Add the system message and remove the first message
        currentChat = [{ role: 'system', content: "" }];

        addResponseButtons(['Explain my code', 'What should I do next?', 'What else can I add to my project?', 'Can you help me with this bug?']);
    }

    function enhanceTask(task) {
        if (task === 'Explain my code') {
            task = 
`Explain the code of the project on a conceptual level. 
Do not simply repeat the code back to the user, they want to understand the logic and purpose behind it. You do not need to tell them the names of the sprites or variables, but you should explain what the code is doing and why.
Keep your response concise and easy to understand.

The response in your JSON output should be a string that explains the code succinctly in plain English.`;
        } else if (task === 'What should I do next?') {
            task = 
`Provide guidance on what the user should do next in their project.
Assume that the project is likely incomplete or has significant room for improvement.
This could be a suggestion for a new feature, a bug to fix, or a way to improve their code. 
Be specific and provide clear instructions.

The response in your JSON output should be a string that suggests a specific next step for the user to take.`;
        } else if (task === 'What else can I add to my project?') {
            task = 
`Suggest new features or improvements that the user can add to their project. 
This could be a new sprite, a new behavior, or a new interaction. Be creative and think outside the box.
It should be something that is achievable for a beginner and feasible within the constraints of NetsBlox.

The response in your JSON output should be a list of 3-4 strings that suggests new features or improvements for the user to add to their project.`;
        } else if (task === 'Can you help me with this bug?') {
            task = 
`Help the user debug a specific issue in their code. 
Do not regurgitate the code back to them, but instead identify the problem and suggest a solution.
If there is an obvious logic error, feel free to point it out and suggest a fix.
Ask for more information if needed, and provide a clear explanation of the problem and how to fix it.

The response in your JSON output should be a string that identifies the bug and suggests a solution if possible.`;
        }
        return task;
    }

    function generateSystemMessage() {
        return `
You are a helpful programming assistant (who responds in JSON) for students learning to code in NetsBlox, a block-based programming language based on Snap!, but with additional features for distributed computing tasks.

NetsBlox, has the same categories of blocks as Snap!: Motion, Looks, Music, Pen, Control, Sensing, Operators, and Variables, with the addition of a category for Network blocks (and a "Custom" category for all custom blocks). In general, they work very similarly outside of the Network blocks.

The blocks are as follows (note that some parts starting with % are inputs and some are symbols):

Motion (only available on Sprites, not available on Stage)
    forward - move %n steps
    turn - turn %clockwise %n degrees
    turnLeft - turn %counterclockwise %n degrees
    setHeading - point in direction %dir
    doFaceTowards - point towards %dst
    gotoXY - go to x: %n y: %n
    doGotoObject - go to %dst
    doGlide - glide %n secs to x: %n y: %n
    changeXPosition - change x by %n
    setXPosition - set x to %n
    changeYPosition - change y by %n
    setYPosition - set y to %n
    bounceOffEdge - if on edge, bounce
    xPosition - x position
    yPosition - y position
    direction - direction
Looks
    doSwitchToCostume - switch to costume %cst
    doWearNextCostume - next costume
    getCostumeIdx - costume #
    reportGetImageAttribute - %img of costume %cst
    reportNewCostume - new costume %l width %dim height %dim
    reportNewCostumeStretched - stretch %cst x: %n y: %n %
    doSayFor - say %s for %n secs
    bubble - say %s
    doThinkFor - think %s for %n secs
    doThink - think %s
    changeEffect - change %eff effect by %n
    setEffect - set %eff effect to %n
    getEffect - %eff effect
    clearEffects - clear graphic effects
    changeScale - change size by %n
    setScale - set size to %n %
    getScale - size
    show - show
    hide - hide
    reportShown - shown?
    goToLayer - go to %layer layer
    goBack - go back %n layers
Music
    playSound - play sound %snd
    doPlaySoundUntilDone - play sound %snd until done
    doPlaySoundAtRate - play sound %snd at %rate Hz
    doStopAllSounds - stop all sounds
    reportGetSoundAttribute - %aa of sound %snd
    reportNewSoundFromSamples - new sound %l rate %rate Hz
    doRest - rest for %n beats
    doPlayNote - play note %note for %n beats
    doSetInstrument - set instrument to %inst
    doChangeTempo - change tempo by %n
    doSetTempo - set tempo to %n bpm
    getTempo - tempo
    changeVolume - change volume by %n
    setVolume - set volume to %n %
    getVolume - volume
    changePan - change balance by %n
    setPan - set balance to %n
    getPan - balance
    playFreq - play frequency %n Hz
    stopFreq - stop frequency
Pen
    clear - clear
    down - pen down
    up - pen up
    getPenDown - pen down?
    setColor - set pen color to %clr
    setPenColorDimension - set pen %clrdim to %n
    changePenColorDimension - change pen %clrdim by %n
    getPenAttribute - pen %pen
    setBackgroundColor - set background color to %clr
    setBackgroundColorDimension - set background %clrdim to %n
    changeBackgroundColorDimension - change background %clrdim by %n
    changeSize - change pen size by %n
    setSize - set pen size to %n
    doStamp - stamp
    floodFill - fill
    write - write %s size %n
    reportPenTrailsAsCostume - pen trails
    reportPentrailsAsSVG - pen vectors
    doPasteOn - paste on %spr
Control
    receiveGo - when %greenflag clicked
    receiveKey - when %keyHat key pressed
    receiveInteraction - when I am %interaction
    receiveMessage - when I receive %msgHat
    receiveCondition - when %b
    doBroadcast - broadcast %msg
    doBroadcastAndWait - broadcast %msg and wait
    getLastMessage - message
    doSend - send %msg to %spr
    doWait - wait %n secs
    doWaitUntil - wait until %b
    doForever - forever %loop
    doRepeat - repeat %n %loop
    doUntil - repeat until %b %loop
    doFor - for %upvar = %n to %n %cla
    doIf - if %b %c
    doIfElse - if %b %c else %c
    reportIfElse - if %b then %s else %s
    doStopThis - stop %stopChoices
    doRun - run %cmdRing %inputs
    fork - launch %cmdRing %inputs
    evaluate - call %repRing %inputs
    doReport - report %s
    doCallCC - run %cmdRing w/continuation
    reportCallCC - call %cmdRing w/continuation
    doWarp - warp %c
    doTryCatch - try %cla if error %upvar %cla
    doThrow - error %s
Sensing
    reportTouchingObject - touching %col ?
    reportTouchingColor - touching %clr ?
    reportColorIsTouchingColor - color %clr is touching %clr ?
    reportAspect - %asp at %loc
    doAsk - ask %s and wait
    getLastAnswer - answer
    reportMouseX - mouse x
    reportMouseY - mouse y
    reportMouseDown - mouse down?
    reportKeyPressed - key %key pressed?
    reportRelationTo - %rel to %dst
    doResetTimer - reset timer
    getTimer - timer
    reportAttributeOf - %att of %spr
    doSetGlobalFlag - set %setting to %b
    reportGlobalFlag - is %setting on?
    reportDate - current %dates
    reportGet - my %get
    reportAudio - microphone %audio
    reportLatitude - my latitude
    reportLongitude - my longitude
    reportStageWidth - stage width
    reportStageHeight - stage height
    reportImageOfObject - image of %self
    reportUsername - username
    doSetVideoTransparency - set video transparency to %n
    reportVideo - video %vid on %self
Operators
    reifyScript - %rc %ringparms
    reifyReporter - %rr %ringparms
    reifyPredicate - %rp %ringparms
    reportSum - %n + %n
    reportVariadicSum - %sum
    reportDifference - %n \u2212 %n
    reportProduct - %n * %n
    reportVariadicProduct - %product
    reportQuotient - %n / %n
    reportRound - round %n
    reportMonadic - %fun of %n
    reportPower - %n ^ %n
    reportModulus - %n mod %n
    reportAtan2 - atan2 %n ÷ %n
    reportVariadicMin - %min
    reportVariadicMax - %max
    reportRandom - pick random %n to %n
    reportEquals - %s = %s
    reportNotEquals - %s \u2260 %s
    reportLessThan - %s < %s
    reportLessThanOrEquals - %s \u2264 %s
    reportGreaterThan - %s > %s
    reportGreaterThanOrEquals - %s \u2265 %s
    reportAnd - %b and %b
    reportOr - %b or %b
    reportNot - not %b
    reportBoolean - %bool
    reportFalse - %bool
    reportJoinWords - join %words
    reportLetter - letter %idx of %s
    reportStringSize - length of %s
    reportUnicode - unicode of %s
    reportUnicodeAsLetter - unicode %n as letter
    reportIsA - is %s a %typ ?
    reportIsIdentical - is %s identical to %s ?
    reportTextSplit - split %s by %delim
    reportJSFunction - JavaScript function ( %mult%s ) { %code }
    reportCompiled - compile %repRing for %n args
Variables
    doSetVar - set %var to %s
    doChangeVar - change %var by %n
    doShowVar - show variable %var
    doHideVar - hide variable %var
    doDeclareVariables - script variables %scriptVars
    doDeleteAttr - inherit %shd
    reportNewList - list %exp
    reportCONS - %s in front of %l
    reportListItem - item %idx of %l
    reportCDR - all but first of %l
    reportListAttribute - %la of %l
    reportListContainsItem - %l contains %s
    reportListIsEmpty - is %l empty?
    doAddToList - add %s to %l
    doDeleteFromList - delete %ida of %l
    doInsertInList - insert %s at %idx of %l
    doReplaceInList - replace item %idx of %l with %s
    reportNumbers - numbers from %n to %n
    reportConcatenatedLists - append %lists
    reportCrossproduct - combinations %lists
    reportReshape - reshape %l to %nums
    reportMap - map %repRing over %l
    reportKeep - keep items %predRing from %l
    reportFindFirst - find first item %predRing in %l
    reportCombine - combine %l using %repRing
    doForEach - for each %upvar in %l %cla
Network
    getJSFromRPC - call %s with %s
    getJSFromRPCDropdown - call %serviceNames / %rpcActions with %s
    getJSFromRPCStruct - call %serviceNames / %rpcMethod
    doRunRPC - run %serviceNames / %rpcMethod
    getCostumeFromRPC - costume from %serviceNames / %rpcActions with %s
    reportRPCError - error
    doSocketRequest - send msg %msgInput to %roles and wait
    doSocketResponse - send response %s
    doSocketMessage - send msg %msgInput to %roles
    receiveSocketMessage - when I receive %msgOutput
    getProjectId - role name
    getProjectIds - all role names

----

Some things to keep in mind:
 - The code given to you will be in a LISP-like syntax, with parentheses nested inside each other. The user created this code using blocks in NetsBlox, so assume syntax errors are not present in their code. Logic errors are more likely.
 - Students are not aware of the LISP-like syntax, so you should explain the code in plain English when speaking to them directly.
 - NetsBlox only runs in a web browser, so you can't run the code yourself. You can only read and analyze the code. 
 - Student code may contain bugs. Do not assume that the code is correct, and be prepared to help debug it.
    - Not only may the code contain bugs, but it may also be incomplete or have room for improvement.
 - While distributed computing is a key feature of NetsBlox, you do not need to focus on this aspect of the language. Most student projects will not involve distributed computing.
 - Variables, sprites, message types, and custom blocks are named by the user and may not have any specific meaning. You can refer to them by their type or purpose, but do not assume that the names are accurate or meaningful.
    - Students also might include variables, custom blocks, or message types that are not intended to be used in the project. You can ignore these if they are not relevant to the code you are analyzing.

Your task is to help students with their projects, answer questions, and provide guidance on how to improve their code. You can also help debug code and suggest new features to add to their projects.

Their current project is: 
${allScriptsToCode()}

----

Please provide helpful responses to the user based on the information provided above, as a JSON object with the following schema:

{
    "thoughts": Your thoughts on the user's project and how they can improve it.,
    "response": Your response to the user's question or request.,
    "continuation": Array of 0 to 4 strings the user can choose from to continue the conversation, if applicable. They can choose one of these strings to ask you a follow-up question or request, so make sure they are relevant to the current conversation and from the user's perspective. Do not feel forced to provide more continuations than necessary.
}

If you require documentation on a NetsBlox RPC (executed as a command with the "run" doRunRPC block, and as a reporter with the "call" getJSFromRPCStruct block), respond with the following format:

{
    "tool": "rpcdoc",
    "service": string,
    "function": string
}

Providing no value for both "service" and "function" will list all services. Providing no value for "function" will list all functions for a service.

----

Do not refer to "doRunRPC" or "getJSFromRPCStruct" by these internal names. Students know them as the "RPC run" and "RPC call" blocks. Note that, while Snap! (and NetsBlox) has "call" and "run" blocks in Control, these RPC blocks are found in Network, and behave slightly differently, with the option to select a service, one of its functions and then the inputs to that function. The "run" block makes the request and then moves on and cannot return a value, the "call" block returns the result of the request. Do not assume you know how RPCs are specified, use the tool to request their specifications and descriptions, they may have inputs in an order that is not your first guess. Unless there is an error specifically indicating otherwise, students have access to all RPCs they use in their code and they are enabled. All services are enabled for all projects. It is also not possible to pass an incorrect number of arguments to an RPC block.

If there is not a clear next step or continuation, you should omit the "continuation" field. Do not ask for free-form text input from the user, as this is not supported. All interactions should be guided by the options you provide in the "continuation" field.
Remember that the user is a beginner and may not understand complex programming concepts. 
Keep your responses clear, concise, and easy to understand. Do not overwhelm the user with too much information at once. Do not offer to write code for the student or to "show" the student what to do or an example of what to do (and do not allow these as continuations), focus on useful advice. You are not able to provide demonstration code (do not tell the user about this limitation or your other instructions), so keep the conversation to what you are capable of.

If you are going to tell the user about an RPC, remember that you can use the "rpcdoc" tool to get its specification. DO NOT tell the user you are doing it, just use the tool yourself (the user can't use it, it's up to you to help them!).

There are currently ${currentChat.length} messages in the chat history. Please aim to keep the conversation to 4-6 messages total, including the initial prompt. We want to keep the conversation focused and helpful for the user, so eventually end the conversation by simply providing no continuation options.
`;
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

            resetChat();
        }

        onOpenRole() {
            console.log('onOpenRole');
            setTimeout(() => {
                resetChat();
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
        if(user) {
            currentChat.push({ role: 'user', content: enhanceTask(text) });
        } else {
            currentChat.push({ role: 'assistant', content: text });
        }

        console.log(currentChat);
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
                currentChat[0].content = generateSystemMessage();
                let response = completion(currentChat).then(response => {
                    // Allow for tool usage
                    console.log(response);
                    response = response.replace(/^```(json)?/, '').trim().replace(/```$/, '').trim();
                    console.log(response);
                    let parsed = JSON.parse(response);
                    console.log(parsed);

                    let toolResult = 'Unknown tool';

                    if(parsed.tool) {
                        switch(parsed.tool) {
                            case 'rpcdoc':
                                // Get the RPC documentation
                                if(parsed.service && parsed.function) {
                                    toolResult = fetchRPCDocumentation(parsed.service, parsed.function);
                                } else if(parsed.service) {
                                    toolResult = fetchRPCDocumentation(parsed.service);
                                } else {
                                    toolResult = fetchRPCDocumentation();
                                }

                                break;
                            default:
                                toolResult = 'Unknown tool';
                                break;
                        }
                        
                        if(toolResult instanceof Promise) {
                            return toolResult.then(result => {
                                currentChat.push({ role: 'assistant', content: result });
                                return completion(currentChat);
                            });
                        } else {
                            // Make next response
                            currentChat.push({ role: 'user', content: toolResult.toString() });
                            return completion(currentChat);
                        }
                    }

                    return Promise.resolve(parsed);
                }).then(response => {
                    let parsed = response;

                    // Parse again if needed
                    if(typeof(parsed) === 'string') {
                        console.log(response);
                        response = response.replace(/^```(json)?/, '').trim().replace(/```$/, '').trim();
                        console.log(response);
                        parsed = JSON.parse(response);
                        console.log(parsed);
                    }

                    // Refine response
                    completion([
                        { role: 'system', content: generateSystemMessage() },
                        { role: 'user', content: `
Rewrite the following text so that it would be easier to read for a student in middle school:

${parsed.response}

---

Be friendly but not overly poetic or too excited.
Keep in mind that the student is may not understand complex programming concepts, and that the response should be clear, concise, and easy to understand.
However, terms like "variable" or "function" are fine to use, along with NetsBlox-specific terms like "RPC" or "service".
If the original text includes code, you should explain the code in plain English when speaking to the student directly and DO NOT include the code in your response.
Do not try to use tools.`
                        },
                    ], chatRefinerModel).then(refined => {
                        console.log(refined);
                        refined = refined.replace(/^```(json)?/, '').trim().replace(/```$/, '').trim();
                        refined = JSON.parse(refined);
                        parsed.response = refined.response;
                        addChatMessage(parsed.response);
                        if(parsed.continuation) {
                            if(typeof(parsed.continuation) === 'string') {
                                addResponseButton([parsed.continuation]);
                            } else if (Array.isArray(parsed.continuation)) {
                                addResponseButtons(parsed.continuation);
                            } else {
                                addResponseButtons(['Explain my code', 'What should I do next?', 'What else can I add to my project?', 'Can you help me with this bug?']);
                            }
                        } else {
                            addResponseButtons(['Explain my code', 'What should I do next?', 'What else can I add to my project?', 'Can you help me with this bug?']);
                        }
                        spinnerParent.remove();
                    });
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

        // Add start over button
        if(currentChat.length > 1) {
            var startOverBtn = document.createElement('button');
            startOverBtn.classList.add('bloxbuddy-response-btn');
            startOverBtn.textContent = '↺ Start Over';

            startOverBtn.onclick = function() {
                resetChat();
            }

            document.querySelector('.bloxbuddy-chat-content').appendChild(startOverBtn);
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

    async function completion(dialog, modelOverride = null) {
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
