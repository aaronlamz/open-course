# 解释一下Vue中的keep-alive实现

## 什么是keep-alive

keep-alive是Vue的一个内置组件，它可以使被包含的组件保留状态，避免重新渲染。

## 为什么要使用keep-alive

当我们想要对组件进行缓存时，就可以使用keep-alive。

## keep-alive的实现

keep-alive的实现主要是通过LRU算法来实现的，LRU算法是一种缓存淘汰策略，它的全称是Least Recently Used，即最近最少使用，它的核心思想是“如果数据最近被访问过，那么将来被访问的几率也更高”。

LRU算法的实现方式有很多，比如使用数组、链表、Map等，Vue中使用的是Map，因为Map的查找速度是最快的。

Vue中的LRU算法的实现方式如下：

```js
class LRUCache {
  constructor (limit) {
    this.limit = limit
    this.map = new Map()
  }

  get (key) {
    const value = this.map.get(key)
    if (value) {
      this.map.delete(key)
      this.map.set(key, value)
    }
    return value
  }

  set (key, value) {
    this.map.delete(key)
    this.map.set(key, value)
    if (this.map.size > this.limit) {
      this.map.delete(this.map.keys().next().value)
    }
  }
}
```

## keep-alive的使用

keep-alive的使用非常简单，只需要在需要缓存的组件外面包裹一个keep-alive标签即可，如下所示：

```html

<template>
  <div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>

</template>

```

## keep-alive的原理

keep-alive的原理主要是通过Vue的生命周期钩子函数来实现的，它的实现方式如下：

```js

const cache = new Map()

export default {
  name: 'keep-alive',
  abstract: true,
  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },
  created () {
    this.cache = Object.create(null)
    this.keys = []
  },
  destroyed () {
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },
  mounted () {
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
  },
  render () {
    const slot = this.$slots.default
    const vnode: VNode = getFirstComponentChild(slot)
    const componentOptions: ?VNodeComponentOptions = vnode && vnode.componentOptions
    if (componentOptions) {
      // check pattern
      const name: ?string = getComponentName(componentOptions)
      const { include, exclude } = this
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      const { cache, keys } = this
      const key: ?string = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
        : vnode.key
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance
        // make current key freshest
        remove(keys, key)
        keys.push(key)
      } else {
        cache[key] = vnode
        keys.push(key)
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode)
        }
      }

      vnode.data.keepAlive = true
    }
    return vnode || (slot && slot[0])
  }
}

```

## keep-alive的源码

keep-alive的源码如下所示：

```js

/* @flow */

import { isRegExp, remove } from 'shared/util'

type VNodeCache = { [key: string]: ?VNode };

function getFirstComponentChild (children: ?Array<VNode>): ?VNode {
  return children && children.filter(c => c && c.componentOptions)[0]
}

function initCache (vnode: VNode) {
  const compOptions: ComponentOptions = vnode.componentOptions
  const cache: VNodeCache = vnode.componentInstance._cache = Object.create(null)
  const keys: Array<string> = vnode.componentInstance._keys = []
  for (const key in compOptions.Ctor.options.cache) {
    const def = compOptions.Ctor.options.cache[key]
    cache[key] = def(vnode)
  }
}

function isValidCacheKey (vnode: VNode): boolean {
  const compOptions: ComponentOptions = vnode.componentOptions
  return compOptions && compOptions.Ctor.options.name !== 'keep-alive'
}

function isVNodeSimilar (prev: VNode, next: VNode): boolean {
  if (prev.tag !== next.tag) {
    return false
  }
  if (prev.key !== next.key) {
    return false
  }
  const prevChildren = prev.data && prev.data.attrs && prev.data.attrs['keep-alive']
  const nextChildren = next.data && next.data.attrs && next.data.attrs['keep-alive']
  if (prevChildren || nextChildren) {
    return prevChildren === nextChildren
  }
  return (prev.data && prev.data.keepAlive) === (next.data && next.data.keepAlive)
}

export default {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created () {
    this.cache = Object.create(null)
    this.keys = []
  },

  destroyed () {
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },

  mounted () {
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
  },

  render () {
    const slot = this.$slots.default
    const vnode: VNode = getFirstComponentChild(slot)
    const componentOptions: ?VNodeComponentOptions = vnode && vnode.componentOptions
    if (componentOptions) {
      // check pattern
      const name: ?string = getComponentName(componentOptions)
      const { include, exclude } = this
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      const { cache, keys } = this
      const key: ?string = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
        : vnode.key
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance
        // make current key freshest
        remove(keys, key)
        keys.push(key)
      } else {
        cache[key] = vnode
        keys.push(key)
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode)
        }
      }

      vnode.data.keepAlive = true
    }
    return vnode || (slot && slot[0])
  }
}

function pruneCache (keepAliveInstance: any, filter: Function) {
  const { cache, keys, _vnode } = keepAliveInstance
  for (const key in cache) {
    const cachedNode: ?VNode = cache[key]
    if (cachedNode) {
      const name: ?string = getComponentName(cachedNode.componentOptions)
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode)
      }
    }
  }
}

function pruneCacheEntry (
  cache: VNodeCache,
  key: string,
  keys: Array<string>,
  current?: VNode
) {
  const cached = cache[key]
  if (cached && (!current || cached.tag !== current.tag)) {
    cached.componentInstance.$destroy()
  }
  cache[key] = null
  remove(keys, key)
}

```

## keep-alive的使用场景

keep-alive的使用场景主要是在需要缓存组件的场景，比如在Tab切换的场景，我们可以使用keep-alive来缓存Tab切换的组件，这样就可以避免重新渲染，提高性能。

## keep-alive的注意事项

keep-alive的注意事项主要是在使用keep-alive的时候，需要注意以下几点：

1. keep-alive不能缓存动态组件，因为动态组件是在运行时才会解析的，所以它不能被缓存。

2. keep-alive不能缓存内联模板，因为内联模板会把所有的子组件都缓存起来，这样会导致内存占用过大，所以keep-alive不能缓存内联模板。

3. keep-alive不能和transition同时使用，因为transition会导致组件被频繁创建和销毁，这样会导致keep-alive的缓存失效。

4. keep-alive不能和v-for同时使用，因为v-for会导致组件被频繁创建和销毁，这样会导致keep-alive的缓存失效。

5. keep-alive不能和slot同时使用，因为slot会导致组件被频繁创建和销毁，这样会导致keep-alive的缓存失效。

6. keep-alive不能和template同时使用，因为template会导致组件被频繁创建和销毁，这样会导致keep-alive的缓存失效。

7. keep-alive不能和v-if同时使用，因为v-if会导致组件被频繁创建和销毁，这样会导致keep-alive的缓存失效。




