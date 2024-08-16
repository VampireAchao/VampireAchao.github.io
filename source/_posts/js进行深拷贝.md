---
title: js进行深拷贝
date: 2020-12-02 20:39:56
tags: 前端
---

> 共夸不受污泥染，没有污泥哪有莲。——《赏荷》

对象深拷贝

```javascript
export function deepClone (data) {
  var type = getObjType(data)
  var obj
  if (type === 'array') {
    obj = []
  } else if (type === 'object') {
    obj = {}
  } else {
    // 不再具有下一层次
    return data
  }
  if (type === 'array') {
    for (var i = 0, len = data.length; i < len; i++) {
      data[i] = (function () {
        if (data[i] === 0) {
          return data[i]
        }
        return data[i]
      }())
      delete data[i].$parent
      obj.push(deepClone(data[i]))
    }
  } else if (type === 'object') {
    for (var key in data) {
      delete data.$parent
      obj[key] = deepClone(data[key])
    }
  }
  return obj
};
```

