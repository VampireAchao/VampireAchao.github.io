---
title: freemarker遍历集合
date: 2023-02-14 21:11:08
tags: java
---

> 读而未晓则思，思而未晓则读——朱熹

官方文档：https://freemarker.apache.org/docs/dgui_quickstart_template.html

语法如下：`<#list sequence as loopVariable>repeatThis</#list>`

例如模板如下：

```html
<p>We have these animals:
<table border=1>
  <#list animals as animal>
    <tr><td>${animal.name}<td>${animal.price} Euros
  </#list>
</table>
```

就会生成

```html
<p>We have these animals:
<table border=1>
    <tr><td>mouse<td>50 Euros
    <tr><td>elephant<td>5000 Euros
    <tr><td>python<td>4999 Euros
</table>
```

这里`animal`等于是数组里每一项

![image-20230214211928437](/imgs/oss/blog/vampireachao/image-20230214211928437.png)