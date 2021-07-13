import { ref, watch, onMounted, onUnmounted, Ref } from 'vue'

const ON_LINE = 'online';
const OFF_LINE = 'offline';
interface FnHandler {
    onLineFn?: () => void;
    offLineFn?: () => void;
}
export function useNetwork({
    onLineFn,
    offLineFn,
}: FnHandler): void {
    const onlineRef: Ref = ref(navigator.onLine);
    watch(
        onlineRef,
        (onLine, oldValue) => {
            if(!oldValue && onLine) {
                onLineFn && onLineFn();
            } else if (!onLine && oldValue) {
                offLineFn && offLineFn();
            }
        },{
            immediate: false,
        }
    );
    const handler = (e: Event) => {
        const { type } = e;
        onlineRef.value = type === ON_LINE;
    }
    onMounted(() => {
        window.addEventListener(ON_LINE, handler);
        window.addEventListener(OFF_LINE, handler);
    });
    onUnmounted(() => {
        window.removeEventListener(ON_LINE, handler);
        window.removeEventListener(OFF_LINE, handler);
    });
}