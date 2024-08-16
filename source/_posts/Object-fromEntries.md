---
title: Object.fromEntries
date: 2022-04-02 12:45:17
tags: 前端
---

> 微微怪时间不能保存情绪，保存那一切情绪所曾流连的境界。——《你是人间的四月天》

[文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)

我们可以用其将`Iterator`转换为对象，例如`Map、Array`或者实现`@@iterator`方法的的对象

```javascript
Object.fromEntries(new URLSearchParams("q=apple&from=en&to=zh&appid=2015063000000001&salt=1435660288&sign=f89f9594663708c1605f3d736d01d2d4"))
```

![image-20220402132501540](/imgs/oss/picGo/image-20220402132501540.png)

```javascript
Object.fromEntries(new Map(new URLSearchParams("q=apple&from=en&to=zh&appid=2015063000000001&salt=1435660288&sign=f89f9594663708c1605f3d736d01d2d4")))
```

![image-20220402132519763](/imgs/oss/picGo/image-20220402132519763.png)

例如我这里写一个`class`，实现[迭代协议]()

```javascript
class Ruben {
  constructor(data) {
    this.data = data
    this.dataArray = Object.entries(data)
  }

  [Symbol.iterator]() {
    // Use a new index for each iterator. This makes multiple
    // iterations over the iterable safe for non-trivial cases,
    // such as use of break or nested looping over the same iterable.
    let index = 0;

    return {
      next: () => {
        if (index < this.dataArray.length) {
          return {value: this.dataArray[index++], done: false}
        } else {
          return {done: true}
        }
      }
    }
  }
}
```

然后我们就可以把其作为一个迭代器使用，例如散列运算符

```javascript
[...new Ruben({
    "q": "apple",
    "from": "en",
    "to": "zh",
    "appid": "2015063000000001",
    "salt": "1435660288",
    "sign": "f89f9594663708c1605f3d736d01d2d4"
})]
```

![image-20220402125759466](/imgs/oss/picGo/image-20220402125759466.png)

或者我们提到的`Object.fromEntries`

```javascript
Object.fromEntries(new Ruben({
    "q": "apple",
    "from": "en",
    "to": "zh",
    "appid": "2015063000000001",
    "salt": "1435660288",
    "sign": "f89f9594663708c1605f3d736d01d2d4"
}))
```

当然还是返回一个对象

![image-20220402131805240](/imgs/oss/picGo/image-20220402131805240.png)

甚至`for..of`

```javascript
for (let i of  new Ruben({
    "q": "apple",
    "from": "en",
    "to": "zh",
    "appid": "2015063000000001",
    "salt": "1435660288",
    "sign": "f89f9594663708c1605f3d736d01d2d4"
}))console.log(i)
```

![image-20220402132155602](/imgs/oss/picGo/image-20220402132155602.png)

我们再写一个无穷迭代器且实现了迭代协议让其变为一个可迭代对象

```javascript
class SimpleClass {
  constructor(data) {
    this.data = data
  }

  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        return {value: index++}
      }
    }
  }
}
```

然后我们使用该方法，会造成死循环，因为永远不会结束迭代

```javascript
[...new SimpleClass()]
```

另一种写法是`function`形式

```javascript
function idMaker() {
    let index = 0;
    return {
       next: function() {
           return {
               value: index++,
               done: false
           };
       }
    };
}
```

使用起来差不多：

```javascript
let it = idMaker();

console.log(it.next().value); // '0'
console.log(it.next().value); // '1'
console.log(it.next().value); // '2'
```

`fromEntries`是将迭代器转为对象，也可以用`Object.entries`将对象转换为数组

```javascript
Object.entries({
    "q": "apple",
    "from": "en",
    "to": "zh",
    "appid": "2015063000000001",
    "salt": "1435660288",
    "sign": "f89f9594663708c1605f3d736d01d2d4"
})
```

得到

![image-20220402125759466](/imgs/oss/picGo/image-20220402125759466.png)

