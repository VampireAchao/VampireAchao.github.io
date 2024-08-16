---
title: mp中typeHandler自动获取字段类型
date: 2023-03-21 20:27:32
tags: java
---

> 相熟的人表现出恭而敬之的样子总是叫人感到可笑。——歌德

一般我们在实体类上指定

`@TableName(autoResultMap = true)`

即可使用`typeHandler`指定转换器，然后就可以自动转换了

例如`List<XXX>`的`Json`可以如下使用：

```java
    @TableField(typeHandler = JsonListHandler.class)
    private List<CalcUnitEnum> calcUnits;
```

这里`JsonListHandler`如下，`JacksonUtil`就懒得赘述了：

```java
import com.baomidou.mybatisplus.extension.handlers.AbstractJsonTypeHandler;

import java.util.List;

/**
 * @author VampireAchao
 * @since 2023/3/20 17:43
 */
public class JsonListHandler<T> extends AbstractJsonTypeHandler<List<T>> {

    private Class<T> clazz;

    public void setClazz(Class<T> clazz) {
        this.clazz = clazz;
    }

    @Override
    protected List<T> parse(String json) {
        return JacksonUtil.toList(json, clazz);
    }

    @Override
    protected String toJson(List<T> obj) {
        return JacksonUtil.toJson(obj);
    }
}
```

光有这个是不够的，还需要在注入表信息时候，将字段内的泛型拿到

```java

import com.baomidou.mybatisplus.core.handlers.PostInitTableInfoHandler;
import com.baomidou.mybatisplus.core.metadata.TableFieldInfo;
import com.baomidou.mybatisplus.core.metadata.TableInfo;
import io.github.vampireachao.stream.core.reflect.ReflectHelper;
import org.apache.ibatis.mapping.ResultMap;
import org.apache.ibatis.mapping.ResultMapping;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.type.TypeHandler;
import org.springframework.stereotype.Component;

/**
 * @author VampireAchao
 * @since 2023/3/20 18:10
 */
@Component
public class JsonPostInitTableInfoHandler implements PostInitTableInfoHandler {

    /**
     * 参与 TableInfo 初始化
     *
     * @param tableInfo     TableInfo
     * @param configuration Configuration
     */
    @Override
    public void postTableInfo(TableInfo tableInfo, Configuration configuration) {
        for (TableFieldInfo fieldInfo : tableInfo.getFieldList()) {
            if (fieldInfo.getTypeHandler() == null) {
                continue;
            }
            if (tableInfo.getResultMap() == null) {
                return;
            }
            ResultMap resultMap = configuration.getResultMap(tableInfo.getResultMap());
            for (ResultMapping resultMapping : resultMap.getResultMappings()) {
                TypeHandler<?> handler = resultMapping.getTypeHandler();
                if (handler instanceof JsonListHandler) {
                    JsonListHandler<Object> typeHandler = (JsonListHandler<Object>) handler;
                    typeHandler.setClazz((Class<Object>) ReflectHelper.getGenericTypes(fieldInfo.getField().getGenericType())[0]);
                }
            }
        }
        PostInitTableInfoHandler.super.postTableInfo(tableInfo, configuration);
    }
}

```

