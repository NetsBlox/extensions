Below is an overview of the living structure of this project:

# index.js
- contains all extension injection code using the _Extension_ class
  - I want to avoid defining any logic here. This file should import from neighboring modules and use them

# manager.js
- The manager is responsible for orchastrating the loading and unloading of environments.
- It creates and manages the dialogbox, and handles delivering actions from the user to the simulator
- It also handles managing the rendering pipeline.

# renderers/*
- These files define renderers. renderers take in a state data and draw onto the body of the dialog box.
- Each renderer uses one state interface 

# simulators/*
- These files define simulators, which produce state data used by the renderers.
- Each simulator also handles action and state spaces.  


