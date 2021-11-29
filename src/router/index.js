import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Error404 from '@/views/error/404'

import Global from '@/Global'

Vue.use(VueRouter)

// const redirect = (path, redirect) => ({
//     path,
//     redirect
// })
// const route = (path, component, title) => ({
//     path,
//     component,
//     meta: {
//         title
//     }
// })
const alias = (from, to, component, title) => ({
    path: to,
    component,
    alias: from,
    meta: {
        title
    }
})

const index = Global.isEmpty(Global.token) ? {
    url: '/login',
    component: Login,
    title: '登录'
} : {
    url: '/home',
    component: Home,
    title: '首页'
}
const routes = [
    alias('/', index.url, index.component, index.title)
]

routes.push(alias('*', '/404', Error404, '404'))

const router = new VueRouter({ routes })

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
