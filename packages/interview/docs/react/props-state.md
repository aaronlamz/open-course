# 什么是props和state，它们之间有什么区别？

在React中，`props`（属性）和`state`（状态）是两个非常重要的概念，它们决定了组件的渲染输出和行为。

### Props

1. **来源**: `props` 是从父组件传递到子组件的数据。
2. **只读**: 它们是只读的，意味着子组件不能修改接收到的 `props`。
3. **目的**: 主要用于组件间的数据传递。
4. **类型检查**: 可以使用 `propTypes` 对传入的 `props` 进行类型检查。
5. **默认值**: 可以设置 `defaultProps` 来定义 `props` 的默认值。

```jsx
const ChildComponent = (props) => {
  return <div>{props.text}</div>;
};

ChildComponent.propTypes = {
  text: PropTypes.string
};

ChildComponent.defaultProps = {
  text: "default text"
};
```

### State

1. **来源**: `state` 是在组件内部初始化和管理的。
2. **可变**: 组件可以通过 `setState()` 方法（class组件）或 `useState()` Hook（函数组件）来改变自己的 `state`。
3. **目的**: 主要用于处理组件自身的可变状态。
4. **初始化**: 通常在组件的构造函数（`constructor`）或 `useState` Hook 中初始化。
5. **更新**: 当 `state` 更新后，组件将重新渲染。

```jsx
// Class 组件
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <button onClick={this.increment}>
          Count: {this.state.count}
        </button>
      </div>
    );
  }
}

// 函数组件
const MyComponent = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <button onClick={increment}>
        Count: {count}
      </button>
    </div>
  );
};
```

### 区别

1. **可变性**: `props` 是不可变的，而 `state` 是可变的。
2. **所有权**: `props` 是由父组件所有和控制的，`state` 是由组件自身控制。
3. **数据流**: `props` 是单向数据流（从父组件到子组件），而 `state` 可以在组件内部改变，这样就形成了一个局部的、可变的状态管理机制。

了解这两者之间的区别和如何使用它们，是掌握 React 的关键。