---
title: Apache ShenYu e2e失败定位问题
date: 2024-08-01 14:08:10
tags: java
---

> 如果打算爱一个人，你要想清楚，是否愿意为了他，放弃如上帝般自由的心灵，从此心甘情愿有了羁绊。——《了不起的盖茨比》

主要是这里

[[Feature] Invalidate Previous Tokens on New Login by Implementing Client ID Validation · apache/shenyu@9f8b865 · GitHub](https://github.com/apache/shenyu/actions/runs/10164847879/job/28191851623#step:10:73)

```bash
deployment.apps/shenyu-mysql created
service/shenyu-mysql created
NAME                            READY   STATUS   RESTARTS   AGE   IP          NODE           NOMINATED NODE   READINESS GATES
shenyu-mysql-7f656d679d-ssqlx   0/1     Error    0          30s   10.42.0.9   fv-az888-179   <none>           <none>
```

可以看到容器状态是`Error`，因此我们检查一遍`DDL`即可
