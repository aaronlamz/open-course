# 什么是受控组件和非受控组件？

在 React 中，表单元素的处理方式通常可以分为两类：受控组件（Controlled Components）和非受控组件（Uncontrolled Components）。

## 受控组件

在受控组件中，表单元素的状态是由 React 组件来管理的。这意味着输入框的值（或其他表单元素的状态）由组件的 state 控制，通常通过 `onChange` 事件将输入的值反映到组件的状态中。

这是一个受控组件的简单例子：

```jsx
import React, { useState } from 'react';

function ControlledInput() {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <input type="text" value={value} onChange={handleChange} />
  );
}
```

在上面的例子中，`input` 元素的值由组件的 `value` 状态变量控制，`handleChange` 函数负责更新这个状态变量。

## 非受控组件

与受控组件相反，非受控组件不由 React 的 state 管理，而是由 DOM 元素自身管理。这意味着在非受控组件中，React 不会追踪或修改表单元素的状态。通常，非受控组件通过 `ref` 访问 DOM 元素。

这是一个非受控组件的简单例子：

```jsx
import React, { useRef } from 'react';

function UncontrolledInput() {
  const inputRef = useRef(null);

  const handleSubmit = () => {
    alert('Input Value: ' + inputRef.current.value);
  };

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
```

在这个例子中，`input` 元素的值直接由 DOM 管理，而 `handleSubmit` 函数通过 `ref` 访问这个 DOM 元素以获取其值。

## 区别与选择

- **受控组件**：更易于操作和验证表单状态，以及集成到 Redux 或其他状态管理库。
- **非受控组件**：更易于与非 React 的代码和库集成，或者用于需要直接访问 DOM 元素的情况。

通常，建议优先使用受控组件，因为这样会让状态逻辑更容易管理和追踪。但在某些特定场景下，例如文件输入或第三方库集成，非受控组件可能会更合适。

## 适用场景

受控组件和非受控组件各有其适用的场景：

### 受控组件适用场景：

1. **表单验证**：受控组件更容易与表单验证逻辑集成。
2. **条件渲染**：基于表单状态动态渲染其他 UI 组件。
3. **实时搜索或筛选**：当用户输入时，可以立即对数据进行筛选或触发其他动作。
4. **状态管理集成**：与 Redux、MobX 或其他状态管理库更容易集成。
5. **复杂的表单逻辑**：如果有跨多个输入元素的复杂业务逻辑，受控组件通常更容易管理。
6. **数据格式化**：例如，将用户输入的文本自动转换为大写或货币格式。

### 非受控组件适用场景：

1. **第三方库集成**：某些第三方 UI 库可能更适合非受控组件。
2. **文件输入**：`<input type="file" />` 是非受控组件的经典示例，因为在 React 中，你不能设置文件输入的值。
3. **快速原型开发**：如果你只是快速地搭建一个原型，可能会发现使用非受控组件更快。
4. **访问原生 DOM 属性**：如果你需要直接操作 DOM 元素，非受控组件通过 `ref` 提供了一种方式。
5. **避免不必要的重新渲染**：在某些边缘情况下，使用非受控组件可能会避免不必要的组件重新渲染。

受控组件提供了更多的灵活性和可预测性，而非受控组件则在某些特定情况下可能更简单和方便。根据应用的具体需求来选择使用哪种类型的组件。