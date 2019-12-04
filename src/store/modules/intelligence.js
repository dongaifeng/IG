export default {
  state: {
    symptom: '',
    part: '',
    question: []
  },

  mutations: {
    SET_symptom: (state, data) => {
      state.symptom = data
    },
    SET_part: (state, data) => {
      state.part = data
    },
    SET_question: (state, data) => {
      if(data == 'clear'){
        state.question=[]
      } else {
        state.question.push(data)
      }
       
    }
  },

  actions: {
    setSymptom({ commit }, data) {
      commit('SET_symptom', data)
    },
    setPart({ commit }, data) {
      commit('SET_part', data)
    },
    setQuestion({ commit }, data) {
      commit('SET_question', data)
    }
  }
}
