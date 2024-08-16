---
title: js精度丢失坑
date: 2021-07-06 19:42:28
tags: bug
---

> 飞蛾扑火时一定是极快乐幸福的。——三毛

我们在进行开发时可能会遇到这样一个坑，那就是`js`代码的精度丢失

![image-20210706201055310](/imgs/oss/picGo/image-20210706201055310.png)

可以看到`16`位以后就会出现精度丢失的问题

我们定义一个简单接口，这里用`com.baomidou.mybatisplus.core.toolkit.IdWorker.getId()`生成`19`位为`Long`类型的`id`

```java
    @GetMapping("json")
    @ResponseBody
    public Ruben json() {
        return new Ruben(IdWorker.getId());
    }
```

返回的`Ruben`对象

```java
/**
 * @author <achao1441470436@gmail.com>
 * @since 2021/7/6 0006 21:37
 */
public class Ruben {

    private Long id;

    public Ruben(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
```

请求一下

可以看到我们`Response`中是正常的

![image-20210706213000888](/imgs/oss/picGo/image-20210706213000888.png)

但`Preview`中就出现了精度丢失的问题

![image-20210706213015078](/imgs/oss/picGo/image-20210706213015078.png)

当然，我们可以转换为`string`，这样就不会出现精度丢失问题

但是，我们在返回`json`格式数据的接口中如果要一个一个处理的话非常麻烦，我们可以配置一下`WebMvcConfigurer`

如果我们使用的`Mvc`默认的`jackson`，只需如下配置即可

```java
package com.ruben.simplethymeleaf.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

/**
 * MVC配置类
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/7/6 0006 20:20
 */
@Configuration
@EnableWebMvc
public class SpringMvcConfig implements WebMvcConfigurer {

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        // 全局配置序列化返回 JSON 处理
        final ObjectMapper objectMapper = new ObjectMapper();
        SimpleModule simpleModule = new SimpleModule();
        simpleModule.addSerializer(Long.class, ToStringSerializer.instance);
        objectMapper.registerModule(simpleModule);
        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
        converter.setObjectMapper(objectMapper);
        converters.add(converter);
    }

}
```

然后我们配置完后重启项目

再次请求，可以看到默认将`Long`给我们转成了`String`

![image-20210706215720816](/imgs/oss/picGo/image-20210706215720816.png)

假设你用的是`FastJson`，则需要如下配置

```java
package com.ruben.simplethymeleaf.config;

import com.alibaba.fastjson.serializer.SerializerFeature;
import com.alibaba.fastjson.support.config.FastJsonConfig;
import com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
import java.util.List;

/**
 * MVC配置类
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/7/6 0006 20:20
 */
@Configuration
@EnableWebMvc
public class SpringMvcConfig implements WebMvcConfigurer {

    /**
     * Fastjson处理精度丢失问题
     *
     * @param converters 转换器
     */
    /**
     * @param converters 转换器
     * @author <achao1441470436@gmail.com>
     * @since 2021/5/21 0021 15:08
     */
    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        FastJsonHttpMessageConverter fastJsonConverter = new FastJsonHttpMessageConverter();
        // 设置允许ContentType
        List<MediaType> supportedMediaTypes = new ArrayList<>();
        supportedMediaTypes.add(MediaType.APPLICATION_JSON);
        supportedMediaTypes.add(MediaType.APPLICATION_ATOM_XML);
        supportedMediaTypes.add(MediaType.APPLICATION_FORM_URLENCODED);
        supportedMediaTypes.add(MediaType.APPLICATION_OCTET_STREAM);
        supportedMediaTypes.add(MediaType.APPLICATION_PDF);
        supportedMediaTypes.add(MediaType.APPLICATION_RSS_XML);
        supportedMediaTypes.add(MediaType.APPLICATION_XHTML_XML);
        supportedMediaTypes.add(MediaType.APPLICATION_XML);
        supportedMediaTypes.add(MediaType.IMAGE_GIF);
        supportedMediaTypes.add(MediaType.IMAGE_JPEG);
        supportedMediaTypes.add(MediaType.IMAGE_PNG);
        supportedMediaTypes.add(MediaType.TEXT_EVENT_STREAM);
        supportedMediaTypes.add(MediaType.TEXT_HTML);
        supportedMediaTypes.add(MediaType.TEXT_MARKDOWN);
        supportedMediaTypes.add(MediaType.TEXT_PLAIN);
        supportedMediaTypes.add(MediaType.TEXT_XML);
        fastJsonConverter.setSupportedMediaTypes(supportedMediaTypes);
        FastJsonConfig fjc = new FastJsonConfig();
        // 配置序列化策略
        // ID_WORKER 生成主键太长导致 js 精度丢失
        // JavaScript 无法处理 Java 的长整型 Long 导致精度丢失，具体表现为主键最后两位永远为 0，解决思路： Long 转为 String 返回
        fjc.setSerializerFeatures(SerializerFeature.BrowserCompatible);
        fastJsonConverter.setFastJsonConfig(fjc);
        converters.add(fastJsonConverter);
    }
}
```

同样的效果如下

![image-20210706220318618](/imgs/oss/picGo/image-20210706220318618.png)

当然，有种情况，是我们没有用`ajax`请求`Json`数据，而是直接使用`thymeleaf`进行渲染

在页面上当然没问题，但在`js`代码里就会出现精度丢失

我们写一个接口跳转到对应页面

```java
    @GetMapping
    public String index() {
        request.setAttribute("id", IdWorker.getId());
        request.setAttribute("ruben", new Ruben(IdWorker.getId()));
        return "index";
    }
```

然后在页面上渲染我们的`id`和`ruben.id`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ruben</title>
</head>
<body>
<div>
    <div th:text="${id}"></div>
    <div>[[${ruben.id}]]</div>
</div>
</body>
</html>
```

可以看到页面是成功渲染

![image-20210706220901396](/imgs/oss/picGo/image-20210706220901396.png)

但如果我们在`js`里替换

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ruben</title>
</head>
<body>
<div>
    <div th:text="${id}"></div>
    <div>[[${ruben.id}]]</div>
</div>
<script th:inline="javascript">
    var id = [[${id}]]
    console.log(id)
</script>
<script th:inline="javascript">
    /*<![CDATA[*/
    var id = /*[[${id}]]*/ 'Achao';
    /*]]>*/
    console.log(id)
</script>
</body>
</html>
```

可以看到浏览器控制台里确实是替换成功了

![image-20210706221410858](/imgs/oss/picGo/image-20210706221410858.png)

但我们控制台输出的数据出现精度丢失了

![image-20210706221433610](/imgs/oss/picGo/image-20210706221433610.png)

所以我们可以如下解决，直接在外层套个引号即可

```html
<script th:inline="javascript">
    var id = '[[${id}]]'
    console.log(id)
</script>
```

效果如下

![image-20210706222107336](/imgs/oss/picGo/image-20210706222107336.png)

打印出来可以看到第一个也正确

![image-20210706222127777](/imgs/oss/picGo/image-20210706222127777.png)