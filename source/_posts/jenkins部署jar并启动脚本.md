---
title: jenkins部署jar并启动脚本
date: 2022-04-20 12:54:00
tags: 运维
---

> 等到看你银色满际，等到分不清季节更替，才敢说沉溺。——《水星记》

首先是`shell`命令

```shell
# 打包
mvn -DskipTests=true -Ptest clean package
# 结束进程
ps -ef | grep translate_server | awk '{print $2}' | xargs kill -9 || true
# 移动
mv './target/ruben.jar' '/server/ruben.jar'
# 删除日志
rm -f '/test/ruben_log.txt' || true
# 创建日志
touch '/test/ruben_log.txt'
# 静默启动
nohup sh /server/ruben.sh
```

![image-20220420130101989](/imgs/oss/picGo/image-20220420130101989.png)

这里启动的`ruben.sh`如下：

```shell
#!/bin/bash
BUILD_ID=DONTKILLME
function start(){
nohup java -jar '/server/ruben.jar' > '/test/ruben_log.txt' 2>&1 &
sleep 5s
exit
}
start
```

注意`ubuntu`默认执行`sh`脚本用的`dash`，需要改为`bash`

执行

```shell
dpkg-reconfigure dash
```

按右选择`no`，回车即可