# SwayFX

SwayFX is Kira's second-choice desktop environment: a tiling Wayland compositor built on [Sway](https://swaywm.org/), with added visual effects like blur, rounded corners, and shadows.

## Installing

```sh
flux install kira-desktop-swayfx
```

This registers SwayFX as an available session at the greeter, alongside anything else you have installed.

## Component stack

| Role | Tool |
|---|---|
| Compositor | SwayFX |
| Status bar | eww |
| Launcher | fuzzel |
| Notifications | Mako |
| Lock screen | swaylock-effects |
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
- XWayland: disabled by default. Enable it in the config if you need it for a specific application.

## Default keybindings

| Action | Binding |
|---|---|
| Terminal | `Ctrl+Alt+T` |
| Launcher | `$mod+d` |
| Run command | `$mod+r` |
| File manager | `$mod+e` |
| Kill window | `$mod+q` |
| Fullscreen | `$mod+f` |
| Split horizontal | `$mod+h` |
| Split vertical | `$mod+v` |
| Toggle floating | `$mod+Shift+Space` |
| Focus up / left / down / right | `$mod+i` / `$mod+j` / `$mod+k` / `$mod+l` |
| Move window | `$mod+arrows` |
| Workspaces 1 through 10 | `$mod+1` through `$mod+0` |
| Move window to workspace | `$mod+Shift+1` through `$mod+Shift+0` |
| Next / previous workspace | `$mod+Alt+Left` / `$mod+Alt+Right`, or `$mod+Scroll` |
| Screenshot | `Print`, or `$mod+Shift+S` |
| Lock screen | `$mod+Shift+L` |
| Reload configuration | `$mod+Shift+R` |

`$mod` refers to whatever modifier key is set in your config, `Mod4` by default.

## Where to go next

- [Desktop Overview](/desktop/overview), for how SwayFX fits alongside Sleex.
- [Sleex](/desktop/sleex), the primary desktop.
