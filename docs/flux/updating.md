# Updating Kira

Kira is a rolling release, and staying current is always something you choose to do, never something that happens to you in the background. `flux update` only ever syncs and reports. The actual package upgrades and system updates run as separate, explicit steps (or with `flux update -i`, see below).

## Checking what's available

```sh
flux update
```

This does three things:

1. Syncs the local kotodama recipe repository with its remote (`flux-recipes`' GitHub default branch).
2. Re-fetches and re-verifies the Alpine package index (`main`/`community`) - this is the only time flux ever fetches that index over the network. `flux install`/`flux search` only ever read what the last `flux update` cached, so installing an Alpine-only package on a machine that has never run `flux update` fails with a clear "run `flux update` first" error instead of silently fetching on its own.
3. Compares every installed package's recorded version, kotodama or Alpine alike, against what it just synced, and reports anything with a newer version available.

It also checks whether a newer flux, kira-base, or kernel release exists, and prints a notice telling you which command to run if so. It never runs an update on its own.

`flux update` does not touch flatpak. Flatpak apps are only ever installed via `flux install --flatpak <package>`, and updating one already installed is a plain `flatpak update`, outside flux entirely.

## Updating packages

```sh
flux update -i
```

Installs everything `flux update` just reported, kotodama or Alpine alike, upgrading each to the version just synced. Without `-i`, `flux update` only reports and tells you to run it.

Ordinary packages can also just be reinstalled directly the same way they install, which is what `-i` does under the hood for each one:

```sh
flux install <package>
```

If the recipe's version (or the Alpine index's version) has moved past what's installed, this upgrades it automatically, no extra flag needed. `-f` forces a reinstall anyway, which only matters when something changed without a version bump. There is no separate "upgrade" command for individual packages, and no need to `flux remove` first.

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

Read what it tells you, then run `flux update -i` for package upgrades, and whichever of `flux self-update`, `flux base-update`, or `flux kernel-update` it suggests. None of these steps are required to happen together or on any particular schedule, update as often or as rarely as you like.

## Where to go next

- [Command Reference](/flux/commands), for the full list of flux commands.
- [System Overview](/architecture/overview), for how the core system and flux-managed packages fit together.
