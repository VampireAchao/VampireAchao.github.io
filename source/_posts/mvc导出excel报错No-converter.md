---
title: mvc导出excel报错No converter
date: 2023-04-28 23:16:41
tags: kotlin
---

> 无翼而飞者，声也。——佚名

 今天导出`excel`报错

```shell
No converter for [class org.springframework.core.io.ByteArrayResource] with preset Content-Type 'application/vnd.ms-excel'
```

代码如下：

```kotlin
@PostMapping("exportSettle")
fun export(dto: CommonDTO) {
	val writer = ExcelUtil.getWriter()
	writer.writeRow(Maps.of("key", "value"), true)
	response.addHeader("Content-Disposition", writer.getDisposition("test.xlsx", CharsetUtil.CHARSET_UTF_8))
	response.contentType = ContentType.build(writer.contentType, StandardCharsets.UTF_8)
	writer.flush(response.outputStream, true)
	writer.close()
}
```

发现没有配置`MediaTypes`

在`MvcConfig`配置一下即可

```java
@Override
public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
	MappingJackson2HttpMessageConverter jackson2HttpMessageConverter = new MappingJackson2HttpMessageConverter();
	jackson2HttpMessageConverter.setObjectMapper(JacksonUtil.newObjectMapper());
	jackson2HttpMessageConverter.setSupportedMediaTypes(Lists.of(MediaType.ALL));
	converters.add(jackson2HttpMessageConverter);
}
```

