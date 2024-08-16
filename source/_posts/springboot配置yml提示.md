---
title: springboot配置yml提示
date: 2021-02-17 13:39:48
tags: java
---

> 文变染乎世情，兴废系乎时序。——刘勰

按照[`springboot`官方文档](https://docs.spring.io/spring-boot/docs/2.3.2.RELEASE/reference/html/appendix-configuration-metadata.html#configuration-metadata-format)

首先我们添加依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
    <optional>true</optional>
</dependency>
```

并在`maven-plugin`中排除依赖，因为我们`maven`进行编译、打包等并不需要它

```xml
<project>
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.springframework.boot</groupId>
                            <artifactId>spring-boot-configuration-processor</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

如果在项目中使用`AspectJ`，则需要确保注释处理器仅运行一次，所以我们再配置

```xml
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <configuration>
                    <proc>none</proc>
                </configuration>
            </plugin>
```

完整的`xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.3.2.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.ruben</groupId>
    <artifactId>simple-springboot</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>simple-springboot</name>
    <description>Demo project for Spring Boot</description>

    <properties>
        <java.version>1.8</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-thymeleaf</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!--引入AOP依赖-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-aop</artifactId>
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


        <dependency>
            <groupId>com.aliyun</groupId>
            <artifactId>aliyun-java-sdk-core</artifactId>
            <version>4.1.1</version>
        </dependency>
        <dependency>
            <groupId>com.aliyun</groupId>
            <artifactId>aliyun-java-sdk-green</artifactId>
            <version>3.6.1</version>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>fastjson</artifactId>
            <version>1.2.51</version>
        </dependency>
        <dependency>
            <groupId>com.aliyun.oss</groupId>
            <artifactId>aliyun-sdk-oss</artifactId>
            <version>2.8.3</version>
        </dependency>

        <dependency>
            <groupId>commons-io</groupId>
            <artifactId>commons-io</artifactId>
            <version>2.4</version>
        </dependency>
        <dependency>
            <groupId>commons-codec</groupId>
            <artifactId>commons-codec</artifactId>
            <version>1.10</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-data-redis -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>
        <dependency>
            <groupId>com.auth0</groupId>
            <artifactId>java-jwt</artifactId>
            <version>3.4.0</version>
        </dependency>

        <dependency>
            <groupId>me.zhyd.oauth</groupId>
            <artifactId>JustAuth</artifactId>
            <version>1.15.6</version>
        </dependency>

        <dependency>
            <groupId>org.jsoup</groupId>
            <artifactId>jsoup</artifactId>
            <version>1.10.2</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/org.mybatis.spring.boot/mybatis-spring-boot-starter -->
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>2.1.3</version>
        </dependency>

        <!-- sqlite驱动 -->
        <!-- https://mvnrepository.com/artifact/org.xerial/sqlite-jdbc -->
        <dependency>
            <groupId>org.xerial</groupId>
            <artifactId>sqlite-jdbc</artifactId>
            <version>3.32.3.2</version>
        </dependency>
        <!--    mysql驱动    -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.11</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/javax.mail/javax.mail-api -->
        <dependency>
            <groupId>com.sun.mail</groupId>
            <artifactId>javax.mail</artifactId>
            <version>1.5.4</version>
        </dependency>
        <!--    mybatis-plus    -->
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>3.1.0</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/org.apache.commons/commons-lang3 -->
        <dependency>
            <groupId>org.apache.commons</groupId>
            <artifactId>commons-lang3</artifactId>
            <version>3.11</version>
        </dependency>
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-alicloud-oss</artifactId>
        </dependency>
        <dependency>
            <groupId>com.aliyun.oss</groupId>
            <artifactId>aliyun-sdk-oss</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>
        <!--  拼音转换  -->
        <dependency>
            <groupId>com.belerweb</groupId>
            <artifactId>pinyin4j</artifactId>
            <version>2.5.0</version>
        </dependency>
        <!-- html转图片 -->
        <dependency>
            <groupId>com.github.xuwei-k</groupId>
            <artifactId>html2image</artifactId>
            <version>0.1.0</version>
        </dependency>
        <!--    操作word    -->
        <dependency>
            <groupId>e-iceblue</groupId>
            <artifactId>spire.doc.free</artifactId>
            <version>3.9.0</version>
        </dependency>
        <!-- quartz -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-quartz</artifactId>
        </dependency>
        <!-- https://mvnrepository.com/artifact/com.google.code.gson/gson -->
        <dependency>
            <groupId>com.google.code.gson</groupId>
            <artifactId>gson</artifactId>
            <version>2.8.6</version>
        </dependency>
        <!--    apache http前置依赖    -->
        <dependency>
            <groupId>com.sun.jersey</groupId>
            <artifactId>jersey-servlet</artifactId>
            <version>1.19</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-configuration-processor</artifactId>
            <optional>true</optional>
        </dependency>
    </dependencies>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>com.alibaba.cloud</groupId>
                <artifactId>spring-cloud-alibaba-dependencies</artifactId>
                <version>2.2.0.RELEASE</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <!-- 设定仓库 -->

    <repositories>
        <repository>
            <id>com.e-iceblue</id>
            <url>http://repo.e-iceblue.cn/repository/maven-public/</url>
        </repository>
        <repository>
            <id>aliyun-repos</id>
            <url>https://maven.aliyun.com/repository/public</url>
            <releases>
                <enabled>true</enabled>
            </releases>
            <snapshots>
                <enabled>false</enabled>
            </snapshots>
        </repository>
        <repository>
            <id>sonatype-repos-s</id>
            <name>Sonatype Repository</name>
            <url>https://oss.sonatype.org/content/repositories/snapshots</url>
            <releases>
                <enabled>false</enabled>
            </releases>
            <snapshots>
                <enabled>true</enabled>
            </snapshots>
        </repository>
    </repositories>
    <pluginRepositories>
        <pluginRepository>
            <id>aliyun-repos</id>
            <url>https://maven.aliyun.com/repository/public</url>
        </pluginRepository>
    </pluginRepositories>

    <build>
        <resources>
            <!-- maven项目中src源代码下的xml等资源文件编译进classes文件夹，
              注意：如果没有这个，它会自动搜索resources下是否有mapper.xml文件，
              如果没有就会报org.apache.ibatis.binding.BindingException: Invalid bound statement (not found): com.pet.mapper.PetMapper.selectByPrimaryKey-->
            <resource>
                <directory>src/main/java</directory>
                <includes>
                    <include>**/*.xml</include>
                </includes>
            </resource>

            <!--将resources目录下的配置文件编译进classes文件  -->
            <resource>
                <directory>src/main/resources</directory>
            </resource>
        </resources>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <configuration>
                    <proc>none</proc>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <mainClass>com.ruben.SimpleSpringbootApplication</mainClass>
                    <excludes>
                        <exclude>
                            <groupId>org.springframework.boot</groupId>
                            <artifactId>spring-boot-configuration-processor</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>


            <plugin>
                <groupId>com.google.cloud.tools</groupId>
                <artifactId>jib-maven-plugin</artifactId>
                <version>2.4.0</version>
                <configuration>
                    <container>
                        <mainClass>com.ruben.SimpleSpringbootApplication</mainClass>
                    </container>
                    <allowInsecureRegistries>true</allowInsecureRegistries>
                    <!-- 相当于 Dockerfile 中的 FROM -->
                    <from>
                        <image>openjdk:8-jre-alpine</image>
                    </from>
                    <to>
                        <!--构建镜像名称，这里我使用maven中定义的项目名称-->
                        <image>vampireachao/${project.name}</image>
                        <!--私有仓库的账号密码-->
                        <auth>
                            <username>vampireachao</username>
                            <password></password>
                        </auth>
                        <!--Docker 镜像的 tag 这里使用maven定义的版本号-->
                        <tags>
                            <tag>
                                ${project.version}
                            </tag>
                        </tags>
                    </to>
                </configuration>
            </plugin>
        </plugins>
    </build>


</project>
```

然后是开始配置注释，在`resources`下新建文件`additional-spring-configuration-metadata.json`

![image-20210217134616103](/imgs/oss/picGo/image-20210217134616103.png)

例如我们这里如果需要配置这样的提示

![image-20210217134730232](/imgs/oss/picGo/image-20210217134730232.png)

我们就可以在`additional-spring-configuration-metadata.json`里这样写

```json
{
  "properties": [
    {
      "name": "ruben.number",
      "defaultValue": 4444
    },
    {
      "name": "ruben.avatar",
      "defaultValue": "/imgs/oss/2020-06-01/head.jpg"
    },
    {
      "name": "ruben.gender",
      "type": "com.ruben.enumeration.GenderEnum",
      "defaultValue": "MALE"
    },
    {
      "name": "ruben.hobby",
      "defaultValue": [
        "游戏",
        "动漫",
        "编程"
      ]
    },
    {
      "name": "ruben.introduce",
      "defaultValue": {
        "food": "blood",
        "programLanguage": "java"
      }
    }
  ]
}
```

然后我们就能看到配置的提示生效了

![image-20210217134823805](/imgs/oss/picGo/image-20210217134823805.png)

关于这里参数的具体含义

| 名称           | 类型        | 作用                                                         |
| :------------- | :---------- | :----------------------------------------------------------- |
| `name`         | String      | 属性的全名。名称以小写的句点分隔（例如`server.address`）。此属性是必需的。 |
| `type`         | String      | 属性的数据类型的完整签名（例如`java.lang.String`），还包含完整的通用类型（例如`java.util.Map<java.lang.String,acme.MyEnum>`）。您可以使用此属性指导用户输入的值的类型。为了保持一致性，通过使用原始包装的对应对象来指定原始类型（例如，`boolean`变为`java.lang.Boolean`）。请注意，此类可能是一个复杂的类型，当`String`绑定值时会从转换为此类。如果类型未知，则可以省略。 |
| `description`  | String      | 可以显示给用户的属性的简短描述。如果没有可用的描述，则可以省略。建议使用简短的描述，第一行提供简要的摘要。说明的最后一行应以句点（`.`）结尾。 |
| `sourceType`   | String      | 贡献此属性的源的类名。例如，如果属性来自带有注释的类`@ConfigurationProperties`，则此属性将包含该类的完全限定名称。如果源类型未知，则可以省略。 |
| `defaultValue` | Object      | 默认值，如果未指定该属性，则使用该默认值。如果属性的类型是数组，则它可以是值的数组。如果默认值未知，则可以省略。 |
| `deprecation`  | Deprecation | 指定是否不推荐使用该属性。如果不建议使用该字段，或者该信息未知，则可以将其省略。 |

`deprecation`每个`properties`元素的属性中包含的JSON对象可以包含以下属性：

| 名称          | 类型   | 作用                                                         |
| :------------ | :----- | :----------------------------------------------------------- |
| `level`       | String | 弃用级别，可以是`warning`（默认值）或`error`。当某个属性具有`warning`弃用级别时，它仍应绑定在环境中。但是，当它具有`error`弃用级别时，该属性将不再受管理且不受约束。 |
| `reason`      | String | 关于不推荐使用该属性的原因的简短描述。如果没有理由，则可以省略。建议使用简短的描述，第一行提供简要的摘要。说明的最后一行应以句点（`.`）结尾。 |
| `replacement` | String | *替换*此不推荐使用的属性的属性的全名。如果无法替代此属性，则可以省略 |

更多配置可以看[`springboot`官方文档](https://docs.spring.io/spring-boot/docs/2.3.2.RELEASE/reference/html/appendix-configuration-metadata.html#configuration-metadata-format)