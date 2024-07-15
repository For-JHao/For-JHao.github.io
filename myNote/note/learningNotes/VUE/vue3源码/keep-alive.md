# keep-alive

通过**cache**缓存vnode（不是单纯的组件实例或DOM），通过**keys**做LRU （Least Recently Used）缓存策略，两者通过CacheKey对应；

```ts
//core\packages\runtime-core\src\components\KeepAlive.ts
type CacheKey = string | number | symbol | ConcreteComponent
type Cache = Map<CacheKey, VNode>
type Keys = Set<CacheKey>
```



**注意：**

keep-alive通过缓存vnode保存vue实例的状态，实际切换视图dom仍然会经历销毁和重建（而不是通过css隐藏）；

因此，keep-alive的组件不会经历created和mounted，但会额外触发`activated` 和 `deactivated`。



**LRU（Least Recently Used）策略**：

每次使用到该vnode缓存后，将其cachekey从keys中删除再重新添加，这样保持新使用的在keys队列队尾。

当缓存数量超过最大值后（如果用户传递了props: max），会从keys队首清除；max作为可选props，vue默认会一直缓存下去；

```ts
const cachedVNode = cache.get(key)      

if (cachedVNode) {
// copy over mounted state
vnode.el = cachedVNode.el
vnode.component = cachedVNode.component
if (vnode.transition) {
  // recursively update transition hooks on subTree
  setTransitionHooks(vnode, vnode.transition!)
}
// avoid vnode being mounted as fresh
vnode.shapeFlag |= ShapeFlags.COMPONENT_KEPT_ALIVE
// make this key the freshest
keys.delete(key) 								//更新keys的活跃排列
keys.add(key)
} else {
keys.add(key)
// prune oldest entry
if (max && keys.size > parseInt(max as string, 10)) {
  pruneCacheEntry(keys.values().next().value) 	//超额清除keys队首缓存
}
}
```



