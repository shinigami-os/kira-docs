# Command Reference

## Commands

| Command | Action |
|---|---|
| `flux install [-y] [-f] [--flatpak] <package>...` | Install one or more packages. A `kira-`-prefixed name is built from a kotodama recipe, anything else is resolved against Alpine's package index. Dependencies across all of them are resolved together into one list, always shown before installing. `-y` skips the confirmation prompt; `-f` forces a reinstall even if the package is already installed at the current version. `--flatpak` installs from Flathub instead, skipping both other sources entirely. |
| `flux remove [-a] <package>` | Remove a package and every file it installed. `-a` / `--autoremove` also sweeps any dependencies left orphaned by the removal. |
| `flux autoremove` | Remove every installed package that was pulled in only as a dependency and is no longer needed by anything. |
| `flux search <term>` | Search kotodama recipes by name or description. Does not search the Alpine index. |
| `flux info <package>` | Show a package's metadata, dependencies, and install status, from its kotodama recipe. For an installed Alpine package, shows what the package database knows (version, install date, source) without recipe-level detail. |
| `flux update [-i]` | Sync the local kotodama recipe repo and the Alpine package index, then report which installed packages (either source) have a newer version available. `-i` installs the reported updates; without it, `flux update` only reports. Also checks whether a newer flux, kira-base, or kernel release is available. |
| `flux build [--cross] <package>` | Force a local build of a kotodama recipe, optionally against the configured cross sysroot. Alpine packages are never built locally. |
| `flux list [-a]` | List installed packages, sorted alphabetically, with their version and source. `-a` includes auto-installed dependencies. |
| `flux cache <subcommand>` | Manage the local binary cache. **Not implemented yet** - every subcommand currently just prints a placeholder. |
| `flux version` | Print the installed flux version. |
| `flux self-update [-f]` | Rebuild flux from the latest release tag and atomically replace the running binary. `-f` rebuilds even if already current. |
| `flux base-update [-f]` | Update kira-base's core image (musl, BusyBox, runit, eudev, curl) to the latest release. `-f` reapplies even if already current. |
| `flux kernel-update [-f]` | Download and install the latest signed Shinigami kernel. `-f` reinstalls even if already current. |

## Exit codes

flux's exit codes are stable and will not be renumbered, which makes it safe to script against them directly.

| Code | Constant | Meaning |
|---|---|---|
| 0 | `FLUX_ERR_NONE` | Success |
| 1 | `FLUX_ERR_GENERAL` | General or unrecoverable error |
| 2 | `FLUX_ERR_USAGE` | Usage error: bad command or missing argument |
| 3 | `FLUX_ERR_NOT_FOUND` | Package not found |
| 4 | `FLUX_ERR_DEPENDENCY` | Dependency resolution failure |
| 5 | `FLUX_ERR_BUILD` | Build failure |
| 6 | `FLUX_ERR_CACHE` | Cache error: read, write, corruption, or a required cache that hasn't been synced yet |
| 7 | `FLUX_ERR_NETWORK` | Network error |
| 8 | `FLUX_ERR_PERMISSION` | Permission error, usually meaning the command needs root |
| 9 | `FLUX_ERR_CONTAINER` | Reserved, currently unused |
| 10 | `FLUX_ERR_SOURCE` | Invalid or unavailable source |
| 11 | `FLUX_ERR_KOTODAMA` | Malformed or unreadable recipe file |

## Examples

Install a package, skipping the confirmation prompt. `ripgrep` has no `kira-` prefix, so it's resolved against Alpine:

```sh
flux install -y ripgrep
```

Install several packages together, kotodama and Alpine names freely mixed. Dependencies are resolved and shown as one combined list before anything happens:

```sh
flux install kira-sleex ripgrep fd
```

If the Alpine index has never been synced yet, `flux install` on an Alpine-only name fails fast instead of fetching on its own:

```sh
flux update        # syncs the Alpine index and the recipe repo
flux install jq
```

Check what a package actually is before installing it:

```sh
flux info kira-sleex
```

See everything currently installed, including dependencies pulled in automatically, with each one's source:

```sh
flux list -a
```

Clean up anything that used to be a dependency and no longer is:

```sh
flux autoremove
```

Force a kotodama recipe to build from source instead of using the cache, useful when testing a recipe change:

```sh
flux build kira-sleex
```

## Where to go next

- [flux Overview](/flux/overview), for the design behind these commands.
- [Updating Kira](/flux/updating), for `self-update`, `base-update`, and `kernel-update` in detail.
- [Writing a kotodama Recipe](/flux/kotodama-recipes), for `flux build` from a contributor's perspective.
