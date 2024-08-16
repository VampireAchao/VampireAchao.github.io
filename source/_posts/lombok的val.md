---
title: lombok的val
date: 2023-02-21 22:32:05
tags: java
---

> 满足是发明创造的窒息物——佚名

`kt`中的`val`让我用的爱不释手，不用重复定义一个又一个类型，编译器会自动推导

今天遇到一个情况，我们知道把`java`代码粘贴到`kt`文件里，`idea`会自动转换`java`为`kt`

但反过来将`kt`代码粘贴到`java`文件里则不会，原来的`val`，现在还是`val`

这时候可以使用`lombok`的`val`：https://projectlombok.org/features/val

![image-20230221223643728](/imgs/oss/blog/vampireachao/image-20230221223643728.png)

例如下面的代码会被编译为合适的类型：

```java

import java.util.ArrayList;
import java.util.HashMap;
import lombok.val;

public class ValExample {
  public String example() {
    val example = new ArrayList<String>();
    example.add("Hello, World!");
    val foo = example.get(0);
    return foo.toLowerCase();
  }
  
  public void example2() {
    val map = new HashMap<Integer, String>();
    map.put(0, "zero");
    map.put(5, "five");
    for (val entry : map.entrySet()) {
      System.out.printf("%d: %s\n", entry.getKey(), entry.getValue());
    }
  }
}
```

会被编译成

```java

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class ValExample {
  public String example() {
    final ArrayList<String> example = new ArrayList<String>();
    example.add("Hello, World!");
    final String foo = example.get(0);
    return foo.toLowerCase();
  }
  
  public void example2() {
    final HashMap<Integer, String> map = new HashMap<Integer, String>();
    map.put(0, "zero");
    map.put(5, "five");
    for (final Map.Entry<Integer, String> entry : map.entrySet()) {
      System.out.printf("%d: %s\n", entry.getKey(), entry.getValue());
    }
  }
}
```

要注意一个细节，对于复合类型，推断的通常是父类，而不是接口，例如

`bool ? new HashSet() : new ArrayList()`会被推导为`AbstractCollection`而不是`Serializable`

