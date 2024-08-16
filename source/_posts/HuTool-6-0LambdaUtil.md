---
title: HuTool 6.0LambdaUtil
date: 2024-08-04 13:26:00
tags: java
---

> 家庭是用孜孜不倦的爱情的劳动建立起来的。——陀思妥耶夫斯基

## 介绍

`LambdaUtil` 是一个用于处理 Lambda 表达式的工具类，提供了解析、获取信息和构建 Lambda 方法的多种功能。  

## 使用

### 方法介绍

#### Lambda 获取相关方法

- `getRealClass` 获取 Lambda 实现类。  
- `resolve` 解析 Lambda 表达式，并缓存结果。  
- `getMethodName` 获取 Lambda 表达式的函数名称。  
- `getFieldName` 获取 Lambda 表达式 Getter 或 Setter 对应的字段名称。  
- `buildGetter` 构建 Getter 方法引用。  
- `buildSetter` 构建 Setter 方法引用。  
- `build` 构建指定方法的 Lambda 引用。  
- `toFunction` 将 `BiFunction` 转换为 `Function`。  
- `toPredicate` 将 `BiPredicate` 转换为 `Predicate`。  
- `toConsumer` 将 `BiConsumer` 转换为 `Consumer`。  
- `getInvokeMethod` 获取函数的执行方法。  

例子：  

我们定义一个类：  

```java
public class MyTeacher {  
    private String name;  
    private int age;  

    public String getName() {  
        return name;  
    }  

    public void setName(String name) {  
        this.name = name;  
    }  

    public int getAge() {  
        return age;  
    }  

    public void setAge(int age) {  
        this.age = age;  
    }  

    public static int takeAge() {  
        return 0;  
    }  

    public static int takeId() {  
        return 0;  
    }  
}  
```

获取 Lambda 实现类：  

```java
MyTeacher myTeacher = new MyTeacher();  
Class<MyTeacher> supplierClass = LambdaUtil.getRealClass(myTeacher::getAge);  
Assert.assertEquals(MyTeacher.class, supplierClass);  

Class<MyTeacher> staticSupplierClass = LambdaUtil.getRealClass(MyTeacher::takeAge);  
Assert.assertEquals(MyTeacher.class, staticSupplierClass);  
```

解析 Lambda 表达式：  

```java
LambdaInfo lambdaInfo = LambdaUtil.resolve(myTeacher::getAge);  
System.out.println(lambdaInfo.getName());  
```

获取 Lambda 表达式的函数名称：  

```java
String methodName = LambdaUtil.getMethodName(myTeacher::getAge);  
System.out.println(methodName);  
```

获取 Lambda 表达式 Getter 对应的字段名称：  

```java
String fieldName = LambdaUtil.getFieldName(myTeacher::getAge);  
System.out.println(fieldName);  
```

构建 Getter 方法引用：  

```java
Function<MyTeacher, Integer> getter = LambdaUtil.buildGetter(MyTeacher::getAge);  
int age = getter.apply(myTeacher);  
System.out.println(age);  
```

### 支持全系列序列化lambda

这里是牺牲了部分易用性（主要是考虑到此功能一般用于工具类内部封装），需要手动指定传入的lambda类型，但保证了通用性，支持自定义可序列化函数式接口，改版后用法可以如下：  

第一种，拆分为变量和赋值：  

```java
SerFunction<MyTeacher, String> lambda = MyTeacher::getAge;  
final String fieldName = LambdaUtil.getFieldName(lambda);  
```

第二种，强转指定序列化函数式接口类型：  

```java
LambdaInfo lambdaInfo = LambdaUtil.resolve((SerFunction<Integer, MyTeacher[]>) MyTeacher[]::new);  
```

第三种，匿名序列化函数式接口（实际上也就是匿名内部类多实现接口）：  

```java
LambdaInfo lambdaInfo = LambdaUtil.resolve((Serializable & Function<Integer, MyTeacher[]>) MyTeacher[]::new);  
```

未来如果入参是泛型，还可以采取这种方式指定（暂定）：  

```java
final String fieldName = LambdaUtil.<SerFunction<MyTeacher, String>>getFieldName(MyTeacher::getAge);  
```

对于上述调整，避免了对每一种序列化的函数式接口都要对应实现一种重载方法，以外部指定的方式，来应万变。  

### 通用执行入口

现在的LambdaUtil除了调`writeReplace`拿到`SerializedLambda`以外，还可以通过其信息+字段描述符，拿到反射的`Executable`对象，相当于也有了通用的执行入口。  

