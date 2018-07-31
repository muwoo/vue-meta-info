<p align="center">
  <img src='http://img.souche.com/f2e/2bce899682f76be6f90cf05104d361e6.png' width='300' alt="vue-meta">
</div>

<h5 align="center">
  基于Vue 2.0 的单页面 meta info 管理.
</h5>
<p align="center">
  <a href="https://github.com/feross/standard">
    <img src="https://cdn.rawgit.com/feross/standard/master/badge.svg" alt="Standard - JavaScript Style">
  </a>
</p>

<p align="center">
<a href="https://www.npmjs.com/package/vue-meta-info"><img src="https://img.shields.io/badge/npm-v0.1.7-blue.svg" alt="npm version"></a>
  <img src="https://img.shields.io/badge/codecov-95.83%25%20-brightgreen.svg">
  <img src="https://img.shields.io/badge/build-passing-brightgreen.svg">
  <a href="https://www.npmjs.com/package/vue-meta-info"><img src="https://img.shields.io/badge/licence-MIT-blue.svg"></a>
</p>

```html
<template>
  ...
</template>

<script>
  export default {
    metaInfo: {
      title: 'My Example App', // set a title
      meta: [{                 // set meta
        name: 'keyWords',
        content: 'My Example App'
      }]
      link: [{                 // set link
        rel: 'asstes',
        href: 'https://assets-cdn.github.com/'
      }]
    }
  }
</script>
```

- [Description](#description)
- [Disclaimer](#disclaimer)
- [Installation](#installation)
    - [Yarn](#yarn)
    - [NPM](#npm)
- [Usage](#Usage)
- [Tips](#Tips)
- [SSR](#SSR)
- [Examples](#Examples)

# description
`vue-meta-info` 是一个基于[vue 2.0](https://vuejs.org)的插件，它会让你更好的管理你的 app 里面的 meta 信息。你可以直接
在组件内设置 metaInfo 便可以自动挂载到你的页面中。如果你需要随着数据的变化，自动更新你的title、meta等信息，那么用此
插件也是再合适不过了。
当然，有时候我们也可能会遇到让人头疼的SEO问题，那么使用此插件配合 [prerender-spa-plugin](https://github.com/chrisvfritz/prerender-spa-plugin) 也是再合适不过了
> 更多使用介绍：https://zhuanlan.zhihu.com/p/29148760?group_id=890298677627879424
# Disclaimer

**You have been warned.** 有些情况下可能会存在一些还没有测到的bug，测试用例并没有完全覆盖所有的语句.

# Installation

### Yarn
```sh
$ yarn add vue-meta-info
```

### NPM
```sh
$ npm install vue-meta-info --save
```
# Usage
## 步骤1：全局引入`vue-meta-info`
```js
import Vue from 'vue'
import MetaInfo from 'vue-meta-info'

Vue.use(MetaInfo)
```
## 步骤2：组件内静态使用 metaInfo
```html
<template>
  ...
</template>

<script>
  export default {
    metaInfo: {
      title: 'My Example App', // set a title
      meta: [{                 // set meta
        name: 'keyWords',
        content: 'My Example App'
      }]
      link: [{                 // set link
        rel: 'asstes',
        href: 'https://assets-cdn.github.com/'
      }]
    }
  }
</script>
```

# Tips
> 如果你的title或者meta是异步加载的，那么你可能需要这样使用
```html
<template>
  ...
</template>

<script>
  export default {
    name: 'async',
    metaInfo () {
      return {
        title: this.pageName
      }
    },
    data () {
      return {
        pageName: 'loading'
      }
    },
    mounted () {
      setTimeout(() => {
        this.pageName = 'async'
      }, 2000)
    }
  }
</script>
```

# SSR
如果您使用了Vue SSR 来渲染页面，那么您需要注意的是：
>由于没有动态更新，所有的生命周期钩子函数中，只有 beforeCreate 和 created 会在服务器端渲染(SSR)过程中被调用。这就是说任何其他生命周期钩子函数中的代码（例如 beforeMount 或 mounted），只会在客户端执行。
 此外还需要注意的是，你应该避免在 beforeCreate 和 created 生命周期时产生全局副作用的代码，例如在其中使用 setInterval 设置 timer。在纯客户端(client-side only)的代码中，我们可以设置一个 timer，然后在 beforeDestroy 或 destroyed 生命周期时将其销毁。但是，由于在 SSR 期间并不会调用销毁钩子函数，所以 timer 将永远保留下来。为了避免这种情况，请将副作用代码移动到 beforeMount 或 mounted 生命周期中。

基于以上约束，我们目前可以使用静态的数据来渲染我们的```metaInfo```，下面给出一个使用示例：

```html
<template>
  ...
</template>

<script>
  export default {
    metaInfo: {
      title: 'My Example App', // set a title
      meta: [{                 // set meta
        name: 'keyWords',
        content: 'My Example App'
      }]
      link: [{                 // set link
        rel: 'asstes',
        href: 'https://assets-cdn.github.com/'
      }]
    }
  }
</script>
```

此时```vueMetaInfo```会帮我们在ssr的context中挂载出一个title变量和一个render对象。类似于这样：
```js
context = {
  ...
  title: 'My Example App',
  render: {
    meta: function () { ... },
    link: function () { ... }
  }
}
```

至此，我们可以改造我们的模板：
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>{{title}}</title>
    {{{render.meta && render.meta()}}}
    {{{render.link && render.link()}}}
  </head>
  <body>
    <!--vue-ssr-outlet-->
  </body>
</html>

```

这样便可以渲染出需要的数据。值得注意的是：虽然我们可以使用
```html
<template>
  ...
</template>

<script>
  export default {
    name: 'async',
    metaInfo () {
      return {
        title: this.pageName
      }
    },
    data () {
      return {
        pageName: 'loading'
      }
    },
    mounted () {
      setTimeout(() => {
        this.pageName = 'async'
      }, 2000)
    }
  }
</script>
```
这种形式来定义数据，但是最终渲染出来的```title``` 依然是 ```loading```，因为服务端渲染除了```created ```和 ```beforeCreate```并没有```mounted```钩子。

# Examples

To run the examples; clone this repository & run `npm install` in the root directory, and then run `npm run dev`. Head to http://localhost:8080.
