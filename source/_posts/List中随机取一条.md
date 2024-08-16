---
title: List中随机取一条
date: 2021-05-08 09:01:02
tags: java
---

> 放纵自己的欲望是的祸害；谈论别人的隐私是的罪恶；不知自己过失是的病痛——亚里士多德

如下

```java
    public static void main(String[] args) {
        List<Integer> list = Stream.iterate(0, i -> ++i).limit(10).collect(Collectors.toList());
        System.out.println(getAny(list));
    }

    /**
     * 随机获取一条
     *
     * @param list 集合
     * @return T 数据
     * @author <achao1441470436@gmail.com>
     * @date 2021/5/8 0008 9:07
     */
    public static <T> T getAny(List<T> list) {
        if (Objects.isNull(list) || list.isEmpty()) {
            return null;
        }
        return list.get(new SecureRandom().nextInt(list.size()));
    }
```

非常简单~