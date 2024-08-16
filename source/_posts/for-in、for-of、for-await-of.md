---
title: for...in、for...of、for await...of
date: 2023-03-26 23:05:31
tags: 前端
---

> 处世应当谦虚，切忌轻人傲世。——佚名

简单说下区别：

[`for...in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in)遍历出来的是`key`

```javascript
var obj = {a:1, b:2, c:3};

for (var prop in obj) {
  console.log("obj." + prop + " = " + obj[prop]);
}

// Output:
// "obj.a = 1"
// "obj.b = 2"
// "obj.c = 3"
```

[`for...of`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of)遍历出来的是元素

```javascript
const array1 = ['a', 'b', 'c'];

for (const element of array1) {
  console.log(element);
}

// Expected output: "a"
// Expected output: "b"
// Expected output: "c"
```

[`for await...of`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for-await...of)和`for...of`差不多，但支持遍历由`Promise`组成的可迭代对象(如数组)，使用时会自动`await`直到`Promise`执行结束才执行

```javascript
var asyncIterable = {
  [Symbol.asyncIterator]() {
    return {
      i: 0,
      next() {
        if (this.i < 3) {
          return Promise.resolve({ value: this.i++, done: false });
        }

        return Promise.resolve({ done: true });
      }
    };
  }
};

(async function() {
   for await (num of asyncIterable) {
     console.log(num);
   }
})();

// 0
// 1
// 2
```

