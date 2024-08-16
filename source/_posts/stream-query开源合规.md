---
title: stream-query开源合规
date: 2024-03-27 20:05:45
tags: java
---

> 不好的书也像不好的朋友一样，可能把你戕害。——菲尔丁

首先是检查`header`的`github action`的`ci`

```yml
# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

name: License Check

on:
  push:
    branches:
      - main
    paths-ignore:
      - '**.md'
  pull_request:
    branches:
      - main
    paths-ignore:
      - '**.md'

jobs:
  license-header:
    if: github.repository == 'dromara/stream-query'
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true
      - name: Check license header
        uses: apache/skywalking-eyes/header@main

```

放在`.github/workflows/license-check.yml`

然后是`license`的

`.licenserc.yaml`

```yaml
#
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

header:
  license:
    spdx-id: Apache-2.0
    copyright-owner: Apache Software Foundation

  paths-ignore:
    - 'dist'
    - 'licenses'
    - '**/*.md'
    - 'LICENSE'
    - 'NOTICE'
    - '**/*.json'
    - '**/*.iml'
    - '**/*.ini'
    - '**/*.svg'
    - '.gitattributes'
    - '**/.gitignore'
    - '**/.gitkeep'
    - 'docs/**'
    - 'mvnw.cmd'
    - '.mvn'
    - '**/known-dependencies.txt'
    - '**/LICENSE'
    - '**/NOTICE'
    - "DISCLAIMER"
    - '**/*.MD'
    - '**/*.ftl'
    - '**/*.tpl'
    - '**/*.pl'
    - '**/*.dict'
    - '**/*.awk'
    - '**/*.php'
    - "**/*.lock"
    - "**/*.svg"
    - '.prettierrc'
    - '.browserslistrc'
    - '.editorconfig'
    - '.helmignore'
    - '**/target/**'
    - '**/*.ini'
    - '**/*.crt'
    - '**/*.pem'
    - 'ssh_config'
    - 'workers'

  comment: on-failure

dependency:
  files:
    - pom.xml
  licenses:
    - name: ch.qos.logback:logback-classic
      license: EPL-1.0, LGPL-2.1
      url: http://logback.qos.ch/logback-classic
    - name: ch.qos.logback:logback-core
      license: EPL-1.0, LGPL-2.1
      url: http://logback.qos.ch/logback-core
    - name: com.alibaba:druid
      license: Apache-2.0
      url: https://github.com/alibaba/druid
    - name: com.alibaba:transmittable-thread-local
      license: Apache-2.0
      url: https://github.com/alibaba/transmittable-thread-local
    - name: com.atomikos:atomikos-util
      license: Atomikos
      url: http://www.atomikos.com/ate/atomikos-util/
    - name: com.atomikos:transactions
      license: Atomikos
      url: http://www.atomikos.com/ate/transactions/
    - name: com.atomikos:transactions-api
      license: Atomikos
      url: http://www.atomikos.com/ate/transactions-api/
    - name: com.atomikos:transactions-jdbc
      license: Atomikos
      url: http://www.atomikos.com/ate/transactions-jdbc/
    - name: com.atomikos:transactions-jta
      license: Atomikos
      url: http://www.atomikos.com/ate/transactions-jta/
    - name: com.baomidou:mybatis-plus
      license: Apache-2.0
      url: https://github.com/baomidou/mybatis-plus
    - name: com.baomidou:mybatis-plus-annotation
      license: Apache-2.0
      url: https://github.com/baomidou/mybatis-plus
    - name: com.baomidou:mybatis-plus-boot-starter
      license: Apache-2.0
      url: https://github.com/baomidou/mybatis-plus
    - name: com.baomidou:mybatis-plus-boot-starter-test
      license: Apache-2.0
      url: https://github.com/baomidou/mybatis-plus
    - name: com.baomidou:mybatis-plus-core
      license: Apache-2.0
      url: https://github.com/baomidou/mybatis-plus
    - name: com.baomidou:mybatis-plus-extension
      license: Apache-2.0
      url: https://github.com/baomidou/mybatis-plus
    - name: com.baomidou:mybatis-plus-spring-boot-autoconfigure
      license: Apache-2.0
      url: https://github.com/baomidou/mybatis-plus
    - name: com.baomidou:mybatis-plus-spring-boot-test-autoconfigure
      license: Apache-2.0
      url: https://github.com/baomidou/mybatis-plus
    - name: com.fasterxml.jackson.core:jackson-annotations
      license: Apache-2.0
      url: http://github.com/FasterXML/jackson
    - name: com.fasterxml.jackson.core:jackson-core
      license: Apache-2.0
      url: https://github.com/FasterXML/jackson-core
    - name: com.fasterxml.jackson.core:jackson-databind
      license: Apache-2.0
      url: http://github.com/FasterXML/jackson
    - name: com.fasterxml.jackson.datatype:jackson-datatype-jdk8
      license: Apache-2.0
      url: https://github.com/FasterXML/jackson-modules-java8/jackson-datatype-jdk8
    - name: com.fasterxml.jackson.datatype:jackson-datatype-jsr310
      license: Apache-2.0
      url: https://github.com/FasterXML/jackson-modules-java8/jackson-datatype-jsr310
    - name: com.fasterxml.jackson.module:jackson-module-parameter-names
      license: Apache-2.0
      url: https://github.com/FasterXML/jackson-modules-java8/jackson-module-parameter-names
    - name: com.github.chris2018998:beecp
      license: LGPL-2.1, Apache-2.0
      url: https://github.com/Chris2018998/BeeCP
    - name: com.github.jsqlparser:jsqlparser
      license: Apache-2.0
      url: https://github.com/JSQLParser/JSqlParser
    - name: com.google.protobuf:protobuf-java
      license: BSD-3-Clause
      url: https://developers.google.com/protocol-buffers/protobuf-java/
    - name: com.h2database:h2
      license: EPL-1.0, MPL-2.0
      url: https://h2database.com
    - name: com.jayway.jsonpath:json-path
      license: Apache-2.0
      url: https://github.com/jayway/JsonPath
    - name: com.mysql:mysql-connector-j
      license: GPL-2.0-with-FOSS-exception
      url: http://dev.mysql.com/doc/connector-j/en/
    - name: com.vaadin.external.google:android-json
      license: Apache-2.0
      url: http://developer.android.com/sdk
    - name: com.zaxxer:HikariCP
      license: Apache-2.0
      url: https://github.com/brettwooldridge/HikariCP
    - name: commons-logging:commons-logging
      license: Apache-2.0
      url: http://commons.apache.org/proper/commons-logging/
    - name: jakarta.activation:jakarta.activation-api
      license: EDL-1.0
      url: https://github.com/eclipse-ee4j/jaf/jakarta.activation-api
    - name: jakarta.annotation:jakarta.annotation-api
      license: EPL-2.0, GPL2-with-CPE
      url: https://projects.eclipse.org/projects/ee4j.ca
    - name: jakarta.transaction:jakarta.transaction-api
      license: EPL-2.0, GPL2-with-CPE
      url: https://projects.eclipse.org/projects/ee4j.jta
    - name: jakarta.xml.bind:jakarta.xml.bind-api
      license: EDL-1.0
      url: https://github.com/eclipse-ee4j/jaxb-api/jakarta.xml.bind-api
    - name: net.bytebuddy:byte-buddy
      license: Apache-2.0
      url: https://bytebuddy.net/byte-buddy
    - name: net.bytebuddy:byte-buddy-agent
      license: Apache-2.0
      url: https://bytebuddy.net/byte-buddy-agent
    - name: net.minidev:accessors-smart
      license: Apache-2.0
      url: https://urielch.github.io/
    - name: net.minidev:json-smart
      license: Apache-2.0
      url: https://urielch.github.io/
    - name: org.apache.commons:commons-dbcp2
      license: Apache-2.0
      url: https://commons.apache.org/dbcp/
    - name: org.apache.commons:commons-pool2
      license: Apache-2.0
      url: https://commons.apache.org/proper/commons-pool/
    - name: org.apache.logging.log4j:log4j-api
      license: Apache-2.0
      url: https://logging.apache.org/log4j/2.x/log4j-api/
    - name: org.apache.logging.log4j:log4j-to-slf4j
      license: Apache-2.0
      url: https://logging.apache.org/log4j/2.x/log4j-to-slf4j/
    - name: org.apiguardian:apiguardian-api
      license: Apache-2.0
      url: https://github.com/apiguardian-team/apiguardian
    - name: org.assertj:assertj-core
      license: MIT
      url: https://assertj.github.io/doc/assertj-core/
    - name: org.checkerframework:checker-qual
      license: MIT
      url: https://checkerframework.org/
    - name: org.hamcrest:hamcrest
      license: BSD-3-Clause
      url: http://hamcrest.org/JavaHamcrest/
    - name: org.junit.jupiter:junit-jupiter
      license: EPL-2.0
      url: https://junit.org/junit5/
    - name: org.junit.jupiter:junit-jupiter-api
      license: EPL-2.0
      url: https://junit.org/junit5/
    - name: org.junit.jupiter:junit-jupiter-engine
      license: EPL-2.0
      url: https://junit.org/junit5/
    - name: org.junit.jupiter:junit-jupiter-params
      license: EPL-2.0
      url: https://junit.org/junit5/
    - name: org.junit.platform:junit-platform-commons
      license: EPL-2.0
      url: https://junit.org/junit5/
    - name: org.junit.platform:junit-platform-engine
      license: EPL-2.0
      url: https://junit.org/junit5/
    - name: org.mockito:mockito-core
      license: MIT
      url: https://github.com/mockito/mockito
    - name: org.mockito:mockito-junit-jupiter
      license: MIT
      url: https://github.com/mockito/mockito
    - name: org.mybatis:mybatis
      license: Apache-2.0
      url: https://www.mybatis.org/mybatis-3
    - name: org.mybatis:mybatis-spring
      license: Apache-2.0
      url: http://www.mybatis.org/spring/
    - name: org.objenesis:objenesis
      license: Apache-2.0
      url: http://objenesis.org/objenesis
    - name: org.opentest4j:opentest4j
      license: MIT
      url: https://github.com/ota4j-team/opentest4j
    - name: org.ow2.asm:asm
      license: BSD-3-Clause
      url: http://asm.ow2.io/
    - name: org.postgresql:postgresql
      license: BSD-3-Clause
      url: https://jdbc.postgresql.org
    - name: org.projectlombok:lombok
      license: MIT
      url: https://projectlombok.org
    - name: org.skyscreamer:jsonassert
      license: Apache-2.0
      url: https://github.com/skyscreamer/JSONassert
    - name: org.slf4j:jul-to-slf4j
      license: MIT
      url: http://www.slf4j.org
    - name: org.slf4j:slf4j-api
      license: MIT
      url: http://www.slf4j.org
    - name: org.springframework:spring-aop
      license: Apache-2.0
      url: https://github.com/spring-projects/spring-framework
    - name: org.springframework:spring-beans
      license: Apache-2.0
      url: https://github.com/spring-projects/spring-framework
    - name: org.springframework:spring-context
      license: Apache-2.0
      url: https://github.com/spring-projects/spring-framework
    - name: org.springframework:spring-core
      license: Apache-2.0
      url: https://github.com/spring-projects/spring-framework
    - name: org.springframework:spring-expression
      license: Apache-2.0
      url: https://github.com/spring-projects/spring-framework
    - name: org.springframework:spring-jcl
      license: Apache-2.0
      url: https://github.com/spring-projects/spring-framework
    - name: org.springframework:spring-jdbc
      license: Apache-2.0
      url: https://github.com/spring-projects/spring-framework
    - name: org.springframework:spring-test
      license: Apache-2.0
      url: https://github.com/spring-projects/spring-framework
    - name: org.springframework:spring-tx
      license: Apache-2.0
      url: https://github.com/spring-projects/spring-framework
    - name: org.springframework:spring-web
      license: Apache-2.0
      url: https://github.com/spring-projects/spring-framework
    - name: org.springframework.boot:spring-boot
      license: Apache-2.0
      url: https://spring.io/projects/spring-boot
    - name: org.springframework.boot:spring-boot-autoconfigure
      license: Apache-2.0
      url: https://spring.io/projects/spring-boot
    - name: org.springframework.boot:spring-boot-starter
      license: Apache-2.0
      url: https://spring.io/projects/spring-boot
    - name: org.springframework.boot:spring-boot-starter-jdbc
      license: Apache-2.0
      url: https://spring.io/projects/spring-boot
    - name: org.springframework.boot:spring-boot-starter-json
      license: Apache-2.0
      url: https://spring.io/projects/spring-boot
    - name: org.springframework.boot:spring-boot-starter-logging
      license: Apache-2.0
      url: https://spring.io/projects/spring-boot
    - name: org.springframework.boot:spring-boot-starter-test
      license: Apache-2.0
      url: https://spring.io/projects/spring-boot
    - name: org.springframework.boot:spring-boot-test
      license: Apache-2.0
      url: https://spring.io/projects/spring-boot
    - name: org.springframework.boot:spring-boot-test-autoconfigure
      license: Apache-2.0
      url: https://spring.io/projects/spring-boot
    - name: org.xmlunit:xmlunit-core
      license: Apache-2.0
      url: https://www.xmlunit.org/
    - name: org.yaml:snakeyaml
      license: Apache-2.0
      url: https://bitbucket.org/snakeyaml/snakeyaml

```

