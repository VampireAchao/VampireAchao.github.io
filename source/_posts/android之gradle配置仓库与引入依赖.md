---
title: android之gradle配置仓库与引入依赖
date: 2020-09-29 20:22:30
tags: android
---

> 勿以恶小而为之，勿以善小而不为。——《三国志》刘备语

安卓配置`gradle`镜像地址

![image-20200929202450795](/imgs/oss/picGo/image-20200929202450795.png)

在不同的视图中找到这个`build.gradle`

![image-20200929202537439](/imgs/oss/picGo/image-20200929202537439.png)

```
// Top-level build file where you can add configuration options common to all sub-projects/modules.
buildscript {
    repositories {
        maven { url 'https://maven.aliyun.com/repository/google' }
        maven { url 'https://maven.aliyun.com/repository/gradle-plugin' }
        maven { url 'https://maven.aliyun.com/repository/public' }
        maven { url 'https://maven.aliyun.com/repository/jcenter' }
        google()
        jcenter()
    }
    dependencies {
        classpath "com.android.tools.build:gradle:4.0.0"

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}

allprojects {
    repositories {
        google()
        jcenter()
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
```

配置完了我们如果要引入依赖

找到下面这个`build.gradle`

![image-20200929202753431](/imgs/oss/picGo/image-20200929202753431.png)

![image-20200929202821142](/imgs/oss/picGo/image-20200929202821142.png)

然后在[`maven`仓库](https://mvnrepository.com/)找到需要的`jar`包粘贴到`dependencies`中即可

![image-20200929202915732](/imgs/oss/picGo/image-20200929202915732.png)

```
apply plugin: 'com.android.application'

android {
    compileSdkVersion 30
    buildToolsVersion "30.0.2"

    defaultConfig {
        applicationId "com.example.rubenapp"
        minSdkVersion 26
        targetSdkVersion 30
        versionCode 1
        versionName "1.0"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}

dependencies {
    implementation fileTree(dir: "libs", include: ["*.jar"])
    implementation 'androidx.appcompat:appcompat:1.2.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.0.1'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test.ext:junit:1.1.2'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.3.0'
// https://mvnrepository.com/artifact/com.alibaba/fastjson
    implementation group: 'com.alibaba', name: 'fastjson', version: '1.2.47'

}
```

![image-20200929202938293](/imgs/oss/picGo/image-20200929202938293.png)

点击同步后就可以用了

![image-20200929203132359](/imgs/oss/picGo/image-20200929203132359.png)

![image-20200929203013213](/imgs/oss/picGo/image-20200929203013213.png)