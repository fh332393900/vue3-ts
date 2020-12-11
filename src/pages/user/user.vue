<template>
    <div>
        <div class="title">user</div>
        <el-button type="success" @click="back">返回</el-button>
    </div>
</template>

<script>
import { unref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
export default {
    setup() {
        
        const router = useRouter()
        const route = useRoute()
        const back = () => {
            router.go(-1)
        }
        return {
            back
        }
    }
}
</script>

<style lang="scss" scoped>
    .title {
        font-size: 14px;
        color: #9b9b9b
    }
</style>
