---
title: opencc4j
date: 2022-06-24 13:16:43
tags: java
---

> “不用给我爱，不用给我钱，不用给我声誉，给我真理吧。我们应该有勇气去面对真实的内心，即使前面荆棘满地，也要坚定地走下去。为了不浪费你的这一辈子。”——梭罗《瓦尔登湖》

分享一个`java`简繁转换的库`opencc4j`

https://github.com/houbb/opencc4j

`Group ArtifactId Version`

```xml
<dependency>
    <groupId>com.github.houbb</groupId>
    <artifactId>opencc4j</artifactId>
    <version>1.7.2</version>
</dependency>
```

使用起来：

> ## 繁简体转换
>
> ### 转为简体
>
> ```java
> String original = "生命不息，奮鬥不止";
> String result = ZhConverterUtil.toSimple(original);
> Assert.assertEquals("生命不息，奋斗不止", result);
> ```
>
> ### 转为繁体
>
> ```java
> String original = "生命不息，奋斗不止";
> String result = ZhConverterUtil.toTraditional(original);
> Assert.assertEquals("生命不息，奮鬥不止", result);
> ```

