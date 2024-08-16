---
title: eclipse-collections
date: 2022-07-06 13:05:36
tags: java
---

> 志向和热爱是伟大行为的双翼。——歌德

之前分享了[vavr](https://VampireAchao.github.io/2022/06/28/vavr/)，今天在分享一个同类框架`eclipse-collections`

官方文档：http://www.eclipse.org/collections/

```xml
<dependency>
  <groupId>org.eclipse.collections</groupId>
  <artifactId>eclipse-collections-api</artifactId>
  <version>11.0.0</version>
</dependency>

<dependency>
  <groupId>org.eclipse.collections</groupId>
  <artifactId>eclipse-collections</artifactId>
  <version>11.0.0</version>
</dependency>
```

体验下，这是`java8 Stream`的：

> ```java
> boolean anyPeopleHaveCats =
>   this.people
>     .stream()
>     .anyMatch(person -> person.hasPet(PetType.CAT));
> 
> long countPeopleWithCats =
>   this.people
>     .stream()
>     .filter(person -> person.hasPet(PetType.CAT))
>     .count();
> 
> List<Person> peopleWithCats =
>   this.people
>     .stream()
>     .filter(person -> person.hasPet(PetType.CAT))
>     .collect(Collectors.toList());
> ```

用`eclipse-collections`：

> ```java
> boolean anyPeopleHaveCats =
>   this.people
>     .anySatisfy(person -> person.hasPet(PetType.CAT));
> 
> int countPeopleWithCats =
>   this.people
>     .count(person -> person.hasPet(PetType.CAT));
> 
> MutableList<Person> peopleWithCats =
>   this.people
>     .select(person -> person.hasPet(PetType.CAT));
> ```

简短了原本的代码
