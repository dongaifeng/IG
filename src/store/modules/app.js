import { post } from '@/api'

const app = {
  state: {
    menu: [],
    leaderList: []
  },
  mutations: {
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_LEADERLIST: (state, data) => {
      state.leaderList = data
    }
  },
  actions: {
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    set_leaderList({ commit }) {
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
