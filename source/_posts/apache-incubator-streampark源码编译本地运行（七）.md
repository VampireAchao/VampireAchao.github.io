---
title: apache-incubator-streampark源码编译本地运行（七）
date: 2024-01-29 19:27:27
tags: java
---

> 要求旁人都合我们的脾气，那是很愚蠢的。——歌德

这次删除`.idea`目录后，重新打开项目，运行`build.sh`

发现报错：

```bash
~/IdeaProjects/incubator-streampark
/bin/bash /Users/achao/IdeaProjects/incubator-streampark/build.sh

          _____ __                                             __       
         / ___// /_________  ____ _____ ___  ____  ____ ______/ /__     
         \__ \/ __/ ___/ _ \/ __ `/ __ `__ \/ __ \  __ `/ ___/ //_/     
        ___/ / /_/ /  /  __/ /_/ / / / / / / /_/ / /_/ / /  / ,<        
       /____/\__/_/   \___/\__,_/_/ /_/ /_/ ____/\__,_/_/  /_/|_|       
                                         /_/                            

         Version:  2.2.0-SNAPSHOT 
         WebSite:  https://streampark.apache.org
         GitHub :  http://github.com/apache/streampark

         ──────── Apache StreamPark, Make stream processing easier ô~ô!

[StreamPark] Apache StreamPark, building...
[INFO] Scanning for projects...
[WARNING] 
# 中间省略
[INFO] ------------< org.apache.streampark:streampark-common_2.12 >------------
[INFO] Building StreamPark : Common 2.2.0-SNAPSHOT                       [5/36]
[INFO] --------------------------------[ jar ]---------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:3.1.0:clean (default-clean) @ streampark-common_2.12 ---
[INFO] 
[INFO] --- maven-enforcer-plugin:3.0.0:enforce (enforce-maven-version) @ streampark-common_2.12 ---
[INFO] 
[INFO] --- maven-enforcer-plugin:3.0.0:enforce (enforce-java-version) @ streampark-common_2.12 ---
[INFO] 
[INFO] --- spotless-maven-plugin:2.27.2:check (spotless-check) @ streampark-common_2.12 ---
[ERROR] Step 'removeUnusedImports' found problem in 'src/main/java/org/apache/streampark/common/util/ExceptionUtils.java':
null
java.lang.reflect.InvocationTargetException
    at jdk.internal.reflect.DirectMethodHandleAccessor.invoke (DirectMethodHandleAccessor.java:118)
    at java.lang.reflect.Method.invoke (Method.java:580)
    at com.diffplug.spotless.java.GoogleJavaFormatStep$State.lambda$constructRemoveUnusedFunction$4 (GoogleJavaFormatStep.java:211)
    at com.diffplug.spotless.java.GoogleJavaFormatStep$State.lambda$createRemoveUnusedImportsOnly$2 (GoogleJavaFormatStep.java:188)
    at com.diffplug.spotless.FormatterFunc.apply (FormatterFunc.java:32)
    at com.diffplug.spotless.FormatterStepImpl$Standard.format (FormatterStepImpl.java:82)
    at com.diffplug.spotless.FormatterStep$Strict.format (FormatterStep.java:88)
    at com.diffplug.spotless.Formatter.compute (Formatter.java:230)
    at com.diffplug.spotless.PaddedCell.calculateDirtyState (PaddedCell.java:203)
    at com.diffplug.spotless.PaddedCell.calculateDirtyState (PaddedCell.java:190)
    at com.diffplug.spotless.maven.SpotlessCheckMojo.process (SpotlessCheckMojo.java:51)
    at com.diffplug.spotless.maven.AbstractSpotlessMojo.execute (AbstractSpotlessMojo.java:198)
    at org.apache.maven.plugin.DefaultBuildPluginManager.executeMojo (DefaultBuildPluginManager.java:137)
    at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:210)
    at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:156)
    at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:148)
    at org.apache.maven.lifecycle.internal.LifecycleModuleBuilder.buildProject (LifecycleModuleBuilder.java:117)
    at org.apache.maven.lifecycle.internal.LifecycleModuleBuilder.buildProject (LifecycleModuleBuilder.java:81)
    at org.apache.maven.lifecycle.internal.builder.singlethreaded.SingleThreadedBuilder.build (SingleThreadedBuilder.java:56)
    at org.apache.maven.lifecycle.internal.LifecycleStarter.execute (LifecycleStarter.java:128)
    at org.apache.maven.DefaultMaven.doExecute (DefaultMaven.java:305)
    at org.apache.maven.DefaultMaven.doExecute (DefaultMaven.java:192)
    at org.apache.maven.DefaultMaven.execute (DefaultMaven.java:105)
    at org.apache.maven.cli.MavenCli.execute (MavenCli.java:972)
    at org.apache.maven.cli.MavenCli.doMain (MavenCli.java:293)
    at org.apache.maven.cli.MavenCli.main (MavenCli.java:196)
    at jdk.internal.reflect.DirectMethodHandleAccessor.invoke (DirectMethodHandleAccessor.java:103)
    at java.lang.reflect.Method.invoke (Method.java:580)
    at org.codehaus.plexus.classworlds.launcher.Launcher.launchEnhanced (Launcher.java:282)
    at org.codehaus.plexus.classworlds.launcher.Launcher.launch (Launcher.java:225)
    at org.codehaus.plexus.classworlds.launcher.Launcher.mainWithExitCode (Launcher.java:406)
    at org.codehaus.plexus.classworlds.launcher.Launcher.main (Launcher.java:347)
    at jdk.internal.reflect.DirectMethodHandleAccessor.invoke (DirectMethodHandleAccessor.java:103)
    at java.lang.reflect.Method.invoke (Method.java:580)
    at org.apache.maven.wrapper.BootstrapMainStarter.start (BootstrapMainStarter.java:52)
    at org.apache.maven.wrapper.WrapperExecutor.execute (WrapperExecutor.java:161)
    at org.apache.maven.wrapper.MavenWrapperMain.main (MavenWrapperMain.java:73)
