# Promise原理及实现 

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

2. 







> 参考
>
> https://shq-splendid.gitee.io/2021/06/02/JavaScript%E5%BC%82%E6%AD%A5/