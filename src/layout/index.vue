<template>
    <div :class="{hideSidebar: isHideSider}" class="app-warpper">
        <sidebar class="sidebar-container"></sidebar>
        <div class="main-container">
            <div>
                <navbar></navbar>
                <tags-view></tags-view>
            </div>
            <app-main></app-main>
        </div>
    </div>
</template>
<script>
import Sidebar from './Sidebar/index.vue'
import AppMain from './AppMain.vue'
import Navbar from './Navbar.vue'
import TagsView from './TagsView/index.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useResize } from '@/hook/useResize'
import { useDebounce } from '@/hook/useDebounce'
export default {
    components: {Navbar,AppMain,Sidebar,TagsView},
    setup() {
        const store = useStore()
        const sidebarRef = computed(() => store.getters.sidebar.open)
        const isHideSider = computed(() => !sidebarRef.value)

        const WIDTH = 1024
        const { body } = document
        const isMobile = () => {
            //可视区域
            const rect = body.getBoundingClientRect()
            return rect.width - 1 < WIDTH
        }
        //窗口宽度发生改变时
        const resizeHandler = () => {
            if (!document.hidden) {
                const isMobileValue = isMobile()
                if (isMobileValue) {
                    store.dispatch('app/changeSiderBar', false)
                } else {
                    store.dispatch('app/changeSiderBar', true)
                }
            }
        }
        let resizeHandlerFn = resizeHandler
        const [debounceResize] = useDebounce(resizeHandler, 200)
        resizeHandlerFn = debounceResize
        useResize(resizeHandlerFn)
        return {
            sidebarRef,
            isHideSider,
            isMobile,
            resizeHandler
        }
    }
}
</script>
<style lang="scss" scoped>
    .app-warpper {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .sidebar-container{
        width: 210px;
        height: 100%;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        transition: width 0.3s;
        
    }
    .main-container {
        min-height: 100%;
        margin-left: 210px;
        position: relative;
        transition: margin-left 0.3s;
    }
    //固定header的样式，width需要动态计算
    // .fixed-header {
    //     position: fixed;
    //     top: 0;
    //     right: 0;
    //     width: calc(100% - 210px);
    //     z-index: 9;
    // }
    // .app-main {
    //     margin-top: 84px;
    // }
    .hideSidebar {
        .sidebar-container {
            width: 62px !important;
        }
        .main-container {
            margin-left: 62px;
        }
    }
</style>