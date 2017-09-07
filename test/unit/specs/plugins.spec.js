/**
 * @author monkeywang
 * Date: 17/9/6
 */
import metaInfo from 'plugins'
import Vue from 'vue'
import bar from '@/views/bar.vue'
import foo from '@/views/foo.vue'
import async from '@/views/async.vue'
import hasComputed from '@/views/hasComputed.vue'

describe('获取组件内的meta信息', () => {
  Vue.use(metaInfo)
  const container = document.createElement('head')
  it('组件内 metaInfo 为空', () => {
    let component = new Vue({})
    let vm = component.$mount(container)
    let $metaInfo = vm.$metaInfo
    expect($metaInfo).to.eql(undefined)
  })
  it('组件内存在computed', () => {
    let MetaComponent = Vue.extend(hasComputed)
    let vm = new MetaComponent().$mount(container)
    let $metaInfo = vm.$metaInfo
    expect($metaInfo.title).to.eql('computed')
  })
  it('组件内 metaInfo 是一个对象', () => {
    let MetaComponent = Vue.extend(bar)
    let vm = new MetaComponent().$mount(container)
    let $metaInfo = vm.$metaInfo
    expect($metaInfo.title).to.eql('bar')
  })
  it('组件内 metaInfo 是一个函数', () => {
    let MetaComponent = Vue.extend(foo)
    let vm = new MetaComponent().$mount(container)
    let $metaInfo = vm.$metaInfo
    expect($metaInfo.title).to.eql('foo')
  })
  it('组件内 metaInfo 异步更新', () => {
    let MetaComponent = Vue.extend(async)
    let vm = new MetaComponent().$mount(container)
    let $metaInfo = vm.$metaInfo
    setTimeout(() => {
      expect($metaInfo.title).to.eql('async')
    }, 2000)
  })
})
