---
title: mybatis判断批量操作是否全部执行成功
date: 2024-04-16 19:36:16
tags: java
---

> 报纸是这个世界的镜子。——埃利斯

例如这样的代码：

```java
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.ExecutorType;
import java.util.List;
import org.apache.ibatis.executor.BatchResult;

public class BatchOperationExample {
    public boolean checkAllBatchResultsSuccessful(List<BatchResult> batchResults) {
        for (BatchResult result : batchResults) {
            int[] updateCounts = result.getUpdateCounts();
            for (int count : updateCounts) {
                if (count <= 0) {  // 根据实际情况选择判断条件，有些情况下可能需要 count == 0
                    return false;  // 如果任何一个操作没有成功更新，则返回失败
                }
            }
        }
        return true;  // 所有操作都成功更新
    }

    public static void main(String[] args) {
        SqlSession sqlSession = null;
        try {
            sqlSession = MyBatisUtil.getSqlSession(ExecutorType.BATCH);
            // 假设有一个Mapper接口和对应的操作，例如：
            // UserMapper mapper = sqlSession.getMapper(UserMapper.class);
            // 执行批处理操作，例如：
            // mapper.insertUser(user1);
            // mapper.insertUser(user2);
            // ... 执行更多的批处理操作 ...

            sqlSession.commit();
            List<BatchResult> batchResults = sqlSession.flushStatements();

            BatchOperationExample example = new BatchOperationExample();
            boolean allSuccess = example.checkAllBatchResultsSuccessful(batchResults);
            System.out.println("All batch operations successful: " + allSuccess);
        } catch (Exception e) {
            sqlSession.rollback();
            e.printStackTrace();
        } finally {
            if (sqlSession != null) {
                sqlSession.close();
            }
        }
    }
}
```

不过也可以用`Stream`流的写法

```java
batchResults.stream().flatMapToInt(r-> IntStream.of(r.getUpdateCounts())).allMatch(i->i>0);
```

核心就一点，就是注意每一个`getUpdateCounts`都大于`0`即可
