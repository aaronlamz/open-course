# 解释一下Vue响应式原理

## 1. 什么是响应式

> 响应式是指当数据发生变化时，视图会自动更新

## 2. Vue响应式原理

### 2.1 Vue响应式原理的核心

> Vue响应式原理的核心是利用了ES5的Object.defineProperty()方法，该方法可以直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回这个对象。

### 2.2 Vue响应式原理的实现

> Vue响应式原理的实现主要分为两步，第一步是对data中的数据进行劫持，第二步是对模板中的数据进行编译。

#### 2.2.1 对data中的数据进行劫持

> 对data中的数据进行劫持，主要是通过Object.defineProperty()方法对data中的数据进行劫持，当data中的数据发生变化时，会触发set方法，从而更新视图。

```js
// 对data中的数据进行劫持
function defineReactive(obj, key, val) {
  // 递归遍历
  observe(val)
  // 创建一个Dep实例
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    get() {
      // 将Dep.target指向的Watcher实例添加到Dep实例的subs数组中
      Dep.target && dep.addDep(Dep.target)
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        // 如果newVal是一个对象，也对其进行劫持
        observe(newVal)
        val = newVal
        // 通知更新
        dep.notify()
      }
    }
  })
}
```

#### 2.2.2 对模板中的数据进行编译

> 对模板中的数据进行编译，主要是通过正则表达式匹配模板中的数据，然后通过new Watcher()方法创建一个Watcher实例，当数据发生变化时，会触发Watcher实例的update()方法，从而更新视图。

```js
// 对模板中的数据进行编译
function compile(node, vm) {
  // 获取节点的子节点
  const childNodes = node.childNodes
  // 遍历子节点
  Array.from(childNodes).forEach(child => {
    // 判断子节点是否是元素节点
    if (child.nodeType === 1) {
      // 如果是元素节点，递归遍历
      compile(child, vm)
    } else if (child.nodeType === 3) {
      // 如果是文本节点，对其进行编译
      compileText(child, vm)
    }
  })
}

// 对文本节点进行编译

function compileText(node, vm) {
  // 获取文本节点的内容
  const text = node.textContent
  // 创建正则表达式匹配模板中的数据
  const reg = /\{\{(.+?)\}\}/
  // 判断文本节点的内容是否匹配正则表达式
  if (reg.test(text)) {
    // 获取匹配到的第一个数据
    const key = RegExp.$1.trim()
    // 将模板中的数据替换成data中的数据
    node.textContent = text.replace(reg, vm[key])
    // 创建一个Watcher实例
    new Watcher(vm, key, newValue => {
      // 当数据发生变化时，更新视图
      node.textContent = newValue
    })
  }
}
```

#### 2.2.3 Watcher类

> Watcher类主要是用来更新视图的，当数据发生变化时，会触发Watcher实例的update()方法，从而更新视图。

```js
// Watcher类

class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb
    // 将当前Watcher实例指向Dep.target
    Dep.target = this
    // 触发get方法，在get方法中会将Dep.target指向的Watcher实例添加到Dep实例的subs数组中
    this.vm[this.key]
    // 将Dep.target置空
    Dep.target = null
  }
  // 更新视图
  update() {
    this.cb.call(this.vm, this.vm[this.key])
  }
}
```

#### 2.2.4 Dep类

> Dep类主要是用来管理Watcher实例的，当数据发生变化时，会触发Dep实例的notify()方法，从而更新视图。

```js
// Dep类

class Dep {
  constructor() {
    this.subs = []
  }
  // 将Watcher实例添加到subs数组中
  addDep(watcher) {
    this.subs.push(watcher)
  }
  // 更新视图
  notify() {
    this.subs.forEach(watcher => watcher.update())
  }
}
```

#### 2.2.5 observe函数

> observe函数主要是用来对data中的数据进行劫持的，当data中的数据发生变化时，会触发set方法，从而更新视图。

```js
// 对data中的数据进行劫持
function observe(obj) {
  // 判断obj是否是一个对象
  if (typeof obj !== 'object' || obj === null) {
    return
  }
  // 遍历obj对象的所有属性
  Object.keys(obj).forEach(key => {
    // 对data中的数据进行劫持
    defineReactive(obj, key, obj[key])
  })
}
```

