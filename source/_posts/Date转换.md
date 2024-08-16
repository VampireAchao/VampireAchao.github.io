---
title: Date转换
date: 2021-01-06 20:15:23
tags: java
---

> 一个人成为他自己了，那就是达到了快乐的顶点。——德西得乌·伊拉斯谟

相信大家都用过`SimpleDateFormat`去转换时间，但它是线程不安全的

阿里开发手册也有讲

> 【强制】SimpleDateFormat 是线程不安全的类，一般不要定义为 static 变量，如果定义为 static，
>
> 必须加锁，或者使用 DateUtils 工具类。
>
> 正例：注意线程安全，使用 DateUtils。亦推荐如下处理：
>
> ```java
>     private static final ThreadLocal<DateFormat> df = new ThreadLocal<DateFormat>() {
>         @Override
>         protected DateFormat initialValue() {
>             return new SimpleDateFormat("yyyy-MM-dd");
>         }
>     };
> ```
>
> 说明：如果是 JDK8 的应用，可以使用 Instant 代替 Date，LocalDateTime 代替 Calendar，
>
> DateTimeFormatter 代替 SimpleDateFormat，官方给出的解释：simple beautiful strong immutable 
>
> thread-safe。

那我们就看看`DateTimeFormatter`怎么让`Date`和`String`互转的

```java
        // Date转String
        Date date = new Date();
        LocalDateTime localDateTime = LocalDateTime.ofInstant(date.toInstant(), ZoneId.systemDefault());
        // Date转英文年月日星期时间 Wed 06 January 2021 20:30 PM
        System.out.println(localDateTime.format(DateTimeFormatter.ofPattern("E dd MMMM yyyy hh:mm a", Locale.US)));
        // Date转中文年月日星期时间
        System.out.println(localDateTime.format(DateTimeFormatter.ofPattern("yyyy年MMMMd日 E hh:mm a", Locale.CHINA)));
        // String转Date
        String dateStr = "2021年一月6日 星期三 20:38 下午";
        LocalDateTime parse = LocalDateTime.parse(dateStr, DateTimeFormatter.ofPattern("yyyy年MMMMd日 E HH:mm a", Locale.CHINA));
        Date toDate = Date.from(parse.atZone(ZoneId.systemDefault()).toInstant());
        System.out.println(toDate);
```

执行结果

![image-20210106205933082](/imgs/oss/picGo/image-20210106205933082.png)

最后放上`JDK1.8API`，这里可以了解到我们的`pattern`怎么写

