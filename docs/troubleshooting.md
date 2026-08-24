# Troubleshooting

## The installer boots old or unexpected content

If you have reused the same USB drive, or another disk, for more than one Kira ISO over time, GRUB's label-based search can occasionally resolve to the wrong device if more than one carries a matching volume label. This shows up as changes you made not seeming to "stick": the installer behaves like an older version even after writing a fresh ISO.

Wipe any old Kira media you are not actively using:

```sh
sudo wipefs -a /dev/sdX
```

Replace `sdX` with the actual device, check with `lsblk` first. Also make sure you wrote the ISO with `conv=fsync`, see [Installation](/getting-started/installation) for the full write command.

## No graphical session at login, or a permissions error mentioning the seat

If logging into a desktop session fails with something referencing the seat or the display, and you created your user account outside of the installer's normal flow, check that your user is in the `video` group:

```sh
groups $(whoami)
sudo usermod -aG video $(whoami)
```

Log out and back in for the new group membership to take effect.

## The desktop stops rendering after installing a compiler toolchain

Kira's desktop environments link against musl. Installing `gcc` or `binutils` on a desktop install pulls in their own compiler runtime libraries, which are built against glibc, not musl. If those land in `/usr/lib` alongside the musl-native versions the desktop depends on, dynamic linking can pick up the wrong one and the compositor fails to start.

Neither package is needed at runtime on an installed system, they are only relevant if you intend to build software directly on Kira itself. If you do not need them installed system-wide, remove them:

```sh
flux remove gcc binutils
```

## flux reports a network error during install

flux treats network failures during a remote cache lookup as a cache miss, not a hard error, and falls back to building the package from source automatically. If you see a genuine failure at this point, it usually means the build itself failed, not the network. Check the build output for the actual failing step.

Installing several packages in one command is an exception to this: every source that needs downloading is fetched up front, before anything is built or installed. If any one of those downloads fails, the whole batch stops right there, nothing gets built or installed, rather than silently continuing with the packages that did succeed. Just re-run the same command, packages already fetched or installed are skipped.

## Reinstalling a package that says it's already installed

`flux install <package>` only reports "already installed" and exits when the package is present **and** already at the recipe's current version. If a newer recipe version exists, it rebuilds automatically, no extra step needed.

Seeing "already installed" for a package you know just changed usually means the local recipe repository is stale, run `flux update` first to sync it. If the version genuinely hasn't changed and you want to force a rebuild anyway (for example, to pick up a build-step change that didn't come with a version bump), use `-f`:

```sh
flux install -f <package>
```

Meta-packages behave differently: every `flux install` on a meta-package re-runs its hooks fresh regardless of whether it was installed before, so `-f` is never necessary for those.

## Checking whether a service is the problem

Most things that look like "Kira is broken" are a single runit service not running. Check its status directly:

```sh
sv status /etc/sv/<name>
```

See [Init System](/architecture/init-system) for how services are organized and managed.

## Still stuck

Open an issue on the relevant repository under the [`shinigami-os`](https://github.com/shinigami-os) organization on GitHub. Include what you were doing, what you expected, and the exact output you got.