#### 单元测试

单元测试覆盖了主要方法的使用场景，确保每个功能的正确性。  

```java
public class LambdaUtilTest {  

    @Test  
    public void getMethodNameTest() {  
        final SerFunction<MyTeacher, String> lambda = MyTeacher::getAge;  
        final String methodName = LambdaUtil.getMethodName(lambda);  
        Assertions.assertEquals("getAge", methodName);  
    }  

    @Test  
    public void getFieldNameTest() {  
        final SerFunction<MyTeacher, String> lambda = MyTeacher::getAge;  
        final String fieldName = LambdaUtil.getFieldName(lambda);  
        Assertions.assertEquals("age", fieldName);  
    }  

    @Test  
    public void resolveTest() {  
        Stream.<Runnable>of(() -> {  
            final SerSupplier<MyTeacher> lambda = MyTeacher::new;  
            final LambdaInfo lambdaInfo = LambdaUtil.resolve(lambda);  
            Assertions.assertEquals(0, lambdaInfo.getParameterTypes().length);  
            Assertions.assertEquals(MyTeacher.class, lambdaInfo.getReturnType());  
        }, () -> {  
            final SerFunction<Integer, MyTeacher[]> lambda = MyTeacher[]::new;  
            final LambdaInfo lambdaInfo = LambdaUtil.resolve(lambda);  
            Assertions.assertEquals(int.class, lambdaInfo.getParameterTypes()[0]);  
            Assertions.assertEquals(MyTeacher[].class, lambdaInfo.getReturnType());  
        }).forEach(Runnable::run);  
    }  

    @Test  
    public void getRealClassTest() {  
        final MyTeacher myTeacher = new MyTeacher();  
        final SerFunction<MyTeacher, String> lambda = MyTeacher::getAge;  
        Assertions.assertEquals(MyTeacher.class, LambdaUtil.getRealClass(lambda));  
    }  

    @Test  
    public void getterTest() {  
        final Bean bean = new Bean();  
        bean.setId(2L);  

        final Function<Bean, Long> getId = LambdaUtil.buildGetter(MethodUtil.getMethod(Bean.class, "getId"));  
        final Function<Bean, Long> getId2 = LambdaUtil.buildGetter(Bean.class, Bean.Fields.id);  

        Assertions.assertEquals(getId, getId2);  
        Assertions.assertEquals(bean.getId(), getId.apply(bean));  
    }  

    @Test  
    public void setterTest() {  
        final Bean bean = new Bean();  
        bean.setId(2L);  
        bean.setFlag(false);  

        final BiConsumer<Bean, Long> setId = LambdaUtil.buildSetter(MethodUtil.getMethod(Bean.class, "setId", Long.class));  
        final BiConsumer<Bean, Long> setId2 = LambdaUtil.buildSetter(Bean.class, Bean.Fields.id);  
        Assertions.assertEquals(setId, setId2);  

        setId.accept(bean, 3L);  
        Assertions.assertEquals(3L, (long) bean.getId());  
    }  

    @Test  
    @EnabledForJreRange(max = JRE.JAVA_8)  
    void buildSetterWithPrimitiveTest() {  
        final Bean bean = new Bean();  
        bean.setId(2L);  
        bean.setFlag(false);  

        final BiConsumer<Bean, Object> setter = LambdaUtil.buildSetter(Bean.class, "flag");  
        setter.accept(bean, Boolean.TRUE);  
        Assertions.assertTrue(bean.isFlag());  
    }  

    @Test  
    void getInvokeMethodTest() {  
        Method invokeMethod = LambdaUtil.getInvokeMethod(Predicate.class);  
        Assertions.assertEquals("test", invokeMethod.getName());  

        invokeMethod = LambdaUtil.getInvokeMethod(Consumer.class);  
        Assertions.assertEquals("accept", invokeMethod.getName());  

        invokeMethod = LambdaUtil.getInvokeMethod(Runnable.class);  
        Assertions.assertEquals("run", invokeMethod.getName());  

        invokeMethod = LambdaUtil.getInvokeMethod(SerFunction.class);  
        Assertions.assertEquals("applying", invokeMethod.getName());  

        invokeMethod = LambdaUtil.getInvokeMethod(Function.class);  
        Assertions.assertEquals("apply", invokeMethod.getName());  
    }  

    @Test  
    void getInvokeMethodErrorTest() {  
        Assertions.assertThrows(IllegalArgumentException.class, () -> {  
            LambdaUtil.getInvokeMethod(LambdaUtilTest.class);  
        });  
    }  
}  
```
