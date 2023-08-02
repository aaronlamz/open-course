import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Qiankun",
  description: "微前端实践指南",
  base: '/open-course/qiankun/',
  outDir: './.vitepress/dist/qiankun',
  head: [['link', { rel: 'icon', href: '/open-course/qiankun/qiankun.png' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/qiankun.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/introduction.md' },
      { text: '在线示例', link: '/' },
      { text: '官方文档', link: 'https://qiankun.umijs.org/zh' },
      { text: 'Github', link: 'https://github.com/aaronlamz/open-course' }
    ],
    sidebar: [
      {
        text: '入门指南',
        items: [
          { text: '前言', link: '/guide/index.md' },
          { text: '介绍', link: '/guide/introduction.md' },
          { text: 'qiankun 工作原理', link: '/guide/qiankun-core.md' },
          { text: 'single-spa 工作原理', link: '/guide/single-spa-core.md' },
          { text: '沙箱环境', link: '/guide/sandbox.md' },
        ]
      },
      {
        text: '后台管理系统实践',
        items: [
          { text: '选择路由模式', link: '/admin/router.md' },
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/aaronlamz/open-course' }
    ]
  }
})
