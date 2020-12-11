<template>
    <div class="silder">
        <logo :collapse="isCollapse"></logo>
        <div class="scroll">
            <el-scrollbar wrap-class="scrollbar-wrapper" heght="100%">
                <el-menu
                    :default-active="activeMenu"
                    class="el-menu-vertical-demo"
                    background-color="#304156"
                    text-color="#bfcbd9"
                    :router="true"
                    :collapse="isCollapse"
                    mode="vertical">
                    <sidebar-item v-for="routeItem in permissionRoutes" :key="routeItem.path" :item="routeItem" :basePath="routeItem.path"></sidebar-item>
                </el-menu>
            </el-scrollbar>
        </div>
    </div>
</template>
<script>
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed, isRef } from 'vue'
export default {
    name: 'Sidebar',
    components: {Logo,SidebarItem},
    setup() {
        const store = useStore()
        const route = useRoute()

        const permissionRoutes = computed(() => store.getters.permissionRoutes)
        const sidebar = computed(() => store.getters.sidebar.open)  
        console.log(isRef(sidebar))
        const isCollapse = computed(() => !sidebar.value)
        const activeMenu = computed(() => {
            const {meta,path} = route
            if (meta.activeMenu) {
                return meta.activeMenu
            }
            return path
        })
        return {
            permissionRoutes,
            sidebar,
            isCollapse,
            activeMenu
        }
    }
}
</script>
<style lang="scss" scoped>
    .silder {
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.2);
        z-index: 10;
    }
    .scroll{
        height: 100%;
        z-index: 1000;
        background-color: #304156;
    }
    .scrollbar-wrapper {
        overflow-x: hidden !important;
        width: 210px;
    }
    .el-scrollbar__bar.is-vertical {
        right: 0px;
    }
    .el-scrollbar {
        height: 100%;
    }
    .el-menu {
        border: none;
        height: 100%;
        width: 100% !important;
        margin-bottom: 80px;
    }
</style>