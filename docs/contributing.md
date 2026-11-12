# Contributing

Kira is organized as a small set of focused repositories under the [`shinigami-os`](https://github.com/shinigami-os) organization on GitHub. Each one has a narrow, clear job.

| Repository | Contents | License |
|---|---|---|
| `shinigami` | The Linux kernel fork and its patches | GPL-2.0 |
| `kira-base` | The minimal bootstrap layer | GPL-2.0 |
| `flux` | The package manager itself | GPL-2.0 |
| `flux-recipes` | kotodama recipes for Kira's own (`kira-*`) packages | GPL-2.0 |
| `the-line` | The Line, Kira's own desktop shell | GPL-3.0 |
| `the-line-ui` | The Line's design language as a QML module, shared by the shell and the installer | GPL-3.0 |
| `kira-installer` | The installer and the ISO that boots into it | GPL-2.0 |
| `kira-docs` | This documentation | MIT |

## Adding a package

Most software does not need a recipe at all: flux resolves any name without a `kira-` prefix directly against Alpine's package index, so if Alpine already carries what you want, there is nothing to contribute here.

A kotodama recipe in `flux-recipes` only makes sense for genuinely Kira-specific software - a new meta-package bundling a few Alpine dependencies with some Kira configuration, or a real from-source build for the rare thing Alpine doesn't carry. Either way the package name must start with `kira-`. See [Writing a kotodama Recipe](/flux/kotodama-recipes) for the format, then open a pull request. Recipes are reviewed before merge against a short, fixed set of rules: a `kira-`-prefixed directory name matching the package name, a real checksum, a direct source URL, and hooks that install into `$DESTDIR` rather than the live filesystem.

## Kernel patches

Shinigami's patch philosophy is minimal diff from upstream, and every patch needs a documented reason. Patches are organized by category, `perf/`, `mem/`, `sec/`, `compat/`, and `config/`, and an upstream patch is never modified silently, if you change one, document why in the patch header.

## Desktop configuration

The Line is its own repository, `the-line`; its recipe, `kira-the-line`, only fetches and installs it, so changes to the shell go there. The colours, motion and shared parts live in `the-line-ui` (recipe `kira-the-line-ui`), so a change to how everything looks belongs there. Sleex's default configuration is upstream's own `sleex-user-config`. Kira-only changes to it live as small build-time patches in the `kira-sleex` and `kira-desktop-sleex` recipes in `flux-recipes`, so a fix that every Sleex user would want belongs upstream in Sleex instead.

## General workflow

1. Fork the relevant repository.
2. Make your change on a branch.
3. Open a pull request describing what changed and why.
4. Expect review, Kira favors small, focused changes over large ones that touch several concerns at once.

## Reporting a problem

Open an issue on the repository the problem actually belongs to, the kernel, flux, a specific recipe, the desktop configuration, or the installer. Include what you were doing, what you expected, and the exact output you got. See [Troubleshooting](/troubleshooting) first, in case it is already covered there.
