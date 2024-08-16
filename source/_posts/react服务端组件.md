---
title: react服务端组件
date: 2023-10-27 08:38:07
tags: 前端
---

> 过分的赞美，对于心智是有害的。——克雷洛夫

相关博客如下：

[Introducing Zero-Bundle-Size React Server Components – React](https://react.dev/blog/2020/12/21/data-fetching-with-react-server-components)

https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components

仓库地址：

https://github.com/reactjs/server-components-demo

> 这是一个使用服务器组件构建的Demo应用，服务器组件是一个实验性的 React 功能。我们强烈建议在浏览此演示之前观看介绍服务器组件的演讲视频。该视频包括演示代码的流程，并重点介绍服务器组件如何工作以及它们提供的功能的关键点。

使用`node18+`，进入`Demo`

```bash
npm install --legacy-peer-deps
npm start
```

此处再运行`Docker`，运行数据库环境

```bash
docker-compose up
```

![](/imgs/oss/blog-img/2023-10-27-09-09-23-image.png)

然后打开 http://localhost:4000

![](/imgs/oss/blog-img/2023-10-27-09-09-40-image.png)

随便写写

![](/imgs/oss/blog-img/2023-10-27-09-11-14-image.png)
