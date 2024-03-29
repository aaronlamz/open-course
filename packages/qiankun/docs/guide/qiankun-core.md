# qiankun 工作原理

`qiankun` 是一个基于 `single-spa` 的微前端解决方案。其核心目标是允许多个前端应用共存，可以独立开发、独立部署，并在一个主应用中同时加载和切换。以下是 `qiankun` 的主要实现原理：

1. **基于 single-spa**:
   - `qiankun` 基于 `single-spa` 实现，利用 `single-spa` 的应用生命周期管理功能来加载、挂载和卸载子应用。

2. **沙箱机制**:
   - 为了确保子应用之间的隔离，`qiankun` 实现了两种沙箱：`ProxySandbox` 和 `SnapshotSandbox`。
   - `ProxySandbox` 使用 JavaScript 的 `Proxy` 对象来拦截对全局对象的修改，确保子应用的修改不会影响到其他应用或主应用。
   - `SnapshotSandbox` 在子应用加载前后对全局对象进行快照，确保子应用卸载后可以恢复到原始状态。

3. **应用注册与生命周期**:
   - 通过 `registerMicroApps` 方法，开发者可以注册多个子应用，并为它们指定生命周期钩子（如加载、挂载、卸载等）。
   - `qiankun` 会管理这些子应用的生命周期，确保它们在适当的时机被加载、挂载或卸载。

4. **全局状态管理**:
   - `qiankun` 提供了 `initGlobalState` 方法，允许开发者在主应用中初始化一个全局状态。子应用可以订阅这个状态的变化，实现状态共享。

5. **预加载机制**:
   - 为了提高子应用的加载速度，`qiankun` 提供了预加载功能。当主应用启动后，可以在后台预加载子应用的资源。

6. **样式隔离**:
   - 为了防止子应用的样式影响其他应用，`qiankun` 使用了一种动态样式表的方法。当子应用挂载时，它的样式会被动态插入到 DOM 中；当子应用卸载时，这些样式会被移除。

7. **JS 沙箱隔离**:
   - 通过上述的 `ProxySandbox` 和 `SnapshotSandbox`，`qiankun` 确保子应用的 JavaScript 代码不会影响到其他应用。这为子应用提供了一个相对安全的执行环境。
