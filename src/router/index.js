import {createRouter , createWebHashHistory} from "vue-router";
import User from "../components/User.vue";
import Page from "../components/Page.vue";
import PageList from "../components/PageList.vue";

const router = createRouter({

    history: createWebHashHistory(),
    routes: [

        {
            path: '/',
            component: User,
        },
        {
            path: '/page',
            component: Page,
        },
        {
            path: '/page/list',
            component: PageList,
        }
    ]

})

export default router