import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import {
  post
} from '@/api'
import './icons'

import conf from '../public/conf'

Vue.prototype.$post = post
Vue.prototype.$conf = conf



// import VueTouchKeyboard from "vue-touch-keyboard";
// import "vue-touch-keyboard/dist/vue-touch-keyboard.css"; // load default style
// Vue.use(VueTouchKeyboard);

import '@/style/index.scss' // global css
import router from './router'
import store from './store/index'

Vue.config.productionTip = false
Vue.use(ElementUI)

// resize事件 改变html的fontSize，pxTorem 会将px转为rem 达到自适应(PX, Px, pX除外)
setRem();
window.onresize = function () {
  setRem()
}

router.beforeEach((to, from, next) => {
  // console.log(to, from, '路由')
  store.dispatch('app/timeHandle', conf.time)
  next()
})


function setRem() {
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  // let htmlWidth = 1024;
  let htmlDom = document.getElementsByTagName('html')[0];
  // 根据html宽度 设置根元素字体大小 约等于16px
  htmlDom.style.fontSize = htmlWidth / 83 + 'px';
  // htmlDom.style.width = conf.width;
  // htmlDom.style.height = conf.height;
}



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')