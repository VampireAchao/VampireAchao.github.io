---
title: 数组扁平化flat
date: 2021-11-18 18:27:59
tags: 前端
---

> 还保持着较为清醒的头脑，就决然不能把人生之船长期停泊在某个温暖的港湾。——路遥《早晨从中午开始》

在前端开发中可能会有这样的需求：

将一个数组中的数组拆分出来放到原数组中

那么我们就可以使用`flat`函数

```javascript
[1,[2,3,[4,5,6,[7,8,9]]]].flat()
```

![image-20211118183043624](/imgs/oss/picGo/image-20211118183043624.png)

`flat`中可以传入参数为数字，表示你要拆分数组的层数

![image-20211118183129968](/imgs/oss/picGo/image-20211118183129968.png)

![image-20211118183135427](/imgs/oss/picGo/image-20211118183135427.png)

如果全部拆分，可以使用`flat(Infinity)`

```javascript
[1,[2,3,[4,5,6,[7,8,9]]]].flat(Infinity)
```

![image-20211118183207979](/imgs/oss/picGo/image-20211118183207979.png)

如果是较为复杂点的对象，则就只能使用`map`先取出来，再使用`flat`

```javascript
[{ruben:[1]},{ruben:[2,3]}].map(({ruben})=>ruben).flat()
```

![image-20211118183406285](/imgs/oss/picGo/image-20211118183406285.png)
