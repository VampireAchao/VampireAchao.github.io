---
title: 处理js的JSON.parse中Number太长导致精度丢失问题
date: 2024-05-17 20:32:17
tags: 前端
---

> 大自然的真实和单纯，常是重要艺术极点的基础。——恩格斯

代码如下：

```javascript
"token".split(".").slice(0,2).map(i=>JSON.parse(atob(i)))
```

这里主要是 `JSON.parse` 导致的，我简单复现一下

```javascript
JSON.parse('{"id":9052710354240385291}')
```

得到的是

```javascript
{id: 9052710354240385000}
```

可以看到后面的 `291` 变为 `000` 了

解决方式这里使用正则匹配 `/:\s*([-+]?\d+(\.\d+)?([eE][-+]?\d+)?)/g` 

例如：

```javascript
JSON.parse('{"id":9052710354240385291}'.replace(/:\s*([-+]?\d+(\.\d+)?([eE][-+]?\d+)?)/g, (match, p1) => {
                if (Math.abs(p1) > Number.MAX_SAFE_INTEGER) {
                    return `:"${p1}"`;
                }
                return `:${p1}`;
            }))
```

得到

```javascript
{id: '9052710354240385291'}
```

这里注意，我们只对超长数字进行了处理

```javascript
JSON.parse('{"id":9052710354240385291,"age":23}'.replace(/:\s*([-+]?\d+(\.\d+)?([eE][-+]?\d+)?)/g, (match, p1) => {
                if (Math.abs(p1) > Number.MAX_SAFE_INTEGER) {
                    return `:"${p1}"`;
                }
                return `:${p1}`;
            }))
```

得到的是：

```javascript
{id: '9052710354240385291', age: 23}
```
