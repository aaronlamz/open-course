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
      { text: 'JavaScript', link: '/javascript/index.md' },
      { text: 'CSS', link: '/css/index.md' },
      { text: 'Vue', link: '/vue/index.md' },
    ],

    sidebar: [
      {
        text: '写在前面',
        items: [
          { text: '简介', link: '/introduction.md' },
        ]
      },
      {
        text: 'JavaScript',
        items: [
          { text: '简介', link: '/introduction.md' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/aaronlamz/open-ebook' }
    ]
  }
})
