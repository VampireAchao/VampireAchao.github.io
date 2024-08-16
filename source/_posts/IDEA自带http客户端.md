---
title: IDEA自带http客户端
date: 2021-04-22 21:03:41
tags: 软件及插件
---

> 我们活在世上不是为自己而向生活索取什么，而是试图使别人生活得更幸福。——奥斯勃

前两天更新了`idea2021`让我发现一个功能

![image-20210422210452655](/imgs/oss/picGo/image-20210422210452655.png)

虽然这个功能应该在以往的`idea`版本也存在，但是我是随着更新了它才发现这个功能

我们在`idea`中按下快捷键`ctrl`+`alt`+`shift`+`insert`

![image-20210422210904478](/imgs/oss/picGo/image-20210422210904478.png)

当然我们不用快捷键，直接在项目目录右键新建`->`草稿文件也是一样的效果

![image-20210422210934348](/imgs/oss/picGo/image-20210422210934348.png)

我们输入`http`找到`Http Request`

![image-20210422211307624](/imgs/oss/picGo/image-20210422211307624.png)

然后我们发现在草稿文件中多了个`.http`后缀的文件

我们可以在里面写我们的接口测试

例如我这里写一个

```http
GET https://unidemo.dcloud.net.cn/api/news
```

![image-20210422212104359](/imgs/oss/picGo/image-20210422212104359.png)

然后点击左边的小箭头运行一下

可以看到下面我们调用接口后的响应

![image-20210422212225551](/imgs/oss/picGo/image-20210422212225551.png)

这串`json`会自动储存在`.idea/httpRequests/2021-04-22T212126.200.json`这里

我们可以按`ctrl`+鼠标左键去打开这个`json`文件

那么我们除了`GET`，使用`POST`也是可以的，只需要在前面改成`POST`即可

如果我们需要设置`Request Header`，可以直接在下方写上我们想要的`header`即可

例如我们需要在`Request Body`里传输`json`数据，就可以这么写

![image-20210422212557350](/imgs/oss/picGo/image-20210422212557350.png)

然后如果我们想用表单的`url`方式传参

也可以这么写

![image-20210422213957019](/imgs/oss/picGo/image-20210422213957019.png)然后如果我们需要登录，然后携带`token`

这个`token`我们可以在里面给临时存起来

我们先请求可以看到确实是能拿到`token`

![image-20210422214618773](/imgs/oss/picGo/image-20210422214618773.png)

接下来就是把`token`存起来，放到下一个请求的`header`里

我们先不带`token`试试(注意我这里写的`token:{{auth_token}}`是被注释掉的)

![image-20210422215340882](/imgs/oss/picGo/image-20210422215340882.png)

然后我们存起来并带上`token`

```http
POST http://localhost:8082/ruben/user/login
Content-Type: application/json;charset=UTF-8

{
  "username": "achao1441470436",
  "password": "VampireAchao123456."
}

> {%
client.global.set("auth_token", response.body.token);
client.log("token："+response.body.token);
%}



###
GET http://localhost:8082/ruben/user/say?word=xxx
token:{{auth_token}}
```

![image-20210422215500850](/imgs/oss/picGo/image-20210422215500850.png)

我们再次运行，点击下方产生的`json`文件

![image-20210422215741873](/imgs/oss/picGo/image-20210422215741873.png)

可以看到我们的`token`生效

![image-20210422215816748](/imgs/oss/picGo/image-20210422215816748.png)