import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import VueTouchKeyboard from "vue-touch-keyboard";
// import "vue-touch-keyboard/dist/vue-touch-keyboard.css"; // load default style
import {
  post
} from '@/api'
import './icons'

import conf from '../public/conf'
Vue.prototype.$post = post
Vue.prototype.$conf = conf

// Vue.use(VueTouchKeyboard);

import '@/style/index.scss' // global css
import router from './router'
import store from './store/index'

Vue.config.productionTip = false
Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  // console.log(to, from, '路由')
  store.dispatch('app/timeHandle', conf.time)
  next()
})

function setRem() {

  // 320 默认大小16px; 320px = 20rem ;每个元素px基础上/16
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  // let htmlWidth = 1024;
  //得到html的Dom元素
  let htmlDom = document.getElementsByTagName('html')[0];
  //设置根元素字体大小
  htmlDom.style.fontSize = htmlWidth / 80 + 'px';
  // htmlDom.style.width = conf.width;
  // htmlDom.style.height = conf.height;
}
// 初始化
setRem();
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
}


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')