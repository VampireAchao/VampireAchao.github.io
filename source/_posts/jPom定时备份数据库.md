---
title: jPom定时备份数据库
date: 2023-01-19 17:49:20
tags: 运维
---

> 近朱者赤，近墨者黑——傅玄

分享`Jpom`配置数据库定时备份脚本配置，官网有篇[`docker`版本的](https://jpom.top/pages/practice/node-script-backup-docker-mysql/#%E5%88%9B%E5%BB%BA%E8%84%9A%E6%9C%AC)

但我的不是`docker`

所以新建一个

![image-20230119181243912](/imgs/oss/picGo/image-20230119181243912.png)

![image-20230119181303080](/imgs/oss/picGo/image-20230119181303080.png)

```shell
echo '开始备份数据'
 
now=$(date "+%Y%m%d_%H:%M:%S")
backup_dir="/data/back_up"

#mysqldump导出表结构和数据
if [ ! -d ${backup_dir} ]; then
    mkdir -p ${backup_dir}
fi
 
mysqldump --single-transaction -u 数据库账户 -h 127.0.0.1 --password=数据库密码 --all-databases > ${backup_dir}/db_${now}.sql
 
echo '成功制作备份sql'
 
if [ $? -ne 0 ]; then
    echo 'mysqldump运行失败'
    exit
    EOF
fi
 
exit
 
EOF
```

还可以配置定时备份

![image-20230119181448093](/imgs/oss/picGo/image-20230119181448093.png)

