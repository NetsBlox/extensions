/* tslint:disable */
/* eslint-disable */
/**
* @returns {Promise<void>}
*/
export function main(): Promise<void>;
/**
* @returns {Promise<void>}
*/
export function new_sim_menu(): Promise<void>;
/**
* @returns {Promise<void>}
*/
export function join_sim_menu(): Promise<void>;
/**
*/
export function show_3d_view(): void;
/**
* @returns {Promise<void>}
*/
export function reset_camera_menu(): Promise<void>;
/**
* @returns {any}
*/
export function robots_in_room(): any;
/**
* @returns {any}
*/
export function room_id(): any;
/**
*/
export class BoxOptions {
  free(): void;
/**
*/
  bottomBaseAt?: number;
/**
*/
  depth?: number;
/**
*/
  height?: number;
/**
*/
  sideOrientation?: number;
/**
*/
  size?: number;
/**
*/
  topBaseAt?: number;
/**
*/
  updatable?: boolean;
/**
*/
  width?: number;
/**
*/
  wrap?: boolean;
}
/**
*/
export class SphereOptions {
  free(): void;
/**
*/
  arc?: number;
/**
*/
  diameter?: number;
/**
*/
  diameterX?: number;
/**
*/
  diameterY?: number;
/**
*/
  diameterZ?: number;
/**
*/
  segments?: number;
/**
*/
  sideOrientation?: number;
/**
*/
  slice?: number;
/**
*/
  updatable?: boolean;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly main: () => void;
  readonly new_sim_menu: () => number;
  readonly join_sim_menu: () => number;
  readonly reset_camera_menu: () => number;
  readonly robots_in_room: () => number;
  readonly room_id: () => number;
  readonly show_3d_view: () => void;
  readonly __wbg_sphereoptions_free: (a: number) => void;
  readonly __wbg_get_sphereoptions_slice: (a: number, b: number) => void;
  readonly __wbg_set_sphereoptions_slice: (a: number, b: number, c: number) => void;
  readonly __wbg_get_sphereoptions_updatable: (a: number) => number;
  readonly __wbg_set_sphereoptions_updatable: (a: number, b: number) => void;
  readonly __wbg_boxoptions_free: (a: number) => void;
  readonly __wbg_get_boxoptions_bottomBaseAt: (a: number, b: number) => void;
  readonly __wbg_set_boxoptions_bottomBaseAt: (a: number, b: number, c: number) => void;
  readonly __wbg_get_boxoptions_depth: (a: number, b: number) => void;
  readonly __wbg_set_boxoptions_depth: (a: number, b: number, c: number) => void;
  readonly __wbg_get_boxoptions_height: (a: number, b: number) => void;
  readonly __wbg_set_boxoptions_height: (a: number, b: number, c: number) => void;
  readonly __wbg_get_boxoptions_sideOrientation: (a: number, b: number) => void;
  readonly __wbg_set_boxoptions_sideOrientation: (a: number, b: number, c: number) => void;
  readonly __wbg_get_boxoptions_size: (a: number, b: number) => void;
  readonly __wbg_set_boxoptions_size: (a: number, b: number, c: number) => void;
  readonly __wbg_get_boxoptions_topBaseAt: (a: number, b: number) => void;
  readonly __wbg_set_boxoptions_topBaseAt: (a: number, b: number, c: number) => void;
  readonly __wbg_get_boxoptions_updatable: (a: number) => number;
  readonly __wbg_set_boxoptions_updatable: (a: number, b: number) => void;
  readonly __wbg_get_boxoptions_width: (a: number, b: number) => void;
  readonly __wbg_set_boxoptions_width: (a: number, b: number, c: number) => void;
  readonly __wbg_get_boxoptions_wrap: (a: number) => number;
  readonly __wbg_set_boxoptions_wrap: (a: number, b: number) => void;
  readonly __wbg_get_sphereoptions_arc: (a: number, b: number) => void;
  readonly __wbg_get_sphereoptions_diameter: (a: number, b: number) => void;
  readonly __wbg_get_sphereoptions_diameterX: (a: number, b: number) => void;
  readonly __wbg_get_sphereoptions_diameterY: (a: number, b: number) => void;
  readonly __wbg_get_sphereoptions_diameterZ: (a: number, b: number) => void;
  readonly __wbg_get_sphereoptions_segments: (a: number, b: number) => void;
  readonly __wbg_get_sphereoptions_sideOrientation: (a: number, b: number) => void;
  readonly __wbg_set_sphereoptions_arc: (a: number, b: number, c: number) => void;
  readonly __wbg_set_sphereoptions_diameter: (a: number, b: number, c: number) => void;
  readonly __wbg_set_sphereoptions_diameterX: (a: number, b: number, c: number) => void;
  readonly __wbg_set_sphereoptions_diameterY: (a: number, b: number, c: number) => void;
  readonly __wbg_set_sphereoptions_diameterZ: (a: number, b: number, c: number) => void;
  readonly __wbg_set_sphereoptions_segments: (a: number, b: number, c: number) => void;
  readonly __wbg_set_sphereoptions_sideOrientation: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly _dyn_core__ops__function__Fn_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hbd50058e8e3ed8a0: (a: number, b: number) => void;
  readonly _dyn_core__ops__function__Fn__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h5c441f227d63452f: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hea569866aad972c7: (a: number, b: number) => void;
  readonly wasm_bindgen__convert__closures__invoke0_mut__ha204ea0aa77d1d1c: (a: number, b: number) => void;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h2f48bc7cb1c39ec5: (a: number, b: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h4dc266bd3929c8bd: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly wasm_bindgen__convert__closures__invoke2_mut__h18f41ff999320e94: (a: number, b: number, c: number, d: number) => void;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
