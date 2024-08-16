---
title: 注解支持@Alias同步值
date: 2022-03-08 18:45:51
tags: java
---

> 你最可爱，我说时来不及思索。但思索之后，还是这样说。——普希金《你多么可爱》

首先是这个`issue`：[希望`AnnotationUtil`增加对`@AliasFor`的支持](https://gitee.com/dromara/hutool/issues/I4U0OV)

然后我就提交了这个`PR`：[提供`AnnotationUtil#getAnnotationAlias`，为`@Alias`注解做别名支持的适配](https://gitee.com/dromara/hutool/pulls/554)

代码如下(找不到方法可以去看[`hutool`源码](https://gitee.com/dromara/hutool/blob/0e5329850a7eda0e558ed20854e58a90d70db7e8/hutool-core/src/main/java/cn/hutool/core/annotation/AnnotationUtil.java))：

```java
import cn.hutool.core.exceptions.UtilException;
import cn.hutool.core.util.ArrayUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.ReflectUtil;
import cn.hutool.core.util.StrUtil;

import java.lang.annotation.Annotation;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.lang.annotation.*;
import java.lang.reflect.AnnotatedElement;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.HashMap;
import java.util.Map;

/**
 * 注解工具类<br>
 * 快速获取注解对象、注解值等工具封装
 *
 * @author looly
 * @since 4.0.9
 */
public class AnnotationUtil {

	/**
	 * 获取别名支持后的注解
	 *
	 * @param annotationEle  被注解的类
	 * @param annotationType 注解类型Class
	 * @param <T>            注解类型
	 * @return 别名支持后的注解
	 */
	@SuppressWarnings("unchecked")
	public static <T extends Annotation> T getAnnotationAlias(AnnotatedElement annotationEle, Class<T> annotationType) {
		T annotation = getAnnotation(annotationEle, annotationType);
		Object o = Proxy.newProxyInstance(annotationType.getClassLoader(), new Class[]{annotationType}, (proxy, method, args) -> {
			Alias alias = method.getAnnotation(Alias.class);
			if (ObjectUtil.isNotNull(alias) && StrUtil.isNotBlank(alias.value())) {
				Method aliasMethod = annotationType.getMethod(alias.value());
				return ReflectUtil.invoke(annotation, aliasMethod);
			}
			return method.invoke(args);
		});
		return (T) o;
	}
    
}
```

最终效果路哥进行了一些调整

然后使用方式也很简单，我们写一个注解，然后给它用一个`@Alias`别名，关联我们注解中另一个属性：

```java
package cn.hutool.core.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 用于单元测试的注解类<br>
 * 注解类相关说明见：https://www.cnblogs.com/xdp-gacl/p/3622275.html
 *
 * @author looly
 *
 */
// Retention注解决定MyAnnotation注解的生命周期
@Retention(RetentionPolicy.RUNTIME)
// Target注解决定MyAnnotation注解可以加在哪些成分上，如加在类身上，或者属性身上，或者方法身上等成分
@Target({ ElementType.METHOD, ElementType.TYPE })
public @interface AnnotationForTest {

	/**
	 * 注解的默认属性值
	 *
	 * @return 属性值
	 */
	String value() default "";

	@Alias("value")
	String retry() default "";
}
```

然后我们把这个注解加在一个类上面

```java
    @AnnotationForTest("测试")
    static class ClassWithAnnotation{
        public void test(){
        }
    }
```

我们来获取这个`Class`上注解的值

```java
	@Test
	public void getAnnotationSyncAlias() {
		// 直接获取
		Assert.assertEquals("", ClassWithAnnotation.class.getAnnotation(AnnotationForTest.class).retry());

		// 加别名适配
		AnnotationForTest annotation = AnnotationUtil.getAnnotationAlias(ClassWithAnnotation.class, AnnotationForTest.class);
		Assert.assertEquals("测试", annotation.retry());
	}
```

大家可以很明显地看出来，这里我们默认给`AnnotationForTest`上的`value`赋值，但我们取`retry`，因为我们加了`@Alias`注解且使用了`getAnnotationSyncAlias`方式获取，所以我们取到的`retry`值实际上是`value`的值，两者进行了同步

