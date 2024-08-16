---
title: 阿里云oss-cloud-sdk-springboot3兼容问题
date: 2024-02-03 20:09:32
tags: java
---

> 辛勤的蜂蜜永远没有时间悲哀。——布莱克

前两天提到了：

[minio临时凭证直传切换到阿里云oss | 阿超](https://VampireAchao.github.io/2024/02/01/minio%E4%B8%B4%E6%97%B6%E5%87%AD%E8%AF%81%E7%9B%B4%E4%BC%A0%E5%88%87%E6%8D%A2%E5%88%B0%E9%98%BF%E9%87%8C%E4%BA%91oss/)

但是忘记说依赖和配置了，因为我本地是`jdk17+springboot3`，所以需要修改，首先是依赖：

```xml
<!-- https://mvnrepository.com/artifact/com.aliyun.oss/aliyun-sdk-oss -->
        <dependency>
            <groupId>com.aliyun.oss</groupId>
            <artifactId>aliyun-sdk-oss</artifactId>
            <version>3.17.4</version>
        </dependency>
```

按照我原来的博客里肯定是不行的

[阿里云OSS临时凭证前后端配合上传文件 | 阿超](https://VampireAchao.github.io/2020/06/04/%E9%98%BF%E9%87%8C%E4%BA%91OSS%E4%B8%B4%E6%97%B6%E5%87%AD%E8%AF%81%E5%89%8D%E5%90%8E%E7%AB%AF%E9%85%8D%E5%90%88%E4%B8%8A%E4%BC%A0%E6%96%87%E4%BB%B6/)

不能使用原来的

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alicloud-oss</artifactId>
    <version>2.2.0.RELEASE</version>
</dependency>
```

因为不兼容了

这里我们配置的格式就不改，还是

```yaml
spring:
  cloud:
    alicloud:
      access-key: ACCESSKEY
      secret-key: SECRETKEY
      oss:
        endpoint: oss-cn-chengdu.aliyuncs.com
        bucket: waibi
```

然后我们自己复制配置文件类：

枚举

```java
/*
 * Copyright (C) 2018 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



/**
 * 阿里云授权模式
 *
 * @author xiaolongzuo
 */
public enum AliCloudAuthorizationMode {

    /**
     * AK/SK授权
     */
    AK_SK,
    /**
     * STS授权
     */
    STS

}

```

配置文件类

```java
/*
 * Copyright 2013-2018 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * @author xiaolongzuo
 */
@ConfigurationProperties("spring.cloud.alicloud")
public class AliCloudProperties {

    /**
     * alibaba cloud access key.
     */
    private String accessKey;

    /**
     * alibaba cloud secret key.
     */
    private String secretKey;

    public String getAccessKey() {
        return accessKey;
    }

    public void setAccessKey(String accessKey) {
        this.accessKey = accessKey;
    }

    public String getSecretKey() {
        return secretKey;
    }

    public void setSecretKey(String secretKey) {
        this.secretKey = secretKey;
    }

}

```

以及：

```java
/*
 * Copyright 2013-2018 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



import com.aliyun.oss.ClientBuilderConfiguration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * {@link ConfigurationProperties} for configuring OSS.
 *
 * @author <a href="mailto:fangjian0423@gmail.com">Jim</a>
 * @author xiaolongzuo
 */
@ConfigurationProperties("spring.cloud.alicloud.oss")
public class OssProperties {

    /**
     * Authorization Mode, please see <a href=
     * "https://help.aliyun.com/document_detail/32010.html?spm=a2c4g.11186623.6.659.29f145dc3KOwTh">oss
     * docs</a>.
     */
    @Value("${spring.cloud.alicloud.oss.authorization-mode:AK_SK}")
    private AliCloudAuthorizationMode authorizationMode;

    /**
     * Endpoint, please see <a href=
     * "https://help.aliyun.com/document_detail/32010.html?spm=a2c4g.11186623.6.659.29f145dc3KOwTh">oss
     * docs</a>.
     */
    private String endpoint;

    /**
     * Sts token, please see <a href=
     * "https://help.aliyun.com/document_detail/32010.html?spm=a2c4g.11186623.6.659.29f145dc3KOwTh">oss
     * docs</a>.
     */
    private StsToken sts;

    /**
     * Client Configuration, please see <a href=
     * "https://help.aliyun.com/document_detail/32010.html?spm=a2c4g.11186623.6.659.29f145dc3KOwTh">oss
     * docs</a>.
     */
    private ClientBuilderConfiguration config;

    public AliCloudAuthorizationMode getAuthorizationMode() {
        return authorizationMode;
    }

    public void setAuthorizationMode(AliCloudAuthorizationMode authorizationMode) {
        this.authorizationMode = authorizationMode;
    }

    public ClientBuilderConfiguration getConfig() {
        return config;
    }

    public void setConfig(ClientBuilderConfiguration config) {
        this.config = config;
    }

    public String getEndpoint() {
        return endpoint;
    }

    public void setEndpoint(String endpoint) {
        this.endpoint = endpoint;
    }

    public StsToken getSts() {
        return sts;
    }

    public void setSts(StsToken sts) {
        this.sts = sts;
    }

    public static class StsToken {

        private String accessKey;

        private String secretKey;

        private String securityToken;

        public String getAccessKey() {
            return accessKey;
        }

        public void setAccessKey(String accessKey) {
            this.accessKey = accessKey;
        }

        public String getSecretKey() {
            return secretKey;
        }

        public void setSecretKey(String secretKey) {
            this.secretKey = secretKey;
        }

        public String getSecurityToken() {
            return securityToken;
        }

        public void setSecurityToken(String securityToken) {
            this.securityToken = securityToken;
        }

    }

}

```

然后是配置类：

```java


import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;

/**
 * AliCloudConfig
 *
 * @author achao@apache.org
 */
@Configuration
@EnableConfigurationProperties({AliCloudProperties.class, OssProperties.class})
public class AliCloudConfig {

    @Bean
    public OSS ossClient(AliCloudProperties aliCloudProperties,
                         OssProperties ossProperties) {
        if (ossProperties.getAuthorizationMode() == AliCloudAuthorizationMode.AK_SK) {
            Assert.isTrue(!StringUtils.isEmpty(ossProperties.getEndpoint()),
                    "Oss endpoint can't be empty.");
            Assert.isTrue(!StringUtils.isEmpty(aliCloudProperties.getAccessKey()),
                    "${spring.cloud.alicloud.access-key} can't be empty.");
            Assert.isTrue(!StringUtils.isEmpty(aliCloudProperties.getSecretKey()),
                    "${spring.cloud.alicloud.secret-key} can't be empty.");
            return new OSSClientBuilder().build(ossProperties.getEndpoint(),
                    aliCloudProperties.getAccessKey(), aliCloudProperties.getSecretKey(),
                    ossProperties.getConfig());
        } else if (ossProperties.getAuthorizationMode() == AliCloudAuthorizationMode.STS) {
            Assert.isTrue(!StringUtils.isEmpty(ossProperties.getEndpoint()),
                    "Oss endpoint can't be empty.");
            Assert.isTrue(!StringUtils.isEmpty(ossProperties.getSts().getAccessKey()),
                    "Access key can't be empty.");
            Assert.isTrue(!StringUtils.isEmpty(ossProperties.getSts().getSecretKey()),
                    "Secret key can't be empty.");
            Assert.isTrue(!StringUtils.isEmpty(ossProperties.getSts().getSecurityToken()),
                    "Security Token can't be empty.");
            return new OSSClientBuilder().build(ossProperties.getEndpoint(),
                    ossProperties.getSts().getAccessKey(),
                    ossProperties.getSts().getSecretKey(),
                    ossProperties.getSts().getSecurityToken(), ossProperties.getConfig());
        } else {
            throw new IllegalArgumentException("Unknown auth mode.");
        }
    }
}

```

即可使用
