# DOM

Document Object Model——文档对象模型;

以节点树的形式变现文档。文档中的每一个部分都可以用节点表示，包括每一个元素、属性、空格，等；

## 接口

### 获取

获取**子元素**（标签）：domObj.children();

获取**子节点**（所有类型节点）：domObj.childNodes();

获取**父元素**、**节点**：domObj.parentElement()、domObj.parentNode()

### 增删

创建标签：document.createElement();

添加节点：nodeFather.appendChild();

删除：nodeFather.removeChild();（不能自我删除）

解析元素并插入：domObj.insertAdjacentHTML()；

*仅插入，比innerHTML（销毁再插入）更快*

### 判断页面的来源地址

document.referrer

只能判断a链接跳转，无法判断浏览器后退的跳转
