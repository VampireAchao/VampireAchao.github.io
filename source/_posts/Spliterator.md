---
title: Spliterator
date: 2021-08-01 22:58:05
tags: java
---

> 如果工作对于人类不是人生强索的代价，而是目的，人类将是多么幸福——罗丹

我们操作集合同样可以使用`Spliterator`

`Stream`子类`ReferencePipeline`的构造函数中需要传入`Spliterator`

```java
        // 生成0-99的元素
        List<Integer> list = Stream.iterate(0, i -> i < 100, i -> ++i).toList();
        // 获取集合的Spliterator
        Spliterator<Integer> spliterator = list.spliterator();
        // 通过Spliterators获取
        Spliterator<String> spliterator1 = Spliterators.spliterator(Collections.singleton("xxx"), 0);
        // 按顺序消费元素，返回值表示是否还有下一个
        boolean b = spliterator.tryAdvance(x -> System.out.println("消费第一个元素：" + x));
        System.out.println("是否还有下一个：" + b);
        spliterator.tryAdvance(x -> System.out.println("消费第二个元素：" + x));
        // trySplit为拆分元素，调用一次拆分为原来 未消费时 的一半
        Spliterator<Integer> trySplit = spliterator.trySplit();
        // 按顺序消费原来的一半，因为上面已经消费掉了，因此从3开始
        trySplit.forEachRemaining(System.out::println);
        System.out.println("剩余元素个数，如果无法计算，则返回-1：" + spliterator.getExactSizeIfKnown());
        System.out.println("剩下那一半");
        spliterator.forEachRemaining(System.out::println);
        System.out.println("剩余元素个数，此处无限流情况下返回9223372036854775807，一般使用getExactSizeIfKnown：" + spliterator.estimateSize());
        // 获取spliterator的比较器
        System.out.println("比较器：" + Stream.iterate(0, i -> ++i).sorted().spliterator().getComparator());

        // 判断是否包含某个特征，计算方式是使用本身特征与传入特征进行与运算，得到的结果与传入特征值判断characteristics
        System.out.println("是否包含Spliterator.SIZED：" + spliterator.hasCharacteristics(Spliterator.SIZED));
        // 获取spliterator的特征值
        System.out.println("spliterator的特征值" + spliterator.characteristics());
        // 将spliterator转换为Stream流
        StreamSupport.stream(spliterator, false);
        // 将spliterator转换为Stream并行流
        StreamSupport.stream(spliterator, true);
```

然后是其中包含的一些特征

```java
	// 是否有序
    public static final int ORDERED    = 0x00000010;
	// 是否去重
    public static final int DISTINCT   = 0x00000001;
	// 是否手动排序过
    public static final int SORTED     = 0x00000004;
	// 是否可数(如无限流不可数)
    public static final int SIZED      = 0x00000040;
	// 元素是否不能为空
    public static final int NONNULL    = 0x00000100;
	// 是否不能添加、替换或删除元素
    public static final int IMMUTABLE  = 0x00000400;
	// 是否线程安全
    public static final int CONCURRENT = 0x00001000;
	// 子元素是否可数
    public static final int SUBSIZED = 0x00004000;
```



