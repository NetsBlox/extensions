document.querySelector("#loadButton").onclick = () => {
  let url = "";

  const selectedBoxes = Array.from(
    document.querySelectorAll("input.extensionOption")
  ).filter((checkbox) => checkbox.selected);

  for (const selectedBox of selectedBoxes) {
    console.log(selectedBox);
  }
  if (!document.querySelector("#devMode").checked) {
    url = `https://editor.netsblox.org/?extensions=[%22${scriptUrl}%22]#`;
  } else {
    url = `https://dev.netsblox.org/?extensions=[%22${scriptUrl}%22]#`;
  }

  console.log(url);
};
