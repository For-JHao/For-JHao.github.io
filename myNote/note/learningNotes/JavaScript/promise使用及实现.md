# Promise使用及实现

## 使用

处理异步的机制，有三种状态：pending, fulfilled, rejected;

支持三种链式调用方法：then(), catch(), finally();

**`new promise(executor).then().catch().finally()`**

- **executor(resolveFunc, rejectFunc)**

executor始终是同步执行的，而**then**的调用始终是异步执行的；

 注意：和抛错不同，resolveFunc和rejectFunc的调用只会更改当前Promise的状态，不会停止executor的执行！

（简单点说就是，不能把这两个函数当return用）



- **then(onFulfilledCb, onRejectedCb)**

可以处理pending和fufilled状态的promise;

then()中经由onRejectedCb正常处理掉rejected的Promise后，then()本身会返回fulfilled的Promise（除非有报错）；



- **catch()**

会捕获前面Promise链上任何一个阶段**未被then的onRejectedCb捕获**的错误；

因此通常可以省略then的onRejectedCb，统一交由catch处理；

但此时不管是rejected还是抛错，都会直接**跳过所有流程**（除了finally）进入catch()；



- **finally()**

前面Promise状态都敲定（ fulfilled或rejected）后执行；即使前面链上有报错也会执行，此时和catch()的执行顺序取决于链的顺序



## 方法

**Promise.resolve(value)**

包装封装一个fulfilled的promise并返回；

但如果value本身是一个promise，则不管什么状态，不处理直接返回；



**Promise.all()**：等待所有成功后返回，一旦有一个失败直接返回；

**Promise.allSettled()**：无论失败还是成功，等待所有promise结果再返回；

以上两种方式返回的结果都是数组，**返回元素顺序按照传入顺序排列**，而不是兑现时间；



**Promise.any()**：有一个成功了就返回；

**Promise.race()**：等待一个promise出结果就返回；



## 实现

promise.then()的异步执行实际通过回调函数的方式实现；

1. 实现promise的状态切换和异步执行

通过订阅发布模式，在then()时收集订阅，用resolve()或reject()通知观察者执行订阅；

```js
        function PromiseFun(executor){
            const PENDING='pending'
            const FULFILLED='fulfilled'
            const REJECTED='reject'

            this.state=PENDING
            this.value=null
            this.reason=null

            this.fulfilledQueue=[]
            this.rejectedQueue=[]

            let resoluve=(value)=>{
                if(this.state===PENDING){
                    this.state=FULFILLED
                    this.value=value
                    this.fulfilledQueue.forEach(fn=>fn())
                }
            }
            let rejected=(reason)=>{
                if(this.state===PENDING){
                    this.state=REJECTED
                    this.reason=reason

                    this.rejectedQueue.forEach(fn=>fn())
                }
            }

            this.then=(res,rej)=>{
                if(this.state===PENDING){
                    this.fulfilledQueue.push(()=>{
                        res(this.value)
                    })
                    this.rejectedQueue.push(()=>{
                        rej(this.reason)
                    })
                }
                if(this.state===FULFILLED){
                   res(this.value)
                }
                if(this.state===REJECTED){
                    rej(this.reason)
                }
            }

            try {
                executor(resoluve,rejected)
            } catch (error) {
                rejected(error)
            }

        }
        let tr=new PromiseFun((res,rej)=>{
            // res(111)   
            rej(222)
            console.log(1)
            setTimeout(()=>{
                // res(333)
                rej(555)
            })
        })
        console.log(tr)
        tr.then(res=>{
            console.log('then res',res)
        },rej=>{
            console.log('then rej',rej)
        })
```

此时还不满足promise的链式调用；链式调用需要then返回新的promise；

2. > 参考
   > 
   > https://shq-splendid.gitee.io/2021/06/02/JavaScript%E5%BC%82%E6%AD%A5/