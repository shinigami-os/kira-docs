# Shinigami

Shinigami is the Linux kernel fork that powers Kira, based on a longterm upstream release and patched for developer workloads on x86-64.

## Versioning

Shinigami releases follow a two-part scheme:

```
6.12.85-shinigami-26.07
```

- **`LINUX_VERSION`**, the upstream Linux version this release is based on.
- **`SHINIGAMI_VERSION`**, the Kira patchset version, using the same `YY.MM` scheme as flux and kira-base.

The two axes are independent. Pulling a new upstream kernel bumps `LINUX_VERSION` only. Applying new Kira patches bumps `SHINIGAMI_VERSION` only. Both can change together when a release warrants it.

## What's different from upstream

- **BORE scheduler**, for better interactive responsiveness under mixed workloads, tuned for a desktop and development machine rather than a server under constant load.
- **Clang ThinLTO build**, compiled with `clang` rather than `gcc`.
- **A stripped configuration**, with legacy drivers, old SCSI stacks, and unused subsystems removed to keep the kernel binary small and fast to build.

Patches are organized by category and every one has a documented reason, minimal diff from upstream is the goal:

| Category | Purpose |
|---|---|
| `perf/` | Performance patches, including the BORE scheduler |
| `mem/` | Memory tuning |
| `sec/` | Security hardening |
| `compat/` | Hardware compatibility fixes |
| `config/` | Configuration-only changes |

## Inspecting the running kernel

Shinigami is built with `CONFIG_IKCONFIG` enabled, so the exact configuration of the kernel you are running is always available:

```sh
zcat /proc/config.gz
```

No need to trust a changelog, the running configuration is right there.

## Updating

```sh
flux kernel-update
```

Downloads and verifies the latest signed Shinigami kernel, extracts it, and regenerates the GRUB configuration. Like any kernel update, this takes effect on the next reboot. See [Updating Kira](/flux/updating) for the full picture.

## Where to go next

- [System Overview](/architecture/overview), for how the kernel fits into the rest of Kira.
- [Updating Kira](/flux/updating), for keeping the kernel and the rest of the system current.
