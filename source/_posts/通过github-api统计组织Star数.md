---
title: 通过github api统计组织Star数
date: 2024-08-15 18:02:32
tags: 前端
---

> 君子之学，博于外而尤贵精于内。——王廷相

文档如下：

https://docs.github.com/zh/rest/orgs/orgs?apiVersion=2022-11-28

代码如下：

```javascript
const response = await fetch('https://api.github.com/orgs/dromara/repos?per_page=100&page=1');
  if (!response.ok) {
    throw new Error(`Error fetching repos: ${response.statusText}`);
  }
  const repos = await response.json();
console.log(repos)
const list = repos.map(({name,stargazers_count})=>({name,stargazers_count}))
console.log(list)
list.reduce(
  (accumulator, currentValue) => accumulator + currentValue.stargazers_count,
  0,
);
```

注意这里是分页，我们把每一页的结果相加，得到`github`上`dromara`的`82`个仓库拥有`89972`个`star`

`apache`则非常之多，`2659`个仓库`1122875`个`star`
