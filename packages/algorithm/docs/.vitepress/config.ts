import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "数据结构与算法学习指南",
  description: "数据结构与算法学习指南",
  base: '/open-course/algorithm/',
  outDir: './.vitepress/dist/algorithm',
  head: [['link', { rel: 'icon', href: '/open-course/algorithm/favicon.ico' }]],
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
