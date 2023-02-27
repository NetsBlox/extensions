(function () {
    const TIME_SYNC_URL = 'wss://timesync.netsblox.org';
    const TIME_SYNC_ITERS = 1000;
    const DISCARD_FRAC = 0.2; // discards the upper and lower fraction of data
    const SLEEP_MS = 0; // sleep time between receiving a message and sending the next message

    // --------------------------------------------------------

    const I32_MAX = 2147483647;

    async function sleep(ms) {
        if (ms > 0) {
            return new Promise(resolve => {
                setTimeout(resolve, ms);
            });
        }
    }

    function discardAvg(vals) {
        vals = [...vals];

        const idx = Math.round(DISCARD_FRAC * vals.length);
        if (2 * idx >= vals.length) throw Error('computed average of empty list');

        vals.sort((a, b) => a - b);

        let sum = 0;
        for (let i = idx; i < vals.length - idx; ++i) {
            sum += vals[i];
        }
        return sum / (vals.length - 2 * idx);
    }

    function snapify(val) {
        if (Array.isArray(val)) {
            return new List(val.map(snapify));
        } else if (typeof(val) === 'object') {
            const res = [];
            for (const key in val) {
                res.push([key, val[key]]);
            }
            return snapify(res);
        } else {
            return val;
        }
    }

    class TimeSync extends Extension {
        constructor(ide) {
            super('TimeSync');
            this.ide = ide;
        }

        onOpenRole() {}

        getMenu() { return {}; }

        getCategories() { return []; }

        getPalette() {
            const blocks = [
                new Extension.Palette.Block('timeSyncCalculate'),
                new Extension.Palette.Block('timeSyncGetInfo'),
                new Extension.Palette.Block('timeSyncGetServerTime'),
            ];
            return [
                new Extension.PaletteCategory('network', blocks, SpriteMorph),
                new Extension.PaletteCategory('network', blocks, StageMorph),
            ];
        }

        getBlocks() {
            function block(name, type, category, spec, defaults, action) {
                return new Extension.Block(name, type, category, spec, defaults, action).for(SpriteMorph, StageMorph)
            }
            return [
                block('timeSyncCalculate', 'command', 'network', 'calculate time sync info', [], function () {
                    this.runAsyncFn(async () => {
                        const socket = new WebSocket(TIME_SYNC_URL);
                        const messages = [];
                        const state = { running: true, error: null };

                        socket.onopen = () => {
                            console.log('time sync starting');
                            socket.send(Date.now().toString());
                        };
                        socket.onmessage = async msg => {
                            messages.push(`${msg.data},${Date.now()}`);
                            if (messages.length < TIME_SYNC_ITERS) {
                                await sleep(SLEEP_MS);
                                socket.send(Date.now().toString());
                            } else {
                                socket.close();
                            }
                        };
                        socket.onerror = () => {
                            state.error = 'error contacting time sync server';
                            socket.close();
                        };
                        socket.onclose = () => {
                            console.log(`time sync completed (${messages.length} samples)`);
                            state.running = false;
                        };

                        while (state.running) await sleep(100);
                        if (state.error) throw Error(state.error);

                        const samples = messages.map(msg => msg.split(',').map(x => +x));

                        const roundTrips = samples.map(t => t[2] - t[0]);
                        const deltas = samples.map(t => (2 * t[1] - (t[0] + t[2])) / 2);

                        world.timeSyncInfo = {
                            'round trip': discardAvg(roundTrips) / 1000,
                            'clock delta': discardAvg(deltas) / 1000,
                        };
                    }, { args: [], timeout: I32_MAX });
                }),
                block('timeSyncGetInfo', 'reporter', 'network', 'time sync info', [], function () {
                    if (!world.timeSyncInfo) {
                        throw Error('You must calculate time sync info before reading it!');
                    }
                    return snapify(world.timeSyncInfo);
                }),
                block('timeSyncGetServerTime', 'reporter', 'network', 'server time', [], function () {
                    if (!world.timeSyncInfo) {
                        throw Error('You must calculate time sync info before reading it!');
                    }
                    return Date.now() + world.timeSyncInfo['clock delta'] * 1000;
                }),
            ];
        }

        getLabelParts() { return []; }
    }

    NetsBloxExtensions.register(TimeSync);
})();
