# Sleex

Sleex is the desktop of the AxOS project, brought over to Kira through the [Kira x AxOS](/axos) collaboration. It is built on [Hyprland](https://hyprland.org/) with [Quickshell](https://quickshell.outfoxxed.me/), and it is one of the two systems the installer offers. Kira's own desktop is [The Line](/desktop/the-line); the two live side by side and you pick one at the login screen.

## Features

- Smooth animations throughout the compositor.
- Tiling window management for keyboard-driven multitasking.
- An adaptive color scheme that takes its palette from your wallpaper.
- A ready-to-use set of built-in tools, no separate setup pass required after install.

## Installing

```sh
flux install kira-desktop-sleex
```

This pulls in Hyprland, Quickshell, and every dependency Sleex needs, and registers it as an available session at the greeter.

## Configuration

Sleex's configuration lives under `~/.config/` like any Hyprland-based setup, and is meant to be read and edited directly. Kira ships sensible defaults, matched to the same color palette and fonts used across the rest of the system, Raleway for interface text and JetBrains Mono for anything monospace.

## Where to go next

- [Desktop Overview](/desktop/overview), for how Sleex fits into Kira.
- [The Line](/desktop/the-line), Kira's own desktop.
- [Kira x AxOS](/axos), for how Sleex came to be part of Kira.
