# Command Reference

## Commands

| Command | Action |
|---|---|
| `flux install [-y] <package>` | Install a package, from the binary cache or compiled from source. `-y` skips the dependency confirmation prompt. |
| `flux remove [-a] <package>` | Remove a package and every file it installed. `-a` / `--autoremove` also sweeps any dependencies left orphaned by the removal. |
| `flux autoremove` | Remove every installed package that was pulled in only as a dependency and is no longer needed by anything. |
| `flux search <term>` | Search the recipe repository by name or description. |
| `flux info <package>` | Show a package's metadata, dependencies, and install status. |
| `flux update` | Sync the local recipe repository with the remote one, and check whether a newer flux, kira-base, or kernel release is available. |
| `flux build [--cross] <package>` | Force a local build, optionally against the configured cross sysroot. |
| `flux list [-a]` | List installed packages, sorted alphabetically. `-a` includes auto-installed dependencies. |
| `flux cache <subcommand>` | Manage the local binary cache. |
| `flux compat <package>` | Install through the Debian compatibility container, for the rare package with nowhere else to come from. |
| `flux version` | Print the installed flux version. |
| `flux self-update` | Rebuild flux from the latest release tag and atomically replace the running binary. |
| `flux base-update` | Update kira-base's core image (musl, BusyBox, runit, eudev, curl) to the latest release. |
| `flux kernel-update` | Download and install the latest signed Shinigami kernel. |

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
| 6 | `FLUX_ERR_CACHE` | Cache error: read, write, or corruption |
| 7 | `FLUX_ERR_NETWORK` | Network error |
| 8 | `FLUX_ERR_PERMISSION` | Permission error, usually meaning the command needs root |
| 9 | `FLUX_ERR_CONTAINER` | Compatibility container error |
| 10 | `FLUX_ERR_SOURCE` | Invalid or unavailable source |
| 11 | `FLUX_ERR_KOTODAMA` | Malformed or unreadable recipe file |

## Examples

Install a package, skipping the confirmation prompt:

```sh
flux install -y ripgrep
```

Check what a package actually is before installing it:

```sh
flux info neovim
```

```
version 0.11 · size 24M · auto-installed: no
deps: libuv luajit tree-sitter ...
```

See everything currently installed, including dependencies pulled in automatically:

```sh
flux list -a
```

Clean up anything that used to be a dependency and no longer is:

```sh
flux autoremove
```

Force a package to build from source instead of using the cache, useful when testing a recipe change:

```sh
flux build ripgrep
```

## Where to go next

- [flux Overview](/flux/overview), for the design behind these commands.
- [Updating Kira](/flux/updating), for `self-update`, `base-update`, and `kernel-update` in detail.
- [Writing a kotodama Recipe](/flux/kotodama-recipes), for `flux build` from a contributor's perspective.
