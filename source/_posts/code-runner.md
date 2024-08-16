---
title: code runner
date: 2023-01-08 18:01:48
tags: 软件及插件
---

> 万人都要将火熄灭，我一人独将此火高高举起。——海子

分享一个插件：`Code Runner`可以直接运行代码，不需要复杂配置环境

![image-20230108180234862](/imgs/oss/blog/vampireachao/image-20230108180234862.png)

安装以后可以直接运行当前文件

![image-20230108180326596](/imgs/oss/blog/vampireachao/image-20230108180326596.png)

我们直接运行`ts`的话，还需要安装一个`ts-node`

```shell
tyarn global add ts-node
```

运行代码：

```typescript
class Student {
    fullName: string;
    constructor(firstName: string, middleInitial: string, lastName: string) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

console.table(user)
```

![image-20230108180953730](/imgs/oss/blog/vampireachao/image-20230108180953730.png)