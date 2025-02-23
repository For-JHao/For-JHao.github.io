# Webpack

作为一个打包工具，实现的两个主要功能：内容转换+资源合并；

同样的工具还有Rollup、vite等；



以下内容基于webpack 5，代码基于最新的v5.91.0（time: 24.6.10）;

## 流程

> 1. 初始化阶段：
>    1. **初始化参数**：从配置文件、 配置对象、Shell 参数中读取，与默认配置结合得出最终的参数
>    2. **创建compiler对象**：用上一步得到的参数创建 `Compiler` 对象
>    3. **初始化编译环境，加载plugin**：包括注入内置插件、注册各种模块工厂、初始化 RuleSet 集合、加载配置的插件等
>    4. **开始编译**：执行 `compiler` 对象的 `run` 方法
>    5. **确定入口**：根据配置中的 `entry` 找出所有的入口文件，调用 `compilition.addEntry` 将入口文件转换为 `dependence` 对象
>    
> 2. 构建阶段：
>    1. **编译模块(make)，调用loader**：根据 `entry` 对应的 `dependence` 创建 `module` 对象，从中找出该模块依赖的模块，再 递归 本步骤直到所有入口依赖的文件都经过了本步骤的处理。
>    
>       webpack本身打包js本不做语法转换，也就不需要AST。部分针对js的**loader**为了处理js，需要将内容转换为 AST 对象，再重新生成，例如常见的`ts-loader`、`babel-loader`、已经语法检测`eslint-loader`等
>    
>    2. **完成模块编译**：上一步递归处理所有能触达到的模块后，得到了每个模块被翻译后的内容以及它们之间的 **依赖关系图**
>    
>       *注意：在构建的整个流程中，都会调用注册的对应plugin*
>    
> 3. 生成阶段：
>    1. **输出资源(seal)**：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 `Chunk`，再把每个 `Chunk` 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
>    2. **写入文件系统(emitAssets)**：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统
>
> 参考：https://mp.weixin.qq.com/s/SbJNbSVzSPSKBe2YStn2Zw



总体流程就是：

创建complier对象，执行run()，从entry进入，将每个js（包括使用到的其他资源）转换为对应的module对象，module会交由loader进行编译转换，babel也就是这个时候处理源码。当前module处理完后，如果存在依赖（判断js文本有require或者import），就递归处理该依赖（生成对应module）。

所有依赖都处理成了module后，开始打包。此时分析之前递归的依赖关系，把mudule划分到不同的chunk，一个chunk就对应一个输出文件，生成一个chunk集合（比如，从entry import的多个js为一个chunk，动态导入的为一个chunk）。最后，整合每个chunk的资源，输出打包后的新文件。



注意：

- plugin在整个构建过程中，根据注册的生命周期hook调用
- css、静态文件等需要额外loader处理，webpack本身只处理js



## tree shaking

webpack5可以基于**ES module**进行静态的依赖解析，通过内置的默认插件**Terser**以移除模块中未使用的代码，减小打包体积，这个过程就是tree shaking。

webpack在**构建阶段**，提取模块依赖项，递归解析依赖项，最终完成一个依赖图。在这个图中每个模块就是一个节点。

在依赖图上，`Terser`进行tree shaking，以减小下一步的输出文件大小。

tree shaking，即基于依赖图标记未使用的函数，在最终打包的时候，移除这部分未使用的导出。



*补充*：commonJs基于运行时动态处理，无法预先进行tree shaking。



### **代码分割（Code Splitting）**

指根据多个entry、动态导入、路由配置等，分割最后打包的代码。通常是默认全部打包到一个文件。代码分割在构建依赖的时候就已经确定，在最后打包的时候实现分离。



### 热更新HMR（Hot Module Replacement）

需要手动添加插件：`webpack.HotModuleReplacementPlugin`

配置字段

```js
 devServer: { 
     hot: true, // 启用 HMR  
 },
```

原理：

- 通过 **WebSocket** 与客户端建立通信。

- 基于node.js api `fs.watch`检测到文件变化时，触发Webpack 计算文件hash
- 对比hash值确认内容变化后，构建增量模块包。

- 将变更后的模块通过 WebSocket 推送给浏览器。

- 浏览器接收更新，使用 Runtime API 替换旧模块，触发模块重新渲染。



## 额外

## vue-loader

webpack本身只支持js，同理，vue文件本身也是不支持的，需要loader进行处理。

vue-loader将vue单文件按照标签拆分：

- `template` 部分交给 `html-loader` 进行处理。

- `script` 部分交给 `babel-loader` 或其他 JavaScript Loader 处理。

- `style` 部分交给 `css-loader` 和 `style-loader`（或者 `sass-loader`，如果使用了 Sass）处理。

*注意*

- 后续需要的loader，包括html-loader等，需要手动引入
- vue-loader需要配合插件**VueLoaderPlugin**使用
