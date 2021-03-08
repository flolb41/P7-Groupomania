import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import bootstrap from 'bootstrap'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  bootstrap,
  BootstrapVue,
  IconsPlugin,
  render: h => h(App)
}).$mount('#app')

Vue.prototype.$http = Axios;
      const token = localStorage.getItem('token');
      if (token) {
        Vue.prototype.$http.defaults.headers.common['Authorization'] = token
      }
                                                                                                 