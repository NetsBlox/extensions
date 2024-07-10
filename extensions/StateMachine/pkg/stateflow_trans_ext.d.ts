/* tslint:disable */
/* eslint-disable */
/**
*/
export function visualize(): void;
/**
* @param {any} proc
* @param {any} machine
* @param {any} state
*/
export function transition(proc: any, machine: any, state: any): void;
/**
* @param {any} proc
* @param {any} machine
* @param {any} state
* @returns {boolean}
*/
export function check_state(proc: any, machine: any, state: any): boolean;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly transition: (a: number, b: number, c: number) => void;
  readonly check_state: (a: number, b: number, c: number) => number;
  readonly visualize: () => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
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
