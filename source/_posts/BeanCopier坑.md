---
title: BeanCopier坑
date: 2021-04-20 20:40:38
tags: java
---

> 志不强者智不达。——《墨子·修身》

今天使用`org.springframework.cglib.beans.BeanCopier`时遇到一个坑

这里记录一下

`BeanCopier`用于拷贝属性，详情可以看[`mofan`的博客](https://mofan212.gitee.io/posts/Simple-Use-Of-BeanCopier/)，写的很详细了

我们这里写两个对象用于测试

```java
    @Data
    @Builder
    @EqualsAndHashCode
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Monkey {
        private String name;
        private Integer age;
    }

    @Data
    @Builder
    @EqualsAndHashCode
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Cat {
        private String name;
        private Integer age;
    }
```

我们测试一下

```java
    public static void main(String[] args) {
        BeanCopier beanCopier = BeanCopier.create(Monkey.class, Cat.class, false);
        Monkey monkey = Monkey.builder().name("ruben").age(12).build();
        Cat cat = Cat.builder().build();
        beanCopier.copy(monkey, cat, null);
        System.out.println(cat);
    }
```

可以看到输出结果，我们成功把`Monkey`对象里的值拷贝到`Cat`中去了

![image-20210420205540345](/imgs/oss/picGo/image-20210420205540345.png)

但如果我们在`Cat`加入了链式

```java
    @Data
    @Builder
    @EqualsAndHashCode
    @NoArgsConstructor
    @AllArgsConstructor
    @Accessors(chain = true)
    public static class Cat {
        private String name;
        private Integer age;
    }
```

我们再次运行

![image-20210420205608789](/imgs/oss/picGo/image-20210420205608789.png)

可以看到我们的`Monkey`对象里的值没有拷贝到`Cat`里去

所以这个坑就是

> BeanCopier拷贝属性，不支持链式编程！！！