---
title: 箭头函数与this指向探究
date: 2021-11-13 15:41:50
tags: 前端
---

> 我有明珠一颗，久被尘劳关锁，一朝尘净光生，照破山河万朵。——柴陵郁禅师

今天研究了下箭头函数与`this`，发现了一些挺好玩的特性

首先，我们在控制台输入上这段`js`

```javascript
var handler = {
    name :'handler',
    init: function() {
    let init1 = function(event) {
        console.log("init1: ", this);
        let init5 = function(){
            console.log("init5: ", this);
        }
        init5();    // init5:  Window {window: Window, self: Window, document: document, name: '', location: Location, …}
    };
    init1()    // init1:  Window {window: Window, self: Window, document: document, name: '', location: Location, …} 
    let init2 = () => console.log("init2: ", this);
    init2.call()    // init2:  {name: 'handler', init: ƒ}
    let init3 = () => {
        let init4 = ()=> console.log("init4: ", this);
        init4()    // init4:  {name: 'handler', init: ƒ}
    }
    init3.apply();
  },
};
handler.init();
```

![image-20211113165351571](/imgs/oss/picGo/image-20211113165351571.png)

可以明显的看到，箭头函数是锁定了`this`指向的，这里的箭头函数中的`this`都指向这个`handler`对象

而使用`function`声明的函数中的`this`永远指向外部的`window`对象

我们再到`webpack`构建的`vue`项目中尝试

```javascript
		printThis() {
			console.log("printThis", this);		// VueComponent {_uid: 2, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: VueComponent, …}

			function print1() {
				console.log("print1: ", this);		// undefined

				function print2() {
					console.log("print2: ", this);		// undefined
					let print3 = () => void console.log("print3: ", this);		// undefined
					print3.apply()
				}
				print2.call();
				let print4 = () => void console.log("print4: ", this);		// undefined
				print4.apply();
			}
			print1.call();

			let print5 = () => {
				console.log("print5: ", this)		// VueComponent {_uid: 2, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: VueComponent, …}
				let print6 = () => console.log("print6: ", this);		// VueComponent {_uid: 2, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: VueComponent, …}
				print6.call();
			};
			print5();
		}
```

![image-20211113171322127](/imgs/oss/picGo/image-20211113171322127.png)

可以看到这里的箭头函数中的`this`都为`undefined`

而使用`function`声明的函数仍然指向当前`Vue`组件实例

了解这个特性，能清楚`this`的具体指向，方便后续前端开发
