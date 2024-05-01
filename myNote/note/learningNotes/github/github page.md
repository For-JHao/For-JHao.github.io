# github page

## 部署发布流程

GitHub page只提供静态页面功能。

有两种部署方式，一种是指定分支和文件夹，一种是利用GitHub action配置工作流；

**指定分支和文件夹**：

简单直接，github会自动寻找在指定路径（只能是分支根目录”/“或者"/docs"）顶层的index.html；

**利用工作流：**

适合利用框架（vue，react等）搭建的项目，可以通过github action配置打包和部署；

工作流需要编写yml文件，重点是根据项目情况，比如执行install和build任务，将生成的静态文件交给预置工作流[`actions/upload-pages-artifact`](https://github.com/actions/upload-pages-artifact) 。该工作流会按一定规则打包好静态文件，并上传到github的工作环境，再供接下来的 [`actions/deploy-pages`](https://github.com/actions/deploy-pages)流程调用，部署github page。这两个工作流都是github官方认证并建议使用的预置工作流，配套使用。



在setting里的environment项里，可以限制允许部署到github page的分支



参考：

[GitHub Pages 快速入门](https://docs.github.com/zh/pages/quickstart)

[upload-pages-artifact](https://github.com/marketplace/actions/upload-github-pages-artifact);

[deploy-pages](https://github.com/marketplace/actions/deploy-github-pages-site)



## 部署react项目

部署前需要打包源代码，编写yml文件：

```yaml
      - name: Install dependencies
        run: npm ci
        # working-directory: ./... 指定文件目录，如果有需要
      - name: Build
        run: npm run build
        # working-directory: ./...
```

然后调用官方推荐的两个处理工作流

```yaml
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          # Upload dist folder
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```



react router如果是用的BrowserRouter模式，在url中输入path后enter，或者刷新页面，浏览器的默认行为就会发起http请求服务器，但由于使用的是GitHub page提供的服务，服务器没有匹配的路由，会出现404（正常做前端路由的应用，不管请求的什么path，后端服务会配置都返回根html文件以及路由信息，再到前端加载js匹配路由）。

在前端js通过history api操作url不会发起http请求；

使用HashRouter模式不受影响。



**处理方案**

为了保留BrowserRouter，我采用的处理方案是，在public建立404.html，打包后会放入根目录，github page在找不到资源时会访问根目录404.html。此时在404.html跳转回首页。这样保证在用户感知上，不会出现刷新页面成404的情况。

