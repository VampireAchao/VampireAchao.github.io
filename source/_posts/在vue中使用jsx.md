---
title: 在vue中使用jsx
date: 2022-06-17 19:25:31
tags: 前端
---

> 一个人追求的目标越高，他的才能就发展得越快，对社会就越有益，我确信这也是一个真理。——玛克西姆·高尔基

首先是官方文档

`vue2`的：https://cn.vuejs.org/v2/guide/render-function.html#JSX

`vue3`的：https://v3.cn.vuejs.org/guide/render-function.html#jsx

我们这里以`vue2`举例：

先使用`render`函数写一个最简单的`jsx`组件

```vue
<script>
export default {
    render() {
        return <div>Hello World</div>
    }
}
</script>

<style>
</style>
```

注意此处不能有`template`标签，其他的该咋用就咋用

还有的区别在这个链接里：https://github.com/vuejs/jsx#installation

如果有`react`的基础，上手这个就很容易啦

```jsx
<div id="ul" class="ul">
    {Array.from({ length: 20 }, (i, len) => (
        <div class="li">
            <div class={"mar mar" + len}>
                <span class="checkbox"></span>
                <input type="checkbox" />
            </div>
        </div>
    ))}
</div>
```

注意要使用`v-html`时，应更换为

```jsx
<p domPropsInnerHTML={html} />
```

其他类似的按照链接内容中即可

> # Babel Preset JSX
>
> Configurable Babel preset to add Vue JSX support. See the [configuration options here](https://github.com/vuejs/jsx-vue2/blob/dev/packages/babel-preset-jsx).
>
> ## Compatibility
>
> This repo is only compatible with:
>
> - **Babel 7+**. For Babel 6 support, use [vuejs/babel-plugin-transform-vue-jsx](https://github.com/vuejs/babel-plugin-transform-vue-jsx)
> - **Vue 2+**. JSX is not supported for older versions. For Vue 3 support, there is an experimental plugin available as [@ant-design-vue/babel-plugin-jsx](https://github.com/vueComponent/jsx).
>
> ## Installation
>
> Install the preset with:
>
> ```
> npm install @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props
> ```
>
> Then add the preset to `babel.config.js`:
>
> ```
> module.exports = {
>   presets: ['@vue/babel-preset-jsx'],
> }
> ```
>
> ## Syntax
>
> ### Content
>
> ```
> render() {
>   return <p>hello</p>
> }
> ```
>
> with dynamic content:
>
> ```
> render() {
>   return <p>hello { this.message }</p>
> }
> ```
>
> when self-closing:
>
> ```
> render() {
>   return <input />
> }
> ```
>
> with a component:
>
> ```
> import MyComponent from './my-component'
> 
> export default {
>   render() {
>     return <MyComponent>hello</MyComponent>
>   },
> }
> ```
>
> ### Attributes/Props
>
> ```
> render() {
>   return <input type="email" />
> }
> ```
>
> with a dynamic binding:
>
> ```
> render() {
>   return <input
>     type="email"
>     placeholder={this.placeholderText}
>   />
> }
> ```
>
> with the spread operator (object needs to be compatible with [Vue Data Object](https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth)):
>
> ```
> render() {
>   const inputAttrs = {
>     type: 'email',
>     placeholder: 'Enter your email'
>   }
> 
>   return <input {...{ attrs: inputAttrs }} />
> }
> ```
>
> ### Slots
>
> named slots:
>
> ```
> render() {
>   return (
>     <MyComponent>
>       <header slot="header">header</header>
>       <footer slot="footer">footer</footer>
>     </MyComponent>
>   )
> }
> ```
>
> scoped slots:
>
> ```
> render() {
>   const scopedSlots = {
>     header: () => <header>header</header>,
>     footer: () => <footer>footer</footer>
>   }
> 
>   return <MyComponent scopedSlots={scopedSlots} />
> }
> ```
>
> ### Directives
>
> ```
> <input vModel={this.newTodoText} />
> ```
>
> with a modifier:
>
> ```
> <input vModel_trim={this.newTodoText} />
> ```
>
> with an argument:
>
> ```
> <input vOn:click={this.newTodoText} />
> ```
>
> with an argument and modifiers:
>
> ```
> <input vOn:click_stop_prevent={this.newTodoText} />
> ```
>
> v-html:
>
> ```
> <p domPropsInnerHTML={html} />
> ```
>
> ### Functional Components
>
> Transpiles arrow functions that return JSX into functional components, when they are either default exports:
>
> ```
> export default ({ props }) => <p>hello {props.message}</p>
> ```
>
> or PascalCase variable declarations:
>
> ```
> const HelloWorld = ({ props }) => <p>hello {props.message}</p>
> ```