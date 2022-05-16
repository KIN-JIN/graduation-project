import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// 引用css样式
import "@/assets/css/global.less"
import "@/assets/css/screen.less"
import SocketService from '@/utils/socket_service'
import './assets/font/iconfont.css'

SocketService.Instance.connect()
Vue.prototype.$socket = SocketService.Instance

// 请求基准路径的配置
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/'
// 将axios挂载到vue原型对象上
Vue.prototype.$http = axios

// 将全局的echarts对象挂载到vue的原型对象上
// 别的组件可以使用$echarts即可使用
Vue.prototype.$echarts = window.echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
