import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/index.scss' // global css
import router from './router'
import store from './store/index'

import {
  post
} from '@/api'
import './icons'

import conf from '../public/conf'

Vue.prototype.$post = post
Vue.prototype.$conf = conf
Vue.prototype.$imgSrc = (icon) => {
  return {
    backgroundImage: 'url(' + icon + ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain'
  }
}

Vue.prototype.$where = (str) => {
  let del = {
    LogicalOperatorsCode: '10',
    key: 'DELETE_FLAG',
    OperationalCharacterCode: '50',
    value: '0'
  }
  let ab = {
    LogicalOperatorsCode: '10',
    key: 'IS_ENABLED',
    OperationalCharacterCode: '50',
    value: '1'
  }
  if (str === 'del') {
    return [del]
  } else if (str === 'ab') {
    return [ab]
  } else if (str === 'all') {
    return [ab, del]
  }
}

Vue.config.productionTip = false
Vue.use(ElementUI)

// resize事件 改变html的fontSize，pxTorem 会将px转为rem 达到自适应(PX, Px, pX除外)
setRem();
window.onresize = function () {
  setRem()
}

function setRem() {
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  // let htmlWidth = 1024;
  let htmlDom = document.getElementsByTagName('html')[0];
  // 根据html宽度 设置根元素字体大小 约等于16px
  htmlDom.style.fontSize = htmlWidth / 83 + 'px';
  // htmlDom.style.width = conf.width;
  // htmlDom.style.height = conf.height;
}

router.beforeEach((to, from, next) => {
  store.dispatch('app/timeHandle', conf.time)
  next()
})

let hash = location.hash.slice(2)

if (hash !== '' && hash !== null) {
  let arr = hash.split('_')
  // console.log(arr)
  if (arr[0] === 'hash') {
    localStorage.setItem("hash", arr[1]);
  }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')