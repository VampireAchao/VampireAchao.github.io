---
title: mark-text开发环境搭建启动
date: 2023-07-02 18:04:02
tags: 软件及插件
---

> 没有目的，就做不成任何事情；目的渺小，就做不成任何大事——狄德罗

IDEA的安装就不多赘述了

```bash
achaodeMacBook-Pro:~ achao$ brew install --cask intellij-idea
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/api/cask.jws.json
#=#=#                                                                          
==> Downloading https://raw.githubusercontent.com/Homebrew/homebrew-cask/2b3de06
Already downloaded: /Users/achao/Library/Caches/Homebrew/downloads/03208b267695d41517fe798d19f1a1d3f0ecc722ebac64499965e6529b228d13--intellij-idea.rb
==> Downloading https://download.jetbrains.com/idea/ideaIU-2023.1.3-aarch64.dmg
==> Downloading from https://download.jetbrains.com.cn/idea/ideaIU-2023.1.3-aarc
######################################################################### 100.0%
==> Installing Cask intellij-idea
==> Moving App 'IntelliJ IDEA.app' to '/Applications/IntelliJ IDEA.app'
🍺  intellij-idea was successfully installed!
achaodeMacBook-Pro:~ achao$ 
```

我们打开`idea`，`clone`项目

https://github.com/VampireAchao/marktext.git

来到项目目录终端下执行

