(function () {
    class BetterShare extends Extension {
        constructor(ide) {
            super('BetterShare');
            this.ide = ide;
        }

        getMenu() {
            return {
                'Share Project': this.ide.share,
                'Unshare Project': this.ide.unshare,
            };
        }
    }

    NetsBloxExtensions.register(BetterShare);
})();
