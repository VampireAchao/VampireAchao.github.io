---
title: hexo主题集成pug
date: 2022-12-27 21:34:29
tags: 前端
---

> 你问人问题，她若答非所问，便已是答了，无需再问。——木心

文档：https://hexo.io/zh-cn/docs/themes

先创建`hexo`项目

```shell
hexo init simple-hexo
```

然后到`themes`新建一个主题文件夹

```shell
cd .\simple-hexo\themes\
mkdir simple-theme
```

修改外部`_config.yml`的`theme`

```yaml
theme: simple-theme
```

![image-20221227214101921](/imgs/oss/blog/vampireachao/image-20221227214101921.png)

外部执行一下`hexo s`启动项目试试

![image-20221227214149257](/imgs/oss/blog/vampireachao/image-20221227214149257.png)

打开`localhost:4000`

![image-20221227214209708](/imgs/oss/blog/vampireachao/image-20221227214209708.png)

因为我们什么都没写，所以是白屏

新建一个`layout`目录，下面放一个`index.pug`

![image-20221227214537115](/imgs/oss/blog/vampireachao/image-20221227214537115.png)

```pug
.container Hello World
```

发现我们的`pug`代码并未渲染

![image-20221227214609042](/imgs/oss/blog/vampireachao/image-20221227214609042.png)

这是因为我们没有安装`pug`插件导致的

到主目录执行

```shell
cnpm i hexo-renderer-pug
```

![image-20221227214724883](/imgs/oss/blog/vampireachao/image-20221227214724883.png)

`pug`元素成功渲染

![image-20221227214744285](/imgs/oss/blog/vampireachao/image-20221227214744285.png)

好了，接下来你可以编写你自己的主题啦！