---
title: phpenv安装php8.x
date: 2024-05-21 19:24:34
tags: php
---

> 对你帮助最大的书籍，是使你想得最多的书籍。——伯克

首先是用`homebrew`安装`phpenv`

```bash
brew install phpenv
```

然后安装`php`，大概过程如下：

```bash
GithubIireAchao:bison-2.7 achao$ cat ~/.bash_profile
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
# python
command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"

# yarn
export PATH="/Users/achao/.yarn/bin:$PATH"

# Added by Toolbox App
export PATH="$PATH:/Users/achao/Library/Application Support/JetBrains/Toolbox/scripts"

# error command
# brew_etc="$(brew --prefix)/etc" && [[ -r "${brew_etc}/profile.d/bash_completion.sh" ]] && . "${brew_etc}/profile.d/bash_completion.sh"source <(kubectl completion bash)

#THIS MUST BE AT THE END OF THE FILE FOR SDKMAN TO WORK!!!
export SDKMAN_DIR="$HOME/.sdkman"
[[ -s "$HOME/.sdkman/bin/sdkman-init.sh" ]] && source "$HOME/.sdkman/bin/sdkman-init.sh"

# phpenv
export PHPENV_ROOT="$HOME/.phpenv"
export PATH="$PHPENV_ROOT/bin:$PATH"
eval "$(phpenv init -)"

# 设置路径
BZIP2_PATH=$(brew --prefix bzip2)
OPENSSL_PATH=$(brew --prefix openssl)
READLINE_PATH=$(brew --prefix readline)
LIBXML2_PATH=$(brew --prefix libxml2)
LIBZIP_PATH=$(brew --prefix libzip)
LIBICONV_PATH=$(brew --prefix libiconv)
ONIGURUMA_PATH=$(brew --prefix oniguruma)
TIDY_PATH=$(brew --prefix tidy-html5)

# 设置环境变量
export PKG_CONFIG_PATH="$TIDY_PATH/lib/pkgconfig:$ONIGURUMA_PATH/lib/pkgconfig:$PKG_CONFIG_PATH"
export CONFIGURE_OPTS="\
--with-bz2=$BZIP2_PATH \
--with-openssl=$OPENSSL_PATH \
--with-readline=$READLINE_PATH \
--with-libxml=$LIBXML2_PATH \
--with-libzip=$LIBZIP_PATH \
--with-iconv=$LIBICONV_PATH \
--with-tidy=$TIDY_PATH"

# 编译器设置
export CC=clang
export CXX=clang++
export CXXFLAGS="-std=c++17"
export CFLAGS="-I$(brew --prefix)/include"
export LDFLAGS="-L$(brew --prefix)/lib"

GithubIireAchao:bison-2.7 achao$ source ~/.bash_profile
GithubIireAchao:bison-2.7 achao$ phpenv install 8.3.5
[Info]: Loaded extension plugin
[Info]: Loaded apc Plugin.
[Info]: Loaded composer Plugin.
[Info]: Loaded github Plugin.
[Info]: Loaded uprofiler Plugin.
[Info]: Loaded xdebug Plugin.
[Info]: Loaded xhprof Plugin.
[Info]: Loaded zendopcache Plugin.
[Info]: php.ini-production gets used as php.ini
[Info]: Building 8.3.5 into /Users/achao/.phpenv/versions/8.3.5
[Downloading]: https://www.php.net/distributions/php-8.3.5.tar.bz2
[Preparing]: /var/tmp/php-build/source/8.3.5
[Compiling]: /var/tmp/php-build/source/8.3.5
[xdebug]: Installing version 3.3.1
[Skipping]: Already downloaded http://xdebug.org/files/xdebug-3.3.1.tgz
[xdebug]: Compiling xdebug in /var/tmp/php-build/source/xdebug-3.3.1
[xdebug]: Installing xdebug configuration in /Users/achao/.phpenv/versions/8.3.5/etc/conf.d/xdebug.ini
[xdebug]: Cleaning up.
Makefile:245: warning: overriding commands for target `test'
Makefile:136: warning: ignoring old commands for target `test'
[Info]: Enabling Opcache...
[Info]: Done
[Info]: The Log File is not empty, but the Build did not fail. Maybe just warnings got logged. You can review the log in /tmp/php-build.8.3.5.20240520165457.log or rebuild with '--verbose' option
[Success]: Built 8.3.5 successfully.
8.3 => 8.3.7
GithubIireAchao:bison-2.7 achao$ phpenv local 8.3.7
8.3.7
GithubIireAchao:bison-2.7 achao$ php -v
PHP 8.3.7 (cli) (built: May 20 2024 16:36:08) (NTS)
Copyright (c) The PHP Group
Zend Engine v4.3.7, Copyright (c) Zend Technologies
    with Zend OPcache v8.3.7, Copyright (c), by Zend Technologies
    with Xdebug v3.3.1, Copyright (c) 2002-2023, by Derick Rethans
GithubIireAchao:bison-2.7 achao$ phpenv local 8.3.5
8.3.5
GithubIireAchao:bison-2.7 achao$ php -v
PHP 8.3.5 (cli) (built: May 20 2024 16:56:06) (NTS)
Copyright (c) The PHP Group
Zend Engine v4.3.5, Copyright (c) Zend Technologies
    with Zend OPcache v8.3.5, Copyright (c), by Zend Technologies
    with Xdebug v3.3.1, Copyright (c) 2002-2023, by Derick Rethans
GithubIireAchao:bison-2.7 achao$ 

```

可以看到很方便地管理`php`版本
