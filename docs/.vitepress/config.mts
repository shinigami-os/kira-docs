import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Kira Linux',
  description: 'Documentation for Kira Linux, a rolling-release, developer-oriented Linux distribution.',
  cleanUrls: true,
  appearance: 'force-dark',
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/assets/kira-logo.png' }],
    [
      'link',
      {
        href: 'https://fonts.googleapis.com/css2?family=Raleway:wght@200;300;400;500;600&family=JetBrains+Mono:wght@300;400;500;600&display=swap',
        rel: 'stylesheet',
      },
    ],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
  ],

  themeConfig: {
    logo: '/assets/kira-logo-light.png',
    siteTitle: 'kira / docs',

    nav: [
      { text: 'Guide', link: '/introduction' },
      { text: 'flux', link: '/flux/overview' },
      { text: 'Desktop', link: '/desktop/overview' },
      { text: 'kira-linux.com', link: 'https://kira-linux.com' },
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'What is Kira Linux', link: '/introduction' },
        ],
      },
      {
        text: 'Getting Started',
        items: [
          { text: 'Installation', link: '/getting-started/installation' },
          { text: 'First Boot', link: '/getting-started/first-boot' },
        ],
      },
      {
        text: 'Architecture',
        items: [
          { text: 'System Overview', link: '/architecture/overview' },
          { text: 'Init System (runit)', link: '/architecture/init-system' },
        ],
      },
      {
        text: 'flux',
        items: [
          { text: 'Overview', link: '/flux/overview' },
          { text: 'Command Reference', link: '/flux/commands' },
          { text: 'Updating Kira', link: '/flux/updating' },
          { text: 'Writing a kotodama Recipe', link: '/flux/kotodama-recipes' },
        ],
      },
      {
        text: 'Desktop',
        items: [
          { text: 'Overview', link: '/desktop/overview' },
          { text: 'Sleex', link: '/desktop/sleex' },
          { text: 'SwayFX', link: '/desktop/swayfx' },
        ],
      },
      {
        text: 'Shell and Tools',
        items: [{ text: 'Shell and Developer Tools', link: '/shell-and-tools' }],
      },
      {
        text: 'Kernel',
        items: [{ text: 'Shinigami', link: '/kernel' }],
      },
      {
        text: 'More',
        items: [
          { text: 'Kira x AxOS', link: '/axos' },
          { text: 'Troubleshooting', link: '/troubleshooting' },
          { text: 'Contributing', link: '/contributing' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/shinigami-os' }],

    search: {
      provider: 'local',
    },

    footer: {
      message: 'A Linux distribution you actually understand.',
      copyright: 'Kira Linux',
    },

    outline: {
      level: [2, 3],
    },
  },
});
