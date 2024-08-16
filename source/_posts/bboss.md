---
title: bboss
date: 2023-07-08 19:10:50
tags: 软件及插件
---

> 好话一句三冬暖，话不投机六月寒。——佚名

分享一个开源项目

[ETL-Stream-ElasticsearchClient](https://esdoc.bbossgroups.com/#/)

https://github.com/bbossgroups/bboss-elasticsearch

bboss是一个基于开源协议Apache License发布的开源项目，由开源团队[bboss](https://gitee.com/bboss)运维，主要由以下三部分构成：

- Elasticsearch Highlevel Java Restclient ， 一个高性能高兼容性的Elasticsearch/Opensearch java客户端框架
- 数据采集同步ETL ，一个基于java语言实现数据采集作业的强大ETL工具，提供丰富的输入插件和输出插件，可以基于插件规范轻松扩展新的输入插件和输出插件
- 流批一体化计算框架，提供灵活的数据指标统计计算流批一体化处理功能的简易框架，可以结合数据采集同步ETL工具，实现数据流处理和批处理计算，亦可以独立使用；计算结果可以保存到各种关系数据库、分布式数据仓库Elasticsearch、Clickhouse等，适用于数据体量和规模不大的企业数据分析计算场景，具有成本低、见效快、易运维等特点

![](/imgs/oss/picGo/20230708191823.png)

![](/imgs/oss/picGo/20230708191856.png)
