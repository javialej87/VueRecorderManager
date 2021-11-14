import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import { messageDialogMixin } from './mixins/messageDialogMixin'

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser')
  worker.start()
}

//------Mixins-----//
Vue.mixin(messageDialogMixin)
//-----------------//

new Vue({
  vuetify,
  store,
  render: (h) => h(App)
}).$mount('#app')
