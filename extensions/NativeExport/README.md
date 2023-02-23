## Updating

This extension uses wasm, but due to security issues we have to host it ourselves.
To update the wasm components, you'll need the following repository cloned (outside of this repo).

```sh
git clone https://github.com/dragazo/netsblox-vm-wasm
```

You'll also need wasm-pack installed on your system.

```sh
cargo install wasm-pack
```

Next, build the required wasm module for the `web` target (optionally start by deleting the existing `pkg` directory if it already exists).

```sh
wasm-pack build --target web
```

Finally, copy the following two files to this directory:

- `pkg/netsblox_vm.js`
- `pkg/netsblox_vm_bg.wasm`
