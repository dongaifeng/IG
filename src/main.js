import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import VueTouchKeyboard from "vue-touch-keyboard";
// import "vue-touch-keyboard/dist/vue-touch-keyboard.css"; // load default style
import request from '@/utils/request'


Vue.prototype.$post = (name, page, where = []) => {
  let data = {
    DataSourceCode: name,
    IsPaging: !!page,
    CurrentPage: page && page.current || 1,
    PageSize: page && page.size || 10,
    QueryInfoArray: where
   }
  return request({
    url: '/Data/GetData',
    method: 'post',
    data
  })
}

// Vue.use(VueTouchKeyboard);

import '@/style/index.scss' // global css
import router from './router'
import store from './store/index'

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
