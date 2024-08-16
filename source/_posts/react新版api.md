---
title: react新版api
date: 2023-01-07 22:24:15
tags: 前端
---

> 我们飞得越高，我们在那些不能飞的人眼中的形象就越渺小。——尼采的《查拉图斯特拉如是说》

如果你是在`react`18这么写：

```tsx
// index.tsx
import React from 'react'
import ReactDOM from 'react-dom'

console.log('Hello from tsx!')
ReactDOM.render(<p>Hello</p>, document.getElementById('root'))
```

你会得到一个错误

![image-20230107222857044](/imgs/oss/blog/vampireachao/image-20230107222857044.png)

```shell
react-dom.development.js:86 Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot
```

提示`API`快要不支持了，按照https://reactjs.org/link/switch-to-createroot进行更换`api`

新版应该这么写：

```tsx
// index.tsx
import React from 'react'
import { createRoot } from 'react-dom/client'

console.log('Hello from tsx!')
createRoot(document.getElementById('root')).render(<p>Hello</p>)
```

