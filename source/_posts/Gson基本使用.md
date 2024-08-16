---
title: Gson基本使用
date: 2021-02-03 20:35:26
tags: Java
---

> 世间的很多事物，追求时候的兴致总是要比享用的时候的兴致浓烈。——莎士比亚《威尼斯商人》

首先是`GAV`

```xml
        <!-- https://mvnrepository.com/artifact/com.google.code.gson/gson -->
        <dependency>
            <groupId>com.google.code.gson</groupId>
            <artifactId>gson</artifactId>
            <version>2.8.6</version>
        </dependency>
```

然后是[`API`文档](https://www.javadoc.io/doc/com.google.code.gson/gson/latest/com.google.gson/module-summary.html)

最后是使用，这里直接分享一篇不错的博客啦，[原文](https://blog.csdn.net/chenrenxiang/article/details/80291224)





Gson是谷歌官方推出的支持 `JSON -- Java Object` 相互转换的 Java`序列化/反序列化` 库，之前由于没有用过，所以学习一下。

#### 1. 导入Android Studio工程

```
dependencies {
    implementation 'com.google.code.gson:gson:2.8.4'
}
123
```



#### 2. 简单的 Java Object 序列化/反序列化

**序列化**

假如有一个`User`类，拥有 `name`, `email`, `age`, `isDeveloper` 四个属性，如下：

```
User userObject = new User(  
    "Norman", 
    "norman@futurestud.io", 
    26, 
    true
);
123456
```

使用Gson将它序列化：

```
Gson gson = new Gson();
String userJson = gson.toJson(userObject);
12
```

得到的结果如下：

```
{
	"isDeveloper":true,
	"name":"Norman",
	"age":26,
	"email":"norman@futurestud.io"
}
123456
```

**反序列化**

先定义一段JSON字符串

```
String userJson = "{'isDeveloper':false,'name':'xiaoqiang','age':26,'email':'578570174@qq.com'}";
1
```

Gson反序列化

```
User user = gson.fromJson(userJson, User.class);
1
```

debug一下，查看结果
![这里写图片描述](https://img-blog.csdn.net/20180512142304582?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NoZW5yZW54aWFuZw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
反序列化成功！



#### 3. 嵌套 Java Object 的序列化/反序列化

也就是说，一个类里面还包含有其它类。比如`User`类里面还有个用户地址`UserAddress`类，JSON结构如下：

```
{
    "age": 26,
    "email": "578570174@qq.com",
    "isDeveloper": true,
    "name": "chenrenxiang",

    "userAddress": {
        "city": "Magdeburg",
        "country": "Germany",
        "houseNumber": "42A",
        "street": "Main Street"
    }
}
12345678910111213
```

那么这种`Java Object`该如何序列化/反序列化呢？和上面一样。也就是说和 **2** 里面介绍的方法一样



#### 4. Array 和 List 的序列化/反序列化

**序列化**
序列化和前面介绍的方法是一样的

**反序列化**
那就有些不同了，不然也不用分开写。

*1 Array的反序列化*
先假设有一个`name`数组，定义JSON格式如下：

```
String namesJson = "['xiaoqiang','chenrenxiang','hahaha']";
1
```

然后使用Gson去反序列化它：

```
Gson gson = new Gson();
String[] nameArray = gson.fromJson(namesJson, String[].class);
12
```

得到的`nameArray`如下：
![这里写图片描述](https://img-blog.csdn.net/20180512142330331?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NoZW5yZW54aWFuZw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
其实这和 **2** 里面介绍的反序列化方法仍然是一样的。可以看到，Gson的反序列化都是调用 `Gson.fromJson(...)`方法，传入JSON字符串，以及这段JSON字符串对应的Object类型。

*2 List的反序列化*

```
String userJson = "[{'isDeveloper':false,'name':'xiaoqiang','age':26,'email':'578570174@qq.com'},{'isDeveloper':true,'name':'xiaoqiang123','age':27,'email':'578570174@gmail.com'}]";

Gson gson = new Gson();
Type userListType = new TypeToken<ArrayList<User>>(){}.getType();

List<User> userList = gson.fromJson(userJson, userListType); 
123456
```

对于`List`，反序列化时必须提供它的[Type](https://developer.android.com/reference/java/lang/reflect/Type)，通过`Gson`提供的`TypeToken<T>.getType()`方法可以定义当前List的`Type`。反序列化后结果如下：

![这里写图片描述](https://img-blog.csdn.net/20180512142350841?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NoZW5yZW54aWFuZw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

那么，如果一个`Java Object`里包含`List`类型的变量，该如何反序列化这个`Object`呢？答案是，和 **2** 一样就行了，无需为其内部的`List`提供`Type`。



#### 5. Map 和 Set 的序列化/反序列化

Map我平时用的较多，Set用的就很少了，它们的序列化/反序列化方法和List都是一样的，反序列化的时候需要提供`Type`



#### 6. 变量值为null时的序列化/反序列化

仍然以User类为例，如果一个User对象，里面的某个值为null，那么其序列化出来后的结果会是什么样的呢？

**先看序列化**，我们先初始化一个User对象，并把其中的email变量赋值为null，再用Gson来序列化它，如下：

```
    User user = new User(true, "chenrenxiang", 27, null);
    Gson gson = new Gson();
    String userJson = gson.toJson(user);
123
```

debug一下，得到结果如下：
![这里写图片描述](https://img-blog.csdn.net/20180512142402543?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NoZW5yZW54aWFuZw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

可见，当某个变量值为null时，Gson在序列化的时候直接把这个变量忽略了。

**再来看下反序列化**， 先定义一段JSON字符串，只给它一个变量值name，用User类来反序列化它，看得到的结果会是什么。

```
   String userJson = "{'name':'xiaoqiang'}";
   Gson gson = new Gson();
   User user = gson.fromJson(userJson, User.class);
123
```

![这里写图片描述](https://img-blog.csdn.net/20180512142412733?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NoZW5yZW54aWFuZw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
对于JSON字符串里没有的变量，Gson在反序列化时会给它一个默认值，int类型默认为0，bool类型默认为false，String类型默认为null。

有人不禁要问了，如果JSON字符串里某个变量的值为null，反序列化后的结果会是什么呢？我测试过了，和没有的结果是一样的。



#### 7. 控制序列化/反序列化 的变量名称

仍然以User对象为例，目前User对象里有四个变量`name`， `age`， `email`， `isDeveloper`。假如，某一天，JSON字符串的变量名`name`变成了`fullName`，无需紧张，我们不用把User类里的变量`name`改为`fullName`，然后把它的`get`和`set`方法都改了，然后把用到`get/set`方法的地方全改过来。只需要用Gson提供的注解方法`@SerializedName`就行了，如下：

```
public class User {
    private boolean isDeveloper;
    @SerializedName("fullName")
    private String name;
    private int age;
    private String email;
    ...
}
12345678
```

这样虽然JSON字符串里的变量名为`fullName`，但是反序列化后`fullName`的值会映射给`name`。同样，把一个User对象序列化，变量`name`会自动转换为`fullName`。

然而现实远比想象中复杂，这个JSON有时候传的是`fullName`，有时候传的是`name`，这时该怎么办呢？ 不用担心，`@SerializedName` 接受两个参数，`value` 和 `alternate` ，顾名思义，`alternate` 是备选变量名，比如下面这段代码：

```
public class User {
    private boolean isDeveloper;
    @SerializedName(value = "name", alternate = "fullName")
    private String name;
    private int age;
    private String email;
    ...
}
12345678
```

如果JSON传的是`name`，那么就用`name`的值，如果传的是`fullName`，那么就用`fullName`的值。需要注意的是，`alternate`只是反序列化JSON的一个备选变量名，它不会影响序列化，User对象序列化后，会使用`value`定义的名称为变量名。

又想到有一个问题，在定义了value和alternate的情况下，假如JSON同时传来了name和fullName，User的name变量会接受哪个值呢？ 经过测试，它会都接受。这样也是很合理的，因为Gson会对JSON中的变量一个一个地去解析，既然它可以接受name，也可以接受fullName，那么当同时传来这两个变量时，它就会分别把它们解析出来，并把值赋给User对象中的name变量。那么，name变量的值就会是后解析的那个JSON变量的值，因为它会把前一个值覆盖掉。



##### 8. 序列化/反序列化过程中忽略某些变量

也许会出现这样的需求，在将某个对象序列化时，对象中的某些变量是不需要的。有可能在反序列化某个JSON字符串时，某些变量的值也是不需要的。这时就可以使用Gson提供的`@Expose`注解方法。使用方法如下：

```
public class User {  
    @Expose()
    String name; // 参与序列化/反序列化

    @Expose(serialize = false, deserialize = false)
    String email; // 不参与序列化，也不参与反序列化

    @Expose(serialize = false)
    int age; // 只参与反序列化

    @Expose(deserialize = false)
    boolean isDeveloper; // 只参与序列化
}
12345678910111213
```

使用这个方法，可以非常灵活地控制对象的`某个/某些`变量参不参与`序列化/反序列化`。

**然而！** 要使用这个注解来控制序列化/反序列化，就不能使用默认的Gson对象，新建Gson对象的方法如下：

```
GsonBuilder builder = new GsonBuilder();  
builder.excludeFieldsWithoutExposeAnnotation();  
Gson gson = builder.create(); 
123
```

**另一个选择**，`transient`关键字 ，使用这个关键字，可以直接让变量不参与序列化/反序列化，如下：

```
public class User {  
    String name;
    String email;
    int age;
    boolean transient isDeveloper; //不参与序列化/反序列化
}
123456
```

当然，使用默认的Gson对象就可以。



> 以上是这两天学到的Gson的基本用法，如果想进一步了解，可以参考Future Studio的 [Gson教程](https://futurestud.io/tutorials/gson-builder-basics-naming-policies)