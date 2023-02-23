(function () {
    class NativeExport extends Extension {
        constructor(ide) {
            super('NativeExport');
            this.ide = ide;
        }

        onOpenRole() {}

        getMenu() {
            const ide = this.ide;
            return {
                'Export': async function () {
                    const xml = ide.getSerializedRole();
                    const netsblox_vm = await document.netsblox_vm;

                    let exe;
                    try {
                        exe = netsblox_vm.Executable.compile(xml);
                    } catch (e) {
                        alert(e);
                    }

                    const bytecode = exe.encode_bytecode();
                    const init_info = exe.encode_init_info();

                    console.log('bytecode', bytecode);
                    console.log('init_info', init_info);
                },
            };
        }

        getCategories() { return []; }
        getPalette() { return []; }
        getBlocks() { return []; }
        getLabelParts() { return []; }
    }

    const devRoot = 'http://localhost:8000/extensions/NativeExport';
    const releaseRoot = 'https://extensions.netsblox.org/extensions/NativeExport';
    const root = window.location.toString().includes('localhost') ? devRoot : releaseRoot;

    const script = document.createElement('script');
    script.type = 'module';
    script.innerHTML = [
        `import init, * as netsblox_vm from '${root}/netsblox_vm.js';`,
        'document.netsblox_vm = (async function() {',
        `    await init('${root}/netsblox_vm_bg.wasm');`,
        '    return netsblox_vm;',
        '})();',
    ].join('\n');
    script.async = false;
    document.body.appendChild(script);

    NetsBloxExtensions.register(NativeExport);
})();
