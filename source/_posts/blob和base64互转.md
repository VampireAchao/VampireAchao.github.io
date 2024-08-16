---
title: blob和base64互转
date: 2022-09-01 23:01:03
tags: 前端
---

> 交易场上的朋友胜过柜子里的钱款——托·富勒

`blob`转`base64`

```javascript
        // blob转base64
        async function blobToBase64(blob) {
            let buffer = await blob.arrayBuffer()
            let bytes = new Uint8Array(buffer);
            console.log(bytes)
            // do anything with the byte array here

            let binary = ''
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }

            base64 = 'data:image/webp;base64,' + window.btoa(binary)
            console.log(base64)
            return base64
        }
```

`base64`转`blob`

```javascript
  // base64转blob
        function base64ToBlob(code) {
            let parts = code.split(';base64,')
            let contentType = parts[0].split(':')[1]
            let raw = window.atob(parts[1]) // 解码base64得到二进制字符串
            let rawLength = raw.length
            let uInt8Array = new Uint8Array(rawLength) // 创建8位无符号整数值的类型化数组
            for (let i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i) // 数组接收二进制字符串
            }
            return new Blob([uInt8Array], { type: contentType })
        }
```

下载`blob`：[资源路径与blobUrl互转](https://VampireAchao.github.io/2022/08/31/资源路径与blobUrl互转/)

