# flux

flux is Kira's package manager: a single C binary with no runtime dependencies beyond libc. Every package is built from a **kotodama** recipe, a plain text file describing where the source comes from and how to build it. Binaries are tracked, cached, and removable with full file-level precision.

## Design

- **Reproducible builds.** The same recipe against the same source produces the same output.
- **Binary cache.** Compilation is skipped whenever a valid, signed binary already exists locally or on the remote cache server.
- **Dependency-minimal.** Build dependencies are only pulled in for a package that actually needs to compile from source. A package with a cache hit, or a meta-package, never drags its build toolchain along with it.
- **Transparent.** Every operation prints what it is doing and why, before it does it.
- **Scriptable.** Exit codes are stable and documented, so flux works reliably in shell scripts and CI pipelines. See the [command reference](/flux/commands) for the full list.
- **No runtime dependencies.** flux links only against libc. Nothing else is required for it to run.
- **Cross-compile aware.** `flux build --cross` builds against a configured cross sysroot instead of the host, which is how packages get built for Kira from a development machine in the first place.

## Installing and removing packages

```sh
flux install <package>
flux remove <package>
```

Installing resolves dependencies first, shows you the full list with versions, and asks for confirmation before doing anything (skip the prompt with `-y`). Removing deletes exactly the files that package installed, nothing more and nothing less, because flux tracks them precisely.

Packages pulled in only as a dependency are marked as auto-installed. If nothing depends on them anymore, `flux autoremove` (or `flux remove -a <package>`) cleans them up:

```sh
flux autoremove
```

## Configuration

flux reads `/etc/flux/flux.conf` at startup, a plain `key = value` file:

```ini
local_repo_path = /var/lib/flux/recipes
remote_repo_url = https://github.com/shinigami-os/flux-recipes
binary_cache_url = https://cache.kira-linux.com
default_build_flags = -O2 -pipe -march=x86-64-v2
flux_pub_path = /etc/flux/flux.pub
flux_secret_key_path = /home/you/.minisign/flux.key
```

`flux_secret_key_path` only matters on a machine that publishes packages to the cache. On an ordinary Kira install, it does not need to exist, flux simply skips cache signing and storage instead of failing.

## The package database

Installed packages are tracked under `/var/lib/flux/installed/<package>/`:

- `info`: name, version, install date, and whether it was auto-installed.
- `files`: one absolute path per line, listing exactly what that package put on disk. Empty for meta-packages, which install nothing directly.

Because `files` is exact, `flux remove` never leaves orphaned files behind, and never deletes something it did not put there.

## Meta-packages

A recipe with no `[source]` is a meta-package: just a dependency list, optionally with a small `%install` step (a few config files) or `%post-install` step (creating a system user, for example). Meta-packages never touch the binary cache and re-run their hooks on every install, which is what lets them pick up new dependencies or configuration changes without needing a version bump. Several of Kira's own building blocks, like the networking stack and the desktop environment packages, are meta-packages for exactly this reason.

## Where to go next

- [Command Reference](/flux/commands), for every command and every exit code.
- [Writing a kotodama Recipe](/flux/kotodama-recipes), if you want to package something yourself.
- [Updating Kira](/flux/updating), for how flux keeps the whole system current, not just individual packages.
