---
title: js解决base64编码问题
date: 2024-05-18 20:53:39
tags: 前端
---

> 地利不如人和，武力不如文德。——恒宽

主要是在解析 `JWT` 时发现

```javascript
atob(base64)
```

存在编码问题，我们如果想要将 `base64` 解码为 `utf-8`：

```javascript
    function parseBase64ToJSON(base64) {
        const binaryString = atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);

        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        const decoder = new TextDecoder('utf-8');
        return decoder.decode(bytes);
    }
```

然后就可以正确解析中文了
