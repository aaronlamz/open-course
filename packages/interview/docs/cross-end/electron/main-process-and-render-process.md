# Electron 的主进程和渲染进程是什么？

Electron 由 Chromium 和 Node.js 组成，这两个部分都是多进程的结构，因此 Electron 继承了这种多进程的特点。在 Electron 中，通常会听到 "主进程" 和 "渲染进程" 的名词，这两种进程对应了 Electron 的应用架构。

1. **主进程 (Main Process)**

   - **定义与职责**: 主进程是 Electron 应用的入口点。它运行 `package.json` 的 `main` 脚本，只能有一个主进程。主进程的职责包括：
     - 创建和管理应用窗口 (通过 `BrowserWindow` 类)
     - 处理应用事件，例如应用的生命周期、系统事件等
     - 控制整个应用的执行流程，如应用的启动、重启和更新

   - **特性**：主进程可以使用 Electron 提供的所有原生模块，如 `app`、`Menu`、`ipcMain` 等，它们通常只在主进程中可用。

   - **与 Node.js**：在主进程中，你可以使用 Node.js 的所有功能，包括文件系统、OS 相关的操作等。

2. **渲染进程 (Renderer Process)**

   - **定义与职责**：每一个 `BrowserWindow` 实例运行在它自己的渲染进程里。这个进程负责渲染你加载到该窗口中的 web 页面。所以，如果你的应用有多个窗口，那么同样会有多个与之相对应的渲染进程。

   - **特性**：渲染进程中的页面结构和常规的 web 页面类似，都有其 HTML、CSS 和 JavaScript。但与普通浏览器不同的是，在 Electron 的渲染进程中，你还可以使用 Node.js 的 API，以及 Electron 提供的渲染进程中可用的 API。

   - **与 Chromium**：渲染进程是由 Chromium 提供的，因此它支持大部分最新的 web 特性和标准。

3. **进程间通信 (IPC)**

   由于主进程与渲染进程是两个完全独立的进程，它们不能直接共享数据或状态。但 Electron 提供了 IPC (进程间通信) 模块，使得这两个进程可以相互发送和接收信息。使用 `ipcMain` 和 `ipcRenderer`，主进程和渲染进程可以相互发送和响应消息。

简而言之，主进程负责控制应用的整体行为和管理原生资源，而每个窗口的内容则由一个或多个渲染进程来控制和呈现。
