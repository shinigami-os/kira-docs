# Writing a kotodama Recipe

A **kotodama** recipe only exists for `kira-`-prefixed packages: flux routes any other name straight to Alpine's package index, so there is no recipe to write for software Alpine already carries. A recipe is a plain text file describing where its source comes from and how to build it, living in [flux-recipes](https://github.com/shinigami-os/flux-recipes)' `kira-only` branch, one directory per package.

Before writing one, check whether Alpine already packages the software you want, possibly under a different or versioned name (`wlroots` on Alpine is `wlroots0.20`, for instance). If it does, there's nothing to add here - depend on the Alpine name directly from whatever needs it. Recipes in this repo are for Kira's own meta-packages, its desktop environments, and the genuine cases Alpine doesn't carry at all.

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
name = kira-hello
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
| `name` | Must start with `kira-` and match the directory name exactly - this prefix is the only thing that routes flux to a recipe instead of Alpine. |
| `version` | The upstream version string. |
| `description` | A one-line description. |
| `license` | An SPDX license identifier. |
| `size` | Approximate installed size in megabytes, integer only. |

::: warning Bump `version` for any build-affecting change
A package's binary cache key is derived from `name`, `version`, and `cflags`, **not** from the recipe body. Editing a hook, a `%build` flag, or a patch without bumping `version` means the existing cached artifact, built from the *old* recipe, keeps being served indefinitely: `flux install` on a machine that already has it cached never rebuilds, since nothing about the cache key changed. This has caused real, silent breakage that went unnoticed until someone happened to force a rebuild. If a change affects what gets built or how, bump `version` (a trailing `.1`, `.2`, etc. is fine for a packaging-only change with no real upstream release) so the fix actually reaches anyone with a stale cache hit.
:::

**`[source]`**: normally a direct tarball URL and its SHA-256 checksum. Leave both empty to make a [meta-package](#meta-packages). Two other forms are accepted:

- **`git+<repo>#<ref>`**: shallow-cloned instead of downloaded as a tarball. If `<ref>` is a floating branch rather than a tag, `sha256` is repurposed to hold a pinned commit hash instead of a checksum, so the build stays reproducible even though the branch itself moves.
- **A bare single file** (a font, for example): copied into the build directory under its original name instead of being run through `tar`.

**`[deps]`**: space-separated package lists, `build` only pulled in when the package actually needs to compile, `runtime` always resolved. Either list can freely mix `kira-*` recipe names and plain Alpine package names in the same line - flux resolves each entry by the same prefix rule it uses everywhere else, so a `kira-*` package's dependency tree can legitimately be mostly Alpine names. A third key, `optional`, appears in a couple of recipes for nice-to-have extras, but flux's parser doesn't recognize it and never resolves it - it's a note for a human reader only, don't rely on it doing anything.

**`[build]`**: optional `cflags` and `ldflags` overrides for the default `-O2 -pipe -march=x86-64-v2`.

## Hooks

| Hook | Runs | Purpose |
|---|---|---|
| `%pre-build` | Always | Patch sources, create directories, pre-compile setup. |
| `%build` | Always | Configure and compile. |
| `%post-build` | Always | Tests, post-compile cleanup. |
| `%install` | Always | Install into `$DESTDIR`. flux copies from there to the live system afterward. |
| `%post-install` | Only on `flux install`, never `flux build` | Runs against the real root filesystem, never `$DESTDIR`. For anything that is not a file: creating a system user, enabling a runit service, an idempotent system-level mutation. |

Every hook gets `$DESTDIR` and `$FLUX_RECIPE_DIR` (the recipe's own directory, for referencing `files/`). `set -e` is active throughout, any failed command aborts the build.

Always install into `$DESTDIR` in `%install`, never write directly to `/`.

## Meta-packages

A recipe with an empty `[source]` is a meta-package: just a dependency list over real Alpine packages, optionally with a small `%install` (drop a few config files) or `%post-install` (create a user or a runit service). Meta-packages never touch the binary cache, and every install re-runs their hooks fresh, which is what lets one pick up a new dependency or a configuration change without a version bump. This is the shape most `kira-*` recipes actually take.

If a meta-package's `%install` or `%post-install` needs files that live in another git repository, like a desktop configuration repository, pull them with `git clone` or `curl` inside `%build`, into the scratch build directory. Do not check a static copy into `files/`, it will drift out of sync with its real source of truth. Kira's own `kira-desktop-*` packages follow this pattern: each clones the `kira-desktop` repository and copies out of its own desktop-environment folder plus the shared scripts directory.

## Contributing a recipe

A few rules that recipes are reviewed against before merge:

- `name` must start with `kira-` and match the directory name exactly.
- Before adding a real from-source recipe, confirm Alpine genuinely doesn't carry the software (check under likely alternate/versioned names too). If it does, there's no recipe needed - reference the Alpine name directly instead.
- `sha256` must be the real checksum of the source tarball, or, for a `git+` source on a floating branch, a real pinned commit hash. `SKIP` is never accepted in the official repository.
- `url` must point directly to a source tarball, not a release page or a redirect that depends on content negotiation.
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
