---
title: r2dbc自动填充审计字段
date: 2024-03-18 19:47:23
tags: java
---

> 不要企图无所不知，否则你将一无所知。——佚名

在`r2dbc`中自动填充审计字段可以使用`org.springframework.data.annotation.CreatedDate`注解

以及`org.springframework.data.annotation.LastModifiedDate`

例如：

```java
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

/**
 * RtcInspectLog
 *
 * @author achao@apache.org
 */
@Data
public class RtcInspectLog {
    private Long id;
    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;
}
```

然后需要配置`org.springframework.data.r2dbc.config.EnableR2dbcAuditing`

例如

```java
@Configuration
@EnableR2dbcAuditing
class Config {}
```

即可自动填充
