<template>
    <div>
        <i class="el-icon-full-screen" @click="click" />
    </div>
</template>

<script>
import screenfull from 'screenfull';
import { ref, defineComponent, onMounted, onBeforeUnmount } from 'vue';
export default defineComponent({
    name: 'Screenfull',//全屏按钮组件
    setup(props) {
        const isFullscreenRef = ref(false);
        onMounted(() => {
            init();
        });
        onBeforeUnmount(() => {
            destroy();
        });
        /**
         * 点击切换全屏
         * @author fenghang
         * @version v1
         */
        const click = () => {
            if (!screenfull.isEnabled) {
                this.$message({
                    message: '您的浏览器不支持全屏',
                    type: 'warning'
                })
                return false;
            }
            screenfull.toggle();
        }
        const change = () => {
           isFullscreenRef.value = screenfull.isFullscreen;
        }
        const init = () => {
            if (screenfull.enabled) {
                screenfull.on('change', this.change);
            }
        }
        const destroy = () => {
            if (screenfull.enabled) {
                screenfull.off('change', this.change);
            }
        }
        return {
            isFullscreenRef,
            click,
            change,
            init,
            destroy
        }
    }
});
</script>