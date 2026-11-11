<script setup lang="ts">
// The docs' home: every page as a row, grouped like the sidebar, as in the settings app.
import { computed } from 'vue';
import { useData, withBase } from 'vitepress';
import { numberedPages } from '../pages';

const { theme } = useData();

const ABOUT: Record<string, string> = {
  '/introduction': 'What Kira is, who it is for, and what it is not',
  '/getting-started/installation': 'Requirements, the ISO, the USB stick, the installer',
  '/getting-started/first-boot': 'What happens, updating, and finding your way around',
  '/getting-started/virtual-machines': 'UEFI, Secure Boot, CPU topology: what a VM needs first',
  '/architecture/overview': 'The fixed core, what flux manages, and how versions work',
  '/architecture/init-system': 'runit as PID 1: services you can read under /etc/sv',
  '/flux/overview': 'The package manager, in one C binary',
  '/flux/commands': 'Every flux command and its options',
  '/flux/updating': 'Checking and applying updates, core and kernel included',
  '/flux/kotodama-recipes': 'Writing the recipe a kira- package is built from',
  '/desktop/overview': 'The two desktops, the login screen, and how to switch',
  '/desktop/the-line': "Kira's own desktop, drawn on one line",
  '/desktop/sleex': 'The AxOS desktop, brought over to Kira',
  '/shell-and-tools': 'ZSH, and the developer tools every install ships with',
  '/kernel': 'Shinigami, and what differs from upstream',
  '/axos': 'Two projects, one stack',
  '/troubleshooting': 'Known problems, and how to get past them',
  '/contributing': 'The repositories, and how to send a recipe, a patch or a report',
};

const groups = computed(() => {
  const out: { name: string; pages: ReturnType<typeof numberedPages> }[] = [];
  for (const p of numberedPages(theme.value.sidebar)) {
    if (!out.length || out[out.length - 1].name !== p.group) out.push({ name: p.group, pages: [] });
    out[out.length - 1].pages.push(p);
  }
  return out;
});
</script>

<template>
  <div class="k-index">
    <section v-for="g in groups" :key="g.name">
      <div class="k-group">{{ g.name }}</div>
      <a v-for="p in g.pages" :key="p.link" class="k-row" :href="withBase(p.link)">
        <span class="n">{{ p.n }}</span>
        <span class="t">{{ p.text }}</span>
        <span class="d">{{ ABOUT[p.link] ?? '' }}</span>
      </a>
    </section>
  </div>
</template>
