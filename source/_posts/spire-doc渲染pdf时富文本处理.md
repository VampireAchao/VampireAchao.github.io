---
title: spire.doc渲染pdf时富文本处理
date: 2021-01-16 17:42:07
tags: java
---

> 不以一眚掩大德。——《左传》

使用`spire.doc`渲染富文本的话，可以使用`Paragraph`中的`appendHTML()`函数去渲染富文本，例如下面

```java
package com.ruben;

import com.spire.doc.Document;
import com.spire.doc.FileFormat;
import com.spire.doc.documents.Paragraph;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

/**
 * @ClassName: WordDemo
 * @Description: 我还没有写描述
 * @Date: 2021/1/15 0015 20:31
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
public class WordDemo {
    private static final String TARGET_PATH = "D:/file/testReport/pdf/" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd-HH-mm-ss", Locale.CHINA)) + ".pdf";

    public static void main(String[] args) {
        Document doc = new Document();
        Paragraph para = doc.addSection().addParagraph();
        para.appendHTML("阿超-0-{0-[0-(阿超-");
        doc.saveToFile(TARGET_PATH, FileFormat.PDF);
    }
}
```

执行后我们打开生成的文件

![image-20210116174558091](/imgs/oss/picGo/image-20210116174558091.png)

但我们发现，这里的短横线一上一下的，并没有对齐以至于影响了美观

![image-20210116174643560](/imgs/oss/picGo/image-20210116174643560.png)

我们可以给它指定一个字体，例如加上`<font face='宋体'>`标签

```java
package com.ruben;

import com.spire.doc.Document;
import com.spire.doc.FileFormat;
import com.spire.doc.documents.Paragraph;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

/**
 * @ClassName: WordDemo
 * @Description: 我还没有写描述
 * @Date: 2021/1/15 0015 20:31
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
public class WordDemo {
    private static final String TARGET_PATH = "D:/file/testReport/pdf/" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd-HH-mm-ss", Locale.CHINA)) + ".pdf";

    public static void main(String[] args) {
        Document doc = new Document();
        Paragraph para = doc.addSection().addParagraph();
        para.appendHTML("<font face='宋体'>阿超-0-{0-[0-(阿超-</font>");
        doc.saveToFile(TARGET_PATH, FileFormat.PDF);
    }
}
```

然后我们再执行发现刚才的横线整齐了

![image-20210116174942286](/imgs/oss/picGo/image-20210116174942286.png)

当然如果是非富文本，例如`appendText`

```java
        Document doc = new Document();
        Paragraph para = doc.addSection().addParagraph();
        para.appendText("阿超-0-{0-[0-(阿超-");
        doc.saveToFile(TARGET_PATH, FileFormat.PDF);
```

我们同样可以给它加上字体，如下

```java
        Document doc = new Document();
        Paragraph para = doc.addSection().addParagraph();
        TextRange text = para.appendText("阿超-0-{0-[0-(阿超-");
        CharacterFormat format = text.getCharacterFormat();
        format.setFontName("宋体");
        doc.saveToFile(TARGET_PATH, FileFormat.PDF);
```

这样就不会出现这种情况了