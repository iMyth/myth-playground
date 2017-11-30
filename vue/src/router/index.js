import Vue from 'vue'
import Router from 'vue-router'
import ListSample from '@/views/ListSample'
import CarouselSample from '@/views/CarouselSample'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/list',
      name: 'ListSample',
      component: ListSample
    }, {
      path: '/carousel',
      name: 'Carousel',
      component: CarouselSample
    }
  ]
})
