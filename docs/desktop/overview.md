# Desktop Overview

Kira's desktop is Wayland only, and it is meant to be a tool, not a crutch. The terminal always stays the primary interface. XWayland is available as an optional package for the rare application that still needs X11, it is not enabled by default.

## Two desktop environments

| Desktop | Role | Based on |
|---|---|---|
| [Sleex](/desktop/sleex) | Primary | Hyprland, with Quickshell |
| [SwayFX](/desktop/swayfx) | Second choice | Sway, with extra compositor effects |

Sleex is the primary desktop, brought over through the [Kira x AxOS](/axos) collaboration. SwayFX is the second choice, for a simpler, more tiling-window-manager-like feel.

Everything shared between them, the terminal, launcher, notification daemon, GTK theme, and the desktop portal, is desktop-agnostic and reused automatically regardless of which one you run.

## Login

Kira uses [greetd](https://sr.ht/~kennylevinsen/greetd/) as its login manager. It hands off to whichever desktop session you select at the greeter.

## Installing and switching

Each desktop environment is its own flux meta-package:

```sh
flux install kira-desktop-sleex
flux install kira-desktop-swayfx
```

You can have both installed at once and choose between them at the greeter. Installing one does not remove the other.

## Where to go next

- [Sleex](/desktop/sleex)
- [SwayFX](/desktop/swayfx)
- [Kira x AxOS](/axos), for the story behind Sleex's place in Kira.
