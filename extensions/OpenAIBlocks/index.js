(function () {
    const I32_MAX = 2147483647;

    class OpenAIBlox extends Extension {
        constructor(ide) {
            super('OpenAIBlox');
            this.ide = ide;
        }

        getMenu() {
            return {
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
            };
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
                new Extension.PaletteCategory('OpenAI', blocks, SpriteMorph),
                new Extension.PaletteCategory('OpenAI', blocks, StageMorph),
            ];
        }

        getBlocks() {
            return [
                new Extension.Block('aiCompletion', 'reporter', 'OpenAI', 'GPT generate text %s', [],
                    function (dialog) {
                        return this.runAsyncFn(async () => {
                            return await completion(dialog);
                        }, { timeout: I32_MAX })
                    },
                ).for(SpriteMorph, StageMorph),
                new Extension.Block('aiImageGeneration', 'reporter', 'OpenAI', 'GPT generate image %s', [],
                    function (prompt) {
                        return this.runAsyncFn(async () => {
                            return await imagegen(prompt);
                        }, { timeout: I32_MAX });
                    },
                ).for(SpriteMorph, StageMorph),
            ];
        }
    }

    function getSettings() {
        const apiKey = localStorage.getItem('openai-api-key');
        const model = localStorage.getItem('openai-model') || 'gpt-3.5-turbo';
        if (!apiKey) {
            throw Error('OpenAI API Key not set - see extension menu');
        }
        return { apiKey, model };
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

    async function completion(dialog) {
        dialog = parseDialog(dialog);
        const { apiKey, model } = getSettings();
        try {
            const res = await fetch('https://api.openai.com/v1/chat/completions', {
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

    async function imagegen(prompt) {
        if (typeof(prompt) !== 'string') {
            throw Error('prompt must be text');
        }
        const { apiKey } = getSettings();
        try {
            const res = await fetch('https://api.openai.com/v1/images/generations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: 'dall-e-2',
                    prompt: prompt,
                    n: 1,
                    size: "512x512",
                }),
            });
            const data = await res.json();
            return await new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(new Costume(img));
                img.src = data.data[0].url;
            });
        } catch (e) {
            console.error(e);
            throw Error('Error generating image');
        }
    }

    NetsBloxExtensions.register(OpenAIBlox);
})();
