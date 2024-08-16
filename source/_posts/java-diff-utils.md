---
title: java-diff-utils
date: 2023-08-14 20:11:31
tags: java
---

> 谁终将声震人间，必长久深自缄默；谁终将点燃闪电，必长久如云漂泊。——尼采

https://github.com/java-diff-utils/java-diff-utils

Diff Utils库是一个开源库，用于在文本或某种数据之间执行比较/差异操作：计算差异，应用补丁，生成统一差异或解析它们，生成差异输出以便将来显示（如并排视图）等。

例如：

```java
//create a configured DiffRowGenerator
DiffRowGenerator generator = DiffRowGenerator.create()
                .showInlineDiffs(true)
                .mergeOriginalRevised(true)
                .inlineDiffByWord(true)
                .oldTag(f -> "~")      //introduce markdown style for strikethrough
                .newTag(f -> "**")     //introduce markdown style for bold
                .build();

//compute the differences for two test texts.
List<DiffRow> rows = generator.generateDiffRows(
                Arrays.asList("This is a test senctence."),
                Arrays.asList("This is a test for diffutils."));
        
System.out.println(rows.get(0).getOldLine());
```

会得到：This is a test ~~senctence~~**for diffutils**.

还可以使用并排视图：

```java
DiffRowGenerator generator = DiffRowGenerator.create()
                .showInlineDiffs(true)
                .inlineDiffByWord(true)
                .oldTag(f -> "~")
                .newTag(f -> "**")
                .build();
List<DiffRow> rows = generator.generateDiffRows(
                Arrays.asList("This is a test senctence.", "This is the second line.", "And here is the finish."),
                Arrays.asList("This is a test for diffutils.", "This is the second line."));
        
System.out.println("|original|new|");
System.out.println("|--------|---|");
for (DiffRow row : rows) {
    System.out.println("|" + row.getOldLine() + "|" + row.getNewLine() + "|");
}
```

| original                    | new                               |
| --------------------------- | --------------------------------- |
| This is a test ~senctence~. | This is a test **for diffutils**. |
| This is the second line.    | This is the second line.          |
| ~And here is the finish.~   |                                   |

引入：

```xml

```
