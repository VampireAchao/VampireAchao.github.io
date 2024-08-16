---
title: recordrtc
date: 2023-04-23 22:12:07
tags: 前端
---

> 贫者因书而富，富者因书而贵。——王安石

分享一个`JavaScript`音频 + 视频 + 屏幕 + 画布(`2D`+ `3D`动画)录制库：`WebRTC `

https://recordrtc.org/

https://github.com/muaz-khan/RecordRTC

demo：https://www.webrtc-experiment.com/RecordRTC/simple-demos/

```javascript
let stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
let recorder = new RecordRTCPromisesHandler(stream, {
    type: 'video'
});
recorder.startRecording();

const sleep = m => new Promise(r => setTimeout(r, m));
await sleep(3000);

await recorder.stopRecording();
let blob = await recorder.getBlob();
invokeSaveAsDialog(blob);
```

非常的简单方便

![image-20230423222332937](/imgs/oss/blog/vampireachao/image-20230423222332937.png)