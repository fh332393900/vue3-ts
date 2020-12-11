<template>
    <div class="navbar">
        <div class="navbar-left">
            <hamburger class="hamburger-icon" :is-active="sidebar.open" @toggleClick="toggleSidebar"></hamburger>
            <breadcrumb></breadcrumb>
        </div>
        <div class="navbar-menu">
            <div class="right-menu-item">
               
            </div>
            <!-- <el-dropdown class="avatar-container" trigger="click">
                <div class="avatar-wrapper">
                    <el-avatar class="user-avatar" src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"></el-avatar>
                    <i class="el-icon-caret-bottom" />
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <span style="display:block;" @click="logout">退出登录</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown> -->
            
        </div>
    </div>
</template>
<script>
import Hamburger from '../components/Hamburger/index.vue'
import Breadcrumb from '../components/Breadcrumb/index.vue'
import {mapGetters} from 'vuex'
export default {
    name: 'Navbar',//头部区域
    components: {Hamburger,Breadcrumb},
    computed: {
        ...mapGetters([
            'sidebar'
        ]),
    },
    created() {
        
    },
    methods: {
        /**
         * 交替点击菜单伸缩的按钮
         * @author fenghang
         * @version v1
         */
        toggleSidebar() {
            this.$store.dispatch({type: 'app/toggleSideBar'})
        },
        logout() {
            
        }
    }
}
</script>
<style lang="scss" scoped>
    .navbar {
        height: 50px;
        box-shadow: 0 1px 4px rgba(0,21,41,.08);
        background-color: #fff;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &-left {
            display: flex;
            .hamburger-icon {
                line-height: 46px;
                height: 100%;
                cursor: pointer;
                transition: background .3s;
                &:hover {
                    background: rgba(0, 0, 0, .025)
                }
            }
        }
        &-menu {
            height: 100%;
            .right-menu-item {
                display: inline-block;
                height: 100%;
                font-size: 25px;
                color: #5a5e66;
                line-height: 50px;
                margin-right: 10px;
                vertical-align: text-bottom;
                cursor: pointer;
                &:hover {
                    background: rgba(0, 0, 0, .025)
                }
            }
            .avatar-container {
                margin-right: 40px;
                .avatar-wrapper {
                    margin-top: 5px;
                    position: relative;
                    .user-avatar {
                        cursor: pointer;
                        width: 40px;
                        height: 40px;
                        border-radius: 10px;
                    }
                    .el-icon-caret-bottom {
                        cursor: pointer;
                        position: absolute;
                        right: -20px;
                        top: 25px;
                        font-size: 12px;
                    }
                }
                &:hover {
                    background: rgba(0, 0, 0, .025)
                }
            }
        }
    }
</style>