---
title: react中什么情况下不能用index作为key
date: 2022-03-10 18:17:14
tags: 前端
---

> 立志用功如种树然，方其根芽，犹未有干；及其有干，尚未有枝；枝而后叶，叶而后花。——王守仁

我们在`React`遍历渲染列表时会遇到这样一个报错：

![image-20220310181948529](/imgs/oss/picGo/image-20220310181948529.png)

意思是说，渲染`list`列表时必须给每个元素指定一个唯一的[`key`](https://zh-hans.reactjs.org/docs/glossary.html#keys)

当然你可以选择忽略这个报错，但是为什么会提示这个报错呢？

假设我们给`key`指定一个随机数，或者干脆不指定的话，会怎么样呢？

官方文档给出了答案：

[渲染列表时的逻辑以及问题](https://zh-hans.reactjs.org/docs/reconciliation.html#recursing-on-children)

[为了解决上述问题，React 引入了 `key` 属性。](https://zh-hans.reactjs.org/docs/reconciliation.html#keys)

也就是说，如果给`key`指定一个随机数，或者干脆不指定的话，会造成性能问题

这个时候，我们想到了用遍历时的元素下标作为`key`

但是官方文档明确告诉我们：

> 如果列表项目的顺序可能会变化，我们不建议使用索引来用作 key 值，因为这样做会导致性能变差，还可能引起组件状态的问题。可以看看 Robin Pokorny 的[深度解析使用索引作为 key 的负面影响](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318)这一篇文章。如果你选择不指定显式的 key 值，那么 React 将默认使用索引用作为列表项目的 key 值。

这里`Robin Pokirny`的文章中提到了，如果满足这三者，可以放心使用`index`作为`key`

- 列表和项目是静态的——它们不会被计算，也不会改变

- 列表中的项目没有ID

- 列表永远不会被重新排序或过滤

我精简了文章`Demo`中的了代码，代码如下：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>index-as-a-key-is-an-anti-pattern</title>
  </head>
  <body>
    <!-- We will put our React component inside this div. -->
    <div id="root"></div>

    <!-- Load React. -->
    <!-- Note: when deploying, replace "development.js" with "production.min.js". -->
    <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

    <!-- Load our React component. --> 
    <script src="index.js" type="text/babel"></script>

  </body>
</html>
```

`index.js`：

```jsx
class Item extends React.Component {
    render() {
        return (
            <div className="form-group">
                <label>{this.props.name}</label>
                <input type="text" />
            </div>
        )
    }
}

class Example extends React.Component {
    constructor() {
        super();
        this.state = {
            list: [
                { name: '原来有的: 1444610101010', id: 1444610101010 },
                { name: '原来有的: 1444600000000', id: 1444600000000 }
            ]
        };
    }

    addItem() {
        const id = +new Date;
        this.setState(state => ({ list: [{ name: '新增的' + id, id }, ...state.list] }));
    }

    render() {
        return (
            <div>
                <button className='btn btn-primary' onClick={this.addItem.bind(this)}><b>Add item</b> to the beginning of the list</button>
                <h3>Dangerous <code>key=index</code></h3>
                <form>
                    {this.state.list.map((todo, index) =>
                        <Item {...todo}
                            key={index}
                             />
                    )}
                </form>

                <h3>Better <code>key=id</code></h3>
                <form>
                    {this.state.list.map((todo) =>
                        <Item {...todo}
                            key={todo.id} />
                    )}
                </form>

            </div>
        )
    }

}

ReactDOM.render(<Example />, document.querySelector('#root'))
```

这里效果如下：

![image-20220310182950601](/imgs/oss/picGo/image-20220310182950601.png)

两个`list`中，第一个是使用`index`作为`key`的，第二个是用的`id`作为`key`

我们在文本框随便写点什么

![image-20220310183521232](/imgs/oss/picGo/image-20220310183521232.png)

此时我们点击按钮，新增一行，神奇的事情发生了

![image-20220310183551048](/imgs/oss/picGo/image-20220310183551048.png)

我们可以看到第一个`list`出现了错误，我们新增的一行文本框中竟然包含了原来有的文本框的值，并且列表中下方其他的文本框也错乱了

而我们使用`id`作为`key`的就没有出现这种问题。。。因此，我们在不满足上面说的三种条件时，在`react`中尽量不要使用元素下标作为`key`