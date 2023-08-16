import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "数据结构与算法之美",
  description: "数据结构与算法之美",
  base: '/open-course/algorithm/',
  outDir: './.vitepress/dist/algorithm',
  head: [['link', { rel: 'icon', href: '/open-course/algorithm/favicon.ico' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/introduction.md' },
      { text: 'GitHub', link: 'https://github.com/aaronlamz/open-course' },
    ],

    sidebar: [
      {
        text: '基础入门',
        items: [
          { text: '简介', link: '/guide/introduction.md' },
        ]
      },
      {
        text: '算法实践',
        items: [
          { text: '剖析Redis常用数据类型对应的数据结构', link: '/practice/redis.md' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/aaronlamz/open-course' }
    ]
  }
})
