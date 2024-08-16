---
title: java使用jodd操作html
date: 2024-04-20 18:56:18
tags: java
---

> 快乐就像香水，不是泼在别人身上，而是洒在自己身上。——拉尔夫·沃尔多·爱默生

https://github.com/oblac/jodd

https://jodd.org/

Jodd 是一个开源的 Java 工具库，提供了一系列简化和增强 Java 开发的工具，包括但不限于对象操作、数据库连接、邮件发送等功能。`JerryParser` 是 Jodd 中处理 HTML 的重要工具。

`JerryParser` 基于 CSS 选择器，允许开发者使用类似 jQuery 的语法来查找、修改和操纵 HTML 元素。这样的设计使得处理 HTML 文档就像在编写 jQuery 脚本一样简单。

主要功能：

- **查找元素**：通过 CSS 选择器快速定位页面上的元素。
- **修改内容**：轻松添加、删除或修改元素的内容和属性。
- **事件处理**：支持基本的事件绑定，如点击、加载等。

安装：

首先，确保你的项目中已经包含了 Jodd 库。如果还没有，可以通过 Maven 添加依赖：

```xml
<dependency>
    <groupId>org.jodd</groupId>
    <artifactId>jodd-all</artifactId>
    <version>最新版本号</version>
</dependency>
```

基本用法

解析一个简单的 HTML 页面

```java
import jodd.jerry.Jerry;
import jodd.lagarto.dom.Node;

public class Main {
    public static void main(String[] args) {
        String html = "<html><head><title>Test</title></head>"
                      + "<body><p id='p1'>Hello, world!</p><a href='http://example.com'>Link</a></body></html>";

        Jerry doc = Jerry.jerry(html);
        String title = doc.$("title").text();
        System.out.println("Title: " + title);

        Jerry paragraph = doc.$("#p1");
        System.out.println("Paragraph text: " + paragraph.text());

        Jerry link = doc.$("a");
        System.out.println("Link: " + link.attr("href"));
    }
}
```

输出结果：

```
Title: Test
Paragraph text: Hello, world!
Link: http://example.com
```

使用 CSS 选择器修改 HTML

```java
Jerry doc = Jerry.jerry(html);
doc.$("body").append("<div>New Div</div>");
System.out.println(doc.html());
```

这将在 `<body>` 标签内添加一个新的 `<div>`。

绑定事件

```java
doc.$("a").on("click", new JerryFunction() {
    @Override
    public boolean onEvent(Jerry $this, JerryEvent event) {
        System.out.println("Clicked: " + $this.attr("href"));
        return true;
    }
});
```
