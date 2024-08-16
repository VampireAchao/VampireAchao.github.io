---
title: jackson处理json
date: 2020-12-11 20:04:31
tags: java
---

> 君子成人之美，不成人之恶。小人反是。——《论语》

[转载，原文](https://blog.csdn.net/psh18513234633/article/details/88599509)

## 介绍

**Jackson 的核心模块由三部分组成**

1. jackson-core，核心包，提供基于"流模式"解析的相关 API，它包括 JsonPaser 和 JsonGenerator。 Jackson 内部实现正是通过高性能的流模式 API 的 JsonGenerator 和 JsonParser 来生成和解析 json。
2. jackson-annotations，注解包，提供标准注解功能。
3. jackson-databind ，数据绑定包， 提供基于"对象绑定" 解析的相关 API （ ObjectMapper ） 和"树模型" 解析的相关 API （JsonNode）；基于"对象绑定" 解析的 API 和"树模型"解析的 API 依赖基于"流模式"解析的 API。

## 用法

引入依赖

```
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.9.5</version>
</dependency>
12345
```

jackson-databind 依赖 jackson-core 和 jackson-annotations，当添加 jackson-databind 之后， jackson-core 和 jackson-annotations 也随之添加到 Java 项目工程中。在添加相关依赖包之后，就可以使用 Jackson。

Jackson 最常用的 API 就是基于"对象绑定" 的 ObjectMapper。下面是一个 ObjectMapper 的使用的简单示例。

test

```
@Test
public void test() throws IOException {
    ObjectMapper mapper = new ObjectMapper();
    User user = new User();
    
    user.set..
    
    // 序列化 
    String jsonString = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(user);
    
    // 反序列化
    user = mapper.readValue(jsonString, User.class);
}
12345678910111213
```

ObjectMapper 通过 writeValue 系列方法将 java 对象序列化为 json，并将 json 存储成不同的格式：String（writeValueAsString）、Byte Array（writeValueAsBytes）、Writer、File、OutStream、DataOutput。

ObjectMapper 通过 readValue 系列方法从不同的数据源： String、Byte Array、Reader、File、URL、InputStream 中反序列化为 java 对象。

在调用 writeValue 或调用 readValue 方法之前，往往需要设置 ObjectMapper 的相关配置信息。这些配置信息应用 java 对象的所有属性上。示例如下：

```
//在反序列化时忽略在 json 中存在但 Java 对象不存在的属性 
mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
   false); 
//在序列化时日期格式默认为 yyyy-MM-dd'T'HH:mm:ss.SSSZ 
mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS,false) 
//在序列化时忽略值为 null 的属性 
mapper.setSerializationInclusion(Include.NON_NULL); 
//忽略值为默认值的属性 
mapper.setDefaultPropertyInclusion(Include.NON_DEFAULT);
123456789
```

## 常用序列化与反序列化

#### 1、序列化

Jackson ObjectMapper提供了三种方法转换

```
writeValue()
writeValueAsString()
writeValueAsBytes()
123
```

writeValue

```
ObjectMapper objectMapper = new ObjectMapper();

Car car = new Car();
car.brand = "BMW";
car.doors = 4;

objectMapper.writeValue(new FileOutputStream("data/output-2.json"), car);
1234567
```

writeValueAsString

```
ObjectMapper objectMapper = new ObjectMapper();

Car car = new Car();
car.brand = "BMW";
car.doors = 4;

String json = objectMapper.writeValueAsString(car);
1234567
```

writeValueAsBytes

```
ObjectMapper objectMapper = new ObjectMapper();

Car car = new Car();
car.brand = "BMW";
car.doors = 4;

byte[] jsonBytes = objectMapper.writeValueAsString(car);
1234567
```

#### 2、时间类型格式化

Jackson 默认会将`java.util.Date`对象转换成`long`值,同时也支持将时间转换成格式化的字符串

```
SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
objectMapper.setDateFormat(dateFormat);

String json = objectMapper.writeValueAsString(对象);
1234
```

#### 3、反序列化读取方式

**从json字符串读取**

```
ObjectMapper objectMapper = new ObjectMapper();
String carJson = "{ \"brand\" : \"Mercedes\", \"doors\" : 5 }";
Car car = objectMapper.readValue(carJson, Car.class);
123
```

**从json Reader读取**

```
ObjectMapper objectMapper = new ObjectMapper();
String carJson = "{ \"brand\" : \"Mercedes\", \"doors\" : 4 }";
Reader reader = new StringReader(carJson);
Car car = objectMapper.readValue(reader, Car.class);
1234
```

**从json文件读取**

```
ObjectMapper objectMapper = new ObjectMapper();
File file = new File("data/car.json");
Car car = objectMapper.readValue(file, Car.class);
123
```

**从json网络文件地址读取**

```
ObjectMapper objectMapper = new ObjectMapper();
URL url = new URL("file:data/car.json");
Car car = objectMapper.readValue(url, Car.class);
123
```

**从流中读取**

```
ObjectMapper objectMapper = new ObjectMapper();
InputStream input = new FileInputStream("data/car.json");
Car car = objectMapper.readValue(input, Car.class);
123
```

**从json字节数组中读取**

```
ObjectMapper objectMapper = new ObjectMapper();
String carJson = "{ \"brand\" : \"Mercedes\", \"doors\" : 5 }";
byte[] bytes = carJson.getBytes("UTF-8");
Car car = objectMapper.readValue(bytes, Car.class);
1234
```

#### 4、反序列化不同类型

转换为数组

```
String jsonArray = "[{\"brand\":\"ford\"}, {\"brand\":\"Fiat\"}]";
ObjectMapper objectMapper = new ObjectMapper();
Car[] cars = objectMapper.readValue(jsonArray, Car[].class);
123
```

转换为集合

```
String jsonArray = "[{\"brand\":\"ford\"}, {\"brand\":\"Fiat\"}]";
ObjectMapper objectMapper = new ObjectMapper();
List<Car> cars = objectMapper.readValue(jsonArray, new TypeReference<List<Car>>(){});
123
```

转换为Map

```
String jsonObject = "{\"brand\":\"ford\", \"doors\":5}";
ObjectMapper objectMapper = new ObjectMapper();
Map<String, Object> jsonMap = objectMapper.readValue(jsonObject, new TypeReference<Map<String,Object>>(){});
123
```

#### 5、JSON树模型

Jackson 也提供了树模型（tree model）来生成和解析 json。若想修改或访问 json 部分属性，树模型是不错的选择。树模型由 JsonNode 节点组成

example

```
String carJson = "{ \"brand\" : \"Mercedes\", \"doors\" : 5 }";
ObjectMapper objectMapper = new ObjectMapper();
try {
    JsonNode node = objectMapper.readValue(carJson, JsonNode.class);
    
    JsonNode brandNode = node.get("brand");
    String brand = brandNode.asText();
    System.out.println("brand = " + brand);

    JsonNode doorsNode = node.get("doors");
    int doors = doorsNode.asInt();
    System.out.println("doors = " + doors);

    JsonNode array = node.get("owners");
    JsonNode jsonNode = array.get(0);
    String john = jsonNode.asText();
    System.out.println("john  = " + john);

    JsonNode child = node.get("nestedObject");
    JsonNode childField = child.get("field");
    String field = childField.asText();
    System.out.println("field = " + field);
} catch (IOException e) {
    e.printStackTrace();
}
12345678910111213141516171819202122232425
```

## JsonParser

JsonParser 提供很多方法来读取 json 信息， 如 isClosed(), nextToken(), getValueAsString()等。若想单独创建 JsonParser，可以通过 JsonFactory() 的 createParser。

example

```
String carJson = "{ \"brand\" : \"Mercedes\", \"doors\" : 5 }";
JsonFactory factory = new JsonFactory();
JsonParser  parser  = factory.createParser(carJson);
123
String carJson = "{ \"brand\" : \"Mercedes\", \"doors\" : 5 }";

JsonFactory factory = new JsonFactory();
JsonParser  parser  = factory.createParser(carJson);

Car car = new Car();
while(!parser.isClosed()){
    JsonToken jsonToken = parser.nextToken();

    if(JsonToken.FIELD_NAME.equals(jsonToken)){
        String fieldName = parser.getCurrentName();
        System.out.println(fieldName);

        jsonToken = parser.nextToken();

        if("brand".equals(fieldName)){
            car.brand = parser.getValueAsString();
        } else if ("doors".equals(fieldName)){
            car.doors = parser.getValueAsInt();
        }
    }
}

System.out.println("car.brand = " + car.brand);
System.out.println("car.doors = " + car.doors);
12345678910111213141516171819202122232425
```

## JsonGenerator

JsonGenerator 有多种 write 方法以支持生成复杂的类型的 json，比如 writeArray，writeTree 等 。若想单独创建 JsonGenerator，可以通过 JsonFactory() 的 createGenerator。

example

```
JsonFactory factory = new JsonFactory();

JsonGenerator generator = factory.createGenerator(new File("data/output.json"), JsonEncoding.UTF8);
123
JsonFactory factory = new JsonFactory();

JsonGenerator generator = factory.createGenerator(new File("data/output.json"), JsonEncoding.UTF8);

generator.writeStartObject();
generator.writeStringField("brand", "Mercedes");
generator.writeNumberField("doors", 5);
generator.writeEndObject();

generator.close();
12345678910
```

也可以通过`Reader`, `InputStream`, `URL`, `byte array` 或 `char array`来创建JsonParser

## 配置相关属性

**SerializationFeature（序列化相关属性）**

```
public enum SerializationFeature implements ConfigFeature {
    /*
    /******************************************************
    /* 通用输出特性
    /******************************************************
     */

    /**
     * 是否以类名作为根元素，可以通过@JsonRootName来自定义根元素名称,默认false
     */
    WRAP_ROOT_VALUE(false),

    /**
     * 是否缩放排列输出,默认false，会增加json大小
     */
    INDENT_OUTPUT(false),

    /*
    /******************************************************
    /* 关于异常特性
    /******************************************************
     */

    /**
     * 遇到空对象则失败 如果实体没有get方法，会报异常
     */
    FAIL_ON_EMPTY_BEANS(true),

    /**
     * 自我引用则失败
     */
    FAIL_ON_SELF_REFERENCES(true),

    /**
     * 封装所有异常
     */
    WRAP_EXCEPTIONS(true),
    FAIL_ON_UNWRAPPED_TYPE_IDENTIFIERS(true),

    /*
    /******************************************************
    /* 输出的声明周期
    /******************************************************
     */

    /**
     * 该特性决定序列化root级对象的实现closeable接口的close方法是否在序列化后被调用。
     * 注意：如果true，则完成序列化后就关闭；如果，你可以在处理最后，调用排序操作等，则为false。
     */
    CLOSE_CLOSEABLE(false),

    /**
     * 该特性决定是否在writeValue()方法之后就调用JsonGenerator.flush()方法。
     * 当我们需要先压缩，然后再flush，则可能需要false。
     */
    FLUSH_AFTER_WRITE_VALUE(true),

    /*
    /******************************************************
    /* 数据类型特定序列化配置
    /******************************************************
     */

    /**
     * 序列化Date日期时以timestamps输出，默认true
     */
    WRITE_DATES_AS_TIMESTAMPS(true),

    /**
     * 是否将Map中得key为Date的值，也序列化为timestamps形式（否则，会被序列化为文本形式的值）。
     */
    WRITE_DATE_KEYS_AS_TIMESTAMPS(false),
    WRITE_DATES_WITH_ZONE_ID(false),
    WRITE_DURATIONS_AS_TIMESTAMPS(true),

    /**
     * 序列化char[]时以json数组输出，默认false
     */
    WRITE_CHAR_ARRAYS_AS_JSON_ARRAYS(false),

    /**
     * 序列化枚举是否以toString()来输出，默认false，即默认以name()来输出
     */
    WRITE_ENUMS_USING_TO_STRING(false),

    /**
     * 序列化枚举是以ordinal()来输出，默认false
     */
    WRITE_ENUMS_USING_INDEX(false),

    /**
     * 序列化单元素数组时不以数组来输出，默认false
     */
    WRITE_SINGLE_ELEM_ARRAYS_UNWRAPPED(false),

    /**
     * 该特性决定是否将基于Date的值序列化为纳秒级别
     */
    WRITE_DATE_TIMESTAMPS_AS_NANOSECONDS(true),

    /**
     * 序列化Map时对key进行排序操作，默认false
     */
    ORDER_MAP_ENTRIES_BY_KEYS(false),

    /*
    /******************************************************
    /* 其他特性
    /******************************************************
     */

    EAGER_SERIALIZER_FETCH(true),

    USE_EQUALITY_FOR_OBJECT_ID(false);

    private final boolean _defaultState;
    private final int _mask;

    private config(boolean defaultState) {
        _defaultState = defaultState;
        _mask = (1 << ordinal());
    }

    @Override
    public boolean enabledByDefault() {
        return _defaultState;
    }


    @Override
    public int getMask() {
        return _mask;
    }

    @Override
    public boolean enabledIn(int flags) {
        return (flags & _mask) != 0;
    }
}
123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263646566676869707172737475767778798081828384858687888990919293949596979899100101102103104105106107108109110111112113114115116117118119120121122123124125126127128129130131132133134135136137138139
```

**DeserializationFeature（反序列化相关属性）**

```
public enum DeserializationFeature implements ConfigFeature {
   /*
    /******************************************************
    /* 值转换特性
     */
    /******************************************************
     */

    /**
     * 该特性决定对于json浮点数，是否使用BigDecimal来反序列化。如果不允许，则使用Double序列化。 默认为false
     */
    USE_BIG_DECIMAL_FOR_FLOATS(false),

    /**
     * 该特性决定对于json整型，是否使用BigInteger来反序列化。如果不允许，将根据数字的长度转换为Integer、Long、BigInteger。 默认为false
     */
    USE_BIG_INTEGER_FOR_INTS(false),

    /**
     * 该特性决定对于json整型，是否使用Long来反序列化。如果不允许，将根据数字的长度转换为Integer等短整型。 默认为false
     * 如果USE_BIG_INTEGER_FOR_INTS是开启的，将优先使用USE_BIG_INTEGER_FOR_INTS
     */
    USE_LONG_FOR_INTS(false),

    /**
     * 该特性决定对于json数组，是否使用Object[]来反序列化。如果不允许，将根据数字的长度转换为List<Object>。 默认为false
     */
    USE_JAVA_ARRAY_FOR_JSON_ARRAY(false),

    /*
    /******************************************************
    /* 异常捕获特性
    /******************************************************
     */

    /**
     * 反序列化时,遇到未知属性(那些没有对应的属性来映射的属性,并且没有任何setter或handler来处理这样的属性)时是否引起结果失败。默认为true
     */
    FAIL_ON_UNKNOWN_PROPERTIES(true),

    /**
     * 反序列化时,遇到null属性映射在java基本数据类型（int或douuble）是否报异常。默认为false
     */
    FAIL_ON_NULL_FOR_PRIMITIVES(false),

    /**
     * 反序列化时,遇到integer numbers属性映射在enum类型时，如果为true,numbers将不可以映射到enum中。默认为false
     */
    FAIL_ON_NUMBERS_FOR_ENUMS(false),

    /**
     * 反序列化时，遇到类名错误或者map中id找不到时是否报异常。默认为true
     */
    FAIL_ON_INVALID_SUBTYPE(true),

    /**
     * 反序列化时，遇到json数据存在两个相同的key时是否报异常。默认为false
     */
    FAIL_ON_READING_DUP_TREE_KEY(false),

    /**
     * 反序列化时，遇到json属性字段为可忽略的是否报异常。默认为false
     */
    FAIL_ON_IGNORED_PROPERTIES(false),

    /**
     * Feature that determines what happens if an Object Id reference is encountered
     * that does not refer to an actual Object with that id ("unresolved Object Id"):
     * either an exception is thrown (<code>true</code>), or a null object is used
     * instead (<code>false</code>).
     * Note that if this is set to <code>false</code>, no further processing is done;
     * specifically, if reference is defined via setter method, that method will NOT
     * be called.
     * <p>
     * Feature is enabled by default, so that unknown Object Ids will result in an
     * exception being thrown, at the end of deserialization.
     */
    FAIL_ON_UNRESOLVED_OBJECT_IDS(true),

    /**
     * Feature that determines what happens if one or more Creator properties (properties
     * bound to parameters of Creator method (constructor or static factory method))
     * are missing value to bind to from content.
     * If enabled, such missing values result in a {@link JsonMappingException} being
     * thrown with information on the first one (by index) of missing properties.
     * If disabled, and if property is NOT marked as required,
     * missing Creator properties are filled
     * with <code>null values</code> provided by deserializer for the type of parameter
     * (usually null for Object types, and default value for primitives; but redefinable
     * via custom deserializers).
     * <p>
     * Note that having an injectable value counts as "not missing".
     * <p>
     * Feature is disabled by default, so that no exception is thrown for missing creator
     * property values, unless they are explicitly marked as `required`.
     *
     * @since 2.6
     */
    FAIL_ON_MISSING_CREATOR_PROPERTIES(false),

    /**
     * Feature that determines what happens if one or more Creator properties (properties
     * bound to parameters of Creator method (constructor or static factory method))
     * are bound to null values - either from the JSON or as a default value. This
     * is useful if you want to avoid nulls in your codebase, and particularly useful
     * if you are using Java or Scala optionals for non-mandatory fields.
     * Feature is disabled by default, so that no exception is thrown for missing creator
     * property values, unless they are explicitly marked as `required`.
     *
     * @since 2.8
     */
    FAIL_ON_NULL_CREATOR_PROPERTIES(false),

    /**
     * Feature that determines what happens when a property annotated with
     * {@link com.fasterxml.jackson.annotation.JsonTypeInfo.As#EXTERNAL_PROPERTY} is missing,
     * but associated type id is available. If enabled, {@link JsonMappingException} is always
     * thrown when property value is missing (if type id does exist);
     * if disabled, exception is only thrown if property is marked as `required`.
     * <p>
     * Feature is enabled by default, so that exception is thrown when a subtype property is
     * missing.
     *
     * @since 2.9
     */
    FAIL_ON_MISSING_EXTERNAL_TYPE_ID_PROPERTY(true),

    /**
     * Feature that determines behaviour for data-binding after binding the root value.
     * If feature is enabled, one more call to
     * {@link com.fasterxml.jackson.core.JsonParser#nextToken} is made to ensure that
     * no more tokens are found (and if any is found,
     * {@link com.fasterxml.jackson.databind.exc.MismatchedInputException} is thrown); if
     * disabled, no further checks are made.
     * <p>
     * Feature could alternatively be called <code>READ_FULL_STREAM</code>, since it
     * effectively verifies that input stream contains only as much data as is needed
     * for binding the full value, and nothing more (except for possible ignorable
     * white space or comments, if supported by data format).
     * <p>
     * Feature is disabled by default (so that no check is made for possible trailing
     * token(s)) for backwards compatibility reasons.
     *
     * @since 2.9
     */
    FAIL_ON_TRAILING_TOKENS(false),

    /**
     * Feature that determines whether Jackson code should catch
     * and wrap {@link Exception}s (but never {@link Error}s!)
     * to add additional information about
     * location (within input) of problem or not. If enabled,
     * most exceptions will be caught and re-thrown (exception
     * specifically being that {@link java.io.IOException}s may be passed
     * as is, since they are declared as throwable); this can be
     * convenient both in that all exceptions will be checked and
     * declared, and so there is more contextual information.
     * However, sometimes calling application may just want "raw"
     * unchecked exceptions passed as is.
     * <p>
     * Feature is enabled by default.
     */
    WRAP_EXCEPTIONS(true),

    /*
    /******************************************************
    /* 结构转换特性
    /******************************************************
     */

    /**
     * 反序列化时，是否接受单个value转为List，如json字符串中单个String值 可以转为Bean中的List。默认为false
     */
    ACCEPT_SINGLE_VALUE_AS_ARRAY(false),

    /**
     * 将json中的数组映射到实体单值中
     * 例如 {"aaa":[{"value":"wewfewfew"}],"bbb":[{"value":"wefwefw"}]}
     * 转换为
     * public class MyEntity{
     * private String aaa;
     * private String bbb;
     * }
     */
    UNWRAP_SINGLE_VALUE_ARRAYS(false),

    /**
     * 对于设置了@JsonRootName实体转换的json，可通过该属性进行实体转换
     */
    UNWRAP_ROOT_VALUE(false),

    /*
    /******************************************************
    /* 值转换特性
    /******************************************************
     */

    /**
     * 反序列化时，是否将空字符传转化为null。默认为false
     */
    ACCEPT_EMPTY_STRING_AS_NULL_OBJECT(false),

    /**
     * 反序列化时，是否将空数组转换为null。默认为false
     */
    ACCEPT_EMPTY_ARRAY_AS_NULL_OBJECT(false),

    /**
     * 反序列化时，是否可将JSON float值被反序列化为 int 、 long 或 BigInteger。默认为true
     */
    ACCEPT_FLOAT_AS_INT(true),

    /**
     * Feature that determines standard deserialization mechanism used for
     * Enum values: if enabled, Enums are assumed to have been serialized  using
     * return value of <code>Enum.toString()</code>;
     * if disabled, return value of <code>Enum.name()</code> is assumed to have been used.
     * <p>
     * Note: this feature should usually have same value
     * as {@link SerializationFeature#WRITE_ENUMS_USING_TO_STRING}.
     * <p>
     * Feature is disabled by default.
     */
    READ_ENUMS_USING_TO_STRING(false),

    /**
     * Feature that allows unknown Enum values to be parsed as null values.
     * If disabled, unknown Enum values will throw exceptions.
     * <p>
     * Note that in some cases this will basically ignore unknown Enum values;
     * this is the keys for keys of {@link java.util.EnumMap} and values
     * of {@link java.util.EnumSet} (because nulls are not accepted in these
     * cases).
     * <p>
     * Feature is disabled by default.
     *
     * @since 2.0
     */
    READ_UNKNOWN_ENUM_VALUES_AS_NULL(false),

    /**
     * Feature that allows unknown Enum values to be ignored and a predefined value specified through
     * {@link com.fasterxml.jackson.annotation.JsonEnumDefaultValue @JsonEnumDefaultValue} annotation.
     * If disabled, unknown Enum values will throw exceptions.
     * If enabled, but no predefined default Enum value is specified, an exception will be thrown as well.
     * <p>
     * Feature is disabled by default.
     *
     * @since 2.8
     */
    READ_UNKNOWN_ENUM_VALUES_USING_DEFAULT_VALUE(false),

    /**
     * 反序列化时，是否使用long解析时间。默认为true
     */
    READ_DATE_TIMESTAMPS_AS_NANOSECONDS(true),

    /**
     * Feature that specifies whether context provided {@link java.util.TimeZone}
     * ({@link DeserializationContext#getTimeZone()} should be used to adjust Date/Time
     * values on deserialization, even if value itself contains timezone information.
     * If enabled, contextual <code>TimeZone</code> will essentially override any other
     * TimeZone information; if disabled, it will only be used if value itself does not
     * contain any TimeZone information.
     * <p>
     * Note that exact behavior depends on date/time types in question; and specifically
     * JDK type of {@link java.util.Date} does NOT have in-built timezone information
     * so this setting has no effect.
     * Further, while {@link java.util.Calendar} does have this information basic
     * JDK {@link java.text.SimpleDateFormat} is unable to retain parsed zone information,
     * and as a result, {@link java.util.Calendar} will always get context timezone
     * adjustment regardless of this setting.
     * <p>
     * <p>
     * Taking above into account, this feature is supported only by extension modules for
     * Joda and Java 8 date/tyime datatypes.
     *
     * @since 2.2
     */
    ADJUST_DATES_TO_CONTEXT_TIME_ZONE(true),

    /*
    /******************************************************
    /* Other
    /******************************************************
     */

    /**
     * Feature that determines whether {@link ObjectReader} should
     * try to eagerly fetch necessary {@link JsonDeserializer} when
     * possible. This improves performance in cases where similarly
     * configured {@link ObjectReader} instance is used multiple
     * times; and should not significantly affect single-use cases.
     * <p>
     * Note that there should not be any need to normally disable this
     * feature: only consider that if there are actual perceived problems.
     * <p>
     * Feature is enabled by default.
     *
     * @since 2.1
     */
    EAGER_DESERIALIZER_FETCH(true);

    private final boolean _defaultState;
    private final int _mask;

    private DeserializationFeature(boolean defaultState) {
        _defaultState = defaultState;
        _mask = (1 << ordinal());
    }

    @Override
    public boolean enabledByDefault() {
        return _defaultState;
    }

    @Override
    public int getMask() {
        return _mask;
    }

    @Override
    public boolean enabledIn(int flags) {
        return (flags & _mask) != 0;
    }
}
123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263646566676869707172737475767778798081828384858687888990919293949596979899100101102103104105106107108109110111112113114115116117118119120121122123124125126127128129130131132133134135136137138139140141142143144145146147148149150151152153154155156157158159160161162163164165166167168169170171172173174175176177178179180181182183184185186187188189190191192193194195196197198199200201202203204205206207208209210211212213214215216217218219220221222223224225226227228229230231232233234235236237238239240241242243244245246247248249250251252253254255256257258259260261262263264265266267268269270271272273274275276277278279280281282283284285286287288289290291292293294295296297298299300301302303304305306307308309310311312313314315316317318319320321322323324325326
```

**MapperFeature**

```
public enum MapperFeature implements ConfigFeature {
    /*
    /******************************************************
    /* 通用配置
    /******************************************************
     */

    /**
     * 是否开启注解
     */
    USE_ANNOTATIONS(true),

    /**
     * 使用getter方法来作为setter方法（一般只处理集合和Maps，和其他没有setter的类型）。 该属性决定是否不需要setter方法，而只需要getter方法来修改属性。
     */
    USE_GETTERS_AS_SETTERS(true),

    /**
     * Feature that determines how <code>transient</code> modifier for fields
     * is handled: if disabled, it is only taken to mean exclusion of the field
     * as accessor; if true, it is taken to imply removal of the whole property.
     * <p>
     * Feature is disabled by default, meaning that existence of `transient`
     * for a field does not necessarily lead to ignoral of getters or setters
     * but just ignoring the use of field for access.
     *
     * @since 2.6
     */
    PROPAGATE_TRANSIENT_MARKER(false),

    /*
    /******************************************************
    /* Introspection-based property auto-detection
    /******************************************************
     */

    /**
     * 该特性决定是否使用creator方法来根据公共构造函数以及名字为“valueOf”的静态单参数方法自动检测。
     */
    AUTO_DETECT_CREATORS(true),

    /**
     * 这个特性决定是否非静态字段被当做属性。如果true，则所有公共成员字段都被当做属性， 否则只有注解，才会被当做属性字段。
     */
    AUTO_DETECT_FIELDS(true),

    /**
     * 该特性决定是否使用“getter”方法来根据标准bean命名转换方式来自动检测。如果true，则所有公共的带有一个参数
     * 并且前缀为get的方法都将被当做getter方法。如果false，只会把显式注解的作为getter方法。
     */
    AUTO_DETECT_GETTERS(true),

    /**
     * 获取getter方法，前缀为is
     */
    AUTO_DETECT_IS_GETTERS(true),

    /**
     * 该特性决定是否使用“setter”方法来根据标准bean命名转换方式来自动检测。如果true，则所有公共的带有一个参数
     * 并且前缀为set的方法都将被当做setter方法。如果false，只会把显式注解的作为setter方法。
     */
    AUTO_DETECT_SETTERS(true),

    /**
     * 如果这个配置为false时，只有存在对应的构造器、setter或者field时，才调用getter
     */
    REQUIRE_SETTERS_FOR_GETTERS(false),

    /**
     * Feature that determines whether member fields declared as 'final' may
     * be auto-detected to be used mutators (used to change value of the logical
     * property) or not. If enabled, 'final' access modifier has no effect, and
     * such fields may be detected according to usual visibility and inference
     * rules; if disabled, such fields are NOT used as mutators except if
     * explicitly annotated for such use.
     * <p>
     * Feature is enabled by default, for backwards compatibility reasons.
     *
     * @since 2.2
     */
    ALLOW_FINAL_FIELDS_AS_MUTATORS(true),

    /**
     * Feature that determines whether member mutators (fields and
     * setters) may be "pulled in" even if they are not visible,
     * as long as there is a visible accessor (getter or field) with same name.
     * For example: field "value" may be inferred as mutator,
     * if there is visible or explicitly marked getter "getValue()".
     * If enabled, inferring is enabled; otherwise (disabled) only visible and
     * explicitly annotated accessors are ever used.
     * <p>
     * Note that 'getters' are never inferred and need to be either visible (including
     * bean-style naming) or explicitly annotated.
     * <p>
     * Feature is enabled by default.
     *
     * @since 2.2
     */
    INFER_PROPERTY_MUTATORS(true),

    /**
     * Feature that determines handling of <code>java.beans.ConstructorProperties<code>
     * annotation: when enabled, it is considered as alias of
     * {@link com.fasterxml.jackson.annotation.JsonCreator}, to mean that constructor
     * should be considered a property-based Creator; when disabled, only constructor
     * parameter name information is used, but constructor is NOT considered an explicit
     * Creator (although may be discovered as one using other annotations or heuristics).
     * <p>
     * Feature is mostly used to help interoperability with frameworks like Lombok
     * that may automatically generate <code>ConstructorProperties</code> annotation
     * but without necessarily meaning that constructor should be used as Creator
     * for deserialization.
     * <p>
     * Feature is enabled by default.
     *
     * @since 2.9
     */
    INFER_CREATOR_FROM_CONSTRUCTOR_PROPERTIES(true),

    /*
    /******************************************************
    /* Access modifier handling
    /******************************************************
     */

    /**
     * Feature that determines whether method and field access
     * modifier settings can be overridden when accessing
     * properties. If enabled, method
     * {@link java.lang.reflect.AccessibleObject#setAccessible}
     * may be called to enable access to otherwise unaccessible objects.
     * <p>
     * Note that this setting may have significant performance implications,
     * since access override helps remove costly access checks on each
     * and every Reflection access. If you are considering disabling
     * this feature, be sure to verify performance consequences if usage
     * is performance sensitive.
     * Also note that performance effects vary between Java platforms
     * (JavaSE vs Android, for example), as well as JDK versions: older
     * versions seemed to have more significant performance difference.
     * <p>
     * Conversely, on some platforms, it may be necessary to disable this feature
     * as platform does not allow such calls. For example, when developing
     * Applets (or other Java code that runs on tightly restricted sandbox),
     * it may be necessary to disable the feature regardless of performance effects.
     * <p>
     * Feature is enabled by default.
     */
    CAN_OVERRIDE_ACCESS_MODIFIERS(true),

    /**
     * Feature that determines that forces call to
     * {@link java.lang.reflect.AccessibleObject#setAccessible} even for
     * <code>public</code> accessors -- that is, even if no such call is
     * needed from functionality perspective -- if call is allowed
     * (that is, {@link #CAN_OVERRIDE_ACCESS_MODIFIERS} is set to true).
     * The main reason to enable this feature is possible performance
     * improvement as JDK does not have to perform access checks; these
     * checks are otherwise made for all accessors, including public ones,
     * and may result in slower Reflection calls. Exact impact (if any)
     * depends on Java platform (Java SE, Android) as well as JDK version.
     * <p>
     * Feature is enabled by default, for legacy reasons (it was the behavior
     * until 2.6)
     *
     * @since 2.7
     */
    OVERRIDE_PUBLIC_ACCESS_MODIFIERS(true),

    /*
    /******************************************************
    /* Type-handling features
    /******************************************************
     */

    /**
     * 是否使用运行时动态类型，还是声明的静态类型
     */
    USE_STATIC_TYPING(false),

    /*
    /******************************************************
    /* View-related features
    /******************************************************
     */

    /**
     * 该特性决定拥有view注解的属性是否在JSON序列化视图中。如果true，则非注解视图，也包含；
     * 否则，它们将会被排除在外。
     */
    DEFAULT_VIEW_INCLUSION(true),

    /*
    /******************************************************
    /* Generic output features
    /******************************************************
     */

    /**
     * 是否对属性使用排序，默认排序按照字母顺序
     */
    SORT_PROPERTIES_ALPHABETICALLY(false),

    /*
    /******************************************************
    /* Name-related features
    /******************************************************
     */

    /**
     * 反序列化是否忽略大小写
     */
    ACCEPT_CASE_INSENSITIVE_PROPERTIES(false),


    /**
     * Feature that determines if Enum deserialization should be case sensitive or not.
     * If enabled, Enum deserialization will ignore case, that is, case of incoming String
     * value and enum id (dependant on other settings, either `name()`, `toString()`, or
     * explicit override) do not need to match.
     * <p>
     * Feature is disabled by default.
     *
     * @since 2.9
     */
    ACCEPT_CASE_INSENSITIVE_ENUMS(false),

    /**
     * Feature that can be enabled to make property names be
     * overridden by wrapper name (usually detected with annotations
     * as defined by {@link AnnotationIntrospector#findWrapperName}.
     * If enabled, all properties that have associated non-empty Wrapper
     * name will use that wrapper name instead of property name.
     * If disabled, wrapper name is only used for wrapping (if anything).
     * <p>
     * Feature is disabled by default.
     *
     * @since 2.1
     */
    USE_WRAPPER_NAME_AS_PROPERTY_NAME(false),

    /**
     * Feature that may be enabled to enforce strict compatibility with
     * Bean name introspection, instead of slightly different mechanism
     * Jackson defaults to.
     * Specific difference is that Jackson always lower cases leading upper-case
     * letters, so "getURL()" becomes "url" property; whereas standard Bean
     * naming <b>only</b> lower-cases the first letter if it is NOT followed by
     * another upper-case letter (so "getURL()" would result in "URL" property).
     * <p>
     * Feature is disabled by default for backwards compatibility purposes: earlier
     * Jackson versions used Jackson's own mechanism.
     *
     * @since 2.5
     */
    USE_STD_BEAN_NAMING(false),

    /**
     * Feature that when enabled will allow explicitly named properties (i.e., fields or methods
     * annotated with {@link com.fasterxml.jackson.annotation.JsonProperty}("explicitName")) to
     * be re-named by a {@link PropertyNamingStrategy}, if one is configured.
     * <p>
     * Feature is disabled by default.
     *
     * @since 2.7
     */
    ALLOW_EXPLICIT_PROPERTY_RENAMING(false),

    /*
    /******************************************************
    /* Coercion features
    /******************************************************
     */

    /**
     * Feature that determines whether coercions from secondary representations are allowed
     * for simple non-textual scalar types: numbers and booleans. This includes `primitive`
     * types and their wrappers, but excludes `java.lang.String` and date/time types.
     * <p>
     * When feature is disabled, only strictly compatible input may be bound: numbers for
     * numbers, boolean values for booleans. When feature is enabled, conversions from
     * JSON String are allowed, as long as textual value matches (for example, String
     * "true" is allowed as equivalent of JSON boolean token `true`; or String "1.0"
     * for `double`).
     * <p>
     * Note that it is possible that other configurability options can override this
     * in closer scope (like on per-type or per-property basis); this is just the global
     * default.
     * <p>
     * Feature is enabled by default (for backwards compatibility since this was the
     * default behavior)
     *
     * @since 2.9
     */
    ALLOW_COERCION_OF_SCALARS(true),

    /*
    /******************************************************
    /* Other features
    /******************************************************
     */

    /**
     * Feature that determines whether multiple registrations of same module
     * should be ignored or not; if enabled, only the first registration call
     * results in module being called, and possible duplicate calls are silently
     * ignored; if disabled, no checking is done and all registration calls are
     * dispatched to module.
     * <p>
     * Definition of "same module" is based on using {@link Module#getTypeId()};
     * modules with same non-null <code>type id</code> are considered same for
     * purposes of duplicate registration. This also avoids having to keep track
     * of actual module instances; only ids will be kept track of (and only if
     * this feature is enabled).
     * <p>
     * Feature is enabled by default.
     *
     * @since 2.5
     */
    IGNORE_DUPLICATE_MODULE_REGISTRATIONS(true),

    /**
     * Setting that determines what happens if an attempt is made to explicitly
     * "merge" value of a property, where value does not support merging; either
     * merging is skipped and new value is created (<code>true</code>) or
     * an exception is thrown (false).
     * <p>
     * Feature is disabled by default since non-mergeable property types are ignored
     * even if defaults call for merging, and usually explicit per-type or per-property
     * settings for such types should result in an exception.
     *
     * @since 2.9
     */
    IGNORE_MERGE_FOR_UNMERGEABLE(true);

    private final boolean _defaultState;
    private final int _mask;

    private MapperFeature(boolean defaultState) {
        _defaultState = defaultState;
        _mask = (1 << ordinal());
    }

    @Override
    public boolean enabledByDefault() {
        return _defaultState;
    }

    @Override
    public int getMask() {
        return _mask;
    }

    @Override
    public boolean enabledIn(int flags) {
        return (flags & _mask) != 0;
    }
}
123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263646566676869707172737475767778798081828384858687888990919293949596979899100101102103104105106107108109110111112113114115116117118119120121122123124125126127128129130131132133134135136137138139140141142143144145146147148149150151152153154155156157158159160161162163164165166167168169170171172173174175176177178179180181182183184185186187188189190191192193194195196197198199200201202203204205206207208209210211212213214215216217218219220221222223224225226227228229230231232233234235236237238239240241242243244245246247248249250251252253254255256257258259260261262263264265266267268269270271272273274275276277278279280281282283284285286287288289290291292293294295296297298299300301302303304305306307308309310311312313314315316317318319320321322323324325326327328329330331332333334335336337338339340341342343344345346347348349350351352353354355356357358
```

**JsonParser.Feature（解析器特性）**

```
public enum JsonParser {
    /**
     * 自动关闭源：默认true_启用（即：解析json字符串后，自动关闭输入流）
     * 该特性，决定了解析器是否可以自动关闭非自身的底层输入源
     * 1.禁用：应用程序将分开关闭底层的{@link InputStream} and {@link Reader}
     * 2.启用：解析器将关闭上述对象，其自身也关闭，此时input终止且调用
     */
    AUTO_CLOSE_SOURCE(true),


    /**
     * 默认false：不解析含有注释符（即：true时解析含有注释的json字符串）
     * 该特性，决定了解析器是否可以解析含有Java/C++注释样式(如：/*或//的注释符)
     * 注意：标准的json字符串格式没有含有注释符（非标准），然而则经常使用
     */
    ALLOW_COMMENTS(false),

    /**
     * 默认false：不解析含有另外注释符
     * 该特性，决定了解析器是否可以解析含有以"#"开头并直到一行结束的注释样式（这样的注释风格通常也用在脚本语言中）
     * 注意：标准的json字符串格式没有含有注释符（非标准），然而则经常使用
     */
    ALLOW_YAML_COMMENTS(false),

    /**
     * * 默认false：不解析含有结束语的字符
     * 该特性，决定了解析器是否可以解析该字符（结束语字段符，一般在js中出现）
     * 注意：标准的json字符串格式没有含有注释符（非标准），然而则经常使用
     */
    ALLOW_UNQUOTED_FIELD_NAMES(false),

    /**
     * 默认false：不解析含有单引号的字符串或字符
     * 该特性，决定了解析器是否可以解析单引号的字符串或字符(如：单引号的字符串，单引号'\'')
     * 注意：可作为其他可接受的标记，但不是JSON的规范
     */
    ALLOW_SINGLE_QUOTES(false),

    /**
     * 允许：默认false_不解析含有结束语控制字符
     * 该特性，决定了解析器是否可以解析结束语控制字符(如：ASCII<32，如包含tab或换行符)
     * 注意：设置false（默认）时，若解析则抛出异常;若true时，则用引号即可转义
     */
    ALLOW_UNQUOTED_CONTROL_CHARS(false),

    /**
     * 可解析反斜杠引用的所有字符，默认：false，不可解析
     */
    ALLOW_BACKSLASH_ESCAPING_ANY_CHARACTER(false),

    /**
     * 可解析以"0"为开头的数字(如: 000001)，解析时则忽略0，默认：false，不可解析，若有则抛出异常
     */
    ALLOW_NUMERIC_LEADING_ZEROS(false),

    /**
     * 可解析非数值的数值格式（如：正无穷大，负无穷大，除以0等其他类似数据格式和xml的标签等）
     * 默认：false，不能解析
     */
    ALLOW_NON_NUMERIC_NUMBERS(false),

    /**
     * 默认：false，JSON数组中不解析漏掉的值，若有，则会抛出异常{@link JsonToken#VALUE_NULL}
     * true时，可解析["value1",,"value3",]最终为["value1", null, "value3", null]空值作为null
     */
    ALLOW_MISSING_VALUES(false),

    /**
     * 默认：false，JSON数组中是否解析带逗号的数据
     * true时，解析json{"a": true,}等价于{"a": true}
     */
    ALLOW_TRAILING_COMMA(false),

    /**
     * 默认：false，不检测JSON对象重复的字段名，即：相同字段名都要解析
     * true时，检测是否有重复字段名，若有，则抛出异常{@link JsonParseException}
     * 注意：检查时，解析性能下降，时间超过一般情况的20-30%
     */
    STRICT_DUPLICATE_DETECTION(false),

    /**
     * 默认：false，底层的数据流(二进制数据持久化，如：图片，视频等)全部被output，若读取一个位置的字段，则抛出异常
     * true时，则忽略未定义
     */
    IGNORE_UNDEFINED(false),

    // // // Other

    /**
     * Feature that determines whether {@link JsonLocation} instances should be constructed
     * with reference to source or not. If source reference is included, its type and contents
     * are included when `toString()` method is called (most notably when printing out parse
     * exception with that location information). If feature is disabled, no source reference
     * is passed and source is only indicated as "UNKNOWN".
     * <p>
     * Most common reason for disabling this feature is to avoid leaking information about
     * internal information; this may be done for security reasons.
     * Note that even if source reference is included, only parts of contents are usually
     * printed, and not the whole contents. Further, many source reference types can not
     * necessarily access contents (like streams), so only type is indicated, not contents.
     * <p>
     * Feature is enabled by default, meaning that "source reference" information is passed
     * and some or all of the source content may be included in {@link JsonLocation} information
     * constructed either when requested explicitly, or when needed for an exception.
     *
     * @since 2.9
     */
    INCLUDE_SOURCE_IN_LOCATION(true),;

    /**
     * Whether feature is enabled or disabled by default.
     */
    private final boolean _defaultState;

    private final int _mask;

    /**
     * Method that calculates bit set (flags) of all features that
     * are enabled by default.
     */
    public static int collectDefaults() {
        int flags = 0;
        for (Feature f : values()) {
            if (f.enabledByDefault()) {
                flags |= f.getMask();
            }
        }
        return flags;
    }

    private Feature(boolean defaultState) {
        _mask = (1 << ordinal());
        _defaultState = defaultState;
    }

    public boolean enabledByDefault() {
        return _defaultState;
    }

    /**
     * @since 2.3
     */
    public boolean enabledIn(int flags) {
        return (flags & _mask) != 0;
    }

    public int getMask() {
        return _mask;
    }
}
123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263646566676869707172737475767778798081828384858687888990919293949596979899100101102103104105106107108109110111112113114115116117118119120121122123124125126127128129130131132133134135136137138139140141142143144145146147148149150
```

**JsonGenerator**

```
public enum JsonGenerator {
    // // Low-level I/O / content features

    /**
     * Feature that determines whether generator will automatically
     * close underlying output target that is NOT owned by the
     * generator.
     * If disabled, calling application has to separately
     * close the underlying {@link OutputStream} and {@link Writer}
     * instances used to create the generator. If enabled, generator
     * will handle closing, as long as generator itself gets closed:
     * this happens when end-of-input is encountered, or generator
     * is closed by a call to {@link com.fasterxml.jackson.core.JsonGenerator#close}.
     * <p>
     * Feature is enabled by default.
     */
    AUTO_CLOSE_TARGET(true),

    /**
     * Feature that determines what happens when the generator is
     * closed while there are still unmatched
     * {@link JsonToken#START_ARRAY} or {@link JsonToken#START_OBJECT}
     * entries in output content. If enabled, such Array(s) and/or
     * Object(s) are automatically closed; if disabled, nothing
     * specific is done.
     * <p>
     * Feature is enabled by default.
     */
    AUTO_CLOSE_JSON_CONTENT(true),

    /**
     * Feature that specifies that calls to {@link #flush} will cause
     * matching <code>flush()</code> to underlying {@link OutputStream}
     * or {@link Writer}; if disabled this will not be done.
     * Main reason to disable this feature is to prevent flushing at
     * generator level, if it is not possible to prevent method being
     * called by other code (like <code>ObjectMapper</code> or third
     * party libraries).
     * <p>
     * Feature is enabled by default.
     */
    FLUSH_PASSED_TO_STREAM(true),

    // // Quoting-related features

    /**
     * Feature that determines whether JSON Object field names are
     * quoted using double-quotes, as specified by JSON specification
     * or not. Ability to disable quoting was added to support use
     * cases where they are not usually expected, which most commonly
     * occurs when used straight from Javascript.
     * <p>
     * Feature is enabled by default (since it is required by JSON specification).
     */
    QUOTE_FIELD_NAMES(true),

    /**
     * Feature that determines whether "exceptional" (not real number)
     * float/double values are output as quoted strings.
     * The values checked are Double.Nan,
     * Double.POSITIVE_INFINITY and Double.NEGATIVE_INIFINTY (and
     * associated Float values).
     * If feature is disabled, these numbers are still output using
     * associated literal values, resulting in non-conformant
     * output.
     * <p>
     * Feature is enabled by default.
     */
    QUOTE_NON_NUMERIC_NUMBERS(true),

    /**
     * Feature that forces all Java numbers to be written as JSON strings.
     * Default state is 'false', meaning that Java numbers are to
     * be serialized using basic numeric serialization (as JSON
     * numbers, integral or floating point). If enabled, all such
     * numeric values are instead written out as JSON Strings.
     * <p>
     * One use case is to avoid problems with Javascript limitations:
     * since Javascript standard specifies that all number handling
     * should be done using 64-bit IEEE 754 floating point values,
     * result being that some 64-bit integer values can not be
     * accurately represent (as mantissa is only 51 bit wide).
     * <p>
     * Feature is disabled by default.
     */
    WRITE_NUMBERS_AS_STRINGS(false),

    /**
     * Feature that determines whether {@link java.math.BigDecimal} entries are
     * serialized using {@link java.math.BigDecimal#toPlainString()} to prevent
     * values to be written using scientific notation.
     * <p>
     * Feature is disabled by default, so default output mode is used; this generally
     * depends on how {@link BigDecimal} has been created.
     *
     * @since 2.3
     */
    WRITE_BIGDECIMAL_AS_PLAIN(false),

    /**
     * Feature that specifies that all characters beyond 7-bit ASCII
     * range (i.e. code points of 128 and above) need to be output
     * using format-specific escapes (for JSON, backslash escapes),
     * if format uses escaping mechanisms (which is generally true
     * for textual formats but not for binary formats).
     * <p>
     * Note that this setting may not necessarily make sense for all
     * data formats (for example, binary formats typically do not use
     * any escaping mechanisms; and some textual formats do not have
     * general-purpose escaping); if so, settings is simply ignored.
     * Put another way, effects of this feature are data-format specific.
     * <p>
     * Feature is disabled by default.
     */
    ESCAPE_NON_ASCII(false),

// 23-Nov-2015, tatu: for [core#223], if and when it gets implemented
    /**
     * Feature that specifies handling of UTF-8 content that contains
     * characters beyond BMP (Basic Multilingual Plane), which are
     * represented in UCS-2 (Java internal character encoding) as two
     * "surrogate" characters. If feature is enabled, these surrogate
     * pairs are separately escaped using backslash escapes; if disabled,
     * native output (4-byte UTF-8 sequence, or, with char-backed output
     * targets, writing of surrogates as is which is typically converted
     * by {@link java.io.Writer} into 4-byte UTF-8 sequence eventually)
     * is used.
     *<p>
     * Note that the original JSON specification suggests use of escaping;
     * but that this is not correct from standard UTF-8 handling perspective.
     * Because of two competing goals, this feature was added to allow either
     * behavior to be used, but defaulting to UTF-8 specification compliant
     * mode.
     *<p>
     * Feature is disabled by default.
     *
     * @since Xxx
     */
//        ESCAPE_UTF8_SURROGATES(false),

    // // Schema/Validity support features

    /**
     * Feature that determines whether {@link com.fasterxml.jackson.core.JsonGenerator} will explicitly
     * check that no duplicate JSON Object field names are written.
     * If enabled, generator will check all names within context and report
     * duplicates by throwing a {@link JsonGenerationException}; if disabled,
     * no such checking will be done. Assumption in latter case is
     * that caller takes care of not trying to write duplicate names.
     * <p>
     * Note that enabling this feature will incur performance overhead
     * due to having to store and check additional information.
     * <p>
     * Feature is disabled by default.
     *
     * @since 2.3
     */
    STRICT_DUPLICATE_DETECTION(false),

    /**
     * Feature that determines what to do if the underlying data format requires knowledge
     * of all properties to output, and if no definition is found for a property that
     * caller tries to write. If enabled, such properties will be quietly ignored;
     * if disabled, a {@link JsonProcessingException} will be thrown to indicate the
     * problem.
     * Typically most textual data formats do NOT require schema information (although
     * some do, such as CSV), whereas many binary data formats do require definitions
     * (such as Avro, protobuf), although not all (Smile, CBOR, BSON and MessagePack do not).
     * <p>
     * Note that support for this feature is implemented by individual data format
     * module, if (and only if) it makes sense for the format in question. For JSON,
     * for example, this feature has no effect as properties need not be pre-defined.
     * <p>
     * Feature is disabled by default, meaning that if the underlying data format
     * requires knowledge of all properties to output, attempts to write an unknown
     * property will result in a {@link JsonProcessingException}
     *
     * @since 2.5
     */
    IGNORE_UNKNOWN(false),;

    private final boolean _defaultState;
    private final int _mask;

    /**
     * Method that calculates bit set (flags) of all features that
     * are enabled by default.
     */
    public static int collectDefaults() {
        int flags = 0;
        for (com.fasterxml.jackson.core.JsonGenerator.Feature f : values()) {
            if (f.enabledByDefault()) {
                flags |= f.getMask();
            }
        }
        return flags;
    }

    private Feature(boolean defaultState) {
        _defaultState = defaultState;
        _mask = (1 << ordinal());
    }

    public boolean enabledByDefault() {
        return _defaultState;
    }

    /**
     * @since 2.3
     */
    public boolean enabledIn(int flags) {
        return (flags & _mask) != 0;
    }

    public int getMask() {
        return _mask;
    }
}
123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263646566676869707172737475767778798081828384858687888990919293949596979899100101102103104105106107108109110111112113114115116117118119120121122123124125126127128129130131132133134135136137138139140141142143144145146147148149150151152153154155156157158159160161162163164165166167168169170171172173174175176177178179180181182183184185186187188189190191192193194195196197198199200201202203204205206207208209210211212213214215216217218
```

**JsonFactory**

```
public enum JsonFactory {
    /**
     * 1、如果canonicalization被启用，这个特性决定了是否被解码的字符串是否会使用String.intern（）——这个在很多时候可以提高反序列化的性能。 这样做可以进一步提高反序列化的性能，因为可以使用标识比较。
     * 2、如果字符串不会重复，或者不同的字符串数量太多（成千上万），那可能要考虑关闭这个选项，不然会占用太多的内存。
     */
    INTERN_FIELD_NAMES(true),

    /**
     * 意思是一旦名字字符串从输入（字节或字符流）被解码，它将被添加到一个符号表中，以减少在下次看到同一名字时被解码的开销（由同一工厂构造的任何解析器）
     */
    CANONICALIZE_FIELD_NAMES(true),

    /**
     * 由于规范化使用基于散列的方法将字节/字符序列解析为名称，所以理论上可以构造具有非常高的冲突率的名称集合。
     * 如果是这样，哈希查找的性能可能会严重降低。 为了防止这种可能性，符号表使用启发式来基于异常高的碰撞次数来检测可能的攻击。
     */
    FAIL_ON_SYMBOL_HASH_OVERFLOW(true),

    /**
     * 由于分配char []和byte []缓冲区用于内容读取/写入具有显着的影响，尤其是在处理相对较小的文档时，
     * 默认情况下JsonFactory使用SoftReference的ThreadLocal来引用BufferRecycler：这允许在多个读取/写操作。
     * 一般情况下这个选项打开对性能是有帮助的，但是在Android平台上，SoftReferences的处理是次要的，导致回收没有帮助，甚至可能只是增加了一些开销，所以可以考虑关闭。但是在关闭前请保证(a)你知道你在干什么，(b)获得可测量的性能提升。
     */
    USE_THREAD_LOCAL_FOR_BUFFER_RECYCLING(true);

    /**
     * Whether feature is enabled or disabled by default.
     */
    private final boolean _defaultState;

    /**
     * Method that calculates bit set (flags) of all features that
     * are enabled by default.
     */
    public static int collectDefaults() {
        int flags = 0;
        for (com.fasterxml.jackson.core.JsonFactory.Feature f : values()) {
            if (f.enabledByDefault()) {
                flags |= f.getMask();
            }
        }
        return flags;
    }

    private Feature(boolean defaultState) {
        _defaultState = defaultState;
    }

    public boolean enabledByDefault() {
        return _defaultState;
    }

    public boolean enabledIn(int flags) {
        return (flags & getMask()) != 0;
    }

    public int getMask() {
        return (1 << ordinal());
    }
}
123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960
```

## xml实体互转

引入依赖

```
<dependency>
    <groupId>com.fasterxml.jackson.dataformat</groupId>
    <artifactId>jackson-dataformat-xml</artifactId>
    <version>2.9.5</version>
</dependency>
12345
```

使用

```
/*
 * Java对象转xml
 */
@Test
public void testGenXml(){
    XmlMapper xmlMapper = new XmlMapper();

    Book book = new Book("Think in Java",100);
    try {
        String xmlStr =  xmlMapper.writeValueAsString(book);
        System.out.println(xmlStr);
    } catch (JsonProcessingException e) { 
        e.printStackTrace();
    }
}

/*
 * xml转Java对象
 */
@Test
public void testGenObjByXml(){
    XmlMapper xmlMapper = new XmlMapper();
    String xmlStr = "<Book><name>Think in Java</name><price>100</price></Book>"; 
    try {
        Book book = xmlMapper.readValue(xmlStr, Book.class);
        System.out.println(book);
    } catch (IOException e) {
        // TODO Auto-generated catch block
        e.printStackTrace();
    }
}
12345678910111213141516171819202122232425262728293031
```

参考网站

https://github.com/FasterXML/jackson-docs

http://www.baeldung.com/jackson

https://www.ibm.com/developerworks/cn/java/jackson-advanced-application/index.html

http://tutorials.jenkov.com/java-json/boon-objectmapper.html