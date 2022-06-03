# call&&bind

call()和bind()的区别在于，call()会立即执行，bind()会返回一个新函数等待调用；

在要绑定对象上，把函数作为其新属性供其调用，达到改变函数this指向的目的；

这里只大概实现了call()/bind()改动this的效果；

```js
        Function.prototype.myCall=function(_this,...args){
            _this.fn=this
            _this.fn(...args)
            delete _this.fn
        }
        
        Function.prototype.myBind=function(obj,...args){
            let _this=this
            return function(){
                obj.fn=_this
                obj.fn(...args)
                delete obj.fn
            }
        }

        function tt(arg){
            console.log(this.a)
            console.log(arg)
        }

        let obj={
            a:123
        }
        tt.call(obj)
        console.log('-----myCall------')
        tt.myCall(obj,22)
        console.log('-----myBind------')
        tt.myBind(obj,35)
        console.log('---run myBind----')
        tt.myBind(obj,35)()
```

![callBind](./img/call-bind.png)



*补充*：

call()和apply()，唯一区别在于，除了第一个参数this对象外，call()可接收多个参数，apply()接收一个数组；



