# questions

## Vue

### v-model实现

本质是v-bind:value=data和v-on:input=”data=$event.target.value” 的语法糖，子组件中会自动通过$emit('input')触发input，通过方法input修改本地data;

### 自己实现UI框架的表单校验

通过vue.minin()方法混入自定义校验规则，为了避免重复混入，应将其设计为插件(通过vue.use()调用，插件需提供install方法)。

```javascript
//自定义rule结构:
 rules: {
    foo: {
      validate: value => value > 1,
      message: 'foo must be greater than one'
    }
  }

const rulesPlugin={
    install(Vue){
        Vue.minin({
            //使用vue钩子函数
            create(){
               if (this.$options.hasOwnProperty('rules')) {
                  // Do something with rules
                  const rules = this.$options.rules
                  Object.keys(rules).forEach(key => {
                    const rule = rules[key]
                    //监听key值变化
                    this.$watch(key, newValue => {
                      const result = rule.validate(newValue)
                      if (!result) {
                        console.log(rule.message)
                      }
                    })
                  })
                }
            }
        })
    },
}

Vue.use(rulesPlugin)

//之后便可在组件内直接使用rule定义表单对应value规则
```

*补充*

rule为自定义选项，vue中可直接使用自定义选项，若没有注册相关操作则会忽略；

### 完全不相关的组件传值

自定义一个公共组件，通过公共组件的vm.$on（监听vm上的自定义事件）和vm.$emit（触发vm上的自定义事件）传值；

```javascript
//公共组件bus，只需要new Vue()一个实例
import Vue from 'vue'
export default new Vue()

//传值方：触发vm.$emit
import bus from ''
bus.$emit('test', 'hi')

//接受方：调用vm.$on响应同名自定义事件
import bus from ''
bus.$on('test', function (msg) {
  console.log(msg)// => "hi"
})
```

### data()中添加新属性监听（以及数组元素监听）

vue2中，vue会在初始化时修改data()中声明变量的setter和getter，使其成为响应式；后续添加的变量无法成为响应式；

但是可以用Vue.set(target,key,value)在**已有的变量**上，添加响应式的新属性；

> 补充：
> 
> 即使是响应式的数组，不能监听到通过索引的元素修改和数组长度的修改；
> 
> ```js
> //例：a=[1,2,3]
> a[1]=2;
> a.length=2 
> //均不会触发响应;
> //不会触发响应，但是数组的改动仍然有效。在下次触发响应时，会使用新数据进行计算
> ```
> 
> Vue.set()同样也可用于数组（data中已声明）元素的修改；
> 
> 或者使用splice等数组操作方法（vue对这些方法进行了包裹，以触发响应）

### 设置一个循环反复修改data()数据，会怎样

死循环会阻塞系统（JS单线程阻塞）

同步非死循环，会直接输出最后结果；（vue会开启一个队列缓存同一事件循环内的所有数据变更）

异步的反复修改（setInterval），按间隔输出每一次结果

### nextTick()实现

promise.then() 

如果promise不可用，则使用mutationObserver

### 变量循环修改和setter/getter的反复触发的冲突

### 组件传值方法（除了emit,props,bus）

### npm run serve过程

### 观察者模式和发布订阅模式

vue的响应式使用了观察者模式；

事件处理使用了发布订阅模式，$on注册，$emit触发；

两种模式相比，发布订阅模式中，发布者和订阅者之间多了一个**调度中心**，两者解耦而使得处理能更灵活；而观察者模式中，观察者和目标之间互相依赖；

### 源码!!

- nextTick()作用，等待虚拟DOM更新还是DOM更新？

> nextTick()等待（真实）dom更新后调用回调；
> 
> dom的操作和更改是同步的，但dom的渲染是异步的（生成render树等，UI渲染属于宏任务）；
> 
> nextTick()基于微任务实现，必然在dom更新后；

- 绑定事件，同一个function中多次修改参数，dom更行几次，function中调用事件再修改呢，如何实现？

只要不是在新的宏任务中修改，DOM就只渲染一次，但每次js操作都会实时修改dom；

实现：

> Vue 在更新 DOM 时是**异步**执行，只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。且同一个watcher被多次触发触发，只会被推入到队列中一次。以减少不必要DOM操作；

- key作用，以及vue如何判别v-for list中哪些修改，哪些增删

key：vnode的唯一标识，使vue可以更准确更高效的找到对应的vnode;

判别：

- 组件懒加载实现

