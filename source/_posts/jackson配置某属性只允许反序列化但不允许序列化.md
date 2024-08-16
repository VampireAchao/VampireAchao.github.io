---
title: jackson配置某属性只允许反序列化但不允许序列化
date: 2023-03-27 21:49:10
tags: java
---

> 多和朋辈交游无疑是医治心病的良方——泰戈尔

实现`jackson`转`json`时忽略某字段，但`json`转对象时支持该字段的方式很简单：

只需要在`getter`上加`@JsonIgnore`，在`setter`上加`@JsonProperty`即可

例如：

```java
	private List<Long> ids;
	
	@JsonIgnore
	public List<Long> getIds(){
		return ids;
	}
	
	@JsonProperty
	public void setIds(List<Long> ids){
		this.ids = ids;
    }
```

`jackson`文档：https://github.com/FasterXML/jackson-docs