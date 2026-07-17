# Shell and Developer Tools

## Shell: ZSH

ZSH is the default shell for every user on Kira, including root. `/bin/sh` remains BusyBox's shell, used for scripts and early boot, ZSH is what you actually land in.

It ships with:

- [`zsh-autosuggestions`](https://github.com/zsh-users/zsh-autosuggestions)
- [`zsh-syntax-highlighting`](https://github.com/zsh-users/zsh-syntax-highlighting)
- [`powerlevel10k`](https://github.com/romkatv/powerlevel10k), configured as a lean, two-line prompt with instant prompt enabled
- the `git` plugin from oh-my-zsh

Useful aliases are set up out of the box: navigation shortcuts, `ll` and `la` for listing, short flux shortcuts, git shortcuts, and runit shortcuts for `reboot` and `poweroff`.

## Ready to code on first boot

Core development tools ship in the desktop image, there is no lengthy setup pass required after install before you can start writing code.

Whole language toolchains are one flux install away, as **devkits**:

```sh
flux install devkit-rust
```

```
» rustc cargo rust-analyzer clippy ...
✓ ready to code.
```

Devkits exist for the common languages, including `devkit-c`, `devkit-go`, and `devkit-python`, each bundling the compiler or interpreter, a language server, and the tools you would normally install one at a time.

## Base developer tools

Available through flux on any tier: `make`, `binutils`, `flex`, `bison`, `pkgconf`, `gcc`, `util-linux`, `parted`, `e2fsprogs`, `dosfstools`, `git`, and the usual `curl`, `minisign`, `zstd` toolchain flux itself depends on.

## System information

```sh
fetch
```

Prints a summary of your system: shell, uptime, and the Kira color palette. It is not run automatically on login, run it whenever you want it.

## Where to go next

- [flux Command Reference](/flux/commands), for installing anything else you need.
- [Desktop Overview](/desktop/overview), if you are setting up a graphical environment.
