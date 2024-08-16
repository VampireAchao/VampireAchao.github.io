---
title: canvas视频截帧
date: 2022-09-03 22:48:54
tags: 前端
---

> 礼貌是儿童和青年都应该特别小心地养成习惯的第一件大事——约翰·洛克

先放代码：

```javascript
 <script>
        /**
         * 
         * @param src string 视频url
         * @param currentTime double 视频截取位置,单位秒
         * @return 截取图片的 base64
         */
        function getImgFromVideoUrl(src, currentTime) {
            if (!src) return
            if (!currentTime || currentTime < 0) {
                // 如果传入截取位置小于0, 给个默认值
                currentTime = 0.001
            }
            return new Promise(resolve => {
                const body = document.querySelector("body")
                // 获取/创建video节点
                const video = document.querySelector("#imgExtractorVideo") || document.createElement("video")
                if (!video.id) {
                    // id,隐藏样式
                    Object.assign(video, {
                        id: 'imgExtractorVideo',
                        style: "display: none"
                    })
                    // 允许跨域
                    video.setAttribute('crossorigin', 'anonymous')
                    // 添加到页面上，下次就不用创建，直接用
                    body.append(video)
                }
                // 此处给video赋值,canplay需要重新赋值，否则load后不会重复调用
                Object.assign(video, { src, currentTime, oncanplay })
                // 获取/创建canvas节点
                const canvas = document.querySelector("#imgExtractorCanvas") || document.createElement("canvas")
                if (!canvas.id) {
                    // id,隐藏样式
                    Object.assign(canvas, {
                        id: 'imgExtractorCanvas',
                        style: "display: none"
                    })
                    // 添加到页面上，下次就不用创建，直接用
                    body.append(canvas)
                }
                // 获取canvas context
                const context = canvas.getContext("2d")
                // canvas渲染视频节点，转换为base64
                async function oncanplay() {
                    // 为canvas设置宽高为视频的宽高
                    Object.assign(canvas, { height: video.videoHeight, width: video.videoWidth })
                    // 渲染视频
                    context.drawImage(video, 0, 0)
                    // 获取视频时长
                    const duration = isNaN(video.duration) ? 0 : video.duration
                    if (currentTime > duration) {
                        // 如果当前传入截取位置大于视频时长,取视频时长 -0.1 然后重新截取
                        currentTime = duration - 0.1;
                        resolve(await getImgFromVideoUrl(src, currentTime))
                    } else {
                        // 这里的 toDataURL 第二个参数为图片质量，可接受范围 0~1 ,超出后为默认值 0.92
                        resolve(canvas.toDataURL("image/png", 1.0))
                    }
                }
            })
        }



        window.onload = async () => {
            // 视频长度 15s 左右

            // 调用
            let imgBase64 = await getImgFromVideoUrl("/imgs/oss/picGo/rabbit.mp4")

            // 使用
            console.log({ imgBase64 })
            let img = document.createElement("img")
            img.src = imgBase64
            document.querySelector("body").append(img)

            // 调用
            imgBase64 = await getImgFromVideoUrl("/imgs/oss/picGo/rabbit.mp4", 3)
            // 重复使用
            console.log({ imgBase64 })
            img = document.createElement("img")
            img.src = imgBase64
            document.querySelector("body").append(img)

            // 调用
            imgBase64 = await getImgFromVideoUrl("/imgs/oss/picGo/rabbit.mp4", 4)
            // 重复使用
            console.log({ imgBase64 })
            img = document.createElement("img")
            img.src = imgBase64
            document.querySelector("body").append(img)

            // 调用
            imgBase64 = await getImgFromVideoUrl("/imgs/oss/picGo/rabbit.mp4", 20)
            // 重复使用
            console.log({ imgBase64 })
            img = document.createElement("img")
            img.src = imgBase64
            document.querySelector("body").append(img)

            // Promise回调地狱
            getImgFromVideoUrl("/imgs/oss/picGo/rabbit.mp4", 3)
                .then(base64 => {
                    // 使用
                    console.log({ base64 })
                    let img = document.createElement("img")
                    img.src = base64
                    document.querySelector("body").append(img)

                    // Promise回调地狱
                    getImgFromVideoUrl("/imgs/oss/picGo/rabbit.mp4", 4)
                        .then(base64 => {
                            // 使用
                            console.log({ base64 })
                            let img = document.createElement("img")
                            img.src = base64
                            document.querySelector("body").append(img)

                            // Promise回调地狱
                            getImgFromVideoUrl("/imgs/oss/picGo/rabbit.mp4", 5)
                                .then(base64 => {
                                    // 使用
                                    console.log({ base64 })
                                    let img = document.createElement("img")
                                    img.src = base64
                                    document.querySelector("body").append(img)
                                })
                        })
                })

        }



    </script>
```

效果：

![image-20220903231413684](/imgs/oss/blog/image-20220903231413684.png)

接下来是博客和`MDN`：

`Promise`博客：https://VampireAchao.github.io/2021/12/04/Promise/

`oss`视频截封面博客：https://VampireAchao.github.io/2022/01/10/oss视频截封面/

`MDN`：

- `Promise`：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise

- `document.querySelector`：https://developer.mozilla.org/zh-CN/docs/Web/API/Document/querySelector

- `document.createElement`：https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createElement

- `Object.assign`：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

- `element.setAttribute`：https://developer.mozilla.org/zh-CN/docs/Web/API/Element/setAttribute

- `element.append`：https://developer.mozilla.org/zh-CN/docs/Web/API/Element/append

- `HTMLCanvasElement.getContext`：https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/getContext

- `canplay currentTime videoHeight duration`等`API`的介绍，通过`document.querySelector("#imgExtractorVideo")`或者是`document.createElement("video")`返回的`HTMLMediaElement`：https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement

- `video`标签：https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video

- `canvas`：https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API

- `async`函数：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function

- `await`：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await

- `canvas`使用图像：https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Using_images

- `isNaN`：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/isNaN

- `getContext toDataURL`等`API`的介绍，通过`document.querySelector("#imgExtractorCanvas")`或者`document.createElement("canvas")`返回的`HTMLCanvasElement`：https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement

如果我们`Base64`需要下载，可以参考：[blob和base64互转](https://VampireAchao.github.io/2022/09/01/blob和base64互转/)
