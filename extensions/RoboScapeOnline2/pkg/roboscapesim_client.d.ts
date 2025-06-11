/* tslint:disable */
/* eslint-disable */
export function main(): Promise<void>;
export function new_sim_menu(): Promise<void>;
export function join_sim_menu(): Promise<void>;
export function show_3d_view(): void;
export function reset_camera_menu(): Promise<void>;
export function robots_in_room(): any;
export function room_id(): any;
export class BoxOptions {
  private constructor();
  free(): void;
  get bottomBaseAt(): number | undefined;
  set bottomBaseAt(value: number | null | undefined);
  get depth(): number | undefined;
  set depth(value: number | null | undefined);
  get height(): number | undefined;
  set height(value: number | null | undefined);
  get sideOrientation(): number | undefined;
  set sideOrientation(value: number | null | undefined);
  get size(): number | undefined;
  set size(value: number | null | undefined);
  get topBaseAt(): number | undefined;
  set topBaseAt(value: number | null | undefined);
  get updatable(): boolean | undefined;
  set updatable(value: boolean | null | undefined);
  get width(): number | undefined;
  set width(value: number | null | undefined);
  get wrap(): boolean | undefined;
  set wrap(value: boolean | null | undefined);
}
export class SphereOptions {
  private constructor();
  free(): void;
  get arc(): number | undefined;
  set arc(value: number | null | undefined);
  get diameter(): number | undefined;
  set diameter(value: number | null | undefined);
  get diameterX(): number | undefined;
  set diameterX(value: number | null | undefined);
  get diameterY(): number | undefined;
  set diameterY(value: number | null | undefined);
  get diameterZ(): number | undefined;
  set diameterZ(value: number | null | undefined);
  get segments(): number | undefined;
  set segments(value: number | null | undefined);
  get sideOrientation(): number | undefined;
  set sideOrientation(value: number | null | undefined);
  get slice(): number | undefined;
  set slice(value: number | null | undefined);
  get updatable(): boolean | undefined;
  set updatable(value: boolean | null | undefined);
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly main: () => void;
  readonly new_sim_menu: () => any;
  readonly join_sim_menu: () => any;
  readonly reset_camera_menu: () => any;
  readonly robots_in_room: () => any;
  readonly room_id: () => any;
  readonly show_3d_view: () => void;
  readonly __wbg_sphereoptions_free: (a: number, b: number) => void;
  readonly __wbg_get_sphereoptions_slice: (a: number) => [number, number];
  readonly __wbg_set_sphereoptions_slice: (a: number, b: number, c: number) => void;
  readonly __wbg_get_sphereoptions_updatable: (a: number) => number;
  readonly __wbg_set_sphereoptions_updatable: (a: number, b: number) => void;
  readonly __wbg_boxoptions_free: (a: number, b: number) => void;
  readonly __wbg_get_boxoptions_bottomBaseAt: (a: number) => [number, number];
  readonly __wbg_set_boxoptions_bottomBaseAt: (a: number, b: number, c: number) => void;
  readonly __wbg_get_boxoptions_depth: (a: number) => [number, number];
  readonly __wbg_set_boxoptions_depth: (a: number, b: number, c: number) => void;
  readonly __wbg_get_boxoptions_height: (a: number) => [number, number];
  readonly __wbg_set_boxoptions_height: (a: number, b: number, c: number) => void;
  readonly __wbg_get_boxoptions_sideOrientation: (a: number) => [number, number];
  readonly __wbg_set_boxoptions_sideOrientation: (a: number, b: number, c: number) => void;
  readonly __wbg_get_boxoptions_size: (a: number) => [number, number];
  readonly __wbg_set_boxoptions_size: (a: number, b: number, c: number) => void;
  readonly __wbg_get_boxoptions_topBaseAt: (a: number) => [number, number];
  readonly __wbg_set_boxoptions_topBaseAt: (a: number, b: number, c: number) => void;
  readonly __wbg_get_boxoptions_updatable: (a: number) => number;
  readonly __wbg_set_boxoptions_updatable: (a: number, b: number) => void;
  readonly __wbg_get_boxoptions_width: (a: number) => [number, number];
  readonly __wbg_set_boxoptions_width: (a: number, b: number, c: number) => void;
  readonly __wbg_get_boxoptions_wrap: (a: number) => number;
  readonly __wbg_set_boxoptions_wrap: (a: number, b: number) => void;
  readonly __wbg_get_sphereoptions_arc: (a: number) => [number, number];
  readonly __wbg_get_sphereoptions_diameter: (a: number) => [number, number];
  readonly __wbg_get_sphereoptions_diameterX: (a: number) => [number, number];
  readonly __wbg_get_sphereoptions_diameterY: (a: number) => [number, number];
  readonly __wbg_get_sphereoptions_diameterZ: (a: number) => [number, number];
  readonly __wbg_get_sphereoptions_segments: (a: number) => [number, number];
  readonly __wbg_get_sphereoptions_sideOrientation: (a: number) => [number, number];
  readonly __wbg_set_sphereoptions_arc: (a: number, b: number, c: number) => void;
  readonly __wbg_set_sphereoptions_diameter: (a: number, b: number, c: number) => void;
  readonly __wbg_set_sphereoptions_diameterX: (a: number, b: number, c: number) => void;
  readonly __wbg_set_sphereoptions_diameterY: (a: number, b: number, c: number) => void;
  readonly __wbg_set_sphereoptions_diameterZ: (a: number, b: number, c: number) => void;
  readonly __wbg_set_sphereoptions_segments: (a: number, b: number, c: number) => void;
  readonly __wbg_set_sphereoptions_sideOrientation: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_6: WebAssembly.Table;
  readonly _dyn_core__ops__function__Fn_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hf36be73cc3b27762: (a: number, b: number) => void;
  readonly closure93_externref_shim: (a: number, b: number, c: any) => void;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h4aeeda66ebe353ed: (a: number, b: number) => void;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h1f92b59833c3560d: (a: number, b: number) => void;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hf58865bd4727c439: (a: number, b: number) => void;
  readonly closure416_externref_shim: (a: number, b: number, c: any) => void;
  readonly closure438_externref_shim: (a: number, b: number, c: any, d: any) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
