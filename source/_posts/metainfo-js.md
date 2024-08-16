---
title: metainfo.js
date: 2022-09-09 13:03:56
tags: 前端
---

> 谁若想在困厄时得到援助，就应在平日待人以宽——萨迪

分享一个获取文件信息的`js`库`MediaInfo.js`

代码仓库：

https://github.com/buzz/mediainfo.js

代码如下：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script type="text/javascript" src="https://unpkg.com/mediainfo.js/dist/mediainfo.min.js"></script>
</head>

<body>

    <input id="fileinput" type="file" />
    <script>
        const fileinput = document.getElementById('fileinput')

        const onChangeFile = (mediainfo) => {
            const file = fileinput.files[0]
            if (file) {
                console.log({ file });
                
                const getSize = () => file.size

                const readChunk = (chunkSize, offset) =>
                    new Promise((resolve, reject) => {
                        const reader = new FileReader()
                        reader.onload = (event) => {
                            if (event.target.error) {
                                reject(event.target.error)
                            }
                            resolve(new Uint8Array(event.target.result))
                        }
                        reader.readAsArrayBuffer(file.slice(offset, offset + chunkSize))
                    })

                mediainfo
                    .analyzeData(getSize, readChunk)
                    .then((result) => {
                        console.log({ result })
                    })
                    .catch((error) => {
                        console.error(`An error occured:\n${error.stack}`)
                    })
            }
        }

        MediaInfo({ format: 'text' }, (mediainfo) => {
            fileinput.addEventListener('change', () => onChangeFile(mediainfo))
        })
    </script>
</body>

</html>
```

任意选择一个文件

![image-20220909130832372](/imgs/oss/blog/image-20220909130832372.png)

