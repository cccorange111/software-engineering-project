import { useEffect, useRef } from "react";

export default function usePrevious(value) {
  const ref = useRef();
  //useEffect 中的副作用函数在组件渲染之后执行,
  //当组件渲染完成后，useEffect 函数中的回调函数会被执行一次。
  //如果依赖数组中的值发生了变化，那么 useEffect 会在组件更新后再次执行回调函数。
  useEffect(() => {
    ref.current = value;
  });
  //返回的是旧的值，因此是previous value
  return ref.current;
}
