---
title: uniapp微信小程序获取用户手机号
date: 2021-06-06 23:22:20
tags: 前端
---

> 价值产生信心，信心产生热忱，而热忱则征服世界。——华特·H·柯亭姆

我们在`uniapp`开发中有时会需要获取用户的手机号

可以在[官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/getPhoneNumber.html)找到对应的方法

这里注意一点，只能通过`button`进行点击获取

![image-20210606234600326](/imgs/oss/picGo/image-20210606234600326.png)

![image-20210606232622281](/imgs/oss/picGo/image-20210606232622281.png)

但我们这样获取到后还需要解密

比如我这里获取到的

```vue
<template>
	<view><button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">点我获取手机号</button></view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		getPhoneNumber(e) {
			console.log(e.detail.errMsg);
			console.log(e.detail.iv);
			console.log(e.detail.encryptedData);
		}
	}
};
</script>
```

![image-20210606232933403](/imgs/oss/picGo/image-20210606232933403.png)

你会发现获取到的是一串密文

![image-20210606232955137](/imgs/oss/picGo/image-20210606232955137.png)

这个我们需要用`session_key`

需要通过调用[`wx.login`](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.login.html)

```javascript
wx.login({
  success (res) {
    if (res.code) {
 	  console.log('获取code成功，code为：' + res.code)
    } else {
      console.log('登录失败！' + res.errMsg)
    }
  }
})
```

获取一个`code`作为参数

然后再加上`appid`和`appsecrect`调用微信提供的[`api`](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html)

![image-20210606233703061](/imgs/oss/picGo/image-20210606233703061.png)

去换取`openid`和`session_key`

然后再用[微信官方提供的一个`js`](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/signature.html#%E5%8A%A0%E5%AF%86%E6%95%B0%E6%8D%AE%E8%A7%A3%E5%AF%86%E7%AE%97%E6%B3%95)去解密

[下载地址](https://res.wx.qq.com/wxdoc/dist/assets/media/aes-sample.eae1f364.zip)

我们这里是`node`环境

所以引入`node`能用的这个`js`即可

![image-20210606234020683](/imgs/oss/picGo/image-20210606234020683.png)

使用方式在上面的那个`demo.js`中有

打开就是这样的

```javascript
var WXBizDataCrypt = require('./WXBizDataCrypt')

var appId = 'wx4f4bc4dec97d474b'
var sessionKey = 'tiihtNczf5v6AKRyjwEUhQ=='
var encryptedData = 
	'CiyLU1Aw2KjvrjMdj8YKliAjtP4gsMZM'+
	'QmRzooG2xrDcvSnxIMXFufNstNGTyaGS'+
	'9uT5geRa0W4oTOb1WT7fJlAC+oNPdbB+'+
	'3hVbJSRgv+4lGOETKUQz6OYStslQ142d'+
	'NCuabNPGBzlooOmB231qMM85d2/fV6Ch'+
	'evvXvQP8Hkue1poOFtnEtpyxVLW1zAo6'+
	'/1Xx1COxFvrc2d7UL/lmHInNlxuacJXw'+
	'u0fjpXfz/YqYzBIBzD6WUfTIF9GRHpOn'+
	'/Hz7saL8xz+W//FRAUid1OksQaQx4CMs'+
	'8LOddcQhULW4ucetDf96JcR3g0gfRK4P'+
	'C7E/r7Z6xNrXd2UIeorGj5Ef7b1pJAYB'+
	'6Y5anaHqZ9J6nKEBvB4DnNLIVWSgARns'+
	'/8wR2SiRS7MNACwTyrGvt9ts8p12PKFd'+
	'lqYTopNHR1Vf7XjfhQlVsAJdNiKdYmYV'+
	'oKlaRv85IfVunYzO0IKXsyl7JCUjCpoG'+
	'20f0a04COwfneQAGGwd5oa+T8yO5hzuy'+
	'Db/XcxxmK01EpqOyuxINew=='
var iv = 'r7BXXKkLb8qrSNn05n0qiA=='

var pc = new WXBizDataCrypt(appId, sessionKey)

var data = pc.decryptData(encryptedData , iv)

console.log('解密后 data: ', data)
// 解密后的数据为
//
// data = {
//   "nickName": "Band",
//   "gender": 1,
//   "language": "zh_CN",
//   "city": "Guangzhou",
//   "province": "Guangdong",
//   "country": "CN",
//   "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/aSKcBBPpibyKNicHNTMM0qJVh8Kjgiak2AHWr8MHM4WgMEm7GFhsf8OYrySdbvAMvTsw3mo8ibKicsnfN5pRjl1p8HQ/0",
//   "unionId": "ocMvos6NjeKLIBqg5Mr9QjxrP1FA",
//   "watermark": {
//     "timestamp": 1477314187,
//     "appid": "wx4f4bc4dec97d474b"
//   }
// }
```

解密完成后即可获取手机号~
