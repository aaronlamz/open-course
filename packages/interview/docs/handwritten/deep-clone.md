# 手写深拷贝实现

## 1. JSON.parse(JSON.stringify(obj))

```js

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}
```

## 2. 递归

```js

function deepClone(obj) {
  if (typeof obj !== 'object') {
    return obj
  }
  const result = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = deepClone(obj[key])
    }
  }
  return result
}
```

## 3. 迭代

```js

function deepClone(obj) {
  if (typeof obj !== 'object') {
    return obj
  }
  const result = Array.isArray(obj) ? [] : {}
  const stack = [
    {
      parent: result,
      key: undefined,
      data: obj
    }
  ]
  while (stack.length) {
    const node = stack.pop()
    const { parent, key, data } = node
    let res = parent
    if (typeof key !== 'undefined') {
      res = parent[key] = Array.isArray(data) ? [] : {}
    }
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        if (typeof data[key] !== 'object') {
          res[key] = data[key]
        } else {
          stack.push({
            parent: res,
            key,
            data: data[key]
          })
        }
      }
    }
  }
  return result
}
```

## 4. WeakMap

```js

function deepClone(obj, map = new WeakMap()) {
  if (typeof obj !== 'object') {
    return obj
  }
  if (map.has(obj)) {
    return map.get(obj)
  }
  const result = Array.isArray(obj) ? [] : {}
  map.set(obj, result)
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = deepClone(obj[key], map)
    }
  }
  return result
}
```

## 5. Proxy

```js

function deepClone(obj) {
  if (typeof obj !== 'object') {
    return obj
  }
  const result = Array.isArray(obj) ? [] : {}
  const proxy = new Proxy(obj, {
    get(target, key) {
      return deepClone(target[key])
    }
  })
  return proxy
}
```

## 6. 浅拷贝

```js

function shallowClone(obj) {
  if (typeof obj !== 'object') {
    return obj
  }
  const result = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = obj[key]
    }
  }
  return result
}
```
