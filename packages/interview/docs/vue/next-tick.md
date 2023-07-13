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

## MutationObserver 拓展

MutationObserver 是一个构造函数，用来创建一个观察者对象，这个观察者对象可以监听到 DOM 的变化。

```js
const observer = new MutationObserver(callback)
```

MutationObserver 的回调函数 callback 会在 DOM 发生变化时被调用，它接收两个参数，第一个参数是一个数组，表示 DOM 的变化，第二个参数是观察者对象，表示 DOM 的变化是由哪个观察者对象所引起的。

```js

const observer = new MutationObserver((mutations, observer) => {
  // ...
})
```

MutationObserver 的实例对象 observer 有一个 observe 方法，用来指定观察哪个 DOM 节点，以及观察哪些类型的 DOM 变化。

```js

observer.observe(targetNode, options)
```

targetNode 表示要观察的 DOM 节点，options 是一个对象，表示观察的类型，它有以下属性。

- childList：表示是否观察目标节点的子节点，比如新增了子节点或者删除了子节点。

- attributes：表示是否观察属性节点，比如属性节点的值发生了变化。

- characterData：表示是否观察文本节点，比如文本节点的值发生了变化。

- subtree：表示是否观察目标节点的所有后代节点。

- attributeOldValue：表示观察 attributes 属性时，是否需要记录变更前的属性值。

- characterDataOldValue：表示观察 characterData 属性时，是否需要记录变更前的属性值。

- attributeFilter：表示需要观察的特定属性的一个数组。

```js

const observer = new MutationObserver(callback)

observer.observe(targetNode, {
  childList: true,
  attributes: true,
  characterData: true,
  subtree: true,
  attributeOldValue: true,
  characterDataOldValue: true,
  attributeFilter: ['class', 'style']
})
```

MutationObserver 的实例对象 observer 有一个 disconnect 方法，用来停止观察。

```js

observer.disconnect()
```

MutationObserver 的实例对象 observer 有一个 takeRecords 方法，用来清空变动记录队列，并且返回里面的内容。

```js

const records = observer.takeRecords()
```

MutationObserver 的实例对象 observer 有一个 observe 方法，用来重新观察 DOM 节点。

```js

observer.observe(targetNode, options)
```

MutationObserver 的实例对象 observer 有一个 disconnect 方法，用来停止观察。

```js

observer.disconnect()
```

MutationObserver 的实例对象 observer 有一个 takeRecords 方法，用来清空变动记录队列，并且返回里面的内容。

```js

const records = observer.takeRecords()
```




## 参考资料

- [Vue.js 技术揭秘](https://ustbhuangyi.github.io/vue-analysis/v2/prepare/)

