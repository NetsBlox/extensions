let wasm;

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function getObject(idx) { return heap[idx]; }

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : { encode: () => { throw Error('TextEncoder not available') } } );

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

let cachedFloat64Memory0 = null;

function getFloat64Memory0() {
    if (cachedFloat64Memory0 === null || cachedFloat64Memory0.byteLength === 0) {
        cachedFloat64Memory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachedFloat64Memory0;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(state => {
    wasm.__wbindgen_export_2.get(state.dtor)(state.a, state.b)
});

function makeClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        try {
            return f(state.a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_2.get(state.dtor)(state.a, state.b);
                state.a = 0;
                CLOSURE_DTORS.unregister(state);
            }
        }
    };
    real.original = state;
    CLOSURE_DTORS.register(real, state, state);
    return real;
}
function __wbg_adapter_30(arg0, arg1) {
    wasm._dyn_core__ops__function__Fn_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hbd50058e8e3ed8a0(arg0, arg1);
}

function __wbg_adapter_33(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__Fn__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h5c441f227d63452f(arg0, arg1, addHeapObject(arg2));
}

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_2.get(state.dtor)(a, state.b);
                CLOSURE_DTORS.unregister(state);
            } else {
                state.a = a;
            }
        }
    };
    real.original = state;
    CLOSURE_DTORS.register(real, state, state);
    return real;
}
function __wbg_adapter_36(arg0, arg1) {
    wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hea569866aad972c7(arg0, arg1);
}

function __wbg_adapter_41(arg0, arg1) {
    wasm.wasm_bindgen__convert__closures__invoke0_mut__ha204ea0aa77d1d1c(arg0, arg1);
}

function __wbg_adapter_44(arg0, arg1) {
    wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h2f48bc7cb1c39ec5(arg0, arg1);
}

function __wbg_adapter_47(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h4dc266bd3929c8bd(arg0, arg1, addHeapObject(arg2));
}

/**
* @returns {Promise<void>}
*/
export function main() {
    wasm.main();
}

/**
* @returns {Promise<void>}
*/
export function new_sim_menu() {
    const ret = wasm.new_sim_menu();
    return takeObject(ret);
}

/**
* @returns {Promise<void>}
*/
export function join_sim_menu() {
    const ret = wasm.join_sim_menu();
    return takeObject(ret);
}

/**
*/
export function show_3d_view() {
    wasm.show_3d_view();
}

/**
* @returns {Promise<void>}
*/
export function reset_camera_menu() {
    const ret = wasm.reset_camera_menu();
    return takeObject(ret);
}

/**
* @returns {any}
*/
export function robots_in_room() {
    const ret = wasm.robots_in_room();
    return takeObject(ret);
}

