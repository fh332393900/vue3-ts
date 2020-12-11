const { createRouter, createWebHashHistory  } = require("vue-router");
import Layout from '../layout/index.vue'

export const constantRoutes = [{
    path: '/',
    component: Layout,
    redirect: '/goods',
    children: [{
        path: 'goods',
        component: () => import('../pages/goods/goods.vue'),
        name: 'goods',
        meta: { title: '工作台', icon: 'el-icon-monitor', affix: true },
    }] 
},{
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    meta: { title: '用户管理', icon: 'el-icon-user'},
    children: [{
        path: 'index',
        component: () => import('../pages/user/user.vue'),
        name: 'user',
        meta: { title: '用户列表', icon: 'el-icon-user'},
    },{
        path: 'add',
        component: () => import('../pages/user/user.vue'),
        name: 'add',
        meta: { title: '用户添加', icon: 'el-icon-user'},
    }]
}]
//权限路由，在store的permission中动态添加
export const asyncRoutes = []
const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes
})
export default router