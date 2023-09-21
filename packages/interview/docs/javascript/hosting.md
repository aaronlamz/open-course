# 变量提升

变量提升（Hoisting）是 JavaScript 引擎的一种工作机制。在代码执行之前，JavaScript 引擎会首先扫描整个代码，找出所有的变量声明和函数声明，并将它们移至它们各自作用域的顶部。这个过程被称为“提升”。

以下几点可以帮助更深入地理解这个概念：

### var 声明

对于使用 `var` 关键字声明的变量，变量提升会将声明移至作用域顶部，但不会移动初始化。

举个例子：

```javascript
console.log(a);  // 输出 'undefined'
var a = 5;
console.log(a);  // 输出 '5'
```

在这个例子中，变量 `a` 的声明被提升到作用域顶部，但其初始化值（5）没有被提升。因此，第一个 `console.log(a)` 输出的是 `undefined`。

### let 和 const 声明

`let` 和 `const` 声明有一个所谓的“暂时性死区”（Temporal Dead Zone，简称 TDZ），这意味着它们实际上没有被提升，或者说提升但不可访问。

例如：

```javascript
console.log(b);  // ReferenceError: Cannot access 'b' before initialization
let b = 10;
```

### 函数声明

函数声明也会被提升，并且函数的整个定义都会被提升。

```javascript
console.log(foo());  // 输出 'Hello'
function foo() {
  return 'Hello';
}
```

这里的 `foo` 函数在调用它的代码行之前就已经被提升和定义了，因此该代码能正常工作。

### 函数表达式

与函数声明不同，函数表达式（无论是匿名的还是具名的）不会被提升。

```javascript
console.log(bar());  // TypeError: bar is not a function
var bar = function() {
  return 'Hello again';
};
```

在这里，`bar` 变量被提升并初始化为 `undefined`，尝试调用 `bar()` 会导致一个类型错误。

### 总结

变量提升是 JavaScript 的一种特性，了解这一点可以帮助你避免某些常见的错误和陷阱。不过，现代的开发实践通常推荐使用 `let` 和 `const` 来声明变量，因为它们有更直观和更少出错的作用域规则。
