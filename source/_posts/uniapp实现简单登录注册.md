---
title: uniapp实现简单登录注册
date: 2021-02-14 13:07:20
tags: 前端
---

> 生活的情况越艰难，我越感到自己更坚强，甚而也更聪明。——高尔基

首先去[`uniapp`官网](https://uniapp.dcloud.io/)

可以看到介绍

> `uni-app` 是一个使用 [Vue.js](https://vuejs.org/) 开发所有前端应用的框架，开发者编写一套代码，可发布到iOS、Android、Web（响应式）、以及各种小程序（微信/支付宝/百度/头条/QQ/钉钉/淘宝）、快应用等多个平台。
>
> `DCloud`公司拥有600万开发者用户，几十万应用案例、12亿手机端月活用户，数千款uni-app插件、70+微信/qq群。阿里小程序工具官方内置uni-app（[详见](https://docs.alipay.com/mini/ide/0.70-stable)），腾讯课堂官方为uni-app录制培训课程（[详见](https://ask.dcloud.net.cn/article/35640)），开发者可以放心选择。
>
> `uni-app`在手，做啥都不愁。即使不跨端，`uni-app`也是更好的小程序开发框架（[详见](https://ask.dcloud.net.cn/article/35947)）、更好的App跨平台框架、更方便的H5开发框架。不管领导安排什么样的项目，你都可以快速交付，不需要转换开发思维、不需要更改开发习惯。

首先我们去下载[官方IDE——HBuilderX](https://www.dcloud.io/hbuilderx.html)

![image-20210214102923583](/imgs/oss/picGo/image-20210214102923583.png)

解压

![image-20210214103031733](/imgs/oss/picGo/image-20210214103031733.png)

启动`IDE`——`HBuilderX.exe`

![image-20210214103405219](/imgs/oss/picGo/image-20210214103405219.png)

我们点击文件`->`新建`->`项目，选择`uni-app`

![image-20210214103619889](/imgs/oss/picGo/image-20210214103619889.png)

![image-20210214103724325](/imgs/oss/picGo/image-20210214103724325.png)

对于快捷键修改，我们可以采用这种方式：

点击`HBuilderX`上方的工具`->`自定义快捷键

可以看到这里出现两个页面，我们把要修改的快捷键，放到右边来，例如这样

```json
[
    //删除行
    {"key":"ctrl+y","command":"redo"}
    //选择当前词或下一个相同词
    // {"key":"ctrl+e","command":"editor.action.addSelectionToNextFindMatch"}
]
```

![image-20210214105437303](/imgs/oss/picGo/image-20210214105437303.png)

然后`ctrl+s`保存

我们使用一下刚才的快捷键`ctrl+y`

可以看到弹窗供你选择，这个地方是因为我们的`ctrl+y`与删除行重复了，所以需要选择

![image-20210214105723791](/imgs/oss/picGo/image-20210214105723791.png)

我们运行一下

选中左边的项目，然后点击运行`->`运行到浏览器，然后选择对应的浏览器即可看到

我们刚刚创建的项目是这个样子的

![image-20210214103937785](/imgs/oss/picGo/image-20210214103937785.png)

我们先来修改上方标题栏名称，把`uni-app`修改成我们的`myapp`

找到`pages.json`，修改`navigationBarTitleText`属性

注意，这里上方的`pages`是针对页面修改，下方的`globalStyle`是针对全局生效，上方会覆盖下面的设置

```json
{
	"pages": [ //pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
		{
			"path": "pages/index/index",
			"style": {
				"navigationBarTitleText": "myapp"
			}
		}
	],
	"globalStyle": {
		"navigationBarTextStyle": "black",
		"navigationBarTitleText": "myapp",
		"navigationBarBackgroundColor": "#F8F8F8",
		"backgroundColor": "#F8F8F8"
	}
}
```

顺便我们改个头像吧

```vue
<template>
	<view class="content">
		<image ondragstart="return false" class="logo" src="/imgs/oss/2020-06-01/head.jpg"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
```

修改完后保存，可以看到我们项目自动编译了，刷新页面可以看到修改成功

假设我们需要修改端口，即可到`manifest.json`中找到`H5`配置`，然后在端口一栏输入我们的端口即可

 ![image-20210214113814383](/imgs/oss/picGo/image-20210214113814383.png)

![image-20210214110041981](/imgs/oss/picGo/image-20210214110041981.png)

我们引入`Element-UI`，首先确保使用管理员身份运行`HbuilderX`

![image-20210214111921639](/imgs/oss/picGo/image-20210214111921639.png)

然后点击下方终端按钮，然后安装

![image-20210214112034587](/imgs/oss/picGo/image-20210214112034587.png)

执行命令

```shell
set-ExecutionPolicy RemoteSigned
```

然后执行

```shell
cnpm i element-ui
```

最后在`main.js`中引用

```vue
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI);
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
```

![image-20210214113841012](/imgs/oss/picGo/image-20210214113841012.png)

接下来就可以使用`Element-UI`进行开发了

配置一个`api.js`，供我们请求接口

```javascript
const BASE_API = 'http://localhost:8080'
const API_LOGIN = '/user/login'
const API_REGISTER = '/user/register'


function get(url, data, res) {
	request(url, data, res, 'GET')
}

function post(url, data, res) {
	request(url, data, res, 'POST')
}

function request(url, data, res, method) {
	let header = method == 'POST' ? {
		'Content-Type': 'application/json',
		'token': uni.getStorageSync('token')
	} : {
		'token': uni.getStorageSync('token')
	};
	uni.request({
		url: BASE_API + url,
		method: method,
		header: header,
		data: data,
		success: (data) => {
			if (data.data.code === 200) {
				res(data.data)
			} else {
				uni.showToast({
					title: data.data.msg,
					icon: 'none',
					duration: 2000 //时间
				});
			}
		}
	});
}


export default {
	get: function(url, data, res) {
		return get(url, data, res);
	},
	post: function(url, data, res) {
		return post(url, data, res);
	},
	API_LOGIN,
	API_REGISTER
}
```

然后是页面

```vue
<template>
	<view class="content">
		<image ondragstart="return false" class="logo" src="/imgs/oss/2020-06-01/head.jpg"></image>
		<el-row>
			<el-col>
				<el-input placeholder="用户名" v-model="user.username" clearable></el-input>
			</el-col>
		</el-row>
		<el-row>
			<el-col>
				<el-input placeholder="请输入密码" v-model="user.password" show-password></el-input>
			</el-col>
		</el-row>
		<el-row>
			<el-col>
				<el-button-group>
					<el-button class="loginBtn" type="primary" @click="register">注册</el-button>
					<el-button class="loginBtn" type="primary" @click="login">登陆</el-button>
				</el-button-group>
			</el-col>
		</el-row>
	</view>
</template>

<script>
	import api from '../../static/common/util/api.js';
	export default {
		data() {
			return {
				user: {
					username: '',
					password: ''
				}
			}
		},
		onLoad() {

		},
		methods: {
			login() {
				api.post(api.API_LOGIN,this.user,(data)=>{
					uni.showToast({
						title: data.msg,
						icon: 'success',
						duration: 2000
					});
					uni.setStorageSync('token', data.token);
				})
			},
			register() {
				api.post(api.API_REGISTER,this.user,(data)=>{
					uni.showToast({
						title: data.msg,
						icon: 'success',
						duration: 2000
					});
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.loginBtn {
		margin-top: 20rpx;
	}
</style>
```

我们的登录、注册功能就简单实现啦~

项目已经上传到[`Gitee`](https://gitee.com/VampireAchao/simple-uniapp.git)上去啦