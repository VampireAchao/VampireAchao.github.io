---
title: Thymeleaf Error resolving template [favicon.ico]
date: 2021-12-17 18:41:04
tags: java
---

> 每一个看似简单的社会现象其实都只露出了冰山一角。——林达

遇到这个报错，方案1：

在页面上添加：

```html
<link rel="icon" href="/static/favicon.ico">
```

前提是你有`icon`并且放到了`static`下面

![image-20211217174528333](/imgs/oss/picGo/image-20211217174528333.png)

方案2：

写个过滤器，给它过滤掉

```java
package com.ruben.simplescaffold.filter;

import cn.hutool.core.lang.Opt;
import cn.hutool.core.text.CharSequenceUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

/**
 * 过滤器
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/8/4 17:09
 */
@Slf4j
@Component
@WebFilter(filterName = "faviconFilter", urlPatterns = "/**")
public class UserAgentFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String uri = httpRequest.getRequestURI();
        if (uri.contains(FAVICON)) {
            // 过滤图标
            response.getWriter().write(CharSequenceUtil.EMPTY);
            return;
        }
        chain.doFilter(request, response);
    }
}
```

方案3:

写一个接口,返回空

```java
package com.ruben.simplescaffold.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author <achao1441470436@gmail.com>
 * @since 2021/7/11 0011 16:22
 */
@Controller
public class IndexController {

    /**
     * 图标
     */
    @GetMapping({"favicon.ico", "favicon"})
    @ResponseBody
    public void favicon() {
    }

}
```

