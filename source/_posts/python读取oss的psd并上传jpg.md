---
title: python读取oss的psd并上传jpg
date: 2022-04-28 13:21:03
tags: python
---

> 死亡，就像是水消失在水中。——博尔赫斯《另一次死亡》

上次说过了[`psd-tools`](https://VampireAchao.github.io/2022/03/19/psd-tools/)可以对`psd`进行处理

今天写一个完整的，`oss`代码在这：

https://VampireAchao.github.io/2022/04/26/python%E5%AF%B9%E6%8E%A5oss%E4%B8%8A%E4%BC%A0%E5%92%8C%E4%B8%8B%E8%BD%BD/

```python
# coding=utf-8
import warnings
from io import BytesIO

from psd_tools.constants import Resource

warnings.filterwarnings("ignore", category=Warning)


# 读取psd以及图层信息
def read_psd_info(psd, hidden_layer_ids):
    layers = list(map(lambda layer: __convert_layer_info(layer, hidden_layer_ids), psd))
    resolution_info = psd.image_resources.get_data(Resource.RESOLUTION_INFO)
    return {
        "horizontal": resolution_info.horizontal,
        "horizontal_unit": resolution_info.horizontal_unit,
        "vertical": resolution_info.vertical,
        "vertical_unit": resolution_info.vertical_unit,
        "height": psd.height,
        "height_unit": resolution_info.height_unit,
        "width": psd.width,
        "width_unit": resolution_info.width_unit,
        "layers": layers
    }


# 读取图层子节点，如果有子节点，则递归读取
def __convert_layer_info(layer, hidden_layer_ids):
    visible = layer.is_visible()
    if layer.layer_id in hidden_layer_ids:
        visible = False
    layer_info = {
        "id": layer.layer_id,
        "type": layer.kind,
        "name": layer.name,
        "visible": visible,
        "children": None,
        "box": layer.bbox
    }
    if layer.kind == "group":
        layer_info["children"] = list(map(lambda child: __convert_layer_info(child, hidden_layer_ids), layer))
    return layer_info


# 导出Jpeg图片
def export_jpg_file(psd, hidden_layer_ids):
    warnings.filterwarnings("ignore", category=Warning)
    psd_compose = psd.composite(layer_filter=lambda layer: layer.layer_id not in hidden_layer_ids)
    if psd_compose is None:
        return psd_compose
    img_bytes = BytesIO()
    psd_compose.convert("RGB").save(img_bytes, "JPEG")
    return img_bytes.getvalue()
```

然后是主启动类：

```python
# coding=utf-8
import argparse
import json
from io import BytesIO

from psd_tools import PSDImage

import oss
import psd


def main():
    parser = argparse.ArgumentParser(description="PSD Tools")
    parser.add_argument("--option", help="What you want to do, with commas split if more!", required=True)
    parser.add_argument("--source", help="Source file path，local or internet", required=True)
    parser.add_argument("--target", help="Target file path, local or internet", required=False)
    parser.add_argument("--hidden_layer_ids", help="Hidden layer ids, with commas split if more!", required=False)
    args = parser.parse_args()
    options = args.option.split(",")
    hidden_layer_ids = list(
        map(lambda layer_id: int(layer_id), args.hidden_layer_ids.split(","))) if args.hidden_layer_ids else []

    oss_file = oss.download_file_bytes(args.source)
    oss_file_bytes = BytesIO(oss_file.read())
    psd_image = PSDImage.open(oss_file_bytes)
    psd_info = None
    if "info" in options:
        psd_info = psd.read_psd_info(psd_image, hidden_layer_ids)
        psd_info["sourceFileSize"] = oss_file.content_length
    if "export" in options:
        psd_image = psd.export_jpg_file(psd_image, hidden_layer_ids)
        oss.upload_file(psd_image, args.target)
    print(json.dumps(psd_info))


if __name__ == '__main__':
    main()
```

运行一下：

```shell
# 导出图层并获取psd信息
# --source=oss上的原文件名
# --target=oss需要上传的文件名
# --option=info,export 操作，逗号隔开
# --hidden_layer_ids 隐藏的图层，逗号隔开
python D:/file/projects/python/simple-psd-tools/main.py --source=test/001.psd --target=test/2022-04-25/001.jpeg --option=info,export --hidden_layer_ids=
```

