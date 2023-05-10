import {createRouter , createWebHashHistory} from "vue-router";
import User from "../components/User.vue";
import Page from "../components/Page.vue";
import PageList from "../components/PageList.vue";

export const router = createRouter({

    history: createWebHashHistory(),
    routes: [

        {
            path: '/',
            component: User,
            alias: '/user'
        },
        {
            path: '/page/:id',
            component: Page,
            props: true
        },
        {
            path: '/page/list',
            component: PageList,
        }
    ]

})
