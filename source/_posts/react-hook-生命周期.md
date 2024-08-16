---
title: react hook 生命周期
date: 2022-04-06 19:38:18
tags: 前端
---

> 诚实的生活方式其实是按照自己身体的意愿行事，饿的时候才吃饭，爱的时候不必撒谎。——马尔克斯《霍乱时期的爱情》

官方文档：https://zh-hans.reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect

直接上代码：

```javascript
'use strict';

function LikeButton() {
    const [liked, setLiked] = React.useState(false)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        // 只执行一次
        setInterval(() => setCount(state => ++state), 1000)
    }, [])

    return (
        <button onClick={() => setLiked(!liked)} >
            {liked ? <ButtonText count={count} /> : '不喜欢'}
        </button>
    );
}
function ButtonText({ count }) {

    React.useEffect(() => {
        // 只执行一次
        console.log`我来了`
        // 组件销毁时执行一次
        return () => console.log`我溜了`
    }, [])

    React.useEffect(() => {
        // 当props.count发生变更时触发
        console.log`${{ count }}`
    }, [count])

    React.useEffect(() => {
        // 有变更时触发
        console.log`风吹草动`
    })


    return (
        <div>{count}</div>
    )
}
ReactDOM.render(<LikeButton />, document.querySelector('#like_button_container'))
```

可参考官网`effect`一节

效果：

初始化

![image-20220406194145903](/imgs/oss/picGo/image-20220406194145903.png)

点击按钮

![image-20220406194157841](/imgs/oss/picGo/image-20220406194157841.png)

再次点击，销毁

![image-20220406194214207](/imgs/oss/picGo/image-20220406194214207.png)