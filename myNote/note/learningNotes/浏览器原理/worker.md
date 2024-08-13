# web worker

包括三种，都基于独立的工作器线程工作，不会影响主线程：

- **Dedicated Worker**：专用worker，只能被创建它的主线程使用（即当前标签页下有效）；
- **Shared Worker**：共享worker，同源页面包括iframe共享该worker；
- **Service Worker**：服务器worker，同源前提下，满足指定路径的页面共同拥有该worker；

web worker和主线程双方，均通过**postMessage()**方法和监听**'message'事件**来发送和接受通信数据



## Dedicated Worker

通常用来替代主线程计算一些耗时任务，以进行性能优化；



## Shared Worker

通常用来跨页面共享状态和数据



## Service Worker

特有‘fetch‘事件类型，监听该事件类型可以拦截全局网络请求；

因为自身缓存独立于页面且长期有效，可以进行长时间缓存，并提供离线支持；

service worker缓存会一直存在直到被手动清除；
