---
title: escape、unescape废弃
date: 2022-07-08 13:22:09
tags: 前端
---

> 爱所有人，信任少数人，不负任何人。——莎士比亚

今天看到这个`API`废弃了，提示使用 [`encodeURI`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURI) 或 [`encodeURIComponent`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) 代替。

![image-20220708132306785](/imgs/oss/picGo/image-20220708132306785.png)

但是貌似有部分符号并没有转义成功

![image-20220708132417722](/imgs/oss/picGo/image-20220708132417722.png)

最后在[示例](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent#示例)看到了解决办法

```javascript
var fileName = 'my file(2).txt';
var header = "Content-Disposition: attachment; filename*=UTF-8''"
             + encodeRFC5987ValueChars(fileName);

console.log(header);
// 输出 "Content-Disposition: attachment; filename*=UTF-8''my%20file%282%29.txt"


function encodeRFC5987ValueChars (str) {
    return encodeURIComponent(str).
        // 注意，尽管 RFC3986 保留 "!"，但 RFC5987 并没有
        // 所以我们并不需要过滤它。
        replace(/['()]/g, escape). // i.e., %27 %28 %29
        replace(/\*/g, '%2A').
            // 下面的并不是 RFC5987 中 URI 编码必须的
            // 所以对于 |`^ 这 3 个字符我们可以稍稍提高一点可读性
        replace(/%(?:7C|60|5E)/g, unescape);
}

// 以下是上述功能的替换方案
function encodeRFC5987ValueChars2(str) {
  return encodeURIComponent(str).
    // 注意，尽管 RFC3986 保留 "!"，但 RFC5987 并没有，
    // 所以我们并不需要过滤它。
    replace(/['()*]/g, c => "%" + c.charCodeAt(0).toString(16)). // i.e., %27 %28 %29 %2a (请注意，"*" 的有效编码是 %2A
                                                                 // 这需要调用 toUpperCase() 方法来正确编码)
    // 以下并不是 RFC5987 编码所必须的，
    // 这样我们可以让 |`^ 在网络上获取更好的可读性
    replace(/%(7C|60|5E)/g, (str, hex) => String.fromCharCode(parseInt(hex, 16)));
}
```

