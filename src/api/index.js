import request from '@/utils/request'


//下拉框数据获取
export function getmenu() {
  return request({
    url: '/menu',
    method: 'get',
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

