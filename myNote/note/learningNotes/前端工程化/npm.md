# npm

包管理器，依赖于Node.js，会随node.js的安装一同安装。

## 包版本信息文件：package.json

```javascript
{
 "name":"",// 唯一包名,相当于一个id
 "version":"",//版本号，需遵循npm的语义
 "description":"",
 "main":"",//执行入口,即入口文件
 "scripts":{
     //可自定义脚本命令，通过npm run 执行
    "bulid":""
 }
 "author":"",
 "license":"",
}
```

*注意：实际运行时，json文件不支持注释*

## **版本号**

符号：

^锁大版本号（major，也可以使用格式`1.x`表示）；

~锁次版本号（minor，也同时锁主版本，也可以使用格式`1.2.x`表示）

version ：特定版本

执行npm install时，依照package.json中的配置进行相关包的更新及安装。



## **package-lock.json**

- package.json指定精确版本号；

- package-lock：npm5引入，锁定当前项目依赖具体版本。不仅如此，依赖资源地址及其子依赖版本也会记录；

`npm ci`：会根据 `package-lock.json` 安装，用于 CI 环境。



## 配置

查看仓库地址：`npm config get registry`

**配置仓库地址**（私服配置）：`npm set registry http://xxx`



### 封装管理npm包：

**初始化npm项目**：`npm init`；实际就是生成一个package.json文件；

**配置npm仓库地址**：全局配置`npm config set registry xxxx`

**发布npm包**：`npm publish`

通常会采用全局配置的地址，也可以在package.json 额外配置发布地址（比如私服）：

```json
"publishConfig" : {
    "registry" : "http://xxx"
}
```

或者通过命令行: `npm publish --registry=http://xxx`



**更新包版本号**：`npm version <update_type>`，然后再publish到服务器。

**通常版本号更改规则**：

主版本号：破坏向后兼容的更改；

次版本号：向后兼容的新功能；

补丁版本号：bug修复；



npm文档：https://nodejs.cn/npm/about-npm/



# 其他包管理工具

## Yarn

由facebook开发，用于改进早期npm的一些问题。具有以下特点：

- 通过文件`yarn.lock`记录确切版本，确保依赖一致。（当时npm还没有package.lock）

- 通过并行下载和缓存，提高依赖下载速度。（新版npm改进了性能）

- 持久化本地包缓存，并支持离线从缓存下载。
- yarn3引入**Plug'n'Play**（PnP）模式和**零安装**。在PnP模式下，通过`.pnp.cjs`文件管理依赖和对应磁盘缓存的映射，通过缓存直接启动。



## pnpm

通过`pnpm-lock.yaml`管理依赖；

- 更节省空间。所有依赖统一存放，项目共享，而不是npm那样一个项目存放一个依赖库。

- 安装速度快，基于更好的依赖解析和存储管理，相比yarn和npm具有极快的安装速度。yarn默认情况下是从缓存copy依赖包到项目依赖，而npm每次都重新下载。



# node版本管理

## nvm

通过nvm可以方便的切换不同版本的node。因为npm和node集成，切换node版本也会切换不同版本的npm。