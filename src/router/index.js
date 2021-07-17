import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import('../views/Map.vue')
  },

  {
    path: '/current',
    name: 'Current',
    component: () => import('../views/Current.vue')
  },
  {
    path: '/dataStatistics',
    name: 'DataStatistics',
    component: () => import('../views/dataStatistics.vue')
  },
  {
    path: '/hosp',
    name: 'Hosp',
    component: () => import('../views/Hosp.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/basics/User.vue')
  },
  {
    path: '/roe',
    name: 'Roe',
    component: () => import('../views/basics/Roe.vue')
  },
  {
    path: '/hospital',
    name: 'Hospital',
    component: () => import('../views/admin/Hospital.vue')
  },
  {
    path: '/infoList',
    name: 'InfoList',
    component: () => import('../views/admin/InfoList.vue')
  },
  {
    path: '/article',
    name: 'Article',
    component: () => import('../views/admin/Article.vue')
  },
  {
    path: '/show',
    name: 'Show',
    component: () => import('../views/data/Show.vue')
  },
  {
    path: '/up',
    name: 'Up',
    component: () => import('../views/data/Up.vue')
  },
  {
    path: '/learn',
    name: 'Learn',
    component: () => import('../views/data/Learn.vue')
  },
  {
    path: '/hospMap',
    name: 'HospMap',
    component: () => import('../views/hospMap.vue')
  },
  {
    path: '/refuteSlanders',
    name: 'RefuteSlanders',
    component: () => import('../views/RefuteSlanders.vue')
  },
]

const router = new VueRouter({
  // mode: 'history',
  // mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
