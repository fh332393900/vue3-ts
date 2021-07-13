export type Fn<T> = () => T
export type AnyFn<T> = (...arg: any) => T;
export type PromiseFn<T> = (...arg: any) => Promise<T>;
export type CancelFn = () => void;

export interface DebounceAndThrottleOptions {
    // 立即执行
    immediate?: boolean;
  
    // 是否为debounce
    debounce?: boolean;
    // 只执行一次
    once?: boolean;
  }
  
export type DebounceAndThrottleProcedure<T extends unknown[]> = (...args: T) => unknown;

export type DebounceAndThrottleProcedureResult<T extends unknown[]> = [
  DebounceAndThrottleProcedure<T>,
  CancelFn
];