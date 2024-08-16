---
title: Jpom配置自动构建java
date: 2022-11-25 12:38:29
tags: 运维
---

> 对于男人的甜言蜜语，你相信三分之一就好了——莫泊桑

新建仓库：

![image-20221123111807828](/imgs/oss/picGo/image-20221123111807828.png)

新建完成后测试一下重启是否会丢数据(因为我看到默认用的`h2`)

```shell
ps -ef | grep java
kill -9 [jpom对应的pid]
// 默认安装目录在 /usr/local/jpom-server
/usr/local/jpom-server/Server.sh start
```

重启完成发现并没有丢失

![image-20221123113007143](/imgs/oss/picGo/image-20221123113007143.png)

然后配置自动构建

![image-20221123114105995](/imgs/oss/picGo/image-20221123114105995.png)

填入信息

构建命令

```shell
cd ./management && mvn -e -U -DskipTests=true -Ptest clean kotlin:compile package
```

发布命令

```shell
ps -ef | grep management | awk '{print $2}' | xargs kill -9 || true
mv './target/management.jar' '/test/management.jar'
rm -rf '/test/management-log.txt' || true
touch '/test/management-log.txt'
nohup sh /test/manage.sh
```

`manage.sh`

```shell
#!/bin/bash
BUILD_ID=DONTKILLME
function start(){
nohup java -jar '/test/management.jar' > '/test/management-log.txt' 2>&1 &
sleep 5s
exit
}
start
```

