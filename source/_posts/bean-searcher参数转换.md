---
title: bean-searcher参数转换
date: 2023-02-18 23:05:59
tags: java
---

> 即使在最丑的孩子身上，也有新鲜的东西，无穷的希望——罗曼·罗兰

昨天写了[bean-searcher支持DbType为UNKNOWN的使用Converter](https://VampireAchao.github.io/2023/02/17/bean-searcher支持DbType为UNKNOWN的使用Converter/)

虽然解决了对应场景的问题：

前端传入枚举的`name`，数据库存储类型为`tinyint`，导致获取`DbType`为`UNKNOWN`，从而没有自定义进入`Convertor`的问题，虽然可以手动在枚举字段上加`@DbField(type=DbType.INT)`让其进入`Converter`，但是即便进入了`Convertor`，由于参数只有`DbType`为`INT`，以及实际的`String`类型的枚举`name`，导致仍然无法获取到其枚举对应类型，就拿不到`name`对应的枚举`ordinal`

但是由于距离发版还有一段时间，或者是低版本想要实现这个需求的场景，就得手动注入`ParamResolver `了

```java
import cn.zhxu.bs.*;
import cn.zhxu.bs.bean.DbType;
import cn.zhxu.bs.boot.BeanSearcherProperties;
import cn.zhxu.bs.group.GroupResolver;
import cn.zhxu.bs.implement.DefaultParamResolver;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @author VampireAchao
 * @since 2023/2/17 11:33
 */
@Component
public class BeanSearcherParamResolver extends DefaultParamResolver {

    public BeanSearcherParamResolver(PageExtractor pageExtractor,
                                     FieldOpPool fieldOpPool,
                                     List<ParamFilter> paramFilters,
                                     List<ParamResolver.Convertor> convertors,
                                     GroupResolver groupResolver,
                                     BeanSearcherProperties config) {
        super(convertors, paramFilters);
        setPageExtractor(pageExtractor);
        setFieldOpPool(fieldOpPool);
        BeanSearcherProperties.Params conf = config.getParams();
        setOperatorSuffix(conf.getOperatorKey());
        setIgnoreCaseSuffix(conf.getIgnoreCaseKey());
        setOrderName(conf.getOrder());
        setSortName(conf.getSort());
        setOrderByName(conf.getOrderBy());
        setSeparator(conf.getSeparator());
        setOnlySelectName(conf.getOnlySelect());
        setSelectExcludeName(conf.getSelectExclude());
        BeanSearcherProperties.Params.Group group = conf.getGroup();
        setGexprName(group.getExprName());
        setGroupSeparator(group.getSeparator());
        setGroupResolver(groupResolver);
    }

    /**
     * @param meta
     * @param value
     * @return
     */
    @Override
    protected Object convertParamValue(FieldMeta meta, Object value) {
        if (value == null) {
            return null;
        }
        DbType dbType = meta.getDbType();
        if (dbType.getType() != null && dbType.getType().isInstance(value)) {
            return value;
        }
        Class<?> vType = value.getClass();
        for (Convertor convertor : getConvertors()) {
            if (convertor instanceof BeanSearcherConvertor) {
                if (((BeanSearcherConvertor) convertor).supports(meta, vType)) {
                    return ((BeanSearcherConvertor) convertor).convert(meta, value);
                }
            }
            if (convertor.supports(dbType, vType)) {
                return convertor.convert(dbType, value);
            }
        }
        return value;
    }

}
```

然后此处的`BeanSearcherConvertor`

```java
import cn.zhxu.bs.FieldMeta;
import cn.zhxu.bs.ParamResolver;

/**
 * @author VampireAchao
 * @since 2023/2/17 15:05
 */
public interface BeanSearcherConvertor extends ParamResolver.Convertor {

    default boolean supports(FieldMeta meta, Class<?> valueType) {
        return supports(meta.getDbType(), valueType);
    }

    default Object convert(FieldMeta meta, Object value) {
        return convert(meta.getDbType(), value);
    }
}
```

以及对应的实现：

```java
import cn.hutool.core.util.EnumUtil;
import cn.zhxu.bs.FieldMeta;
import cn.zhxu.bs.bean.DbType;
import org.springframework.stereotype.Component;

import java.util.Objects;

/**
 * @author VampireAchao
 * @since 2023/2/17 15:27
 */
@Component
public class BeanSearcherEnumConvertor implements BeanSearcherConvertor {
    /**
     * @param meta
     * @param valueType
     * @return
     */
    @Override
    public boolean supports(FieldMeta meta, Class<?> valueType) {
        return meta.getField().getType().isEnum();
    }

    /**
     * @param meta
     * @param value
     * @return
     */
    @Override
    public Object convert(FieldMeta meta, Object value) {
        final Enum valueEnum = EnumUtil.getBy((Class<Enum>) meta.getField().getType(), e -> Objects.equals(e.name(), value));
        if (valueEnum == null) {
            return null;
        }
        return valueEnum.ordinal();
    }

    /**
     * @param dbType    需转换的目标类型
     * @param valueType 值类型
     * @return 是否支持
     */
    @Override
    public boolean supports(DbType dbType, Class<?> valueType) {
        return false;
    }

    /**
     * @param dbType 目标类型
     * @param value  待转换的值
     * @return 转换后的值
     */
    @Override
    public Object convert(DbType dbType, Object value) {
        return value;
    }
}
```

这样，前端就可以传入`gender=MALE`这样的格式，而实际执行的`sql`为`gender = 1`这样了
