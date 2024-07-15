# Diff算法

vue通过diff算法比较新旧两个vdom;



## 判断标准

vdom node的**type**和**key**同时相同

```ts
//runtime-core\src\vnode.ts
export function isSameVNodeType(n1: VNode, n2: VNode): boolean {
 //开发模式下多一段热更新判断
 //...
  return n1.type === n2.type && n1.key === n2.key
}
```



## diffing

vue更新时，生成新的vdom tree。从根节点开始，从上到下比较新旧vdom的每一个节点，每一次的比较结果，会直接映射到真实dom上。vue3调用patch()方法按节点类型修改dom（复用旧dom）

正常情况下（没有key的节点），从前往后遍历比较；

```ts
//runtime-core\src\renderer.ts
//简化逻辑如下
const patchUnkeyedChildren = (...)=>{
    ...
    const commonLength = Math.min(oldLength, newLength)
    for (i = 0; i < commonLength; i++) {
        patch(oldVNode[i],newVNode[i])	//对比新旧节点
    }
    if (oldLength > newLength) {
        //remove old, 多余的旧节点可以都不要了
        unmountChildren()
    }else{
		// mount new, 多余的新节点全部挂载到dom
     	mountChildren()
    }
}
```



对于存在key的节点，比如`v-for`渲染的节点，考虑到数据特性（比如，列表前插入新数据，旧的前节点会变成新的最后一个节点），vue优化了节点比较顺序，以寻找更多的相同类型节点复用；

节点比较顺序：

没有命中（`isSameVNodeType(n1,n2)=false`）则进行下一方式比较。

1. 新前 vs 旧前；
2. 新后 vs 旧后；
3. 新后 vs 旧前；
4. 新前 vs 旧后；

```ts
const patchKeyedChildren =(c1,c2)=>{
    
}
```

