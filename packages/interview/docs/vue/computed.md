# 解释一下Vue中的computed

## 什么是computed

computed是Vue中的一个属性，它用来定义计算属性，它的值是一个对象，对象中可以定义多个计算属性，每个计算属性都有一个getter和一个setter，getter用来获取计算属性的值，setter用来监视计算属性的变化。

## 为什么要使用computed

在Vue中，我们可以通过{{}}来显示数据，但是如果我们想要对数据进行一些处理，比如格式化，我们就需要使用到计算属性。

## computed的优势

计算属性是基于它们的响应式依赖进行缓存的，只有当它的响应式依赖发生改变时，它才会重新求值，所以计算属性只有在它的相关响应式依赖发生改变时才会重新求值，这就意味着只要message没有发生改变，多次访问reversedMessage计算属性会立即返回之前的计算结果，而不必再次执行函数。

## computed的缺点

计算属性只能定义同步的计算属性，如果我们想要定义异步的计算属性，就需要使用到watch。

## computed的实现

computed的实现主要分为两个部分，一个是计算属性的创建，另一个是计算属性的缓存。

### 计算属性的创建

计算属性的创建主要是通过Object.defineProperty方法来创建，它接收三个参数，第一个参数是对象，第二个参数是属性名，第三个参数是一个对象，它有两个属性，一个是get，用来定义计算属性的getter，另一个是set，用来定义计算属性的setter。

```js

function defineComputed(vm, key, userDef) {
  const getter = userDef.get
  const setter = userDef.set
  Object.defineProperty(vm, key, {
    get() {
      return getter.call(vm)
    },
    set(val) {
      setter.call(vm, val)
    }
  })
}
```

### 计算属性的缓存

计算属性的缓存主要是通过闭包来实现的，它的原理是在计算属性的getter中定义一个变量，用来缓存计算属性的值，然后在计算属性的getter中返回这个变量，这样就可以实现计算属性的缓存。

```js

function defineComputed(vm, key, userDef) {
  let value
  const getter = userDef.get
  const setter = userDef.set
  Object.defineProperty(vm, key, {
    get() {
      if (value) {
        return value
      } else {
        value = getter.call(vm)
        return value
      }
    },
    set(val) {
      setter.call(vm, val)
    }
  })
}
```

## computed的应用

computed的应用主要是在Vue中，当我们想要对数据进行一些处理时，就可以使用计算属性。

```js

const vm = new Vue({
  el: '#app',
  data() {
    return {
      message: 'Hello World'
    }
  },
  computed: {
    reversedMessage() {
      return this.message.split('').reverse().join('')
    }
  }
})

console.log(vm.reversedMessage) // dlroW olleH
```



