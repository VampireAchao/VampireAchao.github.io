---
title: console importer
date: 2023-09-14 15:39:26
tags: 前端
---

> 当你没有空休息的时候，就是你该休息的时候——西德尼

分享一个`chrome`插件`Console Importer`，可以方便我们在浏览器中进行调试一些没有本地安装的`js`库

[GitHub - pd4d10/console-importer: Easily import JS and CSS resources from Chrome console.](https://github.com/pd4d10/console-importer)

从 Chrome 网上应用店安装它：

[Console Importer - Chrome 应用商店](https://chrome.google.com/webstore/detail/console-importer/hgajpakhafplebkdljleajgbpdmplhie)

![](/imgs/oss/picGo/20230915153120.png)

安装完重进使用：

![](/imgs/oss/picGo/20230915153747.png)

> ## Usage 用法
> 
> Open Chrome devtools console, a function named `$i` could be used to import JavaScript and CSS resources.  
> 打开Chrome devtools控制台，一个名为的 `$i` 函数可用于导入JavaScript和CSS资源。
> 
> ```js
> $i('jquery')
> ```
> 
> Import specific version:  
> 导入特定版本：
> 
> ```js
> $i('jquery@2')
> ```
> 
> Also, you can import a valid script URL:  
> 此外，您还可以导入有效的脚本 URL：
> 
> ```js
> $i('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js')
> ```
> 
> CSS is supported, too:  
> 也支持 CSS：
> 
> ```js
> $i('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css')
> ```
> 
> ### Import ES Module 导入 ES 模块
> 
> ES module has been widely supported in modern browsers. `$i.esm` method can be useful in this case:  
> ES模块在现代浏览器中得到了广泛的支持。 `$i.esm` 方法在这种情况下可能很有用：
> 
> ```js
> d3 = await $i.esm('d3')
> ```
> 
> or specify a version:  
> 或指定版本：
> 
> ```js
> d3 = await $i.esm('d3@7')
> ```
> 
> The advantage of this approach is that no global variables are added to the window, which allows better control over the scope of side effects. For more details, see [https://esm.run](https://esm.run/).  
> 这种方法的优点是不会向窗口添加全局变量，从而可以更好地控制副作用的范围。有关更多详细信息，请参阅 https://esm.run。
