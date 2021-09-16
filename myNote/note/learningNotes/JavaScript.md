# JAVASCRIPT深入

## 变量提升

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
- 函数，包括箭头函数，作用域中的var声明不会提升全局，想要访问函数作用域变量只能return（给上级），或闭包特性（给下级函数）
- 当函数中不存在该变量或方法时，函数仍然可以向上攀升原型链，在全局中查找

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

### 暂时性死区

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

### 解构赋值

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

## 函数

### 立即执行函数：

*注意：*立即执行函数前一行代码必须加分号，否则报错



### 柯里化(Currying)**

即将接受多个参数的函数转变为**接受一个参数，而多余参数通过返回函数进行处理**的做法。

例：

```javascript
// 普通写法
function add(x, y) {
    return x + y
}

// Currying后
function curryingAdd(x) {
    return function (y) {
        return x + y
    }
}

add(1, 2)           // 3
curryingAdd(1)(2)   // 3
```

本质上类似于数学上多元函数的逐次消元过程。



### 函数回调

通过函数回调的方式，可以实现获取内层异步函数的执行结果；

也可以借助函数回调，给封装好的外层函数（接收固定参数），添加额外参数再封装；

> JavaScript中，函数若没有使用return，将自动返回undefined



## 变量

注意：

字符串的空格是有值的；(即，空白字符)	

```javascript
let a="";
let b=" ";
console.log(a==b);//false
console.log(!a);//true
console.log(!b);//false
//但是，在进行非严格相等判断时（==），“ ”依然等于false
console.log(b==false)//true
```



## 内存回收机制**











