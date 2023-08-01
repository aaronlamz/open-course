# single-spa 工作原理

Single-spa 是一个用于前端微服务的 JavaScript 框架。它允许您将前端应用程序拆分为可独立开发、部署和升级的“微应用”。每个微应用只处理浏览器中的特定路由。当用户导航到某个路由时，Single-spa 将加载相应的微应用。

下面是 single-spa 的主要工作原理：

1. **应用注册**: 首先，single-spa 需要你注册每一个微应用。在注册时，你需要为每个微应用提供一个加载函数（返回一个 Promise 解析的应用实例）和一个活动函数（根据路由情况返回 true 或 false）。

```javascript
singleSpa.registerApplication(
  'appName', 
  () => System.import('appName'), // 加载函数
  location => location.pathname.startsWith('/app') // 活动函数
);
```

2. **路由监听**: 当 URL 变化时（通常是用户导航或点击链接时），single-spa 会调用所有已注册微应用的活动函数，来决定哪个微应用应该被激活。

3. **微应用加载**: 对于活动函数返回 true 的微应用，single-spa 会调用其加载函数，加载并初始化微应用。这通常涉及到 JavaScript 模块的动态导入。

4. **生命周期管理**: 每个微应用都需要导出一组生命周期钩子 - bootstrap, mount, unmount, 和（可选的）update。当微应用被加载后，single-spa 会依次调用 bootstrap 和 mount 钩子，当微应用需要被卸载时，调用 unmount 钩子。

5. **应用切换**: 当用户导航到不同的路由时，single-spa 会卸载当前的微应用，并加载和激活新的微应用。

在这个过程中，single-spa 为每个微应用创建了一个沙箱环境，使其可以在全局作用域中独立工作，不会互相干扰。同时，它也提供了微应用间通信的机制。

## Single-SPA 的核心功能的简化代码实现

这个示例只展示了应用注册、启动和切换等关键逻辑，没有包括错误处理、事件监听和优化等细节。

```js
const apps = {}; // 用于保存所有的应用

function registerApplication(appName, loadApp, activeWhen) {
  apps[appName] = {
    name: appName,
    loadApp: loadApp,
    activeWhen: activeWhen,
    status: 'NOT_LOADED',
    app: null
  };
}

function start() {
  reroute(); // 启动时进行一次路由检查
  window.addEventListener('hashchange', reroute); // 监听路由变化
}

function reroute() {
  const currentPath = window.location.hash;
  Object.values(apps).forEach(app => {
    if (app.status === 'NOT_LOADED' && app.activeWhen(currentPath)) {
      loadAndMountApp(app);
    } else if (app.status === 'MOUNTED' && !app.activeWhen(currentPath)) {
      unmountApp(app);
    }
  });
}

async function loadAndMountApp(app) {
  app.status = 'LOADING';
  app.app = await app.loadApp(); // 加载应用
  app.status = 'NOT_MOUNTED';
  await app.app.bootstrap(); // 初始化应用
  app.status = 'BOOTSTRAPPING';
  await app.app.mount(); // 渲染应用
  app.status = 'MOUNTED';
}

async function unmountApp(app) {
  app.status = 'UNMOUNTING';
  await app.app.unmount(); // 卸载应用
  app.status = 'NOT_MOUNTED';
}

// 对外暴露的 API
window.singleSpa = {
  registerApplication,
  start
};

```

## System.import

`System.import` 是一个由 SystemJS 提供的模块加载函数。它用于动态加载模块。这是单页应用在加载和卸载不同模块时非常重要的一个功能。它的实现基于 ES Module (ECMAScript 模块)，并且返回一个 Promise 对象，这使得它可以很好地融入现代 JavaScript 的异步操作模式。

使用 SystemJS 的一个主要优点是，它能够加载各种格式的模块，包括 AMD、CommonJS、UMD 和 ES6 模块。

在 single-spa 中，SystemJS 被用于异步加载和卸载微应用。以下是一个基本的 SystemJS 加载模块的示例：

```javascript
System.import('my-module').then((module) => {
  // 使用 module 做一些事情
});
```

在这个示例中，SystemJS 会去加载 'my-module' 这个模块，加载完成后返回一个 Promise。一旦 Promise 解析完成，我们就可以访问并使用模块了。

需要注意的是，`System.import` 在现在已经被 `import()` 替代。新的动态导入 `import()` 是 ECMAScript（JavaScript）的一部分，并且在现代浏览器中被原生支持。这也是为什么 single-spa 可以在没有 SystemJS 的情况下工作。但由于 `import()` 在老版本浏览器中不被支持，因此 single-spa 默认使用 SystemJS 以确保对老版本浏览器的兼容性。