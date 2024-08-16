---
title: uniapp对接oss视频上传+压缩
date: 2022-01-11 19:19:58
tags: 前端
---

> 与其在绝望和挣扎中苟活，不如在希冀和盼望中死亡。——纪伯伦

首先是文件上传的代码：

```javascript
module.exports = {
	getUUID() { //生成UUID
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
			return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
		})
	},
	beforeUpload({
		file,
		module
	}) {
		let _self = this;
		return new Promise((resolve, reject) => {
			this.policy(module)
				.then(response => {
					resolve({
						policy: response.data.policy,
						signature: response.data.signature,
						ossaccessKeyId: response.data.accessid,
						key: response.data.dir + this.getUUID() + "${filename}",
						dir: response.data.dir,
						host: response.data.host
					});
				})
				.catch(err => {
					reject(err);
				});
		});
	},
	policy(module) {
		return new Promise((resolve, reject) => {
			uni.request({
                // 在这改获取oss签证的接口
				url: 'http://获取签证的接口/' + 'oss',
				data: {
					module
				},
				success: (res) => {
					if (res.data.success) {
						resolve(res.data)
					} else {
						reject(res)
					}
				},
				fail: (err) => {
					reject(err)
				}
			});
		})
	},
	uploadFile({
		file,
		module,
		response,
		limit = 5242880
	}) {
		console.log("uploadFile: ", {
			file,
			module,
			response
		})
		// 限制5M,单位B
		if (!file) {
			uni.showToast({
				title: "读取文件失败",
				icon: 'none'
			});
			return false;
		}
		if (file.size > limit) {
			uni.showToast({
				title: "超过限制大小",
				icon: 'none'
			});
			return false;
		}
		let filename = file.path.substr(file.path.lastIndexOf("/") + 1)
		this.beforeUpload({
			file,
			module
		}).then(res => {
			let options = {
				url: res.host,
				name: 'file',
				filePath: file.path,
				formData: res,
				success: ossCallBack => {
					console.log({
						ossCallBack,
						filename
					})
					response(res.host + "/" + res.key.replace("${filename}", filename))
				},
				fail: console.error
			}
			console.log(options)
			uni.uploadFile(options)
		}).catch(console.error)
	}
}
```

然后是视频上传+压缩

```vue
<script>
const oss = require('@/utils/oss.js');
export default {
    methods: {
		upload(file, { contentType }) {
			console.log({ file });
			console.log({ contentType });
			let messageType = '';
			let content = file.path;
			let limit;
			switch (contentType) {
				case 1:
					messageType = 'IMAGE';
					limit = 2097152;
					break;
				case 4:
					messageType = 'VIDEO';
					limit = 10485760;
					break;
			}
			oss.uploadFile({
				file,
				module: 'chat',
				limit,
				response: filePath => {
					console.log('File upload success!');
					console.log({ filePath });
                    // 上传完成结束回调
				}
			});
		},

		onImage() {
			uni.chooseImage({
				sourceType: ['album'],
				success: res => {
					res.tempFiles.forEach(file => {
						this.upload(file, {
							contentType: 1
						});
					});
				}
			});
		},

		onVideo() {
			uni.chooseVideo({
				count: 1,
				compressed: true,
				sourceType: ['album', 'camera'],
				success: res => {
					console.log({ res });
                    // 这块是自定义压缩，需要在上方compressed设置为false关闭默认上传压缩
					// console.log('压缩前大小：: ', res.size / (1024 * 1024) + 'KB');
					// uni.getVideoInfo({
					// 	src: res.tempFilePath,
					// 	success: ({ fps, bitrate }) => {
					// 		console.log({ fps, bitrate });
					// 		uni.compressVideo({
					// 			src: res.tempFilePath,
					// 			quality: 'high',
					// 			bitrate,
					// 			fps,
					// 			resolution: 1,
					// 			success: res => {
					// 				console.log({ res });
					// 				console.log('压缩后大小：: ', res.size / (1024 * 1024) + 'KB');
					// 				this.upload({ path: res.tempFilePath, size: res.size }, { contentType: 4 });
					// 			}
					// 		});
					// 	}
					// });
					console.log('视频大小：: ', res.size / (1024 * 1024) + 'KB');
					this.upload({ path: res.tempFilePath, size: res.size }, { contentType: 4 });
				}
			});
		},

		onShoot() {
			uni.chooseImage({
				sourceType: ['camera'],
				success: res => {
					this.upload(res.tempFiles[0], {
						contentType: 1
					});
				}
			});
		}
	}
};
</script>
```

