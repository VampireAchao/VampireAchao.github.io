---
title: openssl生成密钥
date: 2023-12-02 17:42:42
tags: 软件及插件
---

> 君子不蔽人之美，不言人之恶。——韩非

分享`openssl`生成指定长度的密钥：

```bash
openssl rand -hex 16
```

然后还有`RSA`的

```bash
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
```

甚至`ECDSA`的

```bash
openssl ecparam -name prime256v1 -genkey -noout -out ec_private_key.pem
```

还可以生成密钥对

```bash
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
openssl rsa -pubout -in private_key.pem -out public_key.pem
```

非常方便易用
