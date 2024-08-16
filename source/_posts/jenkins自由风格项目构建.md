---
title: jenkins自由风格项目构建
date: 2020-07-29 20:32:06
tags: java
---

到<code>Jenkins</code>中新建一个项目名叫<code>web_demo_freestyle</code>

![image-20200715225156708](/imgs/oss/picGo/image-20200715225156708.png)

然后拉取代码

![image-20200715225600914](/imgs/oss/picGo/image-20200715225600914.png)

然后编译打包

```shell
echo "——编译打包开始——"
mvn clean package
echo "——编译打包结束——"
```

![image-20200715225756510](/imgs/oss/picGo/image-20200715225756510.png)

完成

![image-20200715225906317](/imgs/oss/picGo/image-20200715225906317.png)

安装<code>Deploy to container</code>插件

![image-20200715230043462](/imgs/oss/picGo/image-20200715230043462.png)

安装完成

![image-20200716091126818](/imgs/oss/picGo/image-20200716091126818.png)

回到<code>web_demo_freestyle</code>项目的配置

增加构建后操作步骤<code>-></code>点击<code>Deploy war/ear to a container</code>

![image-20200716181631460](/imgs/oss/picGo/image-20200716181631460.png)

输入<code>war</code>包目录

```shell
target/*.war
```

添加一个凭据

![image-20200716181955128](/imgs/oss/picGo/image-20200716181955128.png)

输入用户名<code>tomcat</code>和密码<code>tomcat</code>

![image-20200716182047299](/imgs/oss/picGo/image-20200716182047299.png)

输入<code>tomcat</code>服务器地址，保存

![image-20200716182217356](/imgs/oss/picGo/image-20200716182217356.png)

然后构建，成功后就是这样了

![image-20200716192014886](/imgs/oss/picGo/image-20200716192014886.png)

我们发现已经能访问了

![image-20200716195807389](/imgs/oss/picGo/image-20200716195807389.png)

我们更改一下代码

![image-20200716201356219](/imgs/oss/picGo/image-20200716201356219.png)

```html
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<body>
<h2>Hello jenkins!</h2>
<div class="yesMyTime">
    当前时间：
    <span id="date"></span>
    <span id="time"></span>
</div>
<script type="application/javascript">
    window.onload = function () {
        setTime();
    };

    function getTime() {
        let week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        let localToday = "";
        let d = new Date();
        // console.log(d)
        localToday =
            d.getFullYear() +
            "年" +
            (d.getMonth() + 1) +
            "月" +
            d.getDate() +
            "日";
        let time = "";
        let hh = d.getHours(); //时
        let mm = d.getMinutes(); //分
        let ss = d.getSeconds(); //秒
        if (hh < 10) time += "0";
        time += hh + ":";
        if (mm < 10) time += "0";
        time += mm + ":";
        if (ss < 10) time += "0";
        time += ss;
        return {
            0: localToday,
            1: week[d.getDay()],
            2: time
        };
    }

    let timer = null;

    function setTime() {
        if (timer !== null) {
            clearTimeout(timer);
        }
        setTimeout(function () {
            document.getElementById("date").innerHTML=getTime()[0];
            document.getElementById("time").innerHTML=getTime()[1] + "  " + getTime()[2];
            setTime();
        }, 1000);
    }
</script>

</body>
</html>
```

然后push

![image-20200716201522005](/imgs/oss/picGo/image-20200716201522005.png)

然后回到jenkins进行构建

![image-20200716202150571](/imgs/oss/picGo/image-20200716202150571.png)

成功后刷新我们的<code>tomcat</code>

![image-20200716202215931](/imgs/oss/picGo/image-20200716202215931.png)

可以看到我们的更改