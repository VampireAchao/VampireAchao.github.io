---
title: javadoc保留格式标签
date: 2024-03-06 20:19:18
tags: java
---

> 不结果的树是没人去摇的。唯有那些果实累累的，才有人用石子去打。——罗曼·罗兰

在`hutool`中就有体现：

```java
/*
 * Copyright (c) 2023 looly(loolly@aliyun.com)
 * Hutool is licensed under Mulan PSL v2.
 * You can use this software according to the terms and conditions of the Mulan PSL v2.
 * You may obtain a copy of Mulan PSL v2 at:
 *          https://license.coscl.org.cn/MulanPSL2
 * THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
 * MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
 * See the Mulan PSL v2 for more details.
 */

package org.dromara.hutool.core.text.dfa;

import org.dromara.hutool.core.collection.CollUtil;
import org.dromara.hutool.core.collection.set.SetUtil;
import org.dromara.hutool.core.map.MapUtil;
import org.dromara.hutool.core.stream.EasyStream;
import org.dromara.hutool.core.text.StrUtil;

import java.util.*;
import java.util.function.Predicate;

/**
 * DFA（Deterministic Finite Automaton 确定有穷自动机）
 * DFA单词树（以下简称单词树），常用于在某大段文字中快速查找某几个关键词是否存在。<br>
 * 单词树使用group区分不同的关键字集合，不同的分组可以共享树枝，避免重复建树。<br>
 * 单词树使用树状结构表示一组单词。<br>
 * 例如：红领巾，红河 构建树后为：
 * <pre>
 *            红
 *            /\
 *          领  河
 *         /
 *       巾
 * </pre>
 * 其中每个节点都是一个WordTree对象，查找时从上向下查找。
 *
 * @author Looly
 */
public class WordTree extends HashMap<Character, WordTree> {
	private static final long serialVersionUID = -4646423269465809276L;
}
```

这里用了`pre`标签避免格式化导致注释内缩进错乱
