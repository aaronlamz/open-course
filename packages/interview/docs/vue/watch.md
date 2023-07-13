# 解释一下Vue中的watch

## 什么是watch

watch是一个选项，它用来监听数据的变化，当数据发生变化时，就会触发回调函数。

## 为什么要使用watch

当我们想要在数据变化时执行异步或开销较大的操作时，就可以使用watch。

## watch的优势

1. watch可以监听到对象、数组的变化，而computed只能监听到属性的变化。

2. watch可以监听到数据的变化，而computed只能监听到属性的变化。

## watch的缺点

watch的缺点主要是它不能缓存计算结果，而computed可以缓存计算结果。

## watch的实现

watch的实现主要是通过watch方法来实现的，它接收三个参数，第一个参数是要监听的数据，第二个参数是回调函数，第三个参数是一个对象，它有两个属性，一个是deep，用来指定是否要深度监听，另一个是immediate，用来指定是否要立即执行回调函数。

```js

function watch(expOrFn, cb, options) {
  const vm = this
  options = options || {}
  const watcher = new Watcher(vm, expOrFn, cb, options)
  if (options.immediate) {
    cb.call(vm, watcher.value)
  }
  return function unwatchFn() {
    watcher.teardown()
  }
}

// new Watcher 实现，可以查看源码

class Watcher {
  constructor(vm, expOrFn, cb, options) {
    this.vm = vm
    this.cb = cb
    this.options = options
    this.getter = parsePath(expOrFn)
    this.value = this.get()
  }
  get() {
    pushTarget(this)
    const vm = this.vm
    let value = this.getter.call(vm, vm)
    popTarget()
    return value
  }
  update() {
    const oldValue = this.value
    this.value = this.get()
    this.cb.call(this.vm, this.value, oldValue)
  }
  teardown() {
    this.vm = null
  }
}

// parsePath

const bailRE = /[^\w.$]/

function parsePath(path) {
  if (bailRE.test(path)) {
    return
  }
  const segments = path.split('.')
  return function(obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}

// pushTarget

const targetStack = []

function pushTarget(target) {
  targetStack.push(target)
  Dep.target = target
}

// popTarget

function popTarget() {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}

// Dep

class Dep {
  constructor() {
    this.subs = []
  }
  addSub(sub) {
    this.subs.push(sub)
  }
  removeSub(sub) {
    remove(this.subs, sub)
  }
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }
  notify() {
    const subs = this.subs.slice()
    for (let i = 0; i < subs.length; i++) {
      subs[i].update()
    }
  }
}

// remove

function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

// Dep.target

Dep.target = null

```

## watch的应用

watch的应用主要是在Vue中，当我们想要监听数据的变化时，就可以使用watch。

```js

const vm = new Vue({
  el: '#app',
  data() {
    return {
      counter: 0
    }
  },
  watch: {
    counter(newValue, oldValue) {
      console.log(newValue, oldValue)
    }
  }
})
```
