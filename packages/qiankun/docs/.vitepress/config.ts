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
      { text: '指南', link: '/guide/' },
      { text: '在线示例', link: '/demo/' },
      { text: '官方文档', link: 'https://qiankun.umijs.org/zh' },
      { text: '官方社区', link: 'https://github.com/umijs/qiankun/discussions' },
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
        text: '微前端应用实践-后台管理系统',
        items: [
          { text: '选择路由模式', link: '/admin/router.md' },
          { text: '构建基座应用', link: '/admin/base.md' },
          { text: '构建子应用', link: '/admin/sub.md' },
          { text: '构建子应用-React', link: '/admin/sub-react.md' },
          { text: '构建子应用-Vue', link: '/admin/sub-vue.md' },
          { text: '构建子应用-Angular', link: '/admin/sub-angular.md' },
          { text: '父子应用间通信', link: '/admin/communication.md' },
          { text: '样式隔离方案', link: '/admin/style.md' },
          { text: 'Tab页签 KeepAlive 方案', link: '/admin/keep-alive.md' },
        ]
      },
      {
        text: '常见问题&解决方案',
        items: [
        ]
      },
      {
        text: '源码解析篇',
        items: [
          { text: 'qiankun 源码解析', link: '/source/qiankun.md' },
        ]
      },
      {
        text: '贡献指南',
        items: [
          { text: '参与贡献', link: '/contributing.md' },
        ]
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/aaronlamz/open-course' }
    ]
  }
})

