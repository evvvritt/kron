import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/articles/:uid',
          name: 'article',
          props: true,
          component: () => import(/* webpackChunkName: "about" */ './views/Article.vue')
        }
      ]
    },
    {
      path: '/articles',
      redirect: '/'
    }
  ]
})
