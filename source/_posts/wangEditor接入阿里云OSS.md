---
title: wangEditor接入阿里云OSS
date: 2021-06-21 22:08:20
tags: 前端
---

> 我唯一知道的就是自己无知。——苏格拉底最有学问和最有见识的人总是很谨慎的——卢梭

我们昨天接入了[`wangEditor`富文本编辑器](https://VampireAchao.github.io/2021/06/20/%E9%9B%86%E6%88%90wangEditor/)

今天我们试着将[阿里云`OSS`](https://VampireAchao.github.io/2021/06/18/html-vue%E7%BB%84%E4%BB%B6%E5%AE%9E%E7%8E%B0%E9%98%BF%E9%87%8C%E4%BA%91OSS%E5%AF%B9%E6%8E%A5/)集成进`wangEditor`

首先我们先使用`vue`在页面渲染结束后调用初始化`wangEditor`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>OSS上传Demo</title>
    <link href="/css/elementUI.css" rel="stylesheet">
    <script src="/js/jquery-3.5.1.min.js"></script>
    <script src="/js/vue.min.js"></script>
    <script src="/js/elementUI.js"></script>
    <script src="/js/singleUpload.js"></script>
    <script src="/js/wangEditor.min.js"></script>
</head>
<body>
<div class="myApp" id="myapp">
    <div>
        <single-upload ref="singleUpload" v-model="imageUrl"></single-upload>
        文件url：{{imageUrl}}
    </div>
    <div>
        <div id="myEditor"></div>
        <el-button @click="showHtml" type="primary">预览</el-button>
        <div v-html="editorHtml"></div>
    </div>
</div>
<script>
    new Vue({
        el: '#myapp',
        data: {
            imageUrl: '',
            editor: null,
            editorHtml: ''
        },
        created() {
            this.$nextTick(() => {
                // 注意这玩意只能在页面加载完毕后调，如果在vue的created直接调用，会导致上方工具栏失效！！！
                // 这是vue写法
                this.initWangEditor()
            })
        },
        methods: {
            initWangEditor() {
                let E = window.wangEditor;
                this.editor = new E("#myEditor");
                this.editor.config.customUploadImg = wangEditorCustomUploadImg
                this.editor.config.zIndex = 1
                this.editor.create()
            },
            showHtml() {
                this.editorHtml = this.editor.txt.html()
            }
        }
    })
</script>
</body>
</html>
```

![image-20210621221353491](/imgs/oss/picGo/image-20210621221353491.png)

注意下面有一句

```html
                this.editor.config.customUploadImg = wangEditorCustomUploadImg
```

这里指向的方法，我们在`singleUpload.js`中定义了

```javascript
function policy() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/oss',
            type: 'GET',
            contentType: 'application/json; charset=UTF-8',
            success: function (res) {
                if (res.code == 20000) {
                    resolve(res)
                } else {
                    reject(res)
                }
            },
            error: function (res) {
                reject(res)
            }
        });
    });
}

function getUUID() { //生成UUID
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
    })
}

function wangEditorCustomUploadImg(resultFiles, insertImgFn) {
    // resultFiles 是 input 中选中的文件列表
    // insertImgFn 是获取图片 url 后，插入到编辑器的方法
    policy().then(response => {
        if (response.code != 20000) {
            console.error(response)
            return
        }
        console.log(response)
        let key = response.data.dir + getUUID() + "_${filename}";
        let url = response.data.host + "/" + key.replace("${filename}", resultFiles[0].name)
        let formData = new FormData();
        formData.append('key', key); //存储在oss的文件路径
        formData.append('ossaccessKeyId', response.data.accessid); //accessKeyId
        formData.append('policy', response.data.policy); //policy
        formData.append('signature', response.data.signature); //签名
        formData.append("dir", response.data.dir);
        formData.append("host", response.data.host);
        formData.append("file", resultFiles[0]);
        console.log(url)
        $.ajax({
            url: response.data.host,
            type: 'POST',
            contentType: false,
            processData: false,
            data: formData,
            success: function (res) {
                // 上传图片，返回结果，将图片插入到编辑器中
                insertImgFn(url)
            },
            error: function (res) {
                console.error(res)
            }
        })
    }).catch(err => {
        console.error(err)
    });
}

