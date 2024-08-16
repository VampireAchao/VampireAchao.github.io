---
title: pug
date: 2022-12-26 12:47:29
tags: 前端
---

> 人心只能赢得，不能靠人馈赠——叶芝

分享一个前端框架`pug`

`github`地址：https://github.com/pugjs/pug

它可以以下面的方式编写`html`

```pug
doctype html
html(lang="en")
  head
    title= pageTitle
    script(type='text/javascript').
      if (foo) bar(1 + 5);
  body
    h1 Pug - node template engine
    #container.col
      if youAreUsingPug
        p You are amazing
      else
        p Get on it!
      p.
        Pug is a terse and simple templating language with a
        strong focus on performance and powerful features.
```

渲染出来实际含义为

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Pug</title>
    <script type="text/javascript">
      if (foo) bar(1 + 5);
    </script>
  </head>
  <body>
    <h1>Pug - node template engine</h1>
    <div id="container" class="col">
      <p>You are amazing</p>
      <p>
        Pug is a terse and simple templating language with a strong focus on
        performance and powerful features.
      </p>
    </div>
  </body>
</html>
```

而且其还提供了`react`插件：https://github.com/pugjs/babel-plugin-transform-react-pug

下面的代码:

```jsx
export const ReactComponent = props => pug`
  .wrapper
    if props.shouldShowGreeting
      p.greeting Hello World!

    button(onClick=props.notify) Click Me
`
```

会被渲染成

```jsx
export const ReactComponent = props => (
  <div className="wrapper">
    {props.shouldShowGreeting ? (
      <p className="greeting">Hello World!</p>
    ) : null}
    <button onClick={props.notify}>Click Me</button>
  </div>
)
```

