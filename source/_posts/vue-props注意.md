---
title: vue props注意
date: 2022-05-13 12:32:45
tags: 前端
---

> 等到看你银色满际，等到分不清季节更替，才敢说沉溺。——《水星记》

官方文档：https://cn.vuejs.org/v2/guide/components-props.html

我们在使用`vue`的`prop`时

如果`prop`其数据类型为一个对象

则传入的是一个对象的地址引用

我们如果在子组件中使用`watch`将其赋值给一个`data`，用于外部组件状态发生变化时，内部的某一`data`也能同时响应：

```javascript
  watch: {
    productionData: {
      immediate: true,
      handler() {
        this.myData = this.myProp
      },
    }
}
```

这时候如果我们对`myData`里的属性进行更改，发现外部(父组件)传过来的对象数据源也发生了变更

如果我们想要深拷贝

则可以使用：

```javascript
function deepClone( obj ){
  let clone = obj;
  if (obj && typeof obj === "object") {
    clone = new obj.constructor();

    Object.getOwnPropertyNames(obj).forEach(
      prop => (clone[prop] = deepClone(obj[prop]))
    );
  }
  return clone;
};
```

运行：

```javascript
let ids = [1,2,3]
let obj = deepClone({ruben:{ids}})
ids.pop()
console.log(obj)		// {"ruben":{"ids":[1,2,3]}}
console.log(ids)		// [1, 2]
```

