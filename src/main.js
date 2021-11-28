import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueAxios from 'vue-axios'
import axios from 'axios'
import md5 from 'js-md5'
import Global from './Global'

Vue.config.productionTip = false
Vue.prototype.$global = Global
Vue.prototype.$md5 = md5

Vue.use(VueAxios, axios)

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')
