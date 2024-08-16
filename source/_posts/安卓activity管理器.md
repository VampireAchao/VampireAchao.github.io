---
title: 安卓activity管理器
date: 2020-10-19 19:29:17
tags: android
---

> 悲剧就是把有价值的东西毁灭给人看。——鲁迅

其实原理就是一个`list`，使用`AOP`在创建时添加，销毁时移除

```java
package com.ruben.utils;

import android.app.Activity;
import android.os.Build;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @ClassName: MyActivityManager
 * @Description: 我还没有写描述
 * @Date: 2020/10/18 0018 10:16
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
public class MyActivityManager {

    public static final List<Activity> activityList = Collections.synchronizedList(new LinkedList<>());

    public static void addActivity(Activity activity) {
        activityList.add(activity);
    }

    public static void removeActivity(Activity activity) {
        activityList.remove(activity);
    }

    public static Activity getActivity() {
        if (isActivityEmpty()) {
            return null;
        }
        return activityList.get(activityList.size() - 1);
    }

    public static void killActivity() {
        killActivity(getActivity());
    }

    public static void killActivity(Activity activity) {
        if (activity == null) {
            return;
        }
        if (isActivityEmpty()) {
            return;
        }
        activity.finish();
        removeActivity(activity);
    }

    public static void killActivity(Class<?> cls) {
        Activity activity = getActivity(cls);
        if (activity == null) {
            return;
        }
        killActivity(activity);
    }


    public static Activity getActivity(Class<?> cls) {
        if (isActivityEmpty()) {
            return null;
        }
        if (cls == null) {
            return null;
        }
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.N) {
            return null;
        }
        List<Activity> activities = activityList.stream().filter(activity -> activity.getClass().equals(cls)).collect(Collectors.toList());
        if (activities.isEmpty()) {
            return null;
        }
        return activities.get(0);
    }

    public static Activity getTopActivity() {
        Activity activity = null;
        synchronized (activityList) {
            final int index = activityList.size() - 1;
            if (index < 0) {
                return null;
            }
            activity = activityList.get(index);
        }
        return activity;
    }

    public static String getTopActivityName() {
        Activity topActivity = getTopActivity();
        if (topActivity == null) {
            return null;
        }
        return topActivity.getClass().getName();
    }

    public static void killAllActivity() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.N) {
            return;
        }
        activityList.forEach(Activity::finish);
        activityList.clear();
    }

    private static boolean isActivityEmpty() {
        return activityList.isEmpty();
    }

}
```

然后上篇博客配了`Aspectj`

这里就直接使用

```java
package com.ruben.aop;

import android.app.Activity;
import android.app.Application;
import android.util.Log;

import com.ruben.manager.MyActivityLifecycleCallbacks;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;

import lombok.SneakyThrows;

/**
 * @ClassName: MyActivityManagerAop
 * @Description: 我还没有写描述
 * @Date: 2020/10/18 0018 11:40
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
@Aspect
public class MyActivityManagerAop {

    @Pointcut("execution(* com.ruben..*.onCreate(..))")
    public void onCreatePointcut() {

    }

    @SneakyThrows
    @Around("onCreatePointcut()")
    public Object addActivity(final ProceedingJoinPoint joinPoint) {
        Object object = joinPoint.getTarget();
        if (!(object instanceof Activity)) {
            return joinPoint.proceed();
        }
        Activity activity = (Activity) object;
        Application application = activity.getApplication();
        MyActivityLifecycleCallbacks myActivityLifecycleCallbacks = new MyActivityLifecycleCallbacks();
        application.registerActivityLifecycleCallbacks(myActivityLifecycleCallbacks);
        Log.i(activity.getClass().getName(), "aop execute correct");
        return joinPoint.proceed();
    }
}
```

