import { createRouter, RouteRecordRaw, Router, createWebHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('./pages/homeview.vue')
    },
    {
        path: '/cat/:id',
        name: 'Cat',
        component: () => import('./pages/catditails.vue')
    },
    {
        path: '/:tabSelection',
        name: 'Home2',
        component: () => import('./pages/homeview.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('./pages/login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('./pages/register.vue')
    },{
        path: '/myposts',
        name: 'MyPosts',
        component: () => import('./pages/myposts.vue')
    },
    {
        path: '/settings',
        name: 'Settings',
        component: () => import('./pages/settings.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('./pages/about.vue')
    }
]

const router: Router = createRouter({
    history: createWebHistory(),
    routes
})

export default router