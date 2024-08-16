---
title: netty-websocket
date: 2021-11-11 20:52:49
tags: java
---

> 历经万般红尘劫，犹如凉风轻拂面。——林清玄

今天用了这个[`netty-websocket-spring-boot-starter`](https://gitee.com/Yeauty/netty-websocket-spring-boot-starter)

那是相当的香啊

```java
package com.ruben.xchat.controller;

import cn.hutool.core.exceptions.ExceptionUtil;
import com.alibaba.fastjson.JSON;
import com.ruben.xchat.pojo.to.ChatTransferObject;
import com.ruben.xchat.service.WebSocketService;
import io.netty.handler.codec.http.HttpHeaders;
import io.netty.handler.timeout.IdleStateEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.yeauty.annotation.*;
import org.yeauty.pojo.Session;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * WebSocket控制层
 * https://gitee.com/Yeauty/netty-websocket-spring-boot-starter
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/11/11 9:14
 */
@Slf4j
@Component
@ServerEndpoint(path = "${ws.path}", port = "${ws.port}")
public class WebSocketController {

    @Autowired
    private WebSocketService webSocketService;

    /**
     * 建立会话之前
     *
     * @param session 会话
     * @param headers 请求头
     * @param req     请求参数
     * @param reqMap  请求参数
     * @param arg     路径上的参数
     * @param pathMap 路径上的参数
     * @author <achao1441470436@gmail.com>
     * @since 2021/11/11 9:18
     */
    @BeforeHandshake
    public void handshake(Session session, HttpHeaders headers, @RequestParam String req, @RequestParam MultiValueMap<String, List<Object>> reqMap, @PathVariable String arg, @PathVariable Map<String, Object> pathMap) {
        session.setSubprotocols("stomp");
        // 进行认证
        try {
            webSocketService.verifyLogin(headers);
        } catch (Exception e) {
            session.close();
            ExceptionUtil.wrapAndThrow(e);
        }
    }


    /**
     * 当有新的WebSocket连接完成时
     *
     * @param session 会话
     * @param headers 请求头
     * @param req     请求参数
     * @param reqMap  请求参数
     * @param arg     路径上的参数
     * @param pathMap 路径上的参数
     * @author <achao1441470436@gmail.com>
     * @since 2021/11/11 9:21
     */
    @OnOpen
    public void onOpen(Session session, HttpHeaders headers, @RequestParam String req, @RequestParam MultiValueMap<String, List<Object>> reqMap, @PathVariable String arg, @PathVariable Map<String, Object> pathMap) {
        log.info("new connection");
        webSocketService.registerSession(headers, session);
    }

    /**
     * 连接关闭
     *
     * @param session 会话
     * @author <achao1441470436@gmail.com>
     * @since 2021/11/11 9:22
     */
    @OnClose
    public void onClose(Session session) throws IOException {
        log.info("one connection closed");
        webSocketService.removeSession(session);
    }

    /**
     * 连接发生异常
     *
     * @param session   会话
     * @param throwable 异常
     * @author <achao1441470436@gmail.com>
     * @since 2021/11/11 9:22
     */
    @OnError
    public void onError(Session session, Throwable throwable) {
        log.error("Connection error happened.", throwable);
        webSocketService.removeSession(session);
    }

    /**
     * 收到消息
     *
     * @param session 会话
     * @author <achao1441470436@gmail.com>
     * @since 2021/11/11 9:22
     */
    @OnMessage
    public void onMessage(Session session, String message) {
        System.out.println(message);
        ChatTransferObject chat = JSON.parseObject(message, ChatTransferObject.class);
        switch (chat.getChatToType()) {
            case CHAT_ONE:
                log.info("发送到个人：{}", chat);
                webSocketService.sendSomeone(session, chat);
                break;
            case CHAT_GROUP:
                log.error("发送到群聊");
                break;
            default:
                log.error("未识别的消息类型");
                break;
        }
    }

    /**
     * 收到二进制消息
     *
     * @param session 会话
     * @param bytes   消息
     * @author <achao1441470436@gmail.com>
     * @since 2021/11/11 9:22
     */
    @OnBinary
    public void onBinary(Session session, byte[] bytes) {
        for (byte b : bytes) {
            System.out.println(b);
        }
        session.sendBinary(bytes);
    }

    /**
     * 收到Netty事件
     *
     * @param session 会话
     * @param evt     事件
     * @author <achao1441470436@gmail.com>
     * @since 2021/11/11 9:22
     */
    @OnEvent
    public void onEvent(Session session, Object evt) {
        if (evt instanceof IdleStateEvent) {
            IdleStateEvent idleStateEvent = (IdleStateEvent) evt;
            switch (idleStateEvent.state()) {
                case READER_IDLE:
                    System.out.println("read idle");
                    break;
                case WRITER_IDLE:
                    System.out.println("write idle");
                    break;
                case ALL_IDLE:
                    System.out.println("all idle");
                    break;
                default:
                    break;
            }
        }
    }
}
```

使用注解进行配置，`netty`的各种配置例如端口、主机、都可以在`yml`中配置，文档就是`gitee`中的`md`，用来做即时通讯简直不要太香

> #  netty-websocket-spring-boot-starter
>
> #  [![License](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAAAAACIM/FCAAACh0lEQVR4Ae3ch5W0OgyG4dt/mQJ2xgQPzJoM1m3AbALrxzrf28FzsoP0HykJEEAAAUQTBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEkKK0789+GK/I2ezfQB522PnS1qc8pGgXvr4tE4aY0XOUWlGImThWgyCk6DleixzE7qwBkg/MGiDPlVVAyp1VQGrPKiACDhFI6VkF5LmzCki+sg7IwDoglnVAil0IMkeG9CyUiwsxLFUVFzJJOQaKCjFCDN9RXMjIX7W6ztZXZDKKCyn8sWJvH+nca7WHDN9lROlAliPH9iRKCPI4cswFJQWxB46toLQgQ9jhn5QYZA9DOkoMUoQde5YapAxDWkoNYsOQR3KQd9CxUnIQF4S49CB9ENKlBxmDEKsFUgMCCCCAAHIrSF61f6153Ajy8nyiPr8L5MXnmm4CyT2fzN4DUvHZ+ntA2tOQBRBAAAEEEEAAAQQQ7ZBaC6TwSiDUaYHQ2yuB0MN+ft+43whyrs4rgVCjBUKTFshLC6TUAjGA3AxSaYFYLZBOC2RUAsk8h5qTg9QcbEoOsoQhQ2qQhsO5xCD5dgB5JQaZ+KBKGtKecvR81Ic0ZDjByKdDx0rSEDZ/djQbH+bkIdvfJFm98BfV8hD2zprfVdlu9PxVeyYAkciREohRAplJCaRSAplJCcQogTjSAdlyHRBvSAekJR0QRzogA+mADJkOiCPSAPEtqYBshlRAXC43hxix2QiOuEZkVERykGyNo9idIZKE0HO7XrG6OiMShlDWjstVzdPgXtUH9v0CEidAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQP4HgjZxTpdEii0AAAAASUVORK5CYII=)](http://www.apache.org/licenses/LICENSE-2.0.html)
>
> [English Docs](https://github.com/YeautyYE/netty-websocket-spring-boot-starter/blob/master/README.md)
>
> ### 简介
>
> 本项目帮助你在spring-boot中使用Netty来开发WebSocket服务器，并像spring-websocket的注解开发一样简单
>
> ### 要求
>
> - jdk版本为1.8或1.8+
>
> ### 快速开始
>
> - 添加依赖:
>
> ```
> 	<dependency>
> 		<groupId>org.yeauty</groupId>
> 		<artifactId>netty-websocket-spring-boot-starter</artifactId>
> 		<version>0.12.0</version>
> 	</dependency>
> ```
>
> - 在端点类上加上`@ServerEndpoint`注解，并在相应的方法上加上`@BeforeHandshake`、`@OnOpen`、`@OnClose`、`@OnError`、`@OnMessage`、`@OnBinary`、`@OnEvent`注解，样例如下：
>
> ```
> @ServerEndpoint(path = "/ws/{arg}")
> public class MyWebSocket {
> 
>     @BeforeHandshake
>     public void handshake(Session session, HttpHeaders headers, @RequestParam String req, @RequestParam MultiValueMap reqMap, @PathVariable String arg, @PathVariable Map pathMap){
>         session.setSubprotocols("stomp");
>         if (!"ok".equals(req)){
>             System.out.println("Authentication failed!");
>             session.close();
>         }
>     }
>     
>     @OnOpen
>     public void onOpen(Session session, HttpHeaders headers, @RequestParam String req, @RequestParam MultiValueMap reqMap, @PathVariable String arg, @PathVariable Map pathMap){
>         System.out.println("new connection");
>         System.out.println(req);
>     }
> 
>     @OnClose
>     public void onClose(Session session) throws IOException {
>        System.out.println("one connection closed"); 
>     }
> 
>     @OnError
>     public void onError(Session session, Throwable throwable) {
>         throwable.printStackTrace();
>     }
> 
>     @OnMessage
>     public void onMessage(Session session, String message) {
>         System.out.println(message);
>         session.sendText("Hello Netty!");
>     }
> 
>     @OnBinary
>     public void onBinary(Session session, byte[] bytes) {
>         for (byte b : bytes) {
>             System.out.println(b);
>         }
>         session.sendBinary(bytes); 
>     }
> 
>     @OnEvent
>     public void onEvent(Session session, Object evt) {
>         if (evt instanceof IdleStateEvent) {
>             IdleStateEvent idleStateEvent = (IdleStateEvent) evt;
>             switch (idleStateEvent.state()) {
>                 case READER_IDLE:
>                     System.out.println("read idle");
>                     break;
>                 case WRITER_IDLE:
>                     System.out.println("write idle");
>                     break;
>                 case ALL_IDLE:
>                     System.out.println("all idle");
>                     break;
>                 default:
>                     break;
>             }
>         }
>     }
> 
> }
> ```
>
> - 打开WebSocket客户端，连接到`ws://127.0.0.1:80/ws/xxx`
>
> ### 注解
>
> ###### @ServerEndpoint
>
> > 当ServerEndpointExporter类通过Spring配置进行声明并被使用，它将会去扫描带有@ServerEndpoint注解的类 被注解的类将被注册成为一个WebSocket端点 所有的[配置项](https://gitee.com/Yeauty/netty-websocket-spring-boot-starter#配置)都在这个注解的属性中 ( 如:`@ServerEndpoint("/ws")` )
>
> ###### @BeforeHandshake
>
> > 当有新的连接进入时，对该方法进行回调 注入参数的类型:Session、HttpHeaders...
>
> ###### @OnOpen
>
> > 当有新的WebSocket连接完成时，对该方法进行回调 注入参数的类型:Session、HttpHeaders...
>
> ###### @OnClose
>
> > 当有WebSocket连接关闭时，对该方法进行回调 注入参数的类型:Session
>
> ###### @OnError
>
> > 当有WebSocket抛出异常时，对该方法进行回调 注入参数的类型:Session、Throwable
>
> ###### @OnMessage
>
> > 当接收到字符串消息时，对该方法进行回调 注入参数的类型:Session、String
>
> ###### @OnBinary
>
> > 当接收到二进制消息时，对该方法进行回调 注入参数的类型:Session、byte[]
>
> ###### @OnEvent
>
> > 当接收到Netty的事件时，对该方法进行回调 注入参数的类型:Session、Object
>
> ### 配置
>
> > 所有的配置项都在这个注解的属性中
>
> | 属性                                | 默认值       | 说明                                                         |
> | ----------------------------------- | ------------ | ------------------------------------------------------------ |
> | path                                | "/"          | WebSocket的path,也可以用`value`来设置                        |
> | host                                | "0.0.0.0"    | WebSocket的host,`"0.0.0.0"`即是所有本地地址                  |
> | port                                | 80           | WebSocket绑定端口号。如果为0，则使用随机端口(端口获取可见 [多端点服务](https://gitee.com/Yeauty/netty-websocket-spring-boot-starter#多端点服务)) |
> | bossLoopGroupThreads                | 0            | bossEventLoopGroup的线程数                                   |
> | workerLoopGroupThreads              | 0            | workerEventLoopGroup的线程数                                 |
> | useCompressionHandler               | false        | 是否添加WebSocketServerCompressionHandler到pipeline          |
> | optionConnectTimeoutMillis          | 30000        | 与Netty的`ChannelOption.CONNECT_TIMEOUT_MILLIS`一致          |
> | optionSoBacklog                     | 128          | 与Netty的`ChannelOption.SO_BACKLOG`一致                      |
> | childOptionWriteSpinCount           | 16           | 与Netty的`ChannelOption.WRITE_SPIN_COUNT`一致                |
> | childOptionWriteBufferHighWaterMark | 64*1024      | 与Netty的`ChannelOption.WRITE_BUFFER_HIGH_WATER_MARK`一致,但实际上是使用`ChannelOption.WRITE_BUFFER_WATER_MARK` |
> | childOptionWriteBufferLowWaterMark  | 32*1024      | 与Netty的`ChannelOption.WRITE_BUFFER_LOW_WATER_MARK`一致,但实际上是使用 `ChannelOption.WRITE_BUFFER_WATER_MARK` |
> | childOptionSoRcvbuf                 | -1(即未设置) | 与Netty的`ChannelOption.SO_RCVBUF`一致                       |
> | childOptionSoSndbuf                 | -1(即未设置) | 与Netty的`ChannelOption.SO_SNDBUF`一致                       |
> | childOptionTcpNodelay               | true         | 与Netty的`ChannelOption.TCP_NODELAY`一致                     |
> | childOptionSoKeepalive              | false        | 与Netty的`ChannelOption.SO_KEEPALIVE`一致                    |
> | childOptionSoLinger                 | -1           | 与Netty的`ChannelOption.SO_LINGER`一致                       |
> | childOptionAllowHalfClosure         | false        | 与Netty的`ChannelOption.ALLOW_HALF_CLOSURE`一致              |
> | readerIdleTimeSeconds               | 0            | 与`IdleStateHandler`中的`readerIdleTimeSeconds`一致，并且当它不为0时，将在`pipeline`中添加`IdleStateHandler` |
> | writerIdleTimeSeconds               | 0            | 与`IdleStateHandler`中的`writerIdleTimeSeconds`一致，并且当它不为0时，将在`pipeline`中添加`IdleStateHandler` |
> | allIdleTimeSeconds                  | 0            | 与`IdleStateHandler`中的`allIdleTimeSeconds`一致，并且当它不为0时，将在`pipeline`中添加`IdleStateHandler` |
> | maxFramePayloadLength               | 65536        | 最大允许帧载荷长度                                           |
> | useEventExecutorGroup               | true         | 是否使用另一个线程池来执行耗时的同步业务逻辑                 |
> | eventExecutorGroupThreads           | 16           | eventExecutorGroup的线程数                                   |
> | sslKeyPassword                      | ""(即未设置) | 与spring-boot的`server.ssl.key-password`一致                 |
> | sslKeyStore                         | ""(即未设置) | 与spring-boot的`server.ssl.key-store`一致                    |
> | sslKeyStorePassword                 | ""(即未设置) | 与spring-boot的`server.ssl.key-store-password`一致           |
> | sslKeyStoreType                     | ""(即未设置) | 与spring-boot的`server.ssl.key-store-type`一致               |
> | sslTrustStore                       | ""(即未设置) | 与spring-boot的`server.ssl.trust-store`一致                  |
> | sslTrustStorePassword               | ""(即未设置) | 与spring-boot的`server.ssl.trust-store-password`一致         |
> | sslTrustStoreType                   | ""(即未设置) | 与spring-boot的`server.ssl.trust-store-type`一致             |
> | corsOrigins                         | {}(即未设置) | 与spring-boot的`@CrossOrigin#origins`一致                    |
> | corsAllowCredentials                | ""(即未设置) | 与spring-boot的`@CrossOrigin#allowCredentials`一致           |
>
> ### 通过application.properties进行配置
>
> > 所有参数皆可使用`${...}`占位符获取`application.properties`中的配置。如下：
>
> - 首先在`@ServerEndpoint`注解的属性中使用`${...}`占位符
>
> ```
> @ServerEndpoint(host = "${ws.host}",port = "${ws.port}")
> public class MyWebSocket {
>     ...
> }
> ```
>
> - 接下来即可在`application.properties`中配置
>
> ```
> ws.host=0.0.0.0
> ws.port=80
> ```
>
> ### 自定义Favicon
>
> 配置favicon的方式与spring-boot中完全一致。只需将`favicon.ico`文件放到classpath的根目录下即可。如下:
>
> ```
> src/
>   +- main/
>     +- java/
>     |   + <source code>
>     +- resources/
>         +- favicon.ico
> ```
>
> ### 自定义错误页面
>
> 配置自定义错误页面的方式与spring-boot中完全一致。你可以添加一个 `/public/error` 目录，错误页面将会是该目录下的静态页面，错误页面的文件名必须是准确的错误状态或者是一串掩码,如下：
>
> ```
> src/
>   +- main/
>     +- java/
>     |   + <source code>
>     +- resources/
>         +- public/
>             +- error/
>             |   +- 404.html
>             |   +- 5xx.html
>             +- <other public assets>
> ```
>
> ### 多端点服务
>
> - 在[快速启动](https://gitee.com/Yeauty/netty-websocket-spring-boot-starter#快速开始)的基础上，在多个需要成为端点的类上使用`@ServerEndpoint`、`@Component`注解即可
> - 可通过`ServerEndpointExporter.getInetSocketAddressSet()`获取所有端点的地址
> - 当地址不同时(即host不同或port不同)，使用不同的`ServerBootstrap`实例
> - 当地址相同,路径(path)不同时,使用同一个`ServerBootstrap`实例
> - 当多个端点服务的port为0时，将使用同一个随机的端口号
> - 当多个端点的port和path相同时，host不能设为`"0.0.0.0"`，因为`"0.0.0.0"`意味着绑定所有的host
