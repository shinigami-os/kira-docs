---
layout: home

hero:
  name: Kira Linux
  text: Documentation
  tagline: A Linux distribution you actually understand.
  image:
    src: /assets/kira-logo-light.png
    alt: Kira Linux
  actions:
    - theme: brand
      text: Get Started
      link: /introduction
    - theme: alt
      text: Install Kira
      link: https://kira-linux.com/install
    - theme: alt
      text: flux Reference
      link: /flux/overview

features:
  - title: Rolling release, not rolling breakage
    details: Packages enter the repo only after validation. flux update brings an installed system fully up to date, on your terms.
  - title: Transparent by default
    details: Every flux operation tells you exactly what it is doing and why. Configs are plain text meant to be read, not generated and hidden.
  - title: A lean, legible core
    details: musl replaces glibc. BusyBox forms the userland. runit is PID 1, with services you can read under /etc/sv. No systemd.
  - title: flux, a package manager you can hold in your head
    details: One C binary, no runtime dependencies beyond libc. Reproducible builds, a binary cache for speed, and source recipes for control.
  - title: Wayland desktop, terminal-first
    details: Sleex is the primary desktop, with SwayFX as the second choice. The terminal always stays the primary interface.
  - title: Ready to code on first boot
    details: Core developer tools ship in the desktop image. Whole language toolchains are one flux devkit away.
---
