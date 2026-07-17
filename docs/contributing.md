# Contributing

Kira is organized as a small set of focused repositories under the [`shinigami-os`](https://github.com/shinigami-os) organization on GitHub. Each one has a narrow, clear job.

| Repository | Contents | License |
|---|---|---|
| `shinigami` | The Linux kernel fork and its patches | GPL-2.0 |
| `kira-base` | The minimal bootstrap layer | GPL-2.0 |
| `flux` | The package manager itself | GPL-2.0 |
| `flux-recipes` | Every kotodama recipe | GPL-2.0 |
| `kira-desktop` | Desktop environment configuration | MIT |
| `kira-installer` | The live ISOs and the installer | GPL-2.0 |
| `kira-docs` | This documentation | MIT |

## Adding a package

The most approachable way to contribute is a new kotodama recipe in `flux-recipes`. See [Writing a kotodama Recipe](/flux/kotodama-recipes) for the format, then open a pull request. Recipes are reviewed before merge against a short, fixed set of rules: a real checksum, a direct source URL, a directory name matching the package name, and hooks that install into `$DESTDIR` rather than the live filesystem.

## Kernel patches

Shinigami's patch philosophy is minimal diff from upstream, and every patch needs a documented reason. Patches are organized by category, `perf/`, `mem/`, `sec/`, `compat/`, and `config/`, and an upstream patch is never modified silently, if you change one, document why in the patch header.

## Desktop configuration

`kira-desktop` ships default configuration for Sleex and SwayFX. Every file in it is meant to be read and modified, contributions that keep configuration plain, commented where it is not self-explanatory, and free of unexplained magic are the easiest to review and merge.

## General workflow

1. Fork the relevant repository.
2. Make your change on a branch.
3. Open a pull request describing what changed and why.
4. Expect review, Kira favors small, focused changes over large ones that touch several concerns at once.

## Reporting a problem

Open an issue on the repository the problem actually belongs to, the kernel, flux, a specific recipe, the desktop configuration, or the installer. Include what you were doing, what you expected, and the exact output you got. See [Troubleshooting](/troubleshooting) first, in case it is already covered there.
