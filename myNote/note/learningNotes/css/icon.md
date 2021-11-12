# CSS画图

## 箭头

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
```

