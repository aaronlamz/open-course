# 解释一下原型、原型链是什么
## 原型
::: details 点击查看答案
- 原型是一个对象，每个对象都有原型，原型也是一个对象
- 原型对象也有原型，原型链的尽头是null
- 原型对象是通过构造函数生成的，每个函数都有一个prototype属性，指向原型对象
- 原型对象有一个constructor属性，指向构造函数
- 原型对象的constructor属性指向构造函数，构造函数的prototype属性指向原型对象，二者互相引用
:::

## 原型链
::: details 点击查看答案
- 原型链是由原型对象组成的链状结构，原型链的尽头是null
- 原型链的作用是实现继承
- 原型链的查找规则是：先在自身查找，如果没有找到，就去原型对象中查找，如果还没有找到，就去原型对象的原型对象中查找，直到找到原型链的尽头null
- 原型链的查找是一层一层往上查找，不是一层一层往下查找
:::

## 原型链关系图
JavaScript 的原型链构成了一种层级关系，每个对象都有一个原型 prototype，每个原型又有它自己的原型，以此类推，直到 null。而构造函数是一种特殊的函数，用于初始化新创建的对象。 prototype 是构造函数的一个属性，这个属性指向一个对象，所有由相同构造函数创建的实例将共享这个对象的属性和方法。下面是一种JavaScript原型链的关系图：
```js
myObject -|---|- (created by using 'new Constructor()')
          |
          V
Constructor -|---|- (defined with function Constructor() {...})
          |       |
          |       V
          |-- prototype -|---|- (instance of Object)
                          |
                          V
                Object.prototype
                          |
                          V
                        null
```
以下是每一层级的描述：

myObject：使用 new Constructor() 创建的实例对象。它的 __proto__ 链接到 Constructor.prototype，这就是该实例可以访问在 'Constructor.prototype' 上定义的属性和方法的原因。

Constructor：定义的构造函数。这个构造函数有一个 prototype 属性，指向一个由构造函数创建的实例将继承其属性和方法的原型对象。

Constructor.prototype：构造函数的原型对象。如果在这个原型上定义属性或方法，那么由相同构造函数创建的所有实例将共享这些属性和方法。它的 __proto__ 链接到 Object.prototype，使得所有的对象实例都能够访问到基本的方法，如 toString()，valueOf() 等。

Object.prototype：几乎所有的对象最终都会链接到此原型。它的 __proto__ 链接到 null，表示原型链的终点。

null：是原型链过程的结束端，Object.prototype 的 __proto__ 指向 null。

## 参考资料
- [MDN: Inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
