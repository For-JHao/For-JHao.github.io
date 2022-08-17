# vue构造函数

src/core/instance/

## index.js

Vue构造函数入口文件

```js
//import initMixin等方法
...
//Vue构造函数
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)    //判断是否被new调用
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options) //初始化vue实例，该方法在initMixin()中定义
}

//给Vue原型挂载相关方法和属性
initMixin(Vue)    //添加初始化实例方法_init()
stateMixin(Vue)    //添加数据相关属性$data,$props；方法$set,$delete,$watch
eventsMixin(Vue)//添加事件相关方法$emit、$on,$once,$off
lifecycleMixin(Vue)//添加生命周期相关方法_updata,$forceUpdate，$destroy
renderMixin(Vue)    //添加方法$nextTick,_render，以及renderHelper附属方法

export default Vue
```
