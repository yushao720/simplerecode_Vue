import Vue from 'vue'
import Vuex from 'vuex'
// import * as type from './mutationType'
import modulesOne from './modules/modulesOne'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
Vue.use(Vuex)

const state = {
  websock: {}
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: {
    modulesOne,
  }
})
