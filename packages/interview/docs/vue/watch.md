# 解释一下 Vue 中的 watch

`watch` 是 Vue 中用于观察和响应 Vue 实例上的数据变动的一个特性。不同于 `computed`，`watch` 更适合于执行异步操作或更复杂的操作、响应、逻辑，比如数据的获取、操作和其他副作用。

### **基本原理**
`watch` 的背后原理同样是 Vue 的响应式系统。当你声明了一个 `watch` 监听器，Vue 将创建一个观察者实例，它会在数据改变时执行特定的回调函数。

### **如何工作**
1. 当你为某个响应式数据声明一个 `watch` 监听器时，Vue 将为这个数据创建一个观察者实例。
2. 当这个数据改变时，观察者知道并执行其回调函数。

### **简化的代码实现**
以下是一个非常简化的 `watch` 的实现，用于展示其背后的核心思想：

```javascript
class Watcher {
  constructor(obj, key, callback) {
    this.value = obj[key];
    this.callback = callback;

    // 创建 getter 用于侦听
    Object.defineProperty(obj, key, {
      get: () => this.value,
      set: newVal => {
        const oldValue = this.value;
        if (newVal !== oldValue) {
          this.value = newVal;
          this.callback(newVal, oldValue);  // 数据改变，执行回调函数
        }
      }
    });
  }
}

// 使用方式
const data = { a: 1, b: 2 };

const aWatcher = new Watcher(data, 'a', (newVal, oldVal) => {
  console.log(`a changed from ${oldVal} to ${newVal}`);
});

data.a = 3;  // 输出 "a changed from 1 to 3"
```

需要注意的是，上述代码仅仅是一个简化版，真实的 Vue 源码中，对于依赖管理、通知变更等方面有很多优化和高级特性。但这个简化版代码应该能够帮助你理解 `watch` 的基本思想。