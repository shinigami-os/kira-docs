# Desktop Overview

Kira's desktop is Wayland only, and it is meant to be a tool, not a crutch. The terminal always stays the primary interface. XWayland is enabled by default, so applications with no other display server to fall back to (Electron apps like Discord/Vesktop, for example) just work.

## The desktop environments

| Desktop | Based on |
|---|---|
| [The Line](/desktop/the-line) | Hyprland, with its own Quickshell shell |
| [Sleex](/desktop/sleex) | Hyprland, with Quickshell |

The Line is Kira's own desktop, made for it. Sleex is the desktop brought over through the [Kira x AxOS](/axos) collaboration, and it stays available next to The Line. Both are Hyprland sessions, so you can have both installed and pick one at the login screen.

## Apps that come with it

Both desktops install `kira-desktop-apps`: a browser, PDF, image and media viewers, a calculator, an archiver, editors, and [kokuin](/shell-and-tools#kokuin-how-your-machine-boots), which shows how the machine booted and explains every step.

## Login

Logging in goes through [greetd](https://sr.ht/~kennylevinsen/greetd/), which launches a kiosk Wayland session (cage) hosting the login screen. It shows on one monitor even when several are connected. Pick your session there and log in, greetd hands off to the desktop session you selected and remembers your last user and session for next time.

The login screen is currently the Clockwork theme of [qylock](https://github.com/Darkkal44/qylock), run by a small Quickshell greeter. If it exits without starting a session, Kira Login, the earlier eww greeter, takes over, and a plain console login is always the last fallback.

## Installing

Each desktop environment is a flux package:

```sh
sudo flux install kira-the-line
sudo flux install kira-desktop-sleex
```

The installer offers both (and a plain server), so on a new machine you choose one there. Either one pulls in Hyprland, Quickshell, the login screen and everything it needs, and registers itself as a session at the greeter.

## Where to go next

- [The Line](/desktop/the-line)
- [Sleex](/desktop/sleex)
- [Kira x AxOS](/axos), for the story behind Sleex's place in Kira.
