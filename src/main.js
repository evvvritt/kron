import Vue from 'vue'
import App from './App.vue'
import router from './router'
import PrismicVue from 'prismic-vue'
import linkResolver from './prismic-link-resolver'
import VueScrollTo from 'vue-scrollto'
import VueHead from 'vue-head'

Vue.config.meta = { title: 'Cat Kron' }

Vue.use(VueScrollTo, { complement: Vue.config.meta.title })
Vue.use(VueHead)
Vue.use(PrismicVue, {
  endpoint: window.prismic.endpoint,
  linkResolver
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
