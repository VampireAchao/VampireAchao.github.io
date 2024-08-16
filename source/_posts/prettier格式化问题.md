---
title: prettier格式化问题
date: 2022-02-08 19:53:51
tags: 软件及插件
---

> 惟沉默是最高的轻蔑——鲁迅

今天用[`prettier`插件](https://ext.dcloud.net.cn/plugin?name=formator-prettier)格式化`js`代码时发现解构赋值被换行了，可读性变得很低

原来我的代码样式：

```javascript
module.exports = {
	executeMiniLogin(vm) {
		uni.login({
			provider: 'weixin',
			success: async ({ code, errMsg }) => {
				if (errMsg != 'login:ok') {
					uni.$u.toast(`登录失败, 原因: ${errMsg}`);
					return
				}
				uni.$u.api.getTokenByCode(code).then(({ data, sessionKey, token }) => {
					vm.$store.dispatch('submitUser', { ...data, token, sessionKey })
						.then(user => {
							console.log("登陆成功", { user });
							console.log("vm.$store.getters.getUser: ", vm.$store.getters.getUser);
						})
				}).catch(({ code, message: mOpenId }) => {
					console.error({ code, mOpenId });
					if ('21003' === code) {
						uni.showModal({
							title: '提示',
							content: '该微信未绑定，是否注册？',
							confirmText: '确认',
							cancelText: '取消',
							success: ({ confirm }) => {
								if (confirm) {
									uni.getUserProfile({
										desc: '登录获取信息',
										success: ({ errMsg, userInfo, signature, encryptedData, iv }) => {
											if (errMsg !== 'getUserProfile:ok') {
												console.error({ errMsg });
												return
											}
											console.log('小程序获取用户信息成功,开始注册', { errMsg, userInfo, signature, encryptedData, iv });
											uni.$u.api.createUser({mOpenId}).then(({ data }) => {
												console.log({ data });
											})
										},
										fail: console.error
									});
								}
							}
						})
					}
				})
			}
		})
	}
}
```

格式化后变成了

```javascript
module.exports = {
	executeMiniLogin(vm) {
		uni.login({
			provider: 'weixin',
			success: async ({
				code,
				errMsg
			}) => {
				if (errMsg != 'login:ok') {
					uni.$u.toast(`登录失败, 原因: ${errMsg}`);
					return
				}
				uni.$u.api.getTokenByCode(code).then(({
					data,
					sessionKey,
					token
				}) => {
					vm.$store.dispatch('submitUser', {
							...data,
							token,
							sessionKey
						})
						.then(user => {
							console.log("登陆成功", {
								user
							});
							console.log("vm.$store.getters.getUser: ", vm.$store.getters
								.getUser);
						})
				}).catch(({
					code,
					message: mOpenId
				}) => {
					console.error({
						code,
						mOpenId
					});
					if ('21003' === code) {
						uni.showModal({
							title: '提示',
							content: '该微信未绑定，是否注册？',
							confirmText: '确认',
							cancelText: '取消',
							success: ({
								confirm
							}) => {
								if (confirm) {
									uni.getUserProfile({
										desc: '登录获取信息',
										success: ({
											errMsg,
											userInfo,
											signature,
											encryptedData,
											iv
										}) => {
											if (errMsg !==
												'getUserProfile:ok') {
												console.error({
													errMsg
												});
												return
											}
											console.log(
												'小程序获取用户信息成功,开始注册', {
													errMsg,
													userInfo,
													signature,
													encryptedData,
													iv
												});
											uni.$u.api.createUser({
												mOpenId
											}).then(({
												data
											}) => {
												console.log({
													data
												});
											})
										},
										fail: console.error
									});
								}
							}
						})
					}
				})
			}
		})
	}
}
```

最后在`github`找到了[`beautify`的文档](https://github.com/HookyQR/VSCodeBeautify/blob/master/Settings.md)

我们打开配置

![image-20220208200335464](/imgs/oss/picGo/image-20220208200335464.png)

然后点击配置

![image-20220208200412129](/imgs/oss/picGo/image-20220208200412129.png)

打开`jsbeautifyrc.js`进行配置

![image-20220208200442534](/imgs/oss/picGo/image-20220208200442534.png)

将`brace_style`改为`collapse-preserve-inline`

以及`wrap_line_length`改大一点

![image-20220208200527005](/imgs/oss/picGo/image-20220208200527005.png)

然后我们之后格式化，就不会出现刚才的情况了