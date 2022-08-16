# Webpack

## 打包

打包能大大降低多文件加载的时间消耗；

## npm

包管理器，依赖于Node.js，会随node.js的安装一同安装。

### 包版本信息文件：package.json

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

版本号：

* ^version：最新的中版本和小版本
  
  ^1.0.1->1.x.x

* ~version：最新的小版本
  
  ~1.0.1->1.0.x

* version ：特定版本

执行npm install时，依照package.json中的配置进行相关包的更新及安装。
