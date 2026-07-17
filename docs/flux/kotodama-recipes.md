# Writing a kotodama Recipe

Every package flux can install starts as a **kotodama**: a plain text recipe describing where its source comes from and how to build it. Recipes live in the [flux-recipes](https://github.com/shinigami-os/flux-recipes) repository, one directory per package.

## Layout

```
<package>/
  kotodama       # the recipe itself
  patches/       # optional patches applied before build
  files/         # optional extra files (configs, scripts)
```

## A complete example

```ini
[meta]
name = hello
version = 2.12.1
description = "The classic Hello World program"
license = GPL-3.0
size = 1

[source]
url = https://ftp.gnu.org/gnu/hello/hello-2.12.1.tar.gz
sha256 = 8d99142afd92576f30b0cd7cb42a8dc6809998bc5d607d88761f512e26c7db20

[deps]
build = gcc make
runtime =

[build]
cflags = -O2 -pipe -march=x86-64-v2

%pre-build

%build
./configure --prefix=/usr
make

%post-build

%install
make DESTDIR=$DESTDIR install

%post-install
```

## Sections

**`[meta]`**, required for every recipe:

| Field | Description |
|---|---|
| `name` | Must match the directory name exactly. |
| `version` | The upstream version string. |
| `description` | A one-line description. |
| `license` | An SPDX license identifier. |
| `size` | Approximate installed size in megabytes, integer only. |

**`[source]`**: a direct tarball URL and its SHA-256 checksum. Leave both empty to make a [meta-package](#meta-packages).

**`[deps]`**: space-separated package lists. `build` is only pulled in when the package actually needs to compile, `runtime` is always resolved.

**`[build]`**: optional `cflags` and `ldflags` overrides for the default `-O2 -pipe -march=x86-64-v2`.

## Hooks

| Hook | Runs | Purpose |
|---|---|---|
| `%pre-build` | Always | Patch sources, create directories, pre-compile setup. |
| `%build` | Always | Configure and compile. |
| `%post-build` | Always | Tests, post-compile cleanup. |
| `%install` | Always | Install into `$DESTDIR`. flux copies from there to the live system afterward. |
| `%post-install` | Only on `flux install`, never `flux build` | Runs against the real root filesystem, never `$DESTDIR`. For anything that is not a file: creating a system user, an idempotent system-level mutation. |

Every hook gets `$DESTDIR` and `$FLUX_RECIPE_DIR` (the recipe's own directory, for referencing `files/`). `set -e` is active throughout, any failed command aborts the build.

Always install into `$DESTDIR` in `%install`, never write directly to `/`.

## Meta-packages

A recipe with an empty `[source]` is a meta-package: just a dependency list, optionally with a small `%install` (drop a few config files) or `%post-install` (create a user or a runit service). Meta-packages never touch the binary cache, and every install re-runs their hooks fresh, which is what lets one pick up a new dependency or a configuration change without a version bump.

If a meta-package's `%install` or `%post-install` needs files that live in another git repository, like a desktop configuration repository, pull them with `git clone` or `curl` inside `%build`, into the scratch build directory. Do not check a static copy into `files/`, it will drift out of sync with its real source of truth. Kira's own `kira-desktop-*` packages follow this pattern: each clones the `kira-desktop` repository and copies out of its own desktop-environment folder plus the shared scripts directory.

## Contributing a recipe

A few rules that recipes are reviewed against before merge:

- `sha256` must be the real checksum of the source tarball. `SKIP` is never accepted in the official repository.
- `url` must point directly to a source tarball, not a release page or a redirect that depends on content negotiation.
- `name` must match the directory name exactly.
- Hooks must install into `$DESTDIR`, never directly to `/`.
- The recipe must build cleanly before it is submitted.

## Testing a recipe locally

```sh
flux build <package>
```

Forces a local build, bypassing the cache, so you can confirm a recipe actually works before opening a pull request.

## Where to go next

- [flux Overview](/flux/overview), for how the cache and dependency resolution around these recipes work.
- [Contributing](/contributing), for how to submit a recipe.
