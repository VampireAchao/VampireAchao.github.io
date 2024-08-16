---
title: mybatis-plus随机查询工具类
date: 2021-05-17 22:23:05
tags: java
---

> 作为一个人，对父母要尊敬，对子女要慈爱，对穷亲戚要慷慨，对一切人要有礼貌。——(美国)罗素

都封装好了

```java
    /**
     * 随机取几条
     *
     * @param function 表名::列名
     * @return T
     * @author <achao1441470436@gmail.com>
     * @since 2021/5/17 0017 10:34
     */
    @SuppressWarnings("unchecked")
    public static <T, O> List<O> getAny(SFunction<O, T> function, Integer limit) {
        SerializedLambda lambda = Optional.ofNullable(function).map(LambdaUtils::resolve).orElseThrow(() -> ExceptionUtils.mpe("传入条件不能为空"));
        Class<O> entityClass = (Class<O>) lambda.getImplClass();
        TableInfo tableInfo = Optional.ofNullable(entityClass).map(TableInfoHelper::getTableInfo).orElseThrow(() -> ExceptionUtils.mpe("未找到该实体类对应BaseMapper，请注入对应mybatis-plus的BaseMapper"));
        String tableName = tableInfo.getTableName();
        String id = PropertyNamer.methodToProperty(lambda.getImplMethodName());
        List<HashMap<String, Object>> mapList = (List<HashMap<String, Object>>) USER_MAPPER.getAny(tableName, id, limit, entityClass);
        List<TableFieldInfo> fieldList = tableInfo.getFieldList();
        Reflector reflector = new Reflector(entityClass);
        Map<String, Invoker> columnSetterMap = fieldList.parallelStream().collect(Collectors.toMap(tbf -> Optional.ofNullable(tbf).map(TableFieldInfo::getField).map(field -> field.getAnnotation(TableField.class)).map(TableField::value).filter(StringUtils::isNotBlank).orElse(Objects.requireNonNull(tbf).getProperty()), f -> reflector.getSetInvoker(f.getProperty()), (v1, v2) -> v2));
        return mapList.stream().map(map -> {
            O bean = ClassUtils.newInstance(entityClass);
            map.forEach((key, value) -> Optional.ofNullable(key).map(columnSetterMap::get).ifPresent(i -> {
                try {
                    i.invoke(bean, new Object[]{value});
                } catch (IllegalAccessException | InvocationTargetException e) {
                    e.printStackTrace();
                }
            }));
            return bean;
        }).collect(Collectors.toList());
    }

    /**
     * 随机取一条
     *
     * @param function 表名::列名
     * @return O 随便取的
     * @author <achao1441470436@gmail.com>
     * @since 2021/5/17 0017 12:29
     */
    public static <O> O getAnyOne(SFunction<O, ?> function) {
        return getAny(function, 1).parallelStream().findAny().orElse(null);
    }
```

这里的`USER_MAPPER`我们可以使用任意一个`mapper`，我这里使用的是[静态注入](https://VampireAchao.github.io/2020/11/12/spring%E8%8E%B7%E5%8F%96bean%E7%9A%84%E7%AC%AC%E4%B8%89%E7%A7%8D%E6%96%B9%E5%BC%8F/)的方式

```java
    private static final UserMapper USER_MAPPER = SpringContextHolder.getBean(UserMapper.class);
```

然后是`mapper`里的方法

```java
    /**
     * 随机取一条
     *
     * @param tableName  表名
     * @param columnName 列名
     * @param limit      取几条
     * @return O
     * @author <achao1441470436@gmail.com>
     * @since 2021/5/17 0017 10:47
     */
    <O> List<O> getAny(@Param("table_name") String tableName, @Param("id") String columnName, @Param("limit") Integer limit, Class<O> type);
```

以及对应的`xml`

```xml
    <!--  随机取一条  -->
    <select id="getAny" resultType="java.util.Map">
        SELECT *
        FROM ${table_name} AS t1 JOIN (SELECT ROUND(RAND() *((SELECT MAX(${id}) FROM ${table_name}) - (SELECT MIN(${id}) FROM ${table_name})) +(SELECT MIN(${id}) FROM ${table_name})) AS tmp_id) AS t2
        WHERE t1.${id} >= t2.tmp_id
        ORDER BY t1.${id} LIMIT #{limit};
    </select>
```

实际使用场景、方式

![image-20210517222647624](/imgs/oss/picGo/image-20210517222647624.png)
