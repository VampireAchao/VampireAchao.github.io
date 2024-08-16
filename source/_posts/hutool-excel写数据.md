---
title: hutool excel写数据
date: 2022-09-11 17:44:57
tags: java
---

> 为人但知足，何处不安生——耶律楚材

依赖见：[hutool获取excel中的图片](https://VampireAchao.github.io/2022/09/08/hutool获取excel中的图片/)

代码如下：

```java
package com.ruben;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.date.DateUtil;
import cn.hutool.poi.excel.ExcelUtil;
import cn.hutool.poi.excel.ExcelWriter;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * ExcelDemo
 *
 * @author VampireAchao
 * @since 2022/9/7
 */
public class ExcelDemo {
    public static void main(String[] args) {
        // 生成excel

        Map<String, Object> row1 = new LinkedHashMap<>();
        row1.put("姓名", "张三");
        row1.put("年龄", 23);
        row1.put("成绩", 88.32);
        row1.put("是否合格", true);
        row1.put("考试日期", DateUtil.date());

        Map<String, Object> row2 = new LinkedHashMap<>();
        row2.put("姓名", "李四");
        row2.put("年龄", 33);
        row2.put("成绩", 59.50);
        row2.put("是否合格", false);
        row2.put("考试日期", DateUtil.date());

        ArrayList<Map<String, Object>> rows = CollUtil.newArrayList(row1);

        ArrayList<Map<String, Object>> rows2 = CollUtil.newArrayList(row2);

        // 通过工具类创建writer
        ExcelWriter writer = ExcelUtil.getWriter("d:/tmp/writeMapTest.xlsx");

        // 修改第一个sheet
        writer.setSheet(0).renameSheet("例子sheet1").merge(row1.size() - 1, "一班成绩单").write(rows, true);
        // 修改第二个sheet
        writer.setSheet("例子sheet2").merge(row2.size() - 1, "二班成绩单").write(rows2, true);

        // 关闭writer，释放内存
        writer.close();
    }
}
```

效果：

![image-20220911174614657](/imgs/oss/blog/image-20220911174614657.png)

![image-20220911174627756](/imgs/oss/blog/image-20220911174627756.png)
