---
title: react快速上手
date: 2022-02-16 21:02:51
tags: 前端
---

> 一个人能否有成就，只看他是否具备自尊心与自信心两个条件。——苏格拉底

今天想简单玩玩`React`，我们打开`React`官方文档：

https://react.docschina.org/

点击入门教程

![image-20220216210416773](/imgs/oss/picGo/image-20220216210416773.png)

通过简单的介绍后，我们开始代码编写

打开提供的在线初始代码(我们之后再搭建本地开发环境来完成这个游戏，今天暂时只做一个简单入门)：

https://codepen.io/gaearon/pen/oWWQNa?editors=0010

打开`codepen`提供的在线编辑器，看到初始代码后，我们可以开始尝试编写

注意看文档，这里三个`React`组件`Square`正方形、`Board`画板以及`Game`游戏

看到代码中的结构为主入口：

```react
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
```

其中通过`root`这个`id`绑定了一个节点，包含了一个`Game`组件

```react
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
```

这个`Game`组件又包含了`Board`画板组件

```react
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
```

画板`Board`组件中的外部`div`包含了四个`div`分别是显示井字棋玩家状态(下次落子为`X`还是`O`)，这里用`{status}`获取到了上面申明的变量`status`

然后是三个`className`为`board-row`的`div`，其中每一个`div`又包含了三个`Square`组件：

```react
class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {/* TODO */}
      </button>
    );
  }
}
```

`Square`正方形组件包含了一个`button`标签，最后形成的效果就是一个状态，九个按钮：

![image-20220216213416147](/imgs/oss/picGo/image-20220216213416147.png)

然后我们可以开始修改代码了

首先是在`Board`中给`Square`组件传入一个`value`：

```react
class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }    
...
}
```

然后再到`Square`中渲染出来这个`value`

```react
class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {this.props.value}
      </button>
    );
  }
}
```

修改完我们的代码，很快就渲染生效了，可以看到数字渲染了出来

![image-20220216213947991](/imgs/oss/picGo/image-20220216213947991.png)

我们在给每个`Square`中的`button`添加一个点击事件：

```react
class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={function() { alert('click'); }}>
        {this.props.value}
      </button>
    );
  }
}
```

添加完成后我们再次点击，可以看到弹出了弹框

我们接下来给`Square`新增一个状态`state`，让它可以实现我们的点击前为空，点击后渲染

```react
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }
  
  render() {
    return (
      <button
        className="square"
        onClick={() => this.setState({value: 'X'})}
      >
        {this.state.value}
      </button>
    );
  }
}
```

现在我们每点击一次，就可以留下一个`X`作为标记啦

![image-20220216215314980](/imgs/oss/picGo/image-20220216215314980.png)

之后我们在完成剩下的部分吧~