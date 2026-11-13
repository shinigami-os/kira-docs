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

Core development tools ship with every install, there is no lengthy setup pass required after install before you can start writing code.

Whole language toolchains are one flux install away, as **devkits**:

```sh
flux install kira-devkit-rust
```

```
» rustc cargo rust-analyzer clippy ...
✓ ready to code.
```

Devkits exist for the common languages, including `kira-devkit-c`, `kira-devkit-go`, and `kira-devkit-python`, each bundling the compiler or interpreter, a language server, and the tools you would normally install one at a time.

## Base developer tools

Available through flux on any tier: `make`, `binutils`, `flex`, `bison`, `pkgconf`, `gcc`, `util-linux`, `parted`, `e2fsprogs`, `dosfstools`, `git`, and the usual `curl`, `minisign`, `zstd` toolchain flux itself depends on.

## System information

```sh
fetch
```

Prints a summary of your system: shell, uptime, and the Kira color palette. It is not run automatically on login, run it whenever you want it.

## Kokuin: how your machine boots

```sh
kokuin-cli status
kokuin-cli tui
```

[kokuin-cli](https://github.com/shinigami-os/kokuin-cli) shows how the machine booted, from the firmware to the desktop: the chain (firmware, bootloader, kernel, init, session), every stage on one time axis, every event and why it happens. It reads the boot you are in, and with `sudo kokuin-cli enable` it records the next ones, so every program that ran is kept. `kokuin-cli diff -2 last` compares two boots, `kokuin-cli explain` explains each step in plain words. It ships with `kira-kokuin-cli`, which `kira-kokuin` pulls in.

On a Kira desktop, [kokuin](https://github.com/shinigami-os/kokuin) is the same thing as an app, for those who prefer not to use a terminal. It is installed with the desktop (`kira-kokuin`, through `kira-desktop-apps`) and found in the launcher by typing `kokuin`. It does everything the command does: reading and saving boots, the timeline, comparing two boots, the explanations, and the recorder (each change can be previewed first, and asks for your password only when it is done).

## kokuin: how this machine boots

kokuin follows a boot from the power button to a usable desktop (firmware, bootloader, kernel, initramfs, init, services, session) and explains each step. It comes with every install: `kokuin-cli` on a server, and on a desktop `kokuin` too, its window.

```sh
sudo kokuin-cli show          # the current boot: chain, stages, milestones, slowest steps
sudo kokuin-cli timeline      # everything that happened, in order
kokuin-cli explain            # what each step is, in plain words
sudo kokuin-cli enable        # record every boot from now on (adds kokuin-init to the kernel command line), then reboot
```

Without root it still works, but it sees less: the kernel log, the TPM log and some firmware data are readable by root only. Kira's kernel exposes what it reads: the ACPI firmware timings, the TPM measured-boot log, the EFI variables and the process events.

## Where to go next

- [flux Command Reference](/flux/commands), for installing anything else you need.
- [Desktop Overview](/desktop/overview), if you are setting up a graphical environment.
