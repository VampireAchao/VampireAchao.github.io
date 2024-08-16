---
title: lombok注解
date: 2021-10-31 14:56:58
tags: java
---

> 秣秩斯干，幽幽南山。如竹苞矣，如松茂矣。——《诗经》

首先是[官方文档](https://projectlombok.org/features/all)，列举了所有注解

常用的我就不聊了，这里上代码聊聊不咋常用的

首先是`@Cleanup`注解，能够自动关闭流

```java
    public static String readFile(File file) throws Exception {
        StringBuilder builder = new StringBuilder();
        @Cleanup InputStream is = new FileInputStream(file);
        String line;
        @Cleanup BufferedReader reader = new BufferedReader(new InputStreamReader(is));
        line = reader.readLine();
        while (line != null) {
            builder.append(line);
            builder.append("\n");
            line = reader.readLine();
        }
        return builder.toString();
    }
```

最后生成的代码：

![image-20211031150154435](/imgs/oss/picGo/image-20211031150154435.png)

然后是`@NonNull`注解，加到我们的参数上

![image-20211031152056995](/imgs/oss/picGo/image-20211031152056995.png)

就会自动生成如下代码：

![image-20211031152114451](/imgs/oss/picGo/image-20211031152114451.png)

如果`@NonNull`加在属性上，也会在之后生成的`setter`判空

接下来是`@RequiredArgsConstructor`注解，它可以生成一个静态构造函数，效果如下：

![image-20211031155119767](/imgs/oss/picGo/image-20211031155119767.png)

`@Value`注解和`@RequiredArgsConstructor`注解差不多

![image-20211031162434158](/imgs/oss/picGo/image-20211031162434158.png)

生成效果如下：

![image-20211031162420815](/imgs/oss/picGo/image-20211031162420815.png)

对于`@Singular`注解，它可以和`@Builder`建造者模式配合使用，针对`List`等集合类型的属性生成对应的操作函数

![image-20211031155941783](/imgs/oss/picGo/image-20211031155941783.png)

效果如下：

![image-20211031160131489](/imgs/oss/picGo/image-20211031160131489.png)

下面是`@SneakyThrows`，简单来讲就是再加一个`try-catch`，避免编译时异常导致编译失败

![image-20211031160322667](/imgs/oss/picGo/image-20211031160322667.png)

生成的代码：

![image-20211031160542913](/imgs/oss/picGo/image-20211031160542913.png)

以及`@Synchronized`注解

![image-20211031160755210](/imgs/oss/picGo/image-20211031160755210.png)

![image-20211031160740481](/imgs/oss/picGo/image-20211031160740481.png)

以及`var`

![image-20211031161427843](/imgs/oss/picGo/image-20211031161427843.png)

生成：

![image-20211031161441024](/imgs/oss/picGo/image-20211031161441024.png)

然后是`val`

![image-20211031161819523](/imgs/oss/picGo/image-20211031161819523.png)

生成：

![image-20211031161859829](/imgs/oss/picGo/image-20211031161859829.png)

`@With`注解的话放在属性上面：

![image-20211031162122731](/imgs/oss/picGo/image-20211031162122731.png)

可以生成以下代码：

![image-20211031162139878](/imgs/oss/picGo/image-20211031162139878.png)

还有一个能获取到泛型内的类型，生成能直接调用该类型中对应方法的函数

![image-20211031163206886](/imgs/oss/picGo/image-20211031163206886.png)

生成下面这部分：

![image-20211031163257243](/imgs/oss/picGo/image-20211031163257243.png)

剩下的`experimental`包里的注解我们下次再叙吧
