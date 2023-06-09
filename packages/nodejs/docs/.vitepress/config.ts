import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Node.js 开发指南",
  description: "从零构建 Node.js 知识体系",
  base: '/open-ebook/nodejs/',
  outDir: './.vitepress/dist/nodejs',
  head: [['link', { rel: 'icon', href: '/open-ebook/nodejs/favicon.ico' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/hero.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Node.js 简介',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/aaronlamz/open-ebook' }
    ]
  }
})
