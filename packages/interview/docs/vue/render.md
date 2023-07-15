# 解释一下Vue中的render函数

## render函数的作用

render函数的作用是将虚拟DOM渲染成真实DOM，它的作用和template模板的作用是一样的，只不过它的使用方式不同而已，它的使用方式如下所示：

```js

new Vue({
  render: h => h(App)
}).$mount('#app')

```

## render函数的参数

render函数的参数是一个函数，它接收一个h函数作为参数，h函数的作用是创建虚拟DOM，它的使用方式如下所示：

```js

h('div', {
  attrs: {
    id: 'app'
  }
}, 'hello world')

```

## render函数的返回值

render函数的返回值是一个虚拟DOM，它的结构如下所示：

```js

{
  tag: 'div',
  data: {
    attrs: {
      id: 'app'
    }
  },
  children: [
    {
      text: 'hello world'
    }
  ]
}

```

## render函数的使用

render函数的使用方式有两种，一种是使用JSX，另一种是使用h函数，它们的使用方式如下所示：

```js

// 使用JSX

render (h) {
  return (
    <div id="app">
      hello world
    </div>
  )
}

// 使用h函数

render (h) {
  return h('div', {
    attrs: {
      id: 'app'
    }
  }, 'hello world')
}

```

## render函数的实现

render函数的实现非常复杂，它的实现方式有两种，一种是使用字符串拼接，另一种是使用AST，它们的实现方式如下所示：

```js

// 使用字符串拼接

render (h) {
  return `
    <div id="app">
      hello world
    </div>
  `
}

// 使用AST

render (h) {
  return h('div', {
    attrs: {
      id: 'app'
    }
  }, 'hello world')
}

```