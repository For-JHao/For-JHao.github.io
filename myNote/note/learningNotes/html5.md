# HTML5

## 嵌入页面Iframe

- contentWindow：获取子窗口的window对象的，兼容各大浏览器

document.getElementById("iframeId").contentWindow 

- contentDocument：获取子窗口的document对象的，主流浏览器都支持

例：document.getElementById("iframeId").contentDocument

 

**注意**：

- iframe内嵌网页异步加载，获取内部body高度需要借助iframe标签的onLoad方法，等iframe加载完后获取dom

- 空iframe的默认高度似乎为150px

 

## 语义化

| <article>    | 定义文章。                                         |
| ------------ | :------------------------------------------------- |
| <aside>      | 定义页面主内容以外的内容。                         |
| <details>    | 定义用户能够查看或隐藏的额外细节。                 |
| <summary>    | 定义 <details> 元素的可见标题。                    |
| <figcaption> | 定义 <figure> 元（图片等）的标题。                 |
| <figure>     | 规定自包含内容，比如图示、图表、照片、代码清单等。 |
| <footer>     | 定义文档或节的页脚。                               |
| <header>     | 规定文档或节的页眉。                               |
| <main>       | 规定文档的主内容。                                 |
| <mark>       | 定义重要的或强调的文本。                           |
| <nav>        | 定义导航链接。                                     |
| <section>    | 定义文档中的节。                                   |
| <time>       | 定义日期/时间。                                    |