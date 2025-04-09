(function () {
    class BetterShare extends Extension {
        constructor(ide) {
            super('BetterShare');
            this.ide = ide;
        }

        getMenu() {
            return {
                'Share Project': async () => {
                    const res = await this.ide.cloud.publishProject(this.ide?.cloud?.projectId);

                    // TODO: this feels wrong in terms of the cloud response - if ever fixed in cloud, update here
                    if (res === 'Public') {
                        this.ide.showMessage('Project must first be saved to the cloud!');
                        return;
                    }

                    const username = this.ide?.cloud?.username;
                    const projName = this.ide?.room?.name;
                    const roleName = this.ide?.projectName;

                    if (!username || !projName || !roleName) {
                        this.ide.showMessage('Failed to get shared project info');
                        return;
                    }

                    const shareLink = `${location.origin}/?action=present&editMode&noRun&Username=${encodeURIComponent(username)}&ProjectName=${encodeURIComponent(projName)}&Role=${encodeURIComponent(roleName)}`;
                    new ShareMorph(shareLink).popUp(world);
                },
                'Unshare Project': async () => {
                    await this.ide.cloud.unpublishProject(this.ide?.cloud?.projectId);
                    this.ide.showMessage('Successfully unpublished your current project');
                },
            };
        }
    }

    NetsBloxExtensions.register(BetterShare);
})();