- 数据监听和依赖搜集

## VUEX

### 原理

### vue.use时做了什么

### vuex各项功能作用

1. state：作为单一数据源存放数据；
2. getter：类似于计算属性computed，以便在vuex中对数据提前做一些共有的操作；
3. mutation：更改state的唯一方法，mutation中的方法可以接收state作为参数，借此修改state。可以通过store.commit('oneOfMutations')触发mutation方法；必须是同步；
4. action：可以存放任意异步操作，但只能通过commit()调用mutation更改state；
5. module：模块化store，以避免单个store过于臃肿；

### vue.use()过程处理

## vue-router

### 页面跳转怎么防止内存泄漏

解除不用的引用，尤其是挂在全局对象上的引用，js垃圾回收机制会自动回收；

需要注意的地方：

- 定时器；

- 事件监听；

- 全局对象调用的函数，而函数中在this上挂载了变量；（使用严格模式可避免）；

- 前端路由中，如果页面dom挂在了全局对象上，即使切换了dom，原dom需要从全局对象上解除引用才能被清除；

es6中提供了新的数据结构：weakset/weakmap；创建弱引用，不会阻止垃圾回收；

*参考：[万恶的前端内存泄漏及万善的解决方案 - 掘金 (juejin.cn)](https://juejin.cn/post/6914092198170460168#heading-11)*

### 动态路由

### keep-alive

## 路由

- history和hash路由区别
1. **hash模式**
   
   url带有一个hash字符‘#’，改动hash值不会引起后端url请求；

   可以通过location.hash直接改变url上的hash值；
   
   通过监听 window 的**hashchange事件**，做相应的dom切换，实现前端路由；
   
2. **history模式**
   
   HTML5提出来了api pushState()和replaceState()；可以通过全局的history对象提供的一系列方法，操作浏览器会话历史；除了借助url传递参数（大小受限），还可以通过pushState(obj, title, url)第一个参数传送大数据；
   
   history提供的**pushState()**和**replaceState()**方法，只会更新当前url，不会发起路由器请求；（相对的，通过location.href 和 location.replace 切换时会向服务器发送请求）

*补充*

vue-router中通过history选项切换路由模式

```javascript
import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),//或hash模式:createWebHashHistory()
  routes: [
    //...
  ],
})
```

## JS

### 一些Number型方法

### for in 和for of

> [`for...in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in) 语句以任意顺序迭代对象的[可枚举属性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)。
> 
> `for...of` 语句遍历[可迭代对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_Generators#iterables)定义要迭代的数据。

for in 是为了用于遍历对象属性而构建，可迭代一个对象除symbol以外的可枚举属性，不建议用于数组（如果用于数组结果会是数组索引）；

for of 通过自定义迭代器，来自定义迭代规则；

### forEach、map等函数的迭代终止

forEach这些函数本身无法跳出循环，return会实现continue效果；但是可以通过抛出异常throw Error()停止循环，并被catch()捕捉到；

### 并发请求处理（例：抢购）

封装，promise，保持同步

### 实现异步方式(实现promise)

### 异步改为同步（确保多个异步同步完成）

```js
1. promise.all([fun1(),fun2()...]).then()
//all全部成功兑现会返回一个数组，数组顺序同传值顺序（非兑现顺序！）；
//其中有任意一个被rejected，都会导致then走到reject逻辑,之接收第一个拒绝原因；
2. async function(){
    await fun1()
    await fun2()
    //do something
}
```

### react和vue通信（观察者模式设计）

### new的工作原理

1. 创建一个空的简单JavaScript对象（即`**{}**`）；
2. 为步骤1新创建的对象添加属性[[Prototype]]（即老版本的`**__proto__**`），将该属性链接至构造函数的原型对象 ；
3. 将步骤1新创建的对象作为`**this**`的上下文 ；
4. 如果该函数没有返回对象，则返回`**this**`；如果构造函数有返回对象，则采用构造函数的返回值。

### 实现new

### 实现bind（apply/call）

### 实现reduce

### instanceof 实现

递归判断实例的原型[[prototype]]，是否在构造函数prototype上；

*注意：*

- [[prototype]]不同于prototype，prototype存在于构造函数上，为构造函数分给所有实例对象的共享属性，也是其实例**对象的原型**。

- [[prototype]]通过方法Object.getPrototypeOf(obj)获得，等同于老版本非标准的obj.__proto_，现在的_proto_为Object.prototype的访问器（由 getter 和 setter 函数组成）

```js
//prototype是函数构建实例时分配给所有对象的原型；
let b=new Array()
//用字面量方式b=[]申明，结果也相同；
console.log(Object.getPrototypeOf(b)===Array.prototype) //true

//prototype只存在于函数上
console.log(b.prototype) //undefined


//另外，构造函数也有自己的[[prototype]]，等同于Function的prototype；
console.log(Object.getPrototypeOf(Array)===Function.prototype) // true
```

*补充：*

- 以下均成立
  Object.getPrototypeOf(Function)===Object.Prototype
  Object.getPrototypeOf(Object.Prototype)===null

- 箭头函数没有默认的prototype，但仍然有[[prototype]]，同样指向Function.prototype

### setTimeout最小为什么是4ms

在html 5标准中，规定当setTimeout嵌套超过5层，并且设置定时小于4ms时，setTimeout默认最低执行计时时间为4ms；但实际浏览器没有完全按当前标准实现。

单次定时器默认最低时间仍然>0ms，防止js引擎**事件循环**过度，阻塞页面响应。

```js
  //因为实际最低计时不为0，且大于0.9ms，0.9先计时完成入栈；
  //此时页面会先打印0.9，再打印0；
  setTimeout(()=>console.log('0.9'),0.9);
  setTimeout(()=>console.log('0'),0);

  //测试默认最低时间1ms>defaultTime>0.9ms；chrome版本122；
  //先打印0；
  setTimeout(()=>console.log('1'),1);
  setTimeout(()=>console.log('0'),0);
```

### symbol使用场景

定义互斥的常量（以symbol作为值）；

模拟对象的私有属性（使用symbol作为属性名，属性名唯一，无法复现属性名称来调用）；

### 多个promise的执行顺序和返回值

### 闭包

一个函数及其捆绑的环境状态组合，包含闭包创建时作用域内的所有局部变量；

闭包随着函数创建同时创建；让函数内部可以访问外部函数的作用域；

**意义**：让函数可以与其操作的数据（环境）关联起来；

- 模拟面向对象编程；

- 模拟私有方法：定义的内部函数（即成为私有方法），只有同样作用域下暴露（return）的函数能够访问内部函数，而外界作用域无法访问；

*参考：[闭包 - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)*

## 浏览器

### 运行原理

### 回流和重绘

### 加载优化

### 跨域解决方案

*参考：[什么是跨域？及7种跨域解决方法 - 程序猿咬棒棒糖拽天下 - 博客园](https://www.cnblogs.com/mochenxiya/p/16597545.html)*

### localStorage和sessionStorage区别；

localStorage存储的数据保存在浏览器会话中，没有过期时间设置，即使浏览器关闭也仍然存在（除非清理缓存）；而sessionStorage保存在页面会话中，页面关闭即被清除；

### 缓存策略

见：[缓存策略](./浏览器原理/缓存策略.md)

### TCP怎么保证完整性

序列号：TCP每个包都有一个序号，这些序号是+1递增的；

确认应答机制：接收方每接收到一定数量TCP包（默认为2个）会放发送一个确认信息（即ACK，包含2个数据：当前正期待接收到的序号；接收方接收窗口剩余容量），来给发送方和自己发送的序号对比，判断有没有丢包，需不需要重发；

流量控制：TCP每个包的负载大小不一定相等，当网络通畅时会逐渐增大负载。这点也是发送方借由ACK来判断。

### get、put、post请求区别

put和post都可以用来提交数据，但是put是幂等的，即同**一个请求**不论执行多少次结果都一样（实际处理put请求时存在目标对象会将该对象删掉重新创建，而post遇到已存在的目标对象则会在该对象上修改，所以同一个请求多次处理可能会导致意外影响）

### 不同页面的数据交互

- url携带；

- TargetWindow.postMessage()，需要目标页面的window对象;

        *参考：[浅析 postMessage 方法介绍、如何接收数据（监听message事件及其属性介绍）、使用postMessage的安全注意事项、具体使用方式（父子页面如何互发消息、接收消息） - 古兰精 - 博客园](https://www.cnblogs.com/goloving/p/15381013.html)*

- localStorage和sessionStorage（必须同域）；

### websocket

基于TCP的一个支持双向数据传输的协议。只需要一次握手，就可以建立持久性的连接，且允许服务器主动向客户端推送数据；

基于该协议，实现了webSocket对象和相关webSocket API；

send()：向服务器发送数据；

在socket实例上监听message事件，处理接收的数据；

### http2

采用二进制传输，解析更快；

多路复用，只建立一个TCP，双向数据流，根据标识区分重组信息；

压缩请求头，只传输头变动信息；

服务器可以主动推送数据；

## 算法

### 函数封装：

- 接收一个函数，返回一个只能执行一次的函数（即，使参数这个函数只能执行一次）；

- 接收一个有错误成功回调的函数，使其转换为promise链式处理的函数，返回该函数；

- 完成一个方法，可以通过链式调用其他方法进行累计，并在最后调用calculate()方法再进行前面的运算。

​        例：query(data).a().b().c().calculate() 

​        解：链式调用可以通过返回this实现；”累计却不执行“ 可以在前面的方法中将函数体存入变量，再在最后的calculate()遍历函数名执行运算；

## 项目

### 权限认证管理；

- 用户分组

- 接口分组

- 接口权限配置；控制用户对数据的访问、修改权限；

- 菜单权限配置；控制用户对界面菜单的访问权限；

### 静态数据存储策略（图片，js等）

### 图片预加载和懒加载

预加载，即提前加载图片但不显示，可以通过css隐藏；即使切换页面，浏览器在渲染之前加载过的图片也能直接从缓存获取；

懒加载，即等到需要的时候，再赋值src，此时开始加载图片；

- 使用HTML提供的全局Image()函数；返回一个img标签实例

```js
var myImage = new Image(width, height);
myImage.src = 'picture.jpg';//赋值src时，请求获取图片
document.body.appendChild(myImage)；
```

- 或通过img标签的自定义属性暂存src

```html
<img src='' data-src='./img'>
```

本质相同，先暂存图片地址，根据需要赋值src；

可通过以下方法操作元素属性值

element.getAttribute(attributeName);

element.setAttribute(name, value);

### 图片怎么压缩

canvas提供的以下两个api都可以压缩图片质量：

**toBlob(callback, type, quality)**：将canvas内容生成blob对象交由callback，quality参数指定图片质量；

**toDataUrl(type, encoderOptions)**：返回一个可直接用于图片展示的data URL，第二个参数指定图片质量；

使用canvas api需要先将img画到canvas上；

如果是处理用户上传的照片，一般是file对象，file对象可以转化为base64编码（借助readAsDataURL()），再将img src指向该base64码，以此转为为img对象；

### **最近项目中遇到的难点**

- 一个表格，加载初始数据，可动态增删行，最后保存；
  
  其中一格用的插槽，插的一个封装下拉框，下拉框要绑一个本地属性option，但是有多个下拉框，属性冲突；
  
  考虑用数组，每次新增对象元素，每个对象带一个option，不行（当时不知道Vue.set()方法）；
  
  最后采用的二次封装，option和下拉框；

- 基于vue封装table组件，对data采用了二次赋值，导致vue响应式失效；

- 骨架屏及加载优化；
  
  mutationObserver；

- 异步树组件的自动寻址展开；

- wallet的安全等级提升，及谷歌验证码升级；

- webform动态配置；

- sdk优化：sheerId的proxy；三端入口逻辑整合；

### iframe的loading处理

iframe标签可以添加onload事件，监听iframe的加载时间；

iframe和父窗口通信需要满足同源策略；如果跨域，可以使用postMessage()通信，

iframe内则通过监听message事件获取信息；

### 微前端

一种架构思想，将前端分成各个独立的模块，每个模块可以独立开发和运行，甚至使用不同的技术栈，而互不影响；这样对于越来越大的工程，能更方便开发和维护；

一个主应用（基座），通过路由来管理各个子应用；需要保证每个子应用的装载和卸载不会污染全局window，每个模块js、html、css隔离；

比如采用iframe，但iframe的完全隔离也造成了一定的不方便；

### 前后端分离部署优势

降低服务器压力；

体验更好，即使服务器失去响应，前端也能在一定程度上进行使用；

前端逻辑交互更快；

更安全，服务器放在内网，外网使用代理访问；

### cookie存储

最大4KB;

通过cookie请求头携带；

如果cookie没有设置httpOnly，js就可以通过document.cookie获取；

前端设置cookie同样通过document.cookie；

    

### 网络攻击防御（XSS和csrf）

### 系统卡顿可能的原因和解决办法

资源太大加载阻塞；

网络请求太多；

js运行长时间占用线程；

内存占用过高（内存泄漏；事件太多等），运行卡顿；

### 重复请求控制，如抢购、下单等

单例模式；或者节流

## CSS

### 不同盒子模型；（width,pading区别）；

​    标准盒子模型：width只包含content；

​    IE盒子模型（怪异盒模型）：width包含padding和border（不包含margin）；

    css可通过 **box-sizing**: content-box（标准模型，默认值）|| border-box 设置

### display:none和visible区别；

- display: none隐藏后的元素不占据任何空间（仍然存在于DOM），更改触发回流；

- visibility: hidden隐藏后的元素空间依旧保留，更改触发重绘;

- visibility具有继承性，子元素可更改visibility:visible显现，display则不能;

- visibility: hidden不会影响计数器的计数，例如，li标签的序号计数；

### img标签和background-image属性区别

- background-image无法使用懒加载，而img标签可以通过设置其src进行懒加载的实现
- img的src会优先background-image进行请求
- img标签能更好的SEO
- background**-**image能配合css设置更多图片属性

### Position

### 实现前后距离固定，中间多个元素铺满

- flex布局：

​    父级flex;

​    子元素：前后各一个div固定宽度，中间元素flex-grow:1

- float

​    前后两个div分别左右浮动，中间div则自动占满一行，同时设置左右margin留出浮动距离；

- grid布局

​    父元素grid，并划分三列  grid-template-columns

​    

### 1px问题

尤其在移动端上，因为屏幕小而分辨率很高，设备像素和css的像素并不一定是1：1的关系，css设置的1px在终端会用多个像素渲染；

这个比例可以通过属性window.devicePixelRatio（即DPR，物理像素 / css像素）查看；

解决方案：

通过window.devicePixelRatio获取当前设备像素比例，设置< meta name="viewport">的content属性；通过viewport可以控制当前视口大小，以此将物理像素和css像素拉到1:1的关系；

## Webpack

### 原理

# 额外

**STAR**

了解不同模块，关注整体业务（包括人员、项目、配置等） 

# 代办：

### 执行上下文的生命周期（三个阶段）：

1. 创建
   
   1. 建立环境记录
   
   2. 建立作用域链
   
   3. 确定this指向

2. 执行

3. 回收

### 事件三个流程：

根据W3C模型，事件传播按顺序存在以下三个阶段

1. 捕获阶段

   触发事件后，从最高的window节点往目标元素传播；捕获阶段总是发生；

   addEventListener(type, listener, useCapture)添加的监听器，useCapture默认false，即默认**不会**在捕获阶段执行；

   通过设置useCapture为true，以在捕获阶段执行操作；

2. 目标阶段

   事件到达目标元素；

   event的target和srcElement会包含目标元素的引用；

3. 冒泡阶段

   事件从目标元素往父级传播，直到window节点；

   addEventListener()默认在冒泡阶段处理事件；

   

*补充*：

- window节点在document节点上面；

- 通过event.stopPropagation()可以阻止事件传播，包括**事件捕获和事件冒泡**；
- 事件传播过程，event对象始终是同一个，满足严格相等，event.target也始终是目标元素，非当前元素。获取当前元素可以用currentTarget或者this；



### promise静态方法：

all()：等待所有成功后返回，一旦有一个失败直接返回；

allSettled()：无论失败还是成功，等待所有promise结果再返回；

以上两种方式返回的结果都是数组，**返回元素顺序按照传入顺序排列**，而不是兑现时间；



any()：有一个成功了就返回；

race()：等待一个promise出结果就返回；









### 伪元素伪类：

[伪类伪元素](.\css\伪类和伪元素.md)

**伪类**：冒号开头的关键字。选择器的一种，相当于一个预置的css类名。

用于选择处于特定状态的元素，比如第一个元素、鼠标悬浮的元素等；



**伪元素**：双冒号开头的关键字。也是一种选择器，能让原本完整的一个元素，一部分独立出来仿佛被加了新元素包裹，并单独施加效果。（仿佛新加了一个元素，而不是在现有元素上添加类）

比如，::before和::after，和content属性搭配往文中插入内容；用::first-line设置现有div第一行文字，而不用再去判断一行长度添加span。



伪元素和伪类可以搭配使用，如

```
article p:first-child::first-line {
  font-size: 120%;
  font-weight: bold;
}
```





### 实现属性/方法私有化

闭包；

proxy；



### flex和grid实现自定义多列布局



### 过期自动登录





### 平台数据，访问量等；

### 性能优化指标

### 确保项目依赖版本正确

