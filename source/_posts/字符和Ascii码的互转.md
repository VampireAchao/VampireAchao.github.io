---
title: 字符和Ascii码的互转
date: 2021-06-17 22:08:05
tags: java
---

> 对我们帮助最大的，并不是朋友们的实际帮助，而是我们坚信得到他们的帮助的信念。——伊壁鸠鲁

我们可以使用多种方式去获取一个字符的`ascii`码

```java
        System.out.println(new Character('A').hashCode());
        System.out.println(Character.hashCode('A'));
        System.out.println((int) 'A');
        System.out.println((int) new Character('A'));
```

![image-20210617221437454](/imgs/oss/picGo/image-20210617221437454.png)

也可以反过来通过`ascii`码获取对应的字符

```java
        System.out.println((char) 65);
        System.out.println(new Character((char) 65));
        System.out.println((Character) (char) 65);
        System.out.println((Character) (char) (int) new Integer(65));
```

![image-20210617221707749](/imgs/oss/picGo/image-20210617221707749.png)

其实两者就算`==`一下

```java
        System.out.println('A' == 65);
```

![image-20210617221907903](/imgs/oss/picGo/image-20210617221907903.png)
