---
title: 一篇，让你会写原生ajax
date: 2020-09-17 20:23:56
tags: 前端
---

> 

> 在这个社会转型期，最大的悲剧不是坏人的嚣张，而是好人的过度沉默。——马丁·路德·金

非常简单啦~

大家可以拿去任意定制，比如请求方式使用参数传入、指定参数类型、调用时控制是否同步等

```javascript
var Ajax = {
    /**
     * get参数格式化，转换对象成url方式
     * @param data 对象 转换前： {"username":"ruben","password":"achao"}
     * @returns {string} 转换后： username=ruben&password=achao
     */
    dataFormat: function (data) {
        if (data == null || "" === data) {
            return "";
        }
        return "?" + Object.keys(data).map(function (key) {
            return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
        }).join("&");
    },
    /**
     *
     * @param url 接口地址
     * @param data 参数 注意请传入对象，因为要转换
     * @param fn 定义在外面，可以执行相关逻辑
     * 例：
     * //在需要使用的页面
     * //引入js文件后，在那个页面这样调用
     * //声明处理对象
     * var fn = {
                success: function (data) {
                //成功逻辑
                    alert(data.msg);
                },
                error: function (data) {
                //失败逻辑
                    console.log(data);
                }
            },
     //调用
     Ajax.get("/user/say", {word: data.msg}, this.say);
     *在后端接收
     * @RequestParam String word
     */
    get: function (url, data, fn) {
        // XMLHttpRequest对象用于在后台与服务器交换数据
        var xhr = new XMLHttpRequest();
        //这里第三个参数async为false，这个是是否开启同步(上一个请求回来以后再请求下一个这种)
        xhr.open('GET', url + this.dataFormat(data), false);
        // 添加请求头，例如token等
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            // readyState == 4说明请求已完成
            if (xhr.readyState == 4) {
                if (xhr.status == 200 || xhr.status == 304) {
                    var responseText = xhr.responseText
                    var response = JSON.parse(responseText);
                    //处理逻辑
                    //执行判断（这里省略，实际应用逻辑和返回结果进行判断）
                    //判断如果成功，调用传进来的对象的success方法
                    //fn.success(response)
                    //判断如果失败
                    //fn.error(response)
                }
            }
        }
        xhr.send();
    },
    /**
     *
     * @param url 接口地址
     * @param data 参数 传入JSON
     * @param fn 定义在外面，可以执行相关逻辑
     * 例：
     * //在需要使用的页面
     * //引入js文件后，在那个页面这样调用
     * //声明处理对象
     * var fn = {
                success: function (data) {
                //成功逻辑
                    alert(data.msg);
                },
                error: function (data) {
                //失败逻辑
                    console.log(data);
                }
            },
     //调用
     Ajax.post("/user/login", JSON.stringify(user), fn);
     * 后端接收
     * @RequestBody User user
     */
    post: function (url, data, fn) {
        var xhr = new XMLHttpRequest();
        //这里第三个参数async为false，这个是是否开启同步(上一个请求回来以后再请求下一个这种)
        xhr.open('POST', url, false);
        // 添加请求头，例如token等
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200 || xhr.status == 304) {
                    var responseText = xhr.responseText
                    var response = JSON.parse(responseText);
                    //处理逻辑
                    //执行判断（这里省略，实际应用逻辑和返回结果进行判断）
                    //判断如果成功，调用传进来的对象的success方法
                    //fn.success(response)
                    //判断如果失败
                    //fn.error(response)
                }
            }
        }
        xhr.send(data);
    }
}
```



