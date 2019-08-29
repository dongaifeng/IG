import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import VueTouchKeyboard from "vue-touch-keyboard";
// import "vue-touch-keyboard/dist/vue-touch-keyboard.css"; // load default style
import { post } from '@/api'


Vue.prototype.$post = post

// Vue.use(VueTouchKeyboard);

import '@/style/index.scss' // global css
import router from './router'
import store from './store/index'

Vue.config.productionTip = false
Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  // console.log(to, from, '路由')
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
