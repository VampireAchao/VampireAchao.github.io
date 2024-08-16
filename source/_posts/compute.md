---
title: compute
date: 2021-10-01 23:03:05
tags: java
---

> 破产是一种暂时的困境，贫困是一种思想的状态。——比尔·盖茨

今天在`Map`中看到了这样一个函数：`compute`

于是做了点测验

```java
        Map<String, String> map = MapUtil.newHashMap();
        map.put("123", "456");
        map.put("789", "123");
        System.out.println("如果存在就执行,并将结果作为value放入map");
        map.computeIfPresent("1234", (k, v) -> v + "1 ");
        // {123=456, 789=123} 说明未找到指定的key时无更改
        System.out.println(map);
        map.computeIfPresent("123", (k, v) -> v + "2 ");
        // {123=4562 , 789=123} 说明如果找到了对应的key，将value更改为后面的结果
        System.out.println(map);
        map.computeIfPresent("123", (k, v) -> null);
        // {789=123} 说明如果找到对应的key，并且后方传入Function内部apply返回值为null，则移除对应的key
        System.out.println(map);
        map.computeIfPresent("1234", (k, v) -> null);
        // {789=123} 说明如果未找到对应的key，并且后方传入Function内部apply返回值为null，不会更改map
        System.out.println(map);
        System.out.println("如果缺省就执行,将key作为后方Function的参数,将结果作为value放入map");
        map.computeIfAbsent("789", v -> v + "3 ");
        // {789=123} 和上方一样，如果key存在，则无变化
        System.out.println(map);
        map.computeIfAbsent("123", k -> k + "4 ");
        // {123=1234 , 789=123} 说明如果key不存在，则将key作为参数，执行后方逻辑返回值再作为value，放入map
        System.out.println(map);
        map.computeIfAbsent("1234", k -> null);
        // {123=1234 , 789=123} 和上方一样，说明即便key不存在，后方函数返回值为null，不会更改map
        System.out.println(map);
        map.computeIfAbsent("123", k -> null);
        // {123=1234 , 789=123} 和上方一样，说明即便key存在，后方函数返回值为null，不会更改map
        System.out.println(map);
        System.out.println("执行后方逻辑，并将结果作为value放入map");
        map.compute("123", (k, v) -> v + "5 ");
        // {123=1234 5 , 789=123} 说明如果key存在，执行后方逻辑返回值作为value，放入map
        System.out.println(map);
        map.compute("1234", (k, v) -> v + "6 ");
        // {123=1234 5 , 1234=null6 , 789=123} 说明如果key不存在，执行后方逻辑返回值作为value，放入map，注意此处lambda内部的value为null
        System.out.println(map);
        map.compute("123", (k, v) -> null);
        // {1234=null6 , 789=123} 说明如果key存在，后方函数返回值为null，则会移除对应的key
        System.out.println(map);
        map.compute("12345", (k, v) -> null);
        // {1234=null6 , 789=123} 说明如果key不存在，后方函数返回值为null时，不会更改map
        System.out.println(map);
```

现在基本理解了`compute`、`computeIfPresent`、`computeIfAbsent`的使用了：

> 以下方法放入`map`时的`key`均为方法第一个参数

`compute`：

|            返回值状态            |                     未找到指定的`key`时                      |            找到指定的`key`时             |
| :------------------------------: | :----------------------------------------------------------: | :--------------------------------------: |
| 后方传入`lambda`返回值不为`null` | 执行后方逻辑返回值作为`value`，放入`map`，注意此处`lambda`内部参数的`value`为`null` | 执行后方逻辑返回值作为`value`，放入`map` |
|  后方传入`lambda`返回值为`null`  |                        不会更改`map`                         |             移除对应的`key`              |

`computeIfPresent`：

|            返回值状态            | 未找到指定的`key`时 |            找到指定的`key`时             |
| :------------------------------: | :-----------------: | :--------------------------------------: |
| 后方传入`lambda`返回值不为`null` |    不会更改`map`    | 执行后方逻辑返回值作为`value`，放入`map` |
|  后方传入`lambda`返回值为`null`  |    不会更改`map`    |             移除对应的`key`              |

`computeIfAbsent`：

|            返回值状态            |                     未找到指定的`key`时                      | 找到指定的`key`时 |
| :------------------------------: | :----------------------------------------------------------: | :---------------: |
| 后方传入`lambda`返回值不为`null` | 则将`key`作为参数，执行后方逻辑返回值再作为`value`，放入`map` |   不会更改`map`   |
|  后方传入`lambda`返回值为`null`  |                        不会更改`map`                         |   不会更改`map`   |
