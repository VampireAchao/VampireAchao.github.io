---
title: css超出省略号
date: 2021-09-03 19:58:32
tags: 前端
---

> 攀登科学高峰，就像登山运动员攀登珠穆朗玛峰一样，要克服无数艰难险阻，懦夫和懒汉是不可能享受到胜利的喜悦和幸福的。——陈景润

注意使用的时候要指定宽度`width`

```css
/* 单行 */
.text-omit-one-line {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
/* 多行 */
.text-omit-more-line {
	word-break: break-all;
	text-overflow: ellipsis;
	overflow: hidden;
	display: -webkit-box;
	-webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
```

