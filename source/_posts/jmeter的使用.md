---
title: jmeter的使用
date: 2020-12-19 20:57:43
tags: java
---

> 人生至善，就是对生活乐观，对工作愉快，对事业兴奋。——布兰登

首先到[官网](http://jmeter.apache.org/download_jmeter.cgi)下载`jmeter`

![image-20201219174117712](/imgs/oss/picGo/image-20201219174117712.png)

如果下的慢可以切换镜像

![image-20201219183835358](/imgs/oss/picGo/image-20201219183835358.png)

下载好了后解压，打开`bin`目录下的`jmeter.bat`

![image-20201219192806459](/imgs/oss/picGo/image-20201219192806459.png)

打开后我们切换到中文

![image-20201219193004234](/imgs/oss/picGo/image-20201219193004234.png)

我们右键`Test Plan`添加一个线程组

![image-20201219193346775](/imgs/oss/picGo/image-20201219193346775.png)

添加一个`HTTP`请求的取样器

![image-20201219193546073](/imgs/oss/picGo/image-20201219193546073.png)

填写接口信息

![image-20201219201629347](/imgs/oss/picGo/image-20201219201629347.png)

然后再添加一个`HTTP`信息头管理器

![image-20201219200512315](/imgs/oss/picGo/image-20201219200512315.png)

填入token

![image-20201219200550768](/imgs/oss/picGo/image-20201219200550768.png)

然后添加监听器里的查看结果树

![image-20201219200628225](/imgs/oss/picGo/image-20201219200628225.png)

以及汇总报告

![image-20201219200704554](/imgs/oss/picGo/image-20201219200704554.png)

又或者是聚合报告

![image-20201219200910241](/imgs/oss/picGo/image-20201219200910241.png)

我们点击运行

![image-20201219201105757](/imgs/oss/picGo/image-20201219201105757.png)

提示，需要保存

![image-20201219201125737](/imgs/oss/picGo/image-20201219201125737.png)

我们点击`Yes`然后保存

![image-20201219201233981](/imgs/oss/picGo/image-20201219201233981.png)

再次点击运行后我们再次点击查看结果数树发现测试结果出来了

![image-20201219201651569](/imgs/oss/picGo/image-20201219201651569.png)

包括汇总报告![image-20201219201730921](/imgs/oss/picGo/image-20201219201730921.png)

以及聚合报告

![image-20201219201749522](/imgs/oss/picGo/image-20201219201749522.png)

我们也可以把循环次数设置为永远

![image-20201219201930160](/imgs/oss/picGo/image-20201219201930160.png)

最后可以看到我们的报告一直在上涨

![image-20201219202110579](/imgs/oss/picGo/image-20201219202110579.png)

如果出现`Address already in use: connect`

![image-20201219202345820](/imgs/oss/picGo/image-20201219202345820.png)

我们按`WIN+R`打开运行窗口输入`regedit`打开注册表

找到`HKEY_LOCAL_MACHINE`->`SYSTEM`->`CurrentControlSet`->`Services`->`Tcpip`->`Parameters`

找到`MaxUserPort`

没有的话右键，新建`DWORD`，然后改名为`MaxUserPort`

![image-20201219202956382](/imgs/oss/picGo/image-20201219202956382.png)

编辑值为`65534`

![image-20201219203200727](/imgs/oss/picGo/image-20201219203200727.png)

然后再新建一个`TCPTimedWaitDelay`并设置值为`30`

![image-20201219203359464](/imgs/oss/picGo/image-20201219203359464.png)

然后收藏这篇博客，重启电脑后再次执行就会发现就没有这么多的`Address already in use: connect`了

