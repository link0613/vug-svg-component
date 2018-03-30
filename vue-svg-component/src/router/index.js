import Vue from 'vue'
import Router from 'vue-router'
import CustomCircle from '@/components/CustomCircle'
window.$ = window.jQuery = require('jquery')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CustomCircle',
      component: CustomCircle
    }
  ]
})
