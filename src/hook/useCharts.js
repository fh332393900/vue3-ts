import { ref, unref, onUnmounted, nextTick } from 'vue'
import { useResize } from './useResize'
import { useDebounce } from './useDebounce'
import echarts from 'echarts'

export function useCharts(
    elRef,
    theme = 'light'
) {
    const chartsInstenceRef = ref(null)
    let resizeFn = resize
    const [debounceResize] = useDebounce(resize, 200)
    resizeFn = debounceResize

    function init() {
        const el = unref(elRef)
        chartsInstenceRef.value = echarts.init(el,theme)
    }
    function setOptions(options) {
        let chartInstance = unref(chartsInstenceRef)
        if (!chartInstance) {
            init()
            chartInstance = unref(chartsInstenceRef)
        }
        nextTick(() => {
            chartInstance.setOption(options)
        })
    }
    function resize() {
        const chartInstance = unref(chartsInstenceRef)
        if (!chartInstance) {
            return
        }
        chartInstance.resize()
    }
    useResize(resizeFn)
    onUnmounted(() => {
        const chartInstance = unref(chartsInstenceRef)
        if (!chartInstance) {
            return
        }
        chartInstance.dispose()
        chartsInstenceRef.value = null
    })
    return {
        setOptions,
        echarts,
    }
}