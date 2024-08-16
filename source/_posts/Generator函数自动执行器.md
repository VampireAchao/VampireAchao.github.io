---
title: Generator函数自动执行器
date: 2022-03-05 22:46:29
tags: 前端
---

> 有的东西被遗忘，有的东西销声匿迹，有的东西死了，而其中几乎不含有悲剧性因素。——《寻羊冒险记》

今天用`typescript`写了个`Generator`函数自动执行器：

```typescript
export function runGenAuto(fn: Function) {
    let gen: Generator<Function> = fn()
    function next() {
        let result = gen.next()
        if (result.done) {
            return result.value
        }
        return result.value(next)
    }
    return next();
}
```

为了测试效果，我们定义一个`Generator`函数，这个函数用于将`URLSearchParams`转换成一般对象

当然直接遍历不用`generator`也能实现上述需求，但这里主要是为了测上方的自动执行`Generator`函数的效果

```typescript
interface Param {
    [key: string]: any
}
export function* transferToObj(params: URLSearchParams) {
    let result: Param = {};
    for (let [key, value] of params.entries()) {
        yield (next: Function) => next(result[key] = value)
    }
    return result
}
```

使用时传入对应的`Thunk`函数即可

```typescript
let params = runGenAuto(() => transferToObj(new URLSearchParams("q=apple&from=en&to=zh&appid=2015063000000001&salt=1435660288&sign=f89f9594663708c1605f3d736d01d2d4")))
console.log(params)
```

打印结果：

![img](/imgs/oss/picGo/U%5BI1UE589LCNYO%7BF3VH2Y%60B.png)