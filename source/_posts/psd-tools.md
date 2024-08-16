---
title: psd-tools
date: 2022-03-19 22:51:18
tags: python
---

> 立志用功如种树然，方其根芽，犹未有干；及其有干，尚未有枝；枝而后叶，叶而后花。——王守仁

分享一个`python`库，用于读取`psd`图层等信息的

官方文档：https://psd-tools.readthedocs.io/en/latest/

使用方式：

```shell
pip install -i http://mirrors.aliyun.com/pypi/simple/ psd-tools --trusted-host mirrors.aliyun.com
```

我们将`psd`导出为`png`

```python
from psd_tools import PSDImage

psd = PSDImage.open('example.psd')
psd.composite().save('example.png')
```

更多用法可以看：

https://psd-tools.readthedocs.io/en/latest/usage.html