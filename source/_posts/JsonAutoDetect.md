---
title: '@JsonAutoDetect'
date: 2021-04-09 23:12:15
tags: java
---

> 背叛就是脱离自己的位置，背叛，就是摆脱原位，投向未知。——米兰·昆德拉

我们在使用`jackson`时可能会用到这样一个注解

```java
@JsonAutoDetect
```

例如我们这里一个`Student`类

```java
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @JsonAutoDetect(getterVisibility = JsonAutoDetect.Visibility.NONE,
            isGetterVisibility = JsonAutoDetect.Visibility.PUBLIC_ONLY,
            setterVisibility = JsonAutoDetect.Visibility.PUBLIC_ONLY,
            creatorVisibility = JsonAutoDetect.Visibility.NON_PRIVATE,
            fieldVisibility = JsonAutoDetect.Visibility.PUBLIC_ONLY)
    private static class Student implements Serializable {
        private static final long serialVersionUID = -3289647584974663707L;
        public String name;
        private Integer age;
        private String job;
        private GenderEnum gender;
        private Date birthday;
        private String json;
    }
```

这里我们`name`为`public`

我们指定了`getterVisibility`为`JsonAutoDetect.Visibility.NONE`

然后指定了`fieldVisibility`为`JsonAutoDetect.Visibility.PUBLIC_ONLY`

我们序列化一下

```java
        Instant from = LocalDateTime.parse("2021-01-09 00:00:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss", Locale.ENGLISH)).toInstant(ZoneOffset.MAX);
        Student supa = Student.builder().name("supa").age(20).gender(GenderEnum.MALE).birthday(Date.from(from)).build();
        System.out.println(new ObjectMapper().writeValueAsString(supa));
```

结果就只有一个`name`了

![image-20210412232536824](/imgs/oss/picGo/image-20210412232536824.png)

这里见名思意`creatorVisibility`就是构造器可见度`setterVisibility`就是`setter`可见度等

一般用于控制属性序列化可见度