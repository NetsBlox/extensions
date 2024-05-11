const localhost = window.location.search.includes("localhost");
const root = localhost
  ? "http://localhost:8000/"
  : "https://extensions.netsblox.org/";

function ArucoGenMorph() {
  this.init();
}

ArucoGenMorph.prototype = new DialogBoxMorph();
ArucoGenMorph.prototype.constructor = ArucoGenMorph;
ArucoGenMorph.uber = DialogBoxMorph.prototype;

ArucoGenMorph.prototype.init = function () {
  ArucoGenMorph.uber.init.call(this);

  this.labelString = "AprilTag Code Generator";
  this.createLabel();

  const width = 300;
  const height = 300;
  this.bounds.setWidth(width);
  this.bounds.setHeight(height);
  this.dictionary = new AR.Dictionary("APRILTAG_16h5");

  this.add(this.IDPrompt = new StringMorph("Code Value: [0-29]"));
  this.add(
    this.saveButton = new PushButtonMorph(
      null,
      () => this.download(),
      "Download",
    ),
  );
  this.add(
    this.closeButton = new PushButtonMorph(null, () => this.destroy(), "Close"),
  );

  const [qrwidth, qrheight] = [150, 150];
  this.add(this.ARCode = new Morph());
  this.ARCode.setWidth(qrwidth);
  this.ARCode.setHeight(qrheight);
  this.ARCode.value = "0";

  const options = Array.from(Array(30).keys());
  for (item of options) {
    options[item] = item.toString();
  }
  const menuOptions = Object.assign({}, options);

  this.add(this.IDInput = new InputFieldMorph("0", true, menuOptions, true));

  this.fixLayout();
  this.rerender();
};

ArucoGenMorph.prototype.download = async function () {
  console.log("downloading attempt");
  if (this.ARCode.texture) {
    const svg = await (await fetch(this.ARCode.texture)).blob();
    console.log(svg);
    const url = window.URL.createObjectURL(svg);
    const name = `AprilTag_16h5_ID${this.ARCode.value}.svg`;
    const link = document.createElement("a");
    link.download = name;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
};

ArucoGenMorph.prototype.updateARCode = function () {
  const newValue = parseInt(this.IDInput.children[0].children[0].text);
  if (newValue > 29 || isNaN(newValue)) {
    return;
  }
  this.ARCode.value = newValue;
  console.log("value: ", this.ARCode.value);

  this.ARCode.cachedTexture = null;
  this.ARCode.texture = root +
    `extensions/AugmentedReality/tag_svgs/apriltag_16h5_svgs/APRILTAG_16h5_ID${this.ARCode.value}.svg`;
  this.ARCode.rerender();
};

ArucoGenMorph.prototype.reactToChoice = function () {
  this.updateARCode();
};

ArucoGenMorph.prototype.fixLayout = function () {
  ArucoGenMorph.uber.fixLayout.call(this);

  if (this.IDPrompt) {
    this.IDPrompt.setCenter(this.center());
    this.IDPrompt.setTop(35);
  }
  if (this.IDInput) {
    this.IDInput.setCenter(this.center());
    this.IDInput.setTop(50);
    this.IDInput.setLeft(135);
    this.IDInput.bounds.setWidth(30);
    this.IDInput.children[0].bounds.setWidth(25);
    this.IDInput.children[1].setLeft(this.IDInput.left() + 15);
  }
  if (this.ARCode) {
    this.ARCode.setCenter(this.center());
    this.ARCode.setTop(90);
  }
  if (this.saveButton) {
    this.saveButton.setCenter(this.center());
    this.saveButton.setBottom(this.bottom() - 20);
    this.saveButton.setLeft(this.saveButton.left() - 40);
  }
  if (this.closeButton) {
    this.closeButton.setCenter(this.center());
    this.closeButton.setBottom(this.bottom() - 20);
    this.closeButton.setLeft(this.closeButton.left() + 40);
  }
};

ArucoGenMorph.prototype.accept = function () {
  if (this.action) {
    if (typeof this.target === "function") {
      if (typeof this.action === "function") {
        this.target.call(this.environment, this.action.call());
      } else {
        this.target.call(this.environment, this.action);
      }
    } else {
      if (typeof this.action === "function") {
        this.action.call(this.target, this.getInput());
      } else { // assume it's a String
        this.target[this.action](this.getInput());
      }
    }
  }
  this.updateARCode();
};
