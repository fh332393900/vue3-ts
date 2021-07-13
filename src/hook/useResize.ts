import { onMounted, onUnmounted } from 'vue';

export function useResize (
    handlerFn: () => any
) {
    const handler = () => {
        handlerFn();
    }
    onMounted(() => {
        window.addEventListener('resize', handler);
    });
    onUnmounted(() => {
        window.removeEventListener('resize', handler);
    });
}