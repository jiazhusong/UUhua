// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import App from './App'
FastClick.attach(document.body)
import Api from './api/index.js';
import  { LoadingPlugin } from 'vux'
Vue.use(LoadingPlugin)
Vue.prototype.$api = Api;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
