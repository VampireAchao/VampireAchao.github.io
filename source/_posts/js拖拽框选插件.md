---
title: js拖拽框选插件
date: 2022-06-18 12:38:27
tags: 前端
---

> 只要你具备了精神气质的美，只要你有这样的自信，你就会拥有风度的自然之美。——金马

分享一个`js`的拖拽框选插件

官网：https://dragselect.com/

源码：https://github.com/ThibaultJanBeyer/DragSelect.git

![demo-gif](/imgs/oss/picGo/dragselect.gif)

使用：

```shell
pnpm i dragselect
```

有前端大佬翻译了部分，并编写了一个`html`的`demo`

https://gitee.com/ovsexia/DragSelect-Doc-Cn

我在使用过程中发现反选有点问题，所以如果是跟我一样`pnpm i`下载下的版本，应该也会有这个问题，因此反选自己实现即可，这是我按照上面链接中的`demo`在`vue`模块化项目中的组件：

`TagDragSelect.vue`

```vue
<!-- https://gitee.com/ovsexia/DragSelect-Doc-Cn -->
<!-- https://github.com/houbb/opencc4j -->
<!--  -->
<script>
import DragSelect from "dragselect";
export default {
  name: "TagDragSelect",
  data() {
    return { ds: null };
  },
  mounted() {
    console.log(window);
    console.log(document);
    this.ds = new DragSelect({
      area: document.getElementById("ul"),
      selectables: document.getElementsByClassName("mar"),
      //选中
      onElementSelect: (element) => {
        // console.log("onElementSelect", { element });
        element.classList.add("on");
        element.querySelector('input[type="checkbox"]').checked = true;
      },
      //取消选中
      onElementUnselect: (element) => {
        // console.log("onElementUnselect", { element });
        element.classList.remove("on");
        element.querySelector('input[type="checkbox"]').checked = false;
      },
      //鼠标抬起后返回所有选中的元素
      callback: (elements) => {
        console.log(elements);
      },
    });
    console.log({ "this.ds": this.ds });
  },
  methods: {
    selectAll() {
      this.ds.setSelection(this.ds.getSelectables());
    },
    selectNone() {
      this.ds.clearSelection();
    },
    selectReverse() {
      const elements = this.ds.getSelectables()
      const willRemoveSelection = [];
      const willAddSelection = [];
      elements.forEach((el) => (this.ds.SelectedSet.has(el) ? willRemoveSelection : willAddSelection).push(el))
      this.ds.removeSelection(willRemoveSelection)
      this.ds.addSelection(willAddSelection)
    },
  },
  render() {
    return (
      <div class="margin">
        <div class="tip">
          <p>提示：</p>
          <p>1.在灰色区域内拖动选择，也可以点击选择</p>
          <p>
            2.主区域最好添加css 属性 user-select:none
            取消文本选择，防止选择事件冲突
          </p>
        </div>
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
        <button onClick={this.selectAll}>全选</button>
        <button onClick={this.selectNone}>全不选</button>
        <button onClick={this.selectReverse}>反选</button>
      </div>
    );
  },
};
</script>

<style scoped>
.margin {
  width: 1000px;
  margin: 100px auto 0;
}

.tip {
  text-align: center;
  font-size: 16px;
  padding-bottom: 10px;
  line-height: 22px;
}

.ul:after {
  content: "";
  display: block;
  clear: both;
}

.ul {
  background-color: #ccc;
  padding: 40px 35px 0;
  user-select: none;
}

.li {
  width: 25%;
  float: left;
  margin-bottom: 40px;
}

.li .mar {
  margin: 0 20px;
  height: 120px;
  background-color: #ddd;
  position: relative;
}

.li .mar.on {
  background-color: #4892db;
}

.li .mar input[type="checkbox"] {
  visibility: hidden;
}

.checkbox {
  width: 18px;
  height: 18px;
  border: 2px solid #13b8cb;
  background-color: #fff;
  position: absolute;
  top: 3px;
  left: 3px;
}

.checkbox:before,
.checkbox:after {
  content: "";
  display: block;
  background-color: #fff;
  height: 2px;
  position: absolute;
}

.checkbox:before {
  width: 7px;
  top: 10px;
  left: 2px;
  transform: rotate(45deg);
}

.checkbox:after {
  width: 12px;
  top: 8px;
  left: 5px;
  transform: rotate(-45deg);
}

.li .mar.on .checkbox {
  background-color: #13b8cb;
}

.li .mar.on .checkbox:after,
.li .mar.on .checkbox:before {
  background-color: #fff;
}
</style>
```

