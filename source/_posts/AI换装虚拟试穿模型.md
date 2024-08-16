---
title: AI换装虚拟试穿模型
date: 2024-05-25 19:04:28
tags: ai
---

> 凡心所向，素履所往，生如逆旅，一苇以航。——尘曲

https://github.com/yisol/IDM-VTON

分享一个`AI`换装虚拟试穿的模型

```bash
git clone https://github.com/yisol/IDM-VTON.git
cd IDM-VTON

conda env create -f environment.yaml
conda activate idm
```

`VITON-HD` 数据集可以从这里下载

[GitHub - shadow2496/VITON-HD: Official PyTorch implementation of &quot;VITON-HD: High-Resolution Virtual Try-On via Misalignment-Aware Normalization&quot; (CVPR 2021)](https://github.com/shadow2496/VITON-HD)

下完了把 `vitonhd_test_tagged.json` 放到 `test` 目录中

```bash

train
|-- ...

test
|-- image
|-- image-densepose
|-- agnostic-mask
|-- cloth
|-- vitonhd_test_tagged.json
```

推理

```bash
accelerate launch inference.py \
    --width 768 --height 1024 --num_inference_steps 30 \
    --output_dir "result" \
    --unpaired \
    --data_dir "DATA_DIR" \
    --seed 42 \
    --test_batch_size 2 \
    --guidance_scale 2.0
```

直接用脚本也行

```bash
sh inference.sh
```
