/**
 * @author monkeywang
 * Date: 17/9/7
 */
import operate from '../../../src/metaOperate/operate'
import Vue from 'vue'

describe('测试为dom设置meta信息', () => {
  const container = document.createElement('head')
  let vm = new Vue()
  vm.$mount(container)
  it('setMetaInfo 传入空对象', () => {
    operate().setMetaInfo({})
    expect(document.title).to.eql('')
  })
  it('setMetaInfo 传入title', () => {
    operate().setMetaInfo({
      title: 'test'
    })
    expect(document.title).to.eql('test')
  })
  it('setMetaInfo 传入title meta', () => {
    operate().setMetaInfo({
      title: 'test',
      meta: [{
        name: 'keyWords',
        content: 'test'
      }]
    })
    let metaNd = document.querySelectorAll('[data-vue-meta-info]')
    expect(metaNd.length).to.be.not.equal(0)
  })
})
