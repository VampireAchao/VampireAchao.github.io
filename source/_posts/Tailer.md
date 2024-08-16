---
title: Tailer
date: 2023-02-02 20:12:05
tags: java
---

> 这个世界上没有无用的齿轮，也只有齿轮本身能决定自己的用途。——《嫌疑犯X的献身》

分享一个小工具，`Hutool`里有一个`Tailer`文件跟随很好用

文档：https://hutool.cn/docs/#/core/IO/%E6%96%87%E4%BB%B6/%E6%96%87%E4%BB%B6%E8%B7%9F%E9%9A%8F-Tailer

> ## [由来](https://hutool.cn/docs/#/core/IO/文件/文件跟随-Tailer?id=由来)
>
> 有时候我们要启动一个线程实时“监控”文件的变化，比如有新内容写出到文件时，我们可以及时打印出来，这个功能非常类似于Linux下的`tail -f`命令。
>
> ## [使用](https://hutool.cn/docs/#/core/IO/文件/文件跟随-Tailer?id=使用)
>
> ```java
> Tailer tailer = new Tailer(FileUtil.file("f:/test/test.log"), Tailer.CONSOLE_HANDLER, 2);
> tailer.start();
> ```
>
> 其中`Tailer.CONSOLE_HANDLER`表示文件新增内容默认输出到控制台。
>
> ```java
> /**
>  * 命令行打印的行处理器
>  * 
>  * @author looly
>  * @since 4.5.2
>  */
> public static class ConsoleLineHandler implements LineHandler {
>     @Override
>     public void handle(String line) {
>         Console.log(line);
>     }
> }
> ```
>
> 我们也可以实现自己的LineHandler来处理每一行数据。
>
> > 注意 此方法会阻塞当前线程