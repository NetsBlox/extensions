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
        url = `https://editor.netsblox.org/?extensions=[${scriptUrl}]#`;
    } else {
        url = `https://dev.netsblox.org/?extensions=[${scriptUrl}]#`;
    }

    window.open(url);
};

document.getElementById("loadButton").disabled = getSelectedExtensions().length == 0;
document.getElementById("multiSelect").onchange();

let search = document.getElementById("search");
search.oninput = () => {
    let extensions = document.querySelectorAll(".extension");
    for(let i = 0; i < extensions.length; i++){
        let extension = extensions[i];
        let fullText =  extension.innerText;
        extension.style.display = (search.value == "" || fuzzysort.single(search.value, fullText))? "block" : "none";
    }
};