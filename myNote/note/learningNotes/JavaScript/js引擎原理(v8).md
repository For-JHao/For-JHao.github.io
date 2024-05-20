# JavaScript v8引擎原理

将js代码转换为cpu可以执行的指令；（高级语言-汇编语言-机器码）

不同的cpu有不同的指令集，通过机器码（二进制代码）操作指令集控制计算机运行；

区别于编译型，js是**解释型语言**，正是因为js在每次**运行过程中才进行编译**；

JavaScript执行过程可以分为大体三个阶段：

1. 解析 Parsing（转换为语法树）

2. 编译 Compilation（生成执行代码）

3. 执行 Execution

## 解析 Parsing

- 识别源代码中的关键字、操作符、变量名等，将其转换为抽象语法树（AST）；

- 确定作用域；

**Lazy Parsing(延迟解析)机制** ：针对函数，js第一次运行时引擎只会解析顶层代码，遇到函数会跳过内部代码（不会生成对应AST，同样也不会参加编译），以此加快运行速度。 

但同时会对函数内部代码进行**预解析（preParsing）**，判断是否有语法错误，以及是否有引用外部变量（提前将变量加入堆供函数调用时引用）；

函数的正式解析及编译会在被调用时进行；

## 编译 Compilation

遍历AST并进行优化，生成字节码或者机器码

v8有两个模块：

### Ignition

即，Interpreter；根据AST生成字节码；

（V8的5.9版本引入，针对低使用度的函数；以改善机器码过高的内存占用）

low-level的字节码不会通过TurboFan优化编译，执行时需要额外的解释器**即时翻译**成机器码被cpu运行；

low-level代码以字节码形式缓存；

*参考：*

*[Ignition · V8](https://v8.dev/docs/ignition)*

*[Ignition Design Doc - Google 文档](https://docs.google.com/document/d/11T2CRex9hXxoJwbYqVQ32yIPMh0uouUZLdyrtmMoL44/edit)*

### TurboFan

即，compiler，把high-level的**字节码**编译成优化过的机器码；

high-level代码以机器码形式缓存；

机器码能够直接被cpu运行，因此执行更快但更费内存；

*参考：[TurboFan · V8](https://v8.dev/docs/turbofan)*

## 执行 Execution

执行字节码或机器码，处理变量和控制流程

### [事件循环系统](./事件循环.md)；

### 垃圾回收机制；

**mark-and-sweep算法**；

从根节点（js中的全局对象）开始遍历，将能访问到的变量视为需要的，其余不能访问到的则可以判定为无用的，可以被清除。

*注意：反之并不成立，能访问到对象的其实并不一定被需要。*

现代所有对js的垃圾回收机制都是基于mark-and-sweep





*参考*：

*[V8 JavaScript engine](https://v8.dev/)*；

https://juejin.cn/post/7221793823704514620；

*[JavaScript深入浅出第4课：V8引擎是如何工作的？ | 寒雁Talk (kiwenlau.com)](https://kiwenlau.com/2019/07/16/how-does-v8-work/)*
