---
title: 自用模板sql
date: 2021-07-08 23:19:40
tags: 数据库
---

> 真正的伟人，能在愚昧和喧嚣的物质世界中，静心倾听荒漠的声音。——深泉学院（美国）

自用`sql`，我建站时每张表必备如下字段：

```sql
DROP TABLE IF EXISTS `common_template`;
CREATE TABLE `common_template`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `gmt_deleted`datetime(0) DEFAULT NULL COMMENT  '逻辑删除字段 NULL未删除 有值表示已删除，值为删除时间',
  `gmt_create` datetime(0) NOT NULL COMMENT '现在时表示主动式创建',
  `gmt_modified` datetime(0) NOT NULL COMMENT '过去分词表示被动式更新',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;
```

