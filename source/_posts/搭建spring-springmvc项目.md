---
title: 搭建spring+springmvc项目
date: 2020-08-06 19:25:51
tags: java
---

新建一个`Maven`项目

![image-20200806192838818](/imgs/oss/picGo/image-20200806192838818.png)

![image-20200806192854967](/imgs/oss/picGo/image-20200806192854967.png)

填写项目名

![image-20200806192952866](/imgs/oss/picGo/image-20200806192952866.png)

引入依赖

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>webdemo</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>war</packaging>
    <properties>
        <org.springframework.version>4.3.19.RELEASE</org.springframework.version>
        <commons-logging.version>1.2</commons-logging.version>
        <junit.version>4.12</junit.version>
        <slf4j.version>1.6.4</slf4j.version>
        <lombok.version>1.18.10</lombok.version>
        <jackson.version>2.8.2</jackson.version>
    </properties>

    <dependencies>
        <!-- Spring核心依赖 -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-core</artifactId>
            <version>${org.springframework.version}</version>
        </dependency>
        <!-- Spring beans包-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-beans</artifactId>
            <version>${org.springframework.version}</version>
        </dependency>
        <!-- Spring 容器包 -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>${org.springframework.version}</version>
        </dependency>
        <!-- Spring容器依赖包,将第三方库整合进Spring应用上下文,提供支持 -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context-support</artifactId>
            <version>${org.springframework.version}</version>
        </dependency>
        <!-- Spring aop依赖 -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-aop</artifactId>
            <version>${org.springframework.version}</version>
        </dependency>
        <!-- Spring aspects依赖 -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-aspects</artifactId>
            <version>${org.springframework.version}</version>
        </dependency>
        <!-- aspectj依赖 -->
        <dependency>
            <groupId>org.aspectj</groupId>
            <artifactId>aspectjrt</artifactId>
            <version>1.9.4</version>
        </dependency>
        <!-- commons-logging依赖 -->
        <dependency>
            <groupId>commons-logging</groupId>
            <artifactId>commons-logging</artifactId>
            <version>${commons-logging.version}</version>
        </dependency>
        <!-- Spring jdbc依赖 -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-jdbc</artifactId>
            <version>${org.springframework.version}</version>
        </dependency>
        <!--Spring事务依赖 -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-tx</artifactId>
            <version>${org.springframework.version}</version>
        </dependency>
        <!-- Spring web依赖 -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-web</artifactId>
            <version>${org.springframework.version}</version>
        </dependency>
        <!--Spring webmvc依赖 -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>${org.springframework.version}</version>
        </dependency>
        <!-- Spring test依赖 -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-test</artifactId>
            <version>${org.springframework.version}</version>
        </dependency>
        <!-- Jackson Json处理工具包 -->
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>${jackson.version}</version>
        </dependency>
        <!-- junit 单元测试依耐 -->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>${junit.version}</version>
            <scope>test</scope>
        </dependency>
        <!-- 日志处理 -->
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-log4j12</artifactId>
            <version>${slf4j.version}</version>
        </dependency>
        <!--lombok-->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>${lombok.version}</version>
            <scope>provided</scope>
        </dependency>
        <!--servlet-->
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>servlet-api</artifactId>
            <version>2.5</version>
            <scope>provided</scope>
        </dependency>
    </dependencies>
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.5.1</version>
                <configuration>
                    <source>1.8</source>
                    <target>1.8</target>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

![image-20200806194056324](/imgs/oss/picGo/image-20200806194056324.png)

然后新建目录和`web.xml`

![image-20200806194244660](/imgs/oss/picGo/image-20200806194244660.png)

![image-20200806194851987](/imgs/oss/picGo/image-20200806194851987.png)

然后编写配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
                      http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
         version="3.1"
         metadata-complete="true">

    <!-- 配置Post请求乱码 -->
    <filter>
        <filter-name>CharacterEncodingFilter</filter-name>
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <init-param>
            <param-name>encoding</param-name>
            <param-value>utf-8</param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>CharacterEncodingFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>

    <!-- springmvc前端控制器 -->
    <servlet>
        <servlet-name>springMvc</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:spring/springmvc.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>springMvc</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>

</web-app>
```

然后我们发现`springmvc`的配置文件没有，去建一个

![image-20200806195057436](/imgs/oss/picGo/image-20200806195057436.png)

![image-20200806195206579](/imgs/oss/picGo/image-20200806195206579.png)

编写配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
	http://www.springframework.org/schema/beans/spring-beans-4.2.xsd
	http://www.springframework.org/schema/mvc
	http://www.springframework.org/schema/mvc/spring-mvc-4.2.xsd



	http://www.springframework.org/schema/context
	http://www.springframework.org/schema/context/spring-context-4.2.xsd">


    <!-- 配置包扫描器，扫描@Controller注解的类 -->
    <context:component-scan base-package="com.ruben.controller"/>

    <!-- 配置注解驱动 -->
    <mvc:annotation-driven/>
    <mvc:default-servlet-handler/>

    <!-- 视图解析器 -->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/"/>
        <property name="suffix" value=".jsp"/>
    </bean>

    <!-- 配置资源映射 -->
    <mvc:resources location="/static/" mapping="/static/**"/>
</beans>

```

![image-20200806203510208](/imgs/oss/picGo/image-20200806203510208.png)

然后创建我们的`controller`并编写代码

目录在这里，完整代码放在[`git`仓库](https://gitee.com/VampireAchao/simple-spring-springmvc.git)里



![image-20200806225636214](/imgs/oss/picGo/image-20200806225636214.png)

然后是配置`tomcat`，我们可以先打个`war`包

![image-20200806204941326](/imgs/oss/picGo/image-20200806204941326.png)

编译成功后开始配置`tomcat`

![image-20200806205343713](/imgs/oss/picGo/image-20200806205343713.png)

点击添加配置

![image-20200806205421133](/imgs/oss/picGo/image-20200806205421133.png)

![image-20200806205556308](/imgs/oss/picGo/image-20200806205556308.png)

点击修复

![image-20200806205618791](/imgs/oss/picGo/image-20200806205618791.png)

![image-20200806205654597](/imgs/oss/picGo/image-20200806205654597.png)

![image-20200806205707393](/imgs/oss/picGo/image-20200806205707393.png)

然后点击确定就可以运行了

![image-20200806205736298](/imgs/oss/picGo/image-20200806205736298.png)

然后访问

> http://localhost:8080/

发现能跳转到页面了

![image-20200806210154031](/imgs/oss/picGo/image-20200806210154031.png)