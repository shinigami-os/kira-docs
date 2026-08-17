# SwayFX

SwayFX is Kira's second-choice desktop environment: a tiling Wayland compositor built on [Sway](https://swaywm.org/), with added visual effects like blur, rounded corners, and shadows.

## Installing

```sh
flux install kira-desktop-swayFX
```

This registers SwayFX as an available session at the greeter, alongside anything else you have installed.

## Component stack

| Role | Tool |
|---|---|
| Compositor | SwayFX |
| Status bar | eww |
| Launcher | fuzzel |
| Notifications | Mako |
| Lock screen | hyprlock |
| Terminal | foot |
| GUI file manager | PCManFM-Qt |
| Audio | pipewire and wireplumber |
| Screenshots | Flameshot |

## Configuration

SwayFX reads its configuration from `~/.config/sway/config`, plain text and meant to be edited directly. Kira's defaults:

- Modifier key: `Mod4` (the Super key).
- Gaps: 4px inner, 8px outer.
- Borders: 2px, no titlebar.
- Corner radius: 8px, with blur and shadow effects enabled.
- XWayland: enabled by default, for apps like Electron-based clients that have no other display server to fall back to.

## Default keybindings

Keybindings are AZERTY-aware and largely dispatcher-based: most former direct-launch shortcuts now open a popup (calendar, control center, notifications, music, system monitor, power menu, launcher, keybind cheatsheet) rather than spawning an application directly, and only one popup can be open at a time.

Rather than duplicate a list that can drift out of sync, check the two sources of truth directly:

- Press the keybind cheatsheet popup shortcut from within a session for the full, current list.
- Read `sway/config` itself, plain text and meant to be read, see [Configuration](#configuration) above for the path.

`$mod` refers to whatever modifier key is set in your config, `Mod4` by default.

## Where to go next

- [Desktop Overview](/desktop/overview), for how SwayFX fits alongside Sleex.
- [Sleex](/desktop/sleex), the primary desktop.
