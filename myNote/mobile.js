function MobileInstance(maxWidth) {
    //当前视口宽度
    this.viewWidth = window.innerWidth
    
    //使用钩子函数afterOutMobile注册的方法
    this.afterOutMobileFun = null

    //包装函数仅移动端执行
    this.runOnMobile = function (fun, errFun) {
        return function (...arg) {
            if (this.viewWidth < maxWidth) fun(...arg)
            else errFun && errFun()
        }.bind(this)
    }

    //脱离移动端maxWidth时钩子函数
    this.afterOutMobile = function (fun) {
        this.afterOutMobileFun = fun
    }

    //重置viewWidth
    this.resetViewWidth = function (width) {
        if (this.viewWidth <= maxWidth && width > maxWidth) {
            //脱离移动端，触发注册函数
            this.afterOutMobileFun && this.afterOutMobileFun()
        }
        this.viewWidth = width

    }.bind(this)

    //防抖
    let debounceFun = function (fun) {
        let timer = null
        return function (arg) {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                fun(arg)
            }, 50)
        }
    }

    //监视view变化
    let viewWatcher = function () {
        let debounceResetView = debounceFun(this.resetViewWidth)
        window.addEventListener('resize', () => {
            debounceResetView(window.innerWidth)
        })
    }.bind(this)

    viewWatcher()
}
