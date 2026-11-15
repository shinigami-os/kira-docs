# Bootloader (GRUB)

Kira boots through GRUB on UEFI. The installer puts it on the EFI system partition (`/boot/efi`), and the menu itself is a generated file, `/boot/grub/grub.cfg`, rebuilt by `grub-mkconfig` from your settings and the kernels it finds in `/boot`. Installing a new kernel (`flux sys upgrade kernel`) rebuilds it for you.

## What Kira sets

The `kira-grub` package ships Kira's defaults in `/etc/default/grub.d/10-kira.cfg`:

| Setting | Value | Why |
|---|---|---|
| `GRUB_DISABLE_OS_PROBER` | `false` | other systems on the machine get a menu entry (see below) |
| `GRUB_TIMEOUT` | `5` | time to choose before the first entry boots |
| `GRUB_DISABLE_SUBMENU` | `false` | the newest kernel is the top entry, older ones sit under "Advanced options" |
| `GRUB_TERMINAL_OUTPUT`, `GRUB_GFXMODE` | `gfxterm`, `auto` | a graphical menu, which is what a theme needs |
| `GRUB_THEME` | `/usr/share/kira-grub/themes/kira/theme.txt` | the theme in use |

GRUB's own `/etc/default/grub` reads every `/etc/default/grub.d/*.cfg` through a short block marked `# BEGIN kira-grub`, which the package adds (Alpine's `grub-mkconfig` does not do this by itself). Put your own settings in a file of their own, such as `/etc/default/grub.d/20-local.cfg`, so a package update never overwrites them, then rebuild the menu:

```sh
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

## Other systems on the machine

With os-prober on, `grub-mkconfig` looks at the other partitions and adds an entry for every system it recognizes, for example another Linux (with its kernels in a submenu) or Windows' boot manager. If a system is missing, check that it shows up in `sudo os-prober`.

## Changing the look

`/usr/share/kira-grub/themes/kira/theme.txt` is a plain starting point: a black screen, grey entries and the accent colour on the selected one. To make your own, copy the folder somewhere GRUB can read, such as `/boot/grub/themes/mine/`, edit `theme.txt` (the [GRUB theme format](https://www.gnu.org/software/grub/manual/grub/html_node/Theme-file-format.html) lists the components, and images go beside it), and point GRUB at it:

```sh
echo 'GRUB_THEME=/boot/grub/themes/mine/theme.txt' | sudo tee /etc/default/grub.d/20-local.cfg
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

If the theme cannot be loaded GRUB falls back to its text menu and still boots.

## If a GRUB update overwrote `/etc/default/grub`

The `grub` package owns that file, so an update of it can drop the Kira block. Put it back with:

```sh
sudo flux install -f kira-grub
```

## Where to go next

- [System Overview](/architecture/overview), for how the bootloader fits into the rest of Kira.
- [Init System (runit)](/architecture/init-system), for what starts after the kernel.
