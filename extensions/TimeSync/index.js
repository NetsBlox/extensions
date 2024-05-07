(function () {
    const TIME_SYNC_URL = 'wss://timesync.netsblox.org';
    const TIME_SYNC_ITERS = 200;
    const DISCARD_FRAC = 0.2;
    const PASSIVE_SLEEP_TIME_MS = 500;
    const PASSIVE_CALC_ITERS = 10;

    // --------------------------------------------------------

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

            const socket = new WebSocket(TIME_SYNC_URL);
            const samples = [];
            let fullCount = PASSIVE_CALC_ITERS;

            const calculate = () => {
                const roundTrips = samples.map(t => t[2] - t[0]);
                const deltas = samples.map(t => (2 * t[1] - (t[0] + t[2])) / 2);

                world.timeSyncInfo = {
                    'round trip': discardAvg(roundTrips) / 1000,
                    'clock delta': discardAvg(deltas) / 1000,
                };

                console.log('updated time sync info', world.timeSyncInfo);
            };

            socket.onopen = () => {
                console.log('time sync socket opened');
                socket.send(Date.now().toString());
            };
            socket.onmessage = async msg => {
                const sample = `${msg.data},${Date.now()}`.split(',').map(x => +x);

                if (samples.length >= TIME_SYNC_ITERS) {
                    samples.shift();
                    samples.push(sample);

                    if (++fullCount >= PASSIVE_CALC_ITERS) {
                        fullCount = 0;
                        calculate();
                    }

                    await sleep(PASSIVE_SLEEP_TIME_MS);
                } else {
                    samples.push(sample);
                }

                socket.send(Date.now().toString());
            };
            socket.onerror = () => {
                console.error('time sync socket error');
                socket.close();
            };
            socket.onclose = () => {
                console.error('time sync socket closed');
            };
        }

        onOpenRole() {}

        getMenu() { return {}; }

        getCategories() { return []; }

        getPalette() {
            const blocks = [
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
                block('timeSyncGetInfo', 'reporter', 'network', 'time sync info', [], function () {
                    if (world.timeSyncInfo === undefined) {
                        this.pushContext('doYield');
                        this.pushContext();
                        return;
                    }
                    return snapify(world.timeSyncInfo);
                }),
                block('timeSyncGetServerTime', 'reporter', 'network', 'server time', [], function () {
                    if (world.timeSyncInfo === undefined) {
                        this.pushContext('doYield');
                        this.pushContext();
                        return;
                    }
                    return Date.now() + world.timeSyncInfo['clock delta'] * 1000;
                }),
            ];
        }

        getLabelParts() { return []; }
    }

    NetsBloxExtensions.register(TimeSync);
})();
