import Vue from 'vue'
import Router from 'vue-router'

const Foo = () => import('@/views/foo.vue')
const Bar = () => import('@/views/bar.vue')
const Async = () => import('@/views/async.vue')

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Foo',
      component: Foo
    },
    {
      path: '/bar',
      name: 'Bar',
      component: Bar
    },
    {
      path: '/Async',
      name: 'Async',
      component: Async
    }
  ]
})

export default router
