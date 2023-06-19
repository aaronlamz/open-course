import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "template title",
  description: "template description",
  base: '/open-ebook/template/',
  outDir: './.vitepress/dist/template',
  head: [['link', { rel: 'icon', href: '/open-ebook/template/favicon.ico' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/hero.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/setup/introduction.md' }
    ],

    sidebar: [
      {
        text: '基础入门',
        items: [
          { text: '简介', link: '/setup/introduction.md' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/aaronlamz/open-ebook' }
    ]
  }
})
