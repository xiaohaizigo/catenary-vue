import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'

import Index from '../views/User/dashboard/Index'
import Home from '../views/User/Home'
import AdminIndex from '../views/User/AdminIndex'
import RenYuanAdd from '../views/User/conmon/RenYuanAdd'
Vue.use(Router)

export default new Router({
  routes: [
    {
       path: '/login',
       name: 'Login',
       component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: AdminIndex,
      meta:{
        requireAuth: true
      },
      children: [
        {
          path: '/index/dashboard',
          name: 'Dashboard',
          component: Index,
          meta: {
             requireAuth: true
          }
        }
      ]
    }
    ]
})
export const createRouter = routes => new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: AdminIndex,
      meta:{
        requireAuth: true
      },
      children: [
        {
          path: '/index/dashboard',
          name: 'Dashboard',
          component: Index,
          meta: {
            requireAuth: true
          }
        }
      ]
    }
  ]
})
