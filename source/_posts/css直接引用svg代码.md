---
title: css直接引用svg代码
date: 2022-12-28 20:39:02
tags: 前端
---

> 一切安乐，无不来自困苦。——《我是猫》

有些时候我们想直接引入一个`svg`图标，又不想创建`svg`文件，或者编写`svg`代码到`html`中，想直接在`css`中引入

可以转码+加前缀直接引用，这是一段`svg`代码

```svg
<!-- svg: first layer -->
<svg viewBox='0 0 161 161' xmlns='http://www.w3.org/2000/svg'>
  <filter id='noiseFilter'>
    <feTurbulence 
      type='fractalNoise' 
      baseFrequency='0.65' 
      numOctaves='3' 
      stitchTiles='stitch'/>
  </filter>
  
  <rect width='100%' height='100%' filter='url(#noiseFilter)'/>
</svg>
```

我们复制下来，用<code>&grave;</code>包裹，转码然后加个前缀

```javascript
const svg = `<!-- svg: first layer -->
<svg viewBox='0 0 161 161' xmlns='http://www.w3.org/2000/svg'>
  <filter id='noiseFilter'>
    <feTurbulence 
      type='fractalNoise' 
      baseFrequency='0.65' 
      numOctaves='3' 
      stitchTiles='stitch'/>
  </filter>
  
  <rect width='100%' height='100%' filter='url(#noiseFilter)'/>
</svg>`;
`url("data:image/svg+xml,${svg.replace(/[\r\n%#()<>?[\\\]^`{|}]/g,encodeURIComponent)}")`
```

得到的地址，我们放入`background`中：

![image-20221228210255472](/imgs/oss/blog/vampireachao/image-20221228210255472.png)

效果很棒

思路来源：

https://css-tricks.com/grainy-gradients/

https://grainy-gradients.vercel.app/