---
title: scoop
date: 2023-02-08 21:35:08
tags: 软件及插件
---

> 因结婚而产生的爱，造出儿女；因友情而产生的爱，造就一个人。——培根

分享一个`windows`命令行安装工具`scoop`

github地址：https://github.com/ScoopInstaller/scoop

官网：https://scoop.sh/

安装方式：

`ctrl+R`打开`powershell`

![image-20230208214302709](/imgs/oss/blog/vampireachao/image-20230208214302709.png)

执行：

```powershell
> Set-ExecutionPolicy RemoteSigned -Scope CurrentUser # Optional: Needed to run a remote script the first time
> irm get.scoop.sh | iex
```

稍等一会儿

![image-20230208214515314](/imgs/oss/blog/vampireachao/image-20230208214515314.png)

然后报错了

![image-20230208214703894](/imgs/oss/blog/vampireachao/image-20230208214703894.png)

~~今天的博客到此结束~~

我们多试几次

![image-20230208214842158](/imgs/oss/blog/vampireachao/image-20230208214842158.png)

安装成功

![image-20230208214906446](/imgs/oss/blog/vampireachao/image-20230208214906446.png)

搜索软件：

```powershell
scoop search mongo
```

![image-20230208215015175](/imgs/oss/blog/vampireachao/image-20230208215015175.png)

当然你也可以在这里搜索：https://scoop.sh/#/apps

例如安装`nodejs`

```powershell
PS C:\> scoop install nodejs                                                    
Installing 'nodejs' (18.4.0) [64bit]                                            
node-v18.4.0-win-x64.7z (17.3 MB) [===================================] 100%    
Checking hash of node-v18.4.0-win-x64.7z ... ok.                                
Extracting node-v18.4.0-win-x64.7z ... done.                                    
Linking ~\scoop\apps\nodejs\current => ~\scoop\apps\nodejs\18.4.0               
Persisting bin                                                                  
Persisting cache                                                                
Running post_install script...                                                  
'nodejs' (18.4.0) was installed successfully! 
```

安装`python`

```powershell
> scoop search python
Results from local buckets...

Name      Version  Source Binaries
----      -------  ------ --------
python    3.10.5   main
winpython 3.10.4.0 main

> scoop install python@3.10.4.0
...
Creating shim for 'python.exe'.
'python' (3.10.4.0) was installed successfully!

> python -c "print('Hello from Python installed by Scoop!')"
Hello from Python installed by Scoop!
```

![image-20230208215647902](/imgs/oss/blog/vampireachao/image-20230208215647902.png)