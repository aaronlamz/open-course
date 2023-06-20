# 解释一下原型、原型链什么
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

## 参考资料
- [MDN: Inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
