---
title: threejs+vite+ts实现官网基础部分
date: 2023-10-03 10:12:59
tags: 前端
---

> 一个温柔的目光，一句由衷的话语，能使人忍受生活给他的许多磨难。——高尔基

官方文档：
[three.js manual](https://threejs.org/manual/#zh/fundamentals)

源代码从这里改进：

[GitHub - PacktPublishing/Learn-Three.js-Fourth-edition: Learn Three.js, Fourth edition, published by Packt](https://github.com/PacktPublishing/Learn-Three.js-Fourth-edition)

我本地进行了一些修改，首先`package.json`

```json
{
  "name": "three-ts",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "@types/three": "^0.146.0",
    "typescript": "^4.6.4",
    "vite": "^3.2.3"
  },
  "dependencies": {
    "three": "^0.146.0"
  }
}
```

`tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ESNext", "DOM"],
    "moduleResolution": "Node",
    "strict": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "noEmit": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + TS</title>
  </head>
  <body>
    <canvas id="c"></canvas>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

`src/main.ts`

```typescript
import './style.css'
import { initThreeJsScene } from './threeCanvas'

const mainElement = document.querySelector<HTMLDivElement>('#c')
if (mainElement) {
  initThreeJsScene(mainElement)
}
```

`src/style.css`

```css
html, body {
    margin: 0;
    height: 100%;
 }
 #c {
    width: 100%;
    height: 100%;
    display: block;
 }
```

`src/threeCanvas.ts`

```typescript
import * as THREE from "three";

export const initThreeJsScene = (canvas: HTMLDivElement) => {
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

  const fov = 75; // AKA Field of View
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  camera.position.z = 2;

  const scene = new THREE.Scene();

  {
    const color = 0xffffff;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  function makeInstance(geometry: THREE.BoxGeometry, color: number, x: number) {
    const material = new THREE.MeshPhongMaterial({ color });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;

    return cube;
  }

  const cubes = [
    makeInstance(geometry, 0x44aa88, 0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844, 2),
  ];

  function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = canvas.clientWidth * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time: number) {
    time *= 0.001; // 将时间单位变为秒

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * 0.1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });
    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
};
```

效果大致如下：

![](/imgs/oss/picGo/20231003102943.png)
