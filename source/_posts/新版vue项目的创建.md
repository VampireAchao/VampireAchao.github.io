---
title: 新版vue项目的创建
date: 2020-08-30 17:35:01
tags: 前端
---

[下载`nodejs`](https://npm.taobao.org/mirrors/node/v14.8.0/node-v14.8.0-x64.msi)

然后一直下一步安装就行

打开`vscode`

![image-20200830165054031](/imgs/oss/picGo/image-20200830165054031.png)

点击左下角的![image-20200830165115754](/imgs/oss/picGo/image-20200830165115754.png)

点击终端

（`Win+R`输入`cmd`或者`powershell`一样的）

然后开始安装`vue`

```shell
#查看版本(如果nodejs安装完了还是显示不是内部或外部命令，也不是可运行的程序或批处理文件，重新打开一下vscode或命令框)
PS C:\Users\1> npm -v
6.14.5
#安装cnpm
PS C:\Users\1> npm install -g cnpm --registry=https://registry.npm.taobao.org
#查看cnpm版本
PS C:\Users\1> cnpm -v
cnpm@6.1.1 (C:\Users\1\AppData\Roaming\npm\node_modules\cnpm\lib\parse_argv.js)
npm@6.14.5 (C:\Users\1\AppData\Roaming\npm\node_modules\cnpm\node_modules\npm\lib\npm.js)
node@12.16.2 (D:\Program Files\nodejs\node.exe)
npminstall@3.27.0 (C:\Users\1\AppData\Roaming\npm\node_modules\cnpm\node_modules\npminstall\lib\index.js)
prefix=C:\Users\1\AppData\Roaming\npm
win32 x64 10.0.18362
registry=https://r.npm.taobao.org
PS C:\Users\1> 
#安装vue
PS C:\Users\1> cnpm install -g @vue/cli
#查看版本
PS C:\Users\1> vue -V
@vue/cli 4.5.4
#创建项目所在目录
PS C:\Users\1> md D:\repositories
#进入项目所在目录（小夫我要进来咯）
PS C:\Users\1> cd D:\repositories
#创建项目
PS D:\repositories> vue create myapp
```

然后按`↓`

![image-20200830170753150](/imgs/oss/picGo/image-20200830170753150.png)

选择第二个`Default (Vue 3 Preview)`按回车

然后再按`↓`

选择`Use NPM`

![image-20200830170903704](/imgs/oss/picGo/image-20200830170903704.png)

再回车

经过漫长的等待后

```shell
#进入项目
cd myapp
#运行项目
npm run serve
```

![image-20200830172447623](/imgs/oss/picGo/image-20200830172447623.png)

然后进入`http://localhost:8080/`

![image-20200830172501206](/imgs/oss/picGo/image-20200830172501206.png)

访问成功