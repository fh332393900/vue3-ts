import { ref, watch, onMounted, onUnmounted } from 'vue'

const ON_LINE = 'online';
const OFF_LINE = 'offline';
export function useNetwork({
    onLineFn,
    offLineFn,
}) {
    const onlineRef = ref(navigator.onLine)
    watch(
        onlineRef,
        (onLine, oldValue) => {
            if(!oldValue && onLine) {
                onLineFn && onLineFn()
            } else if (!onLine && oldValue) {
                offLineFn && offLineFn()
            }
        },{
            immediate: false,
        }
    )
    const handler = (e) => {
        const { type } = e
        onlineRef.value = type === ON_LINE
    }
    onMounted(() => {
        window.addEventListener(ON_LINE, handler)
        window.addEventListener(OFF_LINE, handler)
    });
    onUnmounted(() => {
        window.removeEventListener(ON_LINE, handler)
        window.removeEventListener(OFF_LINE, handler)
    });
}