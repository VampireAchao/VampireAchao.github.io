---
title: uniCloud查询数据库
date: 2021-10-06 19:28:07
tags: 前端
---

> 江流宛转绕芳甸，月照花林皆似霰。——张若虚

首先先右键项目中的`database`目录，没有的话自己手动创建一个，选择新建`DB Schema`

![image-20211005195538604](/imgs/oss/picGo/image-20211005195538604.png)

输入表名，点击创建

![image-20211005195701070](/imgs/oss/picGo/image-20211005195701070.png)

将`read`改为`true`

![image-20211005195734860](/imgs/oss/picGo/image-20211005195734860.png)

点击上传`DB Schema`

![image-20211005195846958](/imgs/oss/picGo/image-20211005195846958.png)

点击是

![image-20211005195916185](/imgs/oss/picGo/image-20211005195916185.png)

![image-20211005195928505](/imgs/oss/picGo/image-20211005195928505.png)

我们刷新云控制台可以看到成功上传

![image-20211005200006372](/imgs/oss/picGo/image-20211005200006372.png)

我们添加两条记录

![image-20211005194259977](/imgs/oss/picGo/image-20211005194259977.png)

```json
{
    "name": "ruben",
    "phone": "13888888888"
}
```

点击确定

![image-20211005194442966](/imgs/oss/picGo/image-20211005194442966.png)

![image-20211005194603640](/imgs/oss/picGo/image-20211005194603640.png)

新建一个`list`页面

![image-20211005194642706](/imgs/oss/picGo/image-20211005194642706.png)

写入代码：

```vue
<template>
	<view>
		<unicloud-db v-slot:default="{ data, loading, error, options }" collection="contacts">
			<view v-if="error">{{ error.message }}</view>
			<view v-else>{{ data }}</view>
		</unicloud-db>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style></style>
```

运行后发现我们已经成功查询出来了数据库中的数据

![image-20211005200158220](/imgs/oss/picGo/image-20211005200158220.png)

我们将`json`改为列表渲染

引入`uni-ui`

https://ext.dcloud.net.cn/plugin?id=55

![image-20211005200915014](/imgs/oss/picGo/image-20211005200915014.png)

![image-20211005200926542](/imgs/oss/picGo/image-20211005200926542.png)

编写代码：

```vue
<template>
	<view>
		<unicloud-db v-slot:default="{ data, loading, error, options }" collection="contacts">
			<view v-if="error">{{ error.message }}</view>
			<view v-else>
				<uni-list>
					<uni-list-item v-for="(item, index) in data" :key="item._id" :title="item.name" :note="item.phone" link></uni-list-item>
				</uni-list>
			</view>
		</unicloud-db>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style></style>
```

最终效果：

![image-20211005201004114](/imgs/oss/picGo/image-20211005201004114.png)

