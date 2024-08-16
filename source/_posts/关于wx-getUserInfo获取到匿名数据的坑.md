---
title: 关于wx.getUserInfo获取到匿名数据的坑
date: 2021-06-02 23:30:13
tags: 前端
---

> 生命的黎明是乐园，青春才是真正的天堂。——华兹华斯

今天搞了很久，发现使用`wx.getUserInfo`获取到的用户昵称一直是：“微信用户”，并且头像也是默认的。。。

![image-20210604000712350](/imgs/oss/picGo/image-20210604000712350.png)

然后官方文档里发现

https://developers.weixin.qq.com/miniprogram/dev/api/open-api/user-info/wx.getUserInfo.html

![image-20210603233710758](/imgs/oss/picGo/image-20210603233710758.png)

打开后是[这个页面](https://developers.weixin.qq.com/community/develop/doc/000cacfa20ce88df04cb468bc52801?highLine=login)

![image-20210603233248550](/imgs/oss/picGo/image-20210603233248550.png)

然后我们看`wx.getUserProfile`的文档：

> `wx.getUserProfile`只能在页面产生点击事件（例如 `button` 上 `bindtap` 的回调中）后才可调用每次请求都会弹出授权窗口，用户同意后返回 `userInfo`。该接口用于替换 `wx.getUserInfo`，详见 [用户信息接口调整说明](https://developers.weixin.qq.com/community/develop/doc/000cacfa20ce88df04cb468bc52801?highLine=login)。

注意`desc`是必填

![image-20210603233836235](/imgs/oss/picGo/image-20210603233836235.png)

我们配置好`appid`后

![image-20210604000107222](/imgs/oss/picGo/image-20210604000107222.png)

![image-20210604000214991](/imgs/oss/picGo/image-20210604000214991.png)

调用`wx.getUserProfile`

代码如下

```vue
<template>
	<view style="width:100%;height: 100%;" @tap="getUserProfile()"><textarea maxlength="-1" style="width:100%;height: 100%;" value="点击屏幕任意区域" placeholder="" /></view>
</template>
<script>
export default {
	data() {
		return {
			title: '',
			strings: ''
		};
	},
	methods: {
		getUserProfile() {
			wx.getUserProfile({
				desc: '登录获取信息',
				success: res => {
					console.log('小程序获取用户信息成功');
					console.log(res);
				},
				fail: res => {
					console.log('小程序获取用户信息失败');
					console.log(res);
				}
			});
		}
	}
};
</script>
```

效果如下

![image-20210604000348021](/imgs/oss/picGo/image-20210604000348021.png)

可以看到我们打印出来了成功获取到的乱七八糟信息

![image-20210604000544797](/imgs/oss/picGo/image-20210604000544797.png)
