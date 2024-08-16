---
title: springboot默认跳转/error页面变更
date: 2021-05-23 17:55:31
tags: java
---

> 宁鸣而死，不默而生。——胡适

> 宁鸣而死，不默而生。——胡适

在开发中我们经常看到这样一个页面

![image-20210524175626562](/imgs/oss/picGo/image-20210524175626562.png)

意思是告诉你，没有映射到`/error`对应的视图

这个是从哪里出现的呢？

我们找到`org.springframework.boot.autoconfigure.web.servlet.error`包下面

![image-20210524175936141](/imgs/oss/picGo/image-20210524175936141.png)

这里我们看到`ErrorMvcAutoConfiguration`，因为`springboot`自动装配就是这些`xxxAutoConfiguration`去完成的

打开一看，发现：诶？！这里有这样一段代码

![image-20210524180251487](/imgs/oss/picGo/image-20210524180251487.png)

这段代码告诉我们，如果在没注入`ErrorViewResolver`并且注入了`DispatcherServlet`这个`bean`的情况下，则注入一个叫`DefaultErrorViewResolver`的`bean`

如果你现在就想知道怎么修改默认的`/error`路径映射？

那可以直接注入一个`ErrorViewResolver`

在你的任意一个配置类中，我建议是放到`Mvc`配置类中

```java
/**
 * web配置类
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/5/18 0018 14:52
 */
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
    
    /**
     * 不要默认跳转error页面配置
     *
     * @return org.springframework.boot.autoconfigure.web.servlet.error.ErrorViewResolver
     * @author <achao1441470436@gmail.com>
     * @since 2021/5/22 0022 21:59
     */
    @Bean
    public ErrorViewResolver errorViewResolver() throws IOException {
        return (request, status, model) -> {
            // 进行你的配置，如我这里是抛出异常然后统一处理，根据实际业务需求去做
            // throw new MybatisPlusException("无法解析视图");
        };
    }
}
```

那我们接着来探讨，为什么默认会跳转到`/error`页面呢？

因为我们如果没注入`ErrorViewResolver`的话，`ErrorMvcAutoConfiguration`里

里注入了`DefaultErrorViewResolver`

而里面对于`ErrorViewResolver`接口的实现是

```java
	@Override
	public ModelAndView resolveErrorView(HttpServletRequest request, HttpStatus status, Map<String, Object> model) {
        // 找到对应状态码的 error/xxx 页面,例如找到 error/404 
		ModelAndView modelAndView = resolve(String.valueOf(status.value()), model);
		if (modelAndView == null && SERIES_VIEWS.containsKey(status.series())) {
            // 如果没找到上面的页面，并且status.series等于4或者5的时候，则找4xx或者5xx视图
			modelAndView = resolve(SERIES_VIEWS.get(status.series()), model);
		}
        // 然后返回
		return modelAndView;
	}
```

找不到这些页面的话

![image-20210524190730947](/imgs/oss/picGo/image-20210524190730947.png)

自然而然就会返回默认的`org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration.StaticView`

而里面的实现

![image-20210524190656122](/imgs/oss/picGo/image-20210524190656122.png)

正好是我们一开始看到的错误页面啦~

**所以再说一遍，配置如下即可**

```java
/**
 * web配置类
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/5/18 0018 14:52
 */
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
    
    /**
     * 不要默认跳转error页面配置
     *
     * @return org.springframework.boot.autoconfigure.web.servlet.error.ErrorViewResolver
     * @author <achao1441470436@gmail.com>
     * @since 2021/5/22 0022 21:59
     */
    @Bean
    public ErrorViewResolver errorViewResolver() throws IOException {
        return (request, status, model) -> {
            // 进行你的配置，如我这里是抛出异常然后统一处理，根据实际业务需求去做
            // throw new MybatisPlusException("无法解析视图");
        };
    }
}
```

