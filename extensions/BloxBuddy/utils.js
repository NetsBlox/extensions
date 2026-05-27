(function () {
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
        const model = 'gpt-5.4-mini';
        const endpoint = 'https://api.openai.com/v1/';

        if (!apiKey) {
            throw Error('API Key not set - see extension menu');
        }

        return { apiKey, model, endpoint };
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

                let funcElements = docHTML.querySelectorAll('.function');
                let funcElement = null;
                funcElements.forEach(el => {
                    if(el.querySelector('.descname').textContent === func) {
                        funcElement = el;
                    }
                });
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

            return services;
        }
    }

    Utils = {
        parseDialog,
        getSettings,
        fetchRPCDocumentation,
    };

    window.BloxBuddyUtils = Utils;
})();
