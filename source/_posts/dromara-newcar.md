---
title: dromara-newcar
date: 2024-04-18 08:49:11
tags: 前端
---

> 发上开出了蔷薇，袖底是风，足下是莲。——顾城

https://github.com/dromara/newcar

最近`dromara`新加入了一个前端项目`newcar`

Newcar 是一款高度可配置且先进的通用引擎，专为快速动画创建而设计。它适用于广泛的应用，包括视频剪辑、动态图表（未来计划），甚至 2D 游戏开发（也是未来计划）。

| [![](https://github.com/dromara/newcar/raw/main/assets/poster1.gif)](https://github.com/dromara/newcar/blob/main/assets/poster1.gif) | [![](https://github.com/dromara/newcar/raw/main/assets/poster2.gif)](https://github.com/dromara/newcar/blob/main/assets/poster2.gif) | [![](https://github.com/dromara/newcar/raw/main/assets/poster3.gif)](https://github.com/dromara/newcar/blob/main/assets/poster3.gif) |
| ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| [![](https://github.com/dromara/newcar/raw/main/assets/poster5.gif)](https://github.com/dromara/newcar/blob/main/assets/poster5.gif) | [![](https://github.com/dromara/newcar/raw/main/assets/poster4.gif)](https://github.com/dromara/newcar/blob/main/assets/poster4.gif) |                                                                                                                                      |

这个项目作者竟

然是`09`年的，我们快速开始

```bash
$ pnpm create vite project-name
$ cd project-name
$ pnpm install
```

引入依赖

```bash
$ pnpm add newcar
```

初始化

```javascript
import * as nc from 'newcar'

const engine = await new nc.Engine().init(
  '../node_modules/canvaskit-wasm/bin/canvaskit.wasm',
)

const defaultScene = new nc.Scene(new Widget())
engine.createApp().checkout(defaultScene).play()
```

这里做了三步

1. 等待 `init()` 直到 CanvasKit 完全加载。
2. 创建一个 `Scene` ，并将根小部件作为其第一个参数。
3. 查看 `defaultScene` 并播放动画。

我们再添加一个圆

```javascript
const engine = await new nc.Engine().init(
  '../node_modules/canvaskit-wasm/bin/canvaskit.wasm',
)
const defaultScene = new nc.Scene(new Widget().add(new nc.Circle(100)))
engine.createApp().checkout(defaultScene).play()
```

对这个圆创建动画

```javascript

```
