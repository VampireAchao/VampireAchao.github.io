---
title: bash删除超过30天的文件
date: 2023-06-27 20:44:57
tags: 小技巧
---

> 脱离实际行动的信仰是死的。——列夫·托尔斯泰

分享一个小技巧，`bash`删除超过`30`天的文件

```bash
find /xxx/xxx -type f -mtime +30 -delete
```

