# Running Kira in a Virtual Machine

Kira boots in a VM, but a handful of things need to be set correctly first - none of them are Kira-specific quirks, they are just choices most hypervisors do not default to. This page covers QEMU/KVM (virt-manager, GNOME Boxes), which is what has actually been tested, but the underlying requirements apply to any hypervisor.

## UEFI only, no legacy BIOS

The installer ISO is built EFI-only: GRUB is compiled for the `x86_64-efi` target, the image ships a GPT-partitioned EFI system partition, and there is no BIOS/El Torito boot catalog at all. A VM booting in legacy BIOS mode will not show any sign of life, not even a boot menu, because there is no BIOS boot path to find.

Make sure the VM is created with UEFI firmware:

- **virt-manager**: on the "Ready to begin installation" step, check **Customize configuration before install**, then set the **Firmware** dropdown (Overview tab) to a UEFI entry before finishing.
- **GNOME Boxes**: the wizard does not always expose a firmware choice for an unrecognized ISO, and it cannot be changed after creation from the GUI. Edit the underlying libvirt domain instead: `virsh edit <vm-name>`, and set `<os firmware="efi">`.

This needs the OVMF package installed on the host (`ovmf` on Debian/Ubuntu, `edk2-ovmf` on Fedora, `edk2-ovmf` on Arch).

## Disable Secure Boot

Once UEFI firmware is selected, most tools default to the Secure Boot variant (OVMF's `OVMF_CODE_4M.ms.fd`, enrolled with Microsoft's keys). Kira's GRUB is not signed against those keys, so the firmware refuses to load it. This shows up as a vague failure at the boot manager stage, commonly `Access Denied` when it gets far enough to actually try the boot image, or just `No bootable option or device was found` if it does not get that far.

Switch to the plain, non-Secure-Boot firmware: in virt-manager, the Overview tab's Firmware dropdown has a variant without `.ms.` or `.secboot.` in its path (`OVMF_CODE_4M.fd`). The dropdown sometimes refuses the change with `Unable to find 'efi' firmware that is compatible with the current configuration`. That happens because the domain XML still has the old `<firmware><feature enabled='yes' name='secure-boot'/>` requirement. Edit the XML directly instead: disable both `secure-boot` and `enrolled-keys` features, point `<loader>`/`<nvram>` at the plain (non-`.ms.`) OVMF files, and delete the existing NVRAM file under `/var/lib/libvirt/qemu/nvram/` so it regenerates cleanly from the new template rather than keeping boot entries left over from the Secure Boot config.

## CPU topology

Leaving vCPU topology unset, libvirt's own default for 4 vCPUs is one socket per vCPU (`sockets=4,cores=1,threads=1`). That is an unusual shape for a guest kernel to reason about and can trigger a stall right after disk detection, printing `clocksource: Watchdog remote CPU N read timed out` and making close to zero further progress (visible as the QEMU process barely accumulating CPU time despite sitting there for many minutes).

Set an explicit, single-socket topology instead:

```xml
<cpu mode='host-passthrough' check='none' migratable='on'>
  <topology sockets='1' dies='1' cores='4' threads='1'/>
</cpu>
```

## If it still hangs after disk detection

If the topology fix alone is not enough, add `clocksource=kvm-clock tsc=reliable` to the kernel command line. At the GRUB menu, press `e` to edit the boot entry, append the two options to the end of the `linux` line, then boot with `Ctrl+X`. This tells the guest kernel to trust the paravirtualized clock rather than running its own TSC watchdog, which can otherwise misfire under normal vCPU scheduling jitter and wedge boot entirely.

## CD-ROM bus type

SATA/AHCI is the normal choice and works once Secure Boot is disabled - if CD-ROM boot was failing with SATA before, it was almost certainly the Secure Boot rejection above, not the bus itself. SCSI has been seen to hang indefinitely inside the installer's own initramfs while scanning for the boot media (a blocking `mount -t iso9660` that never returns, rather than failing fast), with no error printed. If a boot hangs completely silently right after disk detection with no watchdog message and no further output at all, switch the CD-ROM back to SATA.

IDE is not available as an option on `q35` machines (the libvirt default) since `q35` has no legacy IDE controller - this is only relevant if you are used to older guides recommending it for older machine types.

## Where to go from here

- [Installation](/getting-started/installation), for installing to a real disk once the live environment boots.
- [Troubleshooting](/troubleshooting), for problems unrelated to the VM boot process itself.
