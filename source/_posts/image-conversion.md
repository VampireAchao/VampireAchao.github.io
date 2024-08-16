---
title: image-conversion
date: 2023-06-07 21:45:53
tags: 前端
---

> 失之毫厘，差之千里。——佚名

分享一个`js`图像库：

https://github.com/WangYuLue/image-conversion

![image-20230607220756452](/imgs/oss/blog/vampireachao/image-20230607220756452.png)

![xmind](/imgs/oss/blog/vampireachao/xmind.png)

> ### Install
>
> ```
> npm i image-conversion --save
> 
> # or 
> 
> yarn add image-conversion
> ```
>
> ### Include the library
>
> in browser:
>
> ```
> <script src="https://cdn.jsdelivr.net/gh/WangYuLue/image-conversion/build/conversion.js"></script>
> ```
>
> in CommonJS:
>
> ```
> const imageConversion = require("image-conversion");
> ```
>
> in ES6:
>
> ```
> import * as imageConversion from 'image-conversion';
> ```
>
> or
>
> ```
> import {compress, compressAccurately} from 'image-conversion';
> ```
>
> ### Use examples
>
> ```
> <input id="demo" type="file" onchange="view()">
> ```
>
> 1. Compress image to 200kb:
>
> ```
> function view(){
>   const file = document.getElementById('demo').files[0];
>   console.log(file);
>   imageConversion.compressAccurately(file,200).then(res=>{
>     //The res in the promise is a compressed Blob type (which can be treated as a File type) file;
>     console.log(res);
>   })
> }
> 
> // or use an async function
> async function view() {
>   const file = document.getElementById('demo').files[0];
>   console.log(file);
>   const res = await imageConversion.compressAccurately(file,200)
>   console.log(res);
> }
> ```
>
> 1. Compress images at a quality of 0.9
>
> ```
> function view(){
>   const file = document.getElementById('demo').files[0];
>   console.log(file);
>   imageConversion.compress(file,0.9).then(res=>{
>     console.log(res);
>   })
> }
> ```