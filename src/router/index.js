import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Game = () => import('../components/Game.vue')

const router = new Router({
  mode: 'history',
  hashbang: false,
  routes: [
    { path: '/', component: Game, name: 'game' },
    { path: '*', redirect: '/' }
  ]
})

export default router
