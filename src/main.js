import Vue from 'vue'
import App from './App.vue'
import router from './router'
import PrismicVue from 'prismic-vue'
import linkResolver from './prismic-link-resolver'
import VueScrollTo from 'vue-scrollto'

Vue.config.productionTip = false

Vue.use(VueScrollTo)
Vue.use(PrismicVue, {
  endpoint: window.prismic.endpoint,
  linkResolver
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
