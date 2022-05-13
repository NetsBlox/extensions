# Official NetsBlox Extensions

This repository contains the NetsBlox Extensions to be hosted on https://extensions.netsblox.org, allowing NetsBlox to recognize them as first-party extensions.

Extensions currently included in this repository:
 <% extensions.forEach(ext => { %>
 - [<%=ext.displayName %>](https://dev.netsblox.org/?extensions=[%22https://extensions.netsblox.org/extensions/<%= ext.name %>/index.js%22]#) - <%= ext.description %>
 <% }) %>

## Contributing
After cloning the repository, configure the githooks with:
```
git config core.hooksPath .githooks
```
This will ensure that any automated preparation will happen automatically such as updating the website.

Next, create a new directory in `extensions/`. This should contain the following files:
- index.js: JS code for the actual extension
- description.txt: Description of the extension
