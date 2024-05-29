/* 
This file creates a global 
'Vision' variable that contains 
essential components used by 
all mediapipe vision extensions.
These includes: 
  handGestures, 
  poseLandmarker, 
  faceLandmarker.
This file is added as a script tag
when a mediapipe vision extension is 
loaded. Only one script tag is added. */

/*
Global Vision Constant used by 
mediapipe vision task extensions */
const Vision = {
  Module: null,
  Task: null,
};

/* 
This anonymous function 
sets the values for the 
global vision constants*/

(async function () {
  const VisionModuleURL =
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/vision_bundle.mjs";
  const WASMURL =
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm";

  Vision.Module = await import(VisionModuleURL);
  Vision.Task = await Vision.Module.FilesetResolver.forVisionTasks(WASMURL);

  Object.defineProperty(Vision, "Module", { writable: false });
  Object.defineProperty(Vision, "Task", { writable: false });
})();
