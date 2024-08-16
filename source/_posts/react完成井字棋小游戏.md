---
title: react完成井字棋小游戏
date: 2022-02-23 18:06:07
tags: 前端
---

> 人生就像迷宫，我们用上半生找寻入口，用下半生找寻出口。——朱德庸
>

[上次](https://VampireAchao.github.io/2022/02/16/react%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B/)说到我们按照[官方文档](https://react.docschina.org/tutorial/tutorial.html)体验了一下`React`

这次我们搭建本地`react`开发环境，首先需要将`node`升级到`14`以上并且`npm`需要`5.6`以上，这个去[官网](https://VampireAchao.github.io/2021/08/02/nodejs%E4%BB%A5%E5%BE%80%E7%89%88%E6%9C%AC/)下载安装包覆盖安装即可

然后我们按照教程创建项目

```shell
npx create-react-app my-app
```

> 注意
>
> 第一行的 `npx` 不是拼写错误 —— 它是 [npm 5.2+ 附带的 package 运行工具](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)。

然后删除`src`目录下的默认文件，创建一个`index.css`以及`index.js`

**index.css**

```css
body {
    font: 14px "Century Gothic", Futura, sans-serif;
    margin: 20px;
  }
  
  ol, ul {
    padding-left: 30px;
  }
  
  .board-row:after {
    clear: both;
    content: "";
    display: table;
  }
  
  .status {
    margin-bottom: 10px;
  }
  
  .square {
    background: #fff;
    border: 1px solid #999;
    float: left;
    font-size: 24px;
    font-weight: bold;
    line-height: 34px;
    height: 34px;
    margin-right: -1px;
    margin-top: -1px;
    padding: 0;
    text-align: center;
    width: 34px;
  }
  
  .square:focus {
    outline: none;
  }
  
  .kbd-navigation .square:focus {
    background: #ddd;
  }
  
  .game {
    display: flex;
    flex-direction: row;
  }
  
  .game-info {
    margin-left: 20px;
  }
```

然后是`index.js`

```jsx
class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {/* TODO */}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square />;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
```

完成后按照[教程](https://react.docschina.org/tutorial/tutorial.html#overview)一步一步来

做到最后实现了整个功能，我还进行了总结中的拓展

> 如果你还有充裕的时间，或者想练习一下刚刚学会的 React 新技能，这里有一些可以改进游戏的想法供你参考，这些功能的实现顺序的难度是递增的：
>
> 1. 在游戏历史记录列表显示每一步棋的坐标，格式为 (列号, 行号)。
> 2. 在历史记录列表中加粗显示当前选择的项目。
> 3. 使用两个循环来渲染出棋盘的格子，而不是在代码里写死（hardcode）。
> 4. 添加一个可以升序或降序显示历史记录的按钮。
> 5. 每当有人获胜时，高亮显示连成一线的 3 颗棋子。
> 6. 当无人获胜时，显示一个平局的消息。

最后我的`index.js`为：

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (<button className='square' style={{ color: props.highlight ? 'red' : '' }} onClick={props.onClick}>{props.value}</button>)
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = { squares: Array(9).fill(null), xIsNext: true, line: null }
    }

    renderSquare(i) {
        return <Square highlight={this.props.line?.includes(i)} key={i} value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
    }

    render() {
        let index = 0
        // 3.使用两个循环来渲染出棋盘的格子，而不是在代码里写死（hardcode）。
        return (
            <div>
                {[1, 2, 3].map(i => (
                    <div key={i} className='board-row'>
                        {Array(3).fill(null).map(() => this.renderSquare(index++))}
                    </div>
                ))}
            </div>);
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{ squares: Array(9).fill(null), index: null }],
            stepNumber: 0,
            xIsNext: true,
            historyIsDesc: false
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1]
        const squares = current.squares.slice()
        if (calculateWinner(squares).winner || squares[i]) {
            return
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'
        // 1.在游戏历史记录列表显示每一步棋的坐标，格式为 (列号, 行号)。
        let row = i + 1;
        let cell = 1;
        while (row > 3) {
            row -= 3;
            cell++;
        }

        this.setState({
            history: history.concat([{ squares, index: { row, cell } }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        })
    }

    changeHistoryOrderBy() {
        this.setState({ ...this.state, historyIsDesc: !this.state.historyIsDesc })
    }

    jumpTo(stepNumber) {
        this.setState({
            stepNumber, xIsNext: (stepNumber % 2) === 0
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const { winner, line } = calculateWinner(current.squares);
        let historyIsDesc = this.state.historyIsDesc;

        const moves = history.map((step, move) => {
            // console.log({ '步数': move, '记录': step.squares, '坐标': step.index, '是否选中': this.state.stepNumber == move })

            const desc = move ? `Go to move #${move} (${step.index.row},${step.index.cell})` : 'Go to game start';
            return (
                <li key={move}>
                    {/* 2.在历史记录列表中加粗显示当前选择的项目。 */}
                    <button style={{ fontWeight: this.state.stepNumber == move ? 'bold' : '' }} onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            // 6.当无人获胜时，显示一个平局的消息。
            // console.log({ 'this.state.stepNumber': this.state.stepNumber })
            if (this.state.stepNumber < 9) {
                status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
            } else {
                status = 'Draw!';
            }
        }


        return (
            <div className="game">
                <div className="game-board">
                    <Board line={line} squares={current.squares} onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    {/* 4.添加一个可以升序或降序显示历史记录的按钮。 */}
                    <button onClick={() => this.changeHistoryOrderBy()}>{`切换为${historyIsDesc ? '升' : '降'}序显示历史记录`}</button>
                    <ol>{historyIsDesc ? moves.reverse() : moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);


function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        // console.log([a, b, c])
        // console.log({ 'squares[a]': squares[a], 'squares[b]': squares[b], 'squares[c]': squares[c] })
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            // 5.每当有人获胜时，高亮显示连成一线的 3 颗棋子。
            return { winner: squares[a], line: [a, b, c] };
        }
    }
    return {};
}
```

完整代码放到了码云：https://gitee.com/VampireAchao/simple-react.git
