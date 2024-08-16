---
title: vuepress2一次性获取所有frontmatter
date: 2023-08-21 19:42:19
tags: 前端
---

> 上帝是孤独的，恶魔却总在拉帮结伙。——梭罗的《瓦尔登湖》。

接上文：

[vuepress获取所有页面frontmatter](https://VampireAchao.github.io/2023/08/17/vuepress%E8%8E%B7%E5%8F%96%E6%89%80%E6%9C%89%E9%A1%B5%E9%9D%A2frontmatter/)

这次是`vuepressv2.0.0-beta.66`

[首页 | VuePress](https://v2.vuepress.vuejs.org/zh/)

核心代码：

```typescript
// .vuepress/getAllFrontmatter.s
module.exports = {
  name: 'get-all-frontmatter',
  extendsPage: (page, app) => {
    console.log({ page, app })
    console.log(page.data.frontmatter)
    app.siteData.frontmatter = app.siteData.frontmatter ?? []
    app.siteData.frontmatter.push(page.data.frontmatter)
  },
};
```

然后配置：

```typescript
// .vuepress/config.ts
import { getDirname, path } from '@vuepress/utils'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
const __dirname = getDirname(import.meta.url)

export default {
  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
    require('./getAllFrontmatter'),
    // ...其他插件
  ],
  // ...其他配置
};
```

接下来是使用：

```vue
<!-- .vuepress/components/AppInfo.vue -->
<template>
    <div>
        <div v-for="(frontmatter, index) in frontmatter" :key="index">{{ frontmatter }} </div>
    </div>
</template>
  
<script setup>
import { siteData } from '@vuepress/client';
const frontmatter = siteData.value.frontmatter
console.log({frontmatter})
siteData.value.frontmatter.forEach(console.log)
</script>
```

使用组件`README.md`：

```markdown
---
title: home page
autho: VampireAchao
---

<AppInfo />
```



![](/imgs/oss/picGo/20230821195014.png)

还有一个页面`guide/README.md`

```markdown
---
title: guide page
autho: Achao
---

```

![](/imgs/oss/picGo/20230821195121.png)

最后看效果：

```shell
pnpm run docs:dev
```

![](/imgs/oss/picGo/20230821195510.png)
