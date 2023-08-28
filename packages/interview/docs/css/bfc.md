# 解释一下CSS中的BFC是什么以及它的作用

## 什么是`BFC`

了解`BFC`先了解两个概念：

`Box`： CSS 布局的对象和基本单位，⼀个⻚⾯是由很多个 Box 组成的，这个Box就是我们所说的**盒模型**。

`Formatting context`：上下文格式化，是一种渲染规则，它决定了页面中的元素如何定位，以及它们与其他元素之间的相互关系和作用。

> 那么`BFC`是什么？

`BFC` 是 Block Formatting Contexts (块级格式化上下文) 的缩写。它是一个 W3C CSS2.1 规范中的概念。BFC 指的是浏览器中创建的一个独立的渲染区域，这个区域拥有自己的渲染规则，决定了其子元素如何定位，以及与其他元素的相互关系和作用。

**简单来说，`BFC` 是一个完全独立的空间（布局环境），让空间里的子元素不会影响到外面的布局**。

## `BFC`有什么作用呢?

`BFC`具体有以下作用：

- **防止元素垂直外边距的塌陷**。这是 BFC 最主要的作用，它能够阻止内部元素的外边距与外部元素的边距合并，从而防止垂直外边距的塌陷。
- **确定元素的位置**。BFC 可以使元素脱离文档流，改变其正常的文档流排列，确定元素的位置。
- **解决高度塌陷**。BFC 可以包含浮动元素，使其不会影响到外部其他元素的布局。
- **清除浮动**。当一个元素拥有 BFC 属性时，它能够清除自身内部的浮动元素对外部元素的影响。
- **实现多列布局**。BFC 可以将子元素排列成多列布局，类似于 CSS 的 column-count 和 column-width 属性。

## 怎么创建`BFC`

创建`BFC`有以下几种方式

- 浮动框（float）除none以外;
- 绝对定位框（position: absolute、fixed）
- 非块框的块容器（例如 inline-blocks、table-cells 和 table-captions）
- "overflow" 属性非 "visible" 的块框（除非这个值已扩散到整个视口）

```css
// 自定义多列布局

.left{
  float: left; // 创建BFC
  width: 100px;
  height: 300px;
  background-color: red;
}

.right{
  height: 300px;
  overflow: hidden; // 创建BFC
  background-color: pink;
}

<div class="left"></div>
<div class="right"></div>
```

分别设置 `left`, `right` 为`BFC`元素，就是实现了左侧固定宽度，右侧自适应宽度的布局。
