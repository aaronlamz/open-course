
# preload和prefetch

`preload` 和 `prefetch` 都是现代浏览器提供的资源提示功能，它们可以帮助开发者控制资源的加载时机，优化页面的加载速度和性能。但它们之间有一些关键的区别，并且各自适用于不同的使用场景。下面我们来探讨它们的区别和各自的使用场景：

### 1. preload

#### 定义：
`preload` 是一个 web 标准，允许开发者指定页面加载生命周期中的哪个阶段要提前请求某个资源。它是一种声明资源优先级的方式，使得浏览器可以更早地请求并获取资源。

当你在文档中使用 `<link rel="preload">`，这告诉浏览器：

1. 该资源是当前页面中的一个重要资源。
2. 尽快请求这个资源，即使它在页面加载过程中并不会立刻用到。

例如：
```html
<link rel="preload" as="script" href="important-script.js">
```

关于 `preload` 的执行时机，以下是要考虑的几点：

1. **开始时间**：`preload` 的资源会在浏览器完成解析 `<head>` 之后尽快开始加载。但是，实际的开始时间取决于浏览器的预加载扫描器和网络的空闲时间。

2. **不阻塞**：预加载的资源不会阻塞 `onload` 事件，意味着它们不会阻止页面的主内容加载。

3. **持续时间**：资源的预加载会在当前页面的生命周期中一直保持。换句话说，如果你预加载了一个资源，但在当前页面的生命周期中从未使用它，它就会被浏览器丢弃，不会持久化到下一个页面。

4. **优先级**：尽管 `preload` 资源会尽早加载，但它们的优先级可能低于关键的内部资源（例如内部的 CSS 或者同步的 JS）。具体的优先级取决于资源的类型和浏览器。

5. **使用**：仅仅预加载资源并不意味着它会被执行或应用。例如，预加载的 JavaScript 文件需要另外的 `<script>` 标签来执行。如果资源被预加载但从未使用，它只是被提前获取了，并被存储在浏览器的缓存中。

#### 使用场景：
- **关键资源**：当你知道某些资源（如关键的CSS或JavaScript文件）在页面加载后会立即需要时，可以使用 `preload`。
- **不在DOM的资源**：对于默认不被解析的、但即将被用到的资源，例如通过 JavaScript 动态添加到页面的字体文件。
- **按需加载的模块**：如果你正在使用模块化的JavaScript，并且知道在主模块加载后会立即请求另一个模块，那么可以提前加载该模块。

#### 语法：
```html
<link rel="preload" as="script" href="myscript.js">
```

### 2. prefetch

#### 定义：
- `prefetch` 是一种告诉浏览器，某资源在未来可能会被用到，所以当浏览器空闲时，可以提前加载它的方式。

#### 使用场景：
- **未来的导航**：当你预计用户可能会点击某个链接并导航到另一个页面时，可以预先获取那个页面的资源。例如，如果用户在主页上，并且经常点击“关于”链接，那么你可以预先获取“关于”页面的资源。
- **预测用户行为**：根据用户的行为或其他数据分析预测，提前加载可能会在未来被用户请求的资源。

#### 语法：
```html
<link rel="prefetch" href="nextpage.html">
```

### 主要区别：

1. **优先级**：`preload` 的优先级高于 `prefetch`。因为 `preload` 的资源被视为当前页面的关键资源，而 `prefetch` 的资源被视为低优先级资源，仅在浏览器空闲时加载。
  
2. **使用意图**：`preload` 用于加载当前页面上即将需要的资源；而 `prefetch` 用于加载用户在不久的将来可能需要的资源。

3. **浏览器支持**：尽管现代浏览器大都支持这两个功能，但它们的支持度可能会有所不同。建议在使用前检查特定浏览器的支持度。

总结，`preload` 和 `prefetch` 都是优化资源加载的强大工具，但关键在于理解和识别最适合你的使用场景的那一个，并据此做出决策。