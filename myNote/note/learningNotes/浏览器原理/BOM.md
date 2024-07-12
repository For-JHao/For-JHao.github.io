# BOM

浏览器对象模型。提供了与浏览器交互的方法和属性。

## window对象

包含所有BOM对象的顶层对象



代表属性：

### **location**：返回浏览器URL.

**location.search**：属性，以字符串返回url上`?`及其后面拼接的参数。

可以使用api `URLSearchParams`很便利地处理search值

```js
var search = window.location.search; // 返回 "?user=name&sessionid=12345"

var params = new URLSearchParams(search);

var user = params.get('user'); // 返回 "name"
params.set("age", 3);	// 设置第三个参数。
```

