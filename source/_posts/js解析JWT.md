---
title: js解析JWT
date: 2024-05-19 20:57:43
tags: 前端
---

> 懂得生命真谛的人，可以使短促的生命延长。——西塞罗

代码如下：

```javascript
"token".split(".").slice(0,2).map(i=>JSON.parse(atob(i)))
```

当我在解析 `jwt` 的 `token` 时，发现 `token` 中附带的用户 `id` 存在精度丢失问题，然后用正则改进解析 `JWT` 的代码：

```javascript
const tokenParse = token => token.split(".").slice(0, 2).map(i => JSON.parse(atob(i).replace(/:\s*([-+]?\d+(\.\d+)?([eE][-+]?\d+)?)/g, (match, p1) => Math.abs(p1) > Number.MAX_SAFE_INTEGER ? `:"${p1}"` : `:${p1}`)));
```

但是还存在 `base64` 解码时无法正确解码中文问题，继续改进

```javascript
const tokenParse = token => token.split(".").slice(0, 2).map(i => JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(i), c => c.charCodeAt(0))).replace(/:\s*([-+]?\d+(\.\d+)?([eE][-+]?\d+)?)/g, (match, p1) => Math.abs(p1) > Number.MAX_SAFE_INTEGER ? `:"${p1}"` : `:${p1}`)));
```

使用：

```javascript
tokenParse("你的token")
```

即可获取到源数据

注意这里我们 `slice` 了 `token` 最后一部分，如果我们需要这部分维持原样：

```javascript
const tokenParse = token => token.split('.').map((part, index) => index < 2 ? JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(part), c => c.charCodeAt(0))).replace(/:\s*([-+]?\d+(\.\d+)?([eE][-+]?\d+)?)/g, (match, p1) => Math.abs(p1) > Number.MAX_SAFE_INTEGER ? `:"${p1}"` : `:${p1}`)) : part);
```
