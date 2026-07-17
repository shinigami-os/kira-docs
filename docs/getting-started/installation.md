# Installation

## System requirements

- **Architecture:** x86-64, with an `x86-64-v2` baseline. This covers almost every machine made after 2010.
- **Boot mode:** UEFI. The ISOs ship a GRUB EFI binary and expect a GPT disk.
- **Disk space:** at least 20 GB free for a desktop install, less for a server install. The exact size depends on the packages you add afterward, since Kira installs a minimal base and lets you build up from there with flux.
- **Memory:** enough to hold the live ISO in RAM. 2 GB is a comfortable minimum for the console ISO, 4 GB or more is recommended for the desktop ISO.

## Choosing an ISO

Kira ships two live ISO variants. Both install either tier, the difference is only what the live environment itself boots into.

| ISO | Size | Boots into | Can install |
|---|---|---|---|
| `kira-console.iso` | ~220 MB | An interactive shell | Server or desktop tier |
| `kira-desktop.iso` | ~854 MB | A full Sleex session, try-before-install | Desktop tier |

If you already know you want the server tier, or you are comfortable installing over SSH, the console ISO is smaller and faster to write. If you want to try the desktop before committing to it, use the desktop ISO.

Both ISOs carry the same minimal core image as the install payload. The installer adds the tier-appropriate flux packages during installation, not from the ISO itself, so the live environment and the installed system stay separate concerns.

## Downloading

Get the current ISO from [kira-linux.com/install](https://kira-linux.com/install). The install page lets you pick a tier and, for the desktop tier, a desktop environment, then builds the correct filename for you. Older releases are available from the same page.

Every ISO is signed. If you want to verify a download yourself, matching `.minisig` signature files are published alongside each release.

## Writing the ISO to a USB drive

On Linux, with `sdX` replaced by your actual USB device (check with `lsblk` first, writing to the wrong device will destroy its data):

```sh
sudo dd if=kira-console.iso of=/dev/sdX bs=4M status=progress conv=fsync
sync
```

`conv=fsync` matters more than it looks. Without it, `dd` returns as soon as the data is handed to the kernel's page cache, not once it is actually written to the device. Pulling the drive or rebooting into it too soon after a plain `dd` can leave you booting a partially written image. Always follow up with `sync` and wait for it to return before removing the drive.

## Booting the installer

Boot from the USB drive (most machines let you pick a one-time boot device with a key like F12, F10, or Esc at power-on, check your motherboard or laptop's documentation if you are not sure). The console ISO drops you at a shell with `kira-install` available. The desktop ISO boots into a live Sleex session, open a terminal and run `kira-install` from there.

## Running the installer

`kira-install` is a guided, text-based installer. It expects you to know what a partition is, it will not hand-hold you through disk concepts, but every prompt is a plain question with a small number of choices.

1. **Partitioning.** Two modes are available: wipe the whole disk (creates a GPT layout with a 512 MB FAT32 EFI system partition, an optional swap partition, and an ext4 root partition), or install into existing free space. Manual partitioning is not available yet.
2. **Tier.** Choose `server` or `desktop`. Server gives you the base system, runit, ZSH, flux, and SSH, with no display server. Desktop adds the full graphics stack.
3. **Desktop environment.** Desktop tier only. Choose Sleex, the primary desktop, or SwayFX, the second choice.
4. **User setup.** Set a root password, then create your own user account and password.
5. **Bootloader.** The installer runs `grub-install` and generates a GRUB configuration inside the new system automatically.

Once the installer finishes, reboot and remove the USB drive.

## First boot

See [First Boot](/getting-started/first-boot) for what to expect the first time Kira starts on your machine, and what to do next.
