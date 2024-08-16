---
title: js中eval
date: 2022-04-15 12:48:19
tags: 前端
---

> 如果你来访我，我不在，请和我门外的花坐一会儿，它们很温暖，我注视他们很多很多日子了。——汪曾祺

今天发现这么一个函数[`eval`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval)

`eval`能够将传入的字符串当做`js`代码执行

例如处理`json`(请不要这样使用，正确的做法应该是使用`JSON.parse(data)`)：

```javascript
let data = '{"nane":"ruben","age":11}'
eval("("+data+")")
```

![image-20220415125619098](/imgs/oss/picGo/image-20220415125619098.png)

```javascript
console.log(eval('2 + 2'));
// expected output: 4

console.log(eval(new String('2 + 2')));
// expected output: 2 + 2

console.log(eval('2 + 2') === eval('4'));
// expected output: true

console.log(eval('2 + 2') === eval(new String('2 + 2')));
// expected output: false
```

这个`eval`非常危险，常用于攻击、侵入网站

因此我们要禁止的话，可以根据`CSP`文档：

https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP

添加一个`meta`在页面的`head`中

```html
<meta http-equiv="Content-Security-Policy"
    content="default-src 'self' https://*; img-src https://*; child-src 'none';">
```

关键在于`default-src`属性的设置：

https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy/default-src

此处由于没有添加`default-src 'unsafe-eval';`所以提示禁止使用`eval`

![image-20220415141027221](/imgs/oss/picGo/image-20220415141027221.png)

```shell
Uncaught EvalError: Refused to evaluate a string as JavaScript because 'unsafe-eval' is not an allowed source of script in the following Content Security Policy directive: "default-src 'self' https://*".
```

