---
title: 为什么总说不要循环调用dao
date: 2021-06-09 22:52:50
tags: java
---

> 我要让全世界都记住我的温柔。——曼德拉

上次咱们测试过了[单表多次查询和连表一次查询的性能比较](https://VampireAchao.github.io/2021/03/31/%E5%8D%95%E8%A1%A8%E5%92%8C%E8%BF%9E%E8%A1%A8%EF%BC%9F%E5%A6%82%E4%BD%95%E9%80%89%E6%8B%A9%EF%BC%9F/)

这次咱们又抽了点时间进行了一次 循坏调用`dao`查询性能测试

同样是那一百万条数据，最后测试结果出乎意料

```java
    @Test
    public void cycleTest() {
        long startTime = System.nanoTime();
        List<Film> films = filmMapper.selectList(Wrappers.lambdaQuery());
        List<Map<String, Object>> collect = films.stream().map(film -> {
            Language language = languageMapper.selectById(film.getLanguageId());
            Language language1 = languageMapper.selectById(film.getLanguageId());
            Map<String, Object> map = BeanUtils.beanToMap(film);
            map.putAll(BeanUtils.beanToMap(language));
            map.putAll(BeanUtils.beanToMap(language1));
            return map;
        }).collect(Collectors.toList());
        long endTime = System.nanoTime();
        System.out.println("耗时：" + ((endTime - startTime) / (1000.0 * 1000.0)) + " ms");        // 循环调用数据库 耗时：302577.2408 ms 第二张表再查一次 耗时：421330.6798 ms
    }
```

我们`left join`连表一次查询需要`33`秒左右

单表查询多次拿到同样的结果`+`使用并行流处理需要`22`秒左右

循环调用`dao`去`selectById`则花费了我们五分钟！！！

这只是从测试结果来看

实际我们可以追根溯源去源码中查看：

比如一个`org.apache.ibatis.session.defaults.DefaultSqlSession#selectList(java.lang.String, java.lang.Object, org.apache.ibatis.session.RowBounds)`

```java
  @Override
  public <E> List<E> selectList(String statement, Object parameter, RowBounds rowBounds) {
    try {
      MappedStatement ms = configuration.getMappedStatement(statement);
      return executor.query(ms, wrapCollection(parameter), rowBounds, Executor.NO_RESULT_HANDLER);
    } catch (Exception e) {
      throw ExceptionFactory.wrapException("Error querying database.  Cause: " + e, e);
    } finally {
      ErrorContext.instance().reset();
    }
  }
```

可以看到我们是每次查询都去调用了`getMappedStatement`

![image-20210609225927769](/imgs/oss/picGo/image-20210609225927769.png)

通过日志也可以看出每次我们查询都会去创建`SqlSession`

![image-20210609230204523](/imgs/oss/picGo/image-20210609230204523.png)

所以它的性能为什么这么慢。。。
