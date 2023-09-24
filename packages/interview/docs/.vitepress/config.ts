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
        text: 'JavaScript 系列',
        collapsed: true,
        items: [
          { text: '介绍', link: '/javascript/' },
          { text: '原型、原型链', link: '/javascript/prototype.md' },
          { text: '闭包', link: '/javascript/closure.md' },
          { text: 'this', link: '/javascript/this.md' },
          { text: '变量提升', link: '/javascript/hosting.md' },
          {
            text: 'EventLoop', link: '/javascript/event-loop.md'
          }
        ]
      },

      {
        text: 'CSS 系列',
        collapsed: true,
        items: [
          { text: '介绍', link: '/css/' },
          { text: '盒子模型', link: '/css/bbm.md' },
          { text: 'CSS中的BFC是什么以及它的作用', link: '/css/bfc.md' },
        ]
      },
      {
        text: 'Vue 系列',
        collapsed: true,
        items: [
          { text: '介绍', link: '/vue/' },
          { text: 'Vue响应式原理', link: '/vue/reactive.md' },
          { text: 'Vue中的虚拟DOM及diff算法', link: '/vue/virtual-dom.md' },
          { text: 'Vue中的nextTick', link: '/vue/next-tick.md' },
          { text: 'Vue中的computed', link: '/vue/computed.md' },
          { text: 'Vue中的watch', link: '/vue/watch.md' },
          { text: 'Vue中的keep-alive实现', link: '/vue/keep-alive.md' },
          { text: 'Vue中的slot', link: '/vue/slot.md' },
          { text: 'Vue中的extend', link: '/vue/extend.md' },
          { text: 'Vue中的render函数', link: '/vue/render.md' },
          { text: 'Vue中的template', link: '/vue/template.md' },
        ]
      },
      {
        text: 'React 系列',
        collapsed: true,
        items: [
          { text: '介绍', link: '/react/' },
          {
            text: '基础概念', items: [
              { text: 'JSX以及工作原理', link: '/react/jsx.md' },
              { text: '虚拟DOM及diff算法', link: '/react/virtual-dom.md' },
              { text: '解释setState方法和它的工作原理', link: '/react/set-state.md' },
              { text: '什么是props和state，它们之间有什么区别？', link: '/react/props-state.md' },
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
            ]
          },
          {
            text: '高级概念和架构', items: [
              { text: 'React 的 reconciliation 算法是什么？它是如何工作的？', link: '/react/reconciliation.md' },
              { text: '解释React的Fiber架构', link: '/react/fiber.md' },
              { text: 'Hooks 是什么？它解决了什么问题？', link: '/react/hooks.md' },
              { text: '如何处理服务端渲染（SSR）？', link: '/react/server-side-rendering.md' },
              { text: '如何处理错误和异常？', link: '/react/error-boundaries.md' },
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
          }
        ]
      },
      {
        text: 'TypeScript 系列',
        collapsed: true,
        items: [
          { text: '介绍', link: '/typescript/' },
          { text: 'TypeScript中的泛型', link: '/typescript/generics.md' },
          { text: 'any和unknown的区别', link: '/typescript/any-unknown.md' },
        ]
      },
      {
        text: 'Node.js 系列',
        collapsed: true,
        items: [
          { text: '介绍', link: '/nodejs/' },
        ]
      },
      {
        text: '网络协议系列',
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
            text: 'WebSocket 协议', link: '/network/websocket.md'
          },

          {
            text: 'CDN', link: '/network/cdn.md'
          },

        ]
      },
      {
        text: '性能优化系列',
        collapsed: true,
        items: [
          { text: '介绍', link: '/performance/' },
          { text: '优化SPA首屏加载速度', link: '/performance/first-screen.md' },
          { text: '浏览器的缓存策略', link: '/performance/browser-cache.md' },
          { text: 'preload和prefetch', link: '/performance/preload-prefetch.md' },
          { text: 'defer和async', link: '/performance/defer-async.md' },
          { text: 'css是否会阻塞页面渲染', link: '/performance/css-block.md' },
        ]
      },
      {
        text: '构建工具系列',
        collapsed: true,
        items: [
          { text: '介绍', link: '/build-tool/' },
          { text: 'webpack工作原理', link: '/build-tool/webpack.md' },
          { text: 'webpack优化策略', link: '/build-tool/webpack-optimization.md' },
          { text: 'webpack、rollup、vite 等工具适用场景及优缺点', link: '/build-tool/webpack-rollup-vite.md' },
        ]
      },
      {
        text: '跨端系列',
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
        text: '手写代码系列',
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
          { text: '手写洋葱模型实现', link: '/handwritten/onion.md' },
          { text: '手写发布订阅模式实现', link: '/handwritten/pub-sub.md' },
          { text: '手写观察者模式实现', link: '/handwritten/observer.md' },
        ]
      },
      {
        text: 'LeetCode 系列',
        collapsed: true,
        items: [
          { text: '介绍', link: '/leetcode/' },
          { text: '两数之和', link: '/leetcode/two-sum.md' },
          { text: '两数相加', link: '/leetcode/add-two-numbers.md' },
          { text: '无重复字符的最长子串', link: '/leetcode/longest-substring-without-repeating-characters.md' },
          { text: '寻找两个正序数组的中位数', link: '/leetcode/median-of-two-sorted-arrays.md' },
          { text: '最长回文子串', link: '/leetcode/longest-palindromic-substring.md' },
          { text: 'Z 字形变换', link: '/leetcode/zigzag-conversion.md' },
          { text: '整数反转', link: '/leetcode/reverse-integer.md' },
          { text: '字符串转换整数 (atoi)', link: '/leetcode/string-to-integer-atoi.md' },
          { text: '回文数', link: '/leetcode/palindrome-number.md' },
          { text: '盛最多水的容器', link: '/leetcode/container-with-most-water.md' },
          { text: '整数转罗马数字', link: '/leetcode/integer-to-roman.md' },
          { text: '罗马数字转整数', link: '/leetcode/roman-to-integer.md' },
          { text: '最长公共前缀', link: '/leetcode/longest-common-prefix.md' },
          { text: '三数之和', link: '/leetcode/3sum.md' },
          { text: '最接近的三数之和', link: '/leetcode/3sum-closest.md' },
          { text: '电话号码的字母组合', link: '/leetcode/letter-combinations-of-a-phone-number.md' },
          { text: '四数之和', link: '/leetcode/4sum.md' },
          { text: '删除链表的倒数第N个节点', link: '/leetcode/remove-nth-node-from-end-of-list.md' },
          { text: '有效的括号', link: '/leetcode/valid-parentheses.md' },
          { text: '合并两个有序链表', link: '/leetcode/merge-two-sorted-lists.md' },
          { text: '括号生成', link: '/leetcode/generate-parentheses.md' },
          { text: '合并K个升序链表', link: '/leetcode/merge-k-sorted-lists.md' },
          { text: '两两交换链表中的节点', link: '/leetcode/swap-nodes-in-pairs.md' },
          { text: '环形链表', link: '/leetcode/linked-list-cycle.md' },
          { text: '环形链表 II', link: '/leetcode/linked-list-cycle-ii.md' },
          { text: '反转链表', link: '/leetcode/reverse-linked-list.md' },
          { text: '反转链表 II', link: '/leetcode/reverse-linked-list-ii.md' },
          { text: 'K 个一组翻转链表', link: '/leetcode/reverse-nodes-in-k-group.md' },
          { text: '两数相加 II', link: '/leetcode/add-two-numbers-ii.md' },
          { text: '分隔链表', link: '/leetcode/split-linked-list-in-parts.md' },
          { text: '旋转链表', link: '/leetcode/rotate-list.md' },
          { text: '排序链表', link: '/leetcode/sort-list.md' },
          { text: 'LRU 缓存机制', link: '/leetcode/lru-cache.md' },
          { text: '复制带随机指针的链表', link: '/leetcode/copy-list-with-random-pointer.md' },
          { text: '回文链表', link: '/leetcode/palindrome-linked-list.md' },
          { text: '相交链表', link: '/leetcode/intersection-of-two-linked-lists.md' },
          { text: '环形链表', link: '/leetcode/linked-list-cycle.md' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/aaronlamz/open-course' }
    ]
  }
})
