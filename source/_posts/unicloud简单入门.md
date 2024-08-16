---
title: unicloud简单入门
date: 2021-10-04 20:32:56
tags: 前端
---

> 凡人生之生也，必以其欢，忧则失纪，怒则失端，忧悲喜怒道乃无处。爱欲静之，遇乱正之，勿引勿摧，福将自归。——管仲

简单来说，`uniCloud`可以用`js`搞定后端逻辑，之前后端做的事情，全部使用`js`编写，上传到云空间供客户端调用

那我们写一个简单的云函数吧

首先创建项目

![image-20211004203543702](/imgs/oss/picGo/image-20211004203543702.png)

勾选启用`uniCloud`然后点创建

右键`uniCloud`点击关联云服务空间或项目

![image-20211004203651692](/imgs/oss/picGo/image-20211004203651692.png)

然后登录并创建服务空间

![image-20211004203744616](/imgs/oss/picGo/image-20211004203744616.png)

![image-20211004203835088](/imgs/oss/picGo/image-20211004203835088.png)

创建完成后我们再次点击关联

![image-20211004203941542](/imgs/oss/picGo/image-20211004203941542.png)

![image-20211004204011261](/imgs/oss/picGo/image-20211004204011261.png)

这时候我们新建一个云函数

右键`cloudfunctions`点击新建云函数

![image-20211004204118384](/imgs/oss/picGo/image-20211004204118384.png)

输入函数名

![image-20211004204142739](/imgs/oss/picGo/image-20211004204142739.png)

稍作修改

```vue
'use strict';
exports.main = async (event, context) => {
	return 'hello uniCloud'
};
```

![image-20211004204301979](/imgs/oss/picGo/image-20211004204301979.png)

右键我们新建的云函数，点击上传并运行

![image-20211004204414361](/imgs/oss/picGo/image-20211004204414361.png)

可以看到控制台多了一个我们上传的云函数

![image-20211004204442651](/imgs/oss/picGo/image-20211004204442651.png)

并且控制台也打印了返回结果

![image-20211004204509178](/imgs/oss/picGo/image-20211004204509178.png)

我们在初始页面调用该函数

```vue
		uniCloud.callFunction({
			name: 'test',
			success: e => {
				this.title = e;
			}
		});
```

![image-20211004204700053](/imgs/oss/picGo/image-20211004204700053.png)

运行到内置浏览器就好，可以看到响应结果成功赋值给`title`

![image-20211004204748294](/imgs/oss/picGo/image-20211004204748294.png)

这就是我们的第一个云函数了
