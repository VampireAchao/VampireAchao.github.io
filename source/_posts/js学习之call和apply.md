---
title: js学习之call和apply
date: 2020-09-04 19:56:31
tags: 前端
---

![img](/imgs/oss/picGo/7F2(ZBE%7B0%5BQ$TW%7D96%5DV%60)RV.jpg)

贪玩蓝月真好玩，但学习还是要继续的

我们平时调用一个`js`函数是这样的

```javascript
        var ruben = {
            say: function (word) {
                if (this.name == null) {
                    this.name = "ruben";
                }
                return this.name + "说：" + word;
            }
        }
        var whatRubenSaid = ruben.say("做猪呢，最重要的是开心");
        console.log(whatRubenSaid);
```

输出结果

![image-20200904200656453](/imgs/oss/picGo/image-20200904200656453.png)

那么我们现在新创建一个对象

```javascript
        var Achao = {
            name: "Achao"
        }
```

如果我们想在`Achao`里调用`ruben`里的`say`函数

我们就可以这样

```javascript
        var whatAchaoSaid = ruben.say.call(Achao, "村头恶霸华农、刑部尚书手工耿、木瓜大盗莫叔、非洲人犯朱一旦")
        console.log(whatAchaoSaid);
```

输出结果

![image-20200904200840356](/imgs/oss/picGo/image-20200904200840356.png)

这就是`call`函数的使用方式和场景了

那么还有一个`apply`呢？

和`call`不同，它调用方法给的参数需要是一个数组

```javascript
        var Hegel = {
            name: "黑格尔"
        }
        var whatHegelSaid = ruben.say.apply(Hegel, ["只有永远躺在泥坑里的人，才不会再掉进坑里。"])
        console.log(whatHegelSaid);
```

![image-20200904201116252](/imgs/oss/picGo/image-20200904201116252.png)

否则会抛出异常

![image-20200904201148445](/imgs/oss/picGo/image-20200904201148445.png)