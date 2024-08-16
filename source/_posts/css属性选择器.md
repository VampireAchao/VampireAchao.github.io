---
title: css属性选择器
date: 2022-05-21 10:09:48
tags: 前端
---

> 谁终将声震人间，必长久深自缄默；谁终将点燃闪电，必长久如云漂泊。——尼采

首先是`MDN`：https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors

然后是场景：

此处需要将所有包含`overflow: scroll`行内样式(也就是元素的`style`属性内写样式)的元素，设置为`overflow:auto`

代码：

```css
*[style*='overflow: scroll'] {
    overflow: auto !important;
}
```

> ## [示例](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors#示例)
>
> ### [链接](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors#链接)
>
> #### CSS
>
> ```css
> a {
>   color: blue;
> }
> 
> /* 以 "#" 开头的页面本地链接 */
> a[href^="#"] {
>   background-color: gold;
> }
> 
> /* 包含 "example" 的链接 */
> a[href*="example"] {
>   background-color: silver;
> }
> 
> /* 包含 "insensitive" 的链接,不区分大小写 */
> a[href*="insensitive" i] {
>   color: cyan;
> }
> 
> /* 包含 "cAsE" 的链接，区分大小写 */
> a[href*="cAsE" s] {
>   color: pink;
> }
> 
> /* 以 ".org" 结尾的链接 */
> a[href$=".org"] {
>   color: red;
> }
> ```