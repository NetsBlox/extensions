(function () {
    const I32_MAX = 2147483647;

    class Speech extends Extension {
        constructor(ide) {
            super('Speech');
            this.ide = ide;

            this.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.requestQueue = [];

            if (this.SpeechRecognition) {
                this.recognizer = new this.SpeechRecognition();

                this.recognizer.continuous = false;
                this.recognizer.lang = 'en-US';
                this.recognizer.interimResults = false;
                this.recognizer.maxAlternatives = 1;

                this.recognizer.onstart = (e) => {
                    this.recognized = '';
                };
                this.recognizer.onresult = (e) => {
                    this.recognized = ((e.results || [])[0] || [])[0]?.transcript || '';
                };
                this.recognizer.onend = (e) => {
                    const requests = this.requestQueue;
                    this.requestQueue = [];
                    for (const req of requests) {
                        req(this.recognized);
                    }
                };
            }
        }

        getMenu() {
            return {};
        }

        getCategories() {
            return [];
        }

        getPalette() {
            const blocks = [
                new Extension.Palette.Block('speechRecognize'),
            ];
            return [
                new Extension.PaletteCategory('sensing', blocks, SpriteMorph),
                new Extension.PaletteCategory('sensing', blocks, StageMorph),
            ];
        }

        getBlocks() {
            const thisExtension = this;
            return [
                new Extension.Block('speechRecognize', 'reporter', 'sensing', 'listen for speech', [],
                    function () {
                        return this.runAsyncFn(async () => {
                            return await new Promise((resolve, reject) => {
                                thisExtension.requestQueue.push(resolve);
                                try {
                                    thisExtension.recognizer.start();
                                } catch (e) {}
                            });
                        }, { timeout: I32_MAX })
                    },
                ).for(SpriteMorph, StageMorph),
            ];
        }
    }

    NetsBloxExtensions.register(Speech);
})();
