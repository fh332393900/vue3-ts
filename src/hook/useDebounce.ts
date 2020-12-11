import { useThrottle } from './useThrottle'
import {
    DebounceAndThrottleOptions,
    DebounceAndThrottleProcedureResult,
    DebounceAndThrottleProcedure,
  } from './types';

export function useDebounce<T extends unknown[]>(
    handle: DebounceAndThrottleProcedure<T>,
    wait: number,
    options: DebounceAndThrottleOptions = {}
): DebounceAndThrottleProcedureResult<T>{
    return useThrottle(
        handle,
        wait,
        Object.assign(options, {
            debounce: true,
        })
    )
}