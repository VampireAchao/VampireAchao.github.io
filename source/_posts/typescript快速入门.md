---
title: typescript快速入门
date: 2021-12-20 21:10:07
tags: 前端
---

> 在原则产问题上，要坚定如磐石；在兴趣问题上，则要顺应潮流。——美国


官方文档：https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html

中文文档：https://www.tslang.cn/docs/handbook/typescript-in-5-minutes.html

下载`VScode`：https://visualstudio.microsoft.com/zh-hans/

安装后打开

![image-20211220212143635](/imgs/oss/picGo/image-20211220212143635.png)

新建文件

![image-20211220212747778](/imgs/oss/picGo/image-20211220212747778.png)

选择语言

![image-20211220212853543](/imgs/oss/picGo/image-20211220212853543.png)

![image-20211220212906119](/imgs/oss/picGo/image-20211220212906119.png)

写下代码

```typescript
function greeter(person) {
    return "Hello, " + person;
}

let user = "Jane User";

document.body.innerHTML = greeter(user);
```

![image-20211220214909361](/imgs/oss/picGo/image-20211220214909361.png)

顺手安个中文

重启后，我们打开控制台

![image-20211220215159856](/imgs/oss/picGo/image-20211220215159856.png)

然后安装`typescript`

```shell
cnpm install -g typescript
```

![image-20211220215306560](/imgs/oss/picGo/image-20211220215306560.png)

编译`ts`文件：

```shell
tsc D:\file\projects\hello-typescript\hello-typescript.ts
```

我们打开目录：

![image-20211220215755153](/imgs/oss/picGo/image-20211220215755153.png)

![image-20211220215812493](/imgs/oss/picGo/image-20211220215812493.png)

信任项目，然后可以看到我们编译后的`js`

![image-20211220215850648](/imgs/oss/picGo/image-20211220215850648.png)

看到和`ts`一模一样，这说明`js`代码在`ts`中是支持的

`typescript`的一大特性就是它是强类型语言，例如下面这段代码：

```typescript
function greeter(person: string) {
    return "Hello, " + person;
}

let user = "Jane User";

document.body.innerHTML = greeter(user);
```

我们编译一下，可以看到我们这里指定了`person`为`string`类型，我们传入了字符串`Jane User`，确实可以成功编译，那我们试试传入一个数组呢？

```typescript
function greeter(person: string) {
    return "Hello, " + person;
}

let user = [0, 1, 2];

document.body.innerHTML = greeter(user);
```

可以看到报了一个错

![image-20211220225637358](/imgs/oss/picGo/image-20211220225637358.png)

提示类型错误

![image-20211220230342032](/imgs/oss/picGo/image-20211220230342032.png)

但我们的`ts`还是成功被编译了，所以就算你的代码里有错误，你仍然可以使用`TypeScript`

下面试试接口

```typescript
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };

document.body.innerHTML = greeter(user);
```

此处我们用`interface`定义了一个接口`Person`

因此我们需要传入`Person`结构的对象，当然我们也可以用`implements`实现该接口

```typescript
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };

document.body.innerHTML = greeter(user);
```

我们可以在构造参数的变量上加`public`，等同于创建了同名的成员变量

```typescript
class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

document.body.innerHTML = greeter(user);
```

我们可以把它编译后的`js`引入到一个`html`中运行，或者直接使用`vscode`运行