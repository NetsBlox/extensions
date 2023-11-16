(function () {
    function copyToClipboard(txt) {
        navigator.clipboard.writeText(txt);
    }

    function ShareMorph(url) {
        this.url = url;
        this.init();
    }
    ShareMorph.prototype = new DialogBoxMorph();
    ShareMorph.prototype.constructor = ShareMorph;
    ShareMorph.uber = DialogBoxMorph.prototype;

    ShareMorph.prototype.init = function() {
        ShareMorph.uber.init.call(this);

        this.labelString = 'BetterShare';
        this.createLabel();

        const [width, height] = [300, 300];
        this.bounds.setWidth(width);
        this.bounds.setHeight(height);

        this.add(this.linkLabel = new StringMorph('Share Link:'));
        this.add(this.linkField = new StringFieldMorph(this.url, width - 100));
        this.add(this.copyButton = new PushButtonMorph(null, () => copyToClipboard(this.url), 'Copy'));
        this.add(this.closeButton = new PushButtonMorph(null, () => this.destroy(), 'Close'));

        const [qrwidth, qrheight] = [150, 150];
        this.add(this.qrcode = new Morph());
        this.qrcode.setWidth(qrwidth);
        this.qrcode.setHeight(qrheight);
        this.qrcode.texture = `https://api.qrserver.com/v1/create-qr-code/?size=${qrwidth}x${qrheight}&data=${encodeURIComponent(this.url)}`;

        this.fixLayout();
        this.rerender();
    };
    ShareMorph.prototype.fixLayout = function() {
        ShareMorph.uber.fixLayout.call(this);

        if (this.linkLabel) {
            this.linkLabel.setCenter(this.center());
            this.linkLabel.setTop(35);
        }
        if (this.linkField) {
            this.linkField.setTop(60);
            this.linkField.setLeft(25);
        }
        if (this.copyButton) {
            this.copyButton.setTop(56);
            this.copyButton.setRight(this.right() - 25);
        }
        if (this.qrcode) {
            this.qrcode.setCenter(this.center());
            this.qrcode.setTop(90);
        }
        if (this.closeButton) {
            this.closeButton.setCenter(this.center());
            this.closeButton.setBottom(this.bottom() - 20);
        }
    };

    class BetterShare extends Extension {
        constructor(ide) {
            super('BetterShare');
            this.ide = ide;
        }

        getMenu() {
            return {
                'Share Project': () => {
                    const urlParams = new URLSearchParams(window.location.search);

                    const username = urlParams.get('Username') || this.ide?.cloud?.username;
                    const projName = urlParams.get('ProjectName') || this.ide?.room?.name;
                    const roleName = urlParams.get('Role') || this.ide?.projectName;

                    if (username && projName && roleName) {
                        const shareLink = `${location.origin}/?action=present&editMode&noRun&Username=${encodeURIComponent(username)}&ProjectName=${encodeURIComponent(projName)}&Role=${encodeURIComponent(roleName)}`;
                        new ShareMorph(shareLink).popUp(world);
                    } else {
                        alert('Failed to get shared project info');
                    }
                }
            };
        }
    }

    NetsBloxExtensions.register(BetterShare);
})();
