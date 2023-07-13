# 解释一下Vue中的nextTick

## 什么是nextTick

nextTick是Vue中的一个异步方法，它用来在DOM更新循环结束之后执行延迟回调，在修改数据之后立即使用这个方法，获取更新后的DOM。

## 为什么要使用nextTick

在Vue中，数据是响应式的，当数据发生变化时，Vue会立即更新DOM，但是这个更新是异步的，所以此时DOM并没有立即更新，如果我们想要获取更新后的DOM，就需要使用nextTick方法。

## nextTick的实现

nextTick的实现主要分为两个部分，一个是异步方法的实现，另一个是DOM更新循环的实现。

### 异步方法的实现

异步方法的实现主要是通过宏任务和微任务来实现的，宏任务主要是通过setTimeout来实现的，微任务主要是通过Promise来实现的。

```js
const callbacks = []
let pending = false

function flushCallbacks() {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

let timerFunc

if (typeof Promise !== 'undefined') {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
  }
} else if (typeof MutationObserver !== 'undefined') {
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
} else {
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}

export function nextTick(cb) {
  callbacks.push(cb)
  if (!pending) {
    pending = true
    timerFunc()
  }
}
```

### DOM更新循环的实现

DOM更新循环的实现主要是通过一个队列来实现的，当数据发生变化时，会将这个更新操作放入到队列中，然后通过nextTick方法来执行这个队列。

```js
const queue = []
let has = {}
let waiting = false

function flushSchedulerQueue() {
  for (let i = 0; i < queue.length; i++) {
    const watcher = queue[i]
    watcher.run()
  }
  queue.length = 0
  has = {}
  waiting = false
}

export function queueWatcher(watcher) {
  const id = watcher.id
  if (has[id] == null) {
    has[id] = true
    queue.push(watcher)
    if (!waiting) {
      waiting = true
      nextTick(flushSchedulerQueue)
    }
  }
}
```

## nextTick的应用

nextTick的应用主要是在Vue中，当我们修改数据时，Vue会立即更新DOM，但是这个更新是异步的，所以此时DOM并没有立即更新，如果我们想要获取更新后的DOM，就需要使用nextTick方法。

```js
const vm = new Vue({
  el: '#app',
  data() {
    return {
      message: 'Hello World'
    }
  }
})

vm.message = 'Hello Vue'

vm.$nextTick(() => {
  console.log(document.getElementById('app').textContent) // Hello Vue
})
```

## 参考资料

- [Vue.js 技术揭秘](https://ustbhuangyi.github.io/vue-analysis/v2/prepare/)

