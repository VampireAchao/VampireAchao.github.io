---
title: mysql修改字符集
date: 2022-06-08 13:23:38
tags: 数据库
---

> 我需要，最狂的风，和最静的海。——顾城《世界和我·第八个早晨》

首先是查看字符集格式

```mysql
show variables where variable_name like '%character%'
```

然后是存储过程，用于修改表内所有字段的字符集

```mysql
DROP PROCEDURE
IF
	EXISTS addColumn;

DELIMITER $$
CREATE PROCEDURE addColumn () BEGIN
-- 定义表名变量
	DECLARE
		s_tablename VARCHAR ( 100 );
/*显示表的数据库中的所有表
SELECT table_name FROM information_schema.tables WHERE table_schema='databasename' Order by table_name ;
*/#显示所有
	DECLARE
		cur_table_structure CURSOR FOR SELECT
		table_name 
	FROM
		INFORMATION_SCHEMA.TABLES
        -- databasename = 数据库名称
		
	WHERE
		table_schema = '数据库名称' -- 这里可以加表名前缀条件 AND table_name LIKE 'tb_%' 
		AND table_name NOT IN (
		SELECT
			t.table_name 
		FROM
			( SELECT table_name, column_name FROM information_schema.COLUMNS WHERE table_name IN ( SELECT table_name FROM INFORMATION_SCHEMA.TABLES WHERE table_schema = '数据库名称' ) ) t 
		WHERE
			t.column_name = 'object_name' 
		);
	DECLARE
		CONTINUE HANDLER FOR SQLSTATE '02000' 
		SET s_tablename = NULL;
	OPEN cur_table_structure;
	FETCH cur_table_structure INTO s_tablename;
	WHILE
			( s_tablename IS NOT NULL ) DO
			
			SET @MyQuery = CONCAT( "alter table `", s_tablename, "`CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci" );
		PREPARE MSQL 
		FROM
			@MyQuery;
		EXECUTE MSQL;#USING @c;
		FETCH cur_table_structure INTO s_tablename;
		
	END WHILE;
	CLOSE cur_table_structure;
	
END;
$$ #执行存储过程
CALL addColumn ();
```

然后还可以修改`mysql`配置文件

```cnf
[mysqld]
character_set_server = utf8
```



