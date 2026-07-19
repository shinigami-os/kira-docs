# kira-docs
> Official documentation for Kira Linux.

Built with [VitePress](https://vitepress.dev/), deployed to [docs.kira-linux.com](https://docs.kira-linux.com) via GitHub Pages (`.github/workflows/deploy.yml`).

## Structure

```
docs/
  introduction.md                 What is Kira Linux
  getting-started/
    installation.md
    first-boot.md
  architecture/
    overview.md                   System overview
    init-system.md                runit
  flux/
    overview.md
    commands.md                   Command reference
    updating.md                   flux update / base-update / kernel-update / self-update
    kotodama-recipes.md            Writing a kotodama recipe
  desktop/
    overview.md
    sleex.md
    swayfx.md
  shell-and-tools.md
  kernel.md                        Shinigami
  axos.md                          Kira x AxOS
  troubleshooting.md
  contributing.md
```

The sidebar/nav structure lives in `docs/.vitepress/config.mts` : keep it in sync when adding or moving a page.

## Developing

```sh
npm install
npm run dev       # localhost:5173
npm run build     # static output in docs/.vitepress/dist
```

## License
MIT
