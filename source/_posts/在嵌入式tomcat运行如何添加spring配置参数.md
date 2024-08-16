---
title: 在嵌入式tomcat运行如何添加spring配置配置参数
date: 2024-07-06 14:34:10
tags: java
---

> placehloder

我们知道，在`springboot`用`jar`运行时，可以通过指定参数来进行配置

```bash
java -jar myapp.jar --server.port=8081 --spring.datasource.url=jdbc:mysql://localhost:3306/mydb
```

如果是`tomcat`运行，则有下列几种方式

1. **在 `CATALINA_OPTS` 环境变量中设置参数**：
   
   你可以在 Tomcat 的环境变量 `CATALINA_OPTS` 中添加 Spring 配置参数。例如，编辑 `setenv.sh`（Linux）或 `setenv.bat`（Windows）文件，添加以下内容：
   
   ```bash
   # setenv.sh (Linux)
   export CATALINA_OPTS="$CATALINA_OPTS -Dserver.port=8081 -Dspring.datasource.url=jdbc:mysql://localhost:3306/mydb"
   ```
   
   ```bat
   rem setenv.bat (Windows)
   set CATALINA_OPTS=%CATALINA_OPTS% -Dserver.port=8081 -Dspring.datasource.url=jdbc:mysql://localhost:3306/mydb
   ```

2. **通过 `context.xml` 文件传递参数**：
   
   你也可以在 Tomcat 的 `context.xml` 文件中添加参数配置。编辑 `conf/context.xml` 文件，添加以下内容：
   
   ```xml
   <Context>
       <Parameter name="server.port" value="8081" override="false"/>
       <Parameter name="spring.datasource.url" value="jdbc:mysql://localhost:3306/mydb" override="false"/>
   </Context>
   ```

3. **通过 `web.xml` 文件传递参数**：
   
   如果你的 Spring 应用部署在传统的 Tomcat 中，你也可以在 `web.xml` 文件中添加上下文参数：
   
   ```xml
   <context-param>
       <param-name>server.port</param-name>
       <param-value>8081</param-value>
   </context-param>
   <context-param>
       <param-name>spring.datasource.url</param-name>
       <param-value>jdbc:mysql://localhost:3306/mydb</param-value>
   </context-param>
   ```

### 示例案例

假设我们有一个简单的 Spring Boot 应用 `myapp.jar`，并且我们希望通过命令行参数传递端口和数据源 URL 配置：

```bash
java -jar myapp.jar --server.port=8081 --spring.datasource.url=jdbc:mysql://localhost:3306/mydb
```

对于传统的 Tomcat，假设我们已经在 `CATALINA_HOME` 环境变量中设置了 Tomcat 的安装目录，并且我们的 Spring 应用已经打包为 `myapp.war` 部署在 Tomcat 中。我们可以在 `setenv.sh`（Linux）或 `setenv.bat`（Windows）文件中添加如下配置：

```bash
# setenv.sh (Linux)
export CATALINA_OPTS="$CATALINA_OPTS -Dserver.port=8081 -Dspring.datasource.url=jdbc:mysql://localhost:3306/mydb"
```

```bat
rem setenv.bat (Windows)
set CATALINA_OPTS=%CATALINA_OPTS% -Dserver.port=8081 -Dspring.datasource.url=jdbc:mysql://localhost:3306/mydb
```

通过这种方式，无论是在嵌入式 Tomcat 还是传统的 Tomcat 环境中，我们都可以灵活地传递 Spring 配置参数。
