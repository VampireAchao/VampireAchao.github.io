---
title: lombok的ExtensionMethod
date: 2024-05-28 19:54:12
tags: java
---

> 短暂的分离可振奋情意，但长久的离别可毁灭情爱。——米拉波

[@ExtensionMethod](https://projectlombok.org/features/experimental/ExtensionMethod)

今天玩了玩，还挺不错：

例如

```java

import lombok.experimental.ExtensionMethod;

@ExtensionMethod({java.util.Arrays.class, Extensions.class})
public class ExtensionMethodExample {
  public String test() {
    int[] intArray = {5, 3, 8, 2};
    intArray.sort();
    
    String iAmNull = null;
    return iAmNull.or("hELlO, WORlD!".toTitleCase());
  }
}

class Extensions {
  public static <T> T or(T obj, T ifNull) {
    return obj != null ? obj : ifNull;
  }
  
  public static String toTitleCase(String in) {
    if (in.isEmpty()) return in;
    return "" + Character.toTitleCase(in.charAt(0)) +
        in.substring(1).toLowerCase();
  }
}
```

就等实现下面的效果

```java

public class ExtensionMethodExample {
  public String test() {
    int[] intArray = {5, 3, 8, 2};
    java.util.Arrays.sort(intArray);
    
    String iAmNull = null;
    return Extensions.or(iAmNull, Extensions.toTitleCase("hELlO, WORlD!"));
  }
}

class Extensions {
  public static <T> T or(T obj, T ifNull) {
    return obj != null ? obj : ifNull;
  }
  
  public static String toTitleCase(String in) {
    if (in.isEmpty()) return in;
    return "" + Character.toTitleCase(in.charAt(0)) +
        in.substring(1).toLowerCase();
  }
}
```

主要是`iAmNull.or("hELlO, WORlD!".toTitleCase())`直接调用了静态函数
