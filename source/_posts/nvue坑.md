---
title: nvue坑
date: 2021-11-01 19:42:40
tags: 前端
---

> 人之所以走入迷途，并不是由于他的无知，而是由于他自以为知。——卢梭 《爱弥儿》

前两天用`nvue`踩了不少坑，例如之前写的[`nvue`引入图标坑](https://VampireAchao.github.io/2021/10/29/nvue引入图标坑/)就是一个

例如`manifest.json`中这里需要配置为`weex`才能使用`weex`渲染

[`uniapp-nvue`文档](https://uniapp.dcloud.io/nvue-outline?id=%e7%bc%96%e8%af%91%e6%a8%a1%e5%bc%8f)

[`weex`文档](http://emas.weex.io/zh/)

![image-20211101194520857](/imgs/oss/picGo/image-20211101194520857.png)

要注意[这里](https://uniapp.dcloud.io/nvue-outline?id=nvue%e5%bc%80%e5%8f%91%e4%b8%8evue%e5%bc%80%e5%8f%91%e7%9a%84%e5%b8%b8%e8%a7%81%e5%8c%ba%e5%88%ab)

基本上是`nvue`的一些常见的坑

![image-20211101195951761](/imgs/oss/picGo/image-20211101195951761.png)

还有其他的一些，例如一些不支持的`css`写法如`transition`

如果写成`transition: 1s;`则会提示

![image-20211101200656255](/imgs/oss/picGo/image-20211101200656255.png)

当然`transition: all 1s;`也不行

![image-20211101200733475](/imgs/oss/picGo/image-20211101200733475.png)

只能针对对应的过渡去写：

```css
	transition-property: width;
	transition-duration: 1s;
```

缩写就是：

```css
	transition: width 1s linear 2s;
```

一般像不支持的全局属性，需要写在条件编译里

```css
.logo {
	height: 0;
	width: 0;
	/* #ifndef APP-PLUS-NVUE */
	transition: all 1s;
	/* #endif */
	/* #ifdef APP-PLUS-NVUE */
	transition: width,height 1s;
	/* #endif */
}
```

需要注意的是，我这里格式化，会把`width,height`中间加一个空格，就不生效了

多个`transition`中间逗号一定不能加空格

