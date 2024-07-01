源码基于当前vue3 latest， v3.4.21：

https://github.com/vuejs/core/tree/v3.4.21；



**vue3特性**：

- vue3的选项式写法基本保持和vue2一致，data()返回的数据可以直接使用，而不需要通过`.value`访问；

- 组合式api setup中的this并不指向当前组件实例，由于vue3默认严格模式，this为undefined，获取当前组件实例可使用getCurrentInstance()方法