import Vue from 'vue'
import App from './App.vue'
import 'reset-css'
import './index.css'
import router from './router/index'
import Components from '../packages/index'

Vue.config.productionTip = false
Vue.use(Components)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
