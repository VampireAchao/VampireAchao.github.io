---
title: uniapp打电话
date: 2021-07-16 23:16:57
tags: 前端
---

> 人不可能阻止指甲生长....同样的，人也不能压抑自己与生俱来的冲动！——吉良吉影

代码如下

```javascript
uni.makePhoneCall({
    phoneNumber: '114' //仅为示例
});
```

同样拥有成功、失败和完成的回调

```javascript
uni.makePhoneCall({
    phoneNumber: '114' //仅为示例
    ,success:res=>{ console.log(res); }
    ,fail:res=>{ console.log(res); }
    ,complete:res=>{ console.log(res); }
});
```

