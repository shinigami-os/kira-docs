# flux

flux is Kira's package manager: a single static C binary that resolves every package name against one of two sources, decided purely by the name itself:

- **`kira-*`** - always built from a **kotodama** recipe, a plain text file describing where the source comes from and how to build it. This is Kira's own software: the distro's meta-packages, its desktop environments, and anything genuinely unavailable elsewhere.
- **everything else** - always resolved live against [Alpine Linux's package index](https://pkgs.alpinelinux.org/packages), natively parsed and verified by flux itself. No local recipe is required, and no separate `apk` binary is ever shelled out to.

There is no fallback between the two - a missing `kira-*` recipe is just a "package not found" error, and a name with no `kira-` prefix is never looked up as a recipe. Installed files are tracked and removable with full file-level precision regardless of which source they came from.

## Design

- **Reproducible builds.** The same kotodama recipe against the same source produces the same output.
- **Binary cache.** Compilation is skipped whenever a valid, signed binary already exists locally or on the remote cache server.
- **Dependency-minimal.** Build dependencies are only pulled in for a package that actually needs to compile from source. A package with a cache hit, an Alpine package (Alpine ships prebuilt), or a meta-package, never drags a build toolchain along with it.
- **Transparent.** Every operation prints what it is doing and why, before it does it.
- **Scriptable.** Exit codes are stable and documented, so flux works reliably in shell scripts and CI pipelines. See the [command reference](/flux/commands) for the full list.
- **Cross-compile aware.** `flux build --cross` builds a kotodama recipe against a configured cross sysroot instead of the host, which is how Kira's own packages get built in the first place.

## Installing and removing packages

```sh
flux install <package>...
flux remove <package>
```

`flux install` takes one or more package names at once, kotodama and Alpine names freely mixed. Dependencies for all of them are resolved together into a single deduplicated list and always shown, with versions, before anything is installed - even a single package with no extra dependencies goes through this summary-then-confirm step. Skip the prompt with `-y`. Removing deletes exactly the files that package installed, nothing more and nothing less, because flux tracks them precisely.

Installing a package that is already present but whose recipe (or the Alpine index) has moved on to a newer version upgrades it automatically, no extra flag needed. `-f` is only needed to force a reinstall at the version already installed.

A couple of refusals exist specifically to keep the two sources from stepping on each other:
- If an Alpine package would be installed under a name already tracked from a *different* source, flux refuses rather than silently overwrite it (`-f` overrides this, with a loud warning even then).
- Before copying an Alpine package's files onto the system, flux checks every path against every other installed package's own file list, and aborts on a collision rather than overwrite.
- An Alpine package with a post-install trigger script shows that script and asks for explicit confirmation before running it as root - this is third-party code, unlike a kotodama recipe's own hooks.

Packages pulled in only as a dependency are marked as auto-installed. If nothing depends on them anymore, `flux autoremove` (or `flux remove -a <package>`) cleans them up:

```sh
flux autoremove
```

## Installing via Flatpak instead

```sh
flux install --flatpak <package>
```

This is a separate, explicit path that skips both kotodama and Alpine entirely and installs from Flathub. It is never triggered automatically - a plain `flux install <package>` that matches nothing in either source just errors.

## Configuration

flux reads `/etc/flux/flux.conf` at startup, a plain `key = value` file:

```ini
local_repo_path = /var/lib/flux/recipes
remote_repo_url = https://github.com/shinigami-os/flux-recipes
binary_cache_url = https://cache.kira-linux.com
default_build_flags = -O2 -pipe -march=x86-64-v2
flux_pub_path = /etc/flux/flux.pub
flux_secret_key_path = /home/you/.minisign/flux.key
alpine_mirror_url = https://dl-cdn.alpinelinux.org/alpine
alpine_branch = edge
```

`alpine_mirror_url`/`alpine_branch` default to Alpine's own CDN and the `edge` branch if left unset - set `alpine_branch = stable` to track Alpine's stable branch instead. There is no equivalent option for the kotodama recipe repo's branch: `flux update` always follows `flux-recipes`' GitHub default branch.

`flux_secret_key_path` only matters on a machine that publishes packages to the cache. On an ordinary Kira install, it does not need to exist, flux simply skips cache signing and storage instead of failing.

## The package database

Installed packages are tracked under `/var/lib/flux/installed/<package>/`:

- `info`: name, version, install date, whether it was auto-installed, and which source it came from (`kotodama` or `alpine`).
- `files`: one absolute path per line, listing exactly what that package put on disk. Empty for meta-packages, which install nothing directly.

Because `files` is exact, `flux remove` never leaves orphaned files behind, and never deletes something it did not put there.

## Meta-packages

A kotodama recipe with no `[source]` is a meta-package: just a dependency list, optionally with a small `%install` step (a few config files) or `%post-install` step (creating a system user, enabling a runit service). Meta-packages never touch the binary cache and re-run their hooks on every install, which is what lets them pick up new dependencies or configuration changes without needing a version bump. Most of Kira's own `kira-*` packages are meta-packages for exactly this reason - a thin bundle of real Alpine dependencies plus whatever Kira-specific glue they need.

## Known gaps

`flux search` and `flux info` currently only look at kotodama recipes, not the Alpine index - neither can describe an Alpine-only package that isn't already installed. `flux cache` is a stub; every subcommand just prints a placeholder for now.

## Where to go next

- [Command Reference](/flux/commands), for every command and every exit code.
- [Writing a kotodama Recipe](/flux/kotodama-recipes), if you want to package something yourself.
- [Updating Kira](/flux/updating), for how flux keeps the whole system current, not just individual packages.
