---
title: html转word或pdf
date: 2021-01-04 23:43:00
tags: java
---

> 差以毫厘，谬以千里。——班固《汉书》

使用的组件还是`Spire.Doc`，可以看我[这篇博客](https://VampireAchao.github.io/2020/12/13/%E4%BD%BF%E7%94%A8java%E6%93%8D%E4%BD%9Cword/)

如果我们遇到`html`,需要直接渲染到`word`或者`pdf`上，可以使用[官方文档](https://www.e-iceblue.cn/spiredocforjavaconversion/java-convert-html-string-file-to-pdf.html)给的例子

```java
import com.spire.doc.*;
import java.io.*;

public class htmlStringToWord {

    public static void main(String[] args) throws Exception {

        String inputHtml = "InputHtml.txt";
        //新建Document对象
        Document document = new Document();
        //添加section
        Section sec = document.addSection();

        String htmlText = readTextFromFile(inputHtml);
        //添加段落并写入HTML文本
        sec.addParagraph().appendHTML(htmlText);

        //文档另存为PDF
        document.saveToFile("HTMLstringToPDF.pdf", FileFormat.PDF);
    }
    public static String readTextFromFile(String fileName) throws IOException{
        StringBuffer sb = new StringBuffer();
        BufferedReader br = new BufferedReader(new FileReader(fileName));
        String content = null;
        while ((content = br.readLine()) != null) {
            sb.append(content);
        }
        return sb.toString();
    }
}
```

但如果我们想使用替换书签的方式去做，那就需要自己写了，官网是没有找到这个东西的

我这里写的函数可以实现

```java
    /**
     * @MethodName: fillReplaceHtml
     * @Description: 填充替换掉html标签后的文本
     * @Date: 2020/12/28 0028 15:02
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [doc, bookmarkName, data]
     * @returnValue: void
     */
    public static void fillReplaceHtml(Document doc, String bookmarkName, String data) {
        // 定位书签
        BookmarksNavigator bookmarkNavigator = new BookmarksNavigator(doc);
        bookmarkNavigator.moveToBookmark(bookmarkName);
        // 创建段落
        Paragraph para = new Paragraph(doc);
        // 创建文本内容
        TextRange textRange = para.appendText(StringUtils.replaceHtml(data));
        // 设置格式
        CharacterFormat format = textRange.getCharacterFormat();
        // 大小
        format.setFontSize(9);
        // 创建文本域
        TextBodyPart bodyPart = new TextBodyPart(doc);
        // 添加段落到文本域
        bodyPart.getBodyItems().add(para);
        // 替换书签内容
        try {
            bookmarkNavigator.replaceBookmarkContent(bodyPart);
        } catch (Exception e) {
            log.error("书签《" + bookmarkName + "》丢失", e);
        }
    }
```

