---
title: cherry pick
date: 2023-04-21 20:55:08
tags: 小技巧
---

> 每一个人在世界上都会受挫折，有许多人反而在折断的地方长得最结实。——海明威

分享一个`Git`技巧`Cherry Pick`

`Cherry`：樱桃   `Pick`：摘取

`Cherry Pick`的作用是将其他分支上的提交，摘取到主分支，就像摘樱桃一样

例如此处使用`idea`操作（旧版本界面可能按钮位置有不同，但功能应该是支持的）

我们此处需要将`master`的一个`commit`，摘取到`issues/I63T01`分支上，先检出分支

![image-20230421211428555](/imgs/oss/blog/vampireachao/image-20230421211428555.png)

然后选中我们需要`Pick`(摘取)的分支，右键`Cherry Pick`

![image-20230421211553196](/imgs/oss/blog/vampireachao/image-20230421211553196.png)

然后对应的提交就可以摘取到当前的分支上

![image-20230421211742255](/imgs/oss/blog/vampireachao/image-20230421211742255.png)

此时我们如果`push`代码，则会将该`commit`提交到远端仓库

![image-20230421211812993](/imgs/oss/blog/vampireachao/image-20230421211812993.png)

使用`idea`的`git`可视化界面，任何操作都变得非常的容易和简单，这里就顺带以几个提交代码的快捷键作为文章收尾吧

1. `Ctrl+K`弹出提交代码界面
2. 编写`Commit Message`后按下`Tab`键并填写提交用户名、邮箱(此处填写时可以按上下键和回车选择)
3. `Ctrl+Alt+K`提交并`push`
4. 弹出`push`界面后`Ctrl+Enter`或者`Alt+P`即可推送到远端仓库，不需要手舞足蹈地使用鼠标