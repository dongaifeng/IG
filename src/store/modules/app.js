import {
  post
} from '@/api'

const app = {
  namespaced: true,
  state: {
    menu: [],
    leaderList: [],
    IDVisiable: false,
    userInfo: null,
    departmentDetail: null
  },
  mutations: {
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    CHANGE_IDVIS: (state, flag) => {
      state.IDVisiable = flag
    },
    SET_LEADERLIST: (state, data) => {
      state.leaderList = data
    },
    SET_USERINFO: (state, data) => {
      state.userInfo = data
    },
    SET_DEPT_DEL: (state, data) => {
      state.departmentDetail = data
    }
  },
  actions: {
    departmentDetail({
      commit
    }, data) {
      commit('SET_DEPT_DEL', data)
    },
    setUserInfo({
      commit
    }, data) {
      commit('SET_USERINFO', data)
    },
    ToggleDevice({
      commit
    }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    changeIDVisiable({
      commit
    }, flag) {
      commit('CHANGE_IDVIS', flag)
    },
    set_leaderList({
      commit
    }) {
      post('1005', [{
        LogicalOperatorsCode: "10",
        key: "DELETE_FLAG",
        OperationalCharacterCode: "50",
        value: "0"
      }]).then(res => {
        commit('SET_LEADERLIST', res.data)
      })
    },

  }
}

export default app