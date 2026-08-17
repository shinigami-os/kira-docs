# Desktop Overview

Kira's desktop is Wayland only, and it is meant to be a tool, not a crutch. The terminal always stays the primary interface. XWayland is enabled by default on both desktop environments, so applications with no other display server to fall back to (Electron apps like Discord/Vesktop, for example) just work.

## Two desktop environments

| Desktop | Role | Based on |
|---|---|---|
| [Sleex](/desktop/sleex) | Primary | Hyprland, with Quickshell |
| [SwayFX](/desktop/swayfx) | Second choice | Sway, with extra compositor effects |

Sleex is the primary desktop, brought over through the [Kira x AxOS](/axos) collaboration. SwayFX is the second choice, for a simpler, more tiling-window-manager-like feel.

The two desktop environments are not built from a shared component set, each has its own launcher, notifications, and theming, so switching between them changes more than just the window manager. A few lower-level pieces genuinely are shared regardless of which one you run: audio (pipewire and wireplumber), fonts and the cursor theme, and the screen locker (hyprlock, used by both).

## Login

Logging in goes through [greetd](https://sr.ht/~kennylevinsen/greetd/), which launches a kiosk Wayland session (cage) hosting the actual login screen, ReGreet. Pick your session there and log in, greetd hands off to whichever desktop session you selected. If both desktops are installed, both appear as separate session choices at the greeter.

## Installing and switching

Each desktop environment is its own flux meta-package:

```sh
flux install kira-desktop-sleex
flux install kira-desktop-swayFX
```

You can have both installed at once and choose between them at the greeter. Installing one does not remove the other.

## Where to go next

- [Sleex](/desktop/sleex)
- [SwayFX](/desktop/swayfx)
- [Kira x AxOS](/axos), for the story behind Sleex's place in Kira.