然后是`LICENSE.tpl`

```tpl
{{ .LicenseContent }}

=======================================================================
Dromara StreamQuery Subcomponents:

The Dromara StreamQuery project contains subcomponents with separate copyright
notices and license terms. Your use of the source code for the these
subcomponents is subject to the terms and conditions of the following
licenses.
========================================================================

{{ range .Groups }}
========================================================================
{{ .LicenseID }} licenses
========================================================================
The following components are provided under the {{ .LicenseID }} License. See project link for details.
{{- if eq .LicenseID "Apache-2.0" }}
The text of each license is the standard Apache 2.0 license.
{{- else }}
The text of each license is also included in licenses/LICENSE-[project].txt.
{{ end }}

    {{- range .Deps }}
      {{- $groupArtifact := regexSplit ":" .Name -1 }}
      {{- if eq (len $groupArtifact) 2 }}
        {{- $group := index $groupArtifact 0 }}
        {{- $artifact := index $groupArtifact 1 }}
    https://mvnrepository.com/artifact/{{ $group }}/{{ $artifact }}/{{ .Version }} {{ .LicenseID }}
      {{- else }}
    https://npmjs.com/package/{{ .Name }}/v/{{ .Version }} {{ .Version }} {{ .LicenseID }}
      {{- end }}
    {{- end }}
{{ end }}
```

然后使用`license-eye`，我是用`brew install license-eye`

```yml
license-eye dependency resolve --summary ./LICENSE.tpl
```

然后还编写了一个脚本用于单独存放`licenserc.sh`

```bash
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# 创建licenses目录
mkdir -p licenses

# 假设license-eye输出已重定向到此文件
license_eye_output="license-eye-output.txt"

# 处理license-eye输出
while IFS='|' read -r dependency license version; do
  # 清理读取的值
  dependency=$(echo "$dependency" | awk '{print $1}' | tr '.' '-' | tr ':' '-')
  license=$(echo "$license" | xargs)

  # 为每个依赖创建文件，这里简化处理，直接使用许可证信息
  echo "License: $license" > "licenses/license-$dependency.txt"

done < "$license_eye_output"

echo "License files have been generated in the licenses directory."

```

源码地址：[stream-query: 允许完全摆脱Mapper的mybatis-plus体验！可以使用类似“工具类”这样的静态函数进行数据库操作](https://gitee.com/dromara/stream-query)
