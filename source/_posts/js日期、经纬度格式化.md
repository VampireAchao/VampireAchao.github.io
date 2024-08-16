---
title: js日期、经纬度格式化
date: 2021-04-15 22:28:22
tags: 前端
---

> 如果你不出去走走，你就会以为这就是全世界。——《天堂电影院》

> 如果你不出去走走，你就会以为这就是全世界。——《天堂电影院》

之前写过一篇[`js`时间戳格式化](https://VampireAchao.github.io/2020/07/03/js%E6%97%B6%E9%97%B4%E8%BD%AC%E6%8D%A2/)以及一篇[`js`中`Date`函数的`api`](https://VampireAchao.github.io/2021/01/10/jsDate%E5%AF%B9%E8%B1%A1%E5%9F%BA%E6%9C%AC%E6%93%8D%E4%BD%9C/)

今天写篇“人性化”的格式化的

```javascript
			// 格式化 传入毫秒值，计时秒表用
			function formatTime(time) {
				if (typeof time !== 'number' || time < 0) {
					return time
				}

				var hour = parseInt(time / 3600)
				time = time % 3600
				var minute = parseInt(time / 60)
				time = time % 60
				var second = time

				return ([hour, minute, second]).map(function(n) {
					n = n.toString()
					return n[1] ? n : '0' + n
				}).join(':')
			}
			// 经纬度格式化
			function formatLocation(longitude, latitude) {
				if (typeof longitude === 'string' && typeof latitude === 'string') {
					longitude = parseFloat(longitude)
					latitude = parseFloat(latitude)
				}

				longitude = longitude.toFixed(2)
				latitude = latitude.toFixed(2)

				return {
					longitude: longitude.toString().split('.'),
					latitude: latitude.toString().split('.')
				}
			}


			// 日期工具
			var dateUtils = {
				UNITS: {
					'年': 31557600000,
					'月': 2629800000,
					'天': 86400000,
					'小时': 3600000,
					'分钟': 60000,
					'秒': 1000
				},
				// 人性化
				humanize: function(milliseconds) {
					var humanize = '';
					for (var key in this.UNITS) {
						if (milliseconds >= this.UNITS[key]) {
							humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
							break;
						}
					}
					return humanize || '刚刚';
				},
				// 一天内人性化 一天后格式化
				formatHumanize: function(dateStr) {
					var date = this.parse(dateStr)
					var diff = Date.now() - date.getTime();
					if (diff < this.UNITS['天']) {
						return this.humanize(diff);
					}
					return this.format(date)
				},
				// 将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
				parse: function(str) {
					var a = str.split(/[^0-9]/);
					return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
				},
				// 将Date对象格式化为"yyyy-mm-dd HH:MM:ss"格式
				format: function(date) {
					var _format = function(number) {
						return (number < 10 ? ('0' + number) : number);
					};
					return date.getFullYear() + '-' + _format(date.getMonth() + 1) + '-' + _format(date.getDate()) +
						' ' +
						_format(date.getHours()) + ':' + _format(date.getMinutes() + ':' + _format(date.getSeconds()));
				}
			};
			
			console.log("秒表：" + formatTime(100))
			var locationData = formatLocation(116.397128, 39.916527)
			console.log("经度：" + locationData.longitude)
			console.log("纬度：" + locationData.latitude)
			console.log("人性化：" + dateUtils.humanize(Date.now() - 1516026842000))
			console.log("一天内人性化，一天前格式化：" + dateUtils.formatHumanize("2021-04-14 22:30:22"))
			console.log("一天内人性化，一天前格式化：" + dateUtils.formatHumanize("2021-04-15 22:00:22"))
			console.log("转换为Date对象：" + dateUtils.parse("2021-04-15 22:15:22"))
			console.log("格式化：" + dateUtils.format(new Date(1623766982000)))
```

打印结果

![image-20210415224346627](/imgs/oss/picGo/image-20210415224346627.png)
