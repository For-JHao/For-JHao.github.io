# github page

只提供静态页面功能。

有两种部署方式，一种是指定分支和文件夹，一种是利用GitHub action配置工作流；

**指定分支和文件夹**：

简单直接，github会自动寻找在指定路径（只能是分支根目录”/“或者"/docs"）顶层的index.html；

**利用工作流：**

适合利用框架（vue，react等）搭建的项目，可以通过github action配置打包和部署；