#!/bin/bash

## 加载 nvm
#export NVM_DIR="$HOME/.nvm"
#[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
#[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
#
## 使用 node 14
#nvm use 14
#
## 确保 cnpm 在路径中
#export PATH=$PATH:~/.npm-global/bin
#
#cd ./node_modules/hexo-generator-json-content
## 卸载新版本
#npm uni hexo-util
## 安装 2.7版本
#npm i hexo-util@2.7
#cd ../../
hexo clean
git add .
git commit -m ":trollface:"
git branch --set-upstream-to=origin/main
git pull --allow-unrelated-histories
git push
hexo g
hexo d

read -n 1
