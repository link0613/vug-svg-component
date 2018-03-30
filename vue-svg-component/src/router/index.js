import Vue from 'vue'
import Router from 'vue-router'
import ParentCanvas from '@/components/ParentCanvas'
window.$ = window.jQuery = require('jquery')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ParentCanvas',
      component: ParentCanvas
    }
  ]
})
