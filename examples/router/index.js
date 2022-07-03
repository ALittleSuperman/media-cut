import VueRouter from 'vue-router'
import Vue from 'vue'
import Video from '../pages/video.vue'
import Preview from '../pages/preview'
Vue.use(VueRouter)
const routes = [
  {
    path: '/video',
    component: Video
  },
  {
    path: '/PreviewVideo',
    component: Preview
  }
]
const Router = new VueRouter({
  mode: 'history',
  routes
})
export default Router
