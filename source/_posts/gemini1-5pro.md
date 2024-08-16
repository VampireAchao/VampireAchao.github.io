---
title: gemini1.5pro
date: 2024-03-23 18:56:40
tags: 软件及插件
---

> 生命的定义就是拥有明天。——冯骥才

`google`的`gemini1.5pro`免费用

https://aistudio.google.com/app/prompts/new_chat

非常好用，快赶上`gpt4`了

![](/imgs/oss/blog-img/2024-03-23-18-58-24-image.png)

回答如下：

**HTML 代码：**

```html
<!DOCTYPE html>
<html>
<head>
  <title>2048</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

<h1>2048</h1>

<div class="container">
  <div class="grid">
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
  </div>
</div>

<script src="main.js"></script>

</body>
</html>
```

content_copyUse code [with caution](https://support.google.com/legal/answer/13505487).Html

**CSS 代码（style.css）：**

```css
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}

h1 {
  text-align: center;
  margin-top: 50px;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 100px);
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 100px);
  grid-template-rows: repeat(4, 100px);
  grid-gap: 20px;
}

.cell {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  background-color: #ccc;
  font-size: 30px;
  text-align: center;
  line-height: 100px;
}
```

content_copyUse code [with caution](https://support.google.com/legal/answer/13505487).Css

**JavaScript 代码（main.js）：**

```javascript
const grid = document.querySelector('.grid');
const cells = Array.from(document.querySelectorAll('.cell'));

let gridData = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
];

function generateRandomNumber() {
  return Math.random() < 0.9 ? 2 : 4;
}

function generateRandomCell() {
  const emptyCells = cells.filter(cell => cell.textContent === '');
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  emptyCells[randomIndex].textContent = generateRandomNumber();
}

function moveUp() {
  for (let col = 0; col < 4; col++) {
    for (let row = 1; row < 4; row++) {
      if (gridData[row][col] !== 0) {
        let currentRow = row;
        while (currentRow > 0 && gridData[currentRow - 1][col] === 0) {
          gridData[currentRow - 1][col] = gridData[currentRow][col];
          gridData[currentRow][col] = 0;
          currentRow--;
        }
      }
    }
  }
}

function moveDown() {
  for (let col = 0; col < 4; col++) {
    for (let row = 2; row >= 0; row--) {
      if (gridData[row][col] !== 0) {
        let currentRow = row;
        while (currentRow < 3 && gridData[currentRow + 1][col] === 0) {
          gridData[currentRow + 1][col] = gridData[currentRow][col];
          gridData[currentRow][col] = 0;
          currentRow++;
        }
      }
    }
  }
}

function moveLeft() {
  for (let row = 0; row < 4; row++) {
    for (let col = 1; col < 4; col++) {
      if (gridData[row][col] !== 0) {
        let currentCol = col;
        while (currentCol > 0 && gridData[row][currentCol - 1] === 0) {
          gridData[row][currentCol - 1] = gridData[row][currentCol];
          gridData[row][currentCol] = 0;
          currentCol--;
        }
      }
    }
  }
}

function moveRight() {
  for (let row = 0; row < 4; row++) {
    for (let col = 2; col >= 0; col--) {
      if (gridData[row][col] !== 0) {
        let currentCol = col;
        while (currentCol < 3 && gridData[row][currentCol + 1] === 0) {
          gridData[row][currentCol + 1] = gridData[row][currentCol];
          gridData[row][currentCol] = 0;
          currentCol++;
        }
      }
    }
  }
}

function updateGrid() {
  cells.forEach((cell, index) => {
    cell.textContent = gridData[Math.floor(index / 4)][index % 4];
  });
}

function handleKeyDown(e) {
  switch (e.key) {
    case 'ArrowUp':
      moveUp();
      break;
    case 'ArrowDown':
      moveDown();
      break;
    case 'ArrowLeft':
      moveLeft();
      break;
    case 'ArrowRight':
      moveRight();
      break;
  }
  generateRandomCell();
  updateGrid();
}

generateRandomCell();
generateRandomCell();
updateGrid();

document.addEventListener('keydown', handleKeyDown);
```

content_copyUse code [with caution](https://support.google.com/legal/answer/13505487).JavaScript

**使用方法：**

1. 将上面的代码保存为 HTML、CSS 和 JavaScript 文件。

2. 在浏览器中打开 HTML 文件。

3. 使用箭头键玩游戏。

**注意：**

- 此代码是一个基本的 2048 游戏实现，你可以根据需要进行自定义。

- 游戏的样式可以通过 CSS 代码进行调整。
