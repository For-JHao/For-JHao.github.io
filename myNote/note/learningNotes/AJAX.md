# AJAX

## XMLHttpRequest

**方法**

open(method,url,async)：规定请求类型

send(*string*)：发送请求

setRequestHeader（header，value）：设置自定义请求头，需要在send()前配置



**事件**

onreadystatechange：每当XHR实例对象的属性 readyState 改变时触发

>**xmlhttp.readyState的值及解释：**
>
>0：请求未初始化（还没有调用 open()）。
>
>1：请求已经建立，但是还没有发送（还没有调用 send()）。
>
>2：请求已发送，正在处理中（通常现在可以从响应中获取内容头）。
>
>3：请求在处理中；通常响应中已有部分数据可用了，但是服务器还没有完成响应的生成。
>
>4：响应已完成；可以获取并使用服务器的响应了。



一般结合属性**readyState**和**status**判断响应状态； 