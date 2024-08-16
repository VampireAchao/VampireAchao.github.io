---
title: Apache-fineract
date: 2024-07-14 15:20:20
tags: java
---

> 己所不欲，勿施于人——。孔子

今天看到一个项目不错

https://github.com/apache/fineract

https://fineract.apache.org/

这是一个开源的数字金融服务平台，这里可以看演示

https://www.fineract.dev/

> Fineract 是一个具有开放 API 的成熟平台，可为金融机构提供可靠、强大且价格实惠的核心银行解决方案，为全球 30 亿银行服务不足和无银行账户的人口提供服务。
> 
> 如果本自述文件没有回答您要查找的内容，请查看 apache.org 上的 Wiki 上的常见问题解答。访问我们的 JIRA 仪表板以查找要处理的问题、查看其他人正在处理的内容或提出新问题。
> 
>  ![Code Now! (Gitpod)](https://camo.githubusercontent.com/95fbab4ac41e62a9f66e6d1d78f8249c418b33f8c7739c4f9c593f953f5362de/68747470733a2f2f676974706f642e696f2f627574746f6e2f6f70656e2d696e2d676974706f642e737667) 立即开始在基于 Web 的在线 IDE GitPod.io 中为该项目做出贡献！ （您最初可能必须按 F1 查找命令并运行“Java：启动语言服务器”。）当然也可以使用“传统”本地开发环境进行贡献（见下文）。
> 
> # 社区
> 
> [](https://github.com/apache/fineract#community)
> 
> 如果您有兴趣为这个项目做出贡献，但可能不太知道如何以及从哪里开始，请加入我们的开发人员邮件列表，聆听我们的对话，加入主题，然后向我们发送“您好！”介绍电子邮件；我们是一群友好的人，期待您的来信。
> 
> # 要求
> 
> [](https://github.com/apache/fineract#requirements)
> 
> - `Java >= 17` （Azul Zulu JVM 由我们在 GitHub Actions 上的 CI 进行测试）
> - MariaDB `11.2`
> 
> 您可以在容器中运行所需版本的数据库服务器，而不必安装它，如下所示：
> 
> ```
> docker run --name mariadb-11.2 -p 3306:3306 -e MARIADB_ROOT_PASSWORD=mysql -d mariadb:11.2
> ```
> 
> 并像这样停止并销毁它：
> 
> ```
> docker rm -f mariadb-11.2
> ```
> 
> 请注意，此数据库容器数据库将其状态保存在容器内，而不是保存在主机文件系统上。当您销毁（rm）此容器时，它就会丢失。这通常适合开发。请参阅数据库容器文档中的注意事项：在何处存储数据。如何让它持久而不是短暂。  
> 
> 仅当您希望将 Fineract WAR 部署到单独的外部 servlet 容器时才需要 Tomcat v9。请注意，如果您使用独立的 JAR（它使用 Spring Boot 透明地嵌入 servlet 容器），则不需要安装 Tomcat 来开发 Fineract 或在生产中运行它。 （在 FINERACT-730 之前，还支持 Tomcat 7/8，但现在需要 Tomcat 9。）
> 
> # 
> 
> 重要提示：如果您使用 MySQL 或 MariaDB
> 
> [](https://github.com/apache/fineract#important-if-you-use-mysql-or-mariadb)
> 
> 最近（在发布 `1.7.0` 后），我们在 Fineract 中引入了改进的日期时间处理。从现在开始，日期时间以 UTC 格式存储，我们甚至在 JDBC 驱动程序上也强制执行 UTC 时区，例如： G。对于 MySQL：
> 
> ```
> serverTimezone=UTC&useLegacyDatetimeCode=false&sessionVariables=time_zone=‘-00:00’
> ```
> 
> DO：如果您确实使用 MySQL 作为 Fineract 数据库，那么强烈建议您使用以下配置：
> 
> - 在 UTC 中运行应用程序（我们的 Docker 映像中的默认命令行已设置必要的参数）
> - 以 UTC 运行 MySQL 数据库服务器（如果您使用 AWS RDS 等托管服务，那么这应该是默认值，但最好仔细检查）
> 
> 请勿：如果 Fineract 实例和 MySQL 服务器未在 UTC 中运行，则可能会发生以下情况：
> 
> - MySQL 保存日期时间值的方式与 PostgreSQL 不同
> - 示例场景：如果 Fineract 实例运行在时区：GMT+2，本地日期时间为 2022-08-11 17:15 ...
> - ...然后 PostgreSQL 按原样保存 LocalDateTime：2022-08-11 17:15
> - ...并且MySQL以UTC格式保存LocalDateTime：2022-08-11 15:15
> - ...但是当我们从 PostgreSQL 或 MySQL 读取日期时间时，两个系统都会给我们相同的值：2022-08-11 17:15 GMT+2
> 
> 如果以前使用的 Fineract 实例没有以 UTC 运行（向后兼容），那么 MySQL/MariaDB 将错误地读取所有之前的日期。当您运行数据库迁移脚本时，这可能会导致问题。
> 
> 建议：您需要将数据库中的所有日期移动 Fineract 实例使用的时区偏移量。
> 
> # 
> 
> 说明：如何为当地发展而竞选
> 
> [](https://github.com/apache/fineract#instructions-how-to-run-for-local-development)
> 
> 运行以下命令：
> 
> 1. `./gradlew createDB -PdbName=fineract_tenants`
> 2. `./gradlew createDB -PdbName=fineract_default`
> 3. `./gradlew bootRun`
> 
> # 
> 
> 说明：如何构建 JAR 文件
> 
> [](https://github.com/apache/fineract#instructions-how-to-build-the-jar-file)
> 
> 1. 克隆存储库或下载存档文件并将其解压到本地目录。
> 2. 运行 `./gradlew clean bootJar` 构建一个现代云原生完全自包含的 JAR 文件，该文件将在 `fineract-provider/build/libs` 目录中创建。
> 3. 由于我们不允许在构建的 JAR 中包含 JDBC 驱动程序，因此请下载您选择的 JDBC 驱动程序。例如： `wget https://downloads.mariadb.com/Connectors/java/connector-java-3.3.2/mariadb-java-client-3.3.2.jar`
> 4. 启动jar并将您下载的JDBC驱动程序的目录作为loader.path传递，例如： `java -Dloader.path=. -jar fineract-provider/build/libs/fineract-provider.jar` （不需要外部Tomcat）
> 
> 注意：我们目前还无法升级到 MariaDB 驱动程序的 3.0.x 版本；必须等到 3.0.4 发布才能修复错误。
> 
> 租户数据库连接详细信息是通过环境变量配置的（与 Docker 容器一样），例如像这样：
> 
> ```
> export FINERACT_HIKARI_PASSWORD=verysecret
> ...
> java -jar fineract-provider.jar
> ```
