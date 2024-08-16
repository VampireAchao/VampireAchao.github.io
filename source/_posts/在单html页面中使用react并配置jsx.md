---
title: 在单html页面中使用react并配置jsx
date: 2022-03-01 18:46:31
tags: 前端
---

> 天空更适合仰望，而不是居住。——杜鲁门·卡波特 《蒂凡尼的早餐》
>

首先按照官方文档[一分钟用上`React`](https://react.docschina.org/docs/add-react-to-a-website.html#add-react-in-one-minute)以及[快速尝试`JSX`](https://react.docschina.org/docs/add-react-to-a-website.html#quickly-try-jsx)，如果你不需要`JSX`，可以按照[这个`Demo`](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605)去实现

我们在页面上放入这三个`cdn`：

```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```

然后新建一个`script`标签并指定`type="text/babel"`，例如：

```html
<script src="ruben.js" type="text/babel"></script>
```

然后我们编写代码

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Add React in One Minute</title>
  </head>
  <body>

    <h2>Add React in One Minute</h2>
    <p>This page demonstrates using React with no build tooling.</p>
    <p>React is loaded as a script tag.</p>

    <!-- We will put our React component inside this div. -->
    <div id="like_button_container"></div>

    <div id="filterable_product_table"></div>

    <!-- Load React. -->
    <!-- Note: when deploying, replace "development.js" with "production.min.js". -->
    <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js" crossorigin></script>

    <!-- Load our React component. -->
    <script src="ruben.js" type="text/babel"></script>
  </body>
</html>
```

`ruben.js`：

```jsx
'use strict';

function LikeButton() {
    const [liked, setLiked] = React.useState(false)
    if (liked) {
        return 'You liked this.';
    }
    return (
        <button onClick={() => setLiked(true)} >
            Like
        </button>
    );
}
ReactDOM.render(<LikeButton />, document.querySelector('#like_button_container'))
```

然后就可以预览看看效果啦！

![image-20220301185556823](/imgs/oss/picGo/image-20220301185556823.png)

点击按钮后，`state`变为了`true`，且页面也发生了对应变化

![image-20220301185727520](/imgs/oss/picGo/image-20220301185727520.png)