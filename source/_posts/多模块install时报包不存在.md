---
title: 多模块install时报包不存在
date: 2021-04-01 21:04:30
tags: java
---

> 想升高，有两样东西，那就是必须作鹰，或者作爬行动物——巴尔扎克

今天发现一个坑

就是明明项目能正常运行，`install`一直报错说包找不到不存在

我一看这个包是依赖的另一个`common`模块，它是一个`springboot`工程

我就算`install`了`common`模块没报错，我这里仍然报错找不到包，看`target`目录里确实又存在

思来想去摸不着头脑，于是查阅百度，最后找到了解决方案

在`common`模块中的`pom.xml`找到`spring-boot-maven-plugin`配置的地方

如果没有，则自己新建一个

标签层级为**`project`=>`build`=>`plugins`=>`plugin`**

找到`artifactId`为`spring-boot-maven-plugin`的这层

加上配置`<classifier>exec</classifier>`即可

```xml
<project>
    <build>
    	<plugins>
```

```xml
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <!--  指定主启动类  -->
                    <mainClass>com.ruben.SimpleSpringbootApplication</mainClass>
                    <!--  指定编译为可执行包  -->
                    <classifier>exec</classifier>
                    <!--  排除不需要编译的包  -->
                    <excludes>
                        <exclude>
                            <!--  springboot自定义配置注释处理器  -->
                            <groupId>org.springframework.boot</groupId>
                            <artifactId>spring-boot-configuration-processor</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
```

```xml
		</plugins>
	</build>
</project>
```



注意关键是这个`<classifier>exec</classifier>`