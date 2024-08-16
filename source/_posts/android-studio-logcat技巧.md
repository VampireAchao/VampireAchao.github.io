---
title: android studio logcat技巧
date: 2024-05-07 12:22:09
tags: android
---

> 对人民来说，唯一的权利是法律，对个人来说唯一的权利是良心。——雨果

很多朋友不会用 `LogCat` 看日志

[View logs with Logcat &nbsp;|&nbsp; Android Studio &nbsp;|&nbsp; Android Developers](https://developer.android.google.cn/studio/debug/logcat)

这个是官方文档，例如这里可以反向筛选：

```bash
level:error -tag:DeviceDoctorHandler -tag:AndroidRuntime -tag:OOMEventManager -tag:MiuiFastConnectService -tag:.gms.persisten -tag:ANDR-PERF -tag:SELinux -tag:GCM -tag:libc
```

这里就是筛选出除了后面一大串 `Tag` 的 `Error` 等级日志

译文：

# 使用Logcat查看日志

Android Studio 中的 Logcat 窗口通过实时显示来自设备的日志来帮助您调试应用程序，例如，使用 `Log` 类添加到应用程序的消息、来自在 Android 上运行的服务的消息、或系统消息，例如发生垃圾收集时。当应用程序引发异常时，Logcat 会显示一条消息，后跟包含该代码行链接的关联堆栈跟踪。

## Logcat 窗口入门

要查看应用程序的日志消息，请执行以下操作。

1. 在 Android Studio 中，在物理设备或模拟器上构建并运行您的应用。
2. 从菜单栏中选择“视图”>“工具窗口”>“Logcat”。

默认情况下，Logcat 滚动到末尾。单击 Logcat 视图或使用鼠标滚轮向上滚动可关闭此功能。要重新打开它，请从工具栏中单击滚动到末尾 ![Scroll to the End icon](https://developer.android.google.cn/static/studio/images/buttons/logcat-scroll-end.png) 。您还可以使用工具栏清除、暂停或重新启动 Logcat。

![The Logcat window UI](https://developer.android.google.cn/static/studio/images/debug/logcat-window.png)

图 1.Logcat 格式化日志，以便更轻松地扫描有用信息（例如标签和消息）并识别不同类型的日志（例如警告和错误）。

### 如何读取日志

每个日志都有一个日期、时间戳、进程和线程 ID、标签、包名称、优先级以及与其关联的消息。不同的标签具有独特的颜色，有助于识别日志的类型。每个日志条目的优先级为 `FATAL` 、 `ERROR` 、 `WARNING` 、 `INFO` 、 `DEBUG` 或 `VERBOSE` 。

例如，以下日志消息的优先级为 `DEBUG` ，标签为 `ProfileInstaller` ：

2022-12-29 04:00:18.823 30249-30321 ProfileInstaller        com.google.samples.apps.sunflower    D  Installing profile for com.google.samples.apps.sunflower

### 配置日志视图

标准日志视图显示每个日志的日期、时间、进程和线程 ID、标签、包名称、优先级以及与其关联的消息。默认情况下，消息行不会在日志视图中换行，但您可以使用 Logcat 工具栏中的 Soft-Wrap ![Soft-Wrap icon](https://developer.android.google.cn/static/studio/images/buttons/logcat-soft-wrap.png) 选项。

您可以通过单击 Logcat 工具栏中的配置 Logcat 格式选项 ![](https://developer.android.google.cn/static/studio/images/buttons/logcat-formatting-options.png) 切换到默认显示信息较少的紧凑视图。

要进一步配置要显示的信息量，请选择“修改视图”，然后选择是否要查看显示的时间戳、标签、进程 ID 或包名称。

#### 更改配色方案

要更改配色方案，请导航至 Android Studio > 设置 > 编辑器 > 配色方案。要更改日志视图的配色方案，请选择 Android Logcat。要更改过滤器的配色方案，请选择 Logcat 过滤器。

#### 附加配置选项

有关其他配置选项，请导航至 Android Studio > 设置 > 工具 > Logcat。从这里，您可以选择 Logcat 循环缓冲区大小、新 Logcat 窗口的默认过滤器，以及是否要将历史过滤器添加到自动完成。

### 在多个窗口中使用Logcat

选项卡可帮助您轻松在不同设备或查询之间切换。您可以通过单击新建选项卡 ![New Tab icon](https://developer.android.google.cn/static/studio/images/buttons/logcat-new-tab.png) 创建多个 Logcat 选项卡。右键单击选项卡可以对其进行重命名和重新排列。

此外，您可以在选项卡中拆分视图，以帮助您更轻松地比较两组日志。要创建拆分，请在日志视图中右键单击或单击工具栏中的“拆分面板”选项，然后选择“向右拆分”或“向下拆分”。要关闭拆分，请右键单击并选择关闭。每个拆分都允许您设置自己的设备连接、查看选项和查询。

![Multiple Logcat windows](https://developer.android.google.cn/static/studio/images/debug/logcat-split-view.png) 图 2. Android Studio 中的拆分 Logcat 窗口。

在 Logcat 工具栏中，您可以滚动到日志末尾，也可以单击特定行以保持该行可见。

在 Android Studio 中，您可以直接从主查询字段生成键值搜索。该查询系统提供您想要查询的内容的准确性，并根据键值排除日志。虽然您可以选择使用正则表达式，但您不必依赖它们进行查询。要查看建议，请在查询字段中按 `Ctrl` + `Space` 。

![List of suggestions in the query field](https://developer.android.google.cn/static/studio/images/debug/logcat-query-suggestions.png) 图 3. 在查询字段中按 `Ctrl` + `Space` 可查看建议查询的列表。

以下是您可以在查询中使用的键的一些示例：

- `tag` ：与日志条目的 `tag` 字段匹配。
- `package` ：与日志记录应用程序的包名称匹配。
- `process` ：与日志记录应用程序的进程名称匹配。
- `message` ：与日志条目的消息部分匹配。
- `level` ：匹配指定或更高的严重日志级别 - 例如， `DEBUG` 。
- `age` ：如果条目时间戳是最近的，则匹配。值指定为数字后跟指定时间单位的字母： `s` 表示秒， `m` 表示分钟， `h` 表示小时， `d` 仅过滤过去 5 分钟内记录的消息。

以下字段支持否定和正则表达式匹配： `tag` 、 `package` 、 `message` 和 `line` 。

通过在字段名称前添加 `-` 来表示否定。例如， `-tag:MyTag` 匹配 `tag` 不包含字符串 `MyTag` 的日志条目。

正则表达式匹配是通过在字段名后附加 `~` 来表示的。例如， `tag~:My.*Tag` 。

否定和正则表达式修饰符可以组合使用。例如， `-tag~:My.*Tag` 。

### Logical operators and parentheses

查询语言支持由 `&` 和 `|` 以及括号表示的 `AND` 和 `OR` 运算符。例如：

`(tag:foo | level:ERROR) & package:mine`

请注意，强制执行正常的运算符优先级，因此如下：

`tag:foo | level:ERROR & package:mine`

 被评价为：

`tag:foo | (level:ERROR & package:mine)`

### Implicit logical operators

如果未应用逻辑运算符，则查询语言会自动评估多个非否定 `key-value` 过滤条件，其键与 `OR` 相同，而其他所有内容均具有 `AND` .

 例如：

`tag:foo tag:bar package:myapp`

 被评价为：

`(tag:foo | tag:bar) & package:myapp`

 但：

`tag:foo -tag:bar package:myapp`

 被评价为：

`tag:foo & -tag:bar & package:myapp`

如果多个查询项由空格分隔且没有逻辑运算符，则它们将被视为具有低优先级的 AND。例如，术语 `foo bar tag:bar1 | tag:bar2` 相当于 `'foo bar' & (tag: bar1 | tag: bar2)` 。

### Special queries

**`package:mine`**

包密钥支持特殊值 `mine` 。此特殊值与打开的项目中包含的任何包名称相匹配。

**`level`**

`level` 查询与 Logcat 消息的日志级别匹配，其中日志条目级别大于或等于查询级别。

例如， `level:INFO` 匹配日志级别为 `INFO` 、 `WARN` 、 `ERROR` 或 `ASSERT` 的任何日志条目。级别不区分大小写。有效级别为： `VERBOSE` 、 `DEBUG` 、 `INFO` 、 `WARN` 、 `ERROR` 和 `ASSERT` .

**`age`**

`age` 查询根据时间戳匹配条目，格式为 `age:<number><unit>` ，其中

-   `<number>` 是一个整数
- `<unit>` 是 `s` 、 `m` 、 `h` 和 `d` 之一（秒、分钟、小时和天）。

给定以下列表， `age` 查询将匹配时间戳在值所描述的范围内的日志消息。例如：查询 `age:5m` 匹配时间戳不早于 5 分钟前的条目。

```
age:30sage:5mage:3hage:1d
```

请注意，时间戳是与主机的时间戳进行比较，而不是与连接的设备的时间戳进行比较。如果设备的时间设置不正确，则此查询可能无法按预期工作。

  **`is` 键**

您可以按如下方式使用 `is` 键：

- `is:crash` 匹配表示应用程序崩溃（本机或 Java）的日志条目。
- `is:stacktrace` 匹配代表任何看起来像 Java 堆栈跟踪的日志条目，无论日志级别如何。

  **`name` 键**

`name` 键可让您为已保存的过滤器提供唯一的名称，以便在过滤器历史记录下拉列表中轻松识别它。尽管多次指定 `name` 不会出现错误，但 IDE 仅在查询中使用 `name` 最后指定的值。

### View query history

您可以通过单击查询字段旁边的显示历史记录 ![Filter icon](https://developer.android.google.cn/static/studio/images/buttons/logcat-filter-icon.png) 来查看查询历史记录。要收藏某个查询，使其位于所有工作室项目列表的顶部，请单击它旁边的星号。您还可以使用 `name:` 键使收藏夹查询更易于识别。有关详细信息，请参阅特殊查询。

![UI for favoriting a query](https://developer.android.google.cn/static/studio/images/debug/logcat-fav-query.png)

图 4. 通过单击查询旁边的星号来收藏该查询。

## Track logs across app crashes and restarts

当 Logcat 注意到您的应用程序进程已停止并重新启动时，它会在输出中显示一条消息，例如 `PROCESS ENDED` 和 `PROCESS STARTED` 。重新启动 Logcat 会保留您的会话配置，例如选项卡拆分、筛选器和视图选项，以便您可以轻松地继续会话。

![Logcat window for app crashes](https://developer.android.google.cn/static/studio/images/debug/logcat-track-crashes.png)

图 5. 当您的应用程序进程重新启动时，Logcat 会打印一条消息，表明该进程已结束然后又开始。
