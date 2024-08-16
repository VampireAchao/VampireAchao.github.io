---
title: vue封装axios请求工具类
date: 2020-11-20 00:16:30
tags: 前端
---

> 以勇气面对人生的巨大悲恸，用耐心对待生活的小小哀伤。——雨果

首先安装

```shell
# axios
cnpm i --save axios
# 格式化参数插件
cnpm i -- save qs
# 对象合并插件
cnpm i -- save lodash
# cookie操作
cnpm i -- save vue-cookie
```

![image-20201119213500774](/imgs/oss/picGo/image-20201119213500774.png)

![image-20201119213428734](/imgs/oss/picGo/image-20201119213428734.png)

然后我们自己封装一个请求组件

首先创建文件



![image-20201119213617959](/imgs/oss/picGo/image-20201119213617959.png)

然后放入我们的代码。。。

```javascript
import axios from 'axios'
import qs from 'qs'
import merge from 'lodash/merge'
import {Loading, Message} from 'element-ui'
import VueCookie from 'vue-cookie';

// 如果是生产环境 使用.env.production配置文件中的VUE_APP_SERVER_URL作为请求前缀
// 如果是开发环境 使用.env.development配置文件中的VUE_APP_BASE_API作为前缀代理拦截
const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_SERVER_URL : process.env.VUE_APP_BASE_API
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true
// 创建axios请求
const http = axios.create({
    // 设置超时时间
    timeout: 1000 * 30,
    // 跨域情况下带上cookie
    withCredentials: true,
    // 设置默认请求头，之后可以随便改
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    },
    // 配置是否使用默认api
    notUseDefaultApi: false
})

/**
 * 请求拦截，所有的请求通过此处
 */
let loading
http.interceptors.request.use(config => {
    // elementUI的loading组件
    let showLoading = false
    // 如果传入loading为true，把showLoading置为true
    if (config.loading === true) {
        showLoading = true
    }
    if (showLoading) {
        loading = Loading.service({
            // 显示在加载图标下方的加载文案
            text: config.loadingText || 'ruben正在全力为您加载中...',
            // 自定义加载图标类名
            spinner: 'el-icon-loading',
            // 遮罩背景色
            background: 'rgba(0, 0, 0, 0.7)'
        })
    }
    // 请求头带上token
    config.headers.token = VueCookie.get('token')
    // 判断是否使用全局地址，假设我们要请求其余域名，这里可以配置为true
    if (!config.notUseDefaultApi) {
        config.url = BASE_URL + config.url;
    }
    // 获取请求方式
    const method = config.method
    // 定义参数变量
    const params = {}
    // 对参数进行格式化，qs官网【https://www.npmjs.com/package/qs】
    // 从请求头获取数组格式化类型
    // 默认indices【ids[0]=1&ids[1]=2&ids[3]=3】
    // 可选 brackets【uds[]=1&ids[]=2&ids[]=3】
    // 以及 repeat【ids=1&ids=2&id=3】
    const arrayFormat = config.headers.arrayFormat || 'indices'
    if (method === 'post' && config.headers['Content-Type'] === 'application/x-www-form-urlencoded; charset=utf-8') {
        // post请求参数处理
        config.data = qs.stringify(config.data, {
            // allowDots为true时 data= 'a.b=c'  qs转换出来就是 a:{b:c}，可以进行深层次转换
            allowDots: true,
            arrayFormat: arrayFormat
        })
    } else if (method === 'get') {
        // get请求参数处理
        config.params = qs.stringify(config.params, {
            allowDots: true,
            arrayFormat: arrayFormat
        })
        config.params = qs.parse(config.params)
        config.params = merge(params, config.params)
    }
    console.log(config)
    return config
}, error => {
    return Promise.reject(error)
})

// elementUI错误弹框设置
let errorMessageAlertOption = {
    // 消息文字
    message: '请求错误',
    // 主题 success/warning/info/error 【default info】
    type: 'error',
    // 是否显示关闭按钮
    showClose: true,
    // 是否将 message 属性作为 HTML 片段处理
    dangerouslyUseHTMLString: true,
    // 显示时间, 毫秒。设为 0 则不会自动关闭
    duration: 3000,
    // 自定义图标的类名，会覆盖 type
    customClass: 'el-icon-lightning'
}

/**
 * 响应拦截，所有的相应通过此处
 */
http.interceptors.response.use(response => {
    // 如果此时还处于加载中
    if (loading) {
        // 停止加载
        loading.close();
    }
    if (response.data && response.data.success === false) {
        // 如果请求返回错误
        // 这里我们把错误通过elementUI的message组件弹框出来，不过我们需要设置一下消息
        errorMessageAlertOption.message = response.data.msg
        // 执行弹框
        Message(errorMessageAlertOption);
    }
    return response
}, error => {
    // 如果此时还处于加载中
    if (loading) {
        // 停止加载
        loading.close();
    }
    console.log(error)
    // 梅开二度，弹框
    // errorMessageAlertOption.message = error.response.data.msg || error.response.data.exception || error.response.data || error.response || error
    // errorMessageAlertOption.duration = 4000;
    Message(errorMessageAlertOption)
    return Promise.reject(error)
})

export default http
```

![image-20201120000745942](/imgs/oss/picGo/image-20201120000745942.png)

然后在`main.js`引用

```javascript
import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import httpRequest from '@/utils/httpRequest'
import VueCookie from 'vue-cookie';


Vue.use(ElementUI, httpRequest, VueCookie);
Vue.config.productionTip = false
// 挂载全局
Vue.prototype.$http = httpRequest
Vue.prototype.$cookie = VueCookie
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
```

这里加了两个配置文件，别忘了

![image-20201120000935069](/imgs/oss/picGo/image-20201120000935069.png)

```development
# 开发环境配置
ENV = 'development'

# 代理前缀
VUE_APP_BASE_API = '/ruben'

# URL
VUE_APP_SERVER_URL = 'http://localhost:8080'
```

以及

```production
# 生产环境配置
ENV = 'production'

VUE_APP_SERVER_URL = 'localhost:8080'
```

还有在vue的`vue.config.js`配置文件中配置

```javascript
module.exports = {
    devServer: {
        // 配置端口
        port: 3000,
        // 不检查host
        disableHostCheck: true,
        // 配置代理
        proxy: {
            '/ruben': {
                // 配置URL
                target: process.env.VUE_APP_SERVER_URL,
                // 是否允许跨域
                changeOrigin: true,
                // 请求重写，这里是把ruben替换成空串
                pathRewrite: {
                    '^/ruben': ''
                }
            }
        }
    }

}
```

![image-20201120001820404](/imgs/oss/picGo/image-20201120001820404.png)

最后是使用

```vue
this.$http({
        url: `/user/login`,
        method: 'post',
        data: this.inputForm
      }).then(({data}) => {
        if (data && data.success) {
          this.$message.success(data.msg)
          console.log(data)
        }
      });
```

![image-20201120001053533](/imgs/oss/picGo/image-20201120001053533.png)

完整代码放到了[`gitee`仓库](https://gitee.com/VampireAchao/my-vue-app.git)

![image-20201120001508604](/imgs/oss/picGo/image-20201120001508604.png)

我会继续完善下去的~

