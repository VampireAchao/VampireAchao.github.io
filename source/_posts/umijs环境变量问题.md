---
title: umijs环境变量问题
date: 2023-07-15 12:48:49
tags: 前端
---

> 我们关心的，不是你是否失败了，而是你对失败能否无怨。——林肯

今天遇到一个问题，`umijs`框架下的环境变量配置不好使

首先是我`package.json`里的配置是这样的：

```json
 "scripts": {
    "start": "cross-env NODE_ENV=dev umi dev",
    "build:test": "cross-env NODE_ENV=test umi build",
    "build:production": "cross-env NODE_ENV=prod umi build"
}
```

然后在我其中一个`js`文件中进行引用：

```javascript
console.log({ NODE_ENV: process.env.NODE_ENV });
console.log({ 'process.env': process.env });
```

然后当我指定为`test`时

```json
 "scripts": {
    "start": "cross-env NODE_ENV=test umi dev"
 }
```

其打印出来的结果仍然是`development`，(大概是这个效果，这里是手动做的打印数据)

![](/imgs/oss/picGo/20230715130025.png)

于是按照`umijs`官方文档去配置：[配置](https://v3.umijs.org/zh-CN/config#define)

找到`.umirc.ts`

```typescript
import { defineConfig } from 'umi';


export default defineConfig({
    define: {
        'process.env': {
            NODE_ENV: 'test',
        },
    }
})
```

配置完毕后，发生了一些奇怪的变化，我看到了这一幕

![](/imgs/oss/picGo/20230715130912.png)

取值时仍然是`development`，但是随后我展开打印，却变成了`test`

这时候，我想到换一个变量名，于是我修改为`UMI_ENV`

```typescript
import { defineConfig } from 'umi';


export default defineConfig({
    define: {
        'process.env': {
            UMI_ENV: 'test',
        },
    }
})
```

然后发现其成功生效

```javascript
console.log({ UMI_ENV: process.env.UMI_ENV });
console.log({ 'process.env': process.env });
```

打印结果

![](/imgs/oss/picGo/20230715131349.png)

此时虽然成功修改到了全局变量，但我这个`.umirc.ts`没有按照我`package.json`中的环境变量进行多环境应用配置，于是我找到了`umijs`官方文档提到的[多份环境配置](https://v3.umijs.org/zh-CN/docs/config#%E5%A4%9A%E7%8E%AF%E5%A2%83%E5%A4%9A%E4%BB%BD%E9%85%8D%E7%BD%AE)

新建了`.umirc.dev.ts`

```typescript
import { defineConfig } from 'umi';

export default defineConfig({
    define: {
        'process.env': {
            UMI_ENV: 'development',
        },
    },
});
```

新建了`.umirc.test.ts`

```typescript
import { defineConfig } from 'umi';

export default defineConfig({
    define: {
        'process.env': {
            UMI_ENV: 'test',
        },
    },
});
```

以及`.umirc.prod.ts`

```typescript
import { defineConfig } from 'umi';

export default defineConfig({
    define: {
        'process.env': {
            UMI_ENV: 'production',
        },
    },
});
```

然后修改`package.json`

```json
 "scripts": {
    "start": "cross-env UMI_ENV=dev umi dev",
    "build:test": "cross-env UMI_ENV=test umi build",
    "build:production": "cross-env UMI_ENV=prod umi build"
}
```

此时，只要我们

指定`UMI_ENV`为`dev`，则对应的`process.env.UMI_ENV`则是`development`

指定`UMI_ENV`为`test`，则对应的`process.env.UMI_ENV`则是`test`

指定`UMI_ENV`为`prod`，则对应的`process.env.UMI_ENV`则是`production`
