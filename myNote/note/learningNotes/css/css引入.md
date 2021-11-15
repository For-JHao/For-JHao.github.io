# HTML引入css

## 链接式

使用<link>标签

```html
<link href="./myStyle.css">
```

链接式<link>属于html的一部分，放在<head>标签内，css文件会同页面一起加载。



## 导入式

在<style>标签中使用@import

```html
<style type="text/css">
    @import "./myStyle.css"
</style>
```

@import语句属于css的一部分，，会等页面下载完成后才加载，因此如果css文件过大，会因为加载时间差，页面出现一瞬间闪烁。

但可以使用@import，在一个css中导入多个css文件，集中管理。

