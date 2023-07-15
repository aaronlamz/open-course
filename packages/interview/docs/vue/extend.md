# 解释一下Vue中的extend

## 什么是extend

extend是Vue的一个全局API，它可以用来创建一个组件的构造器，它接收一个对象作为参数，对象中可以包含组件的各种选项，比如data、props、computed、methods、watch、template等。

## extend的使用

extend的使用非常简单，只需要调用Vue.extend()方法，然后将返回值赋给一个变量，这个变量就是一个组件的构造器，如下所示：

```js

const Component = Vue.extend({
  template: '<div>{{ message }}</div>',
  data () {
    return {
      message: 'hello world'
    }
  }
})

```

## extend的原理

extend的原理主要是通过Vue的源码来解释的，它的源码如下所示：

```js

export function initExtend (Vue: GlobalAPI) {
  Vue.cid = 0
  let cid = 1

  Vue.extend = function (extendOptions: Object): Function {
    extendOptions = extendOptions || {}
    const Super = this
    const SuperId = Super.cid
    const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {})
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    const name = extendOptions.name || Super.options.name
    if (process.env.NODE_ENV !== 'production' && name) {
      validateComponentName(name)
    }

    const Sub = function VueComponent (options) {
      this._init(options)
    }
    Sub.prototype = Object.create(Super.prototype)
    Sub.prototype.constructor = Sub
    Sub.cid = cid++
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    )
    Sub['super'] = Super

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps(Sub)
    }
    if (Sub.options.computed) {
      initComputed(Sub)
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend
    Sub.mixin = Super.mixin
    Sub.use = Super.use

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type]
    })
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options
    Sub.extendOptions = extendOptions
    Sub.sealedOptions = extend({}, Sub.options)

    // cache constructor
    cachedCtors[SuperId] = Sub
    return Sub
  }
}

```

从源码中可以看出，extend的原理主要是通过创建一个VueComponent构造函数来实现的，它的原理如下所示：

```js

const Sub = function VueComponent (options) {
  this._init(options)
}

```

在这个构造函数中，它调用了_init()方法，这个方法是Vue的一个实例方法，它的作用是初始化Vue实例，它的源码如下所示：

```js

Vue.prototype._init = function (options?: Object) {
  const vm: Component = this
  // a uid
  vm._uid = uid++

  let startTag, endTag
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    startTag = `vue-perf-start:${vm._uid}`
    endTag = `vue-perf-end:${vm._uid}`
    mark(startTag)
  }

  // a flag to avoid this being observed
  vm._isVue = true
  // merge options
  if (options && options._isComponent) {
    // optimize internal component instantiation
    // since dynamic options merging is pretty slow, and none of the
    // internal component options needs special treatment.
    initInternalComponent(vm, options)
  } else {
    vm.$options = mergeOptions(
      resolveConstructorOptions(vm.constructor),
      options || {},
      vm
    )
  }
  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    initProxy(vm)
  } else {
    vm._renderProxy = vm
  }
  // expose real self
  vm._self = vm
  initLifecycle(vm)
  initEvents(vm)
  initRender(vm)
  callHook(vm, 'beforeCreate')
  initInjections(vm) // resolve injections before data/props
  initState(vm)
  initProvide(vm) // resolve provide after data/props
  callHook(vm, 'created')

  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    vm._name = formatComponentName(vm, false)
    mark(endTag)
    measure(`vue ${vm._name} init`, startTag, endTag)
  }

  if (vm.$options.el) {
    vm.$mount(vm.$options.el)
  }
}

```

在_init()方法中，它首先会给Vue实例添加一个_isVue属性，然后调用mergeOptions()方法，这个方法的作用是将Vue实例的options和extendOptions合并，然后将合并后的结果赋值给vm.$options，这个options就是我们在使用extend时传入的对象，extendOptions就是Vue实例的options，它的源码如下所示：

```js

export function mergeOptions (
  parent: Object,
  child: Object,
  vm?: Component
): Object {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child)
  }

  if (typeof child === 'function') {
    child = child.options
  }

  normalizeProps(child, vm)
  normalizeInject(child, vm)
  normalizeDirectives(child)
  const extendsFrom = child.extends
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm)
  }
  if (child.mixins) {
    for (let i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm)
    }
  }
  const options = {}
  let key
  for (key in parent) {
    mergeField(key)
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key)
    }
  }
  function mergeField (key) {
    const strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], child[key], vm, key)
  }
  return options
}

```

在mergeOptions()方法中，它首先会调用normalizeProps()方法，这个方法的作用是将props规范化，然后调用normalizeInject()方法，这个方法的作用是将inject规范化，然后调用normalizeDirectives()方法，这个方法的作用是将directives规范化，然后调用mergeOptions()方法，这个方法的作用是将parent和extendsFrom合并，然后调用mergeOptions()方法，这个方法的作用是将parent和mixins合并，最后调用mergeOptions()方法，这个方法的作用是将parent和child合并，这个方法的源码如下所示：

```js

function mergeOptions (
  parent: Object,
  child: Object,
  vm?: Component
): Object {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child)
  }

  if (typeof child === 'function') {
    child = child.options
  }

  normalizeProps(child, vm)
  normalizeInject(child, vm)
  normalizeDirectives(child)
  const extendsFrom = child.extends
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm)
  }
  if (child.mixins) {
    for (let i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm)
    }
  }
  const options = {}
  let key
  for (key in parent) {
    mergeField(key)
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key)
    }
  }
  function mergeField (key) {
    const strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], child[key], vm, key)
  }
  return options
}

```

在mergeOptions()方法中，它首先会调用normalizeProps()方法，这个方法的作用是将props规范化，然后调用normalizeInject()方法，这个方法的作用是将inject规范化，然后调用normalizeDirectives()方法，这个方法的作用是将directives规范化，然后调用mergeOptions()方法，这个方法的作用是将parent和extendsFrom合并，然后调用mergeOptions()方法，这个方法的作用是将parent和mixins合并，最后调用mergeOptions()方法，这个方法的作用是将parent和child合并，这个方法的源码如下所示：

```js

function mergeOptions (
  parent: Object,
  child: Object,
  vm?: Component
): Object {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child)
  }

  if (typeof child === 'function') {
    child = child.options
  }

  normalizeProps(child, vm)
  normalizeInject(child, vm)
  normalizeDirectives(child)
  const extendsFrom = child.extends
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm)
  }
  if (child.mixins) {
    for (let i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm)
    }
  }
  const options = {}
  let key
  for (key in parent) {
    mergeField(key)
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key)
    }
  }
  function mergeField (key) {
    const strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], child[key], vm, key)
  }
  return options
}

```


## extend的应用

extend的应用非常广泛，它可以用来创建一个组件的构造器，也可以用来创建一个Vue的子类，它的应用如下所示：

```js

// 创建一个组件的构造器

const Component = Vue.extend({
  template: '<div>{{ message }}</div>',
  data () {
    return {
      message: 'hello world'
    }
  }
})

// 创建一个Vue的子类

const Sub = Vue.extend({
  template: '<div>{{ message }}</div>',
  data () {
    return {
      message: 'hello world'
    }
  }
})

```