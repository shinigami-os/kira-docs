# Desktop Overview

Kira's desktop is Wayland only, and it is meant to be a tool, not a crutch. The terminal always stays the primary interface. XWayland is enabled by default, so applications with no other display server to fall back to (Electron apps like Discord/Vesktop, for example) just work.

## The desktop environment

| Desktop | Based on |
|---|---|
| [Sleex](/desktop/sleex) | Hyprland, with Quickshell |

Sleex is Kira's desktop, brought over through the [Kira x AxOS](/axos) collaboration.

## Login

Logging in goes through [greetd](https://sr.ht/~kennylevinsen/greetd/), which launches a kiosk Wayland session (cage) hosting Kira's own login screen, Kira Login. Pick your session there and log in, greetd hands off to the desktop session you selected.

## Installing

The desktop environment is a flux meta-package:

```sh
flux install kira-desktop-sleex
```

## Where to go next

- [Sleex](/desktop/sleex)
- [Kira x AxOS](/axos), for the story behind Sleex's place in Kira.
