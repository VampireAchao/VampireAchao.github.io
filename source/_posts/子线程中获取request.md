---
title: 子线程中获取request
date: 2022-01-18 18:59:39
tags: java
---

> 在这个世界上，一切都预先被谅解了，一切也就被卑鄙地许可了。——《不能承受的生命之轻》

写一个接口，用于测试：

```java
import cn.hutool.core.thread.AsyncUtil;
import javax.annotation.Resource;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.util.concurrent.CompletableFuture;


@RestController
@RequestMapping("test")
public class TestController {

	@Resource
    private HttpServletRequest request;
	
	@GetMapping("request")
    public String request() {
        AsyncUtil.get(CompletableFuture.runAsync(() -> {
            String id = request.getParameter("id");
            System.out.println(id);
        }));
        AsyncUtil.get(CompletableFuture.runAsync(() -> {
            String id = request.getParameter("id");
            System.out.println(id);
        }));
        return "";
    }
}
```

我们请求一下

![image-20220118160548784](/imgs/oss/picGo/image-20220118160548784.png)

发现抛出了异常

![image-20220118160326487](/imgs/oss/picGo/image-20220118160326487.png)

我们在第一行加上这行代码：

```java
RequestContextHolder.setRequestAttributes(RequestContextHolder.getRequestAttributes(), true);
```

成功获取

![image-20220118160501199](/imgs/oss/picGo/image-20220118160501199.png)

尝试将这行代码放入拦截器，也成功生效

![image-20220118160710865](/imgs/oss/picGo/image-20220118160710865.png)

这是因为源码中，如果我们传入`inheritable`为`true`，则在`NamedInheritableThreadLocal`中设置值

该类继承了`InheritableThreadLocal`，因此可以在子线程共享变量

![image-20220118160902067](/imgs/oss/picGo/image-20220118160902067.png)