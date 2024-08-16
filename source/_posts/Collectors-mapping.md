---
title: Collectors.mapping
date: 2021-12-09 19:44:53
tags: java
---

> 胜人者有力，自胜者强。——先秦《老子》

今天发现了`Collectors.mapping`的正确姿势

使用场景如下：

我想要对一个`List<User>`进行`groupBy`

```java
 		class User {

            private String name;
            private Integer age;

            public String getName() {
                return name;
            }

            public void setName(String name) {
                this.name = name;
            }

            public Integer getAge() {
                return age;
            }

            public void setAge(Integer age) {
                this.age = age;
            }

            public User(String name, Integer age) {
                this.name = name;
                this.age = age;
            }
        }

        List<User> users = Arrays.asList(new User("ruben", 18), new User("vampire", 18));
        Map<Integer, List<User>> ageUsersMap = users.stream().collect(Collectors.groupingBy(User::getAge));
```

实际上，我只需要此处`User`的`name`，我希望得到的是一个`List<age,List<name>>`这样结构的数据

这时候，`Collectors.mapping`就出现啦！

```java
		Map<Integer, List<String>> ageNamesMap = users.stream().collect(Collectors.groupingBy(User::getAge, Collectors.mapping(User::getName, Collectors.toList())));
```

这里使用了

```java
Collectors.groupingBy(Function<? super T, ? extends K> classifier, Collector<? super T, A, D> downstream)
```

第二个参数就是说你分组之后还想做一些后续处理，例如根据`age`分组后再根据`name`分组一次，或者我这里的，分组后，使用

```java
Collectors.mapping(User::getName, Collectors.toList())
```

可以在分组后再获取其中属性，或者还可以进行别的计算如分组后再根据每一组内获取最大值等