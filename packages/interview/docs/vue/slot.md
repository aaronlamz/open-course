# Vue中的slot

## `slot`是什么，有什么作用

在`Vue`中， `slot` 又名**插槽**,是一种特殊的语法，用于组件模块中定义可替换的内容片段;`Vue`的插槽机制受原生Web Component `<slot>` 元素的启发而诞生，插槽内容可以访问伏组件的数据作用域。`slot` 又分为三类，默认插槽，具名插槽和作用域插槽。

- 默认插槽： 又名匿名插槽， 当 `slot` 没有指定 name 属性值的时候就是一个默认插槽，一个组件内只有一个默认插槽。
- 具名插槽：带有具体名字的插槽，也就是带有name属性的`slot`，一个组件可以有多个。
- 作用域插槽：带有子组件内部的数据的插槽，让父组件根据子组件传递的数据决定如何渲染该插槽。

## `slot`的使用

### - 默认插槽的使用

**子组件Child.vue**

```html
// Child.vue
<template>
  <div class="child-box">
    <p>我是子组件</p>
    <!-- 插槽 -->
    <slot>
      <!-- 默认插槽默认内容 -->
      <p>我是默认内容</p>
    </slot>
  </div>
</template>
```

**父组件Parent.vue**

```html
// Parent.vue
<template>
  <child>
    <p>替换默认插槽中的默认内容</p>
  </child>
</template>

```

`slot` 标签内的内容就是默认内容，也就是当父组件没有传递给子组件内容时，子组件就会默认渲染 `slot` 内部的内容，但是 `slot` 标签是不会渲染出来的;

### - 具名插槽的使用

**子组件Child.vue**

```html
// Child.vue
<template>
  <div>
    <slot name="header"></slot>
    <slot name="body"></slot>
    <slot name="footer"></slot>
  </div>
</template>
```

**父组件Parent.vue**

```html
<template>
  <Child>
    <template v-slot:header>
      <h1>这是标题</h1>
    </template>
    <template v-slot:body>
      <p>这是正文。</p>
    </template>
    <template v-slot:footer>
      <p>这是页脚。</p>
    </template>
  </Child>
</template>

<script>
import Child from './Child.vue';

export default {
  components: {
    Child
  }
}
</script>

```

在这个例子中，子组件（Child.vue）定义了三个具名插槽，分别是"header"、"body"和"footer"。然后在父组件（Parent.vue）中，我们使用`<template>`标签和v-slot指令来指定要插入到对应插槽的内容。这样，父组件的内容就会被插入到子组件的相应插槽位置。

### - 作用域插槽的使用

**子组件Child.vue**

```html
// Child.vue
<template>
  <div class="child-box">
    <p>我是子组件</p>
    <!-- 插槽 -->
    <slot text="我是子组件" :count="1"></slot>
  </div>
</template>
```

**父组件Parent.vue**

```html
// Parent.vue
<template>
  <child v-slot="slotProps">
    <!-- 输出 ‘我是子组件---1’ -->
    <div>{{ slotProps.text }}---{{ slotProps.count }}</div>
  </child>
</template>
```

在子组件中 `slot` 标签上添加了一些自定义属性，属性值就是我们想要传递给父组件的一些内容。在父组件 App.vue 中通过 `v-slot="slotProps"`等形式接收子组件传递过来的数据，`slotProps` 的名字是可以任意取的，它是一个对象，包含了所有子组件传递过来的数据。

## `slot`的原理

`slot` 标签在`Vue`渲染的过程中也会创建一个`VNode`，之后在通过渲染这个`VNode`得到dom节点。

### 源码分析如下

在`Vue3`中，`slot`生成`VNode`的地方是在 `packages/runtime-core/src/componentSlots.ts`中的`initSlots`实现；

在组件编译成`VNode`的过程中调用(`processComponent` -> `comuntComponent` -> `setupComponent` -> `initSlots`)

`initSlots`: 根据`slots`创建`VNode`:

- 判断是否默认插槽，是否自定义插槽，是否非标准插槽定义
- 根据不同的类型统一生成`VNode`

```ts
// packages/runtime-core/src/componentSlots.ts

export const initSlots = (
  instance: ComponentInternalInstance,
  children: VNodeNormalizedChildren
) => {
  if (instance.vnode.shapeFlag & ShapeFlags.SLOTS_CHILDREN) {

    // @note  ._ 判断是否为默认插槽
    const type = (children as RawSlots)._
    if (type) {
      // @note  挂载浅层只读slots属性
      instance.slots = toRaw(children as InternalSlots)
      def(children as InternalSlots, '_', type)
    } else {
      // @note  自定义插槽
      normalizeObjectSlots(
        children as RawSlots,
        (instance.slots = {}),
        instance
      )
    }
  } else {
    // @note 非标准化创建vnodeSlots
    instance.slots = {}
    if (children) {
      normalizeVNodeSlots(instance, children)
    }
  }
  def(instance.slots, InternalObjectKey, 1)
}
```

在 `normalizeObjectSlots`, `normalizeVNodeSlots`函数中都会调用`normalizeSlotValue`方法生成`VNode` 。

```ts
// packages/runtime-core/src/componentSlots.ts

const normalizeSlotValue = (value: unknown): VNode[] =>
  isArray(value)
    ? value.map(normalizeVNode)
    : [normalizeVNode(value as VNodeChild)]
```
