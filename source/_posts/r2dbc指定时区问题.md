---
title: r2dbc指定时区问题
date: 2022-10-28 16:26:55
tags: java
---

> 政治能把一个人突然变老——巴尔扎克

今天看见这个警告

![image-20221028162804973](/imgs/oss/picGo/image-20221028162804973.png)

我的配置项如下：

```java
import cn.hutool.core.util.StrUtil;
import com.alibaba.druid.util.JdbcUtils;
import com.baomidou.dynamic.datasource.spring.boot.autoconfigure.DataSourceProperty;
import com.baomidou.dynamic.datasource.spring.boot.autoconfigure.DynamicDataSourceProperties;
import io.r2dbc.spi.ConnectionFactories;
import io.r2dbc.spi.ConnectionFactory;
import io.r2dbc.spi.ConnectionFactoryOptions;
import io.r2dbc.spi.Option;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;
import java.util.Map;

import static io.r2dbc.spi.ConnectionFactoryOptions.*;

@Configuration
public class R2dbcConfig {

	@Bean
    public ConnectionFactory connectionFactory(DynamicDataSourceProperties dataSource) {
        Map<String, DataSourceProperty> datasourceMap = dataSource.getDatasource();
        DataSourceProperty master = datasourceMap.get("master");
        String host = StrUtil.subBetween(master.getUrl(), "mysql://", ":");
        String port = StrUtil.subBetween(master.getUrl(), host + ":", "/");
        String database = StrUtil.subBetween(master.getUrl(), port + "/", "?");
        ConnectionFactoryOptions options = ConnectionFactoryOptions.builder()
                .option(DRIVER, JdbcUtils.MYSQL)
                .option(HOST, host)
                .option(USER, master.getUsername())
                .option(PORT, Integer.valueOf(port))  // optional, default 3306
                .option(PASSWORD, master.getPassword()) // optional, default null, null means has no password
                .option(DATABASE, database) // optional, default null, null means not specifying the database
                .option(CONNECT_TIMEOUT, Duration.ofSeconds(3)) // optional, default null, null means no timeout
                .option(Option.valueOf("socketTimeout"), Duration.ofSeconds(4)) // optional, default null, null means no timeout
                .option(SSL, false) // optional, default sslMode is "preferred", it will be ignore if sslMode is set
                .option(Option.valueOf("zeroDate"), "use_null") // optional, default "use_null"
                .option(Option.valueOf("useServerPrepareStatement"), true) // optional, default false
                .option(Option.valueOf("tcpKeepAlive"), true) // optional, default false
                .option(Option.valueOf("tcpNoDelay"), true) // optional, default false
                .option(Option.valueOf("autodetectExtensions"), false) // optional, default false
                .build();
        ConnectionFactory connectionFactory = ConnectionFactories.get(options);
        return connectionFactory;
    }
}
```

我想到能在这里配置时区，于是按照警告提示的`timezone`配置发现不生效、换成`serverTimezone`依旧不行

搜`issue`，没有(这里其实是搜错仓库了，正确的仓库是这个https://github.com/mirromutth/r2dbc-mysql ，在readme里就提到了时区配置)

![image-20221028164154760](/imgs/oss/picGo/image-20221028164154760.png)

翻阅文档，没找到：https://r2dbc.io/

看警告的代码行数`dev.miku.r2dbc.mysql.MySqlConnection:451`

![image-20221028164928797](/imgs/oss/picGo/image-20221028164928797.png)

然后发现调用`convertZoneId`的地方在`97`和`100`行

![image-20221028165528023](/imgs/oss/picGo/image-20221028165528023.png)

于是`debug`，这个`timeZone`和`systemTimeZone`都是从`row`获取到的

看到确实拿到的是乱码

![image-20221028165623346](/imgs/oss/picGo/image-20221028165623346.png)

在`row`里找到了`zeroDateOption`，因为我们上面配置了`zeroDate`为`use_null`，我有印象

![image-20221028165727391](/imgs/oss/picGo/image-20221028165727391.png)

所以看到这里的`serverZoneId`，就试着配置了一下

```java
    @Bean
    public ConnectionFactory connectionFactory(DynamicDataSourceProperties dataSource) {
        Map<String, DataSourceProperty> datasourceMap = dataSource.getDatasource();
        DataSourceProperty master = datasourceMap.get("master");
        String host = StrUtil.subBetween(master.getUrl(), "mysql://", ":");
        String port = StrUtil.subBetween(master.getUrl(), host + ":", "/");
        String database = StrUtil.subBetween(master.getUrl(), port + "/", "?");
        ConnectionFactoryOptions options = ConnectionFactoryOptions.builder()
                .option(DRIVER, JdbcUtils.MYSQL)
                .option(HOST, host)
                .option(USER, master.getUsername())
                .option(PORT, Integer.valueOf(port))  // optional, default 3306
                .option(PASSWORD, master.getPassword()) // optional, default null, null means has no password
                .option(DATABASE, database) // optional, default null, null means not specifying the database
                .option(CONNECT_TIMEOUT, Duration.ofSeconds(3)) // optional, default null, null means no timeout
                .option(Option.valueOf("socketTimeout"), Duration.ofSeconds(4)) // optional, default null, null means no timeout
                .option(SSL, false) // optional, default sslMode is "preferred", it will be ignore if sslMode is set
                .option(Option.valueOf("zeroDate"), "use_null") // optional, default "use_null"
                .option(Option.valueOf("useServerPrepareStatement"), true) // optional, default false
                .option(Option.valueOf("tcpKeepAlive"), true) // optional, default false
                .option(Option.valueOf("tcpNoDelay"), true) // optional, default false
                .option(Option.valueOf("autodetectExtensions"), false) // optional, default false
                .option(Option.valueOf("serverZoneId"), TimeZone.getTimeZone("GMT+8").getID()) // optional
                .build();
        ConnectionFactory connectionFactory = ConnectionFactories.get(options);
        return connectionFactory;
    }
```

然后生效了，不再打印该警告

后来发现`github`人家写了配置项，我自己没找到

![image-20221028165942812](/imgs/oss/picGo/image-20221028165942812.png)