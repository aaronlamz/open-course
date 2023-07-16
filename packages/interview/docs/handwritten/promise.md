# 手写Promise实现

## 1. Promise的特点

- Promise是一个类
- Promise有三种状态：pending、fulfilled、rejected
- new Promise时，需要传递一个executor执行器，执行器立即执行
- executor接受两个参数，分别是resolve和reject
- promise的默认状态是pending
- promise的状态一旦确认就不会再改变
- promise有then方法，then方法中传递两个参数，分别是成功的回调onFulfilled和失败的回调onRejected
- 如果调用then时，promise已经成功，则执行onFulfilled，并将promise的值作为参数传递进去
- 如果调用then时，promise已经失败，则执行onRejected，并将promise的reason作为参数传递进去
- 如果then中抛出了异常，则执行then返回的promise的reject方法
- 如果then中返回了一个结果，那么就会把这个结果作为参数，传递给下一个then的成功的回调onFulfilled中
- 如果then中返回了一个promise，那么会等这个promise执行完，promise如果成功就走下一个then的成功，如果失败就走下一个then的失败

## 2. Promise的实现

```js
// Class 实现
class Promise {
  constructor(executor) {
    this.status = 'pending'
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []

    let resolve = (value) => {
      if (this.status === 'pending') {
        this.status = 'fulfilled'
        this.value = value
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }

    let reject = (reason) => {
      if (this.status === 'pending') {
        this.status = 'rejected'
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(onFulfilled, onRejected) {
    if (this.status === 'fulfilled') {
      onFulfilled(this.value)
    }

    if (this.status === 'rejected') {
      onRejected(this.reason)
    }

    if (this.status === 'pending') {
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value)
      })

      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason)
      })
    }
  }
}

module.exports = Promise
```

```js
// 函数实现

function Promise(executor) {
  let self = this
  self.status = 'pending'
  self.value = undefined
  self.reason = undefined
  self.onResolvedCallbacks = []
  self.onRejectedCallbacks = []

  function resolve(value) {
    if (self.status === 'pending') {
      self.status = 'fulfilled'
      self.value = value
      self.onResolvedCallbacks.forEach(fn => fn())
    }
  }

  function reject(reason) {
    if (self.status === 'pending') {
      self.status = 'rejected'
      self.reason = reason
      self.onRejectedCallbacks.forEach(fn => fn())
    }
  }

  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  let self = this
  if (self.status === 'fulfilled') {
    onFulfilled(self.value)
  }

  if (self.status === 'rejected') {
    onRejected(self.reason)
  }

  if (self.status === 'pending') {
    self.onResolvedCallbacks.push(() => {
      onFulfilled(self.value)
    })

    self.onRejectedCallbacks.push(() => {
      onRejected(self.reason)
    })
  }
}

module.exports = Promise
```

## 3. Promise的测试

```js

let Promise = require('./promise')

let promise = new Promise((resolve, reject) => {
  resolve('成功')
  // reject('失败')
})

promise.then((data) => {
  console.log(data)
}, (err) => {
  console.log(err)
})
```

## 4. Promise的链式调用

```js

let Promise = require('./promise')

let promise = new Promise((resolve, reject) => {
  resolve('成功')
  // reject('失败')
})

promise.then((data) => {
  console.log(data)
  return 'aaa'
}, (err) => {
  console.log(err)
}).then((data) => {
  console.log(data)
}, (err) => {
  console.log(err)
})
```

## 5. Promise的值穿透

```js

let Promise = require('./promise')  

let promise = new Promise((resolve, reject) => {
  resolve('成功')
  // reject('失败')
})

promise.then().then().then((data) => {
  console.log(data)
}, (err) => {
  console.log(err)
})
```

## 6. Promise的错误捕获

```js

let Promise = require('./promise')

let promise = new Promise((resolve, reject) => {
  resolve('成功')
  // reject('失败')
})

promise.then((data) => {
  console.log(data)
  throw new Error('失败了')
}, (err) => {
  console.log(err)
}).then((data) => {
  console.log(data)
}, (err) => {
  console.log(err)
})
```

## 7. Promise的延迟对象

```js

let Promise = require('./promise')

let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功')
  }, 1000)
})

promise.then((data) => {
  console.log(data)
}, (err) => {
  console.log(err)
})
```

## 8. Promise的静态方法

```js

let Promise = require('./promise')

Promise.resolve(100).then((data) => {
  console.log(data)
})

Promise.reject(100).then((data) => {
  console.log(data)
}, (err) => {
  console.log(err)
})

Promise.reject(100).catch((err) => {
  console.log(err)
})

