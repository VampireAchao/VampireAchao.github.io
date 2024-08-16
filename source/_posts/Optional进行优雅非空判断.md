---
title: Optional进行优雅非空判断
date: 2020-06-17 22:33:59
tags: java
---

又到了阿超说博客时间

今日给小伙伴们带来的是如何用Optional这个类

近日，国外一小哥因为不写注释和括号换行，以及用git经常覆盖掉同事的代码被揍

在这里阿超也顺便提醒一下大家：代码不规范，同事两行泪

那么进入今天的正题吧~今天带来的是1.8的这个类Optional,Optional在英文中是可选的意思，他在java中可以作为非空判断，是妥妥的炫技哦！

首先是进行字符串的长度取值

```java
    /**
     * 获取一个字符串的长度
     *
     * @param str
     * @return
     */
    Integer strLength(String str) {
        if (str == null) {
            return 0;
        }
        return str.length();
    }
```

相信有不少小伙伴看出来了，这段代码是大家经常写的，这种逻辑代码，传入的字符串为空，如果调用它的方法，会报NullPointerException

所以我们给她加了个非空判断

现在展示新写法：

```java
    /**
     * 获取一个字符串的长度plus
     *
     * @param str
     * @return
     */
    Integer strLengthPlus(String str) {
        //获取不为null的str的值，获取她的长度，如果她为空，返回0
        return Optional.ofNullable(str).map(String::length).orElse(0);
    }
```

一行代码，搞定上面的逻辑，看起来高端大气上档次（虽然jdk说Optional可具有不可预测的结果，应当避免），但这不是很帅气嘛！

接下来就是重头戏了，我们先创建一个实体类

```java
package pojo;

import java.io.Serializable;
import java.util.Optional;

/**
 * @ClassName: ProgramMonkey
 * @Description: ProgramMonkey类
 * @Date: 2020/6/17 22:07
 * *
 * @author: achao<achao1441470436 @ gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
public class ProgramMonkey /* implements Serializable */ {
    private Boolean hasHair;
    private Optional<String> name;

    public Boolean getHasHair() {
        return hasHair;
    }

    public void setHasHair(Boolean hasHair) {
        this.hasHair = hasHair;
    }

    /*public Optional<Optional<String>> getName() {
        //序列化时需要用此替换get方法，否则无法序列化
        return Optional.ofNullable(this.name);
    }*/

    public Optional<String> getName() {
        return name;
    }

    public void setName(Optional<String> name) {
        this.name = name;
    }
}
```

它有两个属性，一个是Boolean类型的hasHair，一个是Optional< String>类型的name

下面是重点！

```java
    /**
     * 对象
     */
    void nullClass(String str) {
        //创建空对象
        Optional<String> optStr = Optional.empty();
        //创建不为空的对象 为空抛出NullPointException
        Optional<String> optStrNotNull = Optional.of(str);
        //创建允许为空的对象 不确定是否存在null值
        Optional<String> optStrNull = Optional.ofNullable(str);
        ProgramMonkey programMonkey = new ProgramMonkey();
        //判断程序猿是否有头发，有程序猿就返回他的头发，哦不是返回他有没有头发的状态。。。为空就返回没头发
        Boolean hasHair = Optional.ofNullable(programMonkey).map(ProgramMonkey::getHasHair).orElse(false);
        //判断程序员是否有名字，这个name是一个Optional<String>类型
        Optional<ProgramMonkey> programMonkeyOptional = null;
        String programMonkeyName = programMonkeyOptional.map(ProgramMonkey::getName).map(Optional::get).orElse("程序猿不配拥有姓名");
        //还可以用这种方式
        String programMonkeyChildhoodName = programMonkeyOptional.flatMap(ProgramMonkey::getName).orElse("程序猿不配拥有姓名");
    }
```

好了，这就是本期阿超说博客的全部内容了，谢谢大家的收看！我们下次再见~