#### 2.2.6 Vue类

> Vue类主要是用来创建Vue实例的，当Vue实例创建完成时，会调用Vue类的构造函数，从而对data中的数据进行劫持，对模板中的数据进行编译。

```js
// Vue类

class Vue {
  constructor(options) {
    // 将options对象保存到vm实例中
    this.$options = options
    // 将data对象保存到vm实例中
    this.$data = options.data
    // 对data中的数据进行劫持
    observe(this.$data)
    // 对模板中的数据进行编译
    compile(options.el, this)
  }
}
```

#### 2.2.7 index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vue响应式原理</title>
</head>
<body>
  <div id="app">
    <h1>{{name}}</h1>
    <h2>{{age}}</h2>
    <h3>{{address}}</h3>
  </div>
  <script src="./vue.js"></script>
  <script>
    const vm = new Vue({
      el: '#app',
      data: {
        name: '张三',
        age: 18,
        address: {
          city: '北京'
        }
      }
    })
    setTimeout(() => {
      vm.name = '李四'
      vm.address.city = '上海'
    }, 1000)
  </script>
</body>
</html>
```

#### 2.2.8 vue.js

```js
// 对data中的数据进行劫持
function defineReactive(obj, key, val) {
  // 递归遍历
  observe(val)
  // 创建一个Dep实例
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    get() {
      // 将Dep.target指向的Watcher实例添加到Dep实例的subs数组中
      Dep.target && dep.addDep(Dep.target)
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        // 如果newVal是一个对象，也对其进行劫持
        observe(newVal)
        val = newVal
        // 通知更新
        dep.notify()
      }
    }
  })
}

// 对data中的数据进行劫持
function observe(obj) {
  // 判断obj是否是一个对象
  if (typeof obj !== 'object' || obj === null) {
    return
  }
  // 遍历obj对象的所有属性
  Object.keys(obj).forEach(key => {
    // 对data中的数据进行劫持
    defineReactive(obj, key, obj[key])
  })
}

// 对模板中的数据进行编译
function compile(node, vm) {
  // 获取节点的子节点
  const childNodes = node.childNodes
  // 遍历子节点
  Array.from(childNodes).forEach(child => {
    // 判断子节点是否是元素节点
    if (child.nodeType === 1) {
      // 如果是元素节点，递归遍历
      compile(child, vm)
    } else if (child.nodeType === 3) {
      // 如果是文本节点，对其进行编译
      compileText(child, vm)
    }
  })
}

// 对文本节点进行编译
function compileText(node, vm) {
  // 获取文本节点的内容
  const text = node.textContent
  // 创建正则表达式匹配模板中的数据
  const reg = /\{\{(.+?)\}\}/
  // 判断文本节点的内容是否匹配正则表达式
  if (reg.test(text)) {
    // 获取匹配到的第一个数据
    const key = RegExp.$1.trim()
    // 将模板中的数据替换成data中的数据
    node.textContent = text.replace(reg, vm[key])
    // 创建一个Watcher实例
    new Watcher(vm, key, newValue => {
      // 当数据发生变化时，更新视图
      node.textContent = newValue
    })
  }
}

// Watcher类
class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb
    // 将当前Watcher实例指向Dep.target
    Dep.target = this
    // 触发get方法，在get方法中会将Dep.target指向的Watcher实例添加到Dep实例的subs数组中
    this.vm[this.key]
    // 将Dep.target置空
    Dep.target = null
  }
  // 更新视图
  update() {
    this.cb.call(this.vm, this.vm[this.key])
  }
}

// Dep类
class Dep {
  constructor() {
    this.subs = []
  }
  // 将Watcher实例添加到subs数组中
  addDep(watcher) {
    this.subs.push(watcher)
  }
  // 更新视图
  notify() {
    this.subs.forEach(watcher => watcher.update())
  }
}

