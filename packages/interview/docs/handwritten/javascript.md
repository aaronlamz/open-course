# JavaScript 笔试题

## 简单题

1、实现一个函数，接收一个字符串参数str，判断该字符串是否是回文字符串。
::: details 点击查看答案
```javascript
function isPalindrome(str) {
  return str === str.split('').reverse().join('')
}
```
:::

2、实现一个函数，接收一个数组参数arr，返回数组中的最大值。
::: details 点击查看答案
```javascript
function max(arr) {
  return Math.max(...arr)
}
```
:::

3、实现一个函数，接收一个字符串参数str，统计字符串中每个字符出现的次数，并返回一个包含字符和对应出现次数的对象。
::: details 点击查看答案
```javascript
function count(str) {
  const obj = {}
  for (let i = 0; i < str.length; i++) {
    const char = str[i]
    if (obj[char]) {
      obj[char]++
    } else {
      obj[char] = 1
    }
  }
  return obj
}
```
:::



## 中等题

## 困难题



