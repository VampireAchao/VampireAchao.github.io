---
title: fastJson的JSONField注解
date: 2021-03-14 12:38:48
tags: java
---

> 真正的快乐是内在的，它只有在人类的心灵里才能发现。——布雷默

相信关于[FastJson](https://VampireAchao.github.io/2020/08/13/fastjson%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8/)大伙都不陌生

今天聊聊`fastjson`的这个注解`@JSONField`

首先它可以放到方法上

例如我们`pojo`的`getter`和`setter`等

其次用的最多的是放到属性上

例如我这里新建一个`POJO`

```java
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    private static class Student implements Serializable {
        private static final long serialVersionUID = -3289647584974663707L;
        private String name;
        private Integer age;
        private String job;
        private GenderEnum gender;
        private Date birthday;
        private String json;
    }
```

这里的性别枚举

```java
@Getter
@AllArgsConstructor
public enum GenderEnum {

    FEMALE("女", 0),
    MALE("男", 1);

    private final String name;
    private final Integer code;

}
```

写一个`main`函数

```java
    public static void main(String[] args) {
        Instant from = LocalDateTime.parse("2021-01-09 00:00:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss", Locale.ENGLISH)).toInstant(ZoneOffset.MAX);

        Student supa = Student.builder().name("supa").age(20).gender(GenderEnum.MALE).birthday(Date.from(from)).json("{\"word\":\"xxx\"}").build();
        String serializeStr = JSON.toJSONString(supa);
        System.out.println(serializeStr);

        Student student = JSON.parseObject(serializeStr, Student.class);
        System.out.println(student);
    }
```

先运行一下

![image-20210314125355195](/imgs/oss/picGo/image-20210314125355195.png)

然后开始一一介绍`@JSONField`的属性

第一个`ordinal`可以指定序列化后的`json`字符串属性顺序

例如我们稍微配置一下

```java
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    private static class Student implements Serializable {
        private static final long serialVersionUID = -3289647584974663707L;
        @JSONField(ordinal = 3)
        private String name;
        @JSONField(ordinal = 1)
        private Integer age;
        private String job;
        @JSONField(ordinal = 2)
        private GenderEnum gender;
        private Date birthday;
        private String json;
    }
```

然后再次运行可以看到我们序列化后的`JSON`串属性顺序按照升序排序了

![image-20210314125643750](/imgs/oss/picGo/image-20210314125643750.png)

接下来是`name`

它可以指定我们序列化/反序列化属性的名称

我们在`name`上加一个

![image-20210314125814567](/imgs/oss/picGo/image-20210314125814567.png)

可以看到之前的`name`序列化后变成了`studentName`

![image-20210314125856889](/imgs/oss/picGo/image-20210314125856889.png)

下一个是`format`

对于日期格式，我们可以使用它去指定日期格式

例如

```java
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    private static class Student implements Serializable {
        private static final long serialVersionUID = -3289647584974663707L;
        @JSONField(ordinal = 3, name = "studentName")
        private String name;
        @JSONField(ordinal = 1)
        private Integer age;
        private String job;
        @JSONField(ordinal = 2)
        private GenderEnum gender;
        @JSONField(format = "yyyy年MM月dd日E")
        private Date birthday;
        private String json;
    }
```

序列化后结果就是这样

![image-20210314130037646](/imgs/oss/picGo/image-20210314130037646.png)

然后是`serialize`：默认为`true`，如果为`false`，序列化时会忽略该属性

![image-20210314130222938](/imgs/oss/picGo/image-20210314130222938.png)

![image-20210314130233815](/imgs/oss/picGo/image-20210314130233815.png)

然后是`deserialize`：默认为`true`，如果为`false`，反序列化时会忽略该属性

![image-20210314130340473](/imgs/oss/picGo/image-20210314130340473.png)

![image-20210314130402722](/imgs/oss/picGo/image-20210314130402722.png)

然后是`serialzeFeatures`，它的值为`com.alibaba.fastjson.serializer.SerializerFeature`

可以指定一些序列化的选项，例如我们值为`null`时序列化为空串

![image-20210314130558407](/imgs/oss/picGo/image-20210314130558407.png)

![image-20210314130614059](/imgs/oss/picGo/image-20210314130614059.png)

`parseFeatures`则是可以指定一些转换选项，值为`com.alibaba.fastjson.parser.Feature`

这两个的值都可以是多个

下面是`label`，这个跳过

`jsonDirect`针对值为`json`字符串的属性，为`true`则序列化，为`false`则不序列化，默认为`false`

![image-20210314131303952](/imgs/oss/picGo/image-20210314131303952.png)

![image-20210314131318207](/imgs/oss/picGo/image-20210314131318207.png)

然后是`serializeUsing`

指定序列化时使用哪个序列化器

![image-20210314131420096](/imgs/oss/picGo/image-20210314131420096.png)

我们自定义一个

```java
    /**
     * 性别序列化
     */
    public static class GenderEnumParser implements ObjectSerializer {
        @Override
        public void write(JSONSerializer serializer, Object object, Object fieldName, Type fieldType, int features) throws IOException {
            Integer genderCode = null;
            if (fieldType.getTypeName().equals(GenderEnum.class.getName())) {
                genderCode = ((GenderEnum) object).getCode();
            }
            serializer.write(genderCode);
        }
    }
```

然后执行

![image-20210314131500264](/imgs/oss/picGo/image-20210314131500264.png)

使用`deserializeUsing`指定反序列化器一样的

![image-20210314131546581](/imgs/oss/picGo/image-20210314131546581.png)

```java
    public static class GenderEnumFormatter implements ObjectDeserializer {
        @Override
        public <T> T deserialze(DefaultJSONParser parser, Type type, Object fieldName) {
            JSONObject jsonObject = JSON.parseObject(parser.getInput());
            Integer genderCode = jsonObject.getInteger(String.valueOf(fieldName));
            return (T) Arrays.stream(GenderEnum.values()).filter(gender -> gender.getCode().equals(genderCode)).findFirst().orElse(null);
        }

        @Override
        public int getFastMatchToken() {
            return 0;
        }
    }
```

然后是`alternateNames`

可以取别名，例如`json`字符串中，可能叫`studentName`，也可能叫`myName`

他们都要反序列化后放入`name`

我们就可以使用它

![image-20210314131844625](/imgs/oss/picGo/image-20210314131844625.png)
