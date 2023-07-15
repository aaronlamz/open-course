# 解释一下Vue中的keep-alive实现

## 什么是keep-alive

keep-alive是Vue的一个内置组件，它可以使被包含的组件保留状态，避免重新渲染。

## 为什么要使用keep-alive

当我们想要对组件进行缓存时，就可以使用keep-alive。

## keep-alive的优势

keep-alive可以对组件进行缓存，避免重新渲染，提高性能。


## keep-alive的缺点

keep-alive的缺点主要是它不能缓存动态组件，因为动态组件是在运行时才会解析的，所以它不能被缓存。


## keep-alive的实现

keep-alive的实现主要是通过render方法来实现的，它接收一个虚拟DOM对象作为参数，然后将其渲染成真实的DOM元素。

```js

function render(vnode) {
  const el = document.createElement(vnode.tag)
  for (const key in vnode.attrs) {
    el.setAttribute(key, vnode.attrs[key])
  }
  if (vnode.children) {
    vnode.children.forEach(child => {
      if (typeof child === 'string') {
        el.appendChild(document.createTextNode(child))
      } else {
        el.appendChild(render(child))
      }
    })
  }
  return el
}
```

## keep-alive的使用

keep-alive的使用非常简单，只需要在需要缓存的组件外面包裹一个keep-alive标签即可。

```html

<keep-alive>
  <router-view></router-view>
</keep-alive>
```

## keep-alive的原理

keep-alive的原理是通过一个数组来存储缓存的组件，当组件被激活时，将其从数组中移除，当组件被销毁时，将其添加到数组中。

