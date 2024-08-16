---
title: 使用@Select注解写<foreach>
date: 2020-11-03 20:07:16
tags: java
---

> 智慧是宝石，如果用谦虚镶边，就会更加灿烂夺目。——高尔基

只需要加`<sceipt>`标签就可以了

```java
@Select({"<script>" +
            "select * from user where id in " +
            "<foreach item = 'id' index = 'index' collection = 'list' open='(' separator=',' close=')'>" +
            "#{id}" +
            "</foreach>" +
            "</script>"})
List<User> selectUserByIds(List<Integer> ids);
```

