---
title: java标签
date: 2022-09-14 10:53:04
tags: java
---

> 重要的不是知识的数量，而是知识的质量。有些人知道的很多很多，但却不知道最有用的东西——列夫·托尔斯泰

多层`for`循环中如果想要跳出循环，可以使用标签：

```java
        List<Integer> list = asList(0, 1, 2);
        Assertions.assertNotNull(list);

        outerOfList:
        for (Integer integer : list) {
            for (Integer i : list) {
                System.out.println(i);
                // 直接跳出最外层循环
                break outerOfList;
            }
            // 不会执行
            System.out.println(integer);
        }
```

执行结果

![image-20220914110552678](/imgs/oss/blog/image-20220914110552678.png)

