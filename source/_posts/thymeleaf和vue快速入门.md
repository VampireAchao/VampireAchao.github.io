---
title: thymeleaf和vue快速入门
date: 2022-04-24 13:43:33
tags: java
---

> 时间是个常数，但也是个变数。勤奋的人无穷多，懒惰的人无穷少。——字严

今天中午午休抽时间写了个`thymeleaf`和`vue`使用`elementUI`简单入门`Demo`

仓库地址：https://gitee.com/VampireAchao/simple-thymeleaf-html.git

前端代码如下：

```html
<!doctype html>
<html>
<head>
    <title>给胖哥的html页面</title>
    <!-- 引入样式，从这来的 https://element.eleme.cn/#/zh-CN/component/installation#cdn -->
    <link href="https://unpkg.com/element-ui/lib/theme-chalk/index.css" rel="stylesheet">
</head>
<!-- 下面的代码来源 -->
<!-- https://element.eleme.cn/#/zh-CN/component/installation#hello-world -->
<body>
<!-- 下面我们Vue实例绑定了 #app，因此在该节点下的内容会被vue加强 -->
<div id="app">
    <!-- el-button 是 elementUI 按钮组件：https://element.eleme.cn/#/zh-CN/component/button -->
    <!-- @click 是 vue 语法：https://cn.vuejs.org/v2/guide/syntax.html#v-on-%E7%BC%A9%E5%86%99 -->
    <!-- "双大括号"写法(“Mustache”语法)文档：https://cn.vuejs.org/v2/guide/syntax.html#%E6%96%87%E6%9C%AC 简单来说就是引用下面 vue 实例data中的属性值 -->
    <el-button @click="openDialog">{{message}}</el-button>
    <!-- el-dialog 是 elementUI 对话框组件：https://element.eleme.cn/#/zh-CN/component/dialog -->
    <el-dialog :visible.sync="visible" title="弹框标题">
        <!-- thymeleaf 基本语法：https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html#appendix-a-expression-basic-objects -->
        <!-- 注意thymeleaf渲染优先级比html高,此处从request中获取对应的attribute -->
        <p>[[${paramFromServer}]]</p>
    </el-dialog>
    <!-- 之后要啥组件，去文档里找，然后cv下来就行了 -->
    <!-- https://element.eleme.cn/#/zh-CN/component/installation -->
</div>
</body>
<!-- 从这里复制过来的：https://cn.vuejs.org/v2/guide/#%E8%B5%B7%E6%AD%A5  -->
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<!-- 注意顺序，elementUI依赖vue，因此需要先引入vue，此处src来源：https://element.eleme.cn/#/zh-CN/component/installation#cdn 注意有版本号区别 -->
<script src="https://unpkg.com/element-ui@2.15.8/lib/index.js"></script>
<script>
    /* 注意此处new出来的vue实例，能实现双向绑定：https://cn.vuejs.org/v2/guide/instance.html */
    new Vue({
        /* 这里是id选择器，所以要加#号 */
        el: '#app',
        /* data里放双向绑定的数据：https://cn.vuejs.org/v2/guide/instance.html#%E6%95%B0%E6%8D%AE%E4%B8%8E%E6%96%B9%E6%B3%95 */
        data() {
            return {
                visible: false,
                /* 在js中获取，也可以用中括号，但需要用''引起来避免编译报错 */
                message: '[[${message}]]'
            }
        },
        /* methods中定义各种方法 */
        methods: {
            openDialog() {
                // 注意此处的this，此处的this是vue实例，而不是el-button
                // 此处修改visible的值，会触发vue实例的视图更新
                this.visible = true;
            }
        }
    })
</script>
</html>
```

启动类：

```java
package com.ruben.simplethymeleafhtml;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@SpringBootApplication
public class SimpleThymeleafHtmlApplication {

    @Resource
    private HttpServletRequest request;

    public static void main(String[] args) {
        SpringApplication.run(SimpleThymeleafHtmlApplication.class, args);
    }

    @GetMapping("/")
    public String index() {
        request.setAttribute("paramFromServer", "我是controller中返回的值");
        request.setAttribute("message", "我是后端返回的值");
        return "index";
    }

}
```

`GAV`：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://maven.apache.org/POM/4.0.0"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.ruben</groupId>
    <artifactId>simple-thymeleaf-html</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>simple-thymeleaf-html</name>
    <description>simple-thymeleaf-html</description>

    <properties>
        <java.version>1.8</java.version>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <spring-boot.version>2.3.7.RELEASE</spring-boot.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-thymeleaf</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
            <exclusions>
                <exclusion>
                    <groupId>org.junit.vintage</groupId>
                    <artifactId>junit-vintage-engine</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
    </dependencies>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>${spring-boot.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.8.1</version>
                <configuration>
                    <source>1.8</source>
                    <target>1.8</target>
                    <encoding>UTF-8</encoding>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <version>2.3.7.RELEASE</version>
                <configuration>
                    <mainClass>com.ruben.simplethymeleafhtml.SimpleThymeleafHtmlApplication</mainClass>
                </configuration>
                <executions>
                    <execution>
                        <id>repackage</id>
                        <goals>
                            <goal>repackage</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>

</project>
```

