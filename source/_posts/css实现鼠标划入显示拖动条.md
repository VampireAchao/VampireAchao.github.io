---
title: css实现鼠标划入显示拖动条
date: 2022-04-22 13:27:22
tags: 前端
---

> 古之立大事者，不惟有超世之才，亦必有坚忍不拔之志。——苏轼

代码如下：

```html
<!DOCTYPE html>
<html>
    <head>
        <style>
            .ruben-container{
                height: calc(100vh - 70vh);
                width: calc(100vw - 70vw);
                overflow-y: auto;
            }
            .ruben-container::-webkit-scrollbar {
                width: 4px;
            }
            .ruben-container::-webkit-scrollbar-thumb{
                border-radius: 20px;
            }
            .ruben-container:hover::-webkit-scrollbar{
                background: #eee;
            }
            .ruben-container:hover::-webkit-scrollbar-thumb{
                background: #ccc;
            }
        </style>
    </head>
    <body>
        <div class="ruben-container">
            <div>我们都必须串联相关生态，去思考有关hutool的问题。我们认为，找到抓手，形成方法论，hutool则会迎刃而解。互联网运营人员间有着这样的共识，做精细化运营，向目标发力，才能获得影响力。这让我明白了问题的抓手，互联网产品经理间有着这样的共识，如何强化认知，快速响应，是非常值得跟进的。这句话语虽然很短，但沉淀之后真的能发现痛点。互联网产品经理间流传着这样一句话，如何强化认知，快速响应，是非常值得跟进的。这不禁令我深思。我们认为，找到抓手，形成方法论，hutool则会迎刃而解。解决hutool的问题，首先要找到抓手。 所以，互联网产品经理间有着这样的共识，如何强化认知，快速响应，是非常值得跟进的。这不禁令我深思。互联网从业者间流传着这样一句话，只有适度倾斜资源，才能赋能整体业务。也许这句话就是最好的答案。互联网运营人员间流传着这样一句话，做精细化运营，向目标发力，才能获得影响力。也许这句话就是最好的答案。</div>
        </div>
    </body>
</html>
```

效果如下：

<div>
<!DOCTYPE html>
<html>
    <head>
        <style>
            .ruben-container{
                height: calc(100vh - 70vh);
                width: calc(100vw - 70vw);
                overflow-y: auto;
            }
            .ruben-container::-webkit-scrollbar {
                width: 4px;
            }
            .ruben-container::-webkit-scrollbar-thumb{
                border-radius: 20px;
            }
            .ruben-container:hover::-webkit-scrollbar{
                background: #eee;
            }
            .ruben-container:hover::-webkit-scrollbar-thumb{
                background: #ccc;
            }
        </style>
    </head>
    <body>
        <div class="ruben-container">
            <div>我们都必须串联相关生态，去思考有关hutool的问题。我们认为，找到抓手，形成方法论，hutool则会迎刃而解。互联网运营人员间有着这样的共识，做精细化运营，向目标发力，才能获得影响力。这让我明白了问题的抓手，互联网产品经理间有着这样的共识，如何强化认知，快速响应，是非常值得跟进的。这句话语虽然很短，但沉淀之后真的能发现痛点。互联网产品经理间流传着这样一句话，如何强化认知，快速响应，是非常值得跟进的。这不禁令我深思。我们认为，找到抓手，形成方法论，hutool则会迎刃而解。解决hutool的问题，首先要找到抓手。 所以，互联网产品经理间有着这样的共识，如何强化认知，快速响应，是非常值得跟进的。这不禁令我深思。互联网从业者间流传着这样一句话，只有适度倾斜资源，才能赋能整体业务。也许这句话就是最好的答案。互联网运营人员间流传着这样一句话，做精细化运营，向目标发力，才能获得影响力。也许这句话就是最好的答案。</div>
        </div>
    </body>
</html>
</div>