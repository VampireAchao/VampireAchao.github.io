---
title: Comparable泛型踩坑
date: 2022-12-09 12:38:56
tags: java
---

> 善疑人者，人亦疑之；善防人者，人亦防之。——刘基

之前写的`Comparable`解决[泛型限定问题](https://VampireAchao.github.io/2022/07/13/泛型限定问题/)

遇到了这种情况：

![image-20221209133422361](/imgs/oss/picGo/image-20221209133422361.png)

这是因为`LocalDate`没有实现`Comparable<LocalDate>`

而是由其实现的接口`ChronoLocalDate`去继承的`Comparable<ChronoLocalDate>`

并且`LocalDate`去实现的`Serializable`，而不是`ChronoLocalDate`

![image-20221209133551223](/imgs/oss/picGo/image-20221209133551223.png)

我们这里直接用的`T extends Comparable<T>`，此处传了`LocalDate`就是`extends Comparable<LocalDate>`

和实现`Serializable`的不是同一层级，所以我们需要指定为`Comparable<? super T>`，这个意思就是说允许`Comparable`里的类型是它的父类或者接口，具体`super`和`extends`区别可以看[泛型的super和extends](https://VampireAchao.github.io/2022/05/04/泛型的super和extends/)

![image-20221209134017920](/imgs/oss/picGo/image-20221209134017920.png)

改成`Comparable<? super T>`后，编译通过
