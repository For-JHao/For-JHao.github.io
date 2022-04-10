# CSS画图

## 箭头

<img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fku.90sjimg.com%2Felement_pic%2F01%2F59%2F64%2F90574866d3b4cb3.jpg&refer=http%3A%2F%2Fku.90sjimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639532906&t=49a0c52d77056e90425ebae7185f8ef8" alt="arr" style="zoom:15%;" />

利用border加旋转

```css
.arrowDown{
    height: 6px;
    width: 6px;
    border-right: white solid 2px;
    border-bottom: white solid 2px;
    transform: rotate(45deg);
}
```



## 菜单（三条杠）

利用border-style 的double样式

```css
.menu{
    width:50px;
    height:10px;
    border-bottom:10px solid; 	//与height保持一致
    border-top:30px double; //bottom的三倍
}
//double属性值——“透明”双线条框
```



## 三角形

当borde有宽度而宽高为0时，4条border会共同挤满整个矩形框，每条边都会呈现三角形。使不需要的三条边不显示。

```css
.triangle{
    height:0;
    width:0;
    border:10px solid；
    border-color : transparent transparent transparent orange 
}
```