>### 格式和解析模式
>
>模式基于简单的字母和符号序列。 使用模式创建一个格式化器使用[`ofPattern(String)`](https://www.matools.com/file/manual/jdk_api_1.8_google/java/time/format/DateTimeFormatter.html#ofPattern-java.lang.String-)和[`ofPattern(String, Locale)`](https://www.matools.com/file/manual/jdk_api_1.8_google/java/time/format/DateTimeFormatter.html#ofPattern-java.lang.String-java.util.Locale-)方法。 例如， `"d MMM uuuu"`将格式为2011-12-03，为“2011年12月3日”。 从模式创建的格式化程序可以根据需要多次使用，它是不可变的并且是线程安全的。
>
>例如：
>
>> ```
>>   DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy MM dd");  String text = date.toString(formatter);  LocalDate date = LocalDate.parse(text, formatter); 
>> ```
>
>所有字母“A”至“Z”和“a”至“z”保留为图案字母。 定义了以下图案字母：
>
>```
>  Symbol  Meaning                     Presentation      Examples
>  ------  -------                     ------------      -------
>   G       era                         text              AD; Anno Domini; A
>   u       year                        year              2004; 04
>   y       year-of-era                 year              2004; 04
>   D       day-of-year                 number            189
>   M/L     month-of-year               number/text       7; 07; Jul; July; J
>   d       day-of-month                number            10
>
>   Q/q     quarter-of-year             number/text       3; 03; Q3; 3rd quarter
>   Y       week-based-year             year              1996; 96
>   w       week-of-week-based-year     number            27
>   W       week-of-month               number            4
>   E       day-of-week                 text              Tue; Tuesday; T
>   e/c     localized day-of-week       number/text       2; 02; Tue; Tuesday; T
>   F       week-of-month               number            3
>
>   a       am-pm-of-day                text              PM
>   h       clock-hour-of-am-pm (1-12)  number            12
>   K       hour-of-am-pm (0-11)        number            0
>   k       clock-hour-of-am-pm (1-24)  number            0
>
>   H       hour-of-day (0-23)          number            0
>   m       minute-of-hour              number            30
>   s       second-of-minute            number            55
>   S       fraction-of-second          fraction          978
>   A       milli-of-day                number            1234
>   n       nano-of-second              number            987654321
>   N       nano-of-day                 number            1234000000
>
>   V       time-zone ID                zone-id           America/Los_Angeles; Z; -08:30
>   z       time-zone name              zone-name         Pacific Standard Time; PST
>   O       localized zone-offset       offset-O          GMT+8; GMT+08:00; UTC-08:00;
>   X       zone-offset 'Z' for zero    offset-X          Z; -08; -0830; -08:30; -083015; -08:30:15;
>   x       zone-offset                 offset-x          +0000; -08; -0830; -08:30; -083015; -08:30:15;
>   Z       zone-offset                 offset-Z          +0000; -0800; -08:00;
>
>   p       pad next                    pad modifier      1
>
>   '       escape for text             delimiter
>   ''      single quote                literal           '
>   [       optional section start
>   ]       optional section end
>   #       reserved for future use
>   {       reserved for future use
>   }       reserved for future use 
>```
>
>模式字母的数量决定了格式。
>
>**文本** ：文字样式是根据所使用的图案字母数确定的。 少于4个图案字母将使用[`short form`](https://www.matools.com/file/manual/jdk_api_1.8_google/java/time/format/TextStyle.html#SHORT) 。 完全4个图案字母将使用[`full form`](https://www.matools.com/file/manual/jdk_api_1.8_google/java/time/format/TextStyle.html#FULL) 。 完全5个图案字母将使用[`narrow form`](https://www.matools.com/file/manual/jdk_api_1.8_google/java/time/format/TextStyle.html#NARROW) 。 图案字母'L'，'c'和'q'指定文本样式的独立形式。
>
>**编号** ：如果字母数为1，则使用最小位数输出该值，而不填充。 否则，使用数字计数作为输出字段的宽度，根据需要使用零填充值。 以下模式字母对字母数的约束。 只能指定'c'和'F'的一个字母。 可以指定多达两个'd'，'H'，'h'，'K'，'k'，'m'和's'的字母。 最多可以指定三个字母'D'。
>
>**数字/文本** ：如果模式字母的数量为3或更大，请使用上述文本规则。 否则使用上面的数字规则。
>
>**分数** ：输出二分之一纳秒的场。 纳秒值有九位数，因此模式字母的计数从1到9.如果小于9，那么纳秒值将被截断，只有最高有效位被输出。 在严格模式下解析时，解析数字的数量必须与模式字母的数量相匹配。 当在宽松模式下解析时，解析数字的数目必须至少为模式字母数，最多9位数。
>
>**年份** ：字母数确定使用最小字段宽度低于哪个填充。 如果字母数为2，则使用一个[`reduced`](https://www.matools.com/file/manual/jdk_api_1.8_google/java/time/format/DateTimeFormatterBuilder.html#appendValueReduced-java.time.temporal.TemporalField-int-int-int-)两位数的形式。 对于打印，这将输出最右边的两位数字。 对于解析，这将使用基数值2000解析，导致一年在2000到2099之间的范围内。 如果字母数小于四（但不是两个），则符号只能按照[`SignStyle.NORMAL`](https://www.matools.com/file/manual/jdk_api_1.8_google/java/time/format/SignStyle.html#NORMAL)输出为负数。 否则，符号为输出如果超过垫宽度，按照[`SignStyle.EXCEEDS_PAD`](https://www.matools.com/file/manual/jdk_api_1.8_google/java/time/format/SignStyle.html#EXCEEDS_PAD) 。
>
>**ZoneId** ：输出时区ID，如“Europe / Paris”。 如果字母数为2，则输出时区ID。 任何其他字母数字抛出`IllegalArgumentException` 。
>
>**区域名称** ：输出时区ID的显示名称。 如果字母数为1，2或3，则输出短名称。 如果字母数为4，则输出全名。 五个或更多的字母抛出`IllegalArgumentException` 。
>
>**偏移X和x** ：这将根据模式字母的数量格式化偏移量。 一个字母只输出小时，例如“+01”，除非分钟不为零，在这种情况下也输出分钟，例如“+0130”。 两个字母输出小时和分钟，没有冒号，例如'+0130'。 三个字母输出小时和分钟，冒号如“+01：30”。 四个字母输出小时和分钟，可选第二个，没有冒号，例如'+013015'。 五个字母输出小时和分钟，可选第二个，冒号如“+01：30：15”。 六个或更多的字母抛出`IllegalArgumentException` 。 当要输出的偏移量为零时，模式字母“X”（大写）将输出“Z”，而模式字母“x”（小写）将输出“+00”，“+0000”或“+00 ：00'。
>
>**偏移量O** ：根据模式字母的数量格式化局部偏移量。 一个字母输出局部偏移的[short](https://www.matools.com/file/manual/jdk_api_1.8_google/java/time/format/TextStyle.html#SHORT)形式，这是局部偏移文本，如“GMT”，小时无前导零，可选的2位数分钟和秒，如果非零，冒号，例如'GMT + 8 '。 四个字母输出[full](https://www.matools.com/file/manual/jdk_api_1.8_google/java/time/format/TextStyle.html#FULL)表格，这是一个本地化的偏移文本，例如“GMT”，具有2位小时和分钟字段，可选第二个字段（如果非零），冒号（例如'GMT + 08：00）。 任何其他字母数字抛出`IllegalArgumentException` 。
>
>**偏移Z** ：根据模式字母的数量格式化偏移量。 一个，两个或三个字母输出小时和分钟，没有冒号，例如'+0130'。 当偏移为零时，输出将为“+0000”。 四个字母输出[full](https://www.matools.com/file/manual/jdk_api_1.8_google/java/time/format/TextStyle.html#FULL)形式的局部偏移量，相当于Offset-O的四个字母。 如果偏移为零，输出将为相应的局部偏移文本。 五个字母输出小时，分钟，可选第二个（如果非零），冒号。 如果偏移为零，则输出“Z”。 六个或更多的字母抛出`IllegalArgumentException` 。
>
>**可选部分** ：可选部分标记与调用[`DateTimeFormatterBuilder.optionalStart()`](https://www.matools.com/file/manual/jdk_api_1.8_google/java/time/format/DateTimeFormatterBuilder.html#optionalStart--)和[`DateTimeFormatterBuilder.optionalEnd()`完全相同](https://www.matools.com/file/manual/jdk_api_1.8_google/java/time/format/DateTimeFormatterBuilder.html#optionalEnd--) 。
>
>**垫修饰符** ：修改紧随其后的模式以填充空格。 垫宽度由图案字母的数量决定。 这与拨打[`DateTimeFormatterBuilder.padNext(int)`](https://www.matools.com/file/manual/jdk_api_1.8_google/java/time/format/DateTimeFormatterBuilder.html#padNext-int-)相同。
>
>例如，'ppH'输出在左边填充空格的宽度为2的小时。
>
>任何无法识别的字母都是错误。 除'['，']'，'{'，'}'，'＃'和单引号之外的任何非字母字符都将直接输出。 尽管如此，建议对要直接输出的所有字符使用单引号，以确保将来的更改不会破坏您的应用程序。



