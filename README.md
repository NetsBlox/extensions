# Official NetsBlox Extensions

This repository contains the NetsBlox Extensions to be hosted on https://extensions.netsblox.org, allowing NetsBlox to recognize them as first-party extensions.

Extensions currently included in this repository:
 
 - [HideCategories](https://dev.netsblox.org/?extensions=[%22https://extensions.netsblox.org/extensions/HideCategories/index.js%22]#) - This extension allows you to automatically hide categories and is particularly useful when setting different visible categories for collaborating users.
 
 - [🤖 RoboScape Online](https://dev.netsblox.org/?extensions=[%22https://extensions.netsblox.org/extensions/RoboScapeOnline/index.js%22]#) - Networked robotics simulation in the browser! (WIP)
 
 - [TimeSync](https://dev.netsblox.org/?extensions=[%22https://extensions.netsblox.org/extensions/TimeSync/index.js%22]#) - calculate time sync info from the NetsBlox server
 
 - [TuneScope](https://dev.netsblox.org/?extensions=[%22https://extensions.netsblox.org/extensions/TuneScope/index.js%22]#) - Music Notation, Instruments, Drums, Tones, Chords, Tracks, from the University of Virginia (Glen Bull)
 
 - [WebMidi](https://dev.netsblox.org/?extensions=[%22https://extensions.netsblox.org/extensions/WebMidi/index.js%22]#) - Takes input from a MIDI controller and brings the data into Netsblox
 
 - [WebSerial](https://dev.netsblox.org/?extensions=[%22https://extensions.netsblox.org/extensions/WebSerial/index.js%22]#) - Provides blocks for connecting to a device, e.g. an Arduino, over WebSerial
 
 - [WhenKeyPressedLogger](https://dev.netsblox.org/?extensions=[%22https://extensions.netsblox.org/extensions/WhenKeyPressedLogger/index.js%22]#) - Logs 'When [key] key pressed' block activations for Ben
 

## Contributing
After cloning the repository, configure the githooks with:
```
git config core.hooksPath .githooks
```
This will ensure that any automated preparation will happen automatically such as updating the website.

Next, create a new directory in `extensions/`. This should contain the following files:
- `index.js`: JS code for the actual extension
- `extension.json`: Description of the extension