Caused by: java.lang.NoSuchMethodError: 'com.sun.tools.javac.tree.JCTree com.sun.tools.javac.tree.JCTree$JCImport.getQualifiedIdentifier()'
    at com.google.googlejavaformat.java.RemoveUnusedImports.getSimpleName (RemoveUnusedImports.java:293)
    at com.google.googlejavaformat.java.RemoveUnusedImports.buildReplacements (RemoveUnusedImports.java:275)
    at com.google.googlejavaformat.java.RemoveUnusedImports.removeUnusedImports (RemoveUnusedImports.java:227)
    at jdk.internal.reflect.DirectMethodHandleAccessor.invoke (DirectMethodHandleAccessor.java:103)
    at java.lang.reflect.Method.invoke (Method.java:580)
    at com.diffplug.spotless.java.GoogleJavaFormatStep$State.lambda$constructRemoveUnusedFunction$4 (GoogleJavaFormatStep.java:211)
    at com.diffplug.spotless.java.GoogleJavaFormatStep$State.lambda$createRemoveUnusedImportsOnly$2 (GoogleJavaFormatStep.java:188)
    at com.diffplug.spotless.FormatterFunc.apply (FormatterFunc.java:32)
    at com.diffplug.spotless.FormatterStepImpl$Standard.format (FormatterStepImpl.java:82)
    at com.diffplug.spotless.FormatterStep$Strict.format (FormatterStep.java:88)
    at com.diffplug.spotless.Formatter.compute (Formatter.java:230)
    at com.diffplug.spotless.PaddedCell.calculateDirtyState (PaddedCell.java:203)
    at com.diffplug.spotless.PaddedCell.calculateDirtyState (PaddedCell.java:190)
    at com.diffplug.spotless.maven.SpotlessCheckMojo.process (SpotlessCheckMojo.java:51)
    at com.diffplug.spotless.maven.AbstractSpotlessMojo.execute (AbstractSpotlessMojo.java:198)
    at org.apache.maven.plugin.DefaultBuildPluginManager.executeMojo (DefaultBuildPluginManager.java:137)
    at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:210)
    at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:156)
    at org.apache.maven.lifecycle.internal.MojoExecutor.execute (MojoExecutor.java:148)
    at org.apache.maven.lifecycle.internal.LifecycleModuleBuilder.buildProject (LifecycleModuleBuilder.java:117)
    at org.apache.maven.lifecycle.internal.LifecycleModuleBuilder.buildProject (LifecycleModuleBuilder.java:81)
    at org.apache.maven.lifecycle.internal.builder.singlethreaded.SingleThreadedBuilder.build (SingleThreadedBuilder.java:56)
    at org.apache.maven.lifecycle.internal.LifecycleStarter.execute (LifecycleStarter.java:128)
    at org.apache.maven.DefaultMaven.doExecute (DefaultMaven.java:305)
    at org.apache.maven.DefaultMaven.doExecute (DefaultMaven.java:192)
    at org.apache.maven.DefaultMaven.execute (DefaultMaven.java:105)
    at org.apache.maven.cli.MavenCli.execute (MavenCli.java:972)
    at org.apache.maven.cli.MavenCli.doMain (MavenCli.java:293)
    at org.apache.maven.cli.MavenCli.main (MavenCli.java:196)
    at jdk.internal.reflect.DirectMethodHandleAccessor.invoke (DirectMethodHandleAccessor.java:103)
    at java.lang.reflect.Method.invoke (Method.java:580)
    at org.codehaus.plexus.classworlds.launcher.Launcher.launchEnhanced (Launcher.java:282)
    at org.codehaus.plexus.classworlds.launcher.Launcher.launch (Launcher.java:225)
    at org.codehaus.plexus.classworlds.launcher.Launcher.mainWithExitCode (Launcher.java:406)
    at org.codehaus.plexus.classworlds.launcher.Launcher.main (Launcher.java:347)
    at jdk.internal.reflect.DirectMethodHandleAccessor.invoke (DirectMethodHandleAccessor.java:103)
    at java.lang.reflect.Method.invoke (Method.java:580)
    at org.apache.maven.wrapper.BootstrapMainStarter.start (BootstrapMainStarter.java:52)
    at org.apache.maven.wrapper.WrapperExecutor.execute (WrapperExecutor.java:161)
    at org.apache.maven.wrapper.MavenWrapperMain.main (MavenWrapperMain.java:73)
