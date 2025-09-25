/* tslint:disable */
/* eslint-disable */
export function create_beatblox_oscillator(oscillator_type: string): AudioBuffer[];
export class AudioBuffer {
  private constructor();
  free(): void;
  get_data(): Float32Array;
  sample_rate: number;
  size: number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_audiobuffer_free: (a: number, b: number) => void;
  readonly __wbg_get_audiobuffer_sample_rate: (a: number) => number;
  readonly __wbg_set_audiobuffer_sample_rate: (a: number, b: number) => void;
  readonly __wbg_get_audiobuffer_size: (a: number) => number;
  readonly __wbg_set_audiobuffer_size: (a: number, b: number) => void;
  readonly audiobuffer_get_data: (a: number) => [number, number];
  readonly create_beatblox_oscillator: (a: number, b: number) => [number, number];
  readonly __wbindgen_export_0: WebAssembly.Table;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __externref_drop_slice: (a: number, b: number) => void;
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
