---
title: github获取uid方式
date: 2024-04-15 20:03:22
tags: 小技巧
---

> 不要在已成的事业中逗留着。——巴斯德

首先方式是：

```http
https://api.github.com/users/VampireAchao
```

例如我访问得到：

```json
{
  "login": "VampireAchao",
  "id": 52746628,
  "node_id": "MDQ6VXNlcjUyNzQ2NjI4",
  "avatar_url": "https://avatars.githubusercontent.com/u/52746628?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/VampireAchao",
  "html_url": "https://github.com/VampireAchao",
  "followers_url": "https://api.github.com/users/VampireAchao/followers",
  "following_url": "https://api.github.com/users/VampireAchao/following{/other_user}",
  "gists_url": "https://api.github.com/users/VampireAchao/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/VampireAchao/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/VampireAchao/subscriptions",
  "organizations_url": "https://api.github.com/users/VampireAchao/orgs",
  "repos_url": "https://api.github.com/users/VampireAchao/repos",
  "events_url": "https://api.github.com/users/VampireAchao/events{/privacy}",
  "received_events_url": "https://api.github.com/users/VampireAchao/received_events",
  "type": "User",
  "site_admin": false,
  "name": "VampireAchao",
  "company": "@apache @dromara @baomidou ",
  "blog": "https://vampireachao.github.io/",
  "location": "Beijing",
  "email": null,
  "hireable": null,
  "bio": "Cover Person of Gitee、Dromara-Stream-Query Author、Dromara-Hutool、Baomidou-Mybatis-Plus Team Member、Apache StreamPark Committer，Apache Shenyu  Contributor",
  "twitter_username": "VampireAchao",
  "public_repos": 83,
  "public_gists": 1,
  "followers": 75,
  "following": 183,
  "created_at": "2019-07-10T12:22:27Z",
  "updated_at": "2024-03-29T06:35:39Z"
}
```

这里的`id`就是`uid`

`GitHub REST API`文档地址：

[GitHub REST API 文档 - GitHub 文档](https://docs.github.com/zh/rest?apiVersion=2022-11-28)

[用户的 REST API 终结点 - GitHub 文档](https://docs.github.com/zh/rest/users/users?apiVersion=2022-11-28#get-the-authenticated-user)

```http
curl -L \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/user
```

对应的状态码说明

### [“Get the authenticated user”的 HTTP 响应状态代码](https://docs.github.com/zh/rest/users/users?apiVersion=2022-11-28#get-the-authenticated-user--status-codes)

| 状态代码  | 说明                      |
| ----- | ----------------------- |
| `200` | OK                      |
| `304` | Not modified            |
| `401` | Requires authentication |
| `403` | Forbidden               |
