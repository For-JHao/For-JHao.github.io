# Iframe

## 嵌入页面

- contentWindow：获取子窗口的window对象的，兼容各大浏览器

document.getElementById("iframeId").contentWindow 

- contentDocument：获取子窗口的document对象的，主流浏览器都支持

例：document.getElementById("iframeId").contentDocument

**注意**：

- iframe内嵌网页异步加载，获取内部body高度需要借助iframe标签的onLoad方法，等iframe加载完后获取dom

- 空iframe的默认高度似乎为150px


