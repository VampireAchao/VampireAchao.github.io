---
title: 微信Markdown编辑器
date: 2024-06-09 15:11:21
tags: 前端
---

> 正因为世界本身是平庸的，所以你也才平庸。——《寻羊冒险记》

[GitHub - doocs/md: ✍ WeChat Markdown Editor | 一款高度简洁的微信 Markdown 编辑器：支持 Markdown 语法、色盘取色、多图上传、一键下载文档、自定义 CSS 样式、一键重置等特性](https://github.com/doocs/md)

> ## 项目介绍
> 
> [](https://github.com/doocs/md#%E9%A1%B9%E7%9B%AE%E4%BB%8B%E7%BB%8D)
> 
> > 本项目基于 [wechat-format](https://github.com/lyricat/wechat-format) 进行二次开发，感谢 [lyricat](https://github.com/lyricat) 的创意和贡献！
> 
> Markdown 文档自动即时渲染为微信图文，让你不再为微信文章排版而发愁！只要你会基本的 Markdown 语法，就能做出一篇样式简洁而又美观大方的微信图文。
> 
> ## 在线编辑器地址
> 
> [](https://github.com/doocs/md#%E5%9C%A8%E7%BA%BF%E7%BC%96%E8%BE%91%E5%99%A8%E5%9C%B0%E5%9D%80)
> 
> - Gitee Pages：https://doocs.gitee.io/md
> - GitHub Pages：[微信 Markdown 编辑器 | Doocs 开源社区](https://doocs.github.io/md)
> 
> 注：推荐使用 Chrome 浏览器，效果最佳。另外，对于国内（中国）的朋友，访问 [Gitee Pages](https://doocs.gitee.io/md) 速度会相对快一些。
> 
> ## 为何二次开发
> 
> [](https://github.com/doocs/md#%E4%B8%BA%E4%BD%95%E4%BA%8C%E6%AC%A1%E5%BC%80%E5%8F%91)
> 
> 现有的开源微信 Markdown 编辑器，样式繁杂，也不符合我个人的审美需求。在我使用它们进行文章排版的时候，经常还要自己做一些改动，费时费力，因此动手做了二次开发。
> 
> 欢迎各位朋友随时提交 PR，让这款微信 Markdown 编辑器变得更好！如果你有新的想法，也欢迎在 [Discussions 讨论区](https://github.com/doocs/md/discussions)反馈。
> 
> ## 功能特性
> 
> [](https://github.com/doocs/md#%E5%8A%9F%E8%83%BD%E7%89%B9%E6%80%A7)
> 
> - [x]  支持自定义 CSS 样式
> - [x]  支持 Markdown 所有基础语法
> - [x]  支持浅色、暗黑两种主题模式
> - [x]  支持 Ctrl + F 快速格式化文档
> - [x]  支持色盘取色，快速替换文章整体色调
> - [x]  支持多图上传，可自定义配置图床
> - [x]  支持自定义上传逻辑
> - [x]  支持在编辑框右键弹出功能选项卡
> - [x]  支持批量转换本地图片为线上图片
> 
> ## 目前支持哪些图床
> 
> [](https://github.com/doocs/md#%E7%9B%AE%E5%89%8D%E6%94%AF%E6%8C%81%E5%93%AA%E4%BA%9B%E5%9B%BE%E5%BA%8A)
> 
> | #   | 图床                                           | 使用时是否需要配置                                                         | 备注                                                                                                                |
> | --- | -------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
> | 1   | 默认                                           | 否                                                                 | -                                                                                                                 |
> | 2   | [GitHub](https://github.com/)                | 配置 `Repo`、`Token` 参数                                              | [如何获取 GitHub token？](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) |
> | 3   | [阿里云](https://www.aliyun.com/product/oss)    | 配置 `AccessKey ID`、`AccessKey Secret`、`Bucket`、`Region` 参数         | [如何使用阿里云 OSS？](https://help.aliyun.com/document_detail/31883.html)                                                |
> | 4   | [腾讯云](https://cloud.tencent.com/act/pro/cos) | 配置 `SecretId`、`SecretKey`、`Bucket`、`Region` 参数                    | [如何使用腾讯云 COS？](https://cloud.tencent.com/document/product/436/38484)                                              |
> | 5   | [七牛云](https://www.qiniu.com/products/kodo)   | 配置 `AccessKey`、`SecretKey`、`Bucket`、`Domain`、`Region` 参数          | [如何使用七牛云 Kodo？](https://developer.qiniu.com/kodo)                                                                 |
> | 6   | [MinIO](https://min.io/)                     | 配置 `Endpoint`、`Port`、`UseSSL`、`Bucket`、`AccessKey`、`SecretKey` 参数 | [如何使用 MinIO？](http://docs.minio.org.cn/docs/master/minio-client-complete-guide)                                   |
> | 7   | 自定义上传                                        | 是                                                                 | [如何自定义上传？](https://github.com/doocs/md#%E8%87%AA%E5%AE%9A%E4%B9%89%E4%B8%8A%E4%BC%A0%E9%80%BB%E8%BE%91)           |
> 
> [![select-and-change-color-theme](https://camo.githubusercontent.com/583e139d1439191ec17493130619939cfbf99e2fb93d562e0153ac8eb34c44ed/68747470733a2f2f646f6f63732e6f73732d636e2d7368656e7a68656e2e616c6979756e63732e636f6d2f696d672f2f313630363033343534323238312d61386339396661372d633131652d346534332d393864612d6533363031326635346463382e676966)](https://camo.githubusercontent.com/583e139d1439191ec17493130619939cfbf99e2fb93d562e0153ac8eb34c44ed/68747470733a2f2f646f6f63732e6f73732d636e2d7368656e7a68656e2e616c6979756e63732e636f6d2f696d672f2f313630363033343534323238312d61386339396661372d633131652d346534332d393864612d6533363031326635346463382e676966)
> 
> [![copy-and-paste](https://camo.githubusercontent.com/0ae02cc042ef1854d55de4d4fe938c2118b2e282a84ed3da9aebd964849ffadd/68747470733a2f2f646f6f63732e6f73732d636e2d7368656e7a68656e2e616c6979756e63732e636f6d2f696d672f2f313630363033343534323337322d35393730376338332d326361662d346139362d396262362d6334656666616563663733312e676966)](https://camo.githubusercontent.com/0ae02cc042ef1854d55de4d4fe938c2118b2e282a84ed3da9aebd964849ffadd/68747470733a2f2f646f6f63732e6f73732d636e2d7368656e7a68656e2e616c6979756e63732e636f6d2f696d672f2f313630363033343534323337322d35393730376338332d326361662d346139362d396262362d6334656666616563663733312e676966)
> 
> [![custom](https://camo.githubusercontent.com/75e4004f3bcb7f7fe7404f91b6f8d8b1a612ab6f2f7bccd08178156e860d0a5a/68747470733a2f2f646f6f63732e6f73732d636e2d7368656e7a68656e2e616c6979756e63732e636f6d2f696d672f2f313630363033343534323138302d34643163343862312d373566362d343739342d393566372d6533623837376332623661322e676966)](https://camo.githubusercontent.com/75e4004f3bcb7f7fe7404f91b6f8d8b1a612ab6f2f7bccd08178156e860d0a5a/68747470733a2f2f646f6f63732e6f73732d636e2d7368656e7a68656e2e616c6979756e63732e636f6d2f696d672f2f313630363033343534323138302d34643163343862312d373566362d343739342d393566372d6533623837376332623661322e676966)
> 
> [![doocs-md-upload-image](https://camo.githubusercontent.com/2ae42fd06860490b30ea9c30a4708eb529e9b827f8f89260e7cb81dcfddb75f4/68747470733a2f2f646f6f63732e6f73732d636e2d7368656e7a68656e2e616c6979756e63732e636f6d2f696d672f2f313630363033343534323531322d30373639613333362d623965622d346435382d383363312d3239646237623534663731622e676966)](https://camo.githubusercontent.com/2ae42fd06860490b30ea9c30a4708eb529e9b827f8f89260e7cb81dcfddb75f4/68747470733a2f2f646f6f63732e6f73732d636e2d7368656e7a68656e2e616c6979756e63732e636f6d2f696d672f2f313630363033343534323531322d30373639613333362d623965622d346435382d383363312d3239646237623534663731622e676966)
> 
> ## 注意事项
> 
> [](https://github.com/doocs/md#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)
> 
> 1. 如果你使用了某些浏览器脚本修改了网页背景色，可能导致渲染后的文章出现背景色分块的现象，详见 [#63](https://github.com/doocs/md/issues/63)。
> 2. 某些浏览器插件，会对文章样式造成破坏。现象是：复制粘贴到公众号后台文章，点击保存时，样式丢失，详见 [#151](https://github.com/doocs/md/issues/151)。
> 
> ## 自定义上传逻辑
> 
> [](https://github.com/doocs/md#%E8%87%AA%E5%AE%9A%E4%B9%89%E4%B8%8A%E4%BC%A0%E9%80%BB%E8%BE%91)
> 
> 在工具上没有提供预定义图床的情况下，你只需要自定义上传逻辑即可，这对于例如你不方便使用公共图床，而是使用自己的上传服务时非常有用。
> 
> 你只需要在给定的函数中更改上传代码即可，为了方便，这个函数提供了可能使用的一些参数：
> 
> 示例代码：
> 
> ```js
> const { file, util, okCb, errCb } = CUSTOM_ARG;
> const param = new FormData();
> param.append("file", file);
> util.axios
>   .post("http://127.0.0.1:9000/upload", param, {
>     headers: { "Content-Type": "multipart/form-data" },
>   })
>   .then((res) => {
>     okCb(res.url);
>   })
>   .catch((err) => {
>     errCb(err);
>   });
> 
> // 提供的可用参数:
> // CUSTOM_ARG = {
> //   content, // 待上传图片的 base64
> //   file, // 待上传图片的 file 对象
> //   util: {
> //     axios, // axios 实例
> //     CryptoJS, // 加密库
> //     OSS, // ali-oss
> //     COS, // cos-js-sdk-v5
> //     Buffer, // buffer-from
> //     uuidv4, // uuid
> //     qiniu, // qiniu-js
> //     tokenTools, // 一些编码转换函数
> //     getDir, // 获取 年/月/日 形式的目录
> //     getDateFilename, // 根据文件名获取它以 时间戳+uuid 的形式
> //   },
> //   okCb: resolve, // 重要！上传成功后给此回调传 url 即可
> //   errCb: reject, // 上传失败调用的函数
> // }
> ```
> 
> 如果你创建了适用于其他第三方图床的上传代码，我们非常欢迎你分享它。
> 
> ## 如何开发和部署
> 
> [](https://github.com/doocs/md#%E5%A6%82%E4%BD%95%E5%BC%80%E5%8F%91%E5%92%8C%E9%83%A8%E7%BD%B2)
> 
> ```shell
> # 安装依赖
> npm i
> 
> # 启动开发模式
> npm start
> 
> # 部署在 /md 目录
> npm run build
> # 访问 http://127.0.0.1:9000/md
> 
> # 部署在根目录
> npm run build:h5-netlify
> # 访问 http://127.0.0.1:9000/
> ```
> 
> ## 快速搭建私有服务
> 
> [](https://github.com/doocs/md#%E5%BF%AB%E9%80%9F%E6%90%AD%E5%BB%BA%E7%A7%81%E6%9C%89%E6%9C%8D%E5%8A%A1)
> 
> ### 方式 1. 使用 npm cli
> 
> [](https://github.com/doocs/md#%E6%96%B9%E5%BC%8F-1-%E4%BD%BF%E7%94%A8-npm-cli)
> 
> 通过我们的 npm cli 你可以轻易搭建属于自己的微信 Markdown 编辑器。
> 
> ```shell
> # 安装
> npm i -g @doocs/md-cli
> 
> # 启动
> md-cli
> 
> # 访问
> open http://127.0.0.1:8800/md/
> 
> # 启动并指定端口
> md-cli port=8899
> 
> # 访问
> open http://127.0.0.1:8899/md/
> ```
> 
> md-cli 支持以下命令行参数：
> 
> - `port` 指定端口号，默认 8800，如果被占用会随机使用一个新端口。
> - `spaceId` dcloud 服务空间配置
> - `clientSecret` dcloud 服务空间配置
> 
> ### 方式 2. 使用 Docker 镜像
> 
> [](https://github.com/doocs/md#%E6%96%B9%E5%BC%8F-2-%E4%BD%BF%E7%94%A8-docker-%E9%95%9C%E5%83%8F)
> 
> 如果你是 Docker 用户，也可以直接使用一条命令，启动完全属于你的、私有化运行的实例。
> 
> ```shell
> docker run -d -p 8080:80 doocs/md:latest
> ```
> 
> 容器运行起来之后，打开浏览器，访问 [http://localhost:8080](http://localhost:8080/) 即可。
> 
> 关于本项目 Docker 镜像的更多详细信息，可以关注 https://github.com/doocs/docker-md
> 
> ## 谁在使用
> 
> [](https://github.com/doocs/md#%E8%B0%81%E5%9C%A8%E4%BD%BF%E7%94%A8)
> 
> - [Doocs](https://mp.weixin.qq.com/s/RNKDCK2KoyeuMeEs6GUrow)
> - [ApachePulsar](https://mp.weixin.qq.com/s/udU2ZICg60HbspgWTQdYpg)
> - [码云 Gitee](https://mp.weixin.qq.com/s/bnlWqzCarDlR4F27HHXNUg)
> - [掘墓人的小铲子](https://mp.weixin.qq.com/s/FpGIX9viQR6Z9iSCEPH86g)
> - [全网重点](https://mp.weixin.qq.com/s/yB3ZH3jmcF_LbzuKmnR9BQ)
> - [爱码士的内心独白](https://mp.weixin.qq.com/s/oc5Z2t9ykbu_Dezjnw5mfQ)
> - [乐玩 nodejs npm 工具库](https://mp.weixin.qq.com/s/SFde8OsZ8FzNGMHwpmDtrg)
> - [简静慢](https://mp.weixin.qq.com/s/7UG24ZugfI5ZnhUpo8vfvQ)
> - [0 加 1](https://mp.weixin.qq.com/s/qefHCmToAdowBz2JwBn_ug)
> - [编程图解](https://mp.weixin.qq.com/s/7bfpKACg7HP-PhBrkpM9IQ)
> - [好酸一柠檬](https://mp.weixin.qq.com/s/CVqmcu_OGG8TQO4FViAQ3w)
> - [不知所云 Hub](https://mp.weixin.qq.com/s/leDCdpvnfk8eZRPRRHwg5w)
> - [会泽百家](https://mp.weixin.qq.com/s/c9ZXxQHCrKz1FP1Zbh1S1w)
> - [平凡而诗意](https://mp.weixin.qq.com/s/MV8ch6qlSsamSaBOhWr9kg)
> - [治恒说说](https://mp.weixin.qq.com/s/bWPKO-S3TNLsCgzwspHCTg)
> - [柯宁申的叙事屋](https://mp.weixin.qq.com/s/AHHrxu7aIYBpvn3PpVHE_Q)
> - [我的 Beta 世界](https://mp.weixin.qq.com/s/6BO977YG5e_4qYxL4oVQJw)
> - [生化环材](https://mp.weixin.qq.com/s/fqNxIRxTkn6QEPmi4atW9w)
> - [秀宇笔记](https://mp.weixin.qq.com/s/VUlOBFA93eiqZ5ZYGmXzmQ)
> - [IT 王小二](https://mp.weixin.qq.com/s/UU3cH8LvpO_3aeAkkYvZZQ)
> - [小二来碗饭](https://mp.weixin.qq.com/s/49wUuhOEYG-OZPbFc6_NrQ)
> - [青年技术宅](https://mp.weixin.qq.com/s/YDUZ0t_spzeqXiE_Idv3OA)
> - [路引科研](https://mp.weixin.qq.com/s/oinGHCmer1vNE6Hg2OsH1g)
> - [凯文有事找你](https://mp.weixin.qq.com/s/ap_JhwgmfxgqFAIcTF3nKQ)
> - [软件部落库](https://mp.weixin.qq.com/s/itkJtMY-1IkZjIn5fWtShw)
> - [网文小密圈](https://mp.weixin.qq.com/s/_44Ya309DeQzemXLnJUNdQ)
> - [潇洒哥和黑大帅](https://mp.weixin.qq.com/s/k9WbW0zmxl0S2WX2CXQ6cQ)
> - [云原生指北](https://mp.weixin.qq.com/s/qFQBBpjUoqdfnmCeOGqRJQ)
> - [全栈民工](https://mp.weixin.qq.com/s/i7hTPuuJAtcK9G55tep0Uw)
> - [睡不醒的鲤鱼](https://mp.weixin.qq.com/s/14HNDbDIvfDnV7ePEfbyuQ)
> - [Dmego](https://mp.weixin.qq.com/s/4QeZsTL84lbN_HO3kCwEwg)
> - [红岸](https://mp.weixin.qq.com/s/_cNyKqRr8E1ENg9r7IO70Q)
> - [HelloCoder](https://mp.weixin.qq.com/s/ekCoyhT-JjbYsysKBgdJzQ)
> - [前端黑板报](https://mp.weixin.qq.com/s/bnZebWPd5-TgiXgQVUKdaQ)
> - [Web3HackerWorld](https://mp.weixin.qq.com/s/eLuC6e93RR1zCD3w2FgpVA)
> - [StruggleYang](https://mp.weixin.qq.com/s/fKKQrsatC9en3PwWiCL-KQ)
> - [比心技术](https://mp.weixin.qq.com/s/DYzzci2paf10CgW22pkyUQ)
> 
> 注：如果你使用了本 Markdown 编辑器进行文章排版，并且希望在本项目 README 中展示你的公众号，请到 [#5](https://github.com/doocs/md/discussions/5) 留言。
