const state = {
    sidebar: {
        open: true,//控制菜单伸缩
    }
}
const mutations = {
    TOGGLE_SIDEBAR: state => {
        
        state.sidebar.open = !state.sidebar.open
    },
    CHANGE_SIDERBAR: (state,value) => {
        state.sidebar.open = value
    },
}
const actions = {
    toggleSideBar({ commit }) {
        commit('TOGGLE_SIDEBAR')
    },
    changeSiderBar({commit},value) {
        commit('CHANGE_SIDERBAR',value)
    },
}
export default {
    namespaced: true,//引入时需加上模块名
    state,
    mutations,
    actions
}