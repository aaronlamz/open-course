# React的Fiber架构

React 的 Fiber 架构是 React 16（也称为 React Fiber）中引入的一种新的重构算法，它旨在支持虚拟 DOM 树的增量渲染。与之前的 "Stack Reconciler" 不同，Fiber 允许 React 暂停工作，然后在稍后恢复这些工作，从而使其具有更高的灵活性。这为异步渲染、时间切片和并发模式提供了基础。

## 为什么会有 Fiber 架构？

React 在 V16 之前会面临的主要性能问题是：当组件树很庞大时，更新状态可能造成页面卡顿，这些问题的根本原因是React的更新和渲染流程是同步和不可中断的。当React开始处理组件树的更新时，它必须一直处理到结束，这有可能阻塞主线程，导致页面卡顿和不流畅的用户体验。

为了解决这些问题，React团队引入了Fiber架构，这是React 16中的主要变革。Fiber架构的目标是使React的渲染和更新过程变得可中断。

以下是Fiber带来的主要变革：

1. **增量渲染**：Fiber允许React将渲染工作分为多个块，并将这些工作分散到多个帧中，而不是一次性完成所有工作。
2. **可中断性**：Fiber架构引入了任务分片的概念。React可以中断当前正在进行的工作，转而执行更为紧急的任务，可以将控制权交回浏览器，让浏览器及时地相应用户的交互——异步可中断，例如响应用户输入。
3. **优先级调度**：不是所有更新都是相同的。有些更新（如动画或用户交互）比其他更新（如后台数据同步）更为紧急。React可以基于优先级调度和处理这些更新。

这些变革确保了即使在大型应用中，React也可以维护流畅的用户体验。Fiber架构使得React在渲染和更新组件时具有更大的灵活性，从而提高了整体的应用性能。

## Fiber 数据结构

Fiber 是 React 16 (React Fiber 架构) 引入的新特性，代表一个工作单元。它是为了支持更复杂的组件和使 React 具有可中断性渲染能力而设计的。Fiber 为每一个 React 元素建立了一个数据结构，这使得 React 可以跟踪和管理渲染工作。

依赖数据结构-链表实现的。其中每个节点都是一个 Fiber，一个 Fiber 包含了 child（第一个子节点）、sibling（兄弟节点）、parent（父节点）等属性。Fiber 节点中其实还会保存节点的类型、节点的信息（比如 state、props）、节点对应的值等。

## Fiber 工作原理

通过简化的伪代码来深入了解一下 Fiber 的工作原理。这里不会完全准确地表示 React 的内部实现，但会为你提供一个大概的框架。

假设我们有以下简单的组件树：

```jsx
function Parent() {
  return (
    <div>
      <ChildA />
      <ChildB />
    </div>
  );
}

function ChildA() {
  return <div>Child A</div>;
}

function ChildB() {
  return <div>Child B</div>;
}
```

当状态或props发生变化时，React需要重新渲染该树。

### 1. 构建 Fiber Tree

首先，React为每个组件创建一个Fiber节点。Fiber节点可以看作是该组件的一个轻量级表示，其中包含有关该组件的信息，例如其类型、key、props等。

```js
const parentFiber = {
  type: Parent,
  child: childAFiber,
  sibling: childBFiber,
  // ... 其他属性
};

const childAFiber = {
  type: ChildA,
  // ... 其他属性
};

const childBFiber = {
  type: ChildB,
  // ... 其他属性
};
```

### 2. 协调阶段

在此阶段，React会遍历Fiber tree，比较每个节点的新旧props和state，以确定是否需要更新。

```js
function reconcile(fiber) {
  if (hasChanged(fiber.oldProps, fiber.newProps)) {
    fiber.effectTag = 'UPDATE';
  }

  // 遍历子节点
  if (fiber.child) {
    reconcile(fiber.child);
  }

  // 遍历兄弟节点
  if (fiber.sibling) {
    reconcile(fiber.sibling);
  }
}
```

### 3. 提交阶段

在此阶段，React会处理所有在协调阶段标记为需要更新的Fiber节点。

```js
function commitFiber(fiber) {
  if (fiber.effectTag === 'UPDATE') {
    // 更新DOM或执行其他副作用
    updateDOM(fiber);
  }

  // 遍历子节点和兄弟节点，继续提交
  if (fiber.child) {
    commitFiber(fiber.child);
  }
  if (fiber.sibling) {
    commitFiber(fiber.sibling);
  }
}
```

上述伪代码为了简化只涉及了更新。实际的React代码需要处理更多的情况，例如插入、删除、错误边界等。

通过这种方式，React能够快速确定哪些组件需要更新，然后在提交阶段一次性将所有更改应用到DOM，从而优化性能。


## 参考

- [Fiber 的作用和原理](https://fe.azhubaby.com/React/Fiber.html)


