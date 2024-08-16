---
title: brew安装mark-text和picgo-core并配置
date: 2023-07-01 22:07:06
tags: 软件及插件
---

> 在缺乏教养的人身上，勇敢就会成为粗暴，学识就会成为迂腐，机智就会成为逗趣，质朴就会成为粗鲁，温厚就会成为谄媚。——洛克

执行

```bash
achaodeMacBook-Pro:~ achao$ brew install --cask mark-text
==> Caveats
The Apple Silicon (arm) version of mark-text is not signed, and
will display an error stating it is damaged and can't be opened.

==> Downloading https://github.com/marktext/marktext/releases/download/v0.17.1/m
==> Downloading from https://objects.githubusercontent.com/github-production-rel
######################################################################### 100.0%
==> Installing Cask mark-text
==> Moving App 'MarkText.app' to '/Applications/MarkText.app'
  mark-text was successfully installed!
```

此时我们直接运行是打不开的，提示移到废纸篓或者取消，这是因为上面提示过了`The Apple Silicon (arm) version of mark-text is not signed`

执行：

```bash
xattr -cr /Applications/MarkText.app
```

即可打开

![image20230627141104669](/imgs/oss/picGo/image-20230627141104669.png)

然后是picgo-core

[GitHub - PicGo/PicGo-Core: :zap:A tool for pictures uploading. Both CLI &amp; API supports.](https://github.com/PicGo/PicGo-Core)

![image20230628131037946](/imgs/oss/picGo/image-20230628131037946.png)

此处用到的是阿里云`oss`，准备近期换掉，因为老是刷到被`ddos`攻击导致`oss`欠费大笔损失

https://zhuanlan.zhihu.com/p/411600294

阿里云`oss`的官方文档也只是提到了设置为私有`Bucket`访问或者接入`WAF 3.0`

[如何避免OSS被盗刷_对象存储-阿里云帮助中心](https://help.aliyun.com/document_detail/471169.html)

但临时还用用，使用`npm`安装`picgo-core`

```bash
achaodeMacBook-Pro:~ achao$ npm install picgo -g
npm WARN deprecated @types/bson@4.2.0: This is a stub types definition. bson provides its own type definitions, so you do not need this installed.

added 339 packages in 47s

26 packages are looking for funding
  run `npm fund` for details
npm notice 
npm notice New minor version of npm available! 9.5.1 -> 9.7.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v9.7.2
npm notice Run npm install -g npm@9.7.2 to update!
npm notice 
achaodeMacBook-Pro:~ achao$ picgo u
[PicGo INFO]: Before transform
[PicGo INFO]: Transforming... Current transformer is [path]
[PicGo INFO]: Before upload
[PicGo INFO]: Uploading... Current uploader is [smms]
[PicGo WARN]: failed
[PicGo ERROR]: Error: Can not find smms config!
    at Object.We [as handle] (/Users/achao/.nvm/versions/node/v18.16.1/lib/node_modules/picgo/dist/index.cjs.js:1:20788)
    at je.doUpload (/Users/achao/.nvm/versions/node/v18.16.1/lib/node_modules/picgo/dist/index.cjs.js:1:19770)
    at je.start (/Users/achao/.nvm/versions/node/v18.16.1/lib/node_modules/picgo/dist/index.cjs.js:1:18529)
    at async $t.upload (/Users/achao/.nvm/versions/node/v18.16.1/lib/node_modules/picgo/dist/index.cjs.js:1:73022)
    at async /Users/achao/.nvm/versions/node/v18.16.1/lib/node_modules/picgo/dist/index.cjs.js:1:5730
```

这里用`picgo u`上传佳尼特版第一张图片失败，因为我们没配置

按照文档：[配置文件 | PicGo-Core](https://picgo.github.io/PicGo-Core-Doc/zh/guide/config.html)

设置图床，并使用`picgo u`上传

```bash
achaodeMacBook-Pro:~ achao$ picgo set uploader
? Choose a(n) uploader aliyun
? accessKeyId: [hidden]
? accessKeySecret: [hidden]
? bucket: waibi
设定存储区域 例如：oss-cn-beijing oss-cn-chengdu
设定存储路径 例如：test/ picGo/
设定自定义域名 例如：https://test.com 
设定网址后缀 例如：?x-oss-process=xxx 
[PicGo SUCCESS]: Configure config successfully!
achaodeMacBook-Pro:~ achao$ picgo u
[PicGo INFO]: Before transform
[PicGo INFO]: Transforming... Current transformer is [path]
[PicGo INFO]: Before upload
[PicGo INFO]: Uploading... Current uploader is [aliyun]
[PicGo SUCCESS]: 
/imgs/oss/picGo/xxx.png
```

成功返回路径
