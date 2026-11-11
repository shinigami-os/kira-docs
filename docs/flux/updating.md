# Updating Kira

Kira is a rolling release, and staying current is always something you choose to do, never something that happens to you in the background. `flux check` only ever syncs and reports. Installing what it found is a separate, explicit step, `flux upgrade`, and the three layers below the packages (flux itself, kira-base, the kernel) each have their own `flux sys` command.

## Checking what's available

```sh
sudo flux check
```

This does three things:

1. Syncs the local kotodama recipe repository with its remote (`flux-recipes`' GitHub default branch).
2. Re-fetches and re-verifies the Alpine package index (`main`/`community`) - this is the only time flux ever fetches that index over the network. `flux install`/`flux search` only ever read what the last `flux check` cached, so installing an Alpine-only package on a machine that has never run `flux check` fails with a clear "run `flux check` first" error instead of silently fetching on its own.
3. Compares every installed package's recorded version, kotodama or Alpine alike, against what it just synced, and reports anything with a newer version available.

It never installs anything. Add `--files` to also list the files you have modified since they were installed, which is useful before an upgrade overwrites them.

`flux check` does not touch flatpak. Flatpak apps are only ever installed via `flux install --flatpak <package>`, and updating one already installed is a plain `flatpak update`, outside flux entirely.

## Updating packages

```sh
sudo flux upgrade
```

Installs exactly what `flux check` reports, kotodama or Alpine alike, upgrading each package to the version just synced, in one batch.

Ordinary packages can also just be reinstalled directly the same way they install, which is what `flux upgrade` does under the hood:

```sh
sudo flux install <package>
```

If the recipe's version (or the Alpine index's version) has moved past what's installed, this upgrades it automatically, no extra flag needed. `-f` forces a reinstall anyway, which only matters when something changed without a version bump. There is no need to `flux remove` first.

## Checking the core layers

```sh
flux sys check
```

Reports whether a newer flux, kira-base, or kernel release exists, and tells you which command to run for each. It never runs an update on its own. Each of these components is released by a git tag (the kernel by a signed release on the binary cache), so a new release shows up here as soon as it is tagged.

## Updating flux itself

```sh
sudo flux sys upgrade flux
```

Rebuilds flux from the latest release tag and atomically replaces the running binary, keeping a backup of the previous one. flux is a single, self-contained binary, so this is a fast, low-risk operation.

## Updating the core system

```sh
sudo flux sys upgrade base
```

`kira-base`, musl, BusyBox, runit, and eudev, cannot rebuild itself from source on an installed system the way flux can, since that would need a cross-compilation toolchain and the kernel source tree, neither of which belongs on an ordinary install. Instead, `flux sys upgrade base` downloads a signed, prebuilt release from the binary cache and applies it according to a manifest that classifies every core file as one of three kinds:

- **Live**: safe to replace immediately, nothing has it loaded as a continuously running process.
- **Restart**: replaced immediately, then the owning service is restarted.
- **Boot**: replaced on disk now, but only takes effect after the next reboot, because it is already running and in memory (runit itself, for example).

It tells you at the end whether a reboot is required.

## Updating the kernel

```sh
sudo flux sys upgrade kernel
```

Downloads and verifies the latest signed Shinigami kernel tarball, extracts it, and regenerates the GRUB configuration. Like the base update, this always requires a reboot to take effect, since the running kernel cannot be replaced live. The kernel it replaces is kept so you can roll back from the boot menu.

Each update leaves one more old kernel behind, so clean up now and then:

```sh
sudo flux sys clean kernel --keep 2
```

This removes old kernels beyond the number you keep. The kernel you are running is never removed.

`flux sys upgrade` with no target does all three in turn (flux, then base, then kernel), and keeps going if one of them fails. Add `-f` to a single target to redo it even when already current.

## A sensible update routine

```sh
sudo flux check
```

Read what it tells you, then run `sudo flux upgrade` for the packages, and `flux sys check` to see whether flux, the base or the kernel moved too. None of these steps are required to happen together or on any particular schedule, update as often or as rarely as you like.

## Where to go next

- [Command Reference](/flux/commands), for the full list of flux commands.
- [System Overview](/architecture/overview), for how the core system and flux-managed packages fit together.
