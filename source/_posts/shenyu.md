---
title: shenyu
date: 2023-04-29 09:28:06
tags: java
---

> 小心谨慎，不但可以防备别人侵犯自己，也可自防人性的放纵和腐败。——巴克

分享一个开源项目`shenyu`

官方文档：https://shenyu.apache.org/zh/

github：https://github.com/apache/shenyu

![image-20230429094215407](/imgs/oss/blog/vampireachao/image-20230429094215407.png)

可以启动`shenyu-admin`下的`ShenyuAdminBootstrap`体验一下

![image-20230429095155466](/imgs/oss/blog/vampireachao/image-20230429095155466.png)

访问：`http://localhost:9095`

用户名`admin`密码`123456`

![image-20230429095305865](/imgs/oss/blog/vampireachao/image-20230429095305865.png)

然后我们按照[文档](https://shenyu.apache.org/zh/docs/index#%E8%BF%90%E8%A1%8C-apache-shenyu-bootstrap)上写的修改`shenyu-bootstrap`中的`shenyu.local.enabled`

然后运行`shenyu-bootstrap`下的`ShenyuBootstrapApplication`

这里报错的话点一下左边的提示即可

![image-20230429100056195](/imgs/oss/blog/vampireachao/image-20230429100056195.png)

或者这里配置

![image-20230429100149214](/imgs/oss/blog/vampireachao/image-20230429100149214.png)

启动成功后我们再启动一个我们自己的`boot`项目

![image-20230429102228810](/imgs/oss/blog/vampireachao/image-20230429102228810.png)

此处访问`http://127.0.0.1:8080/helloworld`即可返回

```js
{
  "name" : "Shenyu",
  "data" : "hello world"
}
```

![image-20230429102320846](/imgs/oss/blog/vampireachao/image-20230429102320846.png)

我们使用`curl`请求一下`9195`的`bootstrap`

```shell
curl --location --request POST 'http://localhost:9195/shenyu/plugin/selectorAndRules' \
--header 'Content-Type: application/json' \
--header 'localKey: 123456' \
--data-raw '{
    "pluginName": "divide",
    "selectorHandler": "[{\"upstreamUrl\":\"127.0.0.1:8080\"}]",
    "conditionDataList": [{
        "paramType": "uri",
        "operator": "match",
        "paramValue": "/**"
    }],
    "ruleDataList": [{
        "ruleHandler": "{\"loadBalance\":\"random\"}",
        "conditionDataList": [{
            "paramType": "uri",
            "operator": "match",
            "paramValue": "/**"
        }]
    }]
}'
```

![image-20230429102416951](/imgs/oss/blog/vampireachao/image-20230429102416951.png)

然后尝试访问`http://localhost:9195/helloworld`即可被代理到`http://127.0.0.1:8080/helloworld`

![image-20230429102526195](/imgs/oss/blog/vampireachao/image-20230429102526195.png)