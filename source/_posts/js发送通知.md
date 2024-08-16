---
title: js发送通知
date: 2023-02-06 21:33:36
tags: 前端
---

> 温和的对待，不会使敌人变成朋友——萨迪

文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Notification

https://developer.mozilla.org/zh-CN/docs/Web/API/notification/requestPermission

代码如下

```javascript
Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        const notification = new Notification("Hi there!");
        // …
      }
    });
```

效果：

![image-20230206214339440](/imgs/oss/blog/vampireachao/image-20230206214339440.png)

![image-20230206214409482](/imgs/oss/blog/vampireachao/image-20230206214409482.png)

完整代码：

```javascript
function notifyMe() {
  if (!("Notification" in window)) {
    // Check if the browser supports notifications
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    const notification = new Notification("Hi there!");
    // …
  } else if (Notification.permission !== "denied") {
    // We need to ask the user for permission
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        const notification = new Notification("Hi there!");
        // …
      }
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them anymore.
}
```

![image-20230206214514488](/imgs/oss/blog/vampireachao/image-20230206214514488.png)