[INFO] ------------------------------------------------------------------------
[INFO] Reactor Summary:
[INFO] 
[INFO] StreamPark Project Parent POM 2.2.0-SNAPSHOT ....... SUCCESS [  5.375 s]
[INFO] StreamPark : Shaded Parent 1.0.0 ................... SUCCESS [  0.077 s]
[INFO] StreamPark : Shaded Slf4j 1.0.0 .................... SUCCESS [  0.412 s]
[INFO] StreamPark : Shaded Jackson 1.0.0 .................. SUCCESS [  0.427 s]
[INFO] StreamPark : Common 2.2.0-SNAPSHOT ................. FAILURE [  0.279 s]
[INFO] StreamPark : Flink Parent 2.2.0-SNAPSHOT ........... SKIPPED
[INFO] StreamPark : Flink Shims Parent 2.2.0-SNAPSHOT ..... SKIPPED
[INFO] StreamPark : Flink Shims Base 2.2.0-SNAPSHOT ....... SKIPPED
[INFO] StreamPark : Flink Shims 1.14 2.2.0-SNAPSHOT ....... SKIPPED
[INFO] StreamPark : Flink Core 2.2.0-SNAPSHOT ............. SKIPPED
[INFO] StreamPark : Flink Shims Test 2.2.0-SNAPSHOT ....... SKIPPED
[INFO] StreamPark : Flink Shims 1.12 2.2.0-SNAPSHOT ....... SKIPPED
[INFO] StreamPark : Flink Shims 1.13 2.2.0-SNAPSHOT ....... SKIPPED
[INFO] StreamPark : Flink Shims 1.15 2.2.0-SNAPSHOT ....... SKIPPED
[INFO] StreamPark : Flink Shims 1.16 2.2.0-SNAPSHOT ....... SKIPPED
[INFO] StreamPark : Flink Shims 1.17 2.2.0-SNAPSHOT ....... SKIPPED
[INFO] StreamPark : Flink Shims 1.18 2.2.0-SNAPSHOT ....... SKIPPED
[INFO] StreamPark : Flink SQL Client 2.2.0-SNAPSHOT ....... SKIPPED
[INFO] StreamPark : Flink Udf 2.2.0-SNAPSHOT .............. SKIPPED
[INFO] StreamPark : Flink Proxy 2.2.0-SNAPSHOT ............ SKIPPED
[INFO] StreamPark : Flink Kubernetes Integration(Deprecated) 2.2.0-SNAPSHOT SKIPPED
[INFO] StreamPark : Flink Kubernetes Integration V2 2.2.0-SNAPSHOT SKIPPED
[INFO] StreamPark : Flink Kubernetes CRD 2.2.0-SNAPSHOT ... SKIPPED
[INFO] StreamPark : Flink Kubernetes Integration Core 2.2.0-SNAPSHOT SKIPPED
[INFO] StreamPark : Flink Packer 2.2.0-SNAPSHOT ........... SKIPPED
[INFO] StreamPark : Flink Client 2.2.0-SNAPSHOT ........... SKIPPED
[INFO] StreamPark : Flink Client Api 2.2.0-SNAPSHOT ....... SKIPPED
[INFO] StreamPark : Flink Client Core 2.2.0-SNAPSHOT ...... SKIPPED
[INFO] StreamPark : SQL Gateway Parent 2.2.0-SNAPSHOT ..... SKIPPED
[INFO] StreamPark : Sql Gateway Base 2.2.0-SNAPSHOT ....... SKIPPED
[INFO] StreamPark : Flink SQL Gateway 1.16 2.2.0-SNAPSHOT . SKIPPED
[INFO] StreamPark : Kyuubi SQL Gateway 2.2.0-SNAPSHOT ..... SKIPPED
[INFO] StreamPark : Tests 2.2.0-SNAPSHOT .................. SKIPPED
[INFO] StreamPark : Test Container 2.2.0-SNAPSHOT ......... SKIPPED
[INFO] StreamPark : Console Parent 2.2.0-SNAPSHOT ......... SKIPPED
[INFO] StreamPark : Console Service 2.2.0-SNAPSHOT ........ SKIPPED
[INFO] ------------------------------------------------------------------------
[INFO] BUILD FAILURE
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  6.747 s
[INFO] Finished at: 2024-01-28T18:14:34+08:00
[INFO] ------------------------------------------------------------------------
[ERROR] Failed to execute goal com.diffplug.spotless:spotless-maven-plugin:2.27.2:check (spotless-check) on project streampark-common_2.12: Execution spotless-check of goal com.diffplug.spotless:spotless-maven-plugin:2.27.2:check failed: java.lang.reflect.InvocationTargetException: 'com.sun.tools.javac.tree.JCTree com.sun.tools.javac.tree.JCTree$JCImport.getQualifiedIdentifier()' -> [Help 1]
[ERROR] 
[ERROR] To see the full stack trace of the errors, re-run Maven with the -e switch.
[ERROR] Re-run Maven using the -X switch to enable full debug logging.
[ERROR] 
[ERROR] For more information about the errors and possible solutions, please read the following articles:
[ERROR] [Help 1] http://cwiki.apache.org/confluence/display/MAVEN/PluginExecutionException
[ERROR] 
[ERROR] After correcting the problems, you can resume the build with the command
[ERROR]   mvn <args> -rf :streampark-common_2.12
```

然后这里发现我的`java`版本过高，配置环境变量

打开`~/.bash_profile`

```bash
Github-Id-VampireAchao:blog achao$ open ~/.bash_profile
```

然后修改`java`环境变量为`1.8`的

```plaintext
export NVM_DIR="$HOME/.nvm"
  [ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"  # This loads nvm
  [ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
export NVM_NODEJS_ORG_MIRROR=http://mirrors.cloud.tencent.com/nodejs-release/
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.ustc.edu.cn/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.ustc.edu.cn/homebrew-core.git"
export HOMEBREW_API_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles/api"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles/bottles"
export PYTHON_BUILD_MIRROR_URL="https://mirrors.huaweicloud.com/python/"

# java
export JAVA_HOME="/Users/achao/Library/Java/JavaVirtualMachines/azul-1.8.0_372/Contents/Home"
# export JAVA_HOME="/Users/achao/Library/Java/JavaVirtualMachines/azul-17.0.8.1/Contents/Home"
# export JAVA_HOME="/Users/achao/Library/Java/JavaVirtualMachines/openjdk-21.0.1/Contents/Home"
export PATH="$JAVA_HOME:$PATH"
export PYENV_ROOT="$HOME/.pyenv"
command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"

# yarn
export PATH="/Users/achao/.yarn/bin:$PATH"

# Added by Toolbox App
export PATH="$PATH:/Users/achao/Library/Application Support/JetBrains/Toolbox/scripts"

# brew_etc="$(brew --prefix)/etc" && [[ -r "${brew_etc}/profile.d/bash_completion.sh" ]] && . "${brew_etc}/profile.d/bash_completion.sh"source <(kubectl completion bash)
```

改完保存执行生效

```bash
Github-Id-VampireAchao:blog achao$ source ~/.bash_profile
```

然后接着报错

```bash
WARN: Check found /Users/achao/IdeaProjects/incubator-streampark/.mvn/wrapper/maven-wrapper.jar invalided.
Error: A JNI error has occurred, please check your installation and try again
Exception in thread "main" java.lang.UnsupportedClassVersionError: MavenWrapperHelper has been compiled by a more recent version of the Java Runtime (class file version 65.0), this version of the Java Runtime only recognizes class file versions up to 52.0
```

提到了`.mvn/wrapper/maven-wrapper.jar`和当前`jdk`版本不兼容...

我们重新生成一下`mvnw`和`mvnw.cmd`

```bash
mvn -N io.takari:maven:wrapper
```

接下来运行会报错：

```bash
[ERROR] Failed to execute goal org.apache.rat:apache-rat-plugin:0.13:check (rat-validate) on project streampark-console-service: Too many files with unapproved license: 23 See RAT report in: /Users/achao/IdeaProjects/incubator-streampark/streampark-console/streampark-console-service/target/rat.txt -> [Help 1]
```

这里我们打开

`/Users/achao/IdeaProjects/incubator-streampark/streampark-console/streampark-console-service/target/rat.txt`

这个文件，提到了`mvnrepo`下面有些文件导致报错，这里虽然有点奇怪不知道是不是只有我的电脑是这样，但我们配置一下忽略吧，主要先把项目跑起来，找到`pom.xml`下面的`apache-rat-plugin`，在`configuration`的`excludes`里新增一项

```xml
<exclude>**/mvnrepo/**</exclude>
```

完整的

```xml
                <!--mvn apache-rat:check-->
                <plugin>
                    <groupId>org.apache.rat</groupId>
                    <artifactId>apache-rat-plugin</artifactId>
                    <version>${maven-apache-rat-plugin.version}</version>
                    <configuration>
                        <excludes>
                            <exclude>.asf.yaml</exclude>
                            <exclude>.git-blame-ignore-revs</exclude>
                            <exclude>.editorconfig</exclude>
                            <exclude>.git/</exclude>
                            <exclude>.github/**</exclude>
                            <exclude>.gitignore</exclude>
                            <exclude>.licenserc.yaml</exclude>
                            <exclude>.scalafmt.conf</exclude>

                            <exclude>**/.idea/</exclude>
                            <exclude>**/*.iml</exclude>
                            <exclude>**/*.txt</exclude>
                            <exclude>**/*.json</exclude>
                            <exclude>**/*.md</exclude>
                            <exclude>**/*.log</exclude>
                            <exclude>**/.gitkeep</exclude>
                            <exclude>**/.settings/*</exclude>
                            <exclude>**/.classpath</exclude>
                            <exclude>**/.project</exclude>
                            <exclude>**/target/**</exclude>
                            <exclude>**/out/**</exclude>
                            <exclude>**/META-INF/**</exclude>

                            <exclude>.mvn/**</exclude>
                            <exclude>compiler/**</exclude>
                            <exclude>dist-material/**</exclude>
                            <exclude>docker/**</exclude>
                            <exclude>helm/**</exclude>
                            <exclude>mvnw</exclude>
                            <exclude>mvnw.cmd</exclude>
                            <exclude>README.md</exclude>

                            <exclude>src/main/assembly/**</exclude>
                            <exclude>src/main/resources/alert-template/**</exclude>
                            <exclude>src/main/resources/*.dict</exclude>

                            <exclude>streampark-console-webapp/**</exclude>
                            <exclude>**/mvnrepo/**</exclude>
                        </excludes>
                    </configuration>
                    <executions>
                        <execution>
                            <id>rat-validate</id>
                            <goals>
                                <goal>check</goal>
                            </goals>
                            <phase>validate</phase>
                        </execution>
                    </executions>
                </plugin>
```

再次运行`build.sh`

发现成功

```bash
~/IdeaProjects/incubator-streampark
/bin/bash /Users/achao/IdeaProjects/incubator-streampark/build.sh

          _____ __                                             __       
         / ___// /_________  ____ _____ ___  ____  ____ ______/ /__     
         \__ \/ __/ ___/ _ \/ __ `/ __ `__ \/ __ \  __ `/ ___/ //_/     
        ___/ / /_/ /  /  __/ /_/ / / / / / / /_/ / /_/ / /  / ,<        
       /____/\__/_/   \___/\__,_/_/ /_/ /_/ ____/\__,_/_/  /_/|_|       
                                         /_/                            

         Version:  2.2.0-SNAPSHOT 
         WebSite:  https://streampark.apache.org
         GitHub :  http://github.com/apache/streampark

         ──────── Apache StreamPark, Make stream processing easier ô~ô!

[StreamPark] Apache StreamPark, building...[INFO] ------------------------------------------------------------------------
[INFO] Reactor Summary:
[INFO] 
[INFO] StreamPark Project Parent POM 2.2.0-SNAPSHOT ....... SUCCESS [  5.976 s]
[INFO] StreamPark : Shaded Parent 1.0.0 ................... SUCCESS [  0.116 s]
[INFO] StreamPark : Shaded Slf4j 1.0.0 .................... SUCCESS [  0.447 s]
[INFO] StreamPark : Shaded Jackson 1.0.0 .................. SUCCESS [  0.483 s]
[INFO] StreamPark : Common 2.2.0-SNAPSHOT ................. SUCCESS [ 17.533 s]
[INFO] StreamPark : Flink Parent 2.2.0-SNAPSHOT ........... SUCCESS [  0.183 s]
[INFO] StreamPark : Flink Shims Parent 2.2.0-SNAPSHOT ..... SUCCESS [  0.067 s]
[INFO] StreamPark : Flink Shims Base 2.2.0-SNAPSHOT ....... SUCCESS [  9.988 s]
[INFO] StreamPark : Flink Shims 1.14 2.2.0-SNAPSHOT ....... SUCCESS [  4.607 s]
[INFO] StreamPark : Flink Core 2.2.0-SNAPSHOT ............. SUCCESS [  3.848 s]
[INFO] StreamPark : Flink Shims Test 2.2.0-SNAPSHOT ....... SUCCESS [  4.355 s]
[INFO] StreamPark : Flink Shims 1.12 2.2.0-SNAPSHOT ....... SUCCESS [  4.085 s]
[INFO] StreamPark : Flink Shims 1.13 2.2.0-SNAPSHOT ....... SUCCESS [  4.220 s]
[INFO] StreamPark : Flink Shims 1.15 2.2.0-SNAPSHOT ....... SUCCESS [  4.627 s]
[INFO] StreamPark : Flink Shims 1.16 2.2.0-SNAPSHOT ....... SUCCESS [  4.318 s]
[INFO] StreamPark : Flink Shims 1.17 2.2.0-SNAPSHOT ....... SUCCESS [  4.906 s]
[INFO] StreamPark : Flink Shims 1.18 2.2.0-SNAPSHOT ....... SUCCESS [  4.369 s]
[INFO] StreamPark : Flink SQL Client 2.2.0-SNAPSHOT ....... SUCCESS [  3.916 s]
[INFO] StreamPark : Flink Udf 2.2.0-SNAPSHOT .............. SUCCESS [  0.481 s]
[INFO] StreamPark : Flink Proxy 2.2.0-SNAPSHOT ............ SUCCESS [  4.629 s]
[INFO] StreamPark : Flink Kubernetes Integration(Deprecated) 2.2.0-SNAPSHOT SUCCESS [ 15.384 s]
[INFO] StreamPark : Flink Kubernetes Integration V2 2.2.0-SNAPSHOT SUCCESS [  0.108 s]
[INFO] StreamPark : Flink Kubernetes CRD 2.2.0-SNAPSHOT ... SUCCESS [  5.183 s]
[INFO] StreamPark : Flink Kubernetes Integration Core 2.2.0-SNAPSHOT SUCCESS [ 18.282 s]
[INFO] StreamPark : Flink Packer 2.2.0-SNAPSHOT ........... SUCCESS [ 15.512 s]
[INFO] StreamPark : Flink Client 2.2.0-SNAPSHOT ........... SUCCESS [  0.087 s]
[INFO] StreamPark : Flink Client Api 2.2.0-SNAPSHOT ....... SUCCESS [  6.523 s]
[INFO] StreamPark : Flink Client Core 2.2.0-SNAPSHOT ...... SUCCESS [ 13.343 s]
[INFO] StreamPark : SQL Gateway Parent 2.2.0-SNAPSHOT ..... SUCCESS [  0.106 s]
[INFO] StreamPark : Sql Gateway Base 2.2.0-SNAPSHOT ....... SUCCESS [  2.238 s]
[INFO] StreamPark : Flink SQL Gateway 1.16 2.2.0-SNAPSHOT . SUCCESS [  3.025 s]
[INFO] StreamPark : Kyuubi SQL Gateway 2.2.0-SNAPSHOT ..... SUCCESS [  0.350 s]
[INFO] StreamPark : Tests 2.2.0-SNAPSHOT .................. SUCCESS [  0.059 s]
[INFO] StreamPark : Test Container 2.2.0-SNAPSHOT ......... SUCCESS [  0.371 s]
[INFO] StreamPark : Console Parent 2.2.0-SNAPSHOT ......... SUCCESS [  3.315 s]
[INFO] StreamPark : Console Service 2.2.0-SNAPSHOT ........ SUCCESS [01:27 min]
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  04:15 min
[INFO] Finished at: 2024-01-28T19:30:50+08:00
[INFO] ------------------------------------------------------------------------

[StreamPark] StreamPark project build successful!
      dist: /Users/achao/IdeaProjects/incubator-streampark/dist
```
