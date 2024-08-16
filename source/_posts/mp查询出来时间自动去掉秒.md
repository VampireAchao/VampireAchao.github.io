---
title: mp查询出来时间自动去掉秒
date: 2023-02-07 22:16:03
tags: java
---

> 陷入经济困境的人，是最容易被利用的——加藤谛三

由于需求变动，原先存入为`LocalDateTime`的，现在需要精确到分，但保留数据库原有的数据

所以查询时，只精确到分，将秒去掉

我们使用`typeHandler`，将秒设置为`00`

首先添加`@TableName(autoResultMap = true)`然后添加`@TableField(typeHandler = DeSecondHandler.class)`

```java
package com.ruben.simplestreamquery.pojo.po;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.ruben.simplestreamquery.handler.DeSecondsHandler;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * RoleInfo
 *
 * @author VampireAchao
 * @since 2022/5/23
 */
@Data
@TableName(autoResultMap = true)
public class RoleInfo {

    private String id;
    private String roleName;
    @TableField(typeHandler = DeSecondsHandler.class)
    private LocalDateTime time;
}

```

`DeSecondsHandler`代码如下：

```java
package com.ruben.simplestreamquery.handler;

import org.apache.ibatis.type.LocalDateTimeTypeHandler;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Objects;

/**
 * DeSecondsHandler
 *
 * @author VampireAchao
 * @since 2023/2/7
 */
public class DeSecondsHandler extends LocalDateTimeTypeHandler {

    private static final DateTimeFormatter DE_SECONDS_PATTERN = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    @Override
    public LocalDateTime getNullableResult(ResultSet rs, String columnName) throws SQLException {
        LocalDateTime dateTime = super.getNullableResult(rs, columnName);
        if (Objects.isNull(dateTime)) {
            return null;
        }
        return LocalDateTime.parse(dateTime.format(DE_SECONDS_PATTERN), DE_SECONDS_PATTERN);
    }
}

```

执行效果：

![image-20230207222625207](/imgs/oss/blog/vampireachao/image-20230207222625207.png)

