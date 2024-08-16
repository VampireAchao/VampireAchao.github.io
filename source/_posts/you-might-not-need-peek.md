---
title: you might not need peek
date: 2022-03-25 19:42:13
tags: java
---

> 正因为世界本身是平庸的，所以你也才平庸。——《寻羊冒险记》

上代码

```java
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;


class Scratch {

    public static void main(String[] args) {
        class User {

            private String name;

            public String getName() {
                return name;
            }

            public void setName(String name) {
                this.name = name;
            }

            @Override
            public String toString() {
                return "User{" +
                        "name='" + name + '\'' +
                        '}';
            }
        }
        Map<Integer, List<User>> userMap = new HashMap<>();
        userMap.put(1, Stream.generate(User::new).limit(3).collect(Collectors.toList()));

        // 我以前的写法
        userMap.put(1, userMap.get(1).stream().peek(u -> u.setName("吉良吉影")).collect(Collectors.toList()));

        // 我今天发现实际上这么写就可以了
        userMap.get(1).forEach(u -> u.setName("吉良吉影"));

        userMap.get(1).forEach(System.out::println);

    }

}
```

这是因为`forEach`中进行操作会改变原集合对象