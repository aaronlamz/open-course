# React中的PureComponent和memo有什么区别？

## React.PureComponent
`PureComponent` 是 React 中一个用于性能优化的组件类。与 `React.Component` 相比，`React.PureComponent` 自动实现了 `shouldComponentUpdate` 生命周期方法。这使得组件仅在其 `props` 或 `state` 发生浅层比较（shallow comparison）不同时，才会重新渲染。

下面是一个简单的例子：

```jsx
import React, { PureComponent } from 'react';

class MyPureComponent extends PureComponent {
  render() {
    console.log('MyPureComponent render');
    return <div>{this.props.name}</div>;
  }
}

export default MyPureComponent;
```

使用 `PureComponent` 的注意事项：

1. **浅层比较（Shallow Comparison）**: 因为 `PureComponent` 只执行浅层比较，所以它不适用于复杂的对象和数组结构。如果对象和数组内部发生变化，但引用没有变，浅层比较将不会识别出这一点。

2. **不适用于函数组件**: 函数组件应使用 `React.memo`，它是一个与 `PureComponent` 类似的功能，但适用于函数组件。

3. **副作用和外部变量**: 如果组件的渲染依赖于外部变量或有副作用（如 API 调用），则 `PureComponent` 可能不是最佳选择。

4. **资源开销**: 虽然减少了不必要的渲染，但浅层比较本身也是有成本的。在极少数情况下，这可能会导致性能问题。

使用 `PureComponent` 是一种优化手段，而不是每个组件都应该使用的。通常情况下，应当先构建应用程序，然后再考虑性能优化。当你确实面临性能问题时，使用 React DevTools 等工具来识别问题组件，然后再考虑使用 `PureComponent`。

## React.memo 
`React.memo` 是一个高阶组件，它与 `React.PureComponent` 非常类似，但适用于函数组件而不是类组件。它会进行 props 的浅层比较，并决定是否重新渲染函数组件。

假设你有一个函数组件如下：

```jsx
function MyComponent({ name }) {
  console.log('MyComponent render');
  return <div>{name}</div>;
}
```

你可以使用 `React.memo` 将其转换为一个 "记忆" 组件，这样只有在 `props` 发生变化时才会重新渲染：

```jsx
const MyMemoizedComponent = React.memo(function MyComponent({ name }) {
  console.log('MyComponent render');
  return <div>{name}</div>;
});
```

或者更简洁地：

```jsx
const MyMemoizedComponent = React.memo(({ name }) => {
  console.log('MyComponent render');
  return <div>{name}</div>;
});
```

这样，只有当 `name` 属性发生变化时，`MyMemoizedComponent` 才会重新渲染。

### 使用注意事项：

1. **浅层比较**: `React.memo` 仅检查 `props` 的浅层比较。如果你传递了复杂的对象或数组，并在内部进行了修改，它不会触发重新渲染。

2. **自定义比较**: 你可以提供一个自定义比较函数作为 `React.memo` 的第二个参数。这类似于 `shouldComponentUpdate` 的功能。

   ```jsx
   function areEqual(prevProps, nextProps) {
     // 返回 true 如果 props 相等，否则返回 false
   }
   
   const MyMemoizedComponent = React.memo(MyComponent, areEqual);
   ```
   
3. **性能考虑**: 在某些情况下，使用 `memo` 可能会引入额外的性能开销，比如进行 props 比较的成本。

4. **只用于优化**: 不应该在业务逻辑中依赖 `React.memo` 来阻止渲染，因为未来的 React 版本可能会因为某些优化原因而改变这一行为。

`React.memo` 主要用于性能优化。通常，你应当首先进行应用开发，只有在性能确实成问题时才使用 `React.memo`。

## 区别

`React.PureComponent` 和 `React.memo` 都用于优化 React 组件的重新渲染，但它们适用于不同类型的组件并有一些细微的差异。

### `React.PureComponent`

1. **适用于类组件**: `PureComponent` 是一个 React 类组件。
  
2. **自动浅层比较**: 它通过对 `props` 和 `state` 进行浅层比较自动避免不必要的重新渲染。

3. **生命周期方法**: 因为 `PureComponent` 是类组件，你可以使用生命周期方法。

4. **不可定制比较**: `PureComponent` 的浅比较是固定的，你不能更改比较逻辑。

示例：

```jsx
class MyComponent extends React.PureComponent {
  render() {
    return <div>{this.props.name}</div>;
  }
}
```

### `React.memo`

1. **适用于函数组件**: `memo` 是一个高阶组件，用于包装函数组件。

2. **自动浅层比较**: 默认情况下，它也进行 `props` 的浅层比较。

3. **可定制比较**: 你可以提供一个自定义的比较函数作为 `React.memo` 的第二个参数。

示例：

```jsx
const MyComponent = React.memo(({ name }) => {
  return <div>{name}</div>;
});
```

或带有自定义比较函数：

```jsx
const MyComponent = React.memo(
  ({ name }) => {
    return <div>{name}</div>;
  },
  (prevProps, nextProps) => {
    return prevProps.name === nextProps.name;
  }
);
```

### 相同点

1. 两者都只进行浅层比较，以决定是否重新渲染。
2. 两者都用于优化组件的性能。

### 不同点

1. `PureComponent` 用于类组件，而 `memo` 用于函数组件。
2. `PureComponent` 不允许自定义比较逻辑，而 `memo` 允许。
3. 由于 `PureComponent` 是类组件，它可以使用生命周期方法，而 `memo` 封装的是函数组件。

综上所述，选择使用哪一个主要取决于你是在使用类组件还是函数组件，以及是否需要自定义比较逻辑。