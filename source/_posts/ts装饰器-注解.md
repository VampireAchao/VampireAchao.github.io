---
title: ts装饰器(注解)
date: 2022-06-21 13:16:17
tags: 前端
---

> 书，能保持我们的童心；书能保持我们的青春。——严文井


官方文档：https://www.typescriptlang.org/docs/handbook/decorators.html


这个东西在`java`里叫注解，不过在`ts`中，一个装饰器对应一个方法

首先执行命令：

```shell
tsc --target ES5 --experimentalDecorators
```

然后配置一下`tsconfig.json`就可以使用了

```json
{
    "compilerOptions": {
        "target": "ES5",
        "experimentalDecorators": true
    }
}
```

首先我们定义一个`class`

```typescript
class User {
  private id: Number | undefined;
  private name: string | undefined;
}
```

我们编写一个装饰器对应的逻辑，实现`java`中`lombok`里`@Data`生成`getter`和`setter`

```typescript
function Data(constructor: Function | ObjectConstructor) {
  console.log('@Data', { constructor })
  Object.getOwnPropertyNames(new constructor()).forEach(key => {
    const firstUpperProperty = key.charAt(0).toUpperCase() + key.substring(1)
    if (!constructor.prototype[`get${firstUpperProperty}`]) {
      constructor.prototype[`get${firstUpperProperty}`] = function () {
        return this[key]
      }
    }
    if (!constructor.prototype[`set${firstUpperProperty}`]) {
      constructor.prototype[`set${firstUpperProperty}`] = function (value: any) {
        this[key] = value
      }
    }
  })
}
```

我们将这个注解放到类的上面

```typescript
@Data
class User {
  private id: Number | undefined;
  private name: string | undefined;
}
```

尝试调用一下

```typescript
const user = new User()
user.setId(1);
user.setName("John");
console.log(user.getId());			// 1
console.log(user.getName());		// "John"
```

可以看到确实生效，这里打印的参数：

![image-20220621184302118](/imgs/oss/picGo/image-20220621184302118.png)

顺带一提注解可以以复数形式存在，上方文档提到了，这里就不多赘述

我们继续编写注解，刚刚这个是**类装饰器**

接下来来个给默认的`getter`方法获取时，如果没有就提供一个默认值的注解`@DefaultVal`

这是一个**属性装饰器**

```typescript
function DefaultVal(val: any) {
  return function (target: any, key: string) {
    console.log('@DefaultVal', { target, key, val });
    const firstUpperProperty = key.charAt(0).toUpperCase() + key.substring(1)
    target.constructor.prototype[`get${firstUpperProperty}`] = function () {
      return this[key] ?? val
    }
  };
}
```

注意优先级，我们的属性装饰器优先级高于我们的类装饰器，所以`getter`别被覆盖了

> 类中不同声明上的装饰器将按以下规定的顺序应用：
>
> 1. *参数装饰器*，然后依次是*方法装饰器*，*访问符装饰器*，或*属性装饰器*应用到每个实例成员。
> 2. *参数装饰器*，然后依次是*方法装饰器*，*访问符装饰器*，或*属性装饰器*应用到每个静态成员。
> 3. *参数装饰器*应用到构造函数。
> 4. *类装饰器*应用到类。

使用方式：

```typescript
@Data
class User {
  private id: Number | undefined;
  @DefaultVal('nobody')
  private name: string | undefined;
}
```

演示：

```typescript
console.log({ 'new User().getName()': new User().getName() });
```

输出结果：

```json
{'new User().getName()': 'nobody'}
```

打印参数：

![image-20220621184325477](/imgs/oss/picGo/image-20220621184325477.png)

然后是**方法装饰器**

这里我们指定返回值不能为`null`，否则报错

```typescript
function NonNull() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('@NonNull', { target, propertyKey, descriptor });
    let value = descriptor.value
    descriptor.value = () => {
      const result = value.call()
      if (result === null || result === undefined) throw new Error(`${propertyKey} must non-null`)
      return result
    }
  };
}
```

使用：

```typescript
@Data
class User {
  private id: Number | undefined;
  @DefaultVal('nobody')
  private name: string | undefined;
  @NonNull()
  toString() {
    // return Object.prototype.toString();
    return null
  }
}
```

测试：

```typescript
new User().toString();
```

![image-20220621184052422](/imgs/oss/picGo/image-20220621184052422.png)

打印结果：

![image-20220621184340137](/imgs/oss/picGo/image-20220621184340137.png)

最后是**参数装饰器**

这里懒得写了，就输出下日志吧：

```typescript
function Log(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  console.log('@Log', { target, propertyKey, parameterIndex });
}
```

使用：

```typescript
@Data
class User {
  private id: Number | undefined;
  @DefaultVal('nobody')
  private name: string | undefined;
  @NonNull()
  toString() {
    return Object.prototype.toString();
    // return null
  }
  equals(@Log val: User) {
    return deepEqual(this, val);
  }
}
```

打印：

![image-20220621184455024](/imgs/oss/picGo/image-20220621184455024.png)