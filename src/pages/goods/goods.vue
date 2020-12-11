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
import { useCharts } from '@/hook/useCharts' 
import { ref, onMounted } from 'vue'
import echarts from 'echarts'
export default {
    setup(props,context) {
        const router = useRouter()
        const store = useStore()
        const toUser = () => {
            router.push('/user')
        }

        const chartRef = ref(null)
        const { setOptions } = useCharts(chartRef)
        onMounted(() => {
            setOptions({
                title: {
                    text: '某站点用户访问来源',
                    subtext: '纯属虚构',
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)',
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
                },
                series: [
                    {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        { value: 335, name: '直接访问' },
                        { value: 310, name: '邮件营销' },
                        { value: 234, name: '联盟广告' },
                        { value: 135, name: '视频广告' },
                        { value: 1548, name: '搜索引擎' },
                    ],
                    emphasis: {
                        itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        },
                    },
                    },
                ],
            })
        })
        return {
            toUser,
            chartRef
        }
    }
}
</script>

<style scoped>

</style>