/**
* @returns {any}
*/
export function room_id() {
    const ret = wasm.room_id();
    return takeObject(ret);
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}
function __wbg_adapter_291(arg0, arg1, arg2, arg3) {
    wasm.wasm_bindgen__convert__closures__invoke2_mut__h18f41ff999320e94(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
}

const BoxOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_boxoptions_free(ptr >>> 0));
/**
*/
export class BoxOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(BoxOptions.prototype);
        obj.__wbg_ptr = ptr;
        BoxOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BoxOptionsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_boxoptions_free(ptr);
    }
    /**
    * @returns {number | undefined}
    */
    get bottomBaseAt() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_boxoptions_bottomBaseAt(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r2 = getFloat64Memory0()[retptr / 8 + 1];
            return r0 === 0 ? undefined : r2;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number | undefined} [arg0]
    */
    set bottomBaseAt(arg0) {
        wasm.__wbg_set_boxoptions_bottomBaseAt(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? 0 : arg0);
    }
    /**
    * @returns {number | undefined}
    */
    get depth() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_boxoptions_depth(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r2 = getFloat64Memory0()[retptr / 8 + 1];
            return r0 === 0 ? undefined : r2;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number | undefined} [arg0]
    */
    set depth(arg0) {
        wasm.__wbg_set_boxoptions_depth(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? 0 : arg0);
    }
    /**
    * @returns {number | undefined}
    */
    get height() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_boxoptions_height(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r2 = getFloat64Memory0()[retptr / 8 + 1];
            return r0 === 0 ? undefined : r2;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number | undefined} [arg0]
    */
    set height(arg0) {
        wasm.__wbg_set_boxoptions_height(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? 0 : arg0);
    }
    /**
    * @returns {number | undefined}
    */
    get sideOrientation() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_boxoptions_sideOrientation(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r2 = getFloat64Memory0()[retptr / 8 + 1];
            return r0 === 0 ? undefined : r2;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number | undefined} [arg0]
    */
    set sideOrientation(arg0) {
        wasm.__wbg_set_boxoptions_sideOrientation(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? 0 : arg0);
    }
    /**
    * @returns {number | undefined}
    */
    get size() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_boxoptions_size(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r2 = getFloat64Memory0()[retptr / 8 + 1];
            return r0 === 0 ? undefined : r2;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number | undefined} [arg0]
    */
    set size(arg0) {
        wasm.__wbg_set_boxoptions_size(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? 0 : arg0);
    }
    /**
    * @returns {number | undefined}
    */
    get topBaseAt() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_boxoptions_topBaseAt(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r2 = getFloat64Memory0()[retptr / 8 + 1];
            return r0 === 0 ? undefined : r2;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number | undefined} [arg0]
    */
    set topBaseAt(arg0) {
        wasm.__wbg_set_boxoptions_topBaseAt(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? 0 : arg0);
    }
    /**
    * @returns {boolean | undefined}
    */
    get updatable() {
        const ret = wasm.__wbg_get_boxoptions_updatable(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
    * @param {boolean | undefined} [arg0]
    */
    set updatable(arg0) {
        wasm.__wbg_set_boxoptions_updatable(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
    * @returns {number | undefined}
    */
    get width() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_boxoptions_width(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r2 = getFloat64Memory0()[retptr / 8 + 1];
            return r0 === 0 ? undefined : r2;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number | undefined} [arg0]
    */
    set width(arg0) {
        wasm.__wbg_set_boxoptions_width(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? 0 : arg0);
    }
    /**
    * @returns {boolean | undefined}
    */
    get wrap() {
        const ret = wasm.__wbg_get_boxoptions_wrap(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
    * @param {boolean | undefined} [arg0]
    */
    set wrap(arg0) {
        wasm.__wbg_set_boxoptions_wrap(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
}

const SphereOptionsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_sphereoptions_free(ptr >>> 0));
/**
*/
export class SphereOptions {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SphereOptions.prototype);
        obj.__wbg_ptr = ptr;
        SphereOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SphereOptionsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sphereoptions_free(ptr);
    }
    /**
    * @returns {number | undefined}
    */
    get arc() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_boxoptions_bottomBaseAt(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r2 = getFloat64Memory0()[retptr / 8 + 1];
            return r0 === 0 ? undefined : r2;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number | undefined} [arg0]
    */
    set arc(arg0) {
        wasm.__wbg_set_boxoptions_bottomBaseAt(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? 0 : arg0);
    }
    /**
    * @returns {number | undefined}
    */
    get diameter() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_boxoptions_depth(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r2 = getFloat64Memory0()[retptr / 8 + 1];
            return r0 === 0 ? undefined : r2;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number | undefined} [arg0]
    */
    set diameter(arg0) {
        wasm.__wbg_set_boxoptions_depth(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? 0 : arg0);
    }
    /**
    * @returns {number | undefined}
    */
    get diameterX() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_boxoptions_height(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r2 = getFloat64Memory0()[retptr / 8 + 1];
            return r0 === 0 ? undefined : r2;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number | undefined} [arg0]
    */
    set diameterX(arg0) {
        wasm.__wbg_set_boxoptions_height(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? 0 : arg0);
    }
    /**
    * @returns {number | undefined}
    */
    get diameterY() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_boxoptions_sideOrientation(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r2 = getFloat64Memory0()[retptr / 8 + 1];
            return r0 === 0 ? undefined : r2;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number | undefined} [arg0]
    */
    set diameterY(arg0) {
        wasm.__wbg_set_boxoptions_sideOrientation(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? 0 : arg0);
    }
    /**
    * @returns {number | undefined}
    */
    get diameterZ() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_boxoptions_size(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r2 = getFloat64Memory0()[retptr / 8 + 1];
            return r0 === 0 ? undefined : r2;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number | undefined} [arg0]
    */
    set diameterZ(arg0) {
        wasm.__wbg_set_boxoptions_size(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? 0 : arg0);
    }
    /**
    * @returns {number | undefined}
    */
    get segments() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_boxoptions_topBaseAt(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r2 = getFloat64Memory0()[retptr / 8 + 1];
            return r0 === 0 ? undefined : r2;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number | undefined} [arg0]
    */
    set segments(arg0) {
        wasm.__wbg_set_boxoptions_topBaseAt(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? 0 : arg0);
    }
    /**
    * @returns {number | undefined}
    */
    get sideOrientation() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_boxoptions_width(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r2 = getFloat64Memory0()[retptr / 8 + 1];
            return r0 === 0 ? undefined : r2;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number | undefined} [arg0]
    */
    set sideOrientation(arg0) {
        wasm.__wbg_set_boxoptions_width(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? 0 : arg0);
    }
    /**
    * @returns {number | undefined}
    */
    get slice() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.__wbg_get_sphereoptions_slice(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r2 = getFloat64Memory0()[retptr / 8 + 1];
            return r0 === 0 ? undefined : r2;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number | undefined} [arg0]
    */
    set slice(arg0) {
        wasm.__wbg_set_sphereoptions_slice(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? 0 : arg0);
    }
    /**
    * @returns {boolean | undefined}
    */
    get updatable() {
        const ret = wasm.__wbg_get_sphereoptions_updatable(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
    * @param {boolean | undefined} [arg0]
    */
    set updatable(arg0) {
        wasm.__wbg_set_sphereoptions_updatable(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbindgen_cb_drop = function(arg0) {
        const obj = takeObject(arg0).original;
        if (obj.cnt-- == 1) {
            obj.a = 0;
            return true;
        }
        const ret = false;
        return ret;
    };
    imports.wbg.__wbindgen_number_new = function(arg0) {
        const ret = arg0;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        const ret = getObject(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_string = function(arg0) {
        const ret = typeof(getObject(arg0)) === 'string';
        return ret;
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        const ret = typeof(obj) === 'string' ? obj : undefined;
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        const ret = typeof(obj) === 'number' ? obj : undefined;
        getFloat64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? 0 : ret;
        getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
    };
    imports.wbg.__wbg_clearTimeout_541ac0980ffcef74 = function(arg0) {
        const ret = clearTimeout(takeObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_setTimeout_7d81d052875b0f4f = function() { return handleError(function (arg0, arg1) {
        const ret = setTimeout(getObject(arg0), arg1);
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_fetch_eadcbc7351113537 = function(arg0) {
        const ret = fetch(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_27612987a19b7643 = function(arg0, arg1, arg2, arg3) {
        const ret = new BABYLON.UniversalCamera(getStringFromWasm0(arg0, arg1), takeObject(arg2), getObject(arg3));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_attachControl_8c89ab629f1c0cff = function(arg0, arg1, arg2) {
        getObject(arg0).attachControl(takeObject(arg1), arg2 !== 0);
    };
    imports.wbg.__wbg_setposition_20f2d9cb9af43a44 = function(arg0, arg1) {
        getObject(arg0).position = getObject(arg1);
    };
    imports.wbg.__wbg_setrotation_9003239e40171969 = function(arg0, arg1) {
        getObject(arg0).rotation = getObject(arg1);
    };
    imports.wbg.__wbg_new_2854269d6455ef36 = function(arg0, arg1, arg2, arg3) {
        const ret = new BABYLON.FollowCamera(getStringFromWasm0(arg0, arg1), takeObject(arg2), getObject(arg3));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_addShadowCaster_9648d9a8f3d765a7 = function(arg0, arg1, arg2) {
        getObject(arg0).addShadowCaster(getObject(arg1), arg2 !== 0);
    };
    imports.wbg.__wbg_new_6a363927dd452539 = function(arg0, arg1, arg2, arg3) {
        const ret = new BABYLON.HemisphericLight(getStringFromWasm0(arg0, arg1), takeObject(arg2), getObject(arg3));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_7dfd9ee8f8834749 = function(arg0, arg1, arg2, arg3) {
        const ret = new BABYLON.DirectionalLight(getStringFromWasm0(arg0, arg1), takeObject(arg2), getObject(arg3));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_96f7619d15d4313d = function(arg0, arg1) {
        const ret = new BABYLON.CascadedShadowGenerator(arg0, getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_a54881b95ffbb449 = function(arg0, arg1, arg2) {
        const ret = new BABYLON.Vector3(arg0, arg1, arg2);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_5b2be8808d2968fb = function(arg0, arg1, arg2) {
        const ret = new BABYLON.Color3(arg0, arg1, arg2);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_948fd10cc5b38aa6 = function(arg0, arg1, arg2, arg3) {
        const ret = new BABYLON.Quaternion(arg0, arg1, arg2, arg3);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_CreateSphere_f83bbcd04e7561e9 = function(arg0, arg1, arg2, arg3) {
        const ret = BABYLON.MeshBuilder.CreateSphere(getStringFromWasm0(arg0, arg1), SphereOptions.__wrap(arg2), getObject(arg3));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_CreateBox_a56f20b32bac6ec8 = function(arg0, arg1, arg2, arg3) {
        const ret = BABYLON.MeshBuilder.CreateBox(getStringFromWasm0(arg0, arg1), BoxOptions.__wrap(arg2), getObject(arg3));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_ImportMeshAsync_c502207ca7f8399d = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
        const ret = BABYLON.SceneLoader.ImportMeshAsync(arg0 === 0 ? undefined : getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3), getStringFromWasm0(arg4, arg5), getObject(arg6));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_resize_1dbad595eeddf45c = function(arg0, arg1) {
        getObject(arg0).resize(arg1 === 0xFFFFFF ? undefined : arg1 !== 0);
    };
    imports.wbg.__wbg_render_f22cbd661cdb8f1c = function(arg0, arg1, arg2) {
        getObject(arg0).render(arg1 === 0xFFFFFF ? undefined : arg1 !== 0, arg2 === 0xFFFFFF ? undefined : arg2 !== 0);
    };
    imports.wbg.__wbg_new_c3c977898c281ed6 = function(arg0, arg1) {
        const ret = new BABYLON.Engine(getObject(arg0), arg1 !== 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_45d37b85acf233e8 = function(arg0) {
        const ret = new BABYLON.Scene(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_runRenderLoop_200e171f31657f74 = function(arg0, arg1) {
        getObject(arg0).runRenderLoop(getObject(arg1));
    };
    imports.wbg.__wbg_setposition_a494d8613d8f24bb = function(arg0, arg1) {
        getObject(arg0).position = getObject(arg1);
    };
    imports.wbg.__wbg_setrotationQuaternion_a5cebb17ee5144b1 = function(arg0, arg1) {
        getObject(arg0).rotationQuaternion = getObject(arg1);
    };
    imports.wbg.__wbg_setrotation_623faed4e43eb133 = function(arg0, arg1) {
        getObject(arg0).rotation = getObject(arg1);
    };
    imports.wbg.__wbg_dispose_46c34a89459224e3 = function(arg0, arg1, arg2) {
        getObject(arg0).dispose(arg1 === 0xFFFFFF ? undefined : arg1 !== 0, arg2 === 0xFFFFFF ? undefined : arg2 !== 0);
    };
    imports.wbg.__wbg_new_4855ab8bf2aeff20 = function(arg0, arg1, arg2) {
        const ret = new BABYLON.Mesh(getStringFromWasm0(arg0, arg1), getObject(arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_17fce525a7117c7a = function(arg0, arg1, arg2) {
        const ret = new BABYLON.StandardMaterial(getStringFromWasm0(arg0, arg1), getObject(arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_d156ce813fd03f00 = function(arg0, arg1) {
        const ret = new BABYLON.Texture(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_queueMicrotask_481971b0d87f3dd4 = function(arg0) {
        queueMicrotask(getObject(arg0));
    };
    imports.wbg.__wbg_queueMicrotask_3cbae2ec6b6cd3d6 = function(arg0) {
        const ret = getObject(arg0).queueMicrotask;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_function = function(arg0) {
        const ret = typeof(getObject(arg0)) === 'function';
        return ret;
    };
    imports.wbg.__wbg_instanceof_Window_f401953a2cf86220 = function(arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof Window;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_document_5100775d18896c16 = function(arg0) {
        const ret = getObject(arg0).document;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_setonresize_8883ecf5f6193931 = function(arg0, arg1) {
        getObject(arg0).onresize = getObject(arg1);
    };
    imports.wbg.__wbg_localStorage_e381d34d0c40c761 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).localStorage;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_clearTimeout_ba63ae54a36e111e = function(arg0, arg1) {
        getObject(arg0).clearTimeout(arg1);
    };
    imports.wbg.__wbg_setTimeout_c172d5704ef82276 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).setTimeout(getObject(arg1), arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_setinnerHTML_26d69b59e1af99c7 = function(arg0, arg1, arg2) {
        getObject(arg0).innerHTML = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_querySelectorAll_2dc2b23a07bee926 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).querySelectorAll(getStringFromWasm0(arg1, arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_setAttribute_3c9f6c303b696daa = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).setAttribute(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_createElement_8bae7856a4bb7411 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).createElement(getStringFromWasm0(arg1, arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_getElementById_c369ff43f0db99cf = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).getElementById(getStringFromWasm0(arg1, arg2));
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_querySelector_a5f74efc5fa193dd = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).querySelector(getStringFromWasm0(arg1, arg2));
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_setinnerText_087b7e3f90d97466 = function(arg0, arg1, arg2) {
        getObject(arg0).innerText = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_style_c3fc3dd146182a2d = function(arg0) {
        const ret = getObject(arg0).style;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_setonchange_8f887c27a2d4469d = function(arg0, arg1) {
        getObject(arg0).onchange = getObject(arg1);
    };
    imports.wbg.__wbg_fetch_921fad6ef9e883dd = function(arg0, arg1) {
        const ret = getObject(arg0).fetch(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_value_47fe6384562f52ab = function(arg0, arg1) {
        const ret = getObject(arg1).value;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbg_setvalue_78cb4f1fef58ae98 = function(arg0, arg1, arg2) {
        getObject(arg0).value = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_removeProperty_fa6d48e2923dcfac = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = getObject(arg1).removeProperty(getStringFromWasm0(arg2, arg3));
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    }, arguments) };
    imports.wbg.__wbg_setProperty_ea7d15a2b591aa97 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).setProperty(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_addEventListener_53b787075bd5e003 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        getObject(arg0).addEventListener(getStringFromWasm0(arg1, arg2), getObject(arg3));
    }, arguments) };
    imports.wbg.__wbg_newwithstrandinit_3fd6fba4083ff2d0 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = new Request(getStringFromWasm0(arg0, arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_preventDefault_b1a4aafc79409429 = function(arg0) {
        getObject(arg0).preventDefault();
    };
    imports.wbg.__wbg_instanceof_Response_849eb93e75734b6e = function(arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof Response;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_url_5f6dc4009ac5f99d = function(arg0, arg1) {
        const ret = getObject(arg1).url;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbg_status_61a01141acd3cf74 = function(arg0) {
        const ret = getObject(arg0).status;
        return ret;
    };
    imports.wbg.__wbg_headers_9620bfada380764a = function(arg0) {
        const ret = getObject(arg0).headers;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_arrayBuffer_29931d52c7206b02 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).arrayBuffer();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_getItem_164e8e5265095b87 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = getObject(arg1).getItem(getStringFromWasm0(arg2, arg3));
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    }, arguments) };
    imports.wbg.__wbg_signal_a61f78a3478fd9bc = function(arg0) {
        const ret = getObject(arg0).signal;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_0d76b0581eca6298 = function() { return handleError(function () {
        const ret = new AbortController();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_abort_2aa7521d5690750e = function(arg0) {
        getObject(arg0).abort();
    };
    imports.wbg.__wbg_firstChild_a10db88beca6812e = function(arg0) {
        const ret = getObject(arg0).firstChild;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_nextSibling_709614fdb0fb7a66 = function(arg0) {
        const ret = getObject(arg0).nextSibling;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_textContent_8e392d624539e731 = function(arg0, arg1) {
        const ret = getObject(arg1).textContent;
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbg_settextContent_d271bab459cbb1ba = function(arg0, arg1, arg2) {
        getObject(arg0).textContent = arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_appendChild_580ccb11a660db68 = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).appendChild(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_removeChild_96bbfefd2f5a0261 = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).removeChild(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_get_8cd5eba00ab6304f = function(arg0, arg1) {
        const ret = getObject(arg0)[arg1 >>> 0];
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_log_5bb5f88f245d7762 = function(arg0) {
        console.log(getObject(arg0));
    };
    imports.wbg.__wbg_new_ab6fd82b10560829 = function() { return handleError(function () {
        const ret = new Headers();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_append_7bfcb4937d1d5e29 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).append(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_readyState_1c157e4ea17c134a = function(arg0) {
        const ret = getObject(arg0).readyState;
        return ret;
    };
    imports.wbg.__wbg_setonopen_ce7a4c51e5cf5788 = function(arg0, arg1) {
        getObject(arg0).onopen = getObject(arg1);
    };
    imports.wbg.__wbg_setonerror_39a785302b0cd2e9 = function(arg0, arg1) {
        getObject(arg0).onerror = getObject(arg1);
    };
    imports.wbg.__wbg_setonclose_b9929b1c1624dff3 = function(arg0, arg1) {
        getObject(arg0).onclose = getObject(arg1);
    };
    imports.wbg.__wbg_setonmessage_2af154ce83a3dc94 = function(arg0, arg1) {
        getObject(arg0).onmessage = getObject(arg1);
    };
    imports.wbg.__wbg_setbinaryType_b0cf5103cd561959 = function(arg0, arg1) {
        getObject(arg0).binaryType = takeObject(arg1);
    };
    imports.wbg.__wbg_new_6c74223c77cfabad = function() { return handleError(function (arg0, arg1) {
        const ret = new WebSocket(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_close_acd9532ff5c093ea = function() { return handleError(function (arg0) {
        getObject(arg0).close();
    }, arguments) };
    imports.wbg.__wbg_send_5fcd7bab9777194e = function() { return handleError(function (arg0, arg1, arg2) {
        getObject(arg0).send(getArrayU8FromWasm0(arg1, arg2));
    }, arguments) };
    imports.wbg.__wbg_now_4e659b3d15f470d9 = function(arg0) {
        const ret = getObject(arg0).now();
        return ret;
    };
    imports.wbg.__wbg_get_bd8e338fbd5f5cc8 = function(arg0, arg1) {
        const ret = getObject(arg0)[arg1 >>> 0];
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_length_cd7af8117672b8b8 = function(arg0) {
        const ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_new_16b304a2cfa7ff4a = function() {
        const ret = new Array();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newnoargs_e258087cd0daa0ea = function(arg0, arg1) {
        const ret = new Function(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_object = function(arg0) {
        const val = getObject(arg0);
        const ret = typeof(val) === 'object' && val !== null;
        return ret;
    };
    imports.wbg.__wbg_next_40fc327bfc8770e6 = function(arg0) {
        const ret = getObject(arg0).next;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_next_196c84450b364254 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).next();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_done_298b57d23c0fc80c = function(arg0) {
        const ret = getObject(arg0).done;
        return ret;
    };
    imports.wbg.__wbg_value_d93c65011f51a456 = function(arg0) {
        const ret = getObject(arg0).value;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_iterator_2cee6dadfd956dfa = function() {
        const ret = Symbol.iterator;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_get_e3c254076557e348 = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.get(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_call_27c0f87801dedf93 = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_new_72fb9a18b5ae2624 = function() {
        const ret = new Object();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_self_ce0dbfc45cf2f5be = function() { return handleError(function () {
        const ret = self.self;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_window_c6fb939a7f436783 = function() { return handleError(function () {
        const ret = window.window;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_globalThis_d1e6af4856ba331b = function() { return handleError(function () {
        const ret = globalThis.globalThis;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_global_207b558942527489 = function() { return handleError(function () {
        const ret = global.global;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        const ret = getObject(arg0) === undefined;
        return ret;
    };
    imports.wbg.__wbg_eval_020a6ea487e91ede = function() { return handleError(function (arg0, arg1) {
        const ret = eval(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_push_a5b05aedc7234f9f = function(arg0, arg1) {
        const ret = getObject(arg0).push(getObject(arg1));
        return ret;
    };
    imports.wbg.__wbg_instanceof_ArrayBuffer_836825be07d4c9d2 = function(arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof ArrayBuffer;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_call_b3ca7c6051f9bec1 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_call_8e7cb608789c2528 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = getObject(arg0).call(getObject(arg1), getObject(arg2), getObject(arg3));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_new_81740750da40724f = function(arg0, arg1) {
        try {
            var state0 = {a: arg0, b: arg1};
            var cb0 = (arg0, arg1) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_291(a, state0.b, arg0, arg1);
                } finally {
                    state0.a = a;
                }
            };
            const ret = new Promise(cb0);
            return addHeapObject(ret);
        } finally {
            state0.a = state0.b = 0;
        }
    };
    imports.wbg.__wbg_resolve_b0083a7967828ec8 = function(arg0) {
        const ret = Promise.resolve(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_then_0c86a60e8fcfe9f6 = function(arg0, arg1) {
        const ret = getObject(arg0).then(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_then_a73caa9a87991566 = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_buffer_12d079cc21e14bdb = function(arg0) {
        const ret = getObject(arg0).buffer;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_aa4a17c33a06e5cb = function(arg0, arg1, arg2) {
        const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_63b92bc8671ed464 = function(arg0) {
        const ret = new Uint8Array(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_a47bac70306a19a7 = function(arg0, arg1, arg2) {
        getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    };
    imports.wbg.__wbg_length_c20a40f15020d68a = function(arg0) {
        const ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_stringify_8887fe74e1c50d81 = function() { return handleError(function (arg0) {
        const ret = JSON.stringify(getObject(arg0));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_apply_0a5aa603881e6d79 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Reflect.apply(getObject(arg0), getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_construct_597527ea0f9286ea = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.construct(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_has_0af94d20077affa2 = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.has(getObject(arg0), getObject(arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_set_1f9b04f170055d33 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_abda76e883ba8a5f = function() {
        const ret = new Error();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_stack_658279fe44541cf6 = function(arg0, arg1) {
        const ret = getObject(arg1).stack;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbg_error_f851667af71bcfc6 = function(arg0, arg1) {
        let deferred0_0;
        let deferred0_1;
        try {
            deferred0_0 = arg0;
            deferred0_1 = arg1;
            console.error(getStringFromWasm0(arg0, arg1));
        } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
        }
    };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        const ret = debugString(getObject(arg1));
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_memory = function() {
        const ret = wasm.memory;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper378 = function(arg0, arg1, arg2) {
        const ret = makeClosure(arg0, arg1, 87, __wbg_adapter_30);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper379 = function(arg0, arg1, arg2) {
        const ret = makeClosure(arg0, arg1, 87, __wbg_adapter_33);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper380 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 87, __wbg_adapter_36);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper381 = function(arg0, arg1, arg2) {
        const ret = makeClosure(arg0, arg1, 87, __wbg_adapter_33);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper761 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 245, __wbg_adapter_41);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper1228 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 407, __wbg_adapter_44);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper1286 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 419, __wbg_adapter_47);
        return addHeapObject(ret);
    };

    return imports;
}

function __wbg_init_memory(imports, maybe_memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedFloat64Memory0 = null;
    cachedInt32Memory0 = null;
    cachedUint8Memory0 = null;

    wasm.__wbindgen_start();
    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(input) {
    if (wasm !== undefined) return wasm;

    if (typeof input === 'undefined') {
        input = new URL('roboscapesim_client_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await input, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync }
export default __wbg_init;
