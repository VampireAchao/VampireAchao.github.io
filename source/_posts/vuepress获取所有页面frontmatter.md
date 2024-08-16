---
title: vuepress获取所有页面frontmatter
date: 2023-08-17 19:53:50
tags: 前端
---

> 倘若没有骄傲的思想，人将不成其为人，他自身的弱点会使他蜕化为禽兽。——高尔基

今天实现了`vuepress`中获取所有页面的`frontmatter`

`frontmatter`是页面的页头信息，例如：

```markdown
---
title: xxx
author: 作者
date: 2023-08-17
---
```

可以编写一个插件：

```javascript
module.exports = (options, context) => ({
  extendPageData($page) {
    const { pages } = context;

    // 获取除首页外的其他所有页面的 frontmatter 数据
    const frontmatters = pages
      .filter(page => page.path !== '/')
      .map(page => page.frontmatter);

    // 将 frontmatter 数组传递给首页的 frontmatter
    $page.frontmatter.homepageFrontmatters = frontmatters;
  }
});
```

![](/imgs/oss/picGo/20230817200914.png)

然后配置一下：

```javascript
  plugins: [
  // ....其他plugin
    [require('../plugins/frontmatter'), {}]
  ]
```

![](/imgs/oss/picGo/20230817201013.png)

接下来是使用

```javascript
console.log(this.$frontmatter.homepageFrontmatters)
```

![](/imgs/oss/picGo/20230817201059.png)

效果：

![](/imgs/oss/picGo/20230817201158.png)
