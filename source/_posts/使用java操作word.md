---
title: 使用java操作word
date: 2020-12-13 16:24:56
tags: java
---

> 真正的美德不可没有实用的智慧，而实用的智慧也不可没有美德。——亚里士多德

可以使用`Spire`操作`word`

**Spire.Doc for Java** 是一款专业的 Java Word 组件，开发人员使用它可以轻松地将 Word 文档创建、读取、编辑、转换和打印等功能集成到自己的 Java 应用程序中。作为一款完全独立的组件，Spire.Doc for Java 的运行环境无需安装 Microsoft Office。

Spire.Doc for Java 能执行多种 Word 文档处理任务，包括[生成](https://www.e-iceblue.cn/spiredocforjavaoperating/create-word-document-in-java.html)、读取、转换和打印 Word 文档，插入图片，添加页眉和页脚，创建表格，添加表单域和邮件合并域，添加书签，[添加文本和图片水印](https://www.e-iceblue.cn/doc_java_watermark/java-add-text-watermark-and-image-watermark-to-word-document.html)，[设置背景颜色和背景图片](https://www.e-iceblue.cn/spiredocforjavapagebackground/java-set-background-image-and-backgrond-color-for-word-document.html)，添加脚注和尾注，[添加超链接](https://www.e-iceblue.cn/spiredocforjava/insert-hyperlinks-in-word-in-java.html)，加密和解密 Word 文档，添加批注，添加形状等。

[官方文档](https://www.e-iceblue.cn/tutorials.html)

依赖

```xml
        <dependency>
            <groupId>e-iceblue</groupId>
            <artifactId>spire.doc.free</artifactId>
            <version>3.9.0</version>
        </dependency>
```

再奉上一个自己写的工具类

```java
package com.ruben.utils.coreUtils;

import cn.hutool.core.date.DateUtil;
import com.ruben.utils.FileUtils;
import com.ruben.utils.StringKit;
import com.ruben.utils.StringUtils;
import com.ruben.utils.collection.MapUtil;
import com.spire.doc.*;
import com.spire.doc.collections.*;
import com.spire.doc.documents.*;
import com.spire.doc.fields.DocPicture;
import com.spire.doc.fields.TextRange;
import com.spire.doc.formatting.CharacterFormat;
import com.spire.doc.formatting.ParagraphFormat;
import lombok.extern.slf4j.Slf4j;

import java.io.*;
import java.net.URLEncoder;
import java.text.DateFormat;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Pattern;

/**
 * @ClassName: WordCoreUtils
 * @Date: 2020/12/8 0008 11:27
 * @Description: 我还没有写描述
 * @Author: <achao1441470436@gmail.com>
 */
@Slf4j
public class WordCoreUtils {

    public static final String CHECKED = "■";
    public static final String NO_CHECK = "□";
    public static final String ENCLOSURE = "☼";
    public static final String DATE_TIME_PATTERN_UTC = "yyyy-MM-dd'T'HH:mm:ss.sss'Z'";
    private static final ThreadLocal<DateFormat> DATE_FORMAT_THREAD_LOCAL = ThreadLocal.withInitial(() -> new SimpleDateFormat(DATE_TIME_PATTERN_UTC));

    /**
     * @MethodName: check
     * @Description: 打勾
     * @Date: 2020/12/8 0008 11:35
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [doc, bookmarkName]
     * @returnValue: void
     */
    public static void check(Document doc, String bookmarkName) {
        check(doc, bookmarkName, "", true);
    }

    /**
     * @MethodName: check
     * @Description: 勾选
     * @Date: 2020/12/14 0014 15:49
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [doc, bookmarkName, text]
     * @returnValue: void
     */
    public static void check(Document doc, String bookmarkName, String text, boolean checked) {
        if (checked) {
//            text = "\uF052" + text;
            text = CHECKED + text;
        } else {
            text = NO_CHECK + text;
        }
        // 定位书签
        BookmarksNavigator bookmarkNavigator = new BookmarksNavigator(doc);
        bookmarkNavigator.moveToBookmark(bookmarkName);
        // 创建段落
        Paragraph para = new Paragraph(doc);
        // 创建文本内容
        TextRange textRange = para.appendText(text);
        // 设置格式
        CharacterFormat format = textRange.getCharacterFormat();
        if (checked) {
            // 字体
//            format.setFontName("Wingdings 2");
            // 大小
            format.setFontSize(15);
        } else {
            // 大小
            format.setFontSize(9);
        }
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

    /**
     * @MethodName: check
     * @Description: 批量勾选
     * @Date: 2020/12/10 0010 10:17
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [doc, set]
     * @returnValue: void
     */
    public static void check(Document doc, Set<String> set) {
        set.forEach(s -> check(doc, s));
    }

    /**
     * @MethodName: check
     * @Description: 填充书签
     * @Date: 2020/12/9 0009 17:07
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [condition, doc, bookmarkName]
     * @returnValue: void
     */
    public static void check(boolean condition, Document doc, String bookmarkName) {
        if (!condition) {
            return;
        }
        check(doc, bookmarkName);
    }

    /**
     * @MethodName: fillText
     * @Description: 填充书签
     * @Date: 2020/12/9 0009 13:03
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [doc, bookmarkName, content]
     * @returnValue: void
     */
    public static void fillText(Document doc, String bookmarkName, String content) {
        fillText(doc, bookmarkName, content, Boolean.TRUE);
    }

    /**
     * @MethodName: fillText
     * @Description: 填充书签
     * @Date: 2020/12/9 0009 17:05
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [condition, doc, bookmarkName, content]
     * @returnValue: void
     */
    public static void fillText(boolean condition, Document doc, String bookmarkName, String content) {
        if (!condition) {
            return;
        }
        fillText(doc, bookmarkName, content);
    }

    public static final Pattern HTML_PATTERN = Pattern.compile("<.+?>");

    /**
     * @MethodName: copyTable
     * @Description: 只复制表格
     * @Date: 2020/12/8 0008 17:41
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [table, start, rows]
     * @returnValue: void
     */
    public static void copyTable(Table table, int start, int rows) {
        int end = start + rows;
        for (int j = start; j < end; j++) {
            TableRow row = table.getRows().get(j).deepClone();
            table.getRows().insert(j + rows, row);
        }
    }

    /**
     * @MethodName: deepClone
     * @Description: 深克隆
     * @Date: 2020/12/8 0008 19:20
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [needCopy, tableRow]
     * @returnValue: void
     */
    public static void deepClone(boolean needCopy, TableRow tableRow) {
        if (!needCopy) {
            return;
        }
        tableRow = tableRow.deepClone();
    }

    /**
     * @MethodName: insertRow
     * @Description: 插入行
     * @Date: 2020/12/8 0008 19:23
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [table, start, rows, tableRow]
     * @returnValue: void
     */
    public static void insertRow(boolean needCopy, Table table, int start, int rows, TableRow tableRow) {
        if (!needCopy) {
            return;
        }
        table.getRows().insert(start + rows, tableRow);
    }

    /**
     * @MethodName: fillTableCell
     * @Description: 赋值
     * @Date: 2020/12/8 0008 19:41
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [needCopy, tableCell, value]
     * @returnValue: void
     */
    public static void fillTableCell(boolean needCopy, TableCell tableCell, String value) {
        if (!needCopy) {
            for (int i = 0; i < tableCell.getParagraphs().getCount(); i++) {
                tableCell.getParagraphs().removeAt(i);
            }
        }
        tableCell.addParagraph().appendText(value);
    }

    /**
     * @MethodName: appendCheck
     * @Description: 在段落里添加勾
     * @Date: 2020/12/8 0008 20:35
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [para]
     * @returnValue: void
     */
    public static void appendCheck(boolean checked, Paragraph para) {
        if (checked) {
            TextRange textRange = para.appendText("\uF052");
            CharacterFormat format = textRange.getCharacterFormat();
            format.setFontName("Wingdings 2");
            format.setFontSize(9);
        } else {
            para.appendText(NO_CHECK);
        }
    }

    /**
     * @MethodName: mergeTable
     * @Description: 合并表格
     * @Date: 2020/12/9 0009 9:44
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [documents]
     * @returnValue: com.spire.doc.Document
     */
    public static Document mergeBigTable(Document... documents) {
        return mergeAddSectionTable(null, documents);
    }

    /**
     * @MethodName: fillOnlyText
     * @Description: 只填充文本不加下划线
     * @Date: 2020/12/9 0009 15:38
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [doc, bookmarkName, v]
     * @returnValue: void
     */
    public static void fillOnlyText(Document doc, String bookmarkName, String v) {
        fillText(doc, bookmarkName, v, Boolean.FALSE);
    }

    /**
     * @MethodName: fillOnlyText
     * @Description: 只填充文本不加下划线
     * @Date: 2020/12/9 0009 17:06
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [condition, doc, bookmarkName, v]
     * @returnValue: void
     */
    public static void fillOnlyText(boolean condition, Document doc, String bookmarkName, String v) {
        if (!condition) {
            return;
        }
        fillText(doc, bookmarkName, v, Boolean.FALSE);
    }

    /**
     * @MethodName: fillDate
     * @Description: 填充时间
     * @Date: 2020/12/9 0009 16:56
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [doc, date, yearBookmark, monthBookmark, dayBookmark]
     * @returnValue: void
     */
    public static void fillDate(Document doc, Date date, String yearBookmark, String monthBookmark, String dayBookmark) {
        if (Objects.isNull(date)) {
            return;
        }
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        WordCoreUtils.fillOnlyText(doc, yearBookmark,
                String.valueOf(calendar.get(Calendar.YEAR)));
        WordCoreUtils.fillOnlyText(doc, monthBookmark,
                String.valueOf(calendar.get(Calendar.MONTH) + 1));
        WordCoreUtils.fillOnlyText(doc, dayBookmark,
                String.valueOf(calendar.get(Calendar.DATE)));
    }

    /**
     * @MethodName: checkBox
     * @Description: 多选
     * @Date: 2020/12/9 0009 17:01
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [map<标签, 值>]
     * @returnValue: void
     */
    public static void checkBox(Document doc, Map<String, String> map, String value) {
        map.forEach((k, v) -> check(value.contains(v), doc, k));
    }

    /**
     * @MethodName: fillOnlyText
     * @Description: 批量赋值不加下划线
     * @Date: 2020/12/9 0009 17:41
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [doc, normalMap[map<标签, 值>]]
     * @returnValue: void
     */
    public static void fillOnlyText(Document doc, Map<String, String> normalMap) {
        if (MapUtil.isEmpty(normalMap)) {
            return;
        }
        normalMap.forEach((k, v) -> fillOnlyText(StringKit.isNotBlank(v), doc, k, v));
    }

    /**
     * @MethodName: fillText
     * @Description: 批量赋值加下划线
     * @Date: 2020/12/9 0009 17:44
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [doc, underLineMap]
     * @returnValue: void
     */
    public static void fillText(Document doc, Map<String, String> underLineMap) {
        if (MapUtil.isEmpty(underLineMap)) {
            return;
        }
        underLineMap.forEach((k, v) -> fillText(StringKit.isNotBlank(v), doc, k, v));
    }

    /**
     * @MethodName: mergeAutoFitTable
     * @Description: 设置列宽合并表格
     * @Date: 2020/12/10 0010 16:56
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [autoFit, documents]
     * @returnValue: com.spire.doc.Document
     */
    public static Document mergeAutoFitTable(AutoFitBehaviorType autoFit, Document... documents) {
        // 创建结果文档
        Document result = new Document();
        // 结果文档添加section
        Section section = Optional.ofNullable(result.getLastSection()).orElse(result.addSection());
        // 结果文档添加表格
        TableCollection tableCollection = section.getTables();
        // 表格数量
        int count = tableCollection.getCount();
        Table table = count > 0 ? tableCollection.get(count - 1) : section.addTable(true);
        // 遍历，添加
        for (int i = 0; i < documents.length; i++) {
            // 获取文档中的sections
            SectionCollection sections = documents[i].getSections();
            // 获取文档中的表格
            TableCollection tables = sections.get(0).getTables();
            // 获取表格中的列
            RowCollection rows = tables.get(0).getRows();
            for (int j = 0; j < rows.getCount(); j++) {
                // 遍历添加到需要添加的表格下方
                table.getRows().add(rows.get(j).deepClone());
            }
            if (Objects.nonNull(autoFit)) {
                // 列宽类型
                table.autoFit(autoFit);
            }
        }
        return result;
    }

    /**
     * @MethodName: mergeSectionsTable
     * @Description: 合并表格
     * @Date: 2020/12/10 0010 17:21
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [documents]
     * @returnValue: com.spire.doc.Document
     */
    public static Document mergeSectionsTable(AutoFitBehaviorType autoFit, Document... documents) {
        // 创建结果文档
        Document result = new Document();
        // 遍历，添加
        for (Document document : documents) {
            // 结果文档添加section
            Section section = Optional.ofNullable(result.getLastSection()).orElse(result.addSection());
            // 结果文档添加表格
            Table table = section.getTables().getCount() == 0 ? section.addTable(true) : section.getTables().get(section.getTables().getCount() - 1);
            // 获取文档中的sections
            SectionCollection sections = document.getSections();
            for (int k = 0; k < sections.getCount(); k++) {
                // 获取文档中的表格
                TableCollection tables = sections.get(k).getTables();
                Table currentTable = tables.get(0);
                // 获取表格中的列
                RowCollection rows = currentTable.getRows();
                for (int j = 0; j < rows.getCount(); j++) {
                    TableRow row = rows.get(j).deepClone();
                    // 单行显示
                    onePageShow(row);
                    // 遍历添加到需要添加的表格下方
                    table.getRows().add(row);
                }
            }
            if (Objects.nonNull(autoFit)) {
                //列宽自动适应窗口
                table.autoFit(autoFit);
            }
        }
        return result;
    }

    private static void onePageShow(TableRow row) {
        CellCollection cells = row.getCells();
        for (int i = 0; i < cells.getCount(); i++) {
            ParagraphCollection paragraphs = cells.get(i).getParagraphs();
            for (int l = 0; l < paragraphs.getCount(); l++) {
                ParagraphFormat format = paragraphs.get(l).getFormat();
                // 设置表格内容在同一页显示
                format.setKeepFollow(true);
            }
        }
    }

    /**
     * @MethodName: mergeSectionsTable
     * @Description: 合并表格
     * @Date: 2020/12/10 0010 17:56
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [documents]
     * @returnValue: com.spire.doc.Document
     */
    public static Document mergeSectionsTable(Document... documents) {
        // Auto_Fit_To_Window 列宽自适应窗口
        return mergeSectionsTable(AutoFitBehaviorType.Auto_Fit_To_Window, documents);
    }

    /**
     * @MethodName: fillTexts
     * @Description: 多行替换书签
     * @Date: 2020/12/11 0011 11:09
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [doc, underlineMap]
     * @returnValue: void
     */
    public static void fillTexts(Document doc, String bookmarkName, String value, int lines) {
        if (StringKit.isEmpty(value)) {
            return;
        }
        StringBuilder valueBuilder = new StringBuilder(" " + value);
        while (valueBuilder.length() < 47) {
            valueBuilder.append(" ");
        }
        while (valueBuilder.length() < 86 * lines) {
            valueBuilder.append("\n                                                                                      ");
        }
        value = valueBuilder.toString();
        fillText(doc, bookmarkName, value);
    }

    /**
     * @MethodName: fillTextOneLine
     * @Description: 填充一行
     * @Date: 2020/12/11 0011 11:58
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [doc, underlineMap]
     * @returnValue: void
     */
    public static void fillTextOneLine(Document doc, Map<String, String> underlineMap) {
        if (underlineMap.isEmpty()) {
            return;
        }
        underlineMap.forEach((bookmarkName, value) -> {
            StringBuilder valueBuilder = new StringBuilder(" " + value);
            while (valueBuilder.length() < 53) {
                valueBuilder.append(" ");
            }
            value = valueBuilder.toString();
            fillText(doc, bookmarkName, value);
        });
    }

    /**
     * @MethodName: concatWord
     * @Description: 连接word分页面
     * @Date: 2020/12/11 0011 14:15
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [documents]
     * @returnValue: com.spire.doc.Document
     */
    public static Document concatWord(Document... documents) {
        Document result = new Document();
        for (Document document : documents) {
            //获取第一个文档的最后一个section
            Section addSection = result.addSection();
            //将第二个文档的段落作为新的段落添加到第一个文档的最后一个section
            for (Section section : (Iterable<Section>) document.getSections()) {
                for (DocumentObject obj : (Iterable<DocumentObject>) section.getBody().getChildObjects()) {
                    addSection.getBody().getChildObjects().add(obj.deepClone());
                }
            }
        }
        return result;
    }

    /**
     * @MethodName: picture
     * @Description: 填充图片
     * @Date: 2021/1/5 0005 9:53
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [doc, bookmarkName, filePath]
     * @returnValue: void
     */
    public static void picture(Document doc, String bookmarkName, String filePath) {
        if (StringKit.isBlank(filePath)) {
            return;
        }
        try {
            // 对文件的中文【程序附件】编码 如果路径中有中文，需要用这个编码，不建议全部编码，会把符号弄掉
            filePath = filePath.replace("程序附件", URLEncoder.encode("程序附件", "utf-8"));
            //定位到指定书签位置起始标签位置，插入图片
            BookmarksNavigator bookmarksNavigator1 = new BookmarksNavigator(doc);
            bookmarksNavigator1.moveToBookmark(bookmarkName, true, false);
            Paragraph para = new Paragraph(doc);
            byte[] bytes = FileUtils.loadPicture(filePath);
            if (Objects.isNull(bytes)) {
                log.error("图片无法加载");
                return;
            }
            DocPicture picture = para.appendPicture(bytes);
            picture.setWidth(100f);
            picture.setHeight(100f);
            picture.setDistanceLeft(50f);
            try {
                bookmarksNavigator1.insertParagraph(para);
            } catch (NullPointerException e) {
                log.error("书签《" + bookmarkName + "》丢失", e);
            }
            para.getFormat().setHorizontalAlignment(HorizontalAlignment.Center);
        } catch (Exception e) {
            log.error("错误", e);
        }
    }

    /**
     * @MethodName: setTableAutoFit
     * @Description: 设置表格列宽对齐方式
     * @Date: 2020/12/16 0016 14:28
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [autoFitBehaviorType, doc]
     * @returnValue: void
     */
    public static void setTableAutoFit(AutoFitBehaviorType autoFitType, Document doc) {
        SectionCollection sections = doc.getSections();
        for (int i = 0; i < sections.getCount(); i++) {
            TableCollection tables = sections.get(i).getTables();
            for (int j = 0; j < tables.getCount(); j++) {
                tables.get(j).autoFit(autoFitType);
            }
        }
    }

    /**
     * @MethodName: setTableIsBreakAcrossPages
     * @Description: 设置表格是否跨页断行
     * @Date: 2020/12/16 0016 14:39
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [autoFitType, doc]
     * @returnValue: void
     */
    public static void setTableIsBreakAcrossPages(boolean isBreakAcrossPages, Document doc) {
        SectionCollection sections = doc.getSections();
        for (int i = 0; i < sections.getCount(); i++) {
            TableCollection tables = sections.get(i).getTables();
            for (int j = 0; j < tables.getCount(); j++) {
                tables.get(j).getTableFormat().isBreakAcrossPages(isBreakAcrossPages);
            }
        }
    }

    /**
     * @MethodName: applyVerticalMerge
     * @Description: 合并单元格
     * @Date: 2020/12/16 0016 14:52
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [document, cells, startRows, endRows]
     * @returnValue: void
     */
    public static void applyVerticalMerge(Document doc, int cells, int startRows, int endRows) {
        SectionCollection sections = doc.getSections();
        for (int i = 0; i < sections.getCount(); i++) {
            TableCollection tables = sections.get(i).getTables();
            for (int j = 0; j < tables.getCount(); j++) {
                tables.get(j).applyVerticalMerge(cells, startRows, endRows);
            }
        }
    }

    /**
     * @MethodName: fillEnclosure
     * @Description: 附件标志
     * @Date: 2020/12/22 0022 15:34
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [condition, doc, bookmarkName]
     * @returnValue: void
     */
    public static void fillEnclosure(boolean condition, Document doc, String bookmarkName) {
        if (!condition) {
            return;
        }
        fillEnclosure(doc, bookmarkName);
    }

    /**
     * @MethodName: fillEnclosure
     * @Description: 附件标志
     * @Date: 2020/12/31 0031 10:23
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [file, doc, bookmarkName, enclosureMark]
     * @returnValue: void
     */
    public static void fillEnclosure(String file, Document doc, String bookmarkName, String enclosureMark) {
        if (StringKit.isBlank(file)) {
            return;
        }
        // 定位书签
        BookmarksNavigator bookmarkNavigator = new BookmarksNavigator(doc);
        bookmarkNavigator.moveToBookmark(bookmarkName);
        // 创建段落
        Paragraph para = new Paragraph(doc);
        // 创建文本内容
        TextRange textRange = para.appendText(enclosureMark);
        // 设置格式
        CharacterFormat format = textRange.getCharacterFormat();
        // 字体
        format.setFontName("Segoe UI Symbol");
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


    /**
     * @MethodName: fillEnclosure
     * @Description: 附件标志
     * @Date: 2020/12/22 0022 16:00
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [file, doc, bookmarkName]
     * @returnValue: void
     */
    public static void fillEnclosure(String file, Document doc, String bookmarkName) {
        if (StringKit.isEmpty(file)) {
            return;
        }
        fillEnclosure(doc, bookmarkName);
    }

    /**
     * @MethodName: fillEnclosure
     * @Description: 附件标志
     * @Date: 2020/12/22 0022 15:45
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [doc, bookmarkName]
     * @returnValue: void
     */
    public static void fillEnclosure(Document doc, String bookmarkName) {
        fillEnclosure(WordCoreUtils.CHECKED, doc, bookmarkName, WordCoreUtils.ENCLOSURE);
    }

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

    /**
     * @MethodName: fillText
     * @Description: 填充书签
     * @Date: 2020/12/9 0009 13:39
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [doc, bookmarkName, content, underline]
     * @returnValue: void
     */
    public static void fillText(Document doc, String bookmarkName, String content, boolean underline) {
        if (StringKit.isBlank(content)) {
            return;
        }
        // 定位书签
        BookmarksNavigator bookmarkNavigator = new BookmarksNavigator(doc);
        bookmarkNavigator.moveToBookmark(bookmarkName);
        // 创建段落
        Paragraph para = new Paragraph(doc);
        // 创建文本内容
        TextRange textRange = para.appendText(StringUtils.replaceHtml(content));
        // 设置格式
        CharacterFormat format = textRange.getCharacterFormat();
        if (underline) {
            // 添加下划线
//            format.setUnderlineStyle(UnderlineStyle.Single);
        }
        format.setFontSize(9);
        format.setFontName("宋体");
        // 创建文本域
        TextBodyPart bodyPart = new TextBodyPart(doc);
        // 添加段落到文本域
        bodyPart.getBodyItems().add(para);
        // 替换书签内容
        try {
            bookmarkNavigator.replaceBookmarkContent(bodyPart);
        } catch (NullPointerException e) {
            log.error("书签《" + bookmarkName + "》丢失", e);
        }
    }

    /**
     * @MethodName: fillHtml
     * @Description: 填充富文本
     * @Date: 2020/12/28 0028 15:03
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [doc, bookmarkName, htmlStr]
     * @returnValue: void
     */
    public static void fillHtml(Document doc, String bookmarkName, String htmlStr) {
        if (StringKit.isBlank(htmlStr)) {
            return;
        }
        htmlStr = htmlStr.replaceAll("<[/]*p[ ]*>\\\\+[A-Za-z]", "</br>")
                .replaceAll("\t", "")
                .replaceAll("\n", "")
                .replaceAll("&nbsp;", " ")
                .replaceAll("<[/]*p[ ]*>", "");
        if (!HTML_PATTERN.matcher(htmlStr).matches()) {
            fillOnlyText(doc, bookmarkName, htmlStr);
            return;
        }
        BookmarksNavigator bookmarksNavigator = new BookmarksNavigator(doc);
        bookmarksNavigator.moveToBookmark(bookmarkName, true, false);
        Paragraph para = doc.addSection().addParagraph();
        para.appendHTML("<span style=\\\"font-family:'宋体'\\\">" + htmlStr + "</span>");
        try {
            bookmarksNavigator.insertParagraph(para);
        } catch (NullPointerException e) {
            log.error("书签《" + bookmarkName + "》丢失", e);
        }
    }

    /**
     * @MethodName: fillLocalImage
     * @Description: 填充图片
     * @Date: 2020/12/28 0028 15:03
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [bytes, doc, bookmarkName]
     * @returnValue: void
     */
    private static void fillLocalImage(byte[] bytes, Document doc, String bookmarkName, float width, float height) {
        if (Objects.isNull(bytes)) {
            return;
        }
        BookmarksNavigator bookmarksNavigator = new BookmarksNavigator(doc);
        bookmarksNavigator.moveToBookmark(bookmarkName, true, false);
        Paragraph para = new Paragraph(doc);
        DocPicture picture = para.appendPicture(bytes);
        if (picture.getHeightScale() > width) {
            picture.setWidth(width);
        }
        if (picture.getHeightScale() > height) {
            picture.setHeight(height);
        }
//        picture.setDistanceLeft(50f);
        try {
            bookmarksNavigator.insertParagraph(para);
        } catch (NullPointerException e) {
            log.error("书签《" + bookmarkName + "》丢失", e);
        }
    }

    /**
     * @MethodName: loadLocalImgToByteArray
     * @Description: 加载本地图片
     * @Date: 2020/12/28 0028 15:03
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [picturePath]
     * @returnValue: byte[]
     */
    private static byte[] loadLocalImgToByteArray(String picturePath) {
        InputStream dataInputStream = null;
        ByteArrayOutputStream output = null;
        byte[] result = new byte[0];
        try {
            dataInputStream = new FileInputStream(picturePath);
            output = new ByteArrayOutputStream();
            byte[] buffer = new byte[1024];
            int length;
            while ((length = dataInputStream.read(buffer)) > 0) {
                output.write(buffer, 0, length);
            }
            result = output.toByteArray();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                //这种写法，保证了即使遇到异常情况，也会关闭流对象。
                if (dataInputStream != null) {
                    dataInputStream.close();
                }
                if (output != null) {
                    output.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        File file = new File(picturePath);
        if (file.exists()) {
            file.delete();
        }
        return result;
    }

    /**
     * @MethodName: fillDateStr
     * @Description: 填充日期字符串
     * @Date: 2021/1/5 0005 16:39
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [doc, bookmarkName, time]
     * @returnValue: void
     */
    public static void fillDateStr(Document doc, String bookmarkName, String time) {
        if (StringKit.isEmpty(time)) {
            return;
        }
        String chineseDate;
        try {
            chineseDate = DateUtil.formatChineseDate(DateUtil.parse(time).toJdkDate(), false);
        } catch (Exception e) {
            chineseDate = DateUtil.formatChineseDate(DATE_FORMAT_THREAD_LOCAL.get().parse(time, new ParsePosition(0)), false);
        }
        fillOnlyText(doc, bookmarkName, chineseDate);
    }

    /**
     * @MethodName: mergeAddSectionTable
     * @Description: 直接添加section方式合并
     * @Date: 2021/1/6 0006 13:54
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [autoFit, documents]
     * @returnValue: com.spire.doc.Document
     */
    public static Document mergeAddSectionTable(AutoFitBehaviorType autoFit, Document... documents) {
        // 创建结果文档
        Document result = new Document();
        // 遍历，添加
        for (int i = 0; i < documents.length; i++) {
            // 结果文档添加section
            Section section = Optional.ofNullable(result.getLastSection()).orElse(result.addSection());
            // 设置不换页
            section.setBreakCode(SectionBreakType.No_Break);
            // 结果文档添加表格
            Table table = section.addTable(true);
            // 获取文档中的sections
            SectionCollection sections = documents[i].getSections();
            // 获取第一个section，没有就新增一个
            Section section1 = sections.getCount() == 0 ? documents[i].addSection() : sections.get(0);
            // 获取文档中的所有表格
            TableCollection tables = section1.getTables();
            // 获取第一个表格中的列，没有表格就新增一个
            RowCollection rows = (tables.getCount() == 0 ? section1.addTable() : tables.get(0)).getRows();
            for (int j = 0; j < rows.getCount(); j++) {
                TableRow row = rows.get(j).deepClone();
                // 内容显示到一页
                onePageShow(row);
                // 遍历添加到需要添加的表格下方
                table.getRows().add(row);
            }
            if (Objects.nonNull(autoFit)) {
                // 列宽
                table.autoFit(autoFit);
            }
        }
        return result;
    }

    /**
     * @MethodName: printTable
     * @Description: 打印表结构进行分析
     * @Date: 2021/1/7 0007 14:55
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [document]
     * @returnValue: void
     */
    public static void printTable(Document document) {
        SectionCollection sections = document.getSections();
        for (int i = 0; i < sections.getCount(); i++) {
            System.out.print("section：" + i + " ");
            TableCollection tables = sections.get(i).getTables();
            for (int j = 0; j < tables.getCount(); j++) {
                System.out.print("table：" + j + " ");
                RowCollection rows = tables.get(j).getRows();
                for (int k = 0; k < rows.getCount(); k++) {
                    System.out.print("row：" + k + " ");
                    CellCollection cells = rows.get(k).getCells();
                    for (int l = 0; l < cells.getCount(); l++) {
                        System.out.print("cell：" + l + " ");
                        TableCell tableCell = cells.get(l);
                        ParagraphCollection paras = tableCell.getParagraphs();
                        for (int m = 0; m < paras.getCount(); m++) {
                            System.out.print("para：" + m + " ");
                            System.out.print(paras.get(m).getText() + " ");
                        }
                        System.out.print("\t");
                    }
                    System.out.println();
                }
            }
        }
    }

    /**
     * @MethodName: fillHalfDownText
     * @Description: 加一行空行填充
     * @Date: 2021/1/7 0007 15:07
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [needDown, checked, doc, bookmarkName, text]
     * @returnValue: void
     */
    public static void fillHalfDownText(boolean needDown, Document doc, String bookmarkName, String content) {
        if (StringKit.isBlank(content)) {
            return;
        }
        // 定位书签
        BookmarksNavigator bookmarkNavigator = new BookmarksNavigator(doc);
        bookmarkNavigator.moveToBookmark(bookmarkName);
        // 创建段落
        Paragraph para = new Paragraph(doc);
        // 创建文本内容
        TextRange textRange = para.appendText(needDown ? ("\n" + content) : StringUtils.replaceHtml(content));
        // 设置格式
        CharacterFormat format = textRange.getCharacterFormat();
        format.setFontName("Segoe UI Symbol");
        format.setFontSize(9);
        // 创建文本域
        TextBodyPart bodyPart = new TextBodyPart(doc);
        // 添加段落到文本域
        bodyPart.getBodyItems().add(para);
        // 替换书签内容
        try {
            bookmarkNavigator.replaceBookmarkContent(bodyPart);
        } catch (NullPointerException e) {
            log.error("书签《" + bookmarkName + "》丢失", e);
        }
    }

    /**
     * @MethodName: onePageShow
     * @Description: 设置表格内容在同一页显示
     * @Date: 2021/1/8 0008 10:08
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [doc]
     * @returnValue: void
     */
    public static void onePageShow(Document document) {
        SectionCollection sections = document.getSections();
        for (int i = 0; i < sections.getCount(); i++) {
            TableCollection tables = sections.get(i).getTables();
            for (int j = 0; j < tables.getCount(); j++) {
                Table table = tables.get(j);
                table.getTableFormat().isBreakAcrossPages(true);
                RowCollection rows = table.getRows();
                for (int k = 0; k < rows.getCount(); k++) {
                    TableRow row = rows.get(k);
                    onePageShow(row);
                }
            }
        }
    }

    /**
     * @MethodName: everyPageSNNumber
     * @Description: 每页加sn
     * @Date: 2021/1/8 0008 11:16
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [doc, snNumber]
     * @returnValue: void
     */
    public static void everyPageSNNumber(Document doc, String snNumber) {
        // 获取页首
        HeaderFooter header = doc.getSections().get(0).getHeadersFooters().getHeader();
        Paragraph paragraph = header.addParagraph();
        paragraph.appendText("    SN:" + Optional.ofNullable(snNumber).orElseGet(String::new));
        //将段落居中
        paragraph.getFormat().setHorizontalAlignment(HorizontalAlignment.Left);
    }
}

```

