# 解释一下Vue中的虚拟DOM及diff算法

## 什么是虚拟DOM

虚拟DOM是用JavaScript对象来描述DOM节点的层次结构，它比创建一个DOM的代价要小很多，因为不用创建真实的DOM元素，也不会进行DOM操作，只是用一个对象来描述DOM结构，然后通过一个渲染器将其渲染成真实的DOM元素。

## 为什么要使用虚拟DOM

在浏览器中，DOM操作是很昂贵的，因为DOM是一个非常复杂的数据结构，每次操作DOM都会引起浏览器的重绘和重排，这些操作非常消耗性能，而且会阻塞UI渲染，导致页面卡顿，所以我们需要尽量减少DOM操作。

## 虚拟DOM的优势

1. 虚拟DOM是一个JavaScript对象，所以创建和销毁的代价很小，而且不会进行DOM操作，只是用一个对象来描述DOM结构，然后通过一个渲染器将其渲染成真实的DOM元素，所以性能会有很大的提升。

2. 虚拟DOM可以跨平台，不仅可以在浏览器中使用，还可以在原生应用中使用，比如React Native，Weex等。

3. 虚拟DOM可以实现DOM的高级抽象，比如React中的组件，它可以将DOM抽象成一个个的组件，然后组件再组合成一个个的组件，最终形成一个完整的页面。

## 虚拟DOM的缺点

1. 虚拟DOM需要额外的创建和销毁的代价，因为它需要在JavaScript对象和真实DOM之间进行转换，所以它并不适合所有的场景，比如游戏开发等。

2. 虚拟DOM需要依赖于原生平台的API，因为虚拟DOM最终还是要渲染成真实的DOM元素，所以它需要依赖于原生平台的API，比如React需要依赖于浏览器的API，而React Native需要依赖于原生平台的API。

## 虚拟DOM的实现

虚拟DOM的实现主要分为两个部分，一个是虚拟DOM的创建，另一个是虚拟DOM的渲染。

### 虚拟DOM的创建

虚拟DOM的创建主要是通过createElement方法来创建，它接收三个参数，第一个参数是标签名，第二个参数是属性对象，第三个参数是子节点，它会返回一个虚拟DOM对象。

```js
function createElement(tag, attrs, children) {
  return {
    tag,
    attrs,
    children
  }
}
```

### 虚拟DOM的渲染

虚拟DOM的渲染主要是通过render方法来渲染，它接收一个虚拟DOM对象作为参数，然后将其渲染成真实的DOM元素。

```js

function render(vnode) {
  const el = document.createElement(vnode.tag)
  for (const key in vnode.attrs) {
    el.setAttribute(key, vnode.attrs[key])
  }
  if (vnode.children) {
    vnode.children.forEach(child => {
      if (typeof child === 'string') {
        el.appendChild(document.createTextNode(child))
      } else {
        el.appendChild(render(child))
      }
    })
  }
  return el
}
```

## diff算法

虚拟DOM的渲染主要是通过diff算法来进行的，diff算法是通过对比新旧虚拟DOM的差异来更新DOM，它可以最大限度的减少DOM操作，从而提升性能。

### diff算法的实现

diff算法的实现主要分为两个部分，一个是对比新旧虚拟DOM的差异，另一个是更新DOM。

#### 对比新旧虚拟DOM的差异

对比新旧虚拟DOM的差异主要是通过diff方法来实现的，它接收两个参数，第一个参数是新的虚拟DOM，第二个参数是旧的虚拟DOM，它会返回一个差异对象，这个差异对象包含了对比后的结果。

```js
function diff(newVnode, oldVnode) {
  if (newVnode.tag !== oldVnode.tag) {
    return {
      type: 'replace',
      node: render(newVnode)
    }
  } else if (!newVnode.tag) {
    if (newVnode.text !== oldVnode.text) {
      return {
        type: 'text',
        content: newVnode.text
      }
    }
  } else {
    const patch = {}
    const attrs = diffAttrs(newVnode.attrs, oldVnode.attrs)
    if (Object.keys(attrs).length > 0) {
      patch.attrs = attrs
    }
    const children = diffChildren(newVnode.children, oldVnode.children)
    if (children.length > 0) {
      patch.children = children
    }
    return patch
  }
}
```

#### 更新DOM

更新DOM主要是通过patch方法来实现的，它接收两个参数，第一个参数是差异对象，第二个参数是要更新的DOM元素，它会根据差异对象来更新DOM元素。

```js

function patch(patch, el) {
  if (patch.type === 'replace') {
    const parent = el.parentNode
    parent.insertBefore(patch.node, el)
    parent.removeChild(el)
  } else if (patch.type === 'text') {
    el.textContent = patch.content
  } else {
    if (patch.attrs) {
      for (const key in patch.attrs) {
        const value = patch.attrs[key]
        if (value) {
          el.setAttribute(key, value)
        } else {
          el.removeAttribute(key)
        }
      }
    }
    if (patch.children) {
      patch.children.forEach((child, index) => {
        patch(child, el.childNodes[index])
      })
    }
  }
}
```

### Vue中diff算法的实现

Vue在进行Virtual DOM渲染时，当数据发生变化，会产生一个新的 Virtual DOM 。这时，为了让页面响应这个数据的变化，就需要对新旧两个 Virtual DOM 进行比较，找出差异，然后进行最小单位的DOM操作。这个过程，就是所谓的 "Diff" 算法。

Vue使用了一种有效的Diff算法——Snabbdom，主要基于两个假设：

1. 两个相同的节点产生更好的效果。
2. 在列表中，能够被拖动且保存的元素是稀缺的。

基于这两个假设，启发式的策略是：

* 只对同级别的元素进行对比，不跨层级对比。
* 具有相同标签名和key的虚拟节点将被认为是相同的。

Diff过程包括以下步骤：

1. **新旧VNode节点的开始和结束节点进行比较。** Vue通过四个指针，分别指向新旧 VNode 的开始和结束节点，然后进行对比，有四种情况：
   * oldStartVnode / newStartVnode (旧开始节点 / 新开始节点)
   * oldEndVnode / newEndVnode (旧结束节点 / 新结束节点)
   * oldEndVnode / newStartVnode (旧结束节点 / 新开始节点)
   * oldStartVnode / newEndVnode (旧开始节点 / 新结束节点)

2. **对比节点，进行更新或新增。** 如果新旧开始节点是同一节点，根据新的VNode节点更新老的DOM，然后将新旧开始节点向后/向前移动。

3. **遍历新旧节点。** 如果新旧开始节点不能匹配，同时新开始节点和旧结束节点能匹配，则将老节点移动到旧开始节点之前，然后旧结束和新开始节点向后/向前移动。类似地，如果旧开始节点和新结束节点能匹配，将老节点移动到旧结束节点之后，然后旧开始和新结束节点向后/向前移动。

4. **尝试keyed查找。** 如果都不匹配，会尝试利用新开始节点的key在旧节点中查找相同节点。

5. **创建新节点。** 如果)，则会用新开始节点创建一个新的DOM元素。

当新开始节点或老开始节点中如果有一个遍历完成后（即新开始大于新结束或旧开始大于旧结束），Diff算法结束。如果是旧节点先遍历完成，说明有新节点需要被添加。如果新节点先遍历完成，说明旧节点数组中有落单的节点需要被废弃。

Vue的 Diff 算法通过双端比较优化了传统Diff算法，复杂度由 O(n^3) 降至 O(n)，极大提高了性能。
