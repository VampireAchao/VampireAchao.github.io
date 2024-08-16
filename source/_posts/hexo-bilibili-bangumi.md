---
title: hexo-bilibili-bangumi
date: 2023-06-21 21:22:22
tags: 前端
---

> 练习是良好的老师。——贺拉斯

分享一个`hexo`插件：

https://github.com/HCLonely/hexo-bilibili-bangumi

`hexo` 番剧页面插件，可选数据源：`Bilibili, Bangumi`

[Demo](https://demo.hclonely.com/bangumis/)

安装

```shell
$ npm install hexo-bilibili-bangumi --save
```

配置

> 将下面的配置写入站点的配置文件 `_config.yml` 里(不是主题的配置文件).
>
> ```
> bangumi: # 追番设置
>   enable: true
>   source: bili
>   bgmInfoSource: 'bgmApi'
>   path:
>   vmid:
>   title: '追番列表'
>   quote: '生命不息，追番不止！'
>   show: 1
>   lazyload: true
>   srcValue: '__image__'
>   lazyloadAttrName: 'data-src=__image__'
>   loading:
>   showMyComment: false
>   pagination: false
>   metaColor:
>   color:
>   webp:
>   progress:
>   extraOrder:
>   proxy:
>     host: '代理host'
>     port: '代理端口'
>   extra_options:
>     key: value
> cinema: # 追剧设置
>   enable: true
>   path:
>   vmid:
>   title: '追剧列表'
>   quote: '生命不息，追剧不止！'
>   show: 1
>   lazyload: true
>   srcValue: '__image__'
>   lazyloadAttrName: 'data-src=__image__'
>   loading:
>   metaColor:
>   color:
>   webp:
>   progress:
>   extraOrder:
>   extra_options:
>     key: value
> ```
>
> > 带*为必填选项！
>
> - **enable**: 是否启用
> - **source**: 数据源，仅支持追番，追剧仅支持哔哩哔哩源。`bili`: [哔哩哔哩源](https://www.bilibili.com/), `bangumi`: [Bangumi源(bangumi.tv)](https://bangumi.tv/), `bgm`: [Bangumi源(bgm.tv)](https://bgm.tv/)
> - **bgmInfoApi**: 获取Bangumi番剧信息时使用的Api，仅使用Bangumi源时此选项生效。`bgmApi`: [Bangumi Api](https://github.com/bangumi/api/), `bgmSub`: [Bangumi-Subject](https://github.com/czy0729/Bangumi-Subject)
> - **proxy**: 代理设置，仅在使用支持`bgm`源追番时生效。默认`false`
> - **path**: 页面路径，默认`bangumis/index.html`, `cinemas/index.html`
> - **vmid**: 哔哩哔哩的 `vmid(uid)`[如何获取？](https://github.com/HCLonely/hexo-bilibili-bangumi#获取-bilibili-uid)或Bangumi的用户`id`[如何获取？](https://github.com/HCLonely/hexo-bilibili-bangumi#获取-bangumi-id)
> - **title**: 该页面的标题
> - **quote**: 写在页面开头的一段话，支持 html 语法，可留空。
> - **show**: 初始显示页面：`0: 想看`, `1: 在看`, `2: 看过`，默认为`1`
> - **lazyload**: 是否启用图片懒加载，如果与主题的懒加载冲突请关闭，默认`true`
> - **srcValue**: 设置封面图的默认`src`值, `__image__`为封面链接, `__loading__`为loading图片链接, `lazyload`选项为`false`时此选项生效
> - **lazyloadAttrName**: 设置封面图的属性与属性值, 例`lazyloadAttrName: 'data-src=__image__'`代表为`img`元素添加`data-src`属性, 其值为图片链接, `lazyload`选项为`false`时此选项生效
> - **loading**: 图片加载完成前的 loading 图片，需启用图片懒加载
> - **metaColor**: meta 部分(简介上方)字体颜色（十六进制的颜色代码需要添加引号：`metaColor: '#FFFFFF'`）
> - **color**: 简介字体颜色
> - **webp**: 番剧封面使用`webp`格式(此格式在`safari`浏览器下不显示，但是图片大小可以缩小 100 倍左右，仅支持哔哩哔哩源), 默认`true`
> - **progress**: 获取番剧数据时是否显示进度条，默认`true`
> - **extraOrder**: 手动添加的番剧/追剧数据是否优先显示，`1`为优先，其它为不优先
> - **showMyComment**: 使用`bgm`源时显示自己的评价及评论，默认`false`
> - **pagination**: 分页优化，只将第一页的数据渲染到`html`文件中，其余数据将通过异步请求加载，避免番剧过多时html文件过大导致页面加载缓慢，建议番剧较多时使用，默认`false`
> - **extra_options**: 此配置会扩展到Hexo`page`变量中
>
> ## 使用
>
> 1. 在`hexo generate`或`hexo deploy`之前使用`hexo bangumi -u`命令更新追番数据，使用`hexo cinema -u`命令更新追剧数据！
> 2. 删除数据命令:`hexo bangumi -d`/`hexo cinema -d`