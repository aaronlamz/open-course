# 解释一下CSS中的BFC是什么以及它的作用

## 什么是`BFC`

了解`BFC`先了解两个概念：

`Box`： CSS 布局的对象和基本单位，⼀个⻚⾯是由很多个 Box 组成的，这个Box就是我们所说的**盒模型**。

`Formatting context`：上下文格式化，是一种渲染规则，它决定了页面中的元素如何定位，以及它们与其他元素之间的相互关系和作用。

> 那么`BFC`是什么？
BFC（块格式化上下文，Block Formatting Context）是Web页面的可视化CSS渲染的部分，它是布局盒模型中的一个区域，也是浮动元素与其他元素的交互限定区域。

## BFC的特性

1. **内部的盒会在垂直方向上一个接一个地放置**：在BFC中，盒子从顶部开始垂直放置，两个盒子之间的垂直间隔是由他们的margin值决定的。在BFC中，两个相邻的块级盒子的垂直外边距会发生合并。

2. **盒垂直方向的距离由margin决定**：属于同一个BFC的两个相邻盒子的margin会发生重叠。

3. **每个元素的左外边距与包含块的左边界相接触**：即使浮动元素也是如此，这意味着BFC中的元素不会和左浮动盒重叠。

4. **BFC的区域不会与float的元素区域重叠**：浮动元素会被BFC所包含，不会影响到BFC外的元素。

5. **计算BFC的高度时，浮动元素也参与计算**：通常，浮动元素会脱离文档流，不影响外部元素。但在BFC内部，浮动元素也会参与高度计算。

6. **BFC就是页面上的一个隔离的独立容器**，子元素不会影响到外部的元素，反之亦然。

## 如何生成BFC？

要生成BFC，元素需要满足以下条件之一：

1. `float` 属性的值不为 `none`。
2. `position` 属性的值不为 `static` 或 `relative`。
3. `display` 属性的值为 `inline-block`、`flex`、`inline-flex`、`grid` 或 `inline-grid`。
4. `overflow` 属性的值不为 `visible`。

## BFC的应用

1. **清除浮动**：子元素浮动，父元素不设置高度时会导致高度塌陷。可以给父元素设置生成BFC（例如：`overflow: hidden`），从而让父元素根据子元素的高度展开。
2. **避免外边距重叠**：当两个块级元素垂直相邻时，如果下面的元素的上margin和上面的元素的下margin发生重叠，可以使用生成BFC来阻止margin的重叠。
3. **制作两栏布局**：左边固定宽度浮动，右边生成BFC，从而实现两栏布局，且右边的内容不会跑到左边的浮动元素下方。

## 示例

BFC (Block Formatting Context) 的创建和应用对于 CSS 布局非常有用。以下是 BFC 的一些常见应用及相应的示例代码：

1. **清除内部浮动**

   当你有一个只包含浮动元素的容器时，这个容器会失去其高度，导致布局崩溃。通过将容器转换为 BFC，您可以使容器包围其浮动子元素。

   ```css
   .container {
       overflow: hidden;
   }

   .float-child {
       float: left;
       width: 50%;
   }
   ```

   ```html
   <div class="container">
       <div class="float-child">I'm a floating child.</div>
       <div class="float-child">Me too!</div>
   </div>
   ```

2. **阻止外边距合并**

   当两个垂直相邻的块元素具有外边距时，这些外边距会合并。创建一个 BFC 可以阻止外边距合并。

   ```css
   .block-with-margin {
       margin: 20px 0;
       overflow: hidden;
   }
   ```

   ```html
   <div class="block-with-margin">First block</div>
   <div class="block-with-margin">Second block</div>
   ```

3. **与浮动元素互不重叠**

   当你有一个浮动元素与一个非浮动元素重叠时，你可以为非浮动元素创建一个 BFC 以使其与浮动元素互不重叠。

   ```css
   .floating {
       float: left;
       width: 50%;
   }

   .non-floating {
       overflow: hidden;
   }
   ```

   ```html
   <div class="floating">I'm floating on the left.</div>
   <div class="non-floating">I won't overlap with the floating element.</div>
   ```

这只是 BFC 的一些应用，但它们是最常见和有用的情况。理解 BFC 可以帮助你解决很多 CSS 布局中的问题。

## `IFC`、`GFC`、`FFC`、`FFC`、`BFC`的区别

- `IFC`：内联格式化上下文，`inline-formatting context`，用于布局内联元素的格式化上下文，`inline`元素会在水平方向，一个接一个地排列。

- `BFC`：块级格式化上下文，`block-formatting context`，用于布局块级元素的格式化上下文，`block`元素会在垂直方向，一个接一个地排列。

- `GFC`：网格格式化上下文，`grid-formatting context`，用于布局网格元素的格式化上下文，`grid`元素会在二维方向，一个接一个地排列。

- `FFC`：自适应格式化上下文，`flex-formatting context`，用于布局弹性盒子元素的格式化上下文，`flex`元素会在水平或垂直方向，一个接一个地排列。
