---
title: flexmark-java
date: 2022-09-16 13:01:59
tags: java
---

> 不能用温情征服对方的人，用殴打也征服不了对方——契诃夫

分享一个`markdown`解析框架：`flexmark-java`

https://github.com/vsch/flexmark-java

使用：

```xml
<dependency>
    <groupId>com.vladsch.flexmark</groupId>
    <artifactId>flexmark-all</artifactId>
    <version>0.64.0</version>
</dependency>
```

demo：

```java
package com.vladsch.flexmark.samples;

import com.vladsch.flexmark.util.ast.Node;
import com.vladsch.flexmark.html.HtmlRenderer;
import com.vladsch.flexmark.parser.Parser;
import com.vladsch.flexmark.util.data.MutableDataSet;

public class BasicSample {
    public static void main(String[] args) {
        MutableDataSet options = new MutableDataSet();

        // uncomment to set optional extensions
        //options.set(Parser.EXTENSIONS, Arrays.asList(TablesExtension.create(), StrikethroughExtension.create()));

        // uncomment to convert soft-breaks to hard breaks
        //options.set(HtmlRenderer.SOFT_BREAK, "<br />\n");

        Parser parser = Parser.builder(options).build();
        HtmlRenderer renderer = HtmlRenderer.builder(options).build();

        // You can re-use parser and renderer instances
        Node document = parser.parse("This is *Sparta*");
        String html = renderer.render(document);  // "<p>This is <em>Sparta</em></p>\n"
        System.out.println(html);
    }
}
```

