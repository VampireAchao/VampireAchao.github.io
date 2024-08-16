---
title: Stream流の二维数组List<List>互转
date: 2020-11-17 20:44:18
tags: java
---

>少而好学，如日出之阳；壮而好学，如日中之光；老而好学，如炳烛之明。一一刘向

![image-20201117204608973](/imgs/oss/picGo/image-20201117204608973.png)

数组转`List<List<Integer>>`

```java
List<List<Integer>> collect = Arrays.stream(array).map(a1 -> Arrays.stream(a1).boxed().collect(Collectors.toList())).collect(Collectors.toList());
```

`List<List<Integer>>`转`int[][]`

```java
array = collect.stream().map(integers -> integers.stream().mapToInt(value -> value).toArray()).toArray(int[][]::new);
```

二维数组和`List<List<Integer>>`之间的转换使用`stream`的话就非常简单了

```java
        int[][] array = new int[][]{{1, 2}, {1, 3, 3, 4}, {2, 3}};
        List<List<Integer>> collect = Arrays.stream(array).map(a1 -> Arrays.stream(a1).boxed().collect(Collectors.toList())).collect(Collectors.toList());
        array = collect.stream().map(integers -> integers.stream().mapToInt(value -> value).toArray()).toArray(int[][]::new);

        for (int[] ints : array) {
            for (int anInt : ints) {
                System.out.print(anInt + " ");
            }
            System.out.println();
        }
```

