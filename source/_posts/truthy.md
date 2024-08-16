---
title: truthy
date: 2021-12-22 20:34:24
tags: 前端
---

> 每天务必做一点你所不愿意做的事情，这是一条宝贵的准则，它可以使你养成认真尽责而不以为苦的习惯。——马克.吐温

我们知道`js`中如果使用：

```javascript
if(2){
    console.log("2")
}
```

![image-20211222204333187](/imgs/oss/picGo/image-20211222204333187.png)

可以看到`if`中代码块执行了

这是因为[`JavaScript`](https://developer.mozilla.org/zh-CN/docs/Glossary/JavaScript) 在布尔值上下文中使用强制类型转换（[`coercion`](https://developer.mozilla.org/zh-CN/docs/Glossary/Type_Conversion)）

而我们`if`括号中表达式`2`，由于为`truthy`，也就是[真值](https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy)

所以被转换为了`true`

> JavaScript 中的真值示例如下（将被转换为 true，`if` 后的代码段将被执行）：
>
> ```javascript
> if (true)
> if ({})
> if ([])
> if (42)
> if ("foo")
> if (new Date())
> if (-42)
> if (3.14)
> if (-3.14)
> if (Infinity)
> if (-Infinity)
> ```

反之，我们也有`Falsy`

> 在 JavaScript 中只有 8 **个** **falsy** 值。
>
> 这意味着当 JavaScript 期望一个布尔值，并被给与下面值中的一个时，它总是会被当做 false。
>
> | `false`                                                      | [false](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Future_reserved_keywords_in_older_standards) 关键字 |      |
> | ------------------------------------------------------------ | ------------------------------------------------------------ | ---- |
> | 0                                                            | 数值 [zero](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) |      |
> | -0                                                           | 数值 负 [zero](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) |      |
> | 0n                                                           | 当 [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) 作为布尔值使用时, 遵从其作为数值的规则. `0n` 是 *falsy* 值. |      |
> | "", '', ``                                                   | 这是一个空字符串 (字符串的长度为零). JavaScript 中的字符串可用双引号 `**""**`, 单引号 `''`, 或 [模板字面量](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) **````** 定义。 |      |
> | [null](https://developer.mozilla.org/zh-CN/docs/Glossary/Null) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null) - 缺少值 |      |
> | [undefined](https://developer.mozilla.org/zh-CN/docs/Glossary/undefined) | [undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) - 原始值 |      |
> | [NaN](https://developer.mozilla.org/zh-CN/docs/Glossary/NaN) | [NaN ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN)- 非数值 |      |
>
> ## [例子](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy#例子)
>
>  JavaScript 中 *falsy* 值的例子 (在布尔值上下文中被转换为 false，从而*绕过*了 `if` 代码块):
>
> ```javascript
> if (false)
> if (null)
> if (undefined)
> if (0)
> if (0n)
> if (NaN)
> if ('')
> if ("")
> if (``)
> if (document.all)
> ```
>
> ### [逻辑与操作符 &&](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy#逻辑与操作符)
>
> 如果第一个对象（译注：原文如此）是 falsy 值，则返回那个对象：
>
> ```javascript
> let pet = false && "dog";
> 
> // ↪ false
> ```