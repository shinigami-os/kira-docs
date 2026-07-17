# Init System: runit

Kira uses [runit](http://smarden.org/runit/) as PID 1. This is a deliberate, non-negotiable design choice: small, legible, and fast to boot, with no unit files, no dependency graph to reason about, and no single daemon that also owns logging, networking, and half a dozen other things.

## Why not systemd

systemd solves real problems, but it solves them by becoming the thing you'd need to understand to understand your system. runit does one job: supervise processes and restart them if they die. Everything else on Kira, networking, session management, logging, is its own small, replaceable piece.

## Services

A runit service is a directory under `/etc/sv/<name>/` containing at least a `run` script: an executable that stays in the foreground and does not fork or daemonize. runit itself watches the process and restarts it if it exits.

You can read every service Kira ships. There is no compiled unit format to decode:

```sh
cat /etc/sv/eudev/run
```

### Managing services

runit's `sv` command controls services directly:

```sh
sv status /etc/sv/<name>    # check whether it's running
sv up /etc/sv/<name>        # start it, and keep it running
sv down /etc/sv/<name>      # stop it, and keep it stopped
sv restart /etc/sv/<name>   # restart it
```

Some Kira services are **oneshot**: they run once, do their job, and then intentionally stay down until the next boot. They mark this by creating a `down` file in their own service directory after finishing. Trying to `sv up` a oneshot service after it has already run for the current boot is generally not useful, it exists to do one thing early in boot, not to be supervised continuously.

## Boot sequence

```
kernel → runit-init (PID 1)
  └── stage 1: mount proc/sys/dev/shm, set hostname, bring up loopback
  └── stage 2: runsvdir /etc/sv
       ├── eudev                device management
       ├── udev-input-trigger   oneshot: prepares input devices
       ├── getty-tty1           tty1 login, launches the desktop on desktop tier
       └── [everything installed by flux: networking, session bus, desktop, ...]
  └── stage 3: shutdown cleanup
```

Stage 1 runs once, does the minimum needed to reach a usable filesystem, and hands off to stage 2, which starts `runsvdir` and keeps every service in `/etc/sv/` supervised for the rest of the session. Stage 3 runs on shutdown.

## Core versus flux-managed services

Only the services whose binaries ship in the core image live in `kira-base` itself: device management, tty1 login, and system logging. Every other service, networking, the D-Bus session bus, the desktop compositor's supporting services, travels with the flux package that owns it and is installed the same way any other package file would be. There is no separate place to look for "system services" versus "package services", it is all under `/etc/sv/`.

## Where to go next

- [System Overview](/architecture/overview), for how the init system fits into the rest of Kira.
- [flux Overview](/flux/overview), for how flux-managed services get installed in the first place.
