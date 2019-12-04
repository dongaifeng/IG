import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import intelligence from './modules/intelligence'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    intelligence
  },
  getters
})

export default store