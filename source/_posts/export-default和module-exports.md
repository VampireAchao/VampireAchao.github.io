---
title: export default和module.exports
date: 2021-11-23 20:19:09
tags: 前端
---

> 我期望理解，但是也慢慢地感受到了一种责任，给予比接受伟大，去爱比被爱伟大。 ——海明威

我们在`vue`项目中创建两个`js`

![image-20211123202050195](/imgs/oss/picGo/image-20211123202050195.png)

在`util.js`中写入

```javascript
export default {
	ruben: 'ruben'
}
```

在`api.js`中写入

```javascript
module.exports = {
	vampire: 'vampire'
}
```

我们再来一个页面中使用两种方式引用

```vue
<script>
import util from '@/common/util.js';
import api from '@/common/api.js'
const util1 = require('@/common/util.js')
const api1 = require('@/common/api.js')
export default{
    created(){
        console.log("util.ruben: ",util.ruben);
		console.log("api.vampire: ",api.vampire);
		
		console.log("util1.ruben: ",util1.ruben);
		console.log("api1.vampire: ",api1.vampire);
    }
}
</script>
```

输出结果为：

![image-20211123202538787](/imgs/oss/picGo/image-20211123202538787.png)

我们可以看到使用`require`引入`util.js`中写的`export default`失败了

因为`require`是[`CommonJS`](http://javascript.ruanyifeng.com/nodejs/module.html)中的语法，`Node` 应用由模块组成，采用 `CommonJS` 模块规范

而`CommonJS`暴露模块采用的语法是`module.exports`

但是`export default`则是[`ES6`](https://es6.ruanyifeng.com/#docs/module#export-default-%E5%91%BD%E4%BB%A4)中的新语法，它的效率要比`CommonJS`高，配套的是`import`

并且`import`是编译时执行，所以无法做到像`require`一样动态加载

