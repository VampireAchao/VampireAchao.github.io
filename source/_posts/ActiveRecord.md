---
title: ActiveRecord
date: 2021-08-12 18:59:21
tags: java
---

> 理想主义者是不可救药的：如果他被扔出了他的天堂，他会再制造出一个理想的地狱。——尼采

`MybatisPlus`支持`ActiveRecord`形式调用，实体类只需继承`Model`类即可进行强大的`CRUD`操作

效果如下：

```java
import com.baomidou.mybatisplus.extension.activerecord.Model;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

@Data
@Builder
@ToString
@Accessors
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class UserDetail extends Model<UserDetail> implements Serializable {
    
    private static final long serialVersionUID = 1L;
    
    /**
     * 编号
     */
    @TableId(type = IdType.AUTO)
    private Long id;
    
    /**
     * 用户名
     */
    private String username;

    /**
     * 密码
     */
    private String password;
    
}
```

然后就可以使用`entity`去调用`CRUD`方法啦

![image-20210812190913627](/imgs/oss/picGo/image-20210812190913627.png)

基本的方法都有了

![image-20210812191048662](/imgs/oss/picGo/image-20210812191048662.png)
