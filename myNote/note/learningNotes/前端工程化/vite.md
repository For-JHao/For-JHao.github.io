# vite

基于浏览器对**ES module**的原生加载支持，使本地es module代码能够无需打包直接运行。具有极快的开发启动速度。

对于第三方的依赖，通过工具**ESbuild**进行预编译为一个es module的模块，缓存在`.vite`目录下。

对于生产环境打包，则通过**Rollup**进行打包，Rollup支持tree shaking、代码分割等功能。



## HMR

和webpack一样，通过库chokidar（封装node fs.watch）监听文件变化，基于websocket和浏览器通信。

但是vite维护了一个**模块图**用于定位每次更新的具体模块，实现更快的热更新。



**缓存更新**

- 开发模式下，vite在推送给浏览器的 HMR 更新消息中，Vite 会根据模块路径（URL）附加一个 **版本号参数** 来强制刷新缓存。

- 生产模式下，基于 **Rollup** 进行打包，会为输出的静态资源计算内容哈希，直接附加在打包文件名上。例如`main.a1b2c3d4.js`



*Note.  webpack有一个**依赖图**，但也仅存在于构建阶段用于依赖分析。webpack的热更新依赖于其自身的缓存机制和插件*