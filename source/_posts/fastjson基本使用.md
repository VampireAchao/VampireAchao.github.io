---
title: fastjson基本使用
date: 2020-08-13 19:52:44
tags: java
---

`alibaba`的`fastjson`真香啊

首先是依赖

```xml
<!-- https://mvnrepository.com/artifact/com.alibaba/fastjson -->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>1.2.73</version>
</dependency>
```

这里列举点简单的应用

首先是对象转`JSON`

```java
        Map<String, Object> map = new HashMap<>(1 << 3);
        map.put("data", "操作成功！");
        map.put("code", 200);
        map.put("success", true);
        map.put("list", Arrays.asList("你好", "加油"));
        String jsonString = JSON.toJSONString(map);
        System.out.println(jsonString);
```

输出结果

> {"code":200,"data":"操作成功！","list":["你好","加油"],"success":true}

然后是`JSON`转对象

```java
        Map jsonToMap = JSON.parseObject(jsonString, Map.class);
        System.out.println(jsonToMap.get("code"));
```

输出结果

> 200

从`JSON`中取值

```java
        JSONObject jsonObject = JSON.parseObject(jsonString);
        //String
        String data = jsonObject.getString("data");
        System.out.println(data);
        //int
        int code = jsonObject.getIntValue("code");
        System.out.println(code);
        //boolean
        boolean success = jsonObject.getBooleanValue("success");
        System.out.println(success);
        //list
        JSONArray list = jsonObject.getJSONArray("list");
        list.forEach(System.out::println);
```

输出结果

>操作成功！
>200
>true
>你好
>加油

有了`fastjson`，对于`json`处理再也不头疼了