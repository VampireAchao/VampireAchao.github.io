---
title: 常量or枚举的取舍
date: 2021-05-14 14:00:54
tags: java
---

> 经营企业，是许多环节的共同运作，差一个念头，就决定整个成败。——松下幸之助

今天有小伙伴问我枚举和常量的区别

首先我们看常量，从[`Hutool`](https://www.hutool.cn/)下有个`HttpStatus`常量

```java
cn.hutool.http.HttpStatus
```

![image-20210514141507884](/imgs/oss/picGo/image-20210514141507884.png)

我们可以看到这里的常量，就只是单一的值

我们使用的时候可以如下

```java
    public static void main(String[] args) {
        System.out.println(HttpStatus.HTTP_OK);
    }
```

得到结果

![image-20210514141649382](/imgs/oss/picGo/image-20210514141649382.png)

然后我们再换到枚举

在`spring`下面有个同名枚举

```java
org.springframework.http.HttpStatus
```

![image-20210514141748614](/imgs/oss/picGo/image-20210514141748614.png)

我们这里像刚才那样使用

```java
    public static void main(String[] args) {
        System.out.println(cn.hutool.http.HttpStatus.HTTP_OK);
        System.out.println(org.springframework.http.HttpStatus.OK);
    }
```

![image-20210514141917529](/imgs/oss/picGo/image-20210514141917529.png)

可以看到除了之前的状态码`200`还拿到了一个`reasonPhrase`值为`OK`

说明

> 常量只是单一的不可修改的值

> 枚举则是包含了很多常量的集合

枚举中一个常量可以包含很多信息

例如这里`org.springframework.http.HttpStatus.OK`包含的至少有

1.枚举的名字，可以使用`java.lang.Enum#name`获取到

```java
        System.out.println(org.springframework.http.HttpStatus.OK.name());
```

打印出来则为`OK`

2.枚举常量定义的下标，可以使用`java.lang.Enum#ordinal`获取到

```java
        System.out.println(org.springframework.http.HttpStatus.OK.ordinal());
```

打印出来则为`4`

3.枚举的构造方法里定义的值，例如这里`org.springframework.http.HttpStatus#HttpStatus`中有两个值

![image-20210514142610519](/imgs/oss/picGo/image-20210514142610519.png)

我们如果定义了`getter`或者取出值的方法

![image-20210514142807750](/imgs/oss/picGo/image-20210514142807750.png)

就可以取出对应的值

```java
        System.out.println(org.springframework.http.HttpStatus.OK.value());
        System.out.println(org.springframework.http.HttpStatus.OK.getReasonPhrase());
```

![image-20210514142857759](/imgs/oss/picGo/image-20210514142857759.png)

4.你甚至可以通过其中一个枚举常量获取其他全部的枚举常量，用的是[`Class`下的`getEnumConstants`](https://VampireAchao.github.io/2021/05/13/Class%E4%B8%8B%E7%9A%84getEnumConstants/)

```java
        org.springframework.http.HttpStatus[] constants = org.springframework.http.HttpStatus.OK.getClass().getEnumConstants();
        Arrays.stream(constants).forEach(System.out::println);
```

![image-20210514143217711](/imgs/oss/picGo/image-20210514143217711.png)

而常量，在不使用反射的情况下，只能获取一个值，例如这里的`200`。。。

在实际开发中，针对不同的业务需求使用常量或者枚举

例如只需要使用一个值，例如这里的`200`

你就可以定义一个常量使用

但如果你需要做别的操作

比如判断是否为`200`，如果不是`200`，你返回一个状态不是`ok`，这个`ok`是枚举内的`reasonPhrase`

```java
        int code = 201;
        HttpStatus ok = HttpStatus.OK;
        if (code != ok.value()) {
            System.out.println("Http status is not " + ok.getReasonPhrase() + "!");
        }
```

![image-20210514143925625](/imgs/oss/picGo/image-20210514143925625.png)

这里`ok`参数我们随时可以换成别的，例如

```java
        int code = 201;
        HttpStatus ok = HttpStatus.BAD_REQUEST;
        if (code != ok.value()) {
            System.out.println("Http status is not " + ok.getReasonPhrase() + "!");
        }
```

![image-20210514143910802](/imgs/oss/picGo/image-20210514143910802.png)

现在，你总该对常量和枚举的取舍有个认识了吧

