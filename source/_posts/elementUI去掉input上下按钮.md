---
title: elementUI去掉input上下按钮
date: 2021-03-27 15:08:00
tags: 前端
---

> 快乐就像香水，不是泼在别人身上，而是洒在自己身上。——拉尔夫·沃尔多·爱默生

我们使用`el-input`当`type`为`number`时

![image-20210327150831305](/imgs/oss/picGo/image-20210327150831305.png)

会出现右边这种箭头，影响美观

我们可以使用[样式穿透](https://VampireAchao.github.io/2020/11/07/%E6%A0%B7%E5%BC%8F%E7%A9%BF%E9%80%8F/)

```vue
<el-input type="number"></el-input>
```

```css
/deep/ input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
```

然后就可以去掉这两个箭头啦

![image-20210327150952496](/imgs/oss/picGo/image-20210327150952496.png)

