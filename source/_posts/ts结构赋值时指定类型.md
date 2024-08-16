---
title: ts结构赋值时指定类型
date: 2022-04-14 13:35:11
tags: 前端
---

> “枕头里藏满了发了霉的梦，梦里住满了无法拥有的人。”——网易云评论

我们在`typescript`中使用变量结构时如果需要指定类型，可以这样写：

```typescript
const { a, b, c }: { a: any; b: string; c: { cname: any; cid: any; } } = obj;
```

但一般还是定义接口

```typescript
interface IObj {
    a: any;
    b: string;
    c: IC;
}
interface IC {
    cname: any;
    cid: any;
}
const { a, b, c }: IObj = obj;
```

对于箭头函数也是同理

```typescript
array.map(({ a, b, c }: IObj)=>{})
```

如果我们接口中某个属性可以为`null`或其他属性，我们可以使用`|`

```typescript
interface IObj {
    a: any;
    b: string | number | null;
    c: IC;
}
```

甚至如果该属性是可选的，我们可以使用`?`

```typescript
interface IObj {
    a: any;
    b?: string;
    c: IC;
}
```

