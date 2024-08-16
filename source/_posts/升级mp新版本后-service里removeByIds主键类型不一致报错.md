---
title: 升级mp新版本后,service里removeByIds主键类型不一致报错
date: 2023-01-06 12:42:39
tags: java
---

> 先谋后事者逸，先事后图者失。——陈子昂

场景：

主键类型是`Integer`，使用`service`中`removeByIds`，传入`List<String>`报错

`MP`用的`mybatis`的反射，只需要在表信息初始化后，获取反射的缓存`map`，往里面放入我们自定义的转换操作即可

代码如下：

```java
import com.baomidou.mybatisplus.autoconfigure.MybatisPlusAutoConfiguration;
import com.baomidou.mybatisplus.core.metadata.TableInfo;
import com.baomidou.mybatisplus.core.metadata.TableInfoHelper;
import io.github.vampireachao.stream.core.reflect.ReflectHelper;
import io.github.vampireachao.stream.core.stream.Steam;
import org.apache.ibatis.reflection.Reflector;
import org.apache.ibatis.reflection.invoker.Invoker;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.ConversionService;

import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.Map;

/**
 * @author VampireAchao
 * @since 2023/1/5 16:34
 */
@Configuration
public class MpConfig {

    public MpConfig(MybatisPlusAutoConfiguration config, ConversionService conversionService) {
        final List<TableInfo> tableInfos = TableInfoHelper.getTableInfos();
        Steam.of(tableInfos).parallel().forEach(tableInfo -> {
            final Reflector reflector = tableInfo.getReflector();
            final Map<String, Invoker> setMethods = ReflectHelper.getFieldValue(reflector, "setMethods");
            setMethods.computeIfPresent(tableInfo.getKeyProperty(), (k, v) -> new Invoker() {

                @Override
                public Object invoke(Object target, Object[] args) throws IllegalAccessException, InvocationTargetException {
                    final Object convert = conversionService.convert(args[0], v.getType());
                    return v.invoke(target, new Object[]{convert});
                }

                @Override
                public Class<?> getType() {
                    return v.getType();
                }
            });
        });
    }

}
```

