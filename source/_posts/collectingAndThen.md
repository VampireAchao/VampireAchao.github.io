---
title: collectingAndThen
date: 2022-03-03 18:59:39
tags: java
---

> 向着清风吟唱的歌手，还会对着运转的宇宙歌吟。——纪伯伦《先知》

我们使用`Stream`收集操作收集元素时，会遇到对规则进行分组后，对每一组的数据还要进行处理的情况，这时候我们可以使用`Collectors.collectingAndThen`处理，例如我下面本来分组后得到一个`Map<String,List<String>>`，但我将分组后每一组的结果转换为了`JSON`格式的`String`

```java
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.alibaba.fastjson.JSON;


class Scratch {

    public static void main(String[] args) {
        Map<String, String> collect = Stream.<String>empty().collect(Collectors.groupingBy(String::intern, Collectors.collectingAndThen(Collectors.toList(), JSON::toJSONString)));
    }
}
```

最后得到的就是一个`Map<String,String>`