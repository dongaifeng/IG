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

export function getList(data) {
  return request({
    url: '/getList',
    method: 'post',
    data
  })
}

export function GetBasicList(data) {
  return request({
    url: '/ListView/GetBasicList',
    method: 'post',
    data
  })
}
export function GetData(data) {
  return request({
    url: '/Data/GetData',
    method: 'post',
    data
  })
}



// IsPaging：是否分页 布尔类型
// CurrentPage：当前页 int类型
// PageSize：页大小 int类型
// DataSourceCode：数据源编码（从[DATA_SOURCE]表取[DATA_SOURCE_CODE]字段的值）
// QueryInfoArray：查询条件 string字符串
// 结构说明：[
//   {
//     "LogicalOperatorsCode": "10",//逻辑运算符编码 必填（[SYSTEM_DICT]表取[DICT_CODE]为LogicalOperators的[CLASS_CODE]字段的值）
//     "OperationalCharacterCode": "80",//运算符编码 必填（[SYSTEM_DICT]表取[DICT_CODE]为OperationalCharacter的[CLASS_CODE]字段的值）
//     "key": "[DEPT_CODE]",//列名称
//     "value": "'010','020','030','040','050'"//值
//   },
//   {
//     "LogicalOperators": "",
//     "OperationalCharacter": "",
//     "LogicalOperatorsCode": "10",
//     "OperationalCharacterCode": "100",
//     "key": "[DEPT_NAME]",
//     "value": "部"
//   }
// ]

