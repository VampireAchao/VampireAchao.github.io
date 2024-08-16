---
title: 代码方式引入iconfont图标
date: 2021-08-06 23:51:47
tags: 前端
---

> 只有永远躺在泥坑里的人，才不会再掉进坑里。——黑格尔

前端开发中，经常会遇到需要引用图标的情况

我们可以在`iconfont`寻找我们需要的图标

https://www.iconfont.cn/

比如这两个图标，我非常喜欢，我可以使用直接下载的方式引入图标

![image-20210807235830582](/imgs/oss/picGo/image-20210807235830582.png)

但这种方式，如果我们需要它改变颜色的话，就需要再次下载，非常麻烦

我们还可以使用代码方式引入，我们首先点击添加进购物车

![image-20210807235934426](/imgs/oss/picGo/image-20210807235934426.png)

然后到我们的购物车结算

![image-20210807235955601](/imgs/oss/picGo/image-20210807235955601.png)

点击添加至项目

![image-20210808000019218](/imgs/oss/picGo/image-20210808000019218.png)

登录账号

![image-20210808000034169](/imgs/oss/picGo/image-20210808000034169.png)

然后再次点击添加至项目后会弹出加入项目，我们可以新建一个项目

![image-20210808000842960](/imgs/oss/picGo/image-20210808000842960.png)

确定后，我们就可以在这里点击生成代码

![image-20210808000912155](/imgs/oss/picGo/image-20210808000912155.png)

然后复制代码

![image-20210808000935218](/imgs/oss/picGo/image-20210808000935218.png)

粘贴到项目`css`中

![image-20210808001313987](/imgs/oss/picGo/image-20210808001313987.png)

然后定义使用`iconfont`的样式

```css
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
```

最后复制图标代码

![image-20210808001442497](/imgs/oss/picGo/image-20210808001442497.png)

然后引入

![image-20210808001647719](/imgs/oss/picGo/image-20210808001647719.png)

效果如下：

![image-20210808001700769](/imgs/oss/picGo/image-20210808001700769.png)

