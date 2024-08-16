---
title: shaun
date: 2021-09-02 19:47:37
tags: java
---

> 为伟大的事业捐躯，从来就不能算作失败。——拜伦

项目地址：https://gitee.com/baomidou/shaun

> 主要依托 `pac4j-jwt` 来提供默认使用 `JWT` 的 WEB 安全组件
>
> # 优点
>
> - 迅速集成,只需要少量配置+代码即可实现基本的接口防护
> - 默认使用 `jwt` 进行身份认证
> - 灵活的 `jwt` 配置,默认`签名`+`加密`
> - 更多高级功能只需实现对应接口并注入到`spring`容器内
> - 本框架各类均不会使用`session`(`pac4j`提供的类除外)
> - 前后端不分离下,能依托`pac4j`的各种`client`快速集成三方登录(`redirect`跳转那种),例如`oauth`(`qq`,微信) 和 `cas`。

1. 引入`GAV`

```java
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>shaun-spring-boot-starter</artifactId>
            <version>1.2</version>
        </dependency>
```

2. 配置 application.yml

```yaml
shaun:
  salt: 32位字符串,不配置则每次启动不一样导致重启前登录的用户token失效
  stateless: false # 默认 true,表示是前后端分离的
  session-on: false # 默认 false,表示不用session(会影响pac4j的类对session的操作)
  login-url: /admin/login # 如果配置,则会加入 exclude-path 内,前后端不分离下鉴权失败会被重定向到此
  token-location: header_or_cookie # 默认 header,token 的存取位置
  exclude-path: # 排除具体的路径，排除的路径下无法获取到用户信息如角色等
    - /articleInfo/page
  exclude-branch: # 排除以此路径开头，排除的路径下无法获取到用户信息如角色等
    - /css
    - /js
    - /layui
    - /favicon
    - /error
    - /login
  expire-time: # 不设置默认永久有效
```

更多 `yml` 配置[点此查看](https://gitee.com/baomidou/shaun/blob/master/shaun-spring-boot-starter/src/main/java/com/baomidou/shaun/autoconfigure/properties/ShaunProperties.java)

3. 编写登陆代码

```
import com.baomidou.shaun.core.mgt.SecurityManager;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private SecurityManager securityManager;

    @Override
    @Transactional
    public String login() {
        // 登录成功后把用户角色权限信息存储到profile中
        final TokenProfile profile = new TokenProfile();
        profile.setId(userId.toString());
        //profile.addRole(role:String);  
        //profile.setRoles(roles:Set);  
        //profile.addPermission(permission:String);
        //profile.setPermissions(permissions:Set);
        //profile.addAttribute("key","value");
        final String token = securityManager.login(profile);
        //如果选择token存cookie里,securityManager.login会进行自动操作
        return token;
    }
```

4. 注解权限拦截:

> ```
> @HasAuthorization` , `@HasPermission` , `@HasRole
> ```
>
> > 支持注解在`method`上以及`class`上

例:

```
@HasPermission(value = {"add", "edit"}, logical = Logical.BOTH) //权限必须同时存在
@HasPermission(value = {"add", "edit"}, logical = Logical.ANY)  //权限任一存在(默认)
```

5. 如何获取用户信息(不需要安全拦截的接口获取不到哦)

```
TokenProfile profile = ProfileHolder.getProfile();
```

前端如果是`web`端，使用`cookie`就可以，如果是`app`等，也可以使用`header`带`token`

注意默认`token`的`key`为`Authorization`

