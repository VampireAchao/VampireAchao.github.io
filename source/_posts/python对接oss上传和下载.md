---
title: python对接oss上传和下载
date: 2022-04-26 13:12:40
tags: python
---

> 我用尽全力，过着平凡的一生。——毛姆

首先是下载依赖，文档：

https://help.aliyun.com/document_detail/85288.html

我这里是`windows`：

```shell
pip install oss2
```

代码也是一如既往的简单，毕竟是`python`嘛

```python
from io import BytesIO

import oss2

ACCESS_KEY_ID = ''
ACCESS_KEY_SECRET = ''
ENDPOINT = 'oss-cn-chengdu.aliyuncs.com'
BUCKET_NAME = 'waibi'
AUTH = oss2.Auth(ACCESS_KEY_ID, ACCESS_KEY_SECRET)
BUCKET = oss2.Bucket(AUTH, ENDPOINT, BUCKET_NAME)


def download_file_bytes(file_name):
    return BUCKET.get_object(file_name)


def upload_file(file_object, path):
    BUCKET.put_object(path, file_object)
```

代码对应的文档

上传：

https://help.aliyun.com/document_detail/88426.html

下载：

https://help.aliyun.com/document_detail/88441.html