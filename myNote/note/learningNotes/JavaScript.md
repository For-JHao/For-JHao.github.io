# JAVASCRIPT

# 变量提升深入

var 不识别块作用域，块作用域中var 声明的变量，在代码**解析**时会将**声明**提到当前顶级作用域（赋值，即初始化仍保留原位），由于解析在执行前，即使该代码块不执行，其中的var变量声明也会被提升。

```javascript
console.log(test)//undefined，not error
{
    if(false){
        var test="haha"
    }
}
```

注意：

- 当前顶级作用域可以是全局作用域，或函数作用域；

- 函数作用域中的var声明不会提升全局，想要访问函数作用域变量只能return（给上级），或闭包特性（给下级函数）

```javascript
var tmp = new Date();
function f() {
   console.log(tmp);    
   if(false) {
       var tmp = 'HelloWorld';//声明提升到函数作用域
   }
}
f()//undefined，访问到函数内声明tmp，不会调用全局tmp
```



## 暂时性死区

如果当前块作用域存在let,const 申明了同名变量，则在声明前使用变量不会向父级作用域查找，而是直接报未初始化的错；

```javascript
var test="abc";

for(let i=0;i<5;i++){
    console.log(test)//error
    let test;
    test="123";
    console.log(test)//123
}
```



# 解构赋值

- 数组的解构赋值，获取变量由**顺序**决定；

- 对象的解构赋值，获取由匹配的**键名**决定，与顺序无关，若同时在**值**位给变量，则该**值**给该变量名；

```javas
let {a}={a:123}	//以a为键名匹配，并将值给a
console.log(a)	//123

let {aa:b}={aa:123}	//以aa为键名匹配，并将值给b
console.log(aa)	//error,not defined
console.log(b)	//123,给b而不是给aa
```

默认值：

解构赋值若设置了默认值，只有当变量**本身**严格等于undefined(===)，才会将默认值给变量

```javascript
let [a=1,b]=[]
console.log(a)	//1
console.log(b)	//undefined
```

