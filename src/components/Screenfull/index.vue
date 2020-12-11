<template>
    <div>
        <i class="el-icon-full-screen" @click="click" />
    </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
    name: 'Screenfull',//全屏按钮组件
    data() {
        return {
            isFullscreen: false
        }
    },
    mounted() {
        this.init()
    },
    beforeDestroy() {
        this.destroy()
    },
    methods: {
        /**
         * 点击切换全屏
         * @author fenghang
         * @version v1
         */
        click() {
            if (!screenfull.isEnabled) {
                this.$message({
                    message: '您的浏览器不支持全屏',
                    type: 'warning'
                })
                return false
            }
            screenfull.toggle()
        },
        change() {
            this.isFullscreen = screenfull.isFullscreen
        },
        init() {
            if (screenfull.enabled) {
                screenfull.on('change', this.change)
            }
        },
        destroy() {
            if (screenfull.enabled) {
                screenfull.off('change', this.change)
            }
        }
    }
}
</script>