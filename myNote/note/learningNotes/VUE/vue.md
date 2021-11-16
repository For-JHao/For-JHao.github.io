# VUE

## 生命周期

官网图示

<img src='https://cn.vuejs.org/images/lifecycle.png' width='60%'/>

created：指创建Vue实例（vue对象，包含data，方法，监听事件等）；

mounted：指将Vue实例挂载到指定的元素上（联系实例和DOM，元素即el）；

updated：更新DOM；

destroyed：销毁，清除Vue实例和DOM的联系；

以上均是指事件结束状态



### data函数的执行节点

vue组件的data函数执行在created之前，beforeCreated之后：

可见vue在created时完成数据加载

![js-1.1 2021-07-17](https://github.com/For-JHao/For-JHao.github.io/blob/main/myNote/note/learningNotes/img/js/1.1%202021-07-17.png?raw=true)

data函数中尝试获取当前组件元素dom，失败；

但能获取全局vue挂载根节点#app：挂载根节点独立于vue加载，且浏览器加载dom元素早于执行js

![js-1.2 2021-07-17](https://github.com/For-JHao/For-JHao.github.io/blob/main/myNote/note/learningNotes/img/js/1.2%202021-07-17.png?raw=true)

在不同时间节点获取**当前dom**，到**mounted**才能拿到

![1.3](https://github.com/For-JHao/For-JHao.github.io/blob/main/myNote/note/learningNotes/img/js/1.3%202021-07-17.png?raw=true)



## 子组件周期节点

**加载**

...父beforeMount ->（子beforeCreate -> mounted） -> 父mounted...

**更新**

...父beforUpdate -> （子beforeUpdate -> updated）-> 父updated...

**销毁**

...父beforeDestroy -> （子beforeDestroy -> destroyed）-> 父destroyed...





## slot-scope

作用域插槽中，v-if或v-show无法监听继承变量的变化，来动态地渲染元素，只在初始页面加载时进行判断渲染。





## $refs

当使用变量控制要调用的命名组件时，不能使用点语法，否子会将变量名当作是要查找的组件，可以使用方括号写法。

```javascript
let a="compount"//存在一个已注册的为compount的组件
console.log(this.$refs.a)//undefine
this.$refs[a]//找到
```



## data()

获取当前状态下的data：this.$data；

获取初始状态data：this.$options.data()；



重置组件data：

Object.assign(this.$data, this.$options.data())



## 组件

父子组件传值：

- **v-bind="$props"** ：可以将本组件接收到的所有props，传递给使用了**v-bind="$props"**的的子组件，子组件中同样需使用props声明需要的数据。
- **v-on="$listeners"** ：将本组件的自定义方法全部向子组件传递，使子组件可以直接通过this.$emit()调用



## 响应式原理

### Observer

注意：observer包裹的空对象以 =='  ' 判断并不为空。可以借助**hasOwnProperty**检测某个具体属性



## css引入

vue中引入有三种方式：

1. HTML中通过标签Link引入：

```html
<link rel="stylesheet" href="./myCss.css">
```

2. vue组件中通过import导入：

```vue
import "./myCss.css";
//该方式无法限制css作用域，局部组件引入即全局有效；
```

3. vue组件中通过标签style引入：

```vue
<style scoped src='./myCss.css'>
//可以通过添加scoped属性限制css在当前组件内有效
```

