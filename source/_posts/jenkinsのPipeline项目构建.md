---
title: jenkinsのPipeline项目构建
date: 2020-07-31 21:35:01
tags: java
---

下载插件

![image-20200719151158815](/imgs/oss/picGo/20200719151158.png)

创建一个<code>pipeline</code>项目

![image-20200719175548958](/imgs/oss/picGo/20200719175556.png)

点击下面的流水线语法

![image-20200719181407608](/imgs/oss/picGo/20200719181407.png)

到流水线语法的片段生成器里选择<code>Check out from version control</code>

![image-20200719181733175](/imgs/oss/picGo/20200719181733.png)

填入仓库和凭证，生成脚本

![image-20200719181949111](/imgs/oss/picGo/20200719181949.png)



复制到<code>pipeline</code>脚本里去

然后选择<code>sh:Shell script</code>，生成脚本，复制

![image-20200719183109654](/imgs/oss/picGo/20200719183109.png)

然后再选择<code>deploy:Deploy war/ear to a container</code>

![image-20200719183350295](/imgs/oss/picGo/20200719183350.png)

然后填写参数，生成

![image-20200719183542898](/imgs/oss/picGo/20200719183543.png)

最后的样子就是这样

![image-20200719183627199](/imgs/oss/picGo/20200719183627.png)

完整脚本

```groovy
pipeline {
    agent any

    stages {
        stage('pull') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: '83039753-8e29-49c9-8e1a-f2c33c4cb847', url: 'git@121.89.163.191:root/rubenweicowbeer.git']]])
            }
        }
        stage('build') {
            steps {
                sh label: '', script: 'mvn clean package'
            }
        }
        stage('publish') {
            steps {
                deploy adapters: [tomcat8(credentialsId: '15efa4d4-9b32-4c8d-a0b6-2aa89b72191f', path: '', url: 'http://121.89.163.191:8080')], contextPath: null, war: 'target/*.war'
            }
        }
    }
}
```

然后就可以保存，构建了

如果我们想把<code>pipeline</code>脚本用文件的形式保存在项目目录

那么我们就可以创建一个<code>Jenkinsfile</code>并粘入我们的pipeline脚本

![image-20200719191333403](/imgs/oss/picGo/20200719191333.png)

<code>push</code>之后发现已经有了

![image-20200719191352948](/imgs/oss/picGo/20200719191353.png)

然后选择<code>Pipeline script from SCM</code>

![image-20200719191035863](/imgs/oss/picGo/20200719191035.png)

填写配置

![image-20200719191429618](/imgs/oss/picGo/20200719191429.png)

然后构建