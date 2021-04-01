import {constantRoutes,asyncRoutes} from '@/router/index'
const state = {
    routes: constantRoutes || [],//全部的路由
    addRoutes: []//动态添加的路由
}
const mutations = {
    //合并路由
    SET_ROUTES: (state,routes) => {
        state.addRoutes = routes
        state.routes = constantRoutes.concat(routes)
    }
}
const actions = {
    generateRoutes({commit},roles) {
        return new Promise(resolve => {
            const accessedRoutes = asyncRoutes || []
            commit('SET_ROUTES',accessedRoutes)
            resolve(accessedRoutes) 
        })
    }
}
export default {
    // namespaced: true,
    state,
    mutations,
    actions
}