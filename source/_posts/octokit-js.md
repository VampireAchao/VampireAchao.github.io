---
title: octokit.js
date: 2024-04-17 20:07:19
tags: 前端
---

> 暴食杀人多于利剑杀人。——伯里兹

分享一个框架封装了`GitHub`的`API`调用

[GitHub - octokit/octokit.js: The all-batteries-included GitHub SDK for Browsers, Node.js, and Deno.](https://github.com/octokit/octokit.js)

等于是一个`SDK`

目前，GitHub 维护以下语言/框架/平台的 SDK：

- [JavaScript](https://github.com/octokit?language=javascript#org-profile-repositories) / [TypeScript](https://github.com/octokit?language=typescript#org-profile-repositories)
- [C# / .NET](https://github.com/octokit?language=c%23#org-profile-repositories)
- [Ruby](https://github.com/octokit?language=ruby#org-profile-repositories)
- [Terraform provider](https://github.com/integrations/terraform-provider-github)

还有 2 个 SDK，它们是根据 [GitHub 的 OpenAPI 描述](https://github.com/github/rest-api-description)生成的！

- [C# / .NET](https://github.com/octokit/dotnet-sdk)
- [Go](https://github.com/octokit/go-sdk)

浏览器里安装：

```html
<script type="module">
import { Octokit, App } from "https://esm.sh/octokit";
</script>
```

示例：获取经过身份验证的用户的用户名。

```javascript
// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
const octokit = new Octokit({ auth: `personal-access-token123` });

// Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
const {
  data: { login },
} = await octokit.rest.users.getAuthenticated();
console.log("Hello, %s", login);
```

这里支持两种方式，就拿创建`issues`举例

```javascript
await octokit.rest.issues.create({
  owner: "octocat",
  repo: "hello-world",
  title: "Hello, world!",
  body: "I created this issue using Octokit!",
});
```

和下面的方式相同

```javascript
await octokit.request("POST /repos/{owner}/{repo}/issues", {
  owner: "octocat",
  repo: "hello-world",
  title: "Hello, world!",
  body: "I created this issue using Octokit!",
});
```

还有分页查询仓库里的`issues`

```javascript
const iterator = octokit.paginate.iterator(octokit.rest.issues.listForRepo, {
  owner: "octocat",
  repo: "hello-world",
  per_page: 100,
});

// iterate through each response
for await (const { data: issues } of iterator) {
  for (const issue of issues) {
    console.log("Issue #%d: %s", issue.number, issue.title);
  }
}
```

还可以使用异步的方式去做

```javascript
const issues = await octokit.paginate(octokit.rest.issues.listForRepo, {
  owner: "octocat",
  repo: "hello-world",
  per_page: 100,
});
```

设置媒体格式：

```javascript
const { data } = await octokit.rest.repos.getContent({
  mediaType: {
    format: "raw",
  },
  owner: "octocat",
  repo: "hello-world",
  path: "package.json",
});
console.log("package name: %s", JSON.parse(data).name);
```

错误处理

```javascript
import { RequestError } from "octokit";
```

```javascript
try {
  // your code here that sends at least one Octokit request
  await octokit.request("GET /");
} catch (error) {
  // Octokit errors are instances of RequestError, so they always have an `error.status` property containing the HTTP response code.
  if (error instanceof RequestError) {
    // handle Octokit error
    // error.message; // Oops
    // error.status; // 500
    // error.request; // { method, url, headers, body }
    // error.response; // { url, status, headers, data }
  } else {
    // handle all other errors
    throw error;
  }
}
```

也有`GraphQL`的支持，例如获取经过身份验证的用户的登录信息

```javascript
const {
  viewer: { login },
} = await octokit.graphql(`{
  viewer {
    login
  }
}`);
```

可以把变量放到第二个参数传进去

```javascript
const { lastIssues } = await octokit.graphql(
  `
    query lastIssues($owner: String!, $repo: String!, $num: Int = 3) {
      repository(owner: $owner, name: $repo) {
        issues(last: $num) {
          edges {
            node {
              title
            }
          }
        }
      }
    }
  `,
  {
    owner: "octokit",
    repo: "graphql.js",
  },
);
```

关于`GraphQL`的分页查询仓库的`issues`

```javascript
const { allIssues } = await octokit.graphql.paginate(
  `
    query allIssues($owner: String!, $repo: String!, $num: Int = 10, $cursor: String) {
      repository(owner: $owner, name: $repo) {
        issues(first: $num, after: $cursor) {
          edges {
            node {
              title
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    }
  `,
  {
    owner: "octokit",
    repo: "graphql.js",
  },
);
```

创建`Label`

```javascript
await octokit.graphql(
  `mutation createLabel($repositoryId:ID!,name:String!,color:String!) {
  createLabel(input:{repositoryId:$repositoryId,name:$name}) {
    label: {
      id
    }
  }
}`,
  {
    repositoryId: 1,
    name: "important",
    color: "cc0000",
    mediaType: {
      previews: ["bane"],
    },
  },
);
```
