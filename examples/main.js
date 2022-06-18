import Vue from 'vue'
import App from './App.vue'
import 'amfe-flexible'
import 'reset-css'
import router from './router/index'
import Components from '../packages/index'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

Vue.prototype.$videojs = videojs
Vue.config.productionTip = false
Vue.use(Components)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
