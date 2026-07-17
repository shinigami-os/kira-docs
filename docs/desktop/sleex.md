# Sleex

Sleex is Kira's primary desktop environment, brought over through the [Kira x AxOS](/axos) collaboration. It is built on [Hyprland](https://hyprland.org/) with [Quickshell](https://quickshell.outfoxxed.me/), and it is the desktop environment the desktop live ISO boots into by default.

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

- [Desktop Overview](/desktop/overview), for how Sleex fits alongside SwayFX.
- [SwayFX](/desktop/swayfx), the second choice desktop.
- [Kira x AxOS](/axos), for how Sleex came to be part of Kira.
