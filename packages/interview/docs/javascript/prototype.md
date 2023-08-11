# 解释一下原型、原型链是什么

在JavaScript中，原型（prototype）和原型链是实现对象继承和属性查找的关键机制。

### 原型（prototype）

每个JavaScript函数都有一个特殊的属性叫做 `prototype`。如果这个函数用作构造函数来创建对象，那么新创建的对象会从这个 `prototype` 属性所引用的对象继承属性。

例如，假设你有一个构造函数 `Person`，你可以在 `Person.prototype` 上添加属性或方法，然后所有通过 `new Person()` 创建的对象都将具有对这些属性和方法的访问权。

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function() {
  console.log('Hi, my name is ' + this.name);
};

const alice = new Person('Alice');
alice.sayHi(); // 输出 "Hi, my name is Alice"
```

这里，`sayHi` 方法是添加到 `Person.prototype` 上的，因此所有的 `Person` 实例都可以访问它。

### 原型链

原型链是JavaScript中实现继承和属性查找的主要机制。当你尝试访问一个对象的属性时，JavaScript引擎首先会在该对象自身上查找该属性。如果找不到，它会沿着原型链向上查找，即在对象的原型上查找，再在对象原型的原型上查找，依此类推。

每个对象都有一个内部链接指向其原型。你可以通过 `Object.getPrototypeOf` 或者非标准的 `__proto__` 属性来访问这个链接。

原型链的末端通常是 `Object.prototype`，它是所有对象的基本原型。从 `Object.prototype` 再向上查找，原型就是 `null`。

### 例子

```javascript
function Animal(type) {
  this.type = type;
}

Animal.prototype.eat = function() {
  console.log('Eating');
};

function Dog(name) {
  this.name = name;
}

// 将Dog的原型设置为Animal的实例
Dog.prototype = new Animal('Dog');

const myDog = new Dog('Buddy');
myDog.eat(); // 输出 "Eating"
```

这里的原型链如下：

- `myDog` 链接到 `Dog.prototype`
- `Dog.prototype`（也就是 `Animal` 的实例）链接到 `Animal.prototype`
- `Animal.prototype` 链接到 `Object.prototype`
- `Object.prototype` 链接到 `null`

通过这个原型链，`myDog` 能够访问在 `Animal.prototype` 上定义的 `eat` 方法。

总的来说，原型和原型链是JavaScript中用于实现对象之间的继承和属性共享的重要特性。