// Vue类
class Vue {
  constructor(options) {
    // 将options对象保存到vm实例中
    this.$options = options
    // 将data对象保存到vm实例中
    this.$data = options.data
    // 对data中的数据进行劫持
    observe(this.$data)
    // 对模板中的数据进行编译
    compile(options.el, this)
  }
}
```

## 3. Vue响应式原理的优缺点

### 3.1 优点

> Vue响应式原理的优点是可以实现数据的双向绑定，当数据发生变化时，视图会自动更新。

### 3.2 缺点

> Vue响应式原理的缺点是只能对data中的数据进行劫持，不能对数组中的数据进行劫持，也不能对新增的属性进行劫持。

## 4. Vue响应式原理的改进

### 4.1 Vue响应式原理的改进

> Vue响应式原理的改进主要是通过Proxy对象对data中的数据进行劫持，当data中的数据发生变化时，会触发set方法，从而更新视图。

### 4.2 Vue响应式原理的实现

> Vue响应式原理的实现主要分为两步，第一步是对data中的数据进行劫持，第二步是对模板中的数据进行编译。

#### 4.2.1 对data中的数据进行劫持

> 对data中的数据进行劫持，主要是通过Proxy对象对data中的数据进行劫持，当data中的数据发生变化时，会触发set方法，从而更新视图。

```js
// 对data中的数据进行劫持
function observe(obj) {
  // 判断obj是否是一个对象
  if (typeof obj !== 'object' || obj === null) {
    return
  }
  // 遍历obj对象的所有属性
  Object.keys(obj).forEach(key => {
    // 对data中的数据进行劫持
    defineReactive(obj, key, obj[key])
  })
}

// 对data中的数据进行劫持

function defineReactive(obj, key, val) {
  // 递归遍历
  observe(val)
  // 创建一个Dep实例
  const dep = new Dep()
  // 创建Proxy实例
  const proxy = new Proxy(obj, {
    get(target, key) {
      // 将Dep.target指向的Watcher实例添加到Dep实例的subs数组中
      Dep.target && dep.addDep(Dep.target)
      return target[key]
    },
    set(target, key, newVal) {
      if (newVal !== target[key]) {
        // 如果newVal是一个对象，也对其进行劫持
        observe(newVal)
        target[key] = newVal
        // 通知更新
        dep.notify()
      }
    }
  })
  // 将Proxy实例返回
  return proxy
}
```

#### 4.2.2 对模板中的数据进行编译

> 对模板中的数据进行编译，主要是通过正则表达式匹配模板中的数据，然后通过new Watcher()方法创建一个Watcher实例，当数据发生变化时，会触发Watcher实例的update()方法，从而更新视图。

```js
// 对模板中的数据进行编译
function compile(node, vm) {
  // 获取节点的子节点
  const childNodes = node.childNodes
  // 遍历子节点
  Array.from(childNodes).forEach(child => {
    // 判断子节点是否是元素节点
    if (child.nodeType === 1) {
      // 如果是元素节点，递归遍历
      compile(child, vm)
    } else if (child.nodeType === 3) {
      // 如果是文本节点，对其进行编译
      compileText(child, vm)
    }
  })
}

// 对文本节点进行编译

function compileText(node, vm) {
  // 获取文本节点的内容
  const text = node.textContent
  // 创建正则表达式匹配模板中的数据
  const reg = /\{\{(.+?)\}\}/
  // 判断文本节点的内容是否匹配正则表达式
  if (reg.test(text)) {
    // 获取匹配到的第一个数据
    const key = RegExp.$1.trim()
    // 将模板中的数据替换成data中的数据
    node.textContent = text.replace(reg, vm[key])
    // 创建一个Watcher实例
    new Watcher(vm, key, newValue => {
      // 当数据发生变化时，更新视图
      node.textContent = newValue
    })
  }
}
```

#### 4.2.3 Watcher类

> Watcher类主要是用来更新视图的，当数据发生变化时，会触发Watcher实例的update()方法，从而更新视图。

```js
// Watcher类

class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb
    // 将当前Watcher实例指向Dep.target
    Dep.target = this
    // 触发get方法，在get方法中会将Dep.target指向的Watcher实例添加到Dep实例的subs数组中
    this.vm[this.key]
    // 将Dep.target置空
    Dep.target = null
  }
  // 更新视图
  update() {
    this.cb.call(this.vm, this.vm[this.key])
  }
}
```

#### 4.2.4 Dep类

> Dep类主要是用来管理Watcher实例的，当数据发生变化时，会触发Dep实例的notify()方法，从而更新视图。

```js
// Dep类

