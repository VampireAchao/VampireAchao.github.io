---
title: flink马屎咖啡馆案例
date: 2021-11-06 18:48:46
tags: flink
---

> 度之住事,验之来事,参之平素，可则决之。一一《鬼谷子》

我们来一个`Java`程序玩玩，执行以下命令，会自动帮你构建一个包含`Flink`依赖的项目：

```shell
mvn archetype:generate -DarchetypeGroupId=org.apache.flink -DarchetypeArtifactId=flink-walkthrough-datastream-java -DarchetypeVersion=1.14.0 -DgroupId=frauddetection -DartifactId=frauddetection -Dversion=0.1 -Dpackage=spendreport -DinteractiveMode=false
```

执行完毕后

![](/imgs/oss/picGo/kuangstudy51a7dab5-b77f-49a6-98a4-45dcffd689d6.png)

打开项目

![](/imgs/oss/picGo/kuangstudy58659e33-e27b-4959-acb4-2628e2e6ab78.png)

将这两处的`<scope>provided</scope>`注释掉或者删掉也行

![](/imgs/oss/picGo/kuangstudyb88c184b-8e89-4f9a-8aac-26035151acc0.png)

简单运行一下，可以看到我们控制台一直输出执行日志

![](/imgs/oss/picGo/kuangstudy0f07c83d-47ac-4caf-93c5-7d6482da9c52.png)

这就是官方提供的简单`Demo`，运行了一下，我试着依葫芦画瓢自己写了一个

按照我看过的[这篇文章](https://mp.weixin.qq.com/s/PKAXqR-kDeWd0Vvq891NEA)

实现了一个咖啡馆实时积分，送奖品的逻辑

> 假设，你把“世界这么大，老子去看看”的辞职信甩到了老板脸上，回老家科尔沁草原正中央开了一家咖啡馆，名叫“马屎咖啡”。
>
> 创业不易，需要绞尽脑汁吸引顾客。于是你搞了一个促销活动，一杯咖啡积1分，每个顾客只要积够10分，就白送一次骑马体验。
>
> 你店里卖的东西种类越来越多：10种咖啡，8种点心，还有6种正餐。
>
> 与此同时，你的促销活动也变得更复杂：一份咖啡积1分，一份点心积0.5分，一份正餐积2分。
>
> 一周内积够10分才送骑马，七天之前的过期积分就作废。
>
> **于是你做了第三个改进：补充一个实时计算员。**

这里具体使用`flink`实现：

第一行的 `StreamExecutionEnvironment` 用于设置你的执行环境。 任务执行环境用于定义任务的属性、创建数据源以及最终启动任务的执行。

```java
		// 获取执行环境
        StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
```

数据源从外部系统例如 `Apache Kafka、Rabbit MQ`或者 `Apache Pulsar` 接收数据，然后将数据送到 `Flink` 程序中。 这个代码练习使用的是一个能够无限循环生成订单模拟交易数据的数据源。 每条交易数据包括了 所属用户（`username`），交易发生的时间 （`createTime`） 以及货物（`goods`）。 绑定到数据源上的 `name` 属性是为了调试方便，如果发生一些异常，我们能够通过它快速定位问题发生在哪里。

```java
		DataStream<Order> orders = env.addSource(new OrderSource()).name("orders");
```

`OrderSource`中构造了一个`new RateLimitedIterator<>(Customers.unbounded())`传入父构造器

并且在`next`中`sleep`了`100`毫秒，给程序一个缓冲时间

```java
import org.apache.flink.annotation.Public;
import org.apache.flink.streaming.api.functions.source.FromIteratorFunction;

import java.io.Serializable;
import java.util.Iterator;

/**
 * 订单源
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/11/4 0004 23:43
 */
@Public
public class OrderSource extends FromIteratorFunction<Order> {
    private static final long serialVersionUID = -3541830323543628337L;

    public OrderSource() {
        super(new RateLimitedIterator<>(Customers.unbounded()));
    }


    private static class RateLimitedIterator<T> implements Iterator<T>, Serializable {

        private static final long serialVersionUID = 1L;

        private final Iterator<T> inner;

        private RateLimitedIterator(Iterator<T> inner) {
            this.inner = inner;
        }

        @Override
        public boolean hasNext() {
            return inner.hasNext();
        }

        @Override
        public T next() {
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            return inner.next();
        }
    }
}
```

这里`Customers.unbounded()`是一个`Iterator`迭代器，里面模拟了用户点单情况

```java
import cn.hutool.core.util.RandomUtil;
import com.github.javafaker.Faker;

import java.io.Serializable;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

/**
 * 顾客们
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/11/4 0004 23:46
 */
public class Customers implements Iterator<Order>, Serializable {
    private static final long serialVersionUID = 6202217638794440645L;

    /**
     * 商品清单
     */
    private static final List<Goods> GOODS_LIST = Arrays.asList(
            Goods.builder().name("卡布奇诺").goodsType(GoodsTypeEnum.COFFEE).money(35.0).build()
            , Goods.builder().name("卡布奇诺中杯").goodsType(GoodsTypeEnum.COFFEE).money(37.0).build()
            , Goods.builder().name("卡布奇诺大杯").goodsType(GoodsTypeEnum.COFFEE).money(39.0).build()
            , Goods.builder().name("拿铁").goodsType(GoodsTypeEnum.COFFEE).money(30.0).build()
            , Goods.builder().name("美式").goodsType(GoodsTypeEnum.COFFEE).money(28.0).build()
            , Goods.builder().name("星冰乐").goodsType(GoodsTypeEnum.COFFEE).money(30.0).build()
            , Goods.builder().name("焦糖玛奇朵").goodsType(GoodsTypeEnum.COFFEE).money(32.0).build()
            , Goods.builder().name("华夫饼").goodsType(GoodsTypeEnum.DESSERT).money(19.5).build()
            , Goods.builder().name("草莓蛋糕").goodsType(GoodsTypeEnum.DESSERT).money(35.5).build()
            , Goods.builder().name("菠萝包").goodsType(GoodsTypeEnum.DESSERT).money(16.5).build()
            , Goods.builder().name("法可颂").goodsType(GoodsTypeEnum.DESSERT).money(8.5).build()
            , Goods.builder().name("意面").goodsType(GoodsTypeEnum.MEAL).money(30.0).build()
            , Goods.builder().name("意面").goodsType(GoodsTypeEnum.MEAL).money(30.0).build()
            , Goods.builder().name("水果蔬菜沙拉").goodsType(GoodsTypeEnum.MEAL).money(40.0).build()
            , Goods.builder().name("鸡肉卷").goodsType(GoodsTypeEnum.MEAL).money(35.0).build()
            , Goods.builder().name("牛肉卷").goodsType(GoodsTypeEnum.MEAL).money(35.0).build()
            , Goods.builder().name("羊肉卷").goodsType(GoodsTypeEnum.MEAL).money(35.0).build()
            , Goods.builder().name("鱼肉卷").goodsType(GoodsTypeEnum.MEAL).money(35.0).build()
    );

    /**
     * 无限商品
     *
     * @return 模拟用户下单
     */
    public static Iterator<Order> unbounded() {
        return new Customers();
    }

    @Override
    public boolean hasNext() {
        return true;
    }

    @Override
    public Order next() {
        // 模拟用户点单
        return Order.builder().username(Faker.instance().name().firstName()).id(RandomUtil.randomLong(0, Long.MAX_VALUE)).goods(RandomUtil.randomEles(GOODS_LIST, RandomUtil.randomInt(1, 10))).createTime(RandomUtil.randomDay(-7, 0)).build();
    }


}

```

`orders` 这个数据流包含了大量的用户交易数据，需要被划分到多个并发上进行计分处理。由于计分行为的发生是基于某一个用户的，所以，必须要要保证同一个账户的所有交易行为数据要被同一个并发的 task 进行处理。

为了保证同一个 task 处理同一个 key 的所有数据，你可以使用 `DataStream#keyBy` 对流进行分区。 `process()` 函数对流绑定了一个操作，这个操作将会对流上的每一个消息调用所定义好的函数。 通常，一个操作会紧跟着 `keyBy` 被调用，在这个例子中，这个操作是`Calculator`，该操作是在一个 *keyed context* 上执行的。

简单来说，下面这段代码，用`username`去隔离用户之间的数据，用`Calculator`去执行具体操作

```
DataStream<HorseTicket> alerts = orders.keyBy(Order::getUsername).process(new Calculator()).name("calculator");
```

我们细看`Calculator`，它是我们具体计分逻辑的实现

```java
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.date.DateUnit;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.lang.Console;
import cn.hutool.core.lang.Opt;
import cn.hutool.core.util.NumberUtil;
import org.apache.flink.api.common.state.ValueState;
import org.apache.flink.api.common.state.ValueStateDescriptor;
import org.apache.flink.api.common.typeinfo.TypeInformation;
import org.apache.flink.api.common.typeinfo.Types;
import org.apache.flink.configuration.Configuration;
import org.apache.flink.streaming.api.functions.KeyedProcessFunction;
import org.apache.flink.util.Collector;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

/**
 * 计算员
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/11/4 0004 23:24
 */
public class Calculator extends KeyedProcessFunction<String, Order, HorseTicket> {
    public static final int NUMBER_LIMIT = 10;
    public static final int WEEK_DAY_LIMIT = 7;
    private static final long serialVersionUID = -6248614038880488977L;
    private transient ValueState<List<Score>> scoreBoard;

    @Override
    public void open(Configuration parameters) throws Exception {
        // 限定类型，这里我是一个List<Score>
        ValueStateDescriptor<List<Score>> scoreDescriptor = new ValueStateDescriptor<>(
                "scoreboard",
                Types.LIST(TypeInformation.of(Score.class)));
        scoreBoard = getRuntimeContext().getState(scoreDescriptor);
    }

    @Override
    public void processElement(Order order, Context ctx, Collector<HorseTicket> out) throws Exception {
        List<Score> scores = Opt.ofNullable(this.scoreBoard.value()).orElseGet(CollUtil::newArrayList);
        Console.log(order);
        // 计分，先计算这次订单积分
        Double score = order.getGoods().parallelStream().map(Goods::getGoodsType).map(GoodsTypeEnum::getScore).reduce((double) 0, NumberUtil::add, NumberUtil::add);
        // 输出提示语
        Console.log("{},Your score is {} at {}.", order.getUsername(), score, DateUtil.formatDateTime(order.getCreateTime()));

        scores.add(Score.builder().score(score).time(order.getCreateTime()).build());
        // 如果一周内积够10分，送骑马劵，带顾客去马场体验骑马
        if (scores.parallelStream().filter(s -> DateUtil.between(s.getTime(), DateUtil.date(), DateUnit.DAY) <= WEEK_DAY_LIMIT).map(Score::getScore).reduce((double) 0, NumberUtil::add, NumberUtil::add) >= NUMBER_LIMIT) {
            driveHorse(out, order, scores.toArray(new Score[0]));
            return;
        }

        // 否则积分
        this.scoreBoard.update(scores);
    }

    private void driveHorse(Collector<HorseTicket> out, Order order, Score... scores) throws IOException {
        out.collect(HorseTicket.builder().username(order.getUsername()).scores(Arrays.asList(scores)).build());
        this.scoreBoard.clear();
    }

}
```

然后`sink` 会将 `DataStream` 写出到外部系统，例如 Apache Kafka、Cassandra 或者 AWS Kinesis 等。 `Racecourse` 使用 **ERROR** 的日志级别打印每一个 `HorseTicket` 的数据记录，而不是将其写入持久存储，以便你可以方便地查看结果。

```java
		// 添加计算后的下游，此处就是马场
        alerts.addSink(new Racecourse()).name("racecourse");
```

`Racecourse`具体实现：

```java
import cn.hutool.core.lang.Console;
import org.apache.flink.streaming.api.functions.sink.SinkFunction;

/**
 * 马场
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/11/4 0004 23:37
 */
public class Racecourse implements SinkFunction<HorseTicket> {
    private static final long serialVersionUID = 7327454374125251434L;

    @Override
    public void invoke(HorseTicket horseTicket, Context context) throws Exception {
        Console.error("{} is driving horse!And his scores are {}.", horseTicket.getUsername(), horseTicket.getScores());
    }
}
```

`Flink` 程序是懒加载的，并且只有在完全搭建好之后，才能够发布到集群上执行。 调用 `StreamExecutionEnvironment#execute` 时给任务传递一个任务名参数，就可以开始运行任务。

```java
		// 执行
        env.execute("Horse Shit Cafe");
```

完整代码我上传到了：

https://gitee.com/VampireAchao/simple-flink.git

执行后可以看到很多用户下单：

例如这位`Stacey`第一次订单积分`6`分

![image-20211106212247444](/imgs/oss/picGo/image-20211106212247444.png)

第二次积分`4`分刚好`10`分，并且两笔订单相差不超过一周，送去骑马体验

![image-20211106212457562](/imgs/oss/picGo/image-20211106212457562.png)

