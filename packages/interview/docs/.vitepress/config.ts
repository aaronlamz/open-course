import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "前端面试题库",
  description: "查漏补缺，提升自己",
  base: '/open-ebook/interview/',
  outDir: './.vitepress/dist/interview',
  head: [['link', { rel: 'icon', href: '/open-ebook/interview/logo.png' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/introduction' },
    ],

    sidebar: [
      {
        text: '介绍',
        collapsed: false,
        items: [
          { text: '写在前面', link: '/introduction.md' },
        ]
      },
      {
        text: 'JavaScript 系列',
        collapsed: false,
        items: [
          { text: '原型、原型链的理解', link: '/javascript/prototype.md' },
        ]
      },
      {
        text: 'CSS 系列',
        collapsed: false,
        items: [
          { text: '原型、原型链的理解', link: '/javascript/prototype.md' },
        ]
      },
      {
        text: 'Vue 系列',
        collapsed: false,
        items: [
          { text: '原型、原型链的理解', link: '/javascript/prototype.md' },
        ]
      },
      {
        text: '笔试题系列',
        collapsed: false,
        items: [
          { text: 'JavaScript', link: '/handwritten/javascript' },
          { text: 'CSS', link: '/handwritten/css' },
          { text: 'Vue', link: '/handwritten/vue' },
        ]
      },
      {
        text: 'LeetCode 系列',
        collapsed: false,
        items: [
          { text: 'JavaScript', link: '/leetcode/javascript' },
          { text: 'CSS', link: '/leetcode/css' },
          { text: 'Vue', link: '/leetcode/vue' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/aaronlamz/open-ebook' }
    ]
  }
})
