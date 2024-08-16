---
title: List<Map>聚合为单个Map<List>
date: 2022-07-05 13:13:05
tags: java
---

> 科学是到处为家的，不过，在任何不播种的地方，是决不会得到丰收的。——赫尔岑

前两天有人给我的项目`stream-query`提交了`PR`，新增了一个`Collector`实现

我稍微研究了一下，发现与`Collectors`原生命名风格不统一，且不具备`Collectors`包下面的对象通用性，于是就移除了

但这个功能是可以保留的

我的实现如下：

```java
    @Test
    void testReducing() {
        Set<Map<String, Integer>> nameScoreMapList = Stream.of(
                new HashMap<String, Integer>() {{
                    put("苏格拉底", 1);
                    put("特拉叙马霍斯", 3);
                }},
                Collections.singletonMap("苏格拉底", 2),
                Collections.singletonMap("特拉叙马霍斯", 1),
                Collections.singletonMap("特拉叙马霍斯", 2)
        ).collect(java.util.stream.Collectors.toSet());
        Collector<Map<String, Integer>, ?, Map<String, List<Integer>>> reducing = Collectors.reducing(new HashMap<>(),
                value -> {
                    Map<String, List<Integer>> result = new HashMap<>();
                    value.forEach((k, v) -> result.computeIfAbsent(k, i -> new ArrayList<>()).add(v));
                    return result;
                }, (l, r) -> {
                    r.forEach((k, v) -> l.computeIfAbsent(k, i -> new ArrayList<>()).addAll(v));
                    return l;
                }
        );
        Assertions.assertEquals(new HashMap<String, List<Integer>>() {{
            put("苏格拉底", Arrays.asList(1, 2));
            put("特拉叙马霍斯", Arrays.asList(3, 1, 2));
        }}, nameScoreMapList.stream().collect(reducing));
    }
```

`List<Map<KEY,VALUE>>`转换为`Map<KEY,List<VALUE>>`，相同的`key`值累加处理