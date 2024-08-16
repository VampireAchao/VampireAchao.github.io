---
title: promisesaplus.com
date: 2024-01-12 20:51:35
tags: java
---

> 产生巨大后果的思想常常是朴素的。——列夫·托尔斯泰

今天刷到一个网站：

https://promisesaplus.com/

对应的组织：

https://github.com/promises-aplus/

对应有一个开源库用来检验是否符合`Promise/A+`规范：

https://github.com/promises-aplus/promises-tests/

安装：

```bash
npm install promises-aplus-tests -g
```

然后添加`CI`脚本

```json
{
    "devDependencies": {
        "promises-aplus-tests": "*"
    },
    "scripts": {
        "test": "run-my-own-tests && promises-aplus-tests test/my-adapter"
    }
}
```

也可以在代码里使用：

```java
var promisesAplusTests = require("promises-aplus-tests");

promisesAplusTests(adapter, function (err) {
    // All done; output is in the console. Or check `err` for number of failures.
});
```

如果你已经有一个Mocha测试套件，可以将Promises/A+的测试包含进去，只需在你的测试代码中引入并调用适应的方法