Vue.component('singleUpload', {
    props: ['value'],
    template: '  <div class="single-upload">' +
        '    <el-upload' +
        '        :before-upload="beforeUpload"' +
        '        :data="dataObj"' +
        '        :file-list="fileList"' +
        '        :multiple="false"' +
        '        :on-preview="handlePreview"' +
        '        :on-remove="handleRemove"' +
        '        :on-success="handleUploadSuccess"' +
        '        :show-file-list="showFileList"' +
        '        :action="dataObj.host"' +
        '        list-type="text"' +
        '        style="display: flex;"' +
        '    >' +
        '    <el-button size="small" type="primary">点击上传</el-button>' +
        '    </el-upload>' +
        '    <el-dialog :modal="false" :visible.sync="dialogVisible">' +
        '      <img width="100%;" v-if="isImg(fileList[0].url)" :src="fileList[0].url" alt="图片找不到了..."/>' +
        '      <video width="900px" controls autoplay muted v-if="isVideo(fileList[0].url)" :src="fileList[0].url" alt="视频找不到了..."/>' +
        '    </el-dialog>' +
        '  </div>',
    data() {
        return {
            dataObj: {
                policy: "",
                signature: "",
                key: "",
                ossaccessKeyId: "",
                dir: "",
                host: ""
                // callback:'',
            },
            dialogVisible: false
        };
    },
    computed: {
        imageUrl() {
            return this.value;
        },
        imageName() {
            if (this.value != null && this.value !== "") {
                return this.value.substr(this.value.lastIndexOf("/") + 1);
            } else {
                return null;
            }
        },
        fileList() {
            return [
                {
                    name: this.imageName,
                    url: this.imageUrl
                }
            ];
        },
        showFileList: {
            get: function () {
                return (
                    this.value !== null && this.value !== "" && this.value !== undefined
                );
            },
            set: function (newValue) {
            }
        }
    },
    methods: {
        isVideo() {
            let fileType = this.getFileType()
            return ~['.mp4', '.avi'].indexOf(fileType)
        },
        isImg() {
            let fileType = this.getFileType()
            return ~['.png', '.jpg', '.jpeg', '.gif'].indexOf(fileType)
        },
        getFileType() {
            let fileType = this.value.substring(this.value.lastIndexOf('.'))
            return fileType
        },
        getUUID() { //生成UUID
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
                return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
            })
        },
        emitInput(val) {
            this.$emit("input", val);
        },
        handleRemove(file, fileList) {
            this.emitInput("");
        },
        handlePreview(file) {
            this.dialogVisible = true;
        },
        beforeUpload(file) {
            let _self = this;
            return new Promise((resolve, reject) => {
                policy()
                    .then(response => {
                        console.log(response)
                        _self.dataObj.policy = response.data.policy;
                        _self.dataObj.signature = response.data.signature;
                        _self.dataObj.ossaccessKeyId = response.data.accessid;
                        _self.dataObj.key = response.data.dir + this.getUUID() + "_${filename}";
                        _self.dataObj.dir = response.data.dir;
                        _self.dataObj.host = response.data.host;
                        resolve(true);
                    })
                    .catch(err => {
                        reject(false);
                    });
            });
        },
        handleUploadSuccess(res, file) {
            console.log("上传成功...");
            this.showFileList = true;
            this.fileList.pop();
            this.fileList.push({
                name: file.name,
                url:
                    this.dataObj.host +
                    "/" +
                    this.dataObj.key.replace("${filename}", file.name)
            });
            this.emitInput(this.fileList[0].url);
            console.log(this.fileList[0]);
        }
    }
})
```

然后即可实现功能，我们测试一下

![image-20210621221745164](/imgs/oss/picGo/image-20210621221745164.png)

项目源码：

https://gitee.com/VampireAchao/simple-oss.git
