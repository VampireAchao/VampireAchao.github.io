---
title: sdkman
date: 2024-05-20 21:51:53
tags: 软件及插件
---

> 读书仅仅是向大脑提供知识原料，只有思考才能把所学的知识变成我们自己的东西。——洛克

https://sdkman.io/

可以用 `sdkman` 管理、下载、切换 `java` 版本

```bash
Last login: Tue May 14 21:03:08 on ttys000

The default interactive shell is now zsh.
To update your account to use zsh, please run `chsh -s /bin/zsh`.
For more details, please visit https://support.apple.com/kb/HT208050.
Github-Id-VampireAchao:blog achao$ cd
Github-Id-VampireAchao:~ achao$ curl -s "https://get.sdkman.io" | bash

                                -+syyyyyyys:
                            `/yho:`       -yd.
                         `/yh/`             +m.
                       .oho.                 hy                          .`
                     .sh/`                   :N`                `-/o`  `+dyyo:.
                   .yh:`                     `M-          `-/osysoym  :hs` `-+sys:      hhyssssssssy+
                 .sh:`                       `N:          ms/-``  yy.yh-      -hy.    `.N-````````+N.
               `od/`                         `N-       -/oM-      ddd+`     `sd:     hNNm        -N:
              :do`                           .M.       dMMM-     `ms.      /d+`     `NMMs       `do
            .yy-                             :N`    ```mMMM.      -      -hy.       /MMM:       yh
          `+d+`           `:/oo/`       `-/osyh/ossssssdNMM`           .sh:         yMMN`      /m.
         -dh-           :ymNMMMMy  `-/shmNm-`:N/-.``   `.sN            /N-         `NMMy      .m/
       `oNs`          -hysosmMMMMydmNmds+-.:ohm           :             sd`        :MMM/      yy
      .hN+           /d:    -MMMmhs/-.`   .MMMh   .ss+-                 `yy`       sMMN`     :N.
     :mN/           `N/     `o/-`         :MMMo   +MMMN-         .`      `ds       mMMh      do
    /NN/            `N+....--:/+oooosooo+:sMMM:   hMMMM:        `my       .m+     -MMM+     :N.
   /NMo              -+ooooo+/:-....`...:+hNMN.  `NMMMd`        .MM/       -m:    oMMN.     hs
  -NMd`                                    :mm   -MMMm- .s/     -MMm.       /m-   mMMd     -N.
 `mMM/                                      .-   /MMh. -dMo     -MMMy        od. .MMMs..---yh
 +MMM.                                           sNo`.sNMM+     :MMMM/        sh`+MMMNmNm+++-
 mMMM-                                           /--ohmMMM+     :MMMMm.       `hyymmmdddo
 MMMMh.                  ````                  `-+yy/`yMMM/     :MMMMMy       -sm:.``..-:-.`
 dMMMMmo-.``````..-:/osyhddddho.           `+shdh+.   hMMM:     :MmMMMM/   ./yy/` `:sys+/+sh/
 .dMMMMMMmdddddmmNMMMNNNNNMMMMMs           sNdo-      dMMM-  `-/yd/MMMMm-:sy+.   :hs-      /N`
  `/ymNNNNNNNmmdys+/::----/dMMm:          +m-         mMMM+ohmo/.` sMMMMdo-    .om:       `sh
     `.-----+/.`       `.-+hh/`         `od.          NMMNmds/     `mmy:`     +mMy      `:yy.
           /moyso+//+ossso:.           .yy`          `dy+:`         ..       :MMMN+---/oys:
         /+m:  `.-:::-`               /d+                                    +MMMMMMMNh:`
        +MN/                        -yh.                                     `+hddhy+.
       /MM+                       .sh:
      :NMo                      -sh/
     -NMs                    `/yy:
    .NMy                  `:sh+.
   `mMm`               ./yds-
  `dMMMmyo:-.````.-:oymNy:`
  +NMMMMMMMMMMMMMMMMms:`
    -+shmNMMMNmdy+:`


                                                                 Now attempting installation...


Looking for a previous installation of SDKMAN...
Looking for unzip...
Looking for zip...
Looking for curl...
Looking for sed...
Installing SDKMAN scripts...
Create distribution directories...
Getting available candidates...
Prime platform file...
Prime the config file...
Installing script cli archive...
* Downloading...
######################################################################## 100.0%
* Checking archive integrity...
* Extracting archive...
* Copying archive contents...
* Cleaning up...

Installing script cli archive...
* Downloading...
######################################################################## 100.0%
* Checking archive integrity...
* Extracting archive...
* Copying archive contents...
* Cleaning up...

Set version to 5.18.2 ...
Set native version to 0.4.6 ...
Attempt update of login bash profile on OSX...
Added sdkman init snippet to /Users/achao/.bash_profile
Attempt update of zsh profile...
Updated existing /Users/achao/.zshrc



All done!


You are subscribed to the STABLE channel.

Please open a new terminal, or run the following in the existing one:

    source "/Users/achao/.sdkman/bin/sdkman-init.sh"

Then issue the following command:

    sdk help

Enjoy!!!
Github-Id-VampireAchao:~ achao$ source "$HOME/.sdkman/bin/sdkman-init.sh"
Github-Id-VampireAchao:~ achao$ sdk version

SDKMAN!
script: 5.18.2
native: 0.4.6

Github-Id-VampireAchao:~ achao$ sdk install java 11.0.22-open

Stop! java 11.0.22-open is not available. Possible causes:
 * 11.0.22-open is an invalid version
 * java binaries are incompatible with your platform
 * java has not been released yet

Tip: see all available versions for your platform:

  $ sdk list java
Github-Id-VampireAchao:~ achao$ sdk list java
Github-Id-VampireAchao:~ achao$ sdk list java
Github-Id-VampireAchao:~ achao$ 
Github-Id-VampireAchao:~ achao$ sdk list java
Github-Id-VampireAchao:~ achao$ sdk install java 11.0.22-amzn

Downloading: java 11.0.22-amzn

In progress...

######################################################################### 100.0%

Repackaging Java 11.0.22-amzn...

Done repackaging...
Cleaning up residual files...

Installing: java 11.0.22-amzn
Done installing!


Setting java 11.0.22-amzn as default.
Github-Id-VampireAchao:~ achao$ sdk use java 11

Stop! Candidate version is not installed.

Tip: Run the following to install this version

$ sdk install java 11
Github-Id-VampireAchao:~ achao$ sdk use java 11.0.22-amzn

Using java version 11.0.22-amzn in this shell.
Github-Id-VampireAchao:~ achao$ java -version
openjdk version "11.0.22" 2024-01-16 LTS
OpenJDK Runtime Environment Corretto-11.0.22.7.1 (build 11.0.22+7-LTS)
OpenJDK 64-Bit Server VM Corretto-11.0.22.7.1 (build 11.0.22+7-LTS, mixed mode)
Github-Id-VampireAchao:~ achao$ sdk current java

Using java version 11.0.22-amzn
Github-Id-VampireAchao:~ achao$ sdk list java
Github-Id-VampireAchao:~ achao$ 
Github-Id-VampireAchao:~ achao$ 
```

这里的 `sdkmanlist.txt`

```bash

```
