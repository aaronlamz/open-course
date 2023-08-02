# 解释一下Vue中的computed

## 什么是 computed

computed是Vue中的一个属性，它用来定义计算属性，它的值是一个对象，对象中可以定义多个计算属性，每个计算属性都有一个getter和一个setter，getter用来获取计算属性的值，setter用来监视计算属性的变化。

## 为什么要使用computed

在Vue中，我们可以通过{{}}来显示数据，但是如果我们想要对数据进行一些处理，比如格式化，我们就需要使用到计算属性。

## computed 实现原理

以下是一个简化的、概念级别的描述，来理解 Vue 中的 `computed` 是如何实现的：

1. **依赖收集**：首先，Vue 使用了 `Object.defineProperty()` 或者 `Proxy`（在 Vue3 中）来设定对象属性的 getter 和 setter。在 `computed` 函数中，每当我们访问一个响应式数据，就会触发 getter，这时 Vue 就会把这个计算属性作为依赖收集起来。

2. **依赖追踪**：然后，当这个响应式数据发生变化，就会触发 setter，Vue 就会找到这个数据相关的所有依赖，也就是所有使用这个数据的计算属性。

3. **计算属性更新**：最后，Vue 会重新执行这些计算属性的函数，计算出新的值，并缓存这个值。

当你再次访问这个计算属性时，如果依赖的数据没有发生改变，Vue 会直接返回缓存的结果，这就避免了不必要的计算，提高了性能。

这个过程的核心就是 Vue 的响应式系统和依赖追踪机制。请注意，这是一个概念级别的简化描述，实际的 Vue 源码中的实现会更复杂。在真正的 Vue 源码中，会有更多的细节，比如异步更新队列等。如果你想要深入理解，建议你阅读 Vue 的源码，以及社区中的一些深度解析文章。

## computed 简单实现 

首先，我们需要一个机制来跟踪当我们访问数据时，哪个计算属性依赖于这个数据。然后，我们需要一个机制来在我们改变数据时，更新所有依赖于这个数据的计算属性。

为了简单，我们可以使用 `Proxy` API 来创建这样的一个响应式系统。这是一个简单的示例：

```javascript
let data = {
  message: 'Hello',
  count: 2,
};

let computed = {
  reversedMessage() {
    return data.message.split('').reverse().join('');
  },
  doubleCount() {
    return data.count * 2;
  },
};

let computedCache = {};
let dependencies = {};

let reactiveData = new Proxy(data, {
  get(target, property) {
    // 记录当前正在执行的计算属性，以便将它添加到这个数据的依赖中
    dependencies[property] = dependencies[property] || new Set();
    if (currentComputed) {
      dependencies[property].add(currentComputed);
    }

    return target[property];
  },
  set(target, property, value) {
    target[property] = value;

    // 当数据变化时，更新所有依赖于这个数据的计算属性
    if (dependencies[property]) {
      for (let computed of dependencies[property]) {
        computedCache[computed] = null;
      }
    }

    return true;
  },
});

let currentComputed = null;

function getComputedValue(key) {
  if (!computedCache[key]) {
    currentComputed = key;
    computedCache[key] = computed[key]();
    currentComputed = null;
  }
  return computedCache[key];
}

console.log(getComputedValue('reversedMessage')); // 输出: 'olleH'
console.log(getComputedValue('doubleCount')); // 输出: 4

reactiveData.message = 'World';
reactiveData.count = 3;

console.log(getComputedValue('reversedMessage')); // 输出: 'dlroW'
console.log(getComputedValue('doubleCount')); // 输出: 6
```

在这个示例中，我们使用 `Proxy` 来拦截对 `data` 对象的访问。在 `get` 拦截器中，我们跟踪哪个计算属性依赖于这个数据。在 `set` 拦截器中，我们更新所有依赖于这个数据的计算属性。

在 `getComputedValue` 函数中，我们首先检查缓存中是否有这个计算属性的值，如果没有，我们将当前正在计算的计算属性设置为 `key`，然后计算这个值并存储到缓存中，最后将 `currentComputed` 设置回 `null`。

请注意，这仍然是一个非常简化的例子，只是为了帮助理解 Vue 中计算属性的工作原理。在实际的 Vue 源码中，实现计算属性的逻辑会更复杂，涉及到很多细节，比如异步更新队列、错误处理等。

