import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'

import Global from '@/Global'

Vue.use(VueRouter)

const index = Global.isEmpty(Global.token) ? '/login' : '/home'
const routes = [
    {
        path: '/',
        redirect: index
    },
    {
        path: '/login',
        component: Login,
        meta: {
            title: '登录'
        }
    },
    {
        path: '/home',
        component: Home,
        meta: {
            title: '首页'
        }
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    const { title } = to.meta
    if (title) {
        document.title = title + ' | Naive'
    }

    next()

    // if (Global.isEmpty(Global.token) && to.path !== '/' && to.path !== '/login') {
    //     next({
    //         path: '/',
    //         query: { from: to.fullPath }
    //     })
    // } else {
    //     next()
    // }
})

export default router
