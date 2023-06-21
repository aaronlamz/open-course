import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Node.js 开发指南",
  description: "从零构建 Node.js 知识体系",
  base: '/open-course/nodejs/',
  outDir: './.vitepress/dist/nodejs',
  head: [['link', { rel: 'icon', href: '/open-course/nodejs/favicon.ico' }]],
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
          { text: 'Node.js 简介', link: '/setup/introduction.md' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/aaronlamz/open-course' }
    ]
  }
})
