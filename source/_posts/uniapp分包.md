---
title: uniapp分包
date: 2021-11-04 18:38:27
tags: 前端
---

> 当众人都哭时，应该允许有的人不哭。当哭成为一种表演时，更应该允许有的人不哭。——莫言

我们在使用`uniapp`进行微信小程序开发时可能会遇到如下情况：

![image-20211104160028042](/imgs/oss/picGo/image-20211104160028042.png)

这是因为[微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages.html)提到：

>某些情况下，开发者需要将小程序划分成不同的子包，在构建时打包成不同的分包，用户在使用时按需进行加载。
>
>在构建小程序分包项目时，构建会输出一个或多个分包。每个使用分包小程序必定含有一个**主包**。所谓的主包，即放置默认启动页面/TabBar 页面，以及一些所有分包都需用到公共资源/JS 脚本；而**分包**则是根据开发者的配置进行划分。
>
>在小程序启动时，默认会下载主包并启动主包内页面，当用户进入分包内某个页面时，客户端会把对应分包下载下来，下载完成后再进行展示。
>
>目前小程序分包大小有以下限制：
>
>- 整个小程序所有分包大小不超过 20M
>- 单个分包/主包大小不能超过 2M
>
>对小程序进行分包，可以优化小程序首次启动的下载时间，以及在多团队共同开发时可以更好的解耦协作。

此时可以进行简单的静态资源处理，将`static`目录下的图片之类的压缩或者放到在线图床上

如果在这样处理后还是提示超过`2M`

那么我们就进行分包

按照[`uniapp`官方文档](https://uniapp.dcloud.io/collocation/pages?id=subpackages)提到的，我们首先先将目录分出来：

例如我之前的`pages.json`为：

```json
{
	"pages": [ //pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
		{
			"path": "pages/index/index",
			"style": {
				"navigationBarTitleText": "uni-app"
			}
		},
		{
			"path": "pages/news/list",
			"style": {
				"navigationBarTitleText": "news-list",
				"enablePullDownRefresh": false
			}
		},
        {
			"path": "page/user/list",
			"style": {
				"navigationBarTitleText": "user-list",
				"enablePullDownRefresh": false
			}
		}
	],
	"globalStyle": {
		"navigationBarTextStyle": "black",
		"navigationBarTitleText": "uni-app",
		"navigationBarBackgroundColor": "#F8F8F8",
		"backgroundColor": "#F8F8F8"
	}
}

```

对应的目录为：

```json
┌─pages               
│  ├─index
│  │  └─index.nvue    
│  ├─news
│  │  └─list.nvue
│  └─user
│     └─list.nvue
├─static
├─main.js
├─App.vue
├─manifest.json
└─pages.json
```

我们将其改为如下目录：

```json
┌─pages               
│  ├─index
│     └─index.nvue    
├─pages-user
│     ├─static	
│     └─list.nvue 
├─pages-news  
│     ├─static
│     └─list.nvue 
├─static
├─main.js
├─App.vue
├─manifest.json
└─pages.json
```

这里`pages-user`和`pages-news`就是我们的子包，我们将只有子包对应用到的静态文件放到子包的`static`下

然后我们将`pages.json`改为：

```json
{
	"pages": [ //pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
		{
			"path": "pages/index/index",
			"style": {
				"navigationBarTitleText": "uni-app"
			}
		}

	],
	"subPackages": [{
		"root": "pages-user",
		"pages": [{
			"path": "list",
			"style": {
				"navigationBarTitleText": "user-list",
				"enablePullDownRefresh": false
			}

		}]
	}, {
		"root": "pages-news",
		"pages": [{
			"path": "list",
			"style": {
				"navigationBarTitleText": "news-list",
				"enablePullDownRefresh": false
			}

		}]
	}],
	"globalStyle": {
		"navigationBarTextStyle": "black",
		"navigationBarTitleText": "uni-app",
		"navigationBarBackgroundColor": "#F8F8F8",
		"backgroundColor": "#F8F8F8"
	}
}
```

主要就是将子包中的页面，放到了`subPackages`下对应的子包配置中，以及配置了根路径`root`，再修改具体的路径

改完后，在页面中写的`navigator`跳转路径也要进行相应的修改

例如我这里：

```vue
		<navigator url="/pages-user/list">user-list</navigator>
		<navigator url="/pages-news/list">news-list</navigator>
```

要注意，子包下的静态资源，在小程序上是不可共享的

![image-20211104162009686](/imgs/oss/picGo/image-20211104162009686.png)

