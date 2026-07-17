# System Overview

Kira is built in layers, and the boundary between them is deliberate: a small, fixed core that never changes without a full system update, and everything else managed by flux.

```
┌─────────────────────────────────────────────┐
│                 Desktop / Shell              │
│     Sleex or SwayFX  ·  ZSH  ·  dev tools    │
├─────────────────────────────────────────────┤
│                     flux                     │
│  kotodama recipes · binary cache · Debian    │
│                  compat container            │
├─────────────────────────────────────────────┤
│                Core Userland                 │
│      musl libc · runit · BusyBox             │
├─────────────────────────────────────────────┤
│              Shinigami Kernel                │
│         (Linux fork, patched for x86-64)     │
└─────────────────────────────────────────────┘
```

## Core versus flux-managed

**Core** is the minimal bootstrap layer, built by `kira-base` and never managed by flux:

- musl libc, BusyBox (statically linked), runit, flux itself, eudev, a bootstrap-only `dhcpcd` binary, and a statically linked `curl` with its CA bundle.
- The `runit/1` and `runit/2` stage scripts.
- A handful of core runit services: device management, tty1 login, and system logging.

**Everything else** is installed by the installer or by you, through flux: the shell and its plugins, networking, the session bus, the desktop environment, and every application. This includes things you might expect to be part of a base system, like SSH or NetworkManager, because on Kira they are ordinary flux packages like any other.

The point of this split is that the core stays small and stable, while the rest of the system is fully inspectable and modifiable through one consistent tool. See [flux Overview](/flux/overview) for how that tool works.

## The kernel: Shinigami

Kira ships its own kernel fork, Shinigami, based on a longterm upstream Linux release and patched for developer workloads on x86-64. See [Shinigami](/kernel) for the details.

## Package database and configuration

Nothing on Kira lives in a format meant to be edited only by a tool. A few locations worth knowing:

| Path | What it holds |
|---|---|
| `/var/lib/flux/installed/<package>/` | Per-package metadata and the exact list of files it installed. |
| `/var/cache/flux/` | The local binary cache. |
| `/etc/flux/flux.conf` | flux's own configuration, plain `key = value` text. |
| `/etc/sv/` | runit service definitions. |
| `/proc/config.gz` | The running kernel's build configuration, always inspectable. |

## Versioning

Kira does not use traditional operating system version numbers. Individual components (flux, kira-base, kira-desktop) share a single release scheme: `YY.MM`, with an optional `-N` suffix for a hotfix release within that month. `26.06`, then `26.06-1` for the first hotfix, and so on. The Shinigami kernel follows a related but distinct scheme, see [Shinigami](/kernel).

Cutting a release of any of these components is just a git tag, there is no separate release object to keep in sync. `flux update` checks each component's tags against what is installed and tells you when something newer is available.

## Where to go next

- [Init System (runit)](/architecture/init-system), for how services are supervised.
- [flux Overview](/flux/overview), for how packages are installed and managed.
- [Updating Kira](/flux/updating), for how the whole system, not just individual packages, stays current.
