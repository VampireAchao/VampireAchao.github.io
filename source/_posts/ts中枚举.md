---
title: ts中枚举
date: 2022-06-19 17:08:28
tags: 前端
---

> 现实生活喜欢对称和轻微的时间错移。——博尔赫斯《南方》

填坑，官方文档：https://www.typescriptlang.org/docs/handbook/enums.html

我新建了一个`vue`项目用来演示

这里代码如下：

```typescript
enum Direction {
  Up,
  Down,
  Left,
  Right
}
console.log({ Direction });
console.log({ 'Object.entries(Direction)': Object.entries(Direction) });
console.log({ 'Direction[0]': Direction[0] });
console.log({ 'Direction.Up': Direction.Up });
```

打印结果如下：

![image-20220619171805339](/imgs/oss/picGo/image-20220619171805339.png)

定义一个双向绑定的值

```typescript
const count = ref(Direction.Up)
```

在下方使用

```vue
<button type="button" @click="count++">count is: {{ count + Direction[count] }}</button>
```

默认是`0Up`

![image-20220619171934326](/imgs/oss/picGo/image-20220619171934326.png)

点一下

![image-20220619171950277](/imgs/oss/picGo/image-20220619171950277.png)

这说明对枚举进行递增，等于对齐值进行递增

我们这里将枚举中定义字符串初始值

```typescript
enum Direction {
  Up = '上',
  Down = '下',
  Left = '左',
  Right = '右'
}
```

然后发现之前生成的`8`个属性变成了`4`个，不支持直接使用值进行反向映射了

![image-20220619172508208](/imgs/oss/picGo/image-20220619172508208.png)

![image-20220619172532224](/imgs/oss/picGo/image-20220619172532224.png)

也无法自增了

![image-20220619172622989](/imgs/oss/picGo/image-20220619172622989.png)

但我们仍然可以使用这种方式

![image-20220619172708362](/imgs/oss/picGo/image-20220619172708362.png)

让其初始值变为1，后面的也会依次递增

比如这样写：

```typescript
enum Direction {
  Up = 1,
  Down,
  Left,
  Right = 10
}
```

生成的结果为：

```json
{
    "1": "Up",
    "2": "Down",
    "3": "Left",
    "10": "Right",
    "Up": 1,
    "Down": 2,
    "Left": 3,
    "Right": 10
}
```

