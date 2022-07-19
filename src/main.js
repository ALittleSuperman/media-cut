import Vue from 'vue'
import App from './App.vue'
import 'reset-css'
import './index.css'
import router from './router/index'
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
