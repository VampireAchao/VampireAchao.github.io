---
title: idea配置枚举模板
date: 2021-07-28 22:56:59
tags: 小技巧
---

> 对我们帮助最大的，并不是朋友们的实际帮助，而是我们坚信得到他们的帮助的信念——伊壁鸠鲁

我们可以配置枚举模板

这样新建枚举的时候就会带上我们的模板中包含的内容，就不用每次都去写

![image-20210728225924891](/imgs/oss/picGo/image-20210728225924891.png)

```java
#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end
#parse("File Header.java")
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * $DESCRIPTION
 *
 * @author <achao1441470436@gmail.com>
 * @since $DATE $TIME
 */
@Getter
@AllArgsConstructor
public enum ${NAME} {
    /**
     * Cheating the compiler.
     */
    #[[$END$]]#("");
    
    private final String desc; 
}
```

配置完毕后我们默认新建的枚举如下

![image-20210728230240328](/imgs/oss/picGo/image-20210728230240328.png)
