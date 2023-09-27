# React 事件机制

React 的事件机制并不完全是浏览器的原生事件机制，而是在其上实现的一个合成事件（Synthetic Event）系统。这为跨浏览器的一致性和React组件的性能提供了优化空间。以下是React事件机制的一些主要特点：

1. **合成事件（Synthetic Event）**: React中的所有事件都会被封装成合成事件对象，这些对象具有和浏览器的原生事件相似的接口，但它们工作在所有浏览器上。当事件发生时，React会创建一个合成事件，并在React组件上触发该事件。

2. **事件委托**: React 不会直接将事件处理函数绑定到真实的节点上，而是在文档根节点上使用一个单一的事件监听器来监听所有事件。这可以减少内存使用并防止在高频更新的场景下的性能问题。

3. **组件生命周期和事件**: 由于 React 控制了组件的生命周期，当组件被卸载时，它会自动清除与该组件相关的所有事件处理程序，从而避免了内存泄漏。

4. **不支持冒泡的事件**: 有一些事件，如`onFocus`和`onBlur`，在原生事件系统中不支持冒泡，但在React中是通过冒泡来模拟的。

5. **跨浏览器兼容性**: React内部处理了许多浏览器之间的一致性问题，使得你不必担心某些浏览器的怪异行为。

6. **传递参数**: 在事件处理函数中，经常需要传递额外的参数。在React中，你可以通过箭头函数或绑定的方式来实现这一点。

例如：
```jsx
<button onClick={(e) => this.handleClick(id, e)}>Click me</button>
```

7. **事件池**: 出于性能的考虑，合成事件是从一个池中被复用的。这意味着合成事件对象可能会在事件回调函数之后被重用。如果你想在异步代码中访问事件属性，你需要调用 `event.persist()`，这将从池中删除合成事件并允许用户代码保留对事件的引用。

为了使用React的事件系统，你只需要在JSX中使用特定的事件处理属性，例如`onClick`, `onChange`, `onSubmit`等，并提供相应的处理函数。

## 参考
[React 事件机制](https://juejin.cn/post/7068649069610024974)



