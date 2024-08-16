---
title: Apache ShenYu实现验证失败后才出来验证码
date: 2024-07-30 09:57:55
tags: 前端
---

> 秋天的风都是从往年吹来的。——木心《素履之往》

今天实现了一个功能

[[Improve] need verify code when password error by VampireAchao · Pull Request #465 · apache/shenyu-dashboard · GitHub](https://github.com/apache/shenyu-dashboard/pull/465)

也很简单，新增一个`state`，然后在`redux-saga`的`dispatch`触发对应的`effects`，新增一个`callback`参数传入过去，然后在请求完成后执行

![20240729150119](https://github.com/user-attachments/assets/8f47b9da-4f8a-4458-8046-7561a9c6abdd)
