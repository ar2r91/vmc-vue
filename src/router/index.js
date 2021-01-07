import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router);

const router = new Router({
    mode: 'history',
    linkActiveClass: 'open active',
    routes: [
        {
            path: '/',
            name: 'Message',
            component: () => import('@/pages/Message/index'),
        },
    ]
});

router.beforeEach((to, from, next) => {
    let isAuth = store.getters['user/isLoggedIn'];
    let requiresAuth = to.meta.requiresAuth || false;

    store.commit('loading');

    if (requiresAuth && !isAuth) {
        store.commit('endLoading');
        next('/login');
    }

    next();
});

router.afterEach((to, from) => {
    store.commit('endLoading');
});


export default router;
