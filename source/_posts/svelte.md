---
title: svelte
date: 2023-03-20 22:56:34
tags: 前端
---

> 我宁肯忘掉亏欠自己的而不愿忘掉亏欠别人的。——贝多芬

分享一个前端框架`svelte`

官网：https://svelte.dev/

仓库链接：https://github.com/sveltejs/svelte

语法非常的简单容易上手

![image-20230320225847506](/imgs/oss/blog/vampireachao/image-20230320225847506.png)

```html
<script>
	let name = 'world';
</script>

<h1>Hello {name}!</h1>
```

同样是响应式

![image-20230320225948337](/imgs/oss/blog/vampireachao/image-20230320225948337.png)

非常的有意思

使用也很简单

```shell
npm create svelte@latest myapp
cd myapp
npm install
npm run dev
```

