<template>
    <div v-if="!item.hidden">
        <template v-if="hasOneShowingChild(item.children,item)">
            <router-link :to="resolvePath(onlyOneChild.path)">
                <el-menu-item :index="resolvePath(onlyOneChild.path)">
                    <i :class="onlyOneChild.meta.icon"></i>
                    <template #title>{{onlyOneChild.meta.title}}</template>
                </el-menu-item>
            </router-link>
        </template>
        <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body>
            <template #title>
                <i :class="item.meta.icon"></i>
                <span>{{item.meta.title}}</span>
            </template>
            <router-link v-for="child in item.children" :key="child.path" :to="resolvePath(child.path)">
                <el-menu-item :index="resolvePath(child.path)">
                    <span>{{child.meta.title}}</span>
                </el-menu-item>
            </router-link>
        </el-submenu>
    </div>
</template>
<script>
import path from 'path'
import { ref, unref } from 'vue'
export default {
    name: 'SidebarItem',
    props: {
        item: {
            type: Object,
            required: true
        },
        basePath: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        let onlyOneChild = ref('')
        /**
         * 判断路由下是不是只有一个children，只有一个的话菜单直接使用el-menu-item包裹
         * 当一个路由下面的 children 声明的路由大于>1 个时，自动会变成嵌套的模式
         *@author fenghang
         *@version v3
         */ 
        const hasOneShowingChild = (children = [],parent) => {
            if (parent.meta && parent.meta.notOnly) {
                return false
            } else {
                if (children.length === 1) {
                    children.filter(item => {
                        onlyOneChild.value = item
                    })
                    return true
                }
                return false
            }
        }
        /**
         * 拼接路由
         *@author fenghang
         *@version v3
         */
        const resolvePath = (routePath) => {
            if (!routePath) return
            return path.resolve(props.basePath,routePath) 
        }
        return {
            onlyOneChild,
            hasOneShowingChild,
            resolvePath
        }
    }
}
</script>
<style lang="scss" scoped>
    .el-submenu .el-menu-item {
        background-color: #1f2d3d !important;

        &:hover {
            background-color: #001528 !important;
        }
    }
    .el-menu-item:hover{
        outline: 0 !important;
        color: #1979f1 !important;
    }
    .el-menu-item:hover > i {
        color: #1979f1 !important;
    }
    .el-menu-item.is-active {
        color: #1979f1 !important;
    }
    /deep/ {
        a {
            text-decoration: none;
        }
        // /*隐藏文字*/
        // .el-menu--collapse  .el-submenu__title span{
        //     display: none;
        // }
        // /*隐藏 > */
        // .el-menu--collapse  .el-submenu__title .el-submenu__icon-arrow{
        //     display: none;
        // }

    } 
</style>