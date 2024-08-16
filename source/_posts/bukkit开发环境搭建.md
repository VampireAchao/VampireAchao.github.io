---
title: bukkit开发环境搭建
date: 2020-10-05 13:02:33
tags: minecraft
---

> 世间的很多事物，追求时候的兴致总是要比享用的时候的兴致浓烈。——莎士比亚《威尼斯商人》

这两天入门`bukkit`踩了不少坑

写篇搭建开发环境

首先需要`idea`和一个服务器核心

[服务器核心点我下载](/imgs/oss/picGo/spigot-1.15.2.jar)

我还在安装`idea`。。。

![image-20201005150824186](/imgs/oss/picGo/image-20201005150824186.png)

打开`idea`，点击右下角的`Configure`，选择`Plugins`

![image-20201005151412007](/imgs/oss/picGo/image-20201005151412007.png)

搜索`Minecraft Development`点击`install`

![image-20201005151444301](/imgs/oss/picGo/image-20201005151444301.png)

顺便下载了`Chinese`，`Translation`以及`Camelcase`（可选，单纯个人习惯）

安装好了重启`idea`

然后创建新项目

![image-20201005152003931](/imgs/oss/picGo/image-20201005152003931.png)

可以看到左边的`Minecraft`，点击，然后勾选上`Bukkit Plugin`，点击下一步

![image-20201005152514822](/imgs/oss/picGo/image-20201005152514822.png)

输入`GroupId`和`ArtifactId`并点击下一步

![image-20201005152624582](/imgs/oss/picGo/image-20201005152624582.png)

然后继续`Next`，注意我们这里选的版本是`1.15.2`

![image-20201005153229733](/imgs/oss/picGo/image-20201005153229733.png)

填入`Project name`，点击`Finish`

![image-20201005153257431](/imgs/oss/picGo/image-20201005153257431.png)

然后稍加等待，下载依赖

![image-20201005153656838](/imgs/oss/picGo/image-20201005153656838.png)

然后我们点右上角的项目运行配置，选择第一个

![image-20201005154037258](/imgs/oss/picGo/image-20201005154037258.png)

![image-20201005154107945](/imgs/oss/picGo/image-20201005154107945.png)

点击加号

![image-20201005154123783](/imgs/oss/picGo/image-20201005154123783.png)

选择`JAR`应用程序

![image-20201005154207324](/imgs/oss/picGo/image-20201005154207324.png)

点击`Path to JAR`右边的文件夹

![image-20201005154253606](/imgs/oss/picGo/image-20201005154253606.png)

找到我们最开始下载的`spigot-1.15.2.jar`，点击确定

![image-20201005154439926](/imgs/oss/picGo/image-20201005154439926.png)

然后点击执行前右边的加号

![image-20201005154515245](/imgs/oss/picGo/image-20201005154515245.png)

选择运行`Maven`目标

![image-20201005154532601](/imgs/oss/picGo/image-20201005154532601.png)

输入，点击确定

> ```
> clean package
> ```

![image-20201005154623716](/imgs/oss/picGo/image-20201005154623716.png)

最后在项目根目录下的`pom.xml`中配置

```xml
<outputDirectory>${session.executionRootDirectory}/plugins/</outputDirectory>
```

![image-20201005154827826](/imgs/oss/picGo/image-20201005154827826.png)

点击右上角重新加载`maven`后这时候我们点击运行

![image-20201005154949882](/imgs/oss/picGo/image-20201005154949882.png)

然后可以看到这么一段

![image-20201005155026866](/imgs/oss/picGo/image-20201005155026866.png)

我们打开上面生成的`eula.txt`，把`false`改成`true`

![image-20201005155058138](/imgs/oss/picGo/image-20201005155058138.png)

然后打开`server.properties`把`online-mode`改为`false`

![image-20201005155241947](/imgs/oss/picGo/image-20201005155241947.png)

好了后我们再次启动，可以看到服务器开启了

![image-20201005155401667](/imgs/oss/picGo/image-20201005155401667.png)

我们进入游戏

点击多人游戏

![image-20201005155508173](/imgs/oss/picGo/image-20201005155508173.png)

点击添加服务器

![image-20201005155542820](/imgs/oss/picGo/image-20201005155542820.png)

输入，点击完成

> localhost:25565

![image-20201005155615276](/imgs/oss/picGo/image-20201005155615276.png)

可以看到服务器状态良好

![image-20201005155639547](/imgs/oss/picGo/image-20201005155639547.png)

双击进去，发现一切正常

![image-20201005155718886](/imgs/oss/picGo/image-20201005155718886.png)

那么我们来写一个非常简单的`laugh`命令插件，游戏中玩家输入`/laugh`，然后系统向玩家发送一条消息为“哈哈哈”

首先到`HelloBukkit.java`中按`ALT+INSERT`点击重写`onCommand`方法

![image-20201005160025955](/imgs/oss/picGo/image-20201005160025955.png)

然后开始编写代码

```java
package hellobukkit.hellobukkit;

import org.bukkit.command.Command;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;
import org.bukkit.plugin.java.JavaPlugin;

public final class HelloBukkit extends JavaPlugin {

    @Override
    public void onEnable() {
        // Plugin startup logic

    }

    @Override
    public void onDisable() {
        // Plugin shutdown logic
    }

    @Override
    public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {
        if (command.getName().equalsIgnoreCase("laugh")) {
            if (!(sender instanceof Player)) {
                sender.sendMessage("你不是玩家");
                return false;
            }
            sender.sendMessage("哈哈哈");
            return true;
        }
        return false;
    }
}
```

然后写完了需要到`plugin.yml`中配置一下

![image-20201005160529117](/imgs/oss/picGo/image-20201005160529117.png)

```yaml
name: HelloBukkit
version: ${project.version}
main: hellobukkit.hellobukkit.HelloBukkit
api-version: 1.15
commands:
  laugh:
    description: Laugh out loudly!
    usage: /laugh

```

然后我们运行

游戏中输入`/laugh`

![image-20201005160951703](/imgs/oss/picGo/image-20201005160951703.png)

发现插件运行成功！

如果我们在控制台中试图运行该命令

可以看到返回结果也是正常

![image-20201005161153101](/imgs/oss/picGo/image-20201005161153101.png)