---
title: 'activeError: error:0308010C:digital envelope routines::unsupported'
date: 2022-11-07 13:45:23
tags: 前端
---

> 苛求君子，宽纵小人，自以为明察秋毫，而实则反助小人张目——鲁迅

昨天遇到这个报错了：

```shell
PS D:\project\promotion\vue\gridsome-starter-default-master> gridsome develop
Gridsome v0.7.23

Initializing plugins...
Load sources - 0s
Create GraphQL schema - 0.03s
Create pages and templates - 0.15s
Generate temporary code - 0.57s
Bootstrap finish - 8.57s
10% building 1/1 modules 0 activeError: error:0308010C:digital envelope routines::unsupported
    at new Hash (node:internal/crypto/hash:67:19)
    at Object.createHash (node:crypto:130:10)
    at module.exports (D:\project\promotion\vue\gridsome-starter-default-master\node_modules\webpack\lib\util\createHash.js:135:53)
    at NormalModule._initBuildHash (D:\project\promotion\vue\gridsome-starter-default-master\node_modules\webpack\lib\NormalModule.js:417:16)
    at handleParseError (D:\project\promotion\vue\gridsome-starter-default-master\node_modules\webpack\lib\NormalModule.js:471:10)
    at D:\project\promotion\vue\gridsome-starter-default-master\node_modules\webpack\lib\NormalModule.js:503:5
    at D:\project\promotion\vue\gridsome-starter-default-master\node_modules\webpack\lib\NormalModule.js:358:12
    at D:\project\promotion\vue\gridsome-starter-default-master\node_modules\loader-runner\lib\LoaderRunner.js:373:3
    at iterateNormalLoaders (D:\project\promotion\vue\gridsome-starter-default-master\node_modules\loader-runner\lib\LoaderRunner.js:214:10)
    at iterateNormalLoaders (D:\project\promotion\vue\gridsome-starter-default-master\node_modules\loader-runner\lib\LoaderRunner.js:221:10)
    at D:\project\promotion\vue\gridsome-starter-default-master\node_modules\loader-runner\lib\LoaderRunner.js:236:3
    at runSyncOrAsync (D:\project\promotion\vue\gridsome-starter-default-master\node_modules\loader-runner\lib\LoaderRunner.js:130:11)
    at iterateNormalLoaders (D:\project\promotion\vue\gridsome-starter-default-master\node_modules\loader-runner\lib\LoaderRunner.js:232:2)
    at Array.<anonymous> (D:\project\promotion\vue\gridsome-starter-default-master\node_modules\loader-runner\lib\LoaderRunner.js:205:4)
    at Storage.finished (D:\project\promotion\vue\gridsome-starter-default-master\node_modules\enhanced-resolve\lib\CachedInputFileSystem.js:55:16)
    at D:\project\promotion\vue\gridsome-starter-default-master\node_modules\enhanced-resolve\lib\CachedInputFileSystem.js:91:9
10% building 1/5 modules 4 active ...\index.js??ref--1-1!D:\project\promotion\vue\gridsome-starter-default-master\node_modules\gridsome\app\entry.sockjs.jsnode:internal/crypto/hash:67
  this[kHandle] = new _Hash(algorithm, xofLen);
                  ^

Error: error:0308010C:digital envelope routines::unsupported
    at new Hash (node:internal/crypto/hash:67:19)
    at Object.createHash (node:crypto:130:10)
    at module.exports (D:\project\promotion\vue\gridsome-starter-default-master\node_modules\webpack\lib\util\createHash.js:135:53)
    at NormalModule._initBuildHash (D:\project\promotion\vue\gridsome-starter-default-master\node_modules\webpack\lib\NormalModule.js:417:16)
    at handleParseError (D:\project\promotion\vue\gridsome-starter-default-master\node_modules\webpack\lib\NormalModule.js:471:10)
    at D:\project\promotion\vue\gridsome-starter-default-master\node_modules\webpack\lib\NormalModule.js:503:5
    at D:\project\promotion\vue\gridsome-starter-default-master\node_modules\webpack\lib\NormalModule.js:358:12
    at D:\project\promotion\vue\gridsome-starter-default-master\node_modules\loader-runner\lib\LoaderRunner.js:373:3
    at iterateNormalLoaders (D:\project\promotion\vue\gridsome-starter-default-master\node_modules\loader-runner\lib\LoaderRunner.js:214:10)
    at Array.<anonymous> (D:\project\promotion\vue\gridsome-starter-default-master\node_modules\loader-runner\lib\LoaderRunner.js:205:4)
    at Storage.finished (D:\project\promotion\vue\gridsome-starter-default-master\node_modules\enhanced-resolve\lib\CachedInputFileSystem.js:55:16)
    at D:\project\promotion\vue\gridsome-starter-default-master\node_modules\enhanced-resolve\lib\CachedInputFileSystem.js:91:9
    at D:\project\promotion\vue\gridsome-starter-default-master\node_modules\graceful-fs\graceful-fs.js:123:16
    at FSReqCallback.readFileAfterClose [as oncomplete] (node:internal/fs/read_file_context:68:3) {
  opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ],
  library: 'digital envelope routines',
  reason: 'unsupported',
  code: 'ERR_OSSL_EVP_UNSUPPORTED'
}

Node.js v17.0.0
```

解决方法，执行：

```shell
$env:NODE_OPTIONS="--openssl-legacy-provider"
```

