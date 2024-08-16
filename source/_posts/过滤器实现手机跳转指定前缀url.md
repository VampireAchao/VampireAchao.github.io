---
title: 过滤器实现手机跳转指定前缀url
date: 2021-08-05 19:33:15
tags: java
---

> 信念！有信念的人经得起任何风暴——奥维德

代码需要用到[`Opt`](https://gitee.com/VampireAchao/simple-scaffold/blob/master/src/main/java/com/ruben/simplescaffold/utils/Opt.java)

实现效果如下：

`web`访问`/index`页面正常跳转

手机访问`/index`页面，跳转到`/h5/index`页面(这里不只是`index`页面，其余页面同理)

完整代码：https://gitee.com/VampireAchao/simple-scaffold.git

```java
package com.ruben.simplescaffold.filter;

import com.ruben.simplescaffold.utils.Opt;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

/**
 * 用户浏览器标识过滤器
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/8/4 17:09
 */
@Slf4j
@Component
@WebFilter(filterName = "LogFilter", urlPatterns = "/**")
public class UserAgentFilter implements Filter {

    /**
     * 移动端浏览器标识
     */
    private final static List<String> MOBILE_AGENT_LIST = Arrays.asList("Android", "iPhone", "iPod", "iPad", "Windows Phone", "MQQBrowser");

    /**
     * The <code>doFilter</code> method of the Filter is called by the container
     * each time a request/response pair is passed through the chain due to a
     * client request for a resource at the end of the chain. The FilterChain
     * passed in to this method allows the Filter to pass on the request and
     * response to the next entity in the chain.
     * <p>
     * A typical implementation of this method would follow the following
     * pattern:- <br>
     * 1. Examine the request<br>
     * 2. Optionally wrap the request object with a custom implementation to
     * filter content or headers for input filtering <br>
     * 3. Optionally wrap the response object with a custom implementation to
     * filter content or headers for output filtering <br>
     * 4. a) <strong>Either</strong> invoke the next entity in the chain using
     * the FilterChain object (<code>chain.doFilter()</code>), <br>
     * 4. b) <strong>or</strong> not pass on the request/response pair to the
     * next entity in the filter chain to block the request processing<br>
     * 5. Directly set headers on the response after invocation of the next
     * entity in the filter chain.
     *
     * @param request  The request to process
     * @param response The response associated with the request
     * @param chain    Provides access to the next filter in the chain for this
     *                 filter to pass the request and response to for further
     *                 processing
     * @throws IOException      if an I/O error occurs during this filter's
     *                          processing of the request
     * @throws ServletException if the processing fails for any other reason
     */
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String uri = httpRequest.getRequestURI();
        if (uri.contains("favicon")) {
            // 过滤图标和错误页面
            response.getWriter().write("");
            return;
        }
        // 判断请求是否来自手机
        String userAgent = httpRequest.getHeader("User-Agent");
        if (Opt.ofNullable(userAgent).filter(agent -> agent.contains("Windows NT")).filter(agent -> agent.contains("compatible; MSIE 9.0;")).or(() -> Opt.ofNullable(userAgent).filter(agent -> !agent.contains("Macintosh"))).filter(agent -> MOBILE_AGENT_LIST.parallelStream().anyMatch(agent::contains)).isPresent()) {
            request.getRequestDispatcher("/h5" + uri).forward(request, response);
        } else {
            chain.doFilter(request, response);
        }
    }
}
```

