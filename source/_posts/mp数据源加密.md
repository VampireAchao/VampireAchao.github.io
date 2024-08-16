---
title: mp数据源加密
date: 2021-04-08 21:44:32
tags: java
---

> 不宝金玉，而忠信以为宝。——《礼记》

在开发中，我们难免可能会担心数据库账号密码泄露

我们可以使用`mybatis-plus`自带的数据安全保护进行加密

```java
    public static void main(String[] args) throws Throwable {
        // 生成 16 位随机 AES 密钥
        String randomKey = AES.generateRandomKey();
        // 随机密钥加密
        String url = AES.encrypt("jdbc:mysql://localhost:3306/ruben?autoReconnect=true&zeroDateTimeBehavior=CONVERT_TO_NULL&useUnicode=true&characterEncoding=utf-8&useSSL=false&nullCatalogMeansCurrent=true&serverTimezone=Asia/Shanghai&allowMultiQueries=true", randomKey);
        String username = AES.encrypt("root", randomKey);
        String password = AES.encrypt("789456", randomKey);
        System.out.println("randomKey：[" + randomKey + " ]");
        System.out.println("url：[ mpw:" + url + " ]");
        System.out.println("username：[ mpw:" + username + " ]");
        System.out.println("password：[ mpw:" + password + " ]");
    }
```

我们执行后

![image-20210412214631874](/imgs/oss/picGo/image-20210412214631874.png)

可以看到加密后的`url`、账号和密码，以及一个`randomKey`这个随机秘钥

我们把他们代替掉我们本地`yml`配置中的明文密码

```secret
randomKey：[ 2714d208797f4a0c ]
url：[ mpw:5GiethoxEEWPFCVioU2KC8YpgkWJKV73Onbro3IXzMLoO73twkBNSV0fmvCSUof2Ow2LVcRT+kdi29edE7pIq7L6s2+JG3Pcq8OVV5yHxobEGfm6+xUS08Csfw8wvHUW8xZOXtE4+NN5cUbkuH1eb/yJ5y6KHuRbQRZW2bCIWmwK9efBCfnEwE+sDQ3RO/RqONhVGMFfSEBc91byT0DKrTlh5nJ1mMCNa9BdLv4/8fYqssf4I85nJL8pT8i0zwWxhsl52UXjBKf8qpyIaPXUqVYbgi41R57UxW1lxU6jp9Y= ]
username：[ mpw:qRnWebgBej6drI+lt1xxJg== ]
password：[ mpw:/T/MRWnf2hPPqDFOtu+gJg== ]
```

然后在`idea`启动配置中指定`--mpw.key=8dc26122450e098c`

![image-20210412215023431](/imgs/oss/picGo/image-20210412215023431.png)

启动程序，发现我们项目启动成功

如果是部署到服务器，则指定成环境变量即可