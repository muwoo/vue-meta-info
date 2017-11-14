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
<a href="https://www.npmjs.com/package/vue-meta-info"><img src="https://img.shields.io/badge/npm-1.0.0-brightgreen.svg" alt="npm version"></a> 
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
# Examples

To run the examples; clone this repository & run `npm install` in the root directory, and then run `npm run dev`. Head to http://localhost:8080.
