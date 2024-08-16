---
title: BindingException:Invalid bound statement not found
date: 2021-01-25 20:05:10
tags: java
---

> 性格左右命运，气度影响格局。——余世雅博士 

[转，原文](https://www.jianshu.com/p/4e50fa289271)

# 解决：org.apache.ibatis.binding.BindingException: Invalid bound statement (not found):

- 在用maven配置mybatis环境时出现此BindingExceptiony异常，发现在classes文件下没有mapper配置文件，应该是maven项目没有扫描到mapper包下的xml文件，
  在pom.xml中加入一下代码可以解决：



```xml
 <build>
    <resources>  
      <!-- maven项目中src源代码下的xml等资源文件编译进classes文件夹，
        注意：如果没有这个，它会自动搜索resources下是否有mapper.xml文件，
        如果没有就会报org.apache.ibatis.binding.BindingException: Invalid bound statement (not found): com.pet.mapper.PetMapper.selectByPrimaryKey-->
      <resource>  
        <directory>src/main/java</directory>  
        <includes>  
          <include>**/*.xml</include>  
        </includes>  
      </resource>  

      <!--将resources目录下的配置文件编译进classes文件  -->  
      <resource>
            <directory>src/main/resources</directory>
      </resource>
    </resources>  
  </build>
```