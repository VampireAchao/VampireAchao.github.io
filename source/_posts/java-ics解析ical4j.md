---
title: java ics解析ical4j
date: 2022-11-14 13:15:01
tags: java
---

> 提防那种从不还手的人；他们既不肯宽恕你，也不容许你宽恕自己——萧伯纳

分享一个`java`解析`ics`的库

https://www.ical4j.org/

![image-20221114131553658](/imgs/oss/picGo/image-20221114131553658.png)

安装：

```xml
<project>
  ...
  <dependencies>
    <dependency>
      <groupId>org.mnode.ical4j</groupId>
      <artifactId>ical4j</artifactId>
      <version>1.0.2</version>
    </dependency>
    ...
  </dependencies>
  ...
</project>
```

使用：https://www.ical4j.org/examples/parsing/

我这里是获取节假日信息，数据来源：[节假日补班日历](https://VampireAchao.github.io/2022/10/15/节假日补班日历/)

可以直接用`hutool-HttpUtil`

```java
HttpUtil.get("https://www.shuyz.com/githubfiles/china-holiday-calender/master/holidayCal.ics")
```

下面的`stream`操作用的是`stream-core`里的包

```java
import cn.hutool.core.lang.Opt;
import cn.hutool.core.util.ArrayUtil;
import cn.hutool.core.util.EnumUtil;
import cn.hutool.core.util.StrUtil;
import io.github.vampireachao.stream.core.optional.Sf;
import io.github.vampireachao.stream.core.stream.Steam;
import net.fortuna.ical4j.data.CalendarBuilder;
import net.fortuna.ical4j.model.Calendar;
import net.fortuna.ical4j.model.Component;
import net.fortuna.ical4j.model.Date;
import net.fortuna.ical4j.model.component.VEvent;

import java.io.StringReader;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

final Calendar calendar = Sf.ofStr(icsData).mayLet(StringReader::new).mayLet(new CalendarBuilder()::build).get();
        final List<Holiday> holidays = Steam.of((List<Component>) calendar.getComponents())
                .filter(VEvent.class::isInstance)
                .map(VEvent.class::cast)
                .<Holiday>map(event -> {
                    final String[] splitSummary = Steam.split(event.getSummary().getValue(), " ").toArray(String[]::new);
                    final int[] position = Opt.of(splitSummary).<String>map(a -> ArrayUtil.get(a, 2))
                            .map(i -> Steam.split(i, "/")
                                    .mapToInt(j -> Integer.parseInt(j.replace("天", "")
                                            .replace("共", "")
                                            .replace("第", ""))
                                    ).toArray())
                            .get();
                    final Date date = event.getStartDate().getDate();
                    final LocalDateTime localDateTime = LocalDateTime.ofInstant(date.toInstant(), ZoneId.systemDefault());
                    final String description = event.getDescription().getValue();
                    return Holiday.builder()
                            .date(localDateTime.toLocalDate())
                            .type(EnumUtil.getBy(HolidayTypeEnum::getDesc, ArrayUtil.get(splitSummary, 1)))
                            .festival(ArrayUtil.get(splitSummary, 0))
                            .description(description)
                            .currentDay(ArrayUtil.get(position, 0))
                            .totalDay(ArrayUtil.get(position, 1))
                            .status(EnumUtil.getBy(HolidayStatusEnum::name, event.getStatus().getValue()))
                            .notice(StrUtil.subAfter(description, ":", false))
                            .build();
                }).toList();
```

实体类：

```java
@Data
@Builder
public class Holiday {

    private LocalDate date;
    private HolidayTypeEnum type;
    private String festival;
    private String description;
    private Integer currentDay;
    private Integer totalDay;
    private String notice;
    private HolidayStatusEnum status;


    @Tolerate
    public Holiday() {
        // this is an accessible parameterless constructor.
    }

}
```

俩枚举

```java
@Getter
@AllArgsConstructor
public enum HolidayTypeEnum {
    /**
     * Cheating the compiler.
     */
    HOLIDAY("假期"),
    WORK("补班");

    private final String desc;
}
```

状态

```java
@Getter
@AllArgsConstructor
public enum HolidayStatusEnum {
    /**
     * Cheating the compiler.
     */
    CONFIRMED("已确认"),
    TENTATIVE("暂定");

    private final String desc;
}
```
