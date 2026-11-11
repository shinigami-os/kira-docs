// Every page of the sidebar, in order, numbered like the settings app's sections (01, 02, ...).
import type { DefaultTheme } from 'vitepress';

export interface NumberedPage {
  n: string;
  text: string;
  link: string;
  group: string;
}

export function numberedPages(sidebar: DefaultTheme.Sidebar | undefined): NumberedPage[] {
  const groups = Array.isArray(sidebar) ? sidebar : [];
  const out: NumberedPage[] = [];
  for (const g of groups) {
    for (const item of g.items ?? []) {
      if (!item.link) continue;
      out.push({ n: String(out.length + 1).padStart(2, '0'), text: item.text ?? '', link: item.link, group: g.text ?? '' });
    }
  }
  return out;
}

// '/flux/commands' for 'flux/commands.md', '/' for 'index.md'
export function pageLink(relativePath: string): string {
  return '/' + relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '');
}
