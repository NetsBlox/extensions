# Official NetsBlox Extensions

This repository contains the NetsBlox Extensions to be hosted on https://extensions.netsblox.org, allowing NetsBlox to recognize them as first-party extensions.

Extensions currently included in this repository:
 
 - [HideCategories](https://dev.netsblox.org/?extensions=[%22https://extensions.netsblox.org/extensions/HideCategories/index.js%22]#) - This extension allows you to automatically hide categories and is particularly useful when setting different visible categories for collaborating users.
 
 - [RoboScapeOnline](https://dev.netsblox.org/?extensions=[%22https://extensions.netsblox.org/extensions/RoboScapeOnline/index.js%22]#) - Networked robotics simulation in the browser! (WIP)
 

## Contributing
After cloning the repository, configure the githooks with:
```
git config core.hooksPath .githooks
```
This will ensure that any automated preparation will happen automatically such as updating the website.

Next, create a new directory in `extensions/`. This should contain the following files:
- index.js: JS code for the actual extension
- description.txt: Description of the extension