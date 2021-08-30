import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/components/Home.vue';
import DetailPage from '@/components/DetailPage.vue';

Vue.use(VueRouter);

const routes = [
    {
        path : '/',
        component : Home
    },
    {
        path : '/page/:pageId',
        component : DetailPage,
        name : 'detailPage'
    }
]

const router = new VueRouter({
    mode : 'history',
    routes
});

export default router;