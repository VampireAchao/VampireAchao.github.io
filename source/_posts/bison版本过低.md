---
title: bison版本过低
date: 2024-04-02 19:13:16
tags: 软件及插件
---

> 别骄傲，别怀恨，别不肯原谅人。——狄更斯

今天报错`bison`版本过低，我用`mac`的`homebrew`升级一下

```bash
brew install bison
```

发现安装完毕环境变量不对，原来需要`copy`过去

```bash
sudo cp /opt/homebrew/Cellar/bison/3.8.2/bin/bison ./bison
```

即可

```bash
Github-Id-VampireAchao:test achao$ bison -V
bison (GNU Bison) 3.8.2
Written by Robert Corbett and Richard Stallman.

Copyright (C) 2021 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```
