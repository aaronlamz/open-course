# 如何处理错误和异常？

在 React 中，处理错误和异常的常用方式是使用 Error Boundaries（错误边界）。错误边界是一种 React 组件，它可以捕获渲染过程、生命周期方法和整个组件树的构造函数中抛出的 JavaScript 错误，并展示备用 UI，而不会导致整个应用崩溃。

## 使用 `componentDidCatch`

创建一个错误边界组件，你需要定义一个新的生命周期方法 `componentDidCatch(error, info)`，这个方法会在子组件树渲染中发生错误时被触发。

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // 你也可以将错误日志上报给服务器
    logErrorToMyService(error, info);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // 可以渲染任何自定义的降级 UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children; 
  }
}
```

## 使用 `getDerivedStateFromError`

另一个用于创建错误边界的生命周期方法是 `static getDerivedStateFromError(error)`。这个方法在渲染阶段捕获到一个错误后，用于渲染备用 UI。

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children; 
  }
}
```

## 使用方式

一旦定义了 Error Boundary 组件，你可以像普通组件一样使用它。通常，你会将可能出错的组件包裹在 Error Boundary 内。

```jsx
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

如果 `MyComponent` 或其任何子孙组件在渲染过程中发生错误，`ErrorBoundary` 组件的 `componentDidCatch` 或 `getDerivedStateFromError` 方法就会被触发。

注意，错误边界无法捕获以下场景中的错误：

- 事件处理（了解更多）
- 异步代码（例如 `setTimeout` 或 `requestAnimationFrame` 的回调函数）
- 服务器端渲染
- 它自身抛出来的错误（并非其子组件）

对于这些场景，通常需要使用其他的错误处理机制，比如 `try / catch`。