# computed

每个computed会返回一个**ComputedRef**对象，通常作为一个只读属性，我们可以访问这个对象获取计算值；

比如：

```ts
const count = ref(1)
const plusOne = computed(() => count.value + 1)

console.log(plusOne.value) // 2。模板也可以直接使用plusOne
```

computedRef对象的getter主要负责两件事：

收集依赖：使用到该computed的上下文

返回value值：检查依赖的_dirty标识，如果`_dirty`为true，则标明依赖发生变化，需要触发副作用函数，计算value；

```ts
class ComputedRefImpl<T> {
  public dep?: Dep = undefined		//管理依赖
  private _value!: T					//computed缓存值
  public readonly effect: ReactiveEffect<T> //副作用,包含一个_dirty标识，标明其依赖是否有改变

    
  get value() {
    // the computed ref may get wrapped by other proxies e.g. readonly() #3376
    const self = toRaw(this)
    if (
      (!self._cacheable || self.effect.dirty) &&
      hasChanged(self._value, (self._value = self.effect.run()!))
    ) {
      triggerRefValue(self, DirtyLevels.Dirty) //effect依赖变化，触发computed依赖更新
    }
    trackRefValue(self)		//追踪当前computed依赖

    return self._value
  }
}
```

