---
title: toastify-js
date: 2023-11-23 08:44:26
tags: 前端
---

> 无论掌握哪一种知识，对智力都是有用的，它会把无用的东西抛开而把好的东西保留住。——达·芬奇

分享一个前端消息提示组件库`ToastifyJs`

https://github.com/apvarun/toastify-js

引入：

```bash
npm install --save toastify-js
```

或者

```html
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">

<script src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
```

使用：

```javascript
Toastify({ text: "This is a toast", duration: 3000 }).showToast();
```

复杂例子：

```javascript
Toastify({
  text: "This is a toast",
  duration: 3000,
  destination: "https://github.com/apvarun/toastify-js",
  newWindow: true,
  close: true,
  gravity: "top", // `top` or `bottom`
  position: "left", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "linear-gradient(to right, #00b09b, #96c93d)",
  },
  onClick: function(){} // Callback after click
}).showToast();
```

完整api:

> | Option Key      | type                   | Usage                                                                                                                                                                               | Defaults                                                        |
> | --------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
> | text            | string                 | Message to be displayed in the toast                                                                                                                                                | "Hi there!"                                                     |
> | node            | ELEMENT_NODE           | Provide a node to be mounted inside the toast. `node` takes higher precedence over `text`                                                                                           |                                                                 |
> | duration        | number                 | Duration for which the toast should be displayed.<br>-1 for permanent toast                                                                                                         | 3000                                                            |
> | selector        | string \| ELEMENT_NODE | ShadowRoot                                                                                                                                                                          | CSS Selector or Element Node on which the toast should be added |
> | destination     | URL string             | URL to which the browser should be navigated on click of the toast                                                                                                                  |                                                                 |
> | newWindow       | boolean                | Decides whether the `destination` should be opened in a new window or not                                                                                                           | false                                                           |
> | close           | boolean                | To show the close icon or not                                                                                                                                                       | false                                                           |
> | gravity         | "top" or "bottom"      | To show the toast from top or bottom                                                                                                                                                | "top"                                                           |
> | position        | "left" or "right"      | To show the toast on left or right                                                                                                                                                  | "right"                                                         |
> | backgroundColor | CSS background value   | To be deprecated, use `style.background` option instead. Sets the background color of the toast                                                                                     |                                                                 |
> | avatar          | URL string             | Image/icon to be shown before text                                                                                                                                                  |                                                                 |
> | className       | string                 | Ability to provide custom class name for further customization                                                                                                                      |                                                                 |
> | stopOnFocus     | boolean                | To stop timer when hovered over the toast (Only if duration is set)                                                                                                                 | true                                                            |
> | callback        | Function               | Invoked when the toast is dismissed                                                                                                                                                 |                                                                 |
> | onClick         | Function               | Invoked when the toast is clicked                                                                                                                                                   |                                                                 |
> | offset          | Object                 | Ability to add some offset to axis                                                                                                                                                  |                                                                 |
> | escapeMarkup    | boolean                | Toggle the default behavior of escaping HTML markup                                                                                                                                 | true                                                            |
> | style           | object                 | Use the HTML DOM Style properties to add any style directly to toast                                                                                                                |                                                                 |
> | ariaLive        | string                 | Announce the toast to screen readers, see [ARIA live regions - Accessibility \| MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) for options | "polite"                                                        |
> | oldestFirst     | boolean                | Set the order in which toasts are stacked in page                                                                                                                                   | true                                                            |
