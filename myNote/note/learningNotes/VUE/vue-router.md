# vue-router

## 路由传参：

- query

```javascript
 this.$router.push({
        path: '/particulars',
        query: {
          id: id
        }
      })
// query传递的参数会显示在url后面?id=？
```

子组件获取参数：this.**$route**.query.id



- params

```js
 this.$router.push({
        name: 'particulars',
        params: {
          id: id
        }
      })
//此时通过name来匹配路由
```

子组件获取参数：this.**$route**.params.id



- 通过path配合模板字符串传参

```js
this.$router.push({
      path: `/particulars/${id}`,
})

//对应路由配置
{
     path: '/particulars/:id',
     name: 'particulars',
     component: particulars
 }
```

该方式页面刷新数据不会丢失