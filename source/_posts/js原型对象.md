---
title: js原型对象
date: 2022-02-04 20:22:27
tags: 前端
---

> 不存在十全十美的文章，如同不存在彻头彻尾的绝望。——《且听风吟》

我们首先定义一个对象

```javascript
class Person {
  constructor(name,age) {
    this.name = name;
    this.age = age;
  }
  toString() {
    return '(' + this.name + ', ' + this.age + ')';
  }
};
let ruben = new Person("ruben",21);
console.log(ruben.toString())
```

打印结果为：

```shell
(ruben,21)
```

我们可以使用`Person.prototype`去获取`Person`的原型对象，从而更改类其中的方法

```javascript
Person.prototype.toString = function(){
    return "Person{" +
            "name='" + this.name + '\'' +
            ", age=" + this.age +
            '}';
}
console.log(ruben.toString())
```

修改后结果为：

```shell
Person{name='ruben', age=21}
```

打印一下原型对象呢

```javascript
console.log(Person.prototype)
```

![image-20220204210118348](/imgs/oss/picGo/image-20220204210118348.png)