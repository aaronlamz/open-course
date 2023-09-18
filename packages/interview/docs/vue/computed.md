# Vue中的computed

`computed` 是 Vue 中的一个非常有用的特性，它允许我们声明性地描述某个属性与其依赖关系，当依赖的数据变化时，`computed` 属性会自动重新计算值。

### **基本原理**
`computed` 属性背后的基本原理是使用了 Vue 的响应式系统。当你首次访问一个 `computed` 属性时，它会被计算并缓存。在后续的访问中，只要其依赖的数据没有变化，它就会返回缓存的结果，而不是重新计算。只有当依赖的数据发生变化时，`computed` 属性才会重新计算。

### **如何工作**
1. 当你访问一个 `computed` 属性时，它会把自己添加到当前的依赖项列表中。这意味着这个 `computed` 属性现在依赖于任何被它访问的响应式数据。
2. 当一个响应式数据项变化时，它知道哪些 `computed` 属性依赖于它，所以它会通知这些 `computed` 属性需要重新计算。
3. 当你下次访问这个 `computed` 属性时，它会先检查它依赖的数据是否发生变化。如果有，它会重新计算并返回新值，否则它会返回之前缓存的结果。

### **简化的代码实现**
以下是一个非常简化的实现，旨在展示其背后的核心思想：
```javascript
class ComputedWatcher {
  constructor(obj, computeFunc) {
    this.value = null;
    this.dirty = true; // 标志是否需要重新计算
    this.obj = obj;
    this.computeFunc = computeFunc;

    // 在首次访问时计算值
    this.value = this.get();
  }

  get() {
    if (this.dirty) {
      // 计算新值
      this.value = this.computeFunc.call(this.obj);
      this.dirty = false; // 标记已计算
    }
    return this.value;
  }

  // 标记为 "dirty" 以便重新计算
  depend() {
    this.dirty = true;
  }
}

// 使用方式
const data = { a: 1, b: 2 };

const sumComputed = new ComputedWatcher(data, function() {
  return this.a + this.b;
});

console.log(sumComputed.get()); // 输出 3

data.a = 3;
sumComputed.depend();

console.log(sumComputed.get()); // 输出 5
```

这只是一个简化版，真实的 Vue 源码中还有很多优化和高级特性，如计算属性的 setter、依赖追踪、计算属性缓存机制等。但上述代码展示了其基本思想。

