# 手写call、apply、bind实现

## call

```js
Function.prototype.myCall = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('not a function')
  }
  context = context || window
  const fn = Symbol('fn')
  context[fn] = this
  const result = context[fn](...args)
  delete context[fn]
  return result
}
```

## apply

```js

Function.prototype.myApply = function (context, args) {
  if (typeof this !== 'function') {
    throw new TypeError('not a function')
  }
  context = context || window
  const fn = Symbol('fn')
  context[fn] = this
  const result = context[fn](...args)
  delete context[fn]
  return result
}
```

## bind

```js

Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('not a function')
  }
  const self = this
  return function F() {
    if (this instanceof F) {
      return new self(...args, ...arguments)
    }
    return self.apply(context, args.concat(...arguments))
  }
}
```

## new

```js

function myNew(fn, ...args) {
  const obj = Object.create(fn.prototype)
  const result = fn.apply(obj, args)
  return result instanceof Object ? result : obj
}
```

## instanceof

```js

function myInstanceof(left, right) {
  let prototype = right.prototype
  left = left.__proto__
  while (true) {
    if (left === null || left === undefined) {
      return false
    }
    if (prototype === left) {
      return true
    }
    left = left.__proto__
  }
}
```

## Object.create

```js

Object.myCreate = function (obj) {
  function F() {}
  F.prototype = obj
  return new F()
}
```

## Object.assign

```js

Object.myAssign = function (target, ...args) {
  if (target === null || target === undefined) {
    throw new TypeError('Cannot convert undefined or null to object')
  }
  const result = Object(target)
  args.forEach((arg) => {
    if (arg !== null && arg !== undefined) {
      for (const key in arg) {
        if (Object.prototype.hasOwnProperty.call(arg, key)) {
          result[key] = arg[key]
        }
      }
    }
  })
  return result
}
```

## Object.keys

```js

Object.myKeys = function (obj) {
  if (typeof obj !== 'object') {
    throw new TypeError('obj is not an object')
  }
  const result = []
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result.push(key)
    }
  }
  return result
}
```

## Object.values

```js

Object.myValues = function (obj) {
  if (typeof obj !== 'object') {
    throw new TypeError('obj is not an object')
  }
  const result = []
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result.push(obj[key])
    }
  }
  return result
}
```

## Object.entries

```js

Object.myEntries = function (obj) {
  if (typeof obj !== 'object') {
    throw new TypeError('obj is not an object')
  }
  const result = []
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result.push([key, obj[key]])
    }
  }
  return result
}
```