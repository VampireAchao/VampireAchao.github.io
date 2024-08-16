---
title: sh脚本执行完毕按任意键退出
date: 2023-02-01 21:16:26
tags: 小技巧
---

> 人事关系在社会上是一种资本，若要它经久，就不得不节用。——列夫·托尔斯泰

只需要在`sh`脚本后面添加这一行：

```shell
read -n 1
```

例如：

![image-20230201212010379](/imgs/oss/blog/vampireachao/image-20230201212010379.png)

```shell
nvm use 14
cd ./node_modules/hexo-generator-json-content
# 卸载新版本
cnpm uni hexo-util
# 安装 2.7版本
cnpm i hexo-util@2.7
cd ../../
hexo clean
git add .
git commit -m ":trollface:"
git branch --set-upstream-to=origin/master master
git pull --allow-unrelated-histories
git push
hexo g
hexo d

read -n 1
```

效果：

![image-20230201212834372](/imgs/oss/blog/vampireachao/image-20230201212834372.png)