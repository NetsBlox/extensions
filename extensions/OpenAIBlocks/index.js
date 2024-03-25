(function () {
    class OpenAIBlox extends Extension {
        constructor(ide) {
            super('OpenAIBlox');
            this.ide = ide;
        }

        onOpenRole() {
            //console.log('onOpenRole');
        }

        getMenu() {
            var options = {
                'Set OpenAI API Key...': function () {
                    let key = prompt('Enter OpenAI API Key');
                    if(key) {
                        localStorage.setItem('openai-api-key', key);
                    }
                },
                'Set OpenAI Text Model...': function () {
                    let model = prompt('Enter OpenAI Model');
                    if(model) {
                        localStorage.setItem('openai-model', model);
                    }
                },
            };

            return options;
        }

        getCategories() {
            return [
                new Extension.Category('OpenAI', new Color(100, 154, 139)),
            ];
        }

        getPalette() {
            const blocks = [
                new Extension.Palette.Block('aiCompletion'),
                new Extension.Palette.Block('aiImageGeneration'),
            ];

            return [
                new Extension.PaletteCategory(
                    'OpenAI',
                    blocks,
                    SpriteMorph
                ),
                new Extension.PaletteCategory(
                    'OpenAI',
                    blocks,
                    StageMorph
                )
            ];
        }

        getBlocks() {
            
            return [
                new Extension.Block(
                    'aiCompletion',
                    'reporter',
                    'OpenAI',
                    'GPT response to %prompt',
                    [],
                    function(code) { return this.runAsyncFn(async () => {
                        return await completion(code);
                    }, {timeout: 15000}) }
                ).for(SpriteMorph, StageMorph),
                new Extension.Block(
                    'aiImageGeneration',
                    'reporter',
                    'OpenAI',
                    'DALL-E image generation %prompt',
                    [],
                    function(code) { return this.runAsyncFn(async () => {
                        return await imagegen(code);
                    }, {timeout: 15000}) }
                ).for(SpriteMorph, StageMorph),
            ];
        }

        getLabelParts() {
            return [
                new Extension.LabelPart(
                    '%prompt',
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
            
        }

        onStopAllScripts() {
              
        }

        onPauseAll() {
            
        }

        onResumeAll() {
            
        }

        onNewSprite() {
            
        }

        onSetStageSize() {
            
        } 

        onRenameSprite(spriteID, name) {
            
        } 
    }
    
    async function completion(prompt) {
        // Make request to OpenAI API
        let apiKey = localStorage.getItem('openai-api-key');
        let model = localStorage.getItem('openai-model');
        
        if(!apiKey) {
            throw Error('OpenAI API Key not set');
        }

        if(!model) {
            model = 'gpt-3.5-turbo';
        }

        let request = fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiKey
            },
            body: JSON.stringify({
            model: model,
            messages: [
                {
                role: 'system',
                content: prompt
                }
            ]
            })
        });

        return request.then(response => response.json()).then(data => {
            let response = data.choices[0].message.content;
            return response;
        }).catch(err => {
            console.error(err);
            throw Error('Error generating response');
        });
    }

    async function imagegen(prompt) {
        let apiKey = localStorage.getItem('openai-api-key');
        
        if(!apiKey) {
            throw Error('OpenAI API Key not set');
        }

        let request = fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiKey
            },
            body: JSON.stringify({
                model: 'dall-e-2',
                prompt: prompt,
                n: 1,
                size: "512x512",
            }),
        });

        return request.then(response => response.json()).then(data => {
            let imageUrl = data.data[0].url;

            // Load image async
            let imgPromise = new Promise((resolve, reject) => {
                let img = new Image();
                img.onload = () => {
                    resolve(new Costume(img));
                };
                img.src = imageUrl;
            });

            return imgPromise;
        }).catch(err => {
            console.error(err);
            throw Error('Error generating image');
        });
    }

    NetsBloxExtensions.register(OpenAIBlox);
})();