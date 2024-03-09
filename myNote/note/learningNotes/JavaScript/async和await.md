# async/await

async函数中，遇到await，会阻塞后续流程，并在await等待的promise被resolve时，再将后续流程放入微任务中等待执行；

*注意*：

1. 如果await关键词后面跟的函数，会先同步执行函数，await接受到函数返回值，此时才会运作await阻塞

2. await阻塞范围仅为async函数中的后续流程，async外的后续流程，在**await阻塞后**照常进行

3. async函数只有包含阻塞流程都完成后，才会返回一个promise（状态由该过程是否有抛错决定）

```js
            async function test1(){
                let res=await test3()
                //放入微任务
                console.log(1,res)
            }
            async function test3(){
                console.log('async 3')
                let res=await function test33(){
                    console.log('before await 3')
                    return setTimeout(() => {
                        console.log('timeout') //宏任务
                    }, 2000);
                }()
                //放入微任务
                console.log(3,res)
            }

            let res=test1()
            console.log('0',res)

            //console
            // async 3
            // before await 3
            // 0
            // 3
            // 1
            // timeout
```
