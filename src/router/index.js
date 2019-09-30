import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

Vue.use(Router)

const Login = () => import('@/views/login')
const Home = () => import('@/views/home')

import { Message } from 'element-ui'
// 从cookie中获取token
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false })

// 如果设置为true，则它不会出现在侧边栏导航中。
// e.g. login or 401 page or as some editing pages /edit/1 (Default: false)
// hidden: true
// 设置noRedirect时，无法在面包屑导航中单击此路由
// redirect: noRedirect
// 当您在多条路线声明的下方路由孩子时，
// 它将自动变为嵌套模式-例如组件页面
// 当只有一个时，子路径将显示为根路径
// 如果您想显示您的根本路线
// 不管路线下的儿童申报数量如何
// 您可以设置alwaysShow：true
// 这样它将忽略先前定义的规则，并始终显示根路由
// alwaysShow: true
// 设置路由器名称。必须进行设置，以避免<keep-alive>出现问题。
// name: 'router-name'
// meta: {
    // 导航到该路线所需的角色。支持多种权限堆叠。
    // 如果未设置，则表示它不需要任何权限。
    // roles: ['admin', 'editor']
    // 在各种组件（例如，边栏，面包屑）中显示的路线标题
    // title: 'title'
    // svg icon class
    // icon: 'svg-name'
    // 设置为true时，<keep-alive>将不会缓存该路由。默认为假
    // noCache: true
    // 如果为false，则该项将隐藏在面包屑中（默认为true）
    // breadcrumb: false
// }

/**
 * constantRoutes
 * 没有权限要求的基本页面
 * 所有角色都可以访问
 */
export const constantRoutes = [
    {
        path: '/redirect',
        component: Home,
        hidden: true,
        children: [
            {
                path: '/redirect/:path*',
                component: () => import('@/views/redirect/index')
            }
        ]
    },
    {
        path: '/login',
        component: Login,
        hidden: true
    },
    {
        path: '/auth-redirect',
        component: () => import('@/views/login/auth-redirect'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/error-page/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/views/error-page/401'),
        hidden: true
    },
    {
        path: '/',
        component: Home,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/dashboard/index'),
                name: '首页',
                meta: { title: '首页', icon: 'dashboard', affix: true }
            }
        ]
    },
    {
        path: '/guide',
        component: Home,
        redirect: '/guide/index',
        children: [
            {
                path: 'index',
                component: () => import('@/views/guide/index'),
                name: '指南',
                meta: { title: '指南', icon: 'guide', noCache: true }
            }
        ]
    },
    {
        path: '/article',
        component: Home,
        redirect: '/article/index',
        meta: { title: '博客管理', icon: 'guide', noCache: true },
        children: [
            {
                path: 'index',
                component: () => import('@/views/article/index'),
                name: '博客列表',
                meta: { title: '博客列表', icon: 'guide', noCache: true }
            },
            {
                path: 'article-add-or-update',
                component: () => import('@/views/article/article-add-or-update'),
                name: '新增博客',
                meta: { title: '新增博客', icon: 'guide', noCache: true }
            }
        ]
    },
    {
        path: '/book',
        component: Home,
        redirect: '/book/index',
        meta: { title: '阅读管理', icon: 'guide', noCache: true },
        children: [
            {
                path: 'index',
                component: () => import('@/views/book/index'),
                name: '图书管理',
                meta: { title: '图书管理', icon: 'guide', noCache: true }
            },
            {
                path: 'book-add-or-update',
                component: () => import('@/views/book/book-add-or-update'),
                name: '新增图书',
                meta: { title: '新增图书', icon: 'guide', noCache: true }
            },
            {
                path: 'note',
                component: () => import('@/views/book/note'),
                name: '笔记管理',
                meta: { title: '笔记管理', icon: 'guide', noCache: true }
            },
            {
                path: 'note-add-or-update',
                component: () => import('@/views/book/note-add-or-update'),
                name: '新增笔记',
                meta: { title: '新增笔记', icon: 'guide', noCache: true }
            }
        ]
    },
    {
        path: '/operation',
        component: Home,
        redirect: '/operation/index',
        meta: { title: '运营管理', icon: 'guide', noCache: true },
        children: [
            {
                path: 'category',
                component: () => import('@/views/operation/category'),
                name: '分类管理',
                meta: { title: '分类管理', icon: 'guide', noCache: true }
            },
            {
                path: 'tag',
                component: () => import('@/views/operation/tag'),
                name: '标签管理',
                meta: { title: '标签管理', icon: 'guide', noCache: true }
            },
            {
                path: 'recommend',
                component: () => import('@/views/operation/recommend'),
                name: '推荐管理',
                meta: { title: '推荐管理', icon: 'guide', noCache: true }
            },
            {
                path: 'link',
                component: () => import('@/views/operation/link'),
                name: '友链管理',
                meta: { title: '友链管理', icon: 'guide', noCache: true }
            }
        ]
    },
    {
        path: '/system',
        component: Home,
        redirect: '/system/index',
        meta: { title: '系统管理', icon: 'guide', noCache: true },
        children: [
            {
                path: 'user',
                component: () => import('@/views/system/user'),
                name: '用户管理',
                meta: { title: '用户管理', icon: 'guide', noCache: true }
            },
            {
                path: 'role',
                component: () => import('@/views/system/role'),
                name: '角色管理',
                meta: { title: '角色管理', icon: 'guide', noCache: true }
            }
        ]
    },
    {
        path: '/profile',
        component: Home,
        redirect: '/profile/index',
        hidden: true,
        children: [
            {
                path: 'index',
                component: () => import('@/views/profile/index'),
                name: '档案',
                meta: { title: '档案', icon: 'user', noCache: true }
            }
        ]
    }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router

//不做验证的路径
const whiteList = ['/login', '/auth-redirect']

router.beforeEach(async(to, from, next) => {
    NProgress.start()

    // 设置页面标题
    document.title = getPageTitle(to.meta.title)

    // 确定用户是否已登录
    const hasToken = getToken()

    if (hasToken) {
        if (to.path === '/login') {
            // 如果已登录，请重定向到主页
            next({ path: '/' })
        } else {
            // 确定用户是否已通过getInfo获得其权限角色
            const hasRoles = store.getters.roles && store.getters.roles.length > 0
            if (hasRoles) {
                next()
            } else {
                try {
                    // 获取用户信息
                    // 注意：角色必须是对象数组！例如：['admin']或，['developer'，'editor']
                    const { roles } = await store.dispatch('user/getInfo')
                    // 根据角色生成可访问的路由
                    const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
                    // 动态添加可访问的路由
                    router.addRoutes(accessRoutes)

                    // hack方法，以确保addRoutes是完整的
                    // 设置replace：true，因此导航将不会留下历史记录
                    next({ ...to, replace: true })
                } catch (error) {
                    // 删除令牌并进入登录页面重新登录
                    await store.dispatch('user/resetToken')
                    Message.error(error || 'Has Error')
                    next(`/login?redirect=${to.path}`)
                }
            }
        }
    } else {
        //没有令牌
        if (whiteList.indexOf(to.path) !== -1) {
            // 在白名单中
            next()
        } else {
            // 其他无权访问的页面将重定向到登录页面。
            next(`/login?redirect=${to.path}`)
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})
