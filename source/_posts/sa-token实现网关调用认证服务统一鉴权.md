---
title: sa-token实现网关调用认证服务统一鉴权
date: 2023-10-07 19:04:06
tags: java
---

> 多言则背道，多欲则伤生。——林逋

按照文档里集成时发现一个问题：

https://sa-token.cc/doc.html#/micro/gateway-auth

其中在`web-flux`的网关处调用认证子服务进行鉴权，按照文档里进行配置后

`checkPermission`函数会调用`StpInterface`，然后我实现的`StpInterface`是同步的，本来用`open-feign`实现后，发现`open-feign`不支持`webflux`！虽然有个三方库 [feign-reactive](https://VampireAchao.github.io/2023/09/30/feign-reactive/) 可以支持，但考虑了下，还是采用`webclient`实现

但由于`webclient`此处不能阻塞调用，所以就手动实现`SaReactorFilter`完成封装

```java
import cn.dev33.satoken.exception.BackResultException;
import cn.dev33.satoken.exception.StopMatchException;
import cn.dev33.satoken.reactor.context.SaReactorHolder;
import cn.dev33.satoken.reactor.context.SaReactorSyncHolder;
import cn.dev33.satoken.reactor.filter.SaReactorFilter;
import cn.dev33.satoken.router.SaRouter;
import cn.dev33.satoken.router.SaRouterStaff;
import cn.dev33.satoken.stp.StpUtil;
import cn.hutool.http.ContentType;
import cn.hutool.http.Header;
import com.alibaba.nacos.common.utils.JacksonUtils;
import com.namaste.rubengateway.api.webclient.AuthService;
import com.namaste.pojo.dto.RubenResponse;
import org.springframework.cloud.client.discovery.ReactiveDiscoveryClient;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Predicate;
import java.util.function.Supplier;

/**
 * SaTokenReactorFilter
 *
 * @author VampireAchao<achao @ hutool.cn>
 * @since 2023/9/27
 */
@Component
public class SaTokenReactorFilter extends SaReactorFilter {

    private final AuthService authService;
    private final ReactiveDiscoveryClient discoveryClient;
    private final LinkedHashMap<Supplier<SaRouterStaff>, Predicate<List<String>>>
            routerRolesPreMap = new LinkedHashMap<>();
    private final LinkedHashMap<Supplier<SaRouterStaff>, Predicate<List<String>>>
            routerPermsPreMap = new LinkedHashMap<>();


    public SaTokenReactorFilter(AuthService authService, ReactiveDiscoveryClient discoveryClient) {
        this.authService = authService;
        this.discoveryClient = discoveryClient;

        // 拦截地址
        addInclude("/**");
        // 开放地址
        addExclude(
                "/auth-service/login/loginWithPhone",
                "/auth-service/login/loginWithPassword",
                "/auth-service/sms/send");

        setAuth(router -> {
            // 登录校验 -- 拦截所有路由 用于开放登录
            SaRouter.match("/**").check(r -> StpUtil.checkLogin());
        });

        // 权限认证 -- 不同模块, 校验不同权限
        addRoleChecker(() -> SaRouter.match("/user-service/test"),
                roles -> roles.contains("user"));

        ruben(() -> SaRouter.match("/user-service/test"),
                permissions -> permissions.contains("user:info:list"));

    }

    private void addRoleChecker(Supplier<SaRouterStaff> matcherSupplier, Predicate<List<String>> rolesPredicate) {
        routerRolesPreMap.put(matcherSupplier, rolesPredicate);
    }

    private void addPermsChrubenSaRouterStaff> matcherSupplier, Predicate<List<String>> permsPredicate) {
        routerPermsPreMap.put(matcherSupplier, permsPredicate);
    }


    public static Mono<Void> writeJsonResponse(ServerWebExchange exchange, Object result) {
        if (exchange.getResponse().getHeaders().getFirst(Header.CONTENT_TYPE.getValue()) == null) {
            exchange.getResponse().getHeaders().set(Header.CONTENT_TYPE.getValue(),
                    ContentType.build(ContentType.JSON, StandardCharsets.UTF_8));
        }
        return exchange.getResponse().writeWith(Mono.just(exchange.getResponse().bufferFactory()
                .wrap(JacksonUtils.toJson(result).getBytes())));
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        // ================ Sa-Token处理（下方有改动请注释注明，升级sa-token版本时用） ==================

        // 写入WebFilterChain对象
        exchange.getAttributes().put(SaReactorHolder.CHAIN_KEY, chain);

        // ---------- 全局认证处理
        try {
            // 写入全局上下文 (同步)
            SaReactorSyncHolder.setContext(exchange);

            // 执行全局过滤器
            beforeAuth.run(null);
            SaRouter.match(includeList).notMatch(excludeList).check(saRouterStaff -> {
                auth.run(null);
            });

        } catch (StopMatchException e) {
            // StopMatchException 异常代表：停止匹配，进入Controller
        } catch (Throwable e) {
            // 1. 获取异常处理策略结果
            String result = (e instanceof BackResultException) ? e.getMessage() : String.valueOf(error.run(e));
            return writeJsonResponse(exchange,RubenwResponse.fail(result));
        } finally {
            // 清除上下文
            SaReactorSyncHolder.clearContext();
        }

        // ---------- 执行

        // 写入全局上下文 (同步)
        SaReactorSyncHolder.setContext(exchange);

        // ================ Sa-Token处理结束（上方有改动请注释注明，升级sa-token版本时用） =================

        Supplier<Mono<Void>> successSupplier = () -> chain.filter(exchange)
                // 写入全局上下文 (异步)
                .contextWrite(ctx -> ctx.put(SaReactorHolder.CONTEXT_KEY, exchange))
                // 清除上下文
                .doFinally(r -> SaReactorSyncHolder.clearContext());

        List<Predicate<List<String>>> rolePredicates = routerRolesPreMap.entrySet().stream()
                .filter(s -> s.getKey().get().match(includeList).notMatch(excludeList).isHit())
                .map(Map.Entry::getValue).toList();
        List<Predicate<List<String>>> permPredicates = routerPermsPreMap.entrySet().stream()
                .filter(s -> s.getKey().get().match(includeList).notMatch(excludeList).isHit())
                .map(Map.Entry::getValue).toList();

        if (rolePredicates.isEmpty() && permPredicates.isEmpty()) {
            return successSupplier.get();
        }

        Mono<Boolean> roleMono = rolePredicates.isEmpty() ? Mono.just(true) :
                authService.getRoleList(StpUtil.getLoginId(), StpUtil.getLoginType())
                        .map(roles -> rolePredicates.stream()
                                .reduce(Predicate::and)
                                .orElseGet(() -> o -> true).test(roles));
        Mono<Boolean> permissionMono = permPredicates.isEmpty() ? Mono.just(true) :
                authService.getPermissionList(StpUtil.getLoginId(), StpUtil.getLoginType())
                        .map(permissions -> permPredicates.stream()
                                .reduce(Predicate::and)
                                .orElseGet(() -> o -> true).test(permissions));

        return Mono.zip(roleMono, permissionMono).flatMap(tuple -> {
            if (tuple.getT1() && tuple.getT2()) {
                return successSupplier.get();
            }
            return writeJsonResponse(exchangeRubenswResponse.fail("权限不足"));
        });
    }


}
```

主要就是这块代码：

```java
        Supplier<Mono<Void>> successSupplier = () -> chain.filter(exchange)
                // 写入全局上下文 (异步)
                .contextWrite(ctx -> ctx.put(SaReactorHolder.CONTEXT_KEY, exchange))
                // 清除上下文
                .doFinally(r -> SaReactorSyncHolder.clearContext());

        List<Predicate<List<String>>> rolePredicates = routerRolesPreMap.entrySet().stream()
                .filter(s -> s.getKey().get().match(includeList).notMatch(excludeList).isHit())
                .map(Map.Entry::getValue).toList();
        List<Predicate<List<String>>> permPredicates = routerPermsPreMap.entrySet().stream()
                .filter(s -> s.getKey().get().match(includeList).notMatch(excludeList).isHit())
                .map(Map.Entry::getValue).toList();

        if (rolePredicates.isEmpty() && permPredicates.isEmpty()) {
            return successSupplier.get();
        }

        Mono<Boolean> roleMono = rolePredicates.isEmpty() ? Mono.just(true) :
                authService.getRoleList(StpUtil.getLoginId(), StpUtil.getLoginType())
                        .map(roles -> rolePredicates.stream()
                                .reduce(Predicate::and)
                                .orElseGet(() -> o -> true).test(roles));
        Mono<Boolean> permissionMono = permPredicates.isEmpty() ? Mono.just(true) :
                authService.getPermissionList(StpUtil.getLoginId(), StpUtil.getLoginType())
                        .map(permissions -> permPredicates.stream()
                                .reduce(Predicate::and)
                                .orElseGet(() -> o -> true).test(permissions));

        return Mono.zip(roleMono, permissionMono).flatMap(tuple -> {
            if (tuple.getT1() && tuple.getT2()) {
                return successSupplier.get();
            }
            return writeJsonResponse(exchangeRubenswResponse.fail("权限不足"));
        });
```

使用的话，`setAuth`里可以进行登陆认证，角色和权限认证就使用`addRoleChecker`和`ruben`即可

```java
        // 拦截地址
        addInclude("/**");
        // 开放地址
        addExclude(
                "/auth-service/login/loginWithPhone",
                "/auth-service/login/loginWithPassword",
                "/auth-service/sms/send");

        setAuth(router -> {
            // 登录校验 -- 拦截所有路由 用于开放登录
            SaRouter.match("/**").check(r -> StpUtil.checkLogin());
        });

        // 权限认证 -- 不同模块, 校验不同权限
        addRoleChecker(() -> SaRouter.match("/user-service/test"),
                roles -> roles.contains("user"));

        ruben(() -> SaRouter.match("/user-service/test"),
                permissions -> permissions.contains("user:info:list"));
```
