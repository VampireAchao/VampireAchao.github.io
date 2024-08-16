---
title: liteflow快速开始
date: 2024-03-19 20:00:10
tags: java
---

> 人类永远会选择他们理解的，摒弃不理解的。这个世界唯一剩下的动物，就是他们已经驯服的那些，匍匐在他们的脚边，或者那些非常警觉，一察觉到他们靠近就逃离的动物，没有介于二者之间的。——《西部世界》

今天上手用了下`liteflow`，感觉非常不错

首先引入

```xml
        <dependency>
            <groupId>com.yomahub</groupId>
            <artifactId>liteflow-spring-boot-starter</artifactId>
            <version>2.11.4.2</version>
        </dependency>
```

编写`A`组件

```java


import com.yomahub.liteflow.annotation.LiteflowComponent;
import com.yomahub.liteflow.core.NodeComponent;
import com.yomahub.liteflow.slot.DefaultContext;

@LiteflowComponent("a")
public class ACmp extends NodeComponent {

    @Override
    public void process() {
        //do your business
        System.out.println("ACmp");
        var requestData = this.getRequestData();
        System.out.println(requestData);
        DefaultContext firstContextBean = this.getFirstContextBean();
        var arg = firstContextBean.getData("arg");
        System.out.println(arg);
        firstContextBean.setData("arg", "v" + requestData);
    }

}

```

`B`组件

```java



import com.yomahub.liteflow.annotation.LiteflowComponent;
import com.yomahub.liteflow.core.NodeComponent;
import com.yomahub.liteflow.slot.DefaultContext;

@LiteflowComponent("b")
public class BCmp extends NodeComponent {

    @Override
    public void process() {
        //do your business
        System.out.println("BCmp");
        var requestData = this.getRequestData();
        System.out.println(requestData);
        DefaultContext firstContextBean = this.getFirstContextBean();
        var arg = firstContextBean.getData("arg");
        System.out.println(arg);
    }
}

```

`C`组件

```java


import com.yomahub.liteflow.annotation.LiteflowComponent;
import com.yomahub.liteflow.core.NodeComponent;

@LiteflowComponent("c")
public class CCmp extends NodeComponent {

    @Override
    public void process() {
        //do your business
        System.out.println("CCmp");
    }
}

```

然后是编排文件和配置文件

```dir
resources
    ├── config
    |     └── flow.el.xml
    └── application.yml
```

`config/flow.el.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<flow>
    <chain name="chain1">
        THEN(a, b, c);
    </chain>
</flow>
```

`application.yml`

```yaml
liteflow:
  rule-source: config/flow.el.xml
```

运行

```java


import com.yomahub.liteflow.core.FlowExecutor;
import com.yomahub.liteflow.flow.LiteflowResponse;
import com.yomahub.liteflow.slot.DefaultContext;
import jakarta.annotation.Resource;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * LiteflowTest
 *
 * @author achao@apache.org
 */
@SpringBootTest
class LiteflowTest {

    @Resource
    private FlowExecutor flowExecutor;

    @Test
    void test() {
        LiteflowResponse response = flowExecutor.execute2Resp("chain1", "arg");
        DefaultContext firstContextBean = response.getFirstContextBean();
        var arg = firstContextBean.getData("arg");
        assertThat(arg).isEqualTo("varg");
    }
}

```
