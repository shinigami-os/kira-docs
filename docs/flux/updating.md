# Updating Kira

Kira is a rolling release, and staying current is always something you choose to do, never something that happens to you in the background. `flux update` only ever checks and reports. The actual updates run as separate, explicit commands.

## Checking what's available

```sh
flux update
```

This does two things: it syncs the local recipe repository with the remote one, and it checks whether a newer flux, kira-base, or kernel release exists. If any of them are out of date, it prints a notice telling you which command to run. It never runs an update on its own.

## Updating packages

Ordinary packages update the same way they install:

```sh
flux install <package>
```

Reinstalling an already-installed package with a newer recipe pulls the newer version. There is no separate "upgrade" command for individual packages.

## Updating flux itself

```sh
flux self-update
```

Rebuilds flux from the latest release tag and atomically replaces the running binary, keeping a backup of the previous one. flux is a single, self-contained binary, so this is a fast, low-risk operation.

## Updating the core system

```sh
flux base-update
```

`kira-base`, musl, BusyBox, runit, and eudev, cannot rebuild itself from source on an installed system the way flux can, since that would need a cross-compilation toolchain and the kernel source tree, neither of which belongs on an ordinary install. Instead, `flux base-update` downloads a signed, prebuilt release from the binary cache and applies it according to a manifest that classifies every core file as one of three kinds:

- **Live**: safe to replace immediately, nothing has it loaded as a continuously running process.
- **Restart**: replaced immediately, then the owning service is restarted.
- **Boot**: replaced on disk now, but only takes effect after the next reboot, because it is already running and in memory (runit itself, for example).

`flux base-update` tells you at the end whether a reboot is required.

## Updating the kernel

```sh
flux kernel-update
```

Downloads and verifies the latest signed Shinigami kernel tarball, extracts it, and regenerates the GRUB configuration. Like `base-update`, this always requires a reboot to take effect, since the running kernel cannot be replaced live.

## A sensible update routine

```sh
flux update
```

Read what it tells you, then run whichever of `flux self-update`, `flux base-update`, or `flux kernel-update` it suggests, followed by installing any package updates you want with `flux install`. None of these steps are required to happen together or on any particular schedule, update as often or as rarely as you like.

## Where to go next

- [Command Reference](/flux/commands), for the full list of flux commands.
- [System Overview](/architecture/overview), for how the core system and flux-managed packages fit together.
