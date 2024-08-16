---
title: mapstruct模板
date: 2024-02-15 23:38:02
tags: java
---

> 自信是成功的秘诀。——韦恩·戴克

分享一个`idea`的`mapstruct`模板

```java
#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end
#parse("File Header.java")

import jakarta.annotation.Nullable;
import org.mapstruct.Mapper;
import org.springframework.core.convert.converter.Converter;

/**
 * ${NAME}Converter
 *
 * @author achao@apache.org
 * @since $DATE
 */
@Mapper(componentModel = "spring")
public interface ${NAME}Converter extends Converter<${SOURCE}, ${TARGET}> {

    @Override
    ${TARGET} convert(@Nullable ${SOURCE} source);
}
```

在这里配置即可

![](/imgs/oss/blog-img/2024-02-14-23-42-03-image.png)

名字是`${NAME}Converter`、后缀`java`、文件名`${NAME}Converter`
