# First Boot

## What happens

- **Server tier** boots straight to a ZSH shell, logged in as the user you created during installation.
- **Desktop tier** boots directly into your chosen desktop environment. There is no separate login manager step to configure, it works out of the box.

## Update the system

The very first thing worth doing on any fresh install is bringing flux's recipe repository up to date:

```sh
flux update
```

This syncs the local recipe repository with the remote one and checks whether a newer flux, kira-base, or kernel release is available. It never installs anything on its own, it only tells you what is available. See [Updating Kira](/flux/updating) for the full picture.

## Look around

A few things worth trying right away:

```sh
fetch
```

Prints a system information summary: distribution info, shell, uptime, and the Kira color palette. It is not run automatically on login, so run it whenever you want it.

```sh
flux list
```

Lists every package currently installed. Add `-a` to include packages that were pulled in automatically as dependencies rather than installed by name.

```sh
flux search <term>
```

Searches the recipe repository. Useful for checking whether something you want is already packaged before reaching for the Debian compatibility path.

## Install what you need

Kira's base install is intentionally minimal. Whatever you need beyond the default tools, install with flux:

```sh
flux install <package>
```

If you write code, look at the `devkit-*` packages, they bundle a whole language toolchain in one install. See [Shell and Developer Tools](/shell-and-tools) for details.

## Inspect what is running

Because Kira is transparent by default, nothing about the running system is hidden behind a generated config or a binary you cannot read:

- Installed package metadata lives under `/var/lib/flux/installed/<package>/`.
- runit services live under `/etc/sv/`, and `sv status /etc/sv/<name>` tells you exactly what is running. See [Init System](/architecture/init-system).
- The running kernel configuration is inspectable at `/proc/config.gz`.

## Switching desktop environments

If you installed the desktop tier, you are not locked into the desktop environment you picked during installation. See [Desktop Overview](/desktop/overview) for how to install and switch between Sleex and SwayFX.

## Where to go from here

- [flux command reference](/flux/commands), for the full package manager toolkit.
- [System Overview](/architecture/overview), for how the pieces of Kira fit together.
- [Troubleshooting](/troubleshooting), if something does not work the way you expect.
