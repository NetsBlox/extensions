(function () {
    const [ide] = world.children;

    class WhenKeyPressedLogger extends Extension {
        constructor(ide) {
            super('WhenKeyPressedLogger');
        }

        onOpenRole() {

        }

        getMenu() {
            return {};
        }

        getCategories() {
            return [];
        }

        getPalette() {
            return [];
        }

        getBlocks() {
            return [];
        }

        getLabelParts() {
            return [];
        }

    }

    var lastLogSend = {};
    var logSendThreshold = 200;

    StageMorph.prototype.fireKeyEvent = function (key) {
        var evt = key.toLowerCase(),
            procs = [],
            ide = world.children[0];

        this.keysPressed[evt] = true;
        if (evt === 'ctrl enter' && !ide.isAppMode) {
            return this.fireGreenFlagEvent();
        }
        if (evt === 'shift enter') {
            return this.editScripts();
        }
        if (evt === 'ctrl f') {
            if (!ide.isAppMode) { ide.currentSprite.searchBlocks(); }
            return;
        }
        if (evt === 'ctrl z') {
            if (!ide.isAppMode) { SnapUndo.undo(ide.getActiveEntity()); }
            return;
        }
        if (evt === 'ctrl shift z' || (evt === 'ctrl y')) {
            if (!ide.isAppMode) { SnapUndo.redo(ide.getActiveEntity()); }
            return;
        }
        if (evt === 'ctrl n') {
            if (!ide.isAppMode) { ide.createNewProject(); }
            return;
        }
        if (evt === 'ctrl o') {
            if (!ide.isAppMode) { ide.openProjectsBrowser(); }
            return;
        }
        if (evt === 'ctrl s') {
            if (!ide.isAppMode) { ide.save(); }
            return;
        }
        if (evt === 'ctrl shift s') {
            if (!ide.isAppMode) { return ide.saveProjectsBrowser(); }
            return;
        }
        if (evt === 'esc' && !ide.isAppMode) {
            return this.fireStopAllEvent();
        }
        this.children.concat(this).forEach(morph => {
            if (isSnapObject(morph)) {
                morph.allHatBlocksForKey(evt).forEach(block => {
                    if (Date.now() - (lastLogSend[key] ?? 0) > logSendThreshold) {
                        lastLogSend[key] = Date.now();
                        //console.log("Hat block for " + key + " triggered!");
                        const url = "https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/application-0-lvnck/service/roboscape_online_logs/incoming_webhook/logs";
                        fetch(url, {
                            method: "POST",
                            body: JSON.stringify({
                                user: SnapCloud.username ?? SnapCloud.clientId,
                                key,
                                time: Date.now()
                            })
                        }).then(
                            response => response.text()
                        ).then(
                            html => console.log(html)
                        );
                    }
                    procs.push(this.threads.startProcess(
                        block,
                        morph,
                        true // ignore running scripts, was: myself.isThreadSafe
                    ));
                }
                );
            }
        });
        return procs;
    };

    NetsBloxExtensions.register(WhenKeyPressedLogger);
})();