class Dep {
  constructor() {
    this.subs = []
  }
  // 将Watcher实例添加到subs数组中
  addDep(watcher) {
    this.subs.push(watcher)
  }
  // 更新视图
  notify() {
    this.subs.forEach(watcher => watcher.update())
  }
}
```

#### 4.2.5 Vue类

> Vue类主要是用来创建Vue实例的，当Vue实例创建完成时，会调用Vue类的构造函数，从而对data中的数据进行劫持，对模板中的数据进行编译。

```js
// Vue类

class Vue {
  constructor(options) {
    // 将options对象保存到vm实例中
    this.$options = options
    // 将data对象保存到vm实例中
    this.$data = options.data
    // 对data中的数据进行劫持
    this.$data = observe(this.$data)
    // 对模板中的数据进行编译
    compile(options.el, this)
  }
}
```

#### 4.2.6 index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vue响应式原理</title>
</head>

<body>
  <div id="app">
    <h1>{{name}}</h1>
    <h2>{{age}}</h2>
    <h3>{{address}}</h3>
  </div>
  <script src="./vue.js"></script>
  <script>
    const vm = new Vue({
      el: '#app',
      data: {
        name: '张三',
        age: 18,
        address: {
          city: '北京'
        }
      }
    })
    setTimeout(() => {
      vm.name = '李四'
      vm.address.city = '上海'
    }, 1000)
  </script>
</body>

</html>
```

#### 4.2.7 vue.js

```js
// 对data中的数据进行劫持
function observe(obj) {
  // 判断obj是否是一个对象
  if (typeof obj !== 'object' || obj === null) {
    return
  }
  // 遍历obj对象的所有属性
  Object.keys(obj).forEach(key => {
    // 对data中的数据进行劫持
    defineReactive(obj, key, obj[key])
  })
}

// 对data中的数据进行劫持

function defineReactive(obj, key, val) {
  // 递归遍历
  observe(val)
  // 创建一个Dep实例
  const dep = new Dep()
  // 创建Proxy实例
  const proxy = new Proxy(obj, {
    get(target, key) {
      // 将Dep.target指向的Watcher实例添加到Dep实例的subs数组中
      Dep.target && dep.addDep(Dep.target)
      return target[key]
    },
    set(target, key, newVal) {
      if (newVal !== target[key]) {
        // 如果newVal是一个对象，也对其进行劫持
        observe(newVal)
        target[key] = newVal
        // 通知更新
        dep.notify()
      }
    }
  })
  // 将Proxy实例返回
  return proxy
}

// 对模板中的数据进行编译
function compile(node, vm) {
  // 获取节点的子节点
  const childNodes = node.childNodes
  // 遍历子节点
  Array.from(childNodes).forEach(child => {
    // 判断子节点是否是元素节点
    if (child.nodeType === 1) {
      // 如果是元素节点，递归遍历
      compile(child, vm)
    } else if (child.nodeType === 3) {
      // 如果是文本节点，对其进行编译
      compileText(child, vm)
    }
  })
}

// 对文本节点进行编译

function compileText(node, vm) {
  // 获取文本节点的内容
  const text = node.textContent
  // 创建正则表达式匹配模板中的数据
  const reg = /\{\{(.+?)\}\}/
  // 判断文本节点的内容是否匹配正则表达式
  if (reg.test(text)) {
    // 获取匹配到的第一个数据
    const key = RegExp.$1.trim()
    // 将模板中的数据替换成data中的数据
    node.textContent = text.replace(reg, vm[key])
    // 创建一个Watcher实例
    new Watcher(vm, key, newValue => {
      // 当数据发生变化时，更新视图
      node.textContent = newValue
    })
  }
}

// Watcher类

class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb
    // 将当前Watcher实例指向Dep.target
    Dep.target = this
    // 触发get方法，在get方法中会将Dep.target指向的Watcher实例添加到Dep实例的subs数组中
    this.vm[this.key]
    // 将Dep.target置空
    Dep.target = null
  }
  // 更新视图
  update() {
    this.cb.call(this.vm, this.vm[this.key])
  }
}

// Dep类

class Dep {
  constructor() {
    this.subs = []
  }
  // 将Watcher实例添加到subs数组中
  addDep(watcher) {
    this.subs.push(watcher)
  }
  // 更新视图
  notify() {
    this.subs.forEach(watcher => watcher.update())
  }
}

// Vue类

class Vue {
  constructor(options) {
    // 将options对象保存到vm实例中
    this.$options = options
    // 将data对象保存到vm实例中
    this.$data = options.data
    // 对data中的数据进行劫持
    this.$data = observe(this.$data)
    // 对模板中的数据进行编译
    compile(options.el, this)
  }
}
```

