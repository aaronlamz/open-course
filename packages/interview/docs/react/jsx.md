# JSX以及工作原理

JSX 是 JavaScript XML 的缩写。它是一种在 JavaScript 中写 XML/HTML 的语法糖，广泛应用于 React，但也可用于其他框架和库。通过 JSX，你可以创建虚拟 DOM 元素，描述 UI 应该呈现的内容和样式。

## 示例

下面是一个简单的 JSX 代码示例：

```jsx
const element = <h1 className="greeting">Hello, world!</h1>;
```

看上去很像 HTML，但它其实是 JavaScript。注意属性名 `className`，在 JSX 中用于替代传统 HTML 的 `class`，因为 `class` 是 JavaScript 中的保留字。

## 如何工作的

### 1. 解析 (Parsing)

- 当 Babel 开始转译源代码时，它首先需要理解代码的结构。它会使用 `@babel/parser` 来解析输入的代码，将字符串源代码转换为一个 AST（抽象语法树）。

- 在这个阶段，例如代码 `<div>Hi</div>` 会被解析成类似以下的 AST 结构（简化版本）：

    ```json
    {
      "type": "JSXElement",
      "openingElement": {
        "type": "JSXOpeningElement",
        "name": {
          "type": "JSXIdentifier",
          "name": "div"
        },
        "attributes": []
      },
      "children": [
        {
          "type": "JSXText",
          "value": "Hi"
        }
      ],
      "closingElement": {
        "type": "JSXClosingElement",
        "name": {
          "type": "JSXIdentifier",
          "name": "div"
        }
      }
    }
    ```

### 2. 转换 (Transformation)

- 这个阶段是 Babel 的核心，它使用插件（例如 `@babel/plugin-transform-react-jsx`）来对 AST 进行修改。

- 对于 JSX，转译器会找到所有的 `JSXElement` 节点，并将它们转化为 `React.createElement` 的函数调用。

- 举个例子，之前的 AST 结构会被转换成一个新的 AST，代表以下的 JavaScript 代码：

    ```javascript
    React.createElement("div", null, "Hi");
    ```

### 3. 生成 (Code Generation)

- 一旦 AST 被转换，下一步是将这个新的 AST 转化回字符串形式的 JavaScript 代码。这是由 Babel 的代码生成器完成的。

- 在我们的例子中，新的 AST 会被转换为：

    ```javascript
    React.createElement("div", null, "Hi");
    ```

### 插件和预设 (Plugins & Presets)

- Babel 的功能严重依赖于插件。每一个转换都由一个插件处理。为了处理 JSX，你通常会使用 `@babel/plugin-transform-react-jsx`。

- 但考虑到需要处理的 ES6+ 功能的数量和其他转换，为每个功能手动配置插件是不现实的。因此，预设应运而生。预设只是一组预定义的插件集合。例如，`@babel/preset-react` 预设会包括处理 JSX 和其他 React 相关的转换的所有必要插件。

### 结论

Babel 在背后做了大量的工作，允许我们使用最新的 JavaScript 和 JSX 语法，同时确保代码能在老旧的浏览器和环境中运行。上述过程提供了对 Babel 如何转译 JSX 的深入了解，但 Babel 还做了许多其他的转换和优化，它们都是通过插件和预设来配置和管理的。


## 为什么使用 JSX？

1. **可读性**：由于其声明性质和与 HTML 相似的语法，JSX 使得组件结构更加明确和可读。

2. **性能优化**：预编译 JSX 成 `React.createElement` 调用意味着你在运行时不再需要额外的解析步骤。

3. **类型安全**：如果你使用 TypeScript，你可以得到 JSX 的类型检查，从而捕获常见的错误。

4. **编写现代 UI**：它允许你更直观地表示 UI 组件的结构和数据，而无需使用冗长的纯 JavaScript 代码。

总结：JSX 是一种让我们能够用更自然、更直观的方式书写 React 组件的语法。通过工具链（如 Babel），它会被转译为 React 可以解析和处理的 JavaScript 代码。
