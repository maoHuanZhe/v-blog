import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '../store/store'

Vue.use(Router)

const Login = () => import('../views/login')
const Home = () => import('../views/home')

const router = new Router({
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
});
//不用验证的白名单
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
    NProgress.start();
    if (store.state.isLogin) {
        // 如果已经登录 就跳转到首页
        next()
    } else {
        //没有登录就跳转到登录页面
        if (whiteList.indexOf(to.path) !== -1) {
            // 在白名单中，直接进入
            next()
        } else {
            // 其他无权访问的页面将重定向到登录页面。
            next({path: '/login'})
        }

    }
});

router.afterEach(()=>{
    NProgress.done()
})
export default router
