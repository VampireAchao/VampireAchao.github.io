---
title: 新版jdk的peek坑
date: 2023-03-12 20:13:52
tags: java
---

> 旅游是获得愉悦感和浪漫性的最好媒介——麦金托什

代码如下：

```java
import java.util.Arrays;
import java.util.List;

class Scratch {
    public static void main(String[] args) {
        List<Integer> list = Arrays.asList(1, 2, 3, 4);
        long count = list.stream().peek(System.out::println).count();
        System.out.println(count);
    }
}
```

这段代码在`java8`中则会如下输出

![image-20230312201924513](/imgs/oss/blog/vampireachao/image-20230312201924513.png)

但在`java11`的时候却只会输出最终的一次`count`，这说明`count`并不会导致`peek`执行

![image-20230312201724470](/imgs/oss/blog/vampireachao/image-20230312201724470.png)

`javadoc`也写了

![image-20230312201852318](/imgs/oss/blog/vampireachao/image-20230312201852318.png)

所以升级`jdk`版本的话需要注意这一点