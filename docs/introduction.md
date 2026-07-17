# What is Kira Linux

Kira Linux is a rolling-release, developer-oriented Linux distribution. It is built for people who want full control over their system without sacrificing usability: software developers, system programmers, embedded engineers, and anyone comfortable with a terminal who treats a graphical desktop as a tool rather than a requirement.

The tagline sums up the whole project: **a Linux distribution you actually understand.**

Most distributions ask you to trust them. Kira asks you to understand it instead. It is lean by design, transparent by default, and built to be read and modified by the people who run it. It is not a distribution you install and forget. It is a distribution you own.

## Who Kira is for

- Developers who want a system they can reason about from the kernel up.
- People who are comfortable with a terminal and want the graphical desktop to stay out of their way.
- Users who have outgrown distributions like Ubuntu or Debian and want to understand what is actually running on their machine, and why.

## What Kira is not

These are deliberate scope limits, not gaps waiting to be filled.

- **Not a beginner distribution.** The installer is guided, but it expects you to know what a partition is.
- **Not a Debian fork.** Kira's base system is fully independent. A Debian compatibility container exists as a fallback for the rare package that has nowhere else to come from, not as a foundation.
- **Not systemd.** [runit](/architecture/init-system) is the init system. This is non-negotiable.
- **Not a desktop-first operating system.** The desktop environment is included and polished, but the terminal is always the primary interface.
- **Not a gaming distribution.** Steam runs through Flatpak, but Kira is not tuned around gaming. Anything that works there is a side effect, not a goal.
- **Not a rolling-release distribution that breaks on a whim.** Rolling means always current, not always unstable. Packages enter the repository only after basic validation.

## How the project is organized

Kira is split across a small number of focused components, each with a clear job:

| Component | What it does |
|---|---|
| **Shinigami** | The Linux kernel fork Kira ships. See [Shinigami](/kernel). |
| **kira-base** | The minimal bootstrap layer: musl, BusyBox, runit, and just enough to reach a shell and run flux. See [System Overview](/architecture/overview). |
| **flux** | The package manager. Everything above the bootstrap layer is installed through it. See [flux](/flux/overview). |
| **kira-desktop** | Desktop environment configuration for Sleex and SwayFX. See [Desktop](/desktop/overview). |
| **kira-installer** | The live ISOs and the guided installer. See [Installation](/getting-started/installation). |

Every one of these lives in its own repository under the `shinigami-os` organization, and every one of them is meant to be read.

## Release model

Kira has no traditional version numbers for the operating system itself. Packages are always at their latest validated version, and `flux update` brings an installed system fully up to date whenever you choose to run it. Live ISOs are snapshotted periodically and dated, so you always have a recent, known-good starting point, but an existing install never needs to be reinstalled to stay current.

## Where to go next

- New to Kira? Start with [Installation](/getting-started/installation).
- Want to know how packages work? Read the [flux overview](/flux/overview).
- Curious about the desktop? See [Desktop Overview](/desktop/overview).
