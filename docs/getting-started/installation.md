# Installation

## System requirements

- **Architecture:** x86-64, with an `x86-64-v2` baseline. This covers almost every machine made after 2010.
- **Boot mode:** UEFI. The ISO ships a GRUB EFI binary and expects a GPT disk.
- **Disk space:** at least 15 GB free for the installer to accept a disk or a free region. The exact size depends on the packages you add afterward, since Kira installs a minimal base and lets you build up from there with flux.
- **Memory:** the whole installer runs from RAM. 4 GB or more is comfortable.
- **Network:** the installer installs the packages for your system with flux, so it needs to be online. Ethernet works as soon as it is plugged in, Wi-Fi is set up from the installer.

## The ISO

Kira ships one ISO, and it is the installer. It does not boot into a desktop or a shell: it starts a fullscreen installer app straight away, with no login and nothing else to open. The only ways out are rebooting and powering off. The desktop, the shell and every package are installed onto your disk by the installer, so what you end up with is decided by your answers, not by which ISO you downloaded.

## Downloading

Get the ISO from [kira-linux.com/install](https://kira-linux.com/install). Older releases are available from the same page.

Every ISO is signed. If you want to verify a download yourself, the matching `.minisig` signature file is published alongside each release.

## Writing the ISO to a USB drive

On Linux, with `sdX` replaced by your actual USB device (check with `lsblk` first, writing to the wrong device will destroy its data):

```sh
sudo dd if=kira-<version>-x86_64.iso of=/dev/sdX bs=4M status=progress conv=fsync
sync
```

`conv=fsync` matters more than it looks. Without it, `dd` returns as soon as the data is handed to the kernel's page cache, not once it is actually written to the device. Pulling the drive or rebooting into it too soon after a plain `dd` can leave you booting a partially written image. Always follow up with `sync` and wait for it to return before removing the drive.

## Booting the installer

Boot from the USB drive (most machines let you pick a one-time boot device with a key like F12, F10, or Esc at power-on, check your motherboard or laptop's documentation if you are not sure). The installer opens by itself. If you need to stop, Esc asks whether to power off.

## Running the installer

The installer is a guided app. It expects you to know what a partition is, it will not hand-hold you through disk concepts, but every screen is one plain question with a small number of choices. A ruler along the bottom shows how far along you are. Arrow keys move, a letter picks an option, and the right arrow or Enter goes on.

1. **Keyboard.** Pick your keyboard layout.
2. **Network.** Pick Ethernet or a Wi-Fi network and its password.
3. **Disk.** Pick the disk to install to. The disk the installer booted from is not offered.
4. **Partitioning.** Two modes are available: wipe the whole disk (creates a GPT layout with a 512 MB FAT32 EFI system partition, an optional swap partition, and an ext4 root partition), or install into the largest free space of an existing disk. Manual partitioning is not available yet.
5. **Swap.** Choose how much swap, or none.
6. **Computer name, user and passwords.** Set a hostname, create your own user account and password, and choose whether root shares that password.
7. **Time zone.**
8. **System.** Choose **The Line** (Kira's own desktop), **Sleex** (the AxOS desktop) or **Server** (a shell and nothing else). You can add any of the others later with flux.
9. **Review.** Every answer is listed, and nothing has been written to a disk until you hold the confirm button here.
10. **Install.** The installer partitions and formats the disk, copies the base system, installs the packages for your system, and installs the GRUB bootloader. If a step fails it undoes its mounts, so you can simply try again.

If you connected to Wi-Fi in the installer, that connection carries over to the installed system automatically, no need to reconnect on first boot.

When it says done, remove the USB drive and choose **Reboot**.

## First boot

See [First Boot](/getting-started/first-boot) for what to expect the first time Kira starts on your machine, and what to do next.
