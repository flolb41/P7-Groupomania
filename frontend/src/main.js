import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import bootstrap from 'bootstrap'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  bootstrap,
  render: h => h(App)
}).$mount('#app')

Vue.prototype.$http = Axios;
      const token = localStorage.getItem('token');
      if (token) {
        Vue.prototype.$http.defaults.headers.common['Authorization'] = token
      }
