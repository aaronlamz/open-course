# 解释一下Vue响应式原理

> 面试高频问题，建议理清思路，

## Vue2的响应式原理主要包括以下几个步骤：

1. **数据劫持（Data Hijack）**：Vue.js 使用 ES5 提供的 `Object.defineProperty()` 方法，监控程序中所有对象的属性的读写操作。这种技术也被称为 "数据劫持"。

    ```javascript
    Object.defineProperty(data, 'key', {
        configurable: true,
        enumerable: true,
        get: function () {
            // 返回值，同时可以做其他操作，如收集依赖
        },
        set: function (newValue) {
            // 设置新值，同时可以做其他操作，如触发视图更新
        }
    });
    ```

2. **依赖收集（Dependency Collection）**：当访问对象属性时，"getter" 会被调用，Vue将利用这个机会进行依赖收集。也就是将使用到该属性的地方保存下来，以便当属性发生变化时，能进行通知。

3. **发布订阅（Publish-Subscribe）**：当属性值改变时，"setter" 会被调用。Vue将利用这个机会把此前收集到的依赖通知到数据变化的信息，依赖处就会对变化做出响应，比如更新视图。

4. **Watcher 和 Dep**：为了更好地实现依赖收集和发布订阅，Vue 引入了 Watcher 和 Dep 两个重要概念。 Dep 维护一批 Watcher，Watcher 通过 Dep 了解自己所依赖的数据是否更新。Watcher 则负责收集依赖和执行当依赖更新时的行动。

5. **计算属性和监听属性**：Vue.js提供了计算属性和监听属性，它们也是基于依赖收集和发布订阅模式实现的，不过更加高级，Vue内部会为它们另外实现一种类型的  Watcher。

这就是Vue的响应式原理的具体描述，理解了这个原理，你就能理解到Vue是如何实现数据和视图之间的响应式绑定的。

## 代码实现
具体实现Vue的响应式原理，主要包括以下步骤：

1. **Observer类**：负责对数据对象进行遍历，包括对象的属性值还是对象，通过 `Object.defineProperty()` 来设置getter/setter，当数据变动能触发`dep.notify()`，通知所有订阅者。

    ```javascript
    class Observer {
        constructor(value) {
            this.walk(value);
        }
        walk(data) {
            let keys = Object.keys(data);
            for (let i = 0; i < keys.length; i++) {
                defineReactive(data, keys[i], data[keys[i]]);
            }
        }
    }
    ```

2. **defineReactive函数**：负责定义一个响应式对象，给对象增加getter/setter。

    ```javascript
    function defineReactive(data, key, val) {
        let dep = new Dep();
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: function() {
                dep.addSub(Dep.target);
                return val;
            },
            set: function(newVal) {
                if (val === newVal) {
                    return;
                }
                val = newVal;
                // 引用赋值，将Dep.target（即当前正在执行的Watcher对象存入dep的subs中）
                dep.notify(); // 如果有变化则会通知所有相关联的watcher对象进行update操作
            }
         });
     }
    ```

3. **Dep类**：负责收集订阅者和在`setter`中通知订阅者，它维护一个数组，用来收集所有的订阅者，数据变动触发`notify()`，再调用订阅者的`update()`方法。

    ```javascript
    class Dep {
        constructor() {
            this.subs = [];
        }
        addSub(sub) { // 添加订阅者
            this.subs.push(sub);
        }
        notify() { // 发出通知
            this.subs.forEach((sub) => {
                sub.update();
            })
        }
    }
    ```

4. **Watcher类**：负责当数据变化时执行对应的方法。

    ```javascript
    class Watcher {
        constructor() {
            Dep.target = this;
        }
        update() { // 数据变化，更新视图等等操作
            console.log("视图正在更新...");
        }
    }
    ```

5. **通过以上代码实现的Vue响应式原理**：

    ```javascript
    function init() {  // 初始化函数
        let data = {
            name: "Bearly"
        };
        new Observer(data);
        console.log(data.name);
    }
    init();
    ```
注意：以上代码是为了帮助理解Vue的响应式原理，实际的Vue源码要复杂许多，具体可以参考[Vue.js源码](https://github.com/vuejs/vue)，同时Vue3采用的是Proxy代替`Object.defineProperty()`进行响应式处理，更加强大高效。