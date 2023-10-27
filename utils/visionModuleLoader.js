
    async function loadVisionModule() {
        const module = await import('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.6');
        console.log(module);
        return module;
    }

    async function loadVisionTask(VisionModule) {
        const vision = await VisionModule.FilesetResolver.forVisionTasks( 
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.6/wasm"
            );
            console.log(vision);
        return vision;
    }

    const Vision = {
        Module: null,
        Task: null
    }; 

    function setVisionModuleAndTask() {
        const modulePromise = loadVisionModule();
        
        modulePromise.then((module) => {
            Vision.Module = module;
            Object.defineProperty(Vision, "Module", {writable: false}); 
            
            const visionPromise = loadVisionTask(module);
            visionPromise.then((vision) => {
                Vision.Task = vision;
                Object.defineProperty(Vision, "Task", {writable: false})
            },
                () => {throw Error('Failed to load vision task')});
        }, 
            () => {throw Error('Failed to load vision module')});
    }
    
    setVisionModuleAndTask();