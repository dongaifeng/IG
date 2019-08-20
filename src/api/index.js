import request from '@/utils/request'


//下拉框数据获取
export function getmenu() {
  return request({
    url: '/menu',
    method: 'get',
  })
}

export function search(key) {
  return request({
    url: '/search',
    method: 'get',
    params: { key }
  })
}

// 基础列表查看
export function GetBasicList(data) {
  return request({
    url: '/ListView/GetBasicList',
    method: 'post',
    data
  })
}

