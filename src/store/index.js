import Vue from 'vue'
import Vuex from 'vuex'

import { notification } from './notification.module'
import { recording } from './recordings.module'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    notification,
    recording
  }
})
