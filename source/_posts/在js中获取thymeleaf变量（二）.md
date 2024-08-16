---
title: 在js中获取thymeleaf变量（二）
date: 2021-07-05 23:42:22
tags: java
---

> 所谓天才，只不过是把别人喝咖啡的功夫都用在工作上了。——鲁迅

上回写过[在js中获取thymeleaf变量](https://VampireAchao.github.io/2021/05/20/在js中获取thymeleaf变量/)

但比较繁琐

这次用简单的写法

```html
<script>
    var id = [[${id}]]
    console.log(id)
</script>
```

非常简单~

不过要注意一点，如果是对象格式的数据，需要在`script`标签上加`th:inline="javascript"`

```html
<script th:inline="javascript">
    var id = [[${id}]]
    console.log(id)
</script>
```

在页面中也可以直接使用，可以代替`th:text`

```html
<div>
    [[${id}]]
</div>
```

效果如下

![image-20210705234534494](/imgs/oss/picGo/image-20210705234534494.png)

如果是字符串也支持的

```html
<div>
    [[${id}]]
    [['id']]
</div>
```

![image-20210705234742185](/imgs/oss/picGo/image-20210705234742185.png)

