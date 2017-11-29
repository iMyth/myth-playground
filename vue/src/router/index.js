import Vue from 'vue'
import Router from 'vue-router'
import ListSample from '@/views/ListSample'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/list',
      name: 'ListSample',
      component: ListSample
    }
  ]
})
