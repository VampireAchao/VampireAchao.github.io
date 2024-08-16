---
title: linkedList实现高亮逻辑
date: 2022-08-01 13:02:27
tags: java
---

> 渴望像神话中巨型的黄色罗马蜡烛那样燃烧。——杰克·凯鲁亚克《在路上》

这里是基于`hutool`的`dfa`查找法得到的结果集进行封装，不一定非要依赖`hutool`，可以自定义`FoundWord`对象，里面就只用到了一个起始下标，以及对应需要高亮的词汇

```java
    public static String highlight(String text, List<FoundWord> fondWords, UnaryOperator<String> highlightOperator) {
        if (Opp.ofColl(fondWords).isEmpty() || Opp.ofStr(text).isEmpty()) {
            return text;
        }
        fondWords = Steam.of(fondWords)
                .sorted(Comparator.comparing(FoundWord::getIndex)
                        .thenComparingInt(w -> w.getWord().length()))
                .toList();
        LinkedList<FoundWord> linkedList = new LinkedList<>();
        // 记录历史下标(当前拼接到整体string的哪个位置了)
        int lastIdx = 0;
        // 进行遍历所有结果(理论上已按照 startIndex和fondWord.length排序)
        for (int i = 0; i < fondWords.size(); i++) {
            FoundWord fondWord = fondWords.get(i);
            String word = null;
            // 如果本次匹配发现历史下标已经超过了当前匹配值，说明这次词语和上次词语下标重复或者是上次的一部分
            if (i > 0 && lastIdx > fondWord.getIndex()) {
                // 移除拼接的额外部分
                FoundWord last = Objects.requireNonNull(linkedList.pollLast());
                // 判断上次和这次的长度，如果上次长度大于这次长度，说明这次词语是上次的一部分
                lastIdx -= last.getWord().length();
                // 获取要从哪里开始保留
                int index = fondWord.getWord().indexOf(last.getWord().charAt(last.getWord().length() - 1));
                // 这里没有判断是否找到是因为只要进入当前的if语句那么必定有重复串可以找到
                String suffix = fondWord.getWord().substring(index+1);
                word = last.getWord() + suffix;
            } else {
                // 否则根据历史下标到当前词汇下标进行查找额外部分
                String partOne = text.substring(lastIdx, fondWord.getIndex());
                // 并且将历史下标往前推进
                lastIdx += partOne.length();
                // 将额外部分拼接到链表中
                linkedList.add(new FoundWord(partOne, lastIdx));
            }
            // 获取本次需要高亮的词汇
            word = Opp.ofStr(word).orElseGet(fondWord::getWord);
            // 历史下标往前推进
            lastIdx += word.length();
            // 执行高亮操作
            linkedList.add(new FoundWord(word, highlightOperator.apply(word), lastIdx));
        }
        // 别忘了加上最后一截
        linkedList.add(new FoundWord(text.substring(lastIdx), text.substring(lastIdx), lastIdx));
        return Steam.of(linkedList).map(FoundWord::getWordAfterHighlight).join();
    }
```

使用：

```java
        WordTree tree = new WordTree();
        tree.addWord("大");
        tree.addWord("大土豆");
        tree.addWord("土豆");
        tree.addWord("刚出锅");
        tree.addWord("出锅");
        String text = "我有一颗大土豆，刚出锅的";
        List<FoundWord> foundWords = tree.matchAllWords(text, -1, true, true);
        String result = CommonUtils.highlight(text, foundWords, s -> "<span style='color:red'>" + s + "</span>");
        System.out.println(result);
```

效果：

![image-20220801130912146](/imgs/oss/picGo/image-20220801130912146.png)

这里重载了一个`needSort`，如果是自定义的`FoundWord`，需要指定为`true`，手动进行排序

