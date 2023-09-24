# 什么是React的context，如何使用它？

## 什么是 React 的 Context？

Context 在 React 应用中提供了一种方式来共享数据（例如，主题、用户身份验证等）跨越多个组件级别，而无需显式地通过每一层传递 props。Context 通常用于存储并向下传递全局数据。

## 如何使用 Context？

1. **创建 Context**

   首先，你需要使用 `React.createContext` 方法创建一个新的 Context 对象。

   ```jsx
   const MyContext = React.createContext(defaultValue);
   ```

   `defaultValue` 是在组件树中找不到 `Provider` 时使用的值。

2. **Provider 组件**

   Context 对象包括一个 `Provider` 组件，你可以将其添加到组件树中。

   ```jsx
   <MyContext.Provider value={/* 某个值 */}>
   ```

   所有包裹在此 `Provider` 内部的组件都能访问这个 `value`。

3. **消费 Context 数据**

   在函数组件中，你可以使用 `useContext` Hook。

   ```jsx
   const value = useContext(MyContext);
   ```

   在类组件中，你可以使用 `static contextType` 或 `Context.Consumer`。

   ```jsx
   // 使用 static contextType
   class MyClass extends React.Component {
     static contextType = MyContext;

     render() {
       const value = this.context;
       /* 使用 value 做点什么 */
     }
   }
   ```

   或

   ```jsx
   // 使用 Context.Consumer
   class MyClass extends React.Component {
     render() {
       return (
         <MyContext.Consumer>
           {value => /* 使用 value 做点什么 */}
         </MyContext.Consumer>
       );
     }
   }
   ```

## 示例：

以下是一个简单的使用 context 的示例，其中有一个 `ThemeContext` 和一个按钮，该按钮会在两种主题之间切换。

```jsx
import React, { useContext, useState } from 'react';

// 创建一个 Context
const ThemeContext = React.createContext();

const App = () => {
  const [theme, setTheme] = useState('light');

  return (
    // 使用 Provider 提供数据
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Toolbar />
    </ThemeContext.Provider>
  );
};

const Toolbar = () => {
  // 使用 useContext Hook 获取 context 数据
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={() => {
        setTheme(theme === 'light' ? 'dark' : 'light');
      }}
    >
      Toggle Theme
    </button>
  );
};
```

通过这种方式，我们可以在组件树中任何深度的组件访问 `theme` 和 `setTheme`，而无需显式通过 props 传递它们。