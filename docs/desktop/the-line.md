# The Line

The Line is Kira's own desktop: a Quickshell shell on Hyprland, made for Kira Linux. The idea is in the name. There is no dock, no taskbar and no panel. A single line crosses the top of the screen, and everything happens on it: workspaces hang from it, a notification runs along it, the volume is drawn on it, music plays out on it.

Three small tiles sit beneath the line, and when you need more they grow into panels instead of opening popups: the clock becomes a calendar, the launcher unfolds from the workspaces, the machine's state opens into a dashboard. When something goes fullscreen the tiles fold into the line and the line steps aside.

## What it has

<div class="k-clips">
  <figure><video src="/assets/the-line/launcher.mp4" poster="/assets/the-line/launcher-poster.webp" muted loop playsinline preload="none"></video><figcaption>Launcher<span>Super</span></figcaption></figure>
  <figure><video src="/assets/the-line/overview.mp4" poster="/assets/the-line/overview-poster.webp" muted loop playsinline preload="none"></video><figcaption>Workspace overview<span>Super, Super</span></figcaption></figure>
  <figure><video src="/assets/the-line/notifications.mp4" poster="/assets/the-line/notifications-poster.webp" muted loop playsinline preload="none"></video><figcaption>Notifications and calendar<span>Super+N</span></figcaption></figure>
  <figure><video src="/assets/the-line/quicksettings.mp4" poster="/assets/the-line/quicksettings-poster.webp" muted loop playsinline preload="none"></video><figcaption>Quick settings<span>Super+A</span></figcaption></figure>
  <figure><video src="/assets/the-line/tiling.mp4" poster="/assets/the-line/tiling-poster.webp" muted loop playsinline preload="none"></video><figcaption>Tiling, resize, float<span>Super+R</span></figcaption></figure>
  <figure><video src="/assets/the-line/fullscreen.mp4" poster="/assets/the-line/fullscreen-poster.webp" muted loop playsinline preload="none"></video><figcaption>Fullscreen and the edge peek<span>Super+F</span></figcaption></figure>
  <figure><video src="/assets/the-line/wallpapers.mp4" poster="/assets/the-line/wallpapers-poster.webp" muted loop playsinline preload="none"></video><figcaption>Wallpaper picker<span>Super+T</span></figcaption></figure>
  <figure><video src="/assets/the-line/settings.mp4" poster="/assets/the-line/settings-poster.webp" muted loop playsinline preload="none"></video><figcaption>Settings<span>Super+I</span></figcaption></figure>
</div>


- **A launcher** (tap `Super`) that finds apps, solves sums, runs commands and knows where every setting is. Double-tap `Super` for the workspace overview.
- **Wallpapers and colours** (`Super+T`): pictures, animated GIFs and videos, for every screen or one. The accent can follow the wallpaper, and GTK and Qt apps wear the same colours.
- **A settings app** (`Super+I`) with a search over every setting: network, Bluetooth, sound, displays, input, appearance, shortcuts, power, notifications, night light, sign-in, and more.
- **A lock screen** drawn as the line, with face (howdy) and fingerprint (fprintd) unlock as options.
- **The rest**: a cheat sheet that reads every shortcut live (`Super+F1`), clipboard history, an emoji picker, screenshots and screen recording, a notification daemon, and a few surprises.

It runs on one screen or several, with the ten workspaces shared out between them. There is no telemetry.

## Installing

```sh
sudo flux install kira-the-line
```

This installs the shell, its session, the settings app and the programs it relies on. Log out and pick **The Line** in the session list of the login screen. On a system with two desktops installed, the last session you used is offered first.

## Configuration

Everything you set lives in `~/.config/the-line/`, and updates only ever replace the files under `/usr/share/the-line`. `config.json` is the source of your settings; the files other programs read (the idle configuration and the Hyprland snippets for workspaces, input, shortcuts and floating windows) are generated from it. Three files are yours to edit in `~/.config/the-line/hypr/`: `monitors.lua`, `apps.lua` for your own app shortcuts, and `custom.lua`, loaded last. A `README.md` in the same folder, rewritten at each login, lists every file and whether it is yours.

If you come from Sleex, its monitor layout, app shortcuts and general settings are copied over at the first login.

## Where to go next

- [Desktop Overview](/desktop/overview), for how The Line fits into Kira.
- The source and the full list of shortcuts: [github.com/shinigami-os/the-line](https://github.com/shinigami-os/the-line).
