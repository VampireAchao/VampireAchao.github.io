---
title: setState异步问题
date: 2022-04-07 12:48:40
tags: 前端
---

> 若人间有情，那是开始，也是尽头。——北岛怀念顾城

今天使用`react`中`setState`后立马从`state`中获取，然后使用，发现时灵时不灵的，我立马意识到`setState`可能是异步的，翻看[官方文档](https://zh-hans.reactjs.org/docs/faq-state.html#why-is-setstate-giving-me-the-wrong-value)，果然：

> 调用 `setState` 其实是异步的 —— 不要指望在调用 `setState` 之后，`this.state` 会立即映射为新的值。如果你需要基于当前的 state 来计算出新的值，那你应该传递一个函数，而不是一个对象（详情见下文）。
>
> 代码*不会*像预期那样运行的示例：
>
> ```
> incrementCount() {
>   // 注意：这样 *不会* 像预期的那样工作。
>   this.setState({count: this.state.count + 1});
> }
> 
> handleSomething() {
>   // 假设 `this.state.count` 从 0 开始。
>   this.incrementCount();
>   this.incrementCount();
>   this.incrementCount();
>   // 当 React 重新渲染该组件时，`this.state.count` 会变为 1，而不是你期望的 3。
> 
>   // 这是因为上面的 `incrementCount()` 函数是从 `this.state.count` 中读取数据的，
>   // 但是 React 不会更新 `this.state.count`，直到该组件被重新渲染。
>   // 所以最终 `incrementCount()` 每次读取 `this.state.count` 的值都是 0，并将它设为 1。
> 
>   // 问题的修复参见下面的说明。
> }
> ```

处理方式也给出了，那就是在`setState`里传递一个函数

> 传递一个函数可以让你在函数内访问到当前的 state 的值。因为 `setState` 的调用是分批的，所以你可以链式地进行更新，并确保它们是一个建立在另一个之上的，这样才不会发生冲突：

写法改为如下：

```react
incrementCount() {
  this.setState((state) => {
    // 重要：在更新的时候读取 `state`，而不是 `this.state`。
    return {count: state.count + 1}
  });
}

handleSomething() {
  // 假设 `this.state.count` 从 0 开始。
  this.incrementCount();
  this.incrementCount();
  this.incrementCount();

  // 如果你现在在这里读取 `this.state.count`，它还是会为 0。
  // 但是，当 React 重新渲染该组件时，它会变为 3。
}
```

我们在更新`state`后立马取值操作就可以放入`setState`这个参数中的函数内部去执行