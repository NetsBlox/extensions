(function() {
    const NOTES_HEADER = 'Collaboration Details:';
    class Config {
        constructor(dict) {
            this.dict = dict;
        }

        getHiddenCategories(username) {
            const allCategories = SpriteMorph.prototype.categories;
            const visibleCategories = this.getCategories(username);
            const hiddenCategories = without(allCategories, visibleCategories);
            return hiddenCategories;
        }

        getCategories(username) {
            const visibleCategories = this.dict[username] || SpriteMorph.prototype.categories;
            return visibleCategories;
        }

        setCategories(username, categories) {
            this.dict[username] = categories;
        }

        size() {
            return Object.keys(this.dict).length;
        }

        toString() {
            const lines = Object.entries(this.dict)
                .map(([user, cats]) => `${user}:   ${cats.join(',')}`);
            return lines.join('\n');
        }

        addToProjectNotes(notes) {
            if (!notes.includes(NOTES_HEADER)) return notes + '\n' + this.toProjectNotes();

            const [prefix, content] = notes.split(NOTES_HEADER);
            const remainingUsers = new Set(Object.keys(this.dict));
            const lines = content.split('\n')
                .reduce((lines, line) => {
                    if (line.trim().startsWith('-')) {
                        const username = line.trim()
                            .replace(/^-/, '')
                            .split(':')
                            .shift()?.trim();

                        if (username) {
                            const cats = this.getCategories(username);
                            remainingUsers.delete(username);
                            line = `- ${username}: ${cats.join(', ')}`;
                        }
                    }

                    lines.push(line);
                    return lines;
                }, [prefix, NOTES_HEADER]);

            return lines.concat(
                [...remainingUsers.values()]
                    .map(u => `- ${u}: ${this.getCategories(u).join(', ')}`)
            ).join('\n');
        }

        toProjectNotes() {
            const lines = Object.entries(this.dict)
                .map(([username, cats]) => `- ${username}: ${cats.join(',')}`);
            lines.unshift(NOTES_HEADER);
            return lines.join('\n');
        }

        static fromProjectNotes(notes) {
            const userLines = (notes.split(NOTES_HEADER)[1] || '')
                .split('\n')
                .filter(line => line.trim().startsWith('-'))
                .map(line => line.replace(/^-/, ''));

            const userCatDict = Object.fromEntries(
                userLines.map(line => {
                    const [username, catList] = line.split(':').map(l => l.trim());
                    const categories = catList.split(',').map(cat => cat.trim());
                    return [username, categories];
                })
            );

            return new Config(userCatDict);
        }
    }

    class HideCategories extends Extension {
        constructor(ide) {  
            super('Hide Categories');   
            this.ide = ide;
            // TODO: try to load config from URL
        }

        getMenu() {
            const menu = {
                'Set User Categories': () => {
                    this.ide.prompt('Enter the username to configure', username => {
                    this.ide.prompt(`Available categories for ${username}`, categories => {
                        categories = categories.split(',').map(cat => cat.toLowerCase().trim());
                        const config = this.getConfig();
                        config.setCategories(username, categories);
                        const notes = config.addToProjectNotes(this.ide.projectNotes);
                        this.ide.projectNotes = notes;
                        this.ide.showMessage(`Available categories updated for ${username}`);
                        this.applyConfig(config);
                    });
                    });
                },
            };

            if (this.getConfig().size() > 0) {
                menu['View User Categories'] = () => {
                    const msg = this.getConfig().toString();
                    this.ide.inform('Available Categories by User', msg);
                };
            }

            return menu;
        }

        onOpenRole() {
            const config = this.getConfig();
            this.applyConfig(config);
        }

        getConfig() {
            return Config.fromProjectNotes(this.ide.projectNotes);
        }

        applyConfig(config) {
            const {username} = this.ide.cloud;
            const hiddenCategories = config.getHiddenCategories(username);

            this.ide.showHiddenCategories();
            hiddenCategories.forEach(cat => this.ide.hideCategory(cat));
        }
    }

    function without(array, removeItems) {
        return array.filter(item => !removeItems.includes(item));
    }

    NetsBloxExtensions.register(HideCategories);
})();
