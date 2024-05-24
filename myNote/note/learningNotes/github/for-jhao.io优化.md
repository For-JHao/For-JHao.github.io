# For-JHao 优化



<img src=".\img\image-20240523184711798.png" alt="image-20240523184711798" style="zoom:60%;" />

这是当前的博客网络性能（24.5.23，开启代理），一共发起了79个请求，其中js占了76个，除去一个打包的主js文件，其他都是该js发起的资源请求（见**Initiator**）。主要问题在于tsparticles的引入，加载了一大堆js。

**Time**的第一行为完整的数据请求时间（连接+数据传输），第二行为**Time to first byte** (**TTFB**) 的时间。两个时间很接近，意味着每个js传输的很快，主要时间都花在了服务器建立连接和响应上。

点击具体的请求，可以看到等待github服务器响应占据了巨头。

<img src=".\img\image-20240523192914170.png" alt="image-20240523192914170" style="zoom:40%;" />	

因此，优化方案从减少请求链接入手，主要有两点：

1. **检查剔除多余的js；**
2. **合并零散js；**



## 实践

通过**coverage**查看这些js的使用情况。

<img src=".\img\image-20240524153448081.png" alt="image-20240524153448081" style="zoom:33%;margin-left:0" />



都是有被使用到的，这也符合Rollup的静态分析，只打包有用的资源。

现在只有尝试合并js；

检查发现这些js都是tsparticles使用的动态导入打出来的包。<img src=".\img\image-20240524153916328.png" alt="image-20240524153916328" style="zoom: 33%;" />

修改vite配置，将动态导入内联，这样打包出来就一个js文件；

```js
//vite.config.js
export default defineConfig({
 //添加inlineDynamicImports属性
  build:{
    rollupOptions:{
      output:{
        inlineDynamicImports:true
      }
    }
  }
})
```

查看效果

<img src=".\img\image-20240524155658857.png" alt="image-20240524155658857" style="zoom:50%;" />

速度快了很多！

虽然代码内联了后，主js文件增加到了580kB，但是经过gzip的压缩，实际传输只占了185kB，并且节省了大量的服务器等待时间，效果非常好。







