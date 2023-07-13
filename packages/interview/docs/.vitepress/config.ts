import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "前端面试题系列",
  description: "查漏补缺，提升自我",
  base: '/open-course/interview/',
  outDir: './.vitepress/dist/interview',
  head: [['link', { rel: 'icon', href: '/open-course/interview/logo.png' }]],
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
        collapsed: true,
        items: [
          { text: '解释一下原型、原型链是什么', link: '/javascript/prototype.md' },
          { text: '解释一下JavaScript中的闭包（closure）是什么以及它的作用', link: '/javascript/closure.md' },
          { text: '解释一下JavaScript中的this是什么以及它的作用', link: '/javascript/this.md' },
          { text: '解释一下JavaScript中的执行上下文（execution context）和作用域链（scope chain）。', link: '/javascript/scope.md' },
          { text: '解释一下JavaScript中的变量提升是什么以及它的作用', link: '/javascript/hoisting.md' },
          { text: '解释一下JavaScript中的事件循环是什么以及它的作用。', link: '/javascript/event-loop.md' },
          { text: '解释一下JavaScript中的异步编程是什么以及它的作用。', link: '/javascript/async.md' },
          { text: '解释一下JavaScript中的Promise是什么以及它的作用。', link: '/javascript/promise.md' },
          { text: '解释一下什么是Generator函数？请描述一下Generator函数的工作原理和用途。', link: '/javascript/generator.md' },
          { text: '解释一下JavaScript中的Iterator是什么以及它的作用。', link: '/javascript/iterator.md' },
          { text: '解释一下JavaScript中的Symbol是什么以及它的作用。', link: '/javascript/symbol.md' },
          { text: '解释一下JavaScript中的Set是什么以及它的作用。', link: '/javascript/set.md' },
          { text: '解释一下JavaScript中的Map是什么以及它的作用。', link: '/javascript/map.md' },
          { text: '解释一下JavaScript中的WeakSet是什么以及它的作用。', link: '/javascript/weakset.md' },
          { text: '解释一下JavaScript中的WeakMap是什么以及它的作用。', link: '/javascript/weakmap.md' },
          { text: '解释一下JavaScript中的Proxy是什么以及它的作用。', link: '/javascript/proxy.md' },
          { text: '解释一下JavaScript中的Reflect是什么以及它的作用。', link: '/javascript/reflect.md' },
          { text: '解释一下JavaScript中的Class是什么以及它的作用。', link: '/javascript/class.md' },
          { text: '解释一下JavaScript中的Decorator是什么以及它的作用。', link: '/javascript/decorator.md' },
          { text: '请描述一下JavaScript中的模块化（module）的概念和常见的模块化规范。', link: '/javascript/module.md' },
          { text: '解释一下JavaScript中的箭头函数（arrow functions）和普通函数之间的区别。', link: '/javascript/arrow-functions.md' },
          { text: '解释一下JavaScript中的垃圾回收机制（garbage collection）是如何工作的。', link: '/javascript/garbage-collection.md' },
        ]
      },
      {
        text: 'CSS 系列',
        collapsed: true,
        items: [
          { text: 'BFC', link: '/css/bfc.md' },
        ]
      },
      {
        text: 'Vue 系列',
        collapsed: true,
        items: [
          { text: '解释一下Vue响应式原理', link: '/vue/reactive.md' },
          { text: '解释一下Vue中的虚拟DOM及diff算法', link: '/vue/virtual-dom.md' },
          { text: '解释一下Vue中的nextTick', link: '/vue/next-tick.md' },
          { text: '解释一下Vue中的computed', link: '/vue/computed.md' },
          { text: '解释一下Vue中的watch', link: '/vue/watch.md' },
          { text: '解释一下Vue中的keep-alive 实现', link: '/vue/keep-alive.md' },
          { text: '解释一下Vue中的slot', link: '/vue/slot.md' },
          { text: '解释一下Vue中的extend', link: '/vue/extend.md' },
          { text: '解释一下Vue中的render函数', link: '/vue/render.md' },
          { text: '解释一下Vue中的template', link: '/vue/template.md' },
          { text: '解释一下Vue中的vnode', link: '/vue/vnode.md' },
        ]
      },
      {
        text: '笔试题系列',
        collapsed: true,
        items: [
          { text: 'JavaScript', link: '/handwritten/javascript' },
          { text: 'CSS', link: '/handwritten/css' },
          { text: 'Vue', link: '/handwritten/vue' },
        ]
      },
      {
        text: 'LeetCode 系列',
        collapsed: true,
        items: [
          { text: 'JavaScript', link: '/leetcode/javascript' },
          { text: 'CSS', link: '/leetcode/css' },
          { text: 'Vue', link: '/leetcode/vue' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/aaronlamz/open-course' }
    ]
  }
})
