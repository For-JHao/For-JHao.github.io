# 异常捕获

try...catch...finally

**作用**

防止代码出错阻塞程序运行，将发生的错误捕获并进行特定处理；



**执行顺序**

1. try

2. 如果try有抛出错误（自动或手动抛出的错误），执行catch

3. 无论有无抛错，最后执行finally



*补充*：

- **catch只会捕获try执行时遇到的第一个错误**
  
  程序运行时，try中遇到错误，会停止执行try块的后续代码，直接跳转到对应catch块

```js
        console.log('start')
        try{
            console.log('try block')
            let a={}
            let b=a.name.age//a.name为undefined，再获取age会抛错
            //b的赋值抛错，剩余代码停止执行，进入catch
            throw 'something wrong'
            console.log('try end')
        }catch(err){
            console.log('catch block:',err)
        }finally{
            console.log('finally block')
        }
        console.log('end')
```

![img](C:\Users\JHao\Documents\GitHub\For-JHao.github.io\myNote\note\learningNotes\JavaScript\img\try_catch_1.png)



- **抛出的错误会被最近的catch捕获**
  
  如果最近的catch是父级，即被父级catch捕获

```js
        try {
            console.log('try block')
            // 如果这里抛错，不会运行子try...finally
            // throw 'something wrong'
            try {
                console.log('---son try block')
                throw 'son try block error'//在son finally后被父级catch捕获
            } finally {
                //正常执行
                console.log('---son finally')
            }
        } catch (err) {
            console.log('catch block:', err)
        } finally {
            console.log('finally block')
        }
```

![img](C:\Users\JHao\Documents\GitHub\For-JHao.github.io\myNote\note\learningNotes\JavaScript\img\try_catch_2.png)



**返回值**

- 如果在函数中，在try...catch...finally中写返回值，仍会**保证完整执行该try...catch...finally块**，随后函数立即return，**值为最后一个return值**；

```js
    function test() {
        try {
            console.log('try block')
            return 1
        } catch (err) {
            console.log('catch block:', err)
            return 2
        } finally {
            console.log('finally block')
            return 3    //覆盖掉try的return 1
        }
        //函数return 3，执行终止    

        console.log('function end')
        return 4
    };

    console.log(test())
```

![img](C:\Users\JHao\Documents\GitHub\For-JHao.github.io\myNote\note\learningNotes\JavaScript\img\try_catch_return_2.png)



- 在try/catch/finally各自代码块中，return后，后续代码均不会再执行

```js
        function test() {
            try {
                console.log('try block')
                return 1    //try完成，未抛错，跳转到finally block
                throw 'something wrong'
                try {
                    console.log('---son try block')
                } finally {
                    console.log('---son finally')
                    return 5
                }
            } catch (err) {
                console.log('catch block:', err)
                return 2
            } finally {
                console.log('finally block')
            }
            // try...finally完成，函数return 1，停止执行
            
            console.log('function end')
            return 4
        };
    
        console.log(test()) 
```

![img](C:\Users\JHao\Documents\GitHub\For-JHao.github.io\myNote\note\learningNotes\JavaScript\img\try_catch_return_1.png)



*注意*

在遇到return时，return后面的语句即会执行；如: return 1+2，即使在try...catch...finally中函数没有立即return，但1+2仍会立即执行




