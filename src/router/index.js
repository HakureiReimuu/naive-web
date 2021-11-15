import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login'
import Guide from '@/components/Guide'

Vue.use(VueRouter)

let index
if (window.localStorage['naive-server'] === undefined) {
    index = '/guide'
} else {
    index = '/login'
}

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
        path: '/guide',
        component: Guide,
        meta: {
            title: '初始化'
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
})

export default router
