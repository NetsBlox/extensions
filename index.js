const getSelectedExtensions = () => {
    return Array.from(document.querySelectorAll("input.extensionOption")).filter((checkbox) => checkbox.checked);
};

document.getElementById("multiSelect").onchange = () => {
    if (document.getElementById("multiSelect").checked) {
        // Show multi-select interface
        Array.from(document.getElementsByClassName("extensionOption")).forEach((element) => (element.hidden = false));
        document.getElementById("multiSelectControls").hidden = false;
    } else {
        // Hide multi-select interface
        Array.from(document.getElementsByClassName("extensionOption")).forEach((element) => (element.hidden = true));
        document.getElementById("multiSelectControls").hidden = true;
    }
};

document.querySelectorAll("input.extensionOption").forEach((option) => {
    option.oninput = () => {
        document.getElementById("loadButton").disabled = getSelectedExtensions().length == 0;
    };
});

document.getElementById("loadButton").onclick = () => {
    let url = "";

    let scriptUrl = "";

    for (const selectedBox of getSelectedExtensions()) {
        scriptUrl += "%22" + document.getElementById(selectedBox.name + "_script").value + "%22,";
    }

    // Remove trailing comma
    scriptUrl = scriptUrl.substring(0, scriptUrl.length - 1);

    if (!document.getElementById("devMode").checked) {
        url = `https://editor.netsblox.org/?extensions=[${scriptUrl}]`;
    } else {
        url = `https://dev.netsblox.org/?extensions=[${scriptUrl}]`;
    }

    window.open(url);
};

document.getElementById("loadButton").disabled = getSelectedExtensions().length == 0;
document.getElementById("multiSelect").onchange();

let search = document.getElementById("search");
search.oninput = () => {
    let extensions = document.querySelectorAll(".extension");
    for (let i = 0; i < extensions.length; i++) {
        let extension = extensions[i];
        let title = extension.querySelector('summary a');
        let desc = extension.querySelector('details p');

        let fullText =  title.innerText;

        if (extension.open) {
            fullText += desc.innerText;
        }

        let result = fuzzysort.single(search.value, fullText);
        extension.style.display = (search.value == "" || result)? "block" : "none";

        if(search.value == "") {
            // Clear highlight when no match
            title.innerHTML = title.innerText;

            if(extension.open) {
                desc.innerHTML = desc.innerText;
            }
        }

        if (result) {
            // Apply highlight on match
            let titleMatch = fuzzysort.single(search.value, title.innerText);
            if (titleMatch) {
                title.innerHTML = fuzzysort.highlight(titleMatch);
            }

            let descMatch = fuzzysort.single(search.value, desc.innerText);
            if (descMatch) {
                desc.innerHTML = fuzzysort.highlight(descMatch);
            }
        }
    }
};

document.getElementById("showAllDescriptions").onclick = () => {
    let extensions = document.querySelectorAll(".extension");
    for (let i = 0; i < extensions.length; i++) {
        extensions[i].open = true;
    }
    search.oninput();
};

document.getElementById("hideAllDescriptions").onclick = () => {
    let extensions = document.querySelectorAll(".extension");
    for (let i = 0; i < extensions.length; i++) {
        extensions[i].open = false;
    }
    search.oninput();
};
