---
title: mybatis-plus代码生成器
date: 2021-03-22 21:48:22
tags: java
---

> 一个能思想的人，才真是一个力量无边的人。——巴尔扎克

你是否对每天重复单表`CRUD`，改`mapper.xml`字段已经感到厌烦？

那么快点来整`mybatis-plus`代码生成器吧！

首先到[官网](https://mp.baomidou.com/guide/generator.html)

并且从`github`拉下来最新的代码~

没错，最新的！

> https://github.com/baomidou/generator

当然，除了`github`，我们也可以选择`gitee`

> https://gitee.com/baomidou/generator

然后用尽你的全力去点`clone`——哦！中文是克隆

![image-20210322215509351](/imgs/oss/picGo/image-20210322215509351.png)

然后你可以喝杯水

![image-20210322215525763](/imgs/oss/picGo/image-20210322215525763.png)

虽然代码拉下来了，但我们还需要使用`gradle`加载依赖~

此时我们可以看看[`README.md`](https://gitee.com/baomidou/generator)

这告诉了我们如何使用

![image-20210322220521507](/imgs/oss/picGo/image-20210322220521507.png)

我们按照说明新建一个启动类(当然如果你想新建一个测试类也可以,这不重要~)

如果你是新建的启动类，那么你需要去`build.gradle`里找到这些`dependencies`

注意，这里有两个`build.gradle`，我们需要选择这一个

![image-20210322220745259](/imgs/oss/picGo/image-20210322220745259.png)

然后把`testImplementation`改为`implementation`

你也可以改你需要的那个，例如`mysql`

如果你选择新建测试类而不是主启动类，那这步可以不用做啦

然后是启动类

```java
package com.baomidou.mybatisplus.generator;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.generator.config.DataSourceConfig;
import com.baomidou.mybatisplus.generator.config.GlobalConfig;
import com.baomidou.mybatisplus.generator.config.PackageConfig;
import com.baomidou.mybatisplus.generator.config.StrategyConfig;
import com.baomidou.mybatisplus.generator.config.rules.NamingStrategy;
import com.baomidou.mybatisplus.generator.fill.Column;


public class MysqlGenerator {
    /**
     * 必要的配置
     */
    // 生成代码的表名
    private static final String TABLE_NAME = "table_person";

    // 数据库相关配置
    private static final String JDBC_URL = "jdbc:mysql://127.0.0.1:3306/ruben?useUnicode=true&characterEncoding=utf-8&useSSL=false&nullCatalogMeansCurrent=true&serverTimezone=Asia/Shanghai";
    private static final String USERNAME = "root";
    private static final String PASSWORD = "789456";

    // 注释显示的作者
    private static final String AUTHOR = "<achao1441470436@gmail.com>";

    // 代码生成指定包名
    private static final String PACKAGE_NAME = "com.cloud.tenant";

    public static void main(String[] args) throws ClassNotFoundException {
        String dir = System.getProperty("user.dir");
        DataSourceConfig dataSourceConfig = new DataSourceConfig.Builder(JDBC_URL, USERNAME, PASSWORD).build();
        // 指定代码生成路径
        String fileDir = dir + "/src/main/java";
        System.out.println(fileDir);
        GlobalConfig global = new GlobalConfig.Builder().author(AUTHOR).outputDir(fileDir).openDir(false).build();
        // 指定包名
        PackageConfig packageInfo = new PackageConfig.Builder().parent(PACKAGE_NAME).build();

        StrategyConfig strategy = new StrategyConfig.Builder()
            // 指定表名，如不指定，则默认生成所有
//            .addInclude(TABLE_NAME)
            // 开启restStyle 开启后为@RestController 反之@Controller
            .controllerBuilder().enableRestStyle()
            .serviceBuilder()
            .entityBuilder()
            // ID类型，这里IdType是个枚举
            .idType(IdType.AUTO)
            // 表名命名转换，这里是下划线转驼峰
            .naming(NamingStrategy.underline_to_camel)
            // 表字段名转换，下划线转驼峰
            .columnNaming(NamingStrategy.underline_to_camel)
            // 开启lombok
            .enableLombok()
            // 开启链式编程
            .enableChainModel()
            // 开启序列化ID
            .enableSerialVersionUID()
            // 配置逻辑删除字段
            .logicDeleteColumnName("is_delete")
            // 配置自动填充字段
            .addTableFills(new Column("gmt_create", FieldFill.INSERT),
                new Column("gmt_modified", FieldFill.UPDATE)).build();

        AutoGenerator autoGenerator = new AutoGenerator(dataSourceConfig);
        autoGenerator.global(global);
        autoGenerator.packageInfo(packageInfo);
        autoGenerator.strategy(strategy);
        autoGenerator.execute();
    }

}
```

我还简单配置了`Controller`和`POJO`生成的模板，更易用了

完整代码在[这里](https://gitee.com/VampireAchao/simple-generator.git)