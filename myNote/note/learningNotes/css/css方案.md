# CSS方案

## css module

模块化开发css，通过import语法导入js，通过对象使用；

css本身不支持模块化，需要通过webpack等构建工具支持，比如配置webpage的 `css-loader` 。每个模块的css类名会转化为一个唯一的类名，从而避免在全局作用域冲突；



### 工具程式框架（Utility Classes）

代表框架：**tailwind css**

采用高度可定制的css框架，将样式封装成各类名class。通过直接在元素标签上组合类名，取代自己去编写css属性。

例如属性`display: flex`，封装为了`flex`样式，可以直接在class中使用。



## CSS-in-JS

通过js编写生成css，以实现css和js组件的绑定开发；同时也解决了css的全局作用域问题（每个组件通过hash生成唯一类名）。

代表库：styled-component、emotion

因为是通过js编写，实际使用的是js库，而不是css文件。对性能也会有额外的消耗。





## 额外

- 根据情况，也可以选择使用css的预处理器，如scss、less；

- vue有自己的一套css开发方案，每个vue组件都可以通过style标签直接编写css样式。采用vue框架通常不需要考虑额外css方案；