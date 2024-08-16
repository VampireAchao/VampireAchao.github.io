---
title: java泛型指定继承和实现
date: 2022-04-30 17:04:29
tags: java
---

> 得到了再失去，总是比从来没有得到更伤人。——《追风筝的人》

我们使用泛型的时候，可以如下限定类型：

```java
    public static class Obj<T extends Obj<T>> {

    }
```

那么我们`Obj`中的泛型就只能指定为继承了`Obj`的类

```java
        Obj<ObjChild> obj = new Obj<>();
```

例如：

```java
    public static class ObjChild extends Obj<ObjChild> {
    }
```

我们如果想要限定，既继承了`Obj`，且实现了`Serializable`接口的类，就可以使用`&`符号这么写：

```java
    public static class Obj<T extends Obj<T> & Serializable> {

    }
```

我们相应的子类，就需要这么写才符合泛型

```java
    public static class ObjChild extends Obj<ObjChild> implements Serializable {
    }
```

此处注意我们可以继续指定多个接口，但继承的类只能指定一个且必须在首位

```java
    public static class Obj<T extends Obj<T> & Serializable & Cloneable> {

    }
	
    public static class Obj<T extends Serializable & Cloneable> {

    }

```

