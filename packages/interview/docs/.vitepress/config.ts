import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "前端面试系列",
  description: "查漏补缺，提升自我",
  base: '/open-course/interview/',
  outDir: './.vitepress/dist/interview',
  head: [['link', { rel: 'icon', href: '/open-course/interview/logo.png' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '开始学习', link: '/introduction' },
      { text: 'GitHub', link: 'https://github.com/aaronlamz/open-course' },
      { text: '讨论区', link: 'https://github.com/aaronlamz/open-course/discussions' },
    ],

    sidebar: [
      {
        text: '介绍',
        collapsed: false,
        items: [
          { text: '写在前面', link: '/introduction.md' },
          { text: '面试攻略', link: '/interview-guide.md' },
        ]
      },
      {
        text: 'JavaScript ',
        collapsed: true,
        items: [
          { text: '介绍', link: '/javascript/' },
          { text: '原型、原型链', link: '/javascript/prototype.md' },
          { text: '闭包', link: '/javascript/closure.md' },
          { text: 'this', link: '/javascript/this.md' },
          { text: '变量提升', link: '/javascript/hosting.md' },
          {
            text: 'EventLoop', link: '/javascript/event-loop.md'
          },
          { text: 'new 底层实现', link: '/javascript/new.md' },
        ]
      },

      {
        text: 'CSS ',
        collapsed: true,
        items: [
          { text: '介绍', link: '/css/' },
          { text: '盒子模型', link: '/css/bbm.md' },
          { text: 'CSS中的BFC是什么以及它的作用', link: '/css/bfc.md' },
        ]
      },
      {
        text: 'Vue ',
        collapsed: true,
        items: [
          { text: '介绍', link: '/vue/' },
          {
            text: '基础概念', items: [
              { text: '响应式原理', link: '/vue/reactive.md' },
              { text: '虚拟DOM及diff算法', link: '/vue/virtual-dom.md' },
              { text: 'nextTick', link: '/vue/next-tick.md' },
              { text: 'computed', link: '/vue/computed.md' },
              { text: 'watch', link: '/vue/watch.md' },
              { text: 'keep-alive实现', link: '/vue/keep-alive.md' },
              { text: 'slot', link: '/vue/slot.md' },
              { text: 'extend', link: '/vue/extend.md' },
              { text: 'render函数', link: '/vue/render.md' },
              { text: 'template', link: '/vue/template.md' },
            ]
          }
        ]
      },
      {
        text: 'React ',
        collapsed: true,
        items: [
          { text: '介绍', link: '/react/' },
          {
            text: '基础概念', items: [
              { text: 'JSX以及工作原理', link: '/react/jsx.md' },
              { text: '虚拟DOM及diff算法', link: '/react/virtual-dom.md' },
              { text: '解释setState方法和它的工作原理', link: '/react/set-state.md' },
              { text: '什么是props和state，它们之间有什么区别？', link: '/react/props-state.md' },
              { text: '事件机制', link: '/react/event.md' },
            ]
          },
          {
            text: '组件和数据流', items: [
              { text: '如何在React中进行状态管理？', link: '/react/state-management.md' },
              { text: 'React中的组件通信方式有哪些？', link: '/react/component-communication.md' },
              { text: 'React中的组件生命周期', link: '/react/component-lifecycle.md' },
              { text: '什么是高阶组件（HOC）？', link: '/react/higher-order-component.md' },
              { text: '什么是受控组件和非受控组件？', link: '/react/controlled-component.md' },
              { text: '什么是React的context，如何使用它？', link: '/react/context.md' },
              { text: '解释React中的forwardRefs和它们的用途', link: '/react/forward-refs.md' },
              { text: '函数式组件与类组件区别', link: '/react/functional-component.md' },
            ]
          },
          {
            text: '高级概念和架构', items: [
              { text: 'React 的 reconciliation 算法是什么？它是如何工作的？', link: '/react/reconciliation.md' },
              { text: '解释React的Fiber架构', link: '/react/fiber.md' },
              { text: 'Hooks 是什么？它解决了什么问题？', link: '/react/hooks.md' },
              { text: '如何处理错误和异常？', link: '/react/error-boundaries.md' },
              { text: '如何在React应用中实现国际化？', link: '/react/internationalization.md' },
              { text: '如何在React应用中实现代码分割和动态加载？', link: '/react/code-splitting.md' },
            ]
          },
          {
            text: '性能优化', items: [
              { text: '如何优化React应用的性能？', link: '/react/performance.md' },
              { text: 'React中的PureComponent和memo有什么区别？', link: '/react/pure-component-memo.md' },
              { text: 'React中的key有什么作用？', link: '/react/key.md' },
              { text: 'React中的懒加载和Suspense有什么作用？', link: '/react/lazy-suspense.md' },
              { text: 'React中的Profiler有什么作用？', link: '/react/profiler.md' },
            ]
          },
          {
            text: 'React 生态', items: [
              { text: '如何处理服务端渲染（SSR）？', link: '/react/server-side-rendering.md' },
              { text: 'Redux实现原理', link: '/react/redux.md' },
            ]
          }
        ]
      },
      {
        text: 'TypeScript ',
        collapsed: true,
        items: [
          { text: '介绍', link: '/typescript/' },
          { text: 'TypeScript中的泛型', link: '/typescript/generics.md' },
          { text: 'any和unknown的区别', link: '/typescript/any-unknown.md' },
        ]
      },
      {
        text: 'Node.js ',
        collapsed: true,
        items: [
          { text: '介绍', link: '/nodejs/' },
          { text: 'Express、koa、egg有什么区别', link: '/nodejs/express-koa-egg.md' },
          { text: '进程管理工具', link: '/nodejs/process-manager.md' },
          { text: 'koa 中间件原理', link: '/nodejs/koa-middleware.md' },
        ]
      },
      {
        text: '网络协议',
        collapsed: true,
        items: [
          { text: '介绍', link: '/network/' },
          {
            text: '详细说说从浏览器输入url到页面展现出来这个过程发生了什么', link: '/network/url.md',
          },
          {
            text: 'HTTP 协议', link: '/network/http.md'
          },
          {
            text: 'HTTP 缓存', link: '/network/http-cache.md'
          },
          {
            text: 'HTTP 协议升级', link: '/network/http-upgrade.md'
          },
          {
            text: 'HTTPS 协议', link: '/network/https.md'
          },
          {
            text: 'TCP 协议', link: '/network/tcp.md'
          },
          {
            text: 'UDP 协议', link: '/network/udp.md'
          },
          {
            text: 'CDN', link: '/network/cdn.md'
          },
          {
            text: 'DNS', link: '/network/dns.md'
          }
        ]
      },
      {
        text: '性能优化',
        collapsed: true,
        items: [
          { text: '介绍', link: '/performance/' },
          { text: '优化SPA首屏加载速度', link: '/performance/first-screen.md' },
          { text: '浏览器的缓存策略', link: '/performance/browser-cache.md' },
          { text: 'preload和prefetch', link: '/performance/preload-prefetch.md' },
          { text: 'defer和async', link: '/performance/defer-async.md' },
          { text: 'css是否会阻塞页面渲染', link: '/performance/css-block.md' },
          { text: '长列表优化方案', link: '/performance/long-list.md' },
          { text: '浏览器白屏原因及优化方案',link: 'performance/white-screen.md'}
        ]
      },
      {
        text: '构建工具',
        collapsed: true,
        items: [
          { text: '介绍', link: '/build-tool/' },
          { text: 'webpack工作原理', link: '/build-tool/webpack.md' },
          { text: 'webpack优化策略', link: '/build-tool/webpack-optimization.md' },
          { text: 'tree-shaking 实现原理', link: '/build-tool/tree-shaking.md' },
          { text: 'webpack、rollup、vite 等工具适用场景及优缺点', link: '/build-tool/webpack-rollup-vite.md' },
        ]
      },
      {
        text: '跨端',
        collapsed: true,
        items: [
          {
            text: 'Electron 基础概念',
            items: [
              { text: '介绍', link: '/cross-end/electron/' },
              { text: 'Electron 的工作原理是什么？', link: '/cross-end/electron/how-electron-works.md' },
              { text: 'Electron 的主进程和渲染进程是什么？', link: '/cross-end/electron/main-process-and-render-process.md' },
            ]
          }
        ]
      },
      {
        text: '安全',
        collapsed: true,
        items: [
          { text: '介绍', link: '/security/' },
          { text: 'XSS', link: '/security/xss.md' },
          { text: 'CSRF', link: '/security/csrf.md' },
          { text: 'CORS', link: '/security/cors.md' },
          { text: 'JWT', link: '/security/jwt.md' },
          { text: '中间人攻击', link: '/security/mitm.md' },
        ]
      },
      {
        text: '开放题',
        collapsed: true,
        items: [
          { text: '介绍', link: '/open-question/' },
          { text: '最有成就感的项目是什么？', link: '/open-question/achievement.md' },
          { text: '最有挑战性的项目是什么？', link: '/open-question/challenge.md' },
          { text: '最有价值的项目是什么？', link: '/open-question/value.md' },
          { text: '最有意思的项目是什么？', link: '/open-question/interesting.md' },
        ]
      },
      {
        text: '手写代码',
        collapsed: true,
        items: [
          { text: '介绍', link: '/handwritten/' },
          { text: '手写Promise实现', link: '/handwritten/promise.md' },
          { text: '手写call、apply、bind实现', link: '/handwritten/call-apply-bind.md' },
          { text: '手写new实现', link: '/handwritten/new.md' },
          { text: '手写instanceof实现', link: '/handwritten/instanceof.md' },
          { text: '手写深拷贝实现', link: '/handwritten/deep-clone.md' },
          { text: '手写防抖实现', link: '/handwritten/debounce.md' },
          { text: '手写节流实现', link: '/handwritten/throttle.md' },
          { text: '手写柯里化实现', link: '/handwritten/curry.md' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/aaronlamz/open-course' }
    ]
  }
})
