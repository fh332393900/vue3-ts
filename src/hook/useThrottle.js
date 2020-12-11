import { isFunction } from '@/utils/is/index';

/**
 * 防抖函数
 */
export function throttle(
  handle,
  wait,
  options= {}
){
  if (!isFunction(handle)) {
    throw new Error('handle is not Function!');
  }
  const { once = false, immediate = false, debounce = false } = options;
  // 定时器对象
  let timeoutId;
  // 是否已经取消
  let cancelled = false;
  /**
   * @description: 清空定时器
   */
  function clearTimer() {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  }
  /** 取消执行 */
  function cancel() {
    clearTimer();
    cancelled = true;
  }
  // 如果once为true,则只执行一次
  function cancelExec() {
    once && cancel();
  }
  function fn(thisknown, ...args) {
    // 已经取消,则不执行
    if (cancelled) {
      return;
    }
    const exec = () => {
      !debounce && clearTimer();
      handle.apply(this, args);
      cancelExec();
    };
    if (immediate) {
      immediate = false;
      const callNow = !timeoutId;
      if (callNow) {
        exec();
        timeoutId = undefined;
      }
    } else {
      debounce && clearTimer();
      if (!timeoutId || debounce) {
        timeoutId = setTimeout(exec, wait);
      }
    }
  }
  return [fn, cancel];
}

export function useThrottle(
  handle,
  wait,
  options = {}
){
  return throttle(handle, wait, options);
}
