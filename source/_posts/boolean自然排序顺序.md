---
title: boolean自然排序顺序
date: 2023-12-22 19:50:43
tags: java
---

> 聪明人警告我说，生命只是荷叶上的一颗露珠。——泰戈尔

代码如下：

```java
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

class Scratch {
    public static void main(String[] args) {
        List<Boolean> list = new ArrayList<>();
        list.add(true);
        list.add(false);
        list.sort(Comparator.naturalOrder());
        System.out.println(list);
    }
}
```

输出如下：

```bash
[false, true]
```

因此`java`中自然排序，`false`是小于`true`的

这里可以用一般`orm`的`boolean`转换为`int`来方便记忆

`false`为`0`

`true`为`1`

因此`false`小于`true`
