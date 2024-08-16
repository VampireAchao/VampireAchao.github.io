---
title: java8的stream流
date: 2020-06-21 20:59:58
tags: java
---

在1.8新特性中有一个stream流

可以对集合进行很多操作，在开发里大量用到

先创建两个类，用于我们操作

```java
import java.util.ArrayList;

/**
 * @ClassName: StringList
 * @Date: 2020/6/21 0021 21:08
 * @Description: 一个继承了ArrayList<String>的类
 * @Author: <achao1441470436@gmail.com>
 */
public class StringList extends ArrayList<String> {

    public StringList put(String s) {
        super.add(s);
        //用于链式编程
        return this;
    }
}
```

```java
import java.io.Serializable;

/**
 * @ClassName: User
 * @Date: 2020/6/21 0021 21:16
 * @Description: 实体类
 * @Author: <achao1441470436@gmail.com>
 */
public class User implements Serializable {
    private String name;
    private Integer age;

    public User() {
    }

    public User(String name, Integer age) {
        this.name = name;
        this.age = age;
    }

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
}
```

然后，开干！

```java
import java.util.*;
import java.util.stream.Collectors;

/**
 * @ClassName: StreamDemo
 * @Date: 2020/6/21 0021 21:03
 * @Description:
 * @Author: <achao1441470436@gmail.com>
 */
public class StreamDemo {
    public static void main(String[] args) {
        //首先是forEach()
        StringList list = new StringList();
        list
                .put("")
                .put("张三")
                .put("李四")
                .put("王五")
                .put("赵六")
                .put("陈七")
                .put("秦八")
                .put("ruben")
                .put("ruben")
                .put("007")
                .put("");
        //以前遍历我们的forEach是这样的
        for (String item : list) {
            System.out.println(item);
        }
        //现在用新版forEach()
        list.forEach(System.out::println);

        //然后是map() 以及collect()
        //我们要更改list里元素的类型，比如原来的List<User>
        List<User> userList = new ArrayList<>();
        User user1 = new User();
        user1.setName("狂神");
        user1.setAge(23);
        userList.add(user1);
        //现在需要增加返回一个参数，判断这个人有没有被我关注
        List<Map<String, Object>> userMapList = userList.stream().map(
                //这里的user就相当于userList里每一个user
                user -> {
                    //new一个临时变量
                    Map<String, Object> tempMap = new HashMap<>(16);
                    tempMap.put("name", user.getName());
                    tempMap.put("age", user.getAge());
                    //调用方法判断是否关注这个人
                    tempMap.put("isFocus", focusStatus(user));
                    //返回
                    return tempMap;
                }).collect(Collectors.toList());
        //输出结果 -> {isFocus=true, name=狂神, age=23}
        userMapList.forEach(System.out::println);

        //然后是filter()过滤，和并行流parallelStream()以count()及搭配计算出空字符串的个数
        //parallelStream：返回一个可能的平行Stream与此集合作为其源,这是允许的这个方法返回一个连续的数据流
        //筛选出为空的字符串，获取个数
        System.out.println(list.parallelStream().filter(String::isEmpty).count());

        //limit()和sql里的limit相似，可以截取数据数量
        //只取头两条，并且筛选不为空的元素
        list.stream().limit(2).filter(string -> !string.isEmpty()).forEach(System.out::println);

        //distinct()去除重复元素 joining() 在之间添加元素
        System.out.println(list.stream().distinct().collect(Collectors.joining(" 和 ")));

        //sorted排序
        List<Integer> integerList = new ArrayList<>();
        integerList.add(2);
        integerList.add(1);
        integerList.stream().sorted().forEach(System.out::println);

        //统计
        //Random 随机数对象,用于生成伪随机数流
        Random random = new Random();
        //IntSummaryStatistics 用于收集统计数据，例如计数，最小值，最大值，总和，和平均阿状态对象
        IntSummaryStatistics intSummaryStatistics = random.ints().limit(10).summaryStatistics();
        System.out.println("平均数" + intSummaryStatistics.getAverage());
        System.out.println("最大数" + intSummaryStatistics.getMax());
        System.out.println("最小数" + intSummaryStatistics.getMin());
        System.out.println("求和" + intSummaryStatistics.getSum());
        System.out.println("数量" + intSummaryStatistics.getCount());

    }

    /**
     * 判断是否被关注
     *
     * @return
     */
    static Boolean focusStatus(User user) {
        user = Optional.ofNullable(user).orElse(new User("普通用户", 18));
        System.out.println("我关注了" + user.getName());
        return true;
    }
}
```

