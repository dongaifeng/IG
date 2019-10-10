import axios from 'axios'
import Vue from 'vue'
import {
  Message
} from 'element-ui'
// import store from '../store'
// import { getToken } from '@/utils/auth'

// const errCode = {
//   '200': '服务器成功返回请求的数据。',
//   '201': '新建或修改数据成功。',
//   '202': '一个请求已经进入后台排队（异步任务）。',
//   '204': '删除数据成功。',
//   '400': '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//   '401': '用户没有权限（令牌、用户名、密码错误）。',
//   '403': '用户得到授权，但是访问是被禁止的。',
//   '404': '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//   '406': '请求的格式不可得。',
//   '410': '请求的资源被永久删除，且不会再得到的。',
//   '422': '当创建一个对象时，发生一个验证错误。',
//   '500': '服务器发生错误，请检查服务器。',
//   '502': '网关错误。',
//   '503': '服务不可用，服务器暂时过载或维护。',
//   '504': '网关超时。',
//   'default': '系统未知错误,请反馈给管理员'
// }

// loading框设置局部刷新，且所有请求完成后关闭loading框
let loading;

function startLoading() {
  loading = Vue.prototype.$loading({
    lock: true,
    text: "数据加载中...",
    target: document.querySelector('.loading-area') //设置加载动画区域
  });
}

function endLoading() {
  loading.close();
}

//声明一个对象用于存储请求个数
let needLoadingRequestCount = 0;

function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
}

function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
}

// console.log(process.env.VUE_APP_BASE_API, '<======request')

// 创建axios实例 
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true,
  timeout: 15000
})

// request拦截器
service.interceptors.request.use(
  config => {
    // if (store.getters.token) {
    //   config.headers['X-Token'] = getToken()
    // }
    showFullScreenLoading()
    return config
  },
  error => {
    tryHideFullScreenLoading()
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    tryHideFullScreenLoading()
    const status = response.status
    if (status !== 200) {
      Message({
        message: '系统错误，请联系管理员',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    } else {
      if (response.data.result === 'success') { // 判断请求是否成功

        if (response.data.data != null && response.data.data != '') { // 判断数据是否存在
          response.data.data = JSON.parse(response.data.data.replace(/\n/g, "\\n").replace(/\r/g, "\\r"))
          // response.data.data = JSON.parse(json.replace(/\n/g,"\\n").replace(/\r/g,"\\r"))
          return response.data
        } else {
          return response.data
        }

      } else {
        Message({
          message: '系统错误，请联系管理员',
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(response.data.data)
      }
    }
  },
  error => {
    tryHideFullScreenLoading()

    Message({
      message: '系统错误，请联系管理员',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service