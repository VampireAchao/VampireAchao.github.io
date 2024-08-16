---
title: gradio
date: 2024-06-13 20:49:47
tags: ai
---

> 家庭和睦是人生最快乐的事。——歌德

Gradio 是通过友好的 Web 界面演示机器学习模型的最快方式，以便任何人都可以在任何地方使用它！

https://www.gradio.app/

https://github.com/gradio-app/gradio

比如说代码如下

```python
import gradio as gr

def greet(name):
    return "Hello " + name + "!"

demo = gr.Interface(fn=greet, inputs="text", outputs="text")
demo.launch()
```

就能实现一个简单的类似`ChatGPT`一样的`web`界面来演示机器学习
