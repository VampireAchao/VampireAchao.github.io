---
title: 网页运行java程序cheerpj
date: 2024-02-17 18:24:09
tags: java
---

> 不清不见尘，不高不见危。——王尘

分享一个在网页上运行`java`应用的框架

https://labs.leaningtech.com/cheerpj3/getting-started/Java-app

首先按照提示下载`TextDemo.jar`，这是一个`GUI`程序，然后编写`html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>CheerpJ test</title>
    <script src="https://cjrtnc.leaningtech.com/3.0/cj3loader.js"></script>
  </head>
  <body>
    <script>
      (async function () {
        await cheerpjInit();
        cheerpjCreateDisplay(800, 600);
        await cheerpjRunJar("/app/TextDemo.jar");
      })();
    </script>
  </body>
</html>
```

命令：

```bash
Last login: Fri Feb 16 23:08:37 on ttys002

The default interactive shell is now zsh.
To update your account to use zsh, please run `chsh -s /bin/zsh`.
For more details, please visit https://support.apple.com/kb/HT208050.
Github-Id-VampireAchao:~ achao$ cd ~/IdeaProjects/
Github-Id-VampireAchao:IdeaProjects achao$ mkdir simple-cheerpj
Github-Id-VampireAchao:IdeaProjects achao$ cd simple-cheerpj/
Github-Id-VampireAchao:simple-cheerpj achao$ touch index.html
Github-Id-VampireAchao:simple-cheerpj achao$ vim index.html
Github-Id-VampireAchao:simple-cheerpj achao$ ls
index.html
Github-Id-VampireAchao:simple-cheerpj achao$ mv ~/Downloads/TextDemo.jar .
Github-Id-VampireAchao:simple-cheerpj achao$ ls
TextDemo.jar	index.html
Github-Id-VampireAchao:simple-cheerpj achao$ npx http-server -p 8080
Starting up http-server, serving ./

http-server version: 14.1.1

http-server settings:
CORS: disabled
Cache: 3600 seconds
Connection Timeout: 120 seconds
Directory Listings: visible
AutoIndex: visible
Serve GZIP Files: false
Serve Brotli Files: false
Default File Extension: none

Available on:
  http://127.0.0.1:8080
  http://172.20.10.4:8080
  http://192.168.64.1:8080
Hit CTRL-C to stop the server
```

效果：

![](/imgs/oss/blog-img/2024-02-17-18-29-08-image.png)
