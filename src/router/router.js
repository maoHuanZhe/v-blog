import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Login = () => import('../views/login')
const Home = () => import('../views/home')

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
        path:'',
        redirect:'/home'
    },
      {
          path: '/home',
          component: Home
      },
      {
          path: '/login',
          component: Login
      }
  ]
})