## 完整实例

### 1. index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vue响应式原理</title>
</head>

<body>
  <div id="app">
    <h1>{{name}}</h1>
    <h2>{{age}}</h2>
    <h3>{{address}}</h3>
  </div>
  <script src="./vue.js"></script>
  <script>
    const vm = new Vue({
      el: '#app',
      data: {
        name: '张三',
        age: 18,
        address: {
          city: '北京'
        }
      }
    })
    setTimeout(() => {
      vm.name = '李四'
      vm.address.city = '上海'
    }, 1000)
  </script>

</body>

</html>
```

### 2. vue.js

```js
// 对data中的数据进行劫持
function observe(obj) {
  // 判断obj是否是一个对象
  if (typeof obj !== 'object' || obj === null) {
    return
  }
  // 遍历obj对象的所有属性
  Object.keys(obj).forEach(key => {
    // 对data中的数据进行劫持
    defineReactive(obj, key, obj[key])
  })
}

// 对data中的数据进行劫持

function defineReactive(obj, key, val) {
  // 递归遍历
  observe(val)
  // 创建一个Dep实例
  const dep = new Dep()
  // 创建Proxy实例
  const proxy = new Proxy(obj, {
    get(target, key) {
      // 将Dep.target指向的Watcher实例添加到Dep实例的subs数组中
      Dep.target && dep.addDep(Dep.target)
      return target[key]
    },
    set(target, key, newVal) {
      if (newVal !== target[key]) {
        // 如果newVal是一个对象，也对其进行劫持
        observe(newVal)
        target[key] = newVal
        // 通知更新
        dep.notify()
      }
    }
  })
  // 将Proxy实例返回
  return proxy
}

// 对模板中的数据进行编译

function compile(node, vm) {
  // 获取节点的子节点
  const childNodes = node.childNodes
  // 遍历子节点
  Array.from(childNodes).forEach(child => {
    // 判断子节点是否是元素节点
    if (child.nodeType === 1) {
      // 如果是元素节点，递归遍历
      compile(child, vm)
    } else if (child.nodeType === 3) {
      // 如果是文本节点，对其进行编译
      compileText(child, vm)
    }
  })
}

// 对文本节点进行编译

function compileText(node, vm) {
  // 获取文本节点的内容
  const text = node.textContent
  // 创建正则表达式匹配模板中的数据
  const reg = /\{\{(.+?)\}\}/
  // 判断文本节点的内容是否匹配正则表达式
  if (reg.test(text)) {
    // 获取匹配到的第一个数据
    const key = RegExp.$1.trim()
    // 将模板中的数据替换成data中的数据
    node.textContent = text.replace(reg, vm[key])
    // 创建一个Watcher实例
    new Watcher(vm, key, newValue => {
      // 当数据发生变化时，更新视图
      node.textContent = newValue
    })
  }
}

// Watcher类

class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb
    // 将当前Watcher实例指向Dep.target
    Dep.target = this
    // 触发get方法，在get方法中会将Dep.target指向的Watcher实例添加到Dep实例的subs数组中
    this.vm[this.key]
    // 将Dep.target置空
    Dep.target = null
  }
  // 更新视图
  update() {
    this.cb.call(this.vm, this.vm[this.key])
  }
}

// Dep类

class Dep {
  constructor() {
    this.subs = []
  }
  // 将Watcher实例添加到subs数组中
  addDep(watcher) {
    this.subs.push(watcher)
  }
  // 更新视图
  notify() {
    this.subs.forEach(watcher => watcher.update())
  }
}

// Vue类

class Vue {
  constructor(options) {
    // 将options对象保存到vm实例中
    this.$options = options
    // 将data对象保存到vm实例中
    this.$data = options.data
    // 对data中的数据进行劫持
    this.$data = observe(this.$data)
    // 对模板中的数据进行编译
    compile(options.el, this)
  }
}
```
