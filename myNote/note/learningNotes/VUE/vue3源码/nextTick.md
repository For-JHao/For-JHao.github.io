# nextTick

nextTick是基于promise.then()的封装

```ts
//core\packages\runtime-core\src\scheduler.ts

const resolvedPromise = /*#__PURE__*/ Promise.resolve() as Promise<any>
let currentFlushPromise: Promise<void> | null = null

export function nextTick<T = void, R = void>(
  this: T,
  fn?: (this: T) => R,
): Promise<Awaited<R>> {
  const p = currentFlushPromise || resolvedPromise
  return fn ? p.then(this ? fn.bind(this) : fn) : p
}

//该方法通过调用flushJobs清理vue的更新队列
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true
    currentFlushPromise = resolvedPromise.then(flushJobs)
  }
}
```

vue将每次的dom修改事件缓存到一个队列queue中，queue会进行去重和排序，以保证vue组件的更新秩序（父到子），和防止对dom的反复修改（性能消耗）。

也就等于当有更新任务时，**promise.then(‘清理queue’).then('nextTick回调')**。以此保证nextTick在每次dom更新后执行。

