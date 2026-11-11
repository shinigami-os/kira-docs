import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import { h } from 'vue';
import DocsIndex from './components/DocsIndex.vue';
import SectionNumber from './components/SectionNumber.vue';
import './style.css';

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, { 'doc-before': () => h(SectionNumber) }),
  enhanceApp({ app, router }) {
    app.component('DocsIndex', DocsIndex);
    if (typeof window === 'undefined') return;
    // the desktops' clips play only while they are on screen (and not at all with reduced motion)
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const seen = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const v = e.target as HTMLVideoElement;
        if (e.isIntersecting && !still) v.play().catch(() => {});
        else v.pause();
      }
    });
    const watch = () => setTimeout(() => document.querySelectorAll('.k-clips video').forEach((v) => seen.observe(v)), 50);
    router.onAfterRouteChange = watch;
    watch();
  },
} satisfies Theme;
