# Vue响应式原理

> 面试高频问题，建议理清思路，

当然可以。Vue 的响应式系统是其核心特性之一，它使得数据和 UI 之间能够保持同步。我们将从 Vue 2.x 开始详细描述，并稍后介绍 Vue 3.x 的改进和变化。

## Vue 2.x 响应式原理

1. **初始化**  
   当创建一个新的 Vue 实例时，Vue 会遍历 `data` 对象的所有属性，并使用 `Object.defineProperty` 把它们转换为 getter 和 setter。

2. **getter 和 setter**  
   - **getter**: 当属性被读取时执行。例如，在模板中使用属性时。在 getter 中，Vue 会将当前组件添加到该属性的依赖列表中。
   - **setter**: 当属性值被修改时执行。当 setter 被调用时，Vue 会重新渲染依赖该属性的所有组件。

3. **依赖收集**  
   当组件被渲染时，会触发 getter，Vue 会记录哪些属性被访问。这样，Vue 就知道哪些组件依赖于哪些数据属性。

4. **观察者 (Observer) 和 Watcher**  
   - Vue 使用一个 Observer 类来给对象的属性添加 getter 和 setter。
   - Watcher 用于监听某个属性或计算属性或组件的渲染函数的变化。当依赖的属性变化时，Watcher 会被通知，从而重新计算或渲染。

5. **数组响应式**  
   Vue 无法使用 `Object.defineProperty` 直接监视数组的变化。因此，Vue 重写了数组的一些方法（如 `push`、`pop`、`shift` 等），使得当数组通过这些方法被修改时，可以发送通知。

## Vue 3.x 的响应式原理

1. **Proxy**  
   Vue 3 使用 `Proxy` 替代 `Object.defineProperty`，它能够直接观察对象和数组的变动，而不需要为每个属性单独定义 getter 和 setter。这使得 Vue 3 支持动态添加和删除属性，并自动将它们变为响应式。

2. **Reactivity API**  
   Vue 3 介绍了几个新的响应式 API，例如 `ref`, `reactive`, `toRefs`, `computed`, 和 `watch`。其中 `ref` 用于基本类型，`reactive` 用于对象。

3. **依赖收集与变化侦测**  
   Vue 3 的依赖收集和变化检测机制与 Vue 2 类似，但由于使用了 Proxy，它的性能更好，代码也更简洁。

4. **Effects**  
   Vue 3 引入了 effect 函数，这是响应系统的基石。当数据变化时，相关的 effect 将被重新执行。

## 实现一个简单的响应系统
理解 Vue 的响应式原理背后的代码实现，需要深入其源码和一些核心概念。为了方便理解，我会简化代码和概念。下面将根据 Vue 2.x 的版本进行描述，因为它的实现方式相对直观：

### 1. **Observer 类**
这是整个响应式系统的核心，它负责将一个普通的 JavaScript 对象转换为响应式对象。

```javascript
class Observer {
  constructor(value) {
    this.walk(value);
  }

  walk(obj) {
    const keys = Object.keys(obj);
    keys.forEach(key => {
      defineReactive(obj, key, obj[key]);
    });
  }
}

function defineReactive(obj, key, val) {
  // 递归子属性
  new Observer(val);
  Object.defineProperty(obj, key, {
    get() {
      return val;
    },
    set(newVal) {
      val = newVal;
      // 通知更新
      // ...此处省略更新逻辑
    }
  });
}

const data = { a: 1 };
new Observer(data);
```

### 2. **Dep 类 (依赖收集)**
Dep 类实际上是一个依赖收集器，它负责管理所有的 Watcher（观察者）。

```javascript
class Dep {
  constructor() {
    this.subs = [];
  }
  
  addSub(sub) {
    this.subs.push(sub);
  }
  
  notify() {
    this.subs.forEach(sub => {
      sub.update();
    });
  }
}
```

### 3. **Watcher 类**
它是观察者，当依赖的数据发生变化时，它会接收到通知并执行相应的操作。

```javascript
class Watcher {
  constructor(obj, key, cb) {
    this.obj = obj;
    this.key = key;
    this.cb = cb;
    this.value = this.get();
  }
  
  update() {
    this.value = this.get();
    this.cb.call(this.obj, this.value);
  }
  
  get() {
    // 设置 Dep.target，使得 obj 的 getter 可以收集这个 watcher
    Dep.target = this;
    const value = this.obj[this.key];
    Dep.target = null;
    return value;
  }
}

const data = { a: 1 };
new Observer(data);
new Watcher(data, 'a', val => {
  console.log('a changed:', val);
});
```

这只是响应式系统的一个非常简化的版本，实际的 Vue 源码涉及更多细节和优化。Vue 3 的实现依赖于 `Proxy` 和 `Reflect`，其核心思想类似，但在细节上有很大差异。
