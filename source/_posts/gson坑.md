---
title: gson坑
date: 2021-02-24 20:52:31
tags: java
---

> 一直只做自己会做的，就什么也做不成。最重要的是，你自己有没有兴趣——《碧蓝之海》

前两天使用`Gson`中遇到一个坑

同事使用

```java
Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
```

创建`gson`对象

所以到我这，出现了字段不序列化，或者反序列化不了的问题

例如下面这个类

```java
    @Data
    public static class User implements Serializable {
        private static final long serialVersionUID = 509877226276918727L;
        @Expose
        private String firstName;
        @Expose(serialize = false)
        private String lastName;
        @Expose(serialize = false, deserialize = false)
        private String emailAddress;
        private String password;
    }
```

使用以下代码进行序列化

```java
        Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        User user = new User();
        user.setFirstName("Supa");
        user.setLastName("Hino");
        user.setEmailAddress("achao1441470436@gmail.com");
        user.setPassword("39a8456c26584ba987d4a9f1f8f75fc1");
        String userJson = gson.toJson(user);
        System.out.println(userJson);
```

输出结果为

```shell
{"firstName":"Supa"}
```

可以看到只有`firstName`被序列化了

这是因为我们只有`firstName`上加了`@Expose`并且`serialize`值为`true`

如果没有这个注解或者`serialize`为`false`时，它就不会被序列化

但注意还有个属性`deserialize`，当它为`false`时，反序列化`json`到对象时，会过滤该属性

例如我使用这段`json`去反序列化

```json
{
    "firstName": "Supa",
    "lastName": "Hino",
    "emailAddress": "achao1441470436@gmail.com",
    "password": "39a8456c26584ba987d4a9f1f8f75fc1"
}
```

```java
        String myJson = "{\"firstName\":\"Supa\",\"lastName\":\"Hino\",\"emailAddress\":\"achao1441470436@gmail.com\",\"password\":\"39a8456c26584ba987d4a9f1f8f75fc1\"}";
        User myUser = gson.fromJson(myJson, User.class);
        System.out.println(myUser);
```

输出结果

```shell
User(firstName=Supa, lastName=Hino, emailAddress=null, password=null)
```

所以在使用`Gson`的时候，一定要注意`Gson`对象是如何创建的