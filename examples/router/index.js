import VueRouter from 'vue-router'
import Vue from 'vue'
import Video from '../pages/video'
Vue.use(VueRouter)
const routes = [
  {
    path: '/video',
    component: Video
  }
]
const Router = new VueRouter({
  mode: 'history',
  routes
})
export default Router