```js

const cache = []

function render(vnode) {
  const el = document.createElement(vnode.tag)
  for (const key in vnode.attrs) {
    el.setAttribute(key, vnode.attrs[key])
  }
  if (vnode.children) {
    vnode.children.forEach(child => {
      if (typeof child === 'string') {
        el.appendChild(document.createTextNode(child))
      } else {
        el.appendChild(render(child))
      }
    })
  }
  return el
}

function mountComponent(vm, el) {
  vm.$el = el
  const updateComponent = () => {
    const vnode = vm._render()
    vm._update(vnode)
  }
  new Watcher(vm, updateComponent)
}

function createComponent(vnode) {
  let i = 0
  const vm = {
    _isComponent: true,
    _vnode: vnode,
    _render() {
      return this._vnode
    },
    _update(vnode) {
      if (this._isMounted) {
        const prevVnode = this._vnode
        this.__patch__(prevVnode, vnode)
      } else {
        this.__patch__(this.$el, vnode)
        this._isMounted = true
      }
      this._vnode = vnode
    },
    __patch__(oldVnode, vnode) {
      if (oldVnode.nodeType) {
        const parent = oldVnode.parentNode
        const el = render(vnode)
        parent.insertBefore(el, oldVnode.nextSibling)
        parent.removeChild(oldVnode)
      } else {
        const el = oldVnode.el
        const newEl = render(vnode)
        oldVnode.el = newEl
        el.parentNode.replaceChild(newEl, el)
      }
    }
  }
  return vm
}

function createElm(vnode) {
  if (typeof vnode === 'string') {
    return document.createTextNode(vnode)
  } else {
    const { tag, attrs, children } = vnode
    const el = document.createElement(tag)
    for (const key in attrs) {
      el.setAttribute(key, attrs[key])
    }
    children.forEach(child => {
      el.appendChild(createElm(child))
    })
    return el
  }
}

function patch(oldVnode, vnode) {
  if (oldVnode.nodeType) {
    const parent = oldVnode.parentNode
    const el = createElm(vnode)
    parent.insertBefore(el, oldVnode.nextSibling)
    parent.removeChild(oldVnode)
  } else {
    const el = oldVnode.el
    const newEl = createElm(vnode)
    oldVnode.el = newEl
    el.parentNode.replaceChild(newEl, el)
  }
}

function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    const vm = this
    patch(vm.$el, vnode)
  }
}

function mountComponent(vm, el) {
  vm.$el = el
  const updateComponent = () => {
    const vnode = vm._render()
    vm._update(vnode)
  }
  new Watcher(vm, updateComponent)
}

function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this
    vm.$options = options
    initState(vm)
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
  Vue.prototype.$mount = function (el) {
    const vm = this
    const options = vm.$options
    el = document.querySelector(el)
    vm.$el = el
    if (!options.render) {
      let template = options.template
      if (!template && el) {
        template = el.outerHTML
      }
      const render = compileToFunction(template)
      options.render = render
    }
    mountComponent(vm, el)
  }
}

function compileToFunction(template) {
  const ast = parseHTML(template)
  return function render() {
    return generate(ast)
  }
}


function parseHTML(template) {
  const stack = []
  const root = new ElementNode('root')
  let currentParent = root
  const advance = (n) => {
    template = template.substring(n)
  }
  const parseStartTag = () => {
    const start = template.match(/^\<([a-z]+[1-6]?)(\s[^\<]+)?\>/)
    if (start) {
      const tag = start[1]
      const attrs = start[2]
      advance(start[0].length)
      const element = new ElementNode(tag, attrs)
      currentParent.children.push(element)
      stack.push(element)
      currentParent = element
      parseChildren()
    }
  }
  const parseEndTag = () => {
    const end = template.match(/^\<\/([a-z]+[1-6]?)\>/)
    if (end) {
      const tag = end[1]
      advance(end[0].length)
      stack.pop()
      currentParent = stack[stack.length - 1]
      parseChildren()
    }
  }
  const parseText = () => {
    const text = template.match(/^([^\<]+)/)
    if (text) {
      const content = text[1]
      advance(text[0].length)
      const textNode = new TextNode(content)
      currentParent.children.push(textNode)
      parseChildren()
    }
  }
  const parseChildren = () => {
    if (template) {
      if (template[0] === '<') {
        if (template[1] === '/') {
          parseEndTag()
        } else {
          parseStartTag()
        }
      } else {
        parseText()
      }
    }
  }
  while (template) {
    parseChildren()
  }
  return root
}

function generate(ast) {
  const children = genChildren(ast)
  let code = `_c('${ast.tag}', ${ast.attrs ? genProps(ast.attrs) : undefined}${children ? `, ${children}` : ''})`
  return code
}

function genChildren(ast) {
  const children = ast.children
  if (children && children.length > 0) {
    return `[${children.map(child => gen(child)).join(',')}]`
  }
}

function gen(node) {
  if (node.type === 1) {
    return generate(node)
  } else {
    const text = node.text
    const tokens = []
    let lastIndex = 0
    let match, index
    while (match = defaultTagRE.exec(text)) {
      index = match.index
      if (index > lastIndex) {
        tokens.push(JSON.stringify(text.slice(lastIndex, index)))
      }
      tokens.push(`_s(${match[1].trim()})`)
      lastIndex = index + match[0].length
    }
    if (lastIndex < text.length) {
      tokens.push(JSON.stringify(text.slice(lastIndex)))
    }
    return `_v(${tokens.join('+')})`
  }
}

function genProps(attrs) {
  let str = ''
  for (let i = 0; i < attrs.length; i++) {
    const attr = attrs[i]
    if (attr.name === 'style') {
      const obj = {}
      attr.value.split(';').forEach(item => {
        const [key, value] = item.split(':')
        obj[key] = value
      })
      attr.value = obj
    }
    str += `${attr.name}:${JSON.stringify(attr.value)},`
  }
  return `{${str.slice(0, -1)}}`
}

function initGlobalAPI(Vue) {
  Vue.options = {}
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin)
  }
  Vue.options._base = Vue
  Vue.options.components = {}
  Vue.component = function (id, definition) {
    definition.name = definition.name || id
    definition = this.options._base.extend(definition)
    this.options.components[id] = definition
  }
  Vue.extend = function (options) {
    const Super = this
    const Sub = function VueComponent(options) {
      this._init(options)
    }
    Sub.prototype = Object.create(Super.prototype)
    Sub.prototype.constructor = Sub
    Sub.options = mergeOptions(Super.options, options)
    return Sub
  }
}

function mergeOptions(parent, child) {
  const options = {}
  for (const key in parent) {
    mergeField(key)
  }
  for (const key in child) {
    if (!parent.hasOwnProperty(key)) {
      mergeField(key)
    }
  }
  function mergeField(key) {
    if (strats[key]) {
      options[key] = strats[key](parent[key], child[key])
    } else {
      options[key] = child[key] || parent[key]
    }
  }
  return options
}

const strats = {}

const LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed'
]

LIFECYCLE_HOOKS.forEach(hook => {
  strats[hook] = function (parentVal, childVal) {
    if (childVal) {
      if (parentVal) {
        return parentVal.concat(childVal)
      } else {
        return [childVal]
      }
    } else {
      return parentVal
    }
  }
})

strats.components = function (parentVal, childVal) {
  const res = Object.create(parentVal)
  if (childVal) {
    for (const key in childVal) {
      res[key] = childVal[key]
    }
  }
  return res
}

function Vue(options) {
  this._init(options)
}

initMixin(Vue)

lifecycleMixin(Vue)

renderMixin(Vue)

initGlobalAPI(Vue)

function renderMixin(Vue) {
  Vue.prototype._render = function () {
    const vm = this
    const render = vm.$options.render
    const vnode = render.call(vm)
    return vnode
  }
}

function Watcher(vm, fn) {
  this.vm = vm
  this.getter = fn
  this.get()
}

Watcher.prototype.get = function () {
  const vm = this.vm
  pushTarget(this)
  this.getter.call(vm)
  popTarget()
}

function pushTarget(watcher) {
  Dep.target = watcher
}

function popTarget() {
  Dep.target = null
}

function initState(vm) {
  const opts = vm.$options
  if (opts.data) {
    initData(vm)
  }
  if (opts.computed) {
    initComputed(vm, opts.computed)
  }
  if (opts.watch) {
    initWatch(vm, opts.watch)
  }
}

function initData(vm) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}
  for (const key in data) {
    proxy(vm, '_data', key)
  }
  observe(data)
}

function initComputed(vm, computed) {
  const watchers = vm._computedWatchers = {}
  for (const key in computed) {
    const userDef = computed[key]
    const getter = typeof userDef === 'function' ? userDef : userDef.get
    watchers[key] = new Watcher(vm, getter, () => { }, { lazy: true })
    defineComputed(vm, key, userDef)
  }
}

function defineComputed(vm, key, userDef) {
  const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: () => { },
    set: () => { }
  }
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = createComputedGetter(key)
  } else {
    sharedPropertyDefinition.get = createComputedGetter(key)
    sharedPropertyDefinition.set = userDef.set
  }
  Object.defineProperty(vm, key, sharedPropertyDefinition)
}

function createComputedGetter(key) {
  return function computedGetter() {
    const watcher = this._computedWatchers[key]
    if (watcher.dirty) {
      watcher.evaluate()
    }
    if (Dep.target) {
      watcher.depend()
    }
    return watcher.value
  }
}

function initWatch(vm, watch) {
  for (const key in watch) {
    const handler = watch[key]
    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      createWatcher(vm, key, handler)
    }
  }
}

function createWatcher(vm, key, handler) {
  return vm.$watch(key, handler)
}

function proxy(vm, sourceKey, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[sourceKey][key]
    },
    set(newValue) {
      vm[sourceKey][key] = newValue
    }
  })
}
```

