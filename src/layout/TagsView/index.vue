<template>
    <div class="tags-view">
        <scroll-pane ref="scrollPane" class="tags-view-wrapper">
            <router-link 
                class="tags-view-item"
                ref="tagsRef"
                v-for="tag in visitedViews"
                :class="isActive(tag) ? 'active' : ''"
                :key="tag.path" 
                :to="{path: tag.path,query: tag.query}"
            >
                <i :class="tag.meta.icon" v-if="isActive(tag)"></i>
                {{tag.title}}
                <span v-if="!tag.meta.affix" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)"></span>
            </router-link>
        </scroll-pane>
        <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
            <li @click="closeOthersTags">关闭其他</li>
            <li @click="closeAllTags(selectedTag)">关闭所有</li>
        </ul>
    </div>
</template>
<script>
import ScrollPane from './ScrollPane.vue'
import path from 'path'
import { useStore } from 'vuex'
import { computed, isRef, reactive, ref, unref, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default {
    name: 'TagsView',//标签页
    components: {ScrollPane},
    setup() {
        const store = useStore()
        const route = useRoute()
        const router = useRouter()
        const visitedViews = computed(() => store.state.tagsView.visitedViews)
        const routes = computed(() => store.state.permission.routes)
        

        watch(route,() => {
            addTags()
            moveToCurrentTag()
        })
        const state = reactive({
            visible: false,
            left: 0,
            top: 0,
            selectedTag: {},
            affixTags: []
        })
        const visibleRef = ref(false)
        const leftRef = ref(0)
        const topRef = ref(0)
        const selectedTagRef = ref({})
        let affixTagsRef = ref(0)
        /**
         * 初始化标签
         * @author fenghang
         * @version v1
         */
        const initTags = () => {
            affixTagsRef.value = filterAffixTags(routes)
            for(const tag of affixTagsRef.value) {
                if (tag.name) {
                    store.dispatch('addVisitedView',tag)
                }
            }
        }
        /**
         * 筛选路由中带有affix的标签，一进入项目默认开启的标签，这部分标签不能关闭
         * @author fenghang
         * @param {Object,String}
         * @version v1
         */
        function filterAffixTags(routesRef,basePath ='/') {
            let tags = []
            const routesArr = unref(routesRef)
            routesArr.forEach(routeItem => {
                if (routeItem.path == '/') { 
                    const tagPath = path.resolve(basePath,routeItem.children[0].path)
                    tags.push({
                        fullPath: tagPath,
                        path: tagPath,
                        name: routeItem.children[0].name,
                        meta: routeItem.children[0].meta
                    }) 
                }
            })
            return tags
        }
        function addTags() {
            const { name } = route
            if (name) {
                store.dispatch('addVisitedView',route)
            }
        }
        /**
         * 标签跟随移动
         * @author fenghang
         * @version v1
         */
        const tagsRef = ref(null)
        function moveToCurrentTag() {
            // nextTick(() => {
            //     for (const tag of tagsRef) {
            //         if (tag.to.path === route.path) {
            //             this.$refs.scrollPane.moveToTarget(tag)
            //             break
            //         }
            //     }
            // })
        }
        /**
         * 关闭标签
         * @author fenghang
         * @param {Object}
         * @version v1
         */
        function closeSelectedTag(tag) {
            store.dispatch('delVisitedView',tag).then(visitedViews => {
                this.toLastView(visitedViews,tag)
            })
        }
        /**
         * 关闭标签时，如果是当前标签就跳转到最后一个标签
         * @author fenghang
         * @param {Object,Object}
         * @version v3
         */
        function toLastView(visitedViews,view) {
            const lastView = visitedViews.slice(-1)[0]
            //如果关闭的是其他标签就不做跳转
            if (lastView && lastView.fullPath != route.fullPath) {
                router.push(lastView.fullPath)
            }
        }
        initTags()
        addTags()
        return {
            visitedViews,
            routes,
            visibleRef,
            leftRef,
            topRef,
            selectedTagRef,
            affixTagsRef,
            initTags,
            filterAffixTags,
            addTags,
            tagsRef,
            moveToCurrentTag,
            closeSelectedTag,
            toLastView
        }
    },
    watch: {
        //监听关闭菜单是否打开
        visible(value) {
            if (value) {
                document.body.addEventListener('click', this.closeMenu)
            } else {
                document.body.removeEventListener('click', this.closeMenu)
            }
        }
    },
    methods: {
        isActive(route) {
            return route.path === this.$route.path
        },
        
        
        
        //关闭其他的标签
        closeOthersTags() {
            //选择的标签是当前路由，就不用跳转
            if(this.$route.path != this.selectedTag.path) {
                this.$router.push(this.selectedTag)
            }
            this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
                this.moveToCurrentTag()
            })
            //this.$store.dispatch('removeOtherKey',this.selectedTag.fullPath)
        },
        //关闭所有的标签
        closeAllTags(view) {
            this.$store.dispatch('delAllViews').then(({ visitedViews }) => {
                if (this.affixTags.some(tag => tag.path === view.path)) {
                    return
                }
                this.toLastView(visitedViews, view)
            })
            this.$store.dispatch('clearQuery')
        },
        //鼠标右键点击标签，展示关闭菜单
        openMenu(tag,e) {
            const menuMinWidth = 105
            const offsetLeft = this.$el.getBoundingClientRect().left // 容器左内边距 
            const offsetWidth = this.$el.offsetWidth // 容器宽度
            const maxLeft = offsetWidth - menuMinWidth 
            const left = e.clientX - offsetLeft + 15 

            if (left > maxLeft) {
                this.left = maxLeft
            } else {
                this.left = left
            }

            this.top = e.clientY
            this.visible = true
            this.selectedTag = tag
        },
        //点击任意区域，隐藏关闭菜单
        closeMenu() {
            this.visible = false
        }
    }
}
</script>
<style lang="scss" scoped>
    .tags-view {
        height: 34px;
        width: 100%;
        background: #fff;
        border-bottom: 1px solid #d8dce5;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
        &-item {
            display: inline-block;
            position: relative;
            cursor: pointer;
            height: 26px;
            line-height: 26px;
            border: 1px solid #d8dce5;
            border-radius: 4px;
            color: #495060;
            background: #fff;
            font-size: 12px;
            padding: 0 8px;
            margin-top: 4px;
            margin-left: 5px;
            
        }
        a {
            text-decoration: none;
        }
    }
    .active {
        background-color: #409EFF;
        color: #fff;
        border-color: #409EFF;
        // &::before {
        //     content: "";
        //     background: #fff;
        //     display: inline-block;
        //     width: 8px;
        //     height: 8px;
        //     border-radius: 50%;
        //     position: relative;
        //     margin-right: 2px;
        // }
    }
    .el-icon-close {
        width: 16px;
        height: 16px;
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
        transform-origin: 100% 50%;
        &:before {
            transform: scale(.6);
            display: inline-block;
            vertical-align: -3px;
        }
        &:hover {
            background-color: #b4bccc;
            color: #fff;
        }
    }
    .contextmenu {
        margin: 0;
        background: #fff;
        z-index: 3000;
        position: absolute;
        list-style-type: none;
        padding: 5px 0;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 400;
        color: #333;
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
        li {
            margin: 0;
            padding: 7px 16px;
            cursor: pointer;
            &:hover {
                background: #eee;
            }
        }
    }
</style>