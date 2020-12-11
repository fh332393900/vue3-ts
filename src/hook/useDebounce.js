import { useThrottle } from './useThrottle'
  
export function useDebounce(
    handle,
    wait,
    options = {}
){
    return useThrottle(
        handle,
        wait,
        Object.assign(options, {
            debounce: true,
        })
    )
}