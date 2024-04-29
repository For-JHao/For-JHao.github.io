# SASS(SCSS)

sass有两种语法格式，更贴合css的写法即为scss

**scss文件导入**：@import 'file'

也可以导入到具体某个样式内

```scss
#main {
  @import "example";
}
```

**支持样式嵌套**；

**变量声明**：$; 

支持块级作用域

```scss
$highlight-color: #F90;
#main {
  color: $highlight-color;
}
```

**父选择器**：&;

```scss
a {
  font-weight: bold;
  &:hover { text-decoration: underline; }
}
```

**支持+, -, *, /, %运算**

**继承**：@extend

```scss
.error {
  border: 1px #f00;
}
.seriousError {
  @extend .error;
  border-width: 3px;
  //也可以@extend .error:hover; （如果有）
}
```

避免原来css的样式重复书写，或者class=''.error .seriousError"写法带来的依赖不明确

**混合指令**：定义 @mixin，引用 @include

会把定义的属性（而不是类），直接混入其他类中；

```scss
//定义混合large-text；
//注意，large-text不是类名
@mixin large-text {
  color: #ff0000;
}

//引用
.page-title {
  @include large-text;
  padding: 4px;
  margin-top: 10px;
}
```

混合也可以带参数,，如@mixin large-text ($color, $width) {...}

**scss提供了新的内置函数**

*参考：https://sass-lang.com/documentation/modules/*

**也支持自定义函数**: @function

```scss
$grid-width: 40px;
$gutter-width: 10px;

//自定义函数
@function grid-width($n) {
  @return $n * $grid-width + ($n - 1) * $gutter-width;
}

#sidebar { width: grid-width(5); }
```

**额外还有一些控制指令**：@if，@while等；（使用较少）

