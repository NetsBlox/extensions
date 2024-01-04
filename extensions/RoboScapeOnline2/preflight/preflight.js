let path = document.currentScript.src;
path = path.substring(0, path.lastIndexOf("/"));

function runTest() {    
    // Step -1: Importing Babylon.js and Pseudomorphic
    // Add CSS
    var styleElementPM = document.createElement('link');
    styleElementPM.setAttribute('rel', 'stylesheet');
    styleElementPM.setAttribute('type', 'text/css');
    styleElementPM.setAttribute('href', 'https://pseudomorphic.netsblox.org/style.css');
    document.head.appendChild(styleElementPM);

    // Add JS
    var scriptElementPM = document.createElement('script');

    scriptElementPM.onload = () => {        
        // Create canvas for later use
        const canvas = document.createElement('canvas');
        canvas.id = 'roboscape-canvas';
        canvas.style.flex = '1 1 auto';
        canvas.style.overflow = 'hidden';
        document.body.appendChild(canvas);
    };
    scriptElementPM.async = false;
    scriptElementPM.setAttribute('src', 'https://pseudomorphic.netsblox.org/script.js');
    document.head.appendChild(scriptElementPM);

    var scriptElementB = document.createElement('script');
    scriptElementB.async = false;
    scriptElementB.onload = () => {
        var loaderScriptElement = document.createElement('script');
        loaderScriptElement.async = false;

        loaderScriptElement.onload = () => {
            var guiScriptElement = document.createElement('script');
            guiScriptElement.async = false;
            guiScriptElement.setAttribute('src', 'https://preview.babylonjs.com/gui/babylon.gui.js');
            document.head.appendChild(guiScriptElement);
            guiScriptElement.onload = () => {
                runTest1();
            };
        };

        loaderScriptElement.setAttribute('src', 'https://preview.babylonjs.com/loaders/babylonjs.loaders.min.js');
        document.head.appendChild(loaderScriptElement);
    };

    scriptElementB.setAttribute('src', 'https://preview.babylonjs.com/babylon.js');
    document.head.appendChild(scriptElementB);
};

function runTest1() {
    let reportList = document.getElementById('report-list');

    // Report status
    let pseudomorphicLoaded = createDialog != undefined && Object.values(document.styleSheets).filter(s => s.href === 'https://pseudomorphic.netsblox.org/style.css').length > 0;
    let babylonLoaded = BABYLON != undefined && BABYLON.GUI != undefined && BABYLON.SceneLoader != undefined;

    if (pseudomorphicLoaded && babylonLoaded) {
        reportList.appendChild(createReport('success', 'Successfully imported Babylon.js and Pseudomorphic'));
    } else {
        reportList.appendChild(createReport('error', 'Failed to import Babylon.js and Pseudomorphic'));
        return;
    }

    // Step 0: Import WASM module
    var s = document.createElement('script');
    s.type = "module";
    s.innerHTML = `import init, {step1, step2, step3, step4} from '${path}/pkg/roboscapesim_preflight.js';
    
        await init();

        window.RoboScapeOnline_fns = {};
        window.RoboScapeOnline_fns.step1 = step1;
        window.RoboScapeOnline_fns.step2 = step2;
        window.RoboScapeOnline_fns.step3 = step3;
        window.RoboScapeOnline_fns.step4 = step4;

        // Trigger a custom event to signal that the module is ready
        const event = new Event('roboscapesim:module:ready');
        document.dispatchEvent(event);
        
        `;
    
    s.onerror = () => {
        reportList.appendChild(createReport('error', 'Failed to import WASM module'));
    };

    document.addEventListener('roboscapesim:module:ready', () => {
        // Report status
        if (window.RoboScapeOnline_fns.step1 != undefined && window.RoboScapeOnline_fns.step2 != undefined && window.RoboScapeOnline_fns.step3 != undefined && window.RoboScapeOnline_fns.step4 != undefined) {
            reportList.appendChild(createReport('success', 'Successfully imported WASM module'));
        } else {
            reportList.appendChild(createReport('error', 'Failed to import WASM module'));
            return;
        }

        // Run tests in WASM module
        window.RoboScapeOnline_fns.step1().then(() => {
            reportList.appendChild(createReport('success', 'Successfully connected to API server'));
            window.RoboScapeOnline_fns.step2().then(() => {
                reportList.appendChild(createReport('success', 'Successfully requested new room'));
                window.RoboScapeOnline_fns.step3().then(() => {
                    reportList.appendChild(createReport('success', 'Successfully established WebSocket connection'));
                    window.RoboScapeOnline_fns.step4().then(() => {
                        reportList.appendChild(createReport('success', 'Successfully received message from server'));
                    }).catch(e => {
                        reportList.appendChild(createReport('error', 'Failed to received message from server: ' + e.toString()));
                    });
                }).catch(e => {
                    reportList.appendChild(createReport('error', 'Failed to establish WebSocket connection: ' + e.toString()));
                });
            }).catch(e => {
                reportList.appendChild(createReport('error', 'Failed to request new room: ' + e.toString()));
            });
        }).catch(e => {
            reportList.appendChild(createReport('error', 'Failed to connect to API server: ' + e.toString()));
        });
    });
    document.body.appendChild(s);
}

function createReport(type, message) {
    let report = document.createElement('li');
    report.classList.add(type);
    report.innerText = message;
    return report;
}

runTest();
