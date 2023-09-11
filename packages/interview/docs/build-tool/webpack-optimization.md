# webpack优化策略

Webpack 优化是一个持续研究的话题，因为随着 Webpack 和相关插件的不断更新和演进，可用的优化策略也在不断增加。以下是一些常见的 Webpack 优化策略：

1. **使用最新版本的 Webpack 和插件**:
   - 新版本通常会包含性能改进和bug修复。

2. **模式设置为 "production"**:
   - 这会启动许多 Webpack 内部的优化，如代码压缩和摇树优化。

3. **利用缓存**:
   - 使用 `babel-loader` 时，可以设置 `cacheDirectory` 选项。
   - 使用 `cache-loader` 来缓存其他的加载器的结果。
   - Webpack 5 也引入了持久化缓存，可进一步加速构建。

4. **代码分割 (Code Splitting)**:
   - 利用 Webpack 的 `splitChunks` 插件将公共代码抽取到单独的 chunks。
   - 使用动态 `import()` 语法进行异步加载。

5. **Tree Shaking**:
   - 确保项目的 `package.json` 文件中的 `sideEffects` 属性被正确配置，以去除未使用的代码。

6. **压缩代码**:
   - 使用 `terser-webpack-plugin` 对 JS 进行压缩。
   - 使用 `css-minimizer-webpack-plugin` 对 CSS 进行压缩。

7. **优化图片和其他资源**:
   - 使用 `image-webpack-loader` 或 `imagemin-webpack-plugin` 对图片进行压缩。
   - 使用 `file-loader` 和 `url-loader` 优化文件的导入。

8. **使用 `thread-loader` 进行多进程处理**:
   - 当在项目中使用 Babel 或其他资源密集型的加载器时，可以使用 `thread-loader` 加速构建。

9. **减少解析**:
   - 减少 Webpack 需要查找和解析模块的位置，例如设置 `resolve.modules` 和 `resolve.extensions`。

10. **外部化 (Externals)**:
   - 对于在多个应用程序中使用的大型库（如 React 或 lodash），可以将它们标记为外部资源，并通过 CDN 加载。

11. **分析和检查**:
   - 使用 `webpack-bundle-analyzer` 或类似的工具来分析 bundle 以找出潜在的优化点。

12. **使用 `ignore-plugin`**:
   - 如果知道某些模块或依赖不会被使用，可以使用此插件忽略它们，减少最终的打包大小。

13. **减少插件使用**:
   - 并不是说插件不好，但是过多不必要的插件会增加构建时间。只使用真正需要的插件。

14. **优化 CSS**:
   - 使用 `MiniCssExtractPlugin` 从 JS 中提取 CSS。
   - 使用 `PurifyCSS` 或 `purgecss-webpack-plugin` 删除未使用的 CSS。

这些策略只是对 Webpack 优化的一个简要概述。具体的优化方法可能会根据项目的特定需求和环境而有所不同。

## 代码分割 (Code Splitting) 实现原理

代码分割（Code Splitting）是一种优化技术，使你可以按需加载代码而不是加载一个大的打包文件。这对于大型应用尤为重要，因为它可以减少首次加载的代码量，从而提高性能。

### 实现原理：

1. **按需加载**：Webpack 允许你将代码标记为“可拆分”或“按需加载”。当特定的代码（例如由于路由导航或某个事件）被请求时，这些标记的模块才会被加载。
2. **异步加载**：当模块被标记为可拆分时，Webpack 会创建一个新的 chunk。这个 chunk 会与主 bundle 文件分开，只有当它实际需要时才会被异步加载。
3. **公共代码拆分**：Webpack 可以识别多个 chunk 之间的公共模块，并将它们提取到一个单独的 chunk 文件中，这样可以避免重复加载。

### 代码实现：

1. **使用动态导入**：
   JavaScript 的 `import()` 语法允许你动态地加载模块。当使用像 Babel 这样的工具时，这个语法会被转化为 Webpack 可以理解的代码，从而创建一个新的 chunk。

   ```javascript
   // 假设你想要按需加载一个模块 named `moduleA`
   button.addEventListener('click', () => {
       import('./moduleA').then((moduleA) => {
           moduleA.doSomething();
       });
   });
   ```

2. **使用 Webpack 的 `splitChunks` 选项**：
   这是一种自动进行代码拆分的方法。Webpack 会检查你的代码，并自动地将公共模块移到一个单独的 chunk。

   ```javascript
   module.exports = {
       optimization: {
           splitChunks: {
               chunks: 'all'
           }
       }
   };
   ```

   在这里，`chunks: 'all'` 指示 Webpack 检查异步和非异步的 chunks，并提取它们之间的共享代码。

3. **路由级代码拆分**：
   对于使用前端框架的 SPA（如 React、Vue 或 Angular），常见的代码拆分模式是在路由级别。例如，使用 React 和 React-Router，可以这样做：

   ```javascript
   import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

   const Home = React.lazy(() => import('./routes/Home'));
   const About = React.lazy(() => import('./routes/About'));

   function App() {
       return (
           <Router>
               <React.Suspense fallback={<div>Loading...</div>}>
                   <Switch>
                       <Route exact path="/" component={Home} />
                       <Route path="/about" component={About} />
                   </Switch>
               </React.Suspense>
           </Router>
       );
   }
   ```

   在上面的代码中，`React.lazy()` 和 `React.Suspense` 一起使用，可以轻松地实现路由级的代码拆分。

通过这些方法，你可以优化应用的加载性能，确保用户仅加载他们真正需要的代码。

### 具体配置

Webpack 使用 `SplitChunksPlugin` 来检查和拆分公共模块。`optimization.splitChunks` 是你在 `webpack.config.js` 文件中配置的对象，它提供了一系列选项，让你可以决定如何进行代码拆分。

下面的代码展示了如何配置 `splitChunks` 选项来自动分割公共模块：

```javascript
module.exports = {
    // ... 其他配置项
    optimization: {
        splitChunks: {
            chunks: 'all', // 可以是 'all'，'async' 或 'initial'
            minSize: 30000, // 形成一个新代码块最小的体积
            maxSize: 0, // split code block 的最大体积，0 表示无上限
            minChunks: 1, // 一个模块至少使用多少次才会被分割
            maxAsyncRequests: 5, // 按需加载时并行请求的最大数量
            maxInitialRequests: 3, // 一个入口的最大并行请求数
            automaticNameDelimiter: '~', // 生成的名称的分隔符
            name: true,
            cacheGroups: {
                // 分割 node_modules 中的库
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                // 分割重复使用的代码块
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true // 如果一个模块已经被打包过，就重用这个模块
                }
            }
        }
    }
};
```

**原理简述**:

1. Webpack 首先分析项目中各个模块的依赖关系。
2. 根据 `splitChunks` 的配置，Webpack 会确定哪些模块是公共模块。例如，如果一个模块被多个入口引用，并且引用次数超过 `minChunks` 设置的值，那么这个模块会被认为是一个公共模块。
3. `cacheGroups` 定义了代码分割的规则。例如，你可以告诉 Webpack 分割 `node_modules` 里的代码（通常是你的项目依赖），这样你的应用代码和第三方库代码会被分开打包。
4. 公共模块被分离到新的代码块（chunks）中，并根据配置生成对应的文件。

在编译时，Webpack 会按照上面的规则拆分代码，这样可以有效地减少客户端加载的代码量，特别是在缓存利用得当的情况下。