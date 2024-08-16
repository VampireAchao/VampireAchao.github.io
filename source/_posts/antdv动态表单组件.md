---
title: antdv动态表单组件
date: 2022-04-01 13:56:40
tags: 前端
---

> 你已春色摇曳，我仍一身旧雪。——送花的人走了

分享一个自己写的[`antdv`](https://antdv.com/)动态表单组件

```vue
<!-- 动态表单组件 -->
<template>
  <div>
    <div v-for="(item, index) in value" :key="item[rowKey] || index">
      <a-row>
        <a-col :span="24">
          <slot :item="item">
            <a-row v-if="column.length" v-bind="flex">
              <a-col
                :span="24 / column.length - 1"
                v-for="(columnItem, columnIndex) in column"
                :key="item.title || columnIndex"
              >
                <a-form-model-item :label="showLabel && columnItem.label" v-bind="showLabel && formItemLayout">
                  <div v-if="!isPreview">
                    <a-select
                      v-if="columnItem.select"
                      v-model="item[columnItem.title]"
                      :options="columnItem.select"
                      :placeholder="columnItem.placeholder"
                      @change="selectChange($event, index, columnItem)"
                      @blur="blur"
                      allow-clear
                      show-search
                    />
                    <a-tooltip v-else>
                      <template slot="title"> {{ item[columnItem.title] || columnItem.placeholder }} </template>
                      <a-input
                        @blur="blur"
                        v-model="item[columnItem.title]"
                        :placeholder="columnItem.placeholder"
                        allow-clear
                      />
                    </a-tooltip>
                  </div>
                  <div v-else>
                    <div v-if="columnItem.select">
                      {{ (columnItem.select.find(({ value }) => value == item[columnItem.title]) || {}).label }}
                    </div>
                    <div v-else>{{ item[columnItem.title] }}</div>
                  </div>
                </a-form-model-item>
              </a-col>
            </a-row>
          </slot>
        </a-col>
        <div v-if="!isPreview" class="item-btns">
          <a-button class="item-btn" shape="circle" icon="minus" @click="delItem(index)" />
          <a-button class="item-btn" shape="circle" icon="plus" @click="addItem(index)" />
        </div>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flex: {
        type: 'flex',
        justify: 'space-between',
      },
    }
  },
  props: {
    /**
     * 指定vue中的key，建议指定为id
     */
    rowKey: {
      type: String,
      default: () => '_key',
    },
    /**
     * 指定动态表单表头和列
     */
    column: {
      type: Array,
      default: () => [
        { title: 'name', label: 'name', placeholder: 'Please input name' },
        { title: 'value', label: 'value', placeholder: 'Please input value' },
      ],
    },
    /**
     * 显示label
     */
    showLabel: {
      type: Boolean,
      default: () => false,
    },
    /**
     * 是否预览模式
     */
    isPreview: {
      type: Boolean,
      default: () => false,
    },
    /**
     * 数据，非受控组件可用v-model或者value绑定，传入的数据会随着用户操作而更新
     */
    value: {
      type: Array,
      default: () => [],
    },
    /**
     * 表单元素布局式样
     */
    formItemLayout: {
      type: Object,
      default: () => ({
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
        colon: false,
      }),
    },
    /**
     * 表单blur事件
     */
    blur: {
      type: Function,
      default: () => () => {},
    },
  },
  mounted() {
    if (!this.value || !this.value.length) {
      this.$emit('input', [this.genItem(Math.random())])
    }
  },
  computed: {
    /**
     * 获取过滤后的items
     */
    getItems() {
      return this.value.filter((item) =>
        this.column.some(({ title }) => item[title] != null && item[title] != undefined && item[title] != '')
      )
    },
  },
  methods: {
    addItem(index) {
      let item = this.genItem()
      let itemList
      if (index != null && index != undefined) {
        itemList = [...this.value]
        itemList.splice(index + 1, 0, item)
      } else {
        itemList = [...this.value, item]
      }
      this.$emit('input', itemList)
      this.$emit('addItem', index)
    },
    delItem(index) {
      let itemList = [...this.value]
      if (itemList.length == 1) {
        let item = {
          ...itemList[index],
          ...Object.fromEntries(this.column.map(({ title }) => [title, undefined])),
        }
        itemList.splice(index, 1, item)
      } else {
        itemList.splice(index, 1)
        this.$emit('delItem', index)
      }
      this.$emit('input', itemList)
    },
    selectChange(value, index, column) {
      let list = [...this.value]
      let item = { ...list[index], [column.title]: value }
      list.splice(index, 1, item)
      this.$emit('input', list)
      column.change && column.change(value, index)
    },
    genItem(key) {
      return Object.fromEntries(
        [...this.column, { title: this.rowKey, value: key || Math.random() }].map(({ title, value }) => [
          title,
          value || undefined,
        ])
      )
    },
    watchValue() {
      this.$emit('change', this.getItems)
    },
  },
  watch: {
    value: {
      deep: true,
      handler: 'watchValue',
    },
  },
}
</script>

<style lang="stylus" scoped>
.item-btns {
  display: flex;
  margin-top: 4px;

  .item-btn {
    margin-left: 10px;
  }
}
</style>
```

使用方式：

```vue
<dynamic-form-item
            :blur="() => $refs.storyTheme.onFieldBlur()"
            :is-preview="!isEditProduction"
            v-model="formData.storyTheme"
            :column="[
              {
                label: '标签',
                title: 'tag',
                select: [
                  { value: '0', label: '门派' },
                  { value: '1', label: '武侠' },
                  { value: '2', label: '玄幻' },
                ],
                placeholder: '请选择标签',
              },
              { label: '补充说明', title: 'desc', placeholder: '请填入补充说明' },
            ]"
          ></dynamic-form-item>
```

效果：

![image-20220401135829218](/imgs/oss/picGo/image-20220401135829218.png)

支持动态增减表单行