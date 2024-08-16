---
title: 日志输出filter
date: 2021-08-04 21:09:46
tags: java
---

> 人类经常把一个生涯发生的事，撰写成历史，在从那里看人生；其实，那不过是衣服，人生是内在的——罗曼。罗兰

日记记录过滤器

```java
package com.kuang.config.log;

import com.alibaba.fastjson.JSON;
import com.kuang.common.util.Opt;
import com.kuang.common.util.ResponseWrapper;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 日志记录过滤器
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/7/29 9:58
 */
@Slf4j
//@Component
//@WebFilter(filterName = "LogFilter", urlPatterns = "/**")
public class LogFilter implements Filter {

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
        ResponseWrapper wrapper = new ResponseWrapper((HttpServletResponse) response);
        HttpServletRequest req = (HttpServletRequest) request;
        String uri = req.getRequestURI();
        long startTime = System.nanoTime();
        chain.doFilter(request, wrapper);
        // 获取response返回的内容并重新写入response
        String result = wrapper.getResponseData(response.getCharacterEncoding());
        response.getOutputStream().write(result.getBytes());

        Opt.of(log).filter(Logger::isInfoEnabled).ifPresent(l -> {
            log.info("method:{}", req.getMethod());
            log.info("uri:{}", uri);
            log.info("parameterMap:{}", JSON.toJSONString(req.getParameterMap()));
            log.info("responseCode:{}", wrapper.getStatus());
            log.info("result:{}", result);
            log.info("timeCost:{}", (System.nanoTime() - startTime) / (1000.0 * 1000.0) + "ms");
        });
    }


}
```

因为默认的`response`获取了响应结果就没了，因此我们需要封装一个`ResponseWrapper`

```java
package com.kuang.common.util;

import lombok.SneakyThrows;

import javax.servlet.ServletOutputStream;
import javax.servlet.WriteListener;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;

/**
 * 过滤器获取响应结果
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/7/29 10:13
 */
public class ResponseWrapper extends HttpServletResponseWrapper {

    private ByteArrayOutputStream buffer = null;
    private ServletOutputStream outputStream = null;
    private PrintWriter writer = null;

    /**
     * Constructs a response adaptor wrapping the given response.
     *
     * @param response The response to be wrapped
     * @throws IllegalArgumentException if the response is null
     */
    @SneakyThrows
    public ResponseWrapper(HttpServletResponse response) {
        super(response);
        buffer = new ByteArrayOutputStream();
        outputStream = new WrapperOutputStream(buffer);
        writer = new PrintWriter(new OutputStreamWriter(buffer, StandardCharsets.UTF_8));
    }

    /**
     * The default behavior of this method is to return getOutputStream() on the
     * wrapped response object.
     */
    @Override
    public ServletOutputStream getOutputStream() throws IOException {
        return outputStream;
    }

    /**
     * The default behavior of this method is to return getWriter() on the
     * wrapped response object.
     */
    @Override
    public PrintWriter getWriter() throws IOException {
        return writer;
    }

    /**
     * The default behavior of this method is to call flushBuffer() on the
     * wrapped response object.
     */
    @Override
    @SneakyThrows
    public void flushBuffer() {
        if (outputStream != null) {
            outputStream.flush();
        }
        if (writer != null) {
            writer.flush();
        }
    }

    /**
     * The default behavior of this method is to call reset() on the wrapped
     * response object.
     */
    @Override
    public void reset() {
        buffer.reset();
    }

    /**
     * Get response content
     *
     * @param charset HttpServletResponse#getCharacterEncoding()
     * @return response content
     */
    @SneakyThrows
    public String getResponseData(String charset) {
        // 将out、writer中的数据强制输出到WrapperResponse的buffer里面，否则取不到数据
        flushBuffer();
        return buffer.toString(StandardCharsets.UTF_8.displayName());
    }

    /**
     * 内部类，对ServletOutputStream进行包装，指定输出流的输出端
     */
    private static class WrapperOutputStream extends ServletOutputStream {

        private ByteArrayOutputStream bos = null;

        public WrapperOutputStream(ByteArrayOutputStream stream) throws IOException {
            bos = stream;
        }


        /**
         * Writes the specified byte to this output stream. The general
         * contract for <code>write</code> is that one byte is written
         * to the output stream. The byte to be written is the eight
         * low-order bits of the argument <code>b</code>. The 24
         * high-order bits of <code>b</code> are ignored.
         * <p>
         * Subclasses of <code>OutputStream</code> must provide an
         * implementation for this method.
         *
         * @param b the <code>byte</code>.
         * @throws IOException if an I/O error occurs. In particular,
         *                     an <code>IOException</code> may be thrown if the
         *                     output stream has been closed.
         */
        @Override
        public void write(int b) throws IOException {
            bos.write(b);
        }


        /**
         * Checks if a non-blocking write will succeed. If this returns
         * <code>false</code>, it will cause a callback to
         * {@link WriteListener#onWritePossible()} when the buffer has emptied. If
         * this method returns <code>false</code> no further data must be written
         * until the contain calls {@link WriteListener#onWritePossible()}.
         *
         * @return <code>true</code> if data can be written, else <code>false</code>
         * @since Servlet 3.1
         */
        @Override
        public boolean isReady() {
            return false;
        }

        /**
         * Sets the {@link WriteListener} for this {@link ServletOutputStream} and
         * thereby switches to non-blocking IO. It is only valid to switch to
         * non-blocking IO within async processing or HTTP upgrade processing.
         *
         * @param listener The non-blocking IO write listener
         * @throws IllegalStateException If this method is called if neither
         *                               async nor HTTP upgrade is in progress or
         *                               if the {@link WriteListener} has already
         *                               been set
         * @throws NullPointerException  If listener is null
         * @since Servlet 3.1
         */
        @Override
        public void setWriteListener(WriteListener listener) {

        }
    }

}
```

