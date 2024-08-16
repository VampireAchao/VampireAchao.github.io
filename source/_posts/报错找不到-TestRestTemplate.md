---
title: 报错找不到 TestRestTemplate
date: 2024-02-28 21:03:11
tags: 
---

> 脑子——认识的能力——是像肌肉一样，靠练习、锻炼而培养起来的。——高尔基

今天遇到个问题：

```bash
Caused by: org.springframework.beans.factory.NoSuchBeanDefinitionException: No qualifying bean of type 'org.springframework.boot.test.web.client.TestRestTemplate' available: expected at least 1 bean which qualifies as autowire candidate.
```

原来是`SpringBootTest`没加`webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT`

加上就好了

```java
import jakarta.annotation.Resource;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;

/**
 * XxxControllerTest
 *
 * @author achao@apache.org
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT) // 确保使用RANDOM_PORT
public class XxxControllerTest {

    @Resource
    private TestRestTemplate restTemplate;

    @Test
    void generateTokenTest() {
        var res = restTemplate.getForEntity("https://xxx.xx", Res.class).getBody();
        Assertions.assertNotNull(res);
    }

}
```
