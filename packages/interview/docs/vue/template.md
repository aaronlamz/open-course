# 解释一下Vue中的template

## template的作用

template的作用是定义组件的模板，它的使用方式有两种，一种是使用template标签，另一种是使用.vue文件，它们的使用方式如下所示：

```html

<template>
  <div>
    <h1>hello world</h1>
  </div>

</template>

```

```html

<template>
  <div>
    <h1>hello world</h1>
  </div>

</template>

```

## template的实现

template的实现主要是通过vue-template-compiler来实现的，它的作用是将template模板编译成render函数，它的使用方式如下所示：

```js

const compiler = require('vue-template-compiler')   

const template = `
  <div>
    <h1>hello world</h1>
  </div>
`

const result = compiler.compile(template)

console.log(result.render)

```

## vue-template-compiler 实现

vue-template-compiler 的实现主要是通过正则表达式来实现的，它的实现方式如下所示：

```js

const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*` // 标签名

const qnameCapture = `((?:${ncname}\\:)?${ncname})` // 用来获取标签名的

const startTagOpen = new RegExp(`^<${qnameCapture}`) // 匹配开始标签的

const startTagClose = /^\s*(\/?)>/ // 匹配开始标签的结束符

const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`) // 匹配结束标签

const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g // 匹配双花括号

function parseHTML (html) {
  while (html) {
    let textEnd = html.indexOf('<')
    if (textEnd === 0) {
      const startTagMatch = parseStartTag()
      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs)
        continue
      }
      const endTagMatch = html.match(endTag)
      if (endTagMatch) {
        advance(endTagMatch[0].length)
        end(endTagMatch[1])
        continue
      }
    }
    let text
    if (textEnd >= 0) {
      text = html.substring(0, textEnd)
    }
    if (text) {
      advance(text.length)
      chars(text)
    }
  }
  function advance (n) {
    html = html.substring(n)
  }
  function parseStartTag () {
    const start = html.match(startTagOpen)
    if (start) {
      const match = {
        tagName: start[1],
        attrs: []
      }
      advance(start[0].length)
      let end, attr
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length)
        match.attrs.push({ name: attr[1], value: attr[3] || attr[4] || attr[5] })
      }
      if (end) {
        advance(end[0].length)
        return match
      }
    }
  }
  return root
}

```