---
title: mysql一次给数据库所有表加字段
date: 2020-08-20 19:24:55
tags: 数据库
---

执行脚本

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
		table_schema = '数据库名称' 
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
			
			SET @MyQuery = CONCAT( "alter table `", s_tablename, "` add COLUMN `字段名` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '描述'" );
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

