---
title: webflux之webclient踩坑tablefield
date: 2024-02-09 04:43:06
tags: java
---

> 任难任之事，要有力而无气；处难处之人，要有知而无言。——金缨

今天踩坑发现使用`webclient`发起请求

```java


import com.alibaba.nacos.common.utils.JacksonUtils;
import org.dromara.streamquery.stream.core.collection.Lists;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Objects;

/**
 * MallClient
 *
 * @author achao@apache.org
 */
@Service
public class MallClient {

    private final WebClient webClient;

    public MallClient(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("http://mall-service").build();
    }

    public Mono<Boolean> incrementPointsByUserId(List<UserAccountDTO> accounts) {
        accounts.removeIf(account -> Objects.isNull(account.getPointsNum()) ||
                Objects.equals(account.getPointsNum(), 0L));
        if (Lists.isEmpty(accounts)) {
            return Mono.empty();
        }
        return webClient.post()
                .uri("/foo")
                .bodyValue(JacksonUtils.toJson(bar))
                .retrieve().bodyToMono(String.class)
                .map(str -> {
                    var node = JacksonUtils.toObj(str);
                    if (!JsonUtils.isResOk(node)) {
                        throw new ApiServerException("incrementPointsByUserId failed");
                    }
                    return true;
                })
                .doOnError(Throwable::printStackTrace);
    }

}

```

然后是调用代码：

```java
import jakarta.annotation.Resource;
import org.dromara.streamquery.stream.core.collection.Lists;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import reactor.test.StepVerifier;

/**
 * MallClientTest
 *
 * @author achao@apache.org
 */
@SpringBootTest
class MallClientTest {

    @Resource
    private MallClient mallClient;

    @Test
    void incrementPointsByUserIdTest() {
        var userAccount = new UserAccountDTO();
        userAccount.setUserId(9052710354240385086L);
        userAccount.setPointsNum(100L);
        userAccount.setPointSceneType(PointSceneType.WORD_CHAIN);
        StepVerifier.create(mallClient.incrementPointsByUserId(
                        Lists.of(userAccount)))
                .expectNextMatches(result -> result.equals(true))
                .expectComplete()
                .verify();
    }

}

```

发现调用一直抛出`java.lang.NoClassDefFoundError`说是`mybatis`的`org.apache.ibatis.type.JdbcType`找不到...

最后排查发现`UserAccountDTO`里有个字段加了注解`com.baomidou.mybatisplus.annotation.TableField`

而我在`webflux`项目中默认使用的

```xml
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <scope>provided</scope>
        </dependency>
```

最后去掉`TableField`解决了
