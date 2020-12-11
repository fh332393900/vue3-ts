<template>
    <div>
        <div>
            <el-button type="primary" @click="toUser">到用户</el-button>
        </div>
        <div ref="chartRef" style="width:100%;height:500px"></div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref, onMounted } from 'vue'

export default {
    setup(props,context) {
        return {}
    }
}
</script>

<style scoped>

</style>
