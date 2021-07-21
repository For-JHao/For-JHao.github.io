# VUE

## 生命周期

附上官网的图示

![vue](https://cn.vuejs.org/images/lifecycle.png)



### data函数的执行节点

vue组件的data函数执行在created之前，beforeCreated之后：

可见vue在created时完成数据加载

![js-1.1 2021-07-17](https://github.com/For-JHao/For-JHao.github.io/blob/main/myNote/note/learningNotes/img/js/1.1%202021-07-17.png?raw=true)

data函数中尝试获取当前组件元素dom，失败；

但能获取全局vue挂载根节点#app：挂载根节点独立于vue加载，且浏览器加载dom元素早于执行js

![js-1.2 2021-07-17](https://github.com/For-JHao/For-JHao.github.io/blob/main/myNote/note/learningNotes/img/js/1.2%202021-07-17.png?raw=true)

在不同时间节点获取当前dom，到mounted才能拿到

![1.3](https://github.com/For-JHao/For-JHao.github.io/blob/main/myNote/note/learningNotes/img/js/1.3%202021-07-17.png?raw=true)

