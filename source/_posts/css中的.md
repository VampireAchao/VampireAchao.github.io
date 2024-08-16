---
title: css中的&
date: 2021-11-10 18:23:53
tags: 前端
---

> 要在座的人都停止了说话的时候，有了机会，方才可以谦逊地把问题提出，向人学习。—— 约翰·洛克

今天看到一种`css`写法：

```css
/deep/ .message-list {
		flex: 1;
        
		.message-item {
			&-text {
				position: absolute;
			}
		}
	}
```

`/deep/`我们之前博客提过了，嵌套写法很简单，今天聊聊`&`这个父选择器

[`sass`中文文档](https://www.sass.hk/docs/#t4-2)提到了这个父选择器

上方的`&-text`其实就表示`.message-item-text`

```css
		.message-item {
			&-text {
				position: absolute;
			}
		}
```

编译后为：

```css
		.message-item {
			.message-item-text {
				position: absolute;
			}
		}
```

