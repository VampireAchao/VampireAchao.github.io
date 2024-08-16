---
title: java函数防抖
date: 2020-09-25 19:40:53
tags: java
---

> 从工作里爱了生命，就是通彻了生命最深的秘密。——纪伯伦

前段时间写了`js`防抖，今天朋友(无中生友)找我要`java`版的

来！

```java
package com.ruben.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;

import java.util.Timer;
import java.util.TimerTask;

@Aspect
public class HandShakeAop {

    boolean antiShakeFlag = false;

    @Pointcut("execution(* com.ruben...*.onClick(..))||execution(* android.view..*.OnClickListener.onClick(..))")
    public void onClickPointcut() {
    }

    @Around("onClickPointcut()")
    public Object around(ProceedingJoinPoint joinPoint) {
        if (antiShakeFlag) {
            return null;
        }
        try {
            Object proceed = joinPoint.proceed();
            antiShakeFlag = true;
            new Timer().schedule(new TimerTask() {
                public void run() {
                    antiShakeFlag = false;
                }
            }, 5000);
            return proceed;
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        }
        return null;
    }
}
```

这是写在`AOP`里的实战，如果要精简版，就是这样

```java
package com.ruben;

import java.util.Timer;
import java.util.TimerTask;

/**
 * @ClassName: HandShakeDemo
 * @Date: 2020/9/25 19:49
 * @Description:
 */
public class HandShakeDemo {


    public static void main(String[] args) {

        for (int i = 1; i <= 10; i++) {
            System.out.println("循环第" + i + "次");
            ruben();
        }
    }

    /**
     * 标志位需要定义在函数外边
     */
    public static boolean antiShakeFlag = false;

    /**
     * 执行的函数
     */
    public static void ruben() {
        if (antiShakeFlag) {
            return;
        }
        try {
            // 执行逻辑
            System.out.println("ruben执行了");
            // 逻辑执行完毕后置为空
            antiShakeFlag = true;
            new Timer().schedule(new TimerTask() {
                public void run() {
                    antiShakeFlag = false;
                }
            }, 5000);
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        }
    }
}
```

输出结果可以看到，循环正常执行，但我们的关键逻辑代码只执行了一次

![image-20200925195811721](/imgs/oss/picGo/image-20200925195811721.png)

无论执行多少次，在`schedule()`第二个参数设置的时间(毫秒值)内都只会执行一次