按照[说明](https://github.com/VampireAchao/marktext/blob/develop/docs/dev/BUILD.md)里我们进行安装对应版本的`node`以及`yarn`以及`node-gyp`

```bash
chaodeMacBook-Pro:~ achao$ nvm install 16
Downloading and installing node v16.20.1...
Downloading http://mirrors.cloud.tencent.com/nodejs-release//v16.20.1/node-v16.20.1-darwin-arm64.tar.xz...
######################################################################### 100.0%
Computing checksum with shasum -a 256
Checksums matched!
Now using node v16.20.1 (npm v8.19.4)
achaodeMacBook-Pro:~ achao$ npm i yarn -g

added 1 package, and audited 2 packages in 4s

found 0 vulnerabilities
achaodeMacBook-Pro:~ achao$ yarn -v
1.22.19
192:~ achao$ npm install -g node-gyp

added 126 packages, and audited 127 packages in 17s

17 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
192:~ achao$ node-gyp -v
v9.4.0
```

然后是`python`，我们安装`pyenv`

```bash
192:~ achao$ brew install pyenv
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/api/formula.jws.jso
######################################################################### 100.0%
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/api/cask.jws.json
######################################################################### 100.0%
==> Fetching dependencies for pyenv: m4, autoconf, ca-certificates, openssl@3, pkg-config and readline
==> Fetching m4
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/m4-1.4.19.a
######################################################################### 100.0%
==> Fetching autoconf
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/autoconf-2.
######################################################################### 100.0%
==> Fetching ca-certificates
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/ca-certific
######################################################################### 100.0%
==> Fetching openssl@3
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/openssl%403
######################################################################### 100.0%
==> Fetching pkg-config
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/pkg-config-
######################################################################### 100.0%
==> Fetching readline
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/readline-8.
######################################################################### 100.0%
==> Fetching pyenv
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/pyenv-2.3.2
######################################################################### 100.0%
==> Installing dependencies for pyenv: m4, autoconf, ca-certificates, openssl@3, pkg-config and readline
==> Installing pyenv dependency: m4
==> Pouring m4-1.4.19.arm64_ventura.bottle.tar.gz
🍺  /opt/homebrew/Cellar/m4/1.4.19: 13 files, 742.2KB
==> Installing pyenv dependency: autoconf
==> Pouring autoconf-2.71.arm64_ventura.bottle.tar.gz
🍺  /opt/homebrew/Cellar/autoconf/2.71: 71 files, 3.2MB
==> Installing pyenv dependency: ca-certificates
==> Pouring ca-certificates-2023-05-30.arm64_ventura.bottle.tar.gz
==> Regenerating CA certificate bundle from keychain, this may take a while...
🍺  /opt/homebrew/Cellar/ca-certificates/2023-05-30: 3 files, 216.1KB
==> Installing pyenv dependency: openssl@3
==> Pouring openssl@3-3.1.1_1.arm64_ventura.bottle.tar.gz
🍺  /opt/homebrew/Cellar/openssl@3/3.1.1_1: 6,495 files, 28.4MB
==> Installing pyenv dependency: pkg-config
==> Pouring pkg-config-0.29.2_3.arm64_ventura.bottle.tar.gz
🍺  /opt/homebrew/Cellar/pkg-config/0.29.2_3: 11 files, 676KB
==> Installing pyenv dependency: readline
==> Pouring readline-8.2.1.arm64_ventura.bottle.tar.gz
🍺  /opt/homebrew/Cellar/readline/8.2.1: 50 files, 1.7MB
==> Installing pyenv
==> Pouring pyenv-2.3.21.arm64_ventura.bottle.tar.gz
🍺  /opt/homebrew/Cellar/pyenv/2.3.21: 1,083 files, 3.3MB
==> Running `brew cleanup pyenv`...
Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.
Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
192:~ achao$ pyenv -v
pyenv 2.3.21
```

初始化`pyenv`

添加到 `~/.bash_profile` ：

```bash
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bash_profile
echo 'command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bash_profile
echo 'eval "$(pyenv init -)"' >> ~/.bash_profile
```

然后配置镜像

```bash
echo 'export PYTHON_BUILD_MIRROR_URL="https://mirrors.huaweicloud.com/python/"' >> ~/.bash_profile
```

然后安装`python`，这里不知道镜像生效没有，虽然确实设置了

```bash
achaodeMacBook-Pro:~ achao$ echo $PYTHON_BUILD_MIRROR_URL
https://mirrors.huaweicloud.com/python/
achaodeMacBook-Pro:~ achao$ pyenv install 3.10.4
python-build: use openssl from homebrew
python-build: use readline from homebrew
Downloading Python-3.10.4.tar.xz...
-> https://www.python.org/ftp/python/3.10.4/Python-3.10.4.tar.xz
Installing Python-3.10.4...
python-build: use readline from homebrew
python-build: use zlib from xcode sdk
Traceback (most recent call last):
  File "<string>", line 1, in <module>
  File "/Users/achao/.pyenv/versions/3.10.4/lib/python3.10/lzma.py", line 27, in <module>
    from _lzma import *
ModuleNotFoundError: No module named '_lzma'
WARNING: The Python lzma extension was not compiled. Missing the lzma lib?
Installed Python-3.10.4 to /Users/achao/.pyenv/versions/3.10.4
achaodeMacBook-Pro:~ achao$ pyenv global 3.10
achaodeMacBook-Pro:~ achao$ python -V
Python 3.10.4
```

然后是`C++`编译器`xcode`

![](/imgs/oss/picGo/20230629202212.png)

![](/imgs/oss/picGo/20230628213408.png)

这里安装太慢了，我们停止一下，配置一下镜像

```bash
192:~ achao$ yarn config set -g registry http://mirrors.cloud.tencent.com/npm/
yarn config v1.22.19
success Set "http://mirrors.cloud.tencent.com/npm/" to true.
✨  Done in 0.01s.
```

然后点击右下角`Run 'yarn install'`发现没有识别到

![](/imgs/oss/picGo/20230628220857.png)

我们配置下`idea`的`yarn`环境点击`ok`

![](/imgs/oss/picGo/20230628221049.png)

此时依赖开始安装,结果报错

![](/imgs/oss/picGo/20230630200020.png)

说找不到`vscode`。。。

我们打开代理再试试

```bash
achaodeMacBook-Pro:marktext achao$ yarn install
yarn install v1.22.19
$ node .electron-vue/preinstall.js
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
warning file-icons@2.1.47: The engine "atom" appears to be invalid.
warning atom-fs@0.2.1: The engine "atom" appears to be invalid.
warning mapped-disposable@1.0.3: The engine "atom" appears to be invalid.
[3/4] 🔗  Linking dependencies...
warning " > eslint-config-standard@16.0.3" has incorrect peer dependency "eslint@^7.12.1".
warning " > eslint-config-standard@16.0.3" has incorrect peer dependency "eslint-plugin-promise@^4.2.1 || ^5.0.0".
[4/4] 🔨  Building fresh packages...
$ node .electron-vue/postinstall.js && yarn run rebuild && yarn run lint:fix
yarn run v1.22.19
$ electron-rebuild -f
⠇ Building module: ced, Completed: 0  CXX(target) Release/obj.target/compact_enc_det/vendor/compact_enc_det/compact_enc_det/compact_enc_det.o
⠦ Building module: ced, Completed: 0  CXX(target) Release/obj.target/compact_enc_det/vendor/compact_enc_det/compact_enc_det/compact_enc_det_hint_code.o
⠇ Building module: ced, Completed: 0  CXX(target) Release/obj.target/compact_enc_det/vendor/compact_enc_det/util/encodings/encodings.o
⠹ Building module: ced, Completed: 0  CXX(target) Release/obj.target/compact_enc_det/vendor/compact_enc_det/util/languages/languages.o
  LIBTOOL-STATIC Release/compact_enc_det.a
⠏ Building module: ced, Completed: 0  CXX(target) Release/obj.target/ced/ced.o
⠋ Building module: ced, Completed: 0  SOLINK_MODULE(target) Release/ced.node
⠹ Building module: fontmanager-redux, Completed: 1  CXX(target) Release/obj.target/fontmanager/src/FontManager.o
⠧ Building module: fontmanager-redux, Completed: 1  CXX(target) Release/obj.target/fontmanager/src/FontManagerMac.o
⠹ Building module: fontmanager-redux, Completed: 1  SOLINK_MODULE(target) Release/fontmanager.node
⠴ Building module: native-keymap, Completed: 3  CXX(target) Release/obj.target/keymapping/src/string_conversion.o
⠧ Building module: native-keymap, Completed: 3  CXX(target) Release/obj.target/keymapping/src/keymapping.o
⠋ Building module: native-keymap, Completed: 3  CXX(target) Release/obj.target/keymapping/src/keyboard_mac.o
⠦ Building module: native-keymap, Completed: 3  SOLINK_MODULE(target) Release/keymapping.node
✔ Rebuild Complete
✨  Done in 50.71s.
yarn run v1.22.19
$ eslint --ext .js,.vue -f ./node_modules/eslint-friendly-formatter --fix src test
✨  Done in 5.94s.
✨  Done in 108.28s.
```

成功执行！咱们启动下项目

```bash
yarn dev
```

![](/imgs/oss/picGo/20230630203110.png)
