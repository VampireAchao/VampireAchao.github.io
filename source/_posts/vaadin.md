---
title: vaadin
date: 2023-08-06 11:35:13
tags: java
---

> 历史是一堆灰烬，但灰烬深处有余温。——黑格尔《美学》

`Vaadin`允许我们使用`java`代码进行页面构建

Vaadin 是一个 Java 的 Web 应用程序开发框架，其中包含一个大型的 UI 组件库。它可以帮助您比以前更快地构建可靠的 Web 应用程序和出色的用户体验

https://vaadin.com/

我们按照官方文档里下载`demo`

https://vaadin.com/docs/latest/guide/quick-start

运行以后

![](/imgs/oss/picGo/20230806113721.png)

发现这里的主要代码：

```java
package com.example.application.views.main;

import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@PageTitle("Main")
@Route(value = "")
public class MainView extends HorizontalLayout {

    private TextField name;
    private Button sayHello;

    public MainView() {
        name = new TextField("Your name");
        sayHello = new Button("Say hello");
        sayHello.addClickListener(e -> {
            Notification.show("Hello " + name.getValue());
        });
        sayHello.addClickShortcut(Key.ENTER);

        setMargin(true);
        setVerticalComponentAlignment(Alignment.END, name, sayHello);

        add(name, sayHello);
    }

}
```

成功为我们构建一个页面：

![](/imgs/oss/picGo/20230806113859.png)

我们填写内容，点击

下方弹出了消息

![](/imgs/oss/picGo/20230806114010.png)
