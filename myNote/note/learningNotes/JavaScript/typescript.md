# Typescript

速览：https://vue3js.cn/es6/typeScript.html

开发文档：https://ts.nodejs.cn/docs/handbook/intro.html

## 关键字

**接口定义**：interface

```ts
interface demo{
    readonly id:number; //只读
    name:string;
    age?:number;		//可选
    fn:(data:number)=>number	//函数
}
```

**类型别名**：type (除了无法继承，可与interface替换使用)

**类型断言**：as

**类型实现**：implement，约束必须实现接口所有定义 (可以多，不能少)；

**获取一个对象的键**：keyof

**声明模块**：declare，声明全局已经存在的变量、类、类型等，告诉TS可直接使用；



## 类

相比js，扩展了`public`、`private` 和 `protected` 三种访问修饰符；

public：默认值；公用属性；

private：私有；相当于js的`#`符；只能实例自己访问；

protected：受保护；只能自己或子类访问；

