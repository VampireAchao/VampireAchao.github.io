---
title: thymeleaf调用springBean
date: 2021-07-07 20:19:12
tags: java
---

> 没有经过战斗的舍弃，是虚伪的；没有经过苦难的超脱，是轻佻的。——傅雷

昨天写了一篇[关于前端精度丢失的博客](https://VampireAchao.github.io/2021/07/06/js%E7%B2%BE%E5%BA%A6%E4%B8%A2%E5%A4%B1%E5%9D%91/)

今天发现还有个问题，如果我们需要使用`thymeleaf`在`js`中使用获取的数据是一个对象

并且里面的属性还是超出16位的`Long`类型的话，仍然会导致精度丢失

这里我们可以直接写一个`JsonManager`

```java
/**
 * Json转换管理层
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/7/7 11:12
 */
public interface JsonManager {

    /**
     * 序列化处理精度丢失
     *
     * @param serializeObj 将要序列化的对象
     * @return java.lang.Object
     * @author <achao1441470436@gmail.com>
     * @since 2021/7/7 11:16
     */
    Object browserCompatible(Object serializeObj);

}
```

实现类

```java
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import org.springframework.stereotype.Service;

/**
 * Json转换管理层实现类
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/7/7 11:13
 */
@Service
public class JsonManagerImpl implements JsonManager {
    /**
     * 序列化处理精度丢失
     *
     * @param serializeObj 将要序列化的对象
     * @return java.lang.Object
     * @author <achao1441470436@gmail.com>
     * @since 2021/7/7 11:16
     */
    @Override
    public Object browserCompatible(Object serializeObj) {
        return JSON.parse(JSON.toJSONString(serializeObj, SerializerFeature.BrowserCompatible));
    }
}
```

然后我们可以在页面上调用

```html
<script th:inline="javascript">
    let ruben = [[${@jsonManagerImpl.browserCompatible(ruben)}]];
    console.log(ruben)
</script>
```

我们打开浏览器控制台查看我们替换后的结果

![image-20210707230245389](/imgs/oss/picGo/image-20210707230245389.png)
