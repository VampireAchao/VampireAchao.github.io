---
title: VIN解析
date: 2023-06-13 20:27:29
tags: java
---

> 爱情易失不易得。——佚名

分享一个`VIN`解析的代码

https://gitee.com/dromara/hutool/pulls/1005

使用方式

```java
package org.dromara.hutool.core.data;

import org.dromara.hutool.core.data.vin.Vin;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.time.Year;

/**
 * @author VampireAchao
 * @since 2023/5/31 14:43
 */
public class VinTest {

	@Test
	public void parseVinTest() {
		String vinStr = "HE9XR1C48PS083871";
		Vin vin = Vin.of(vinStr);
		// VIN
		Assertions.assertEquals("HE9XR1C48PS083871", vin.getCode());
		// 是否合法
		Assertions.assertTrue(Vin.isValidVinCode(vinStr));
		// 年产量<1000
		Assertions.assertTrue(vin.isLessThan1000());
		// WMI
		Assertions.assertEquals("HE9", vin.wmiCode());
		// 地理区域码
		Assertions.assertEquals("HE", vin.geoCode());
		// 主机厂代码
		Assertions.assertEquals("HE9083", vin.manufacturerCode());
		// VDS
		Assertions.assertEquals("XR1C4", vin.vdsCode());
		// 车型年份
		Assertions.assertEquals(Year.of(2023), vin.defaultYear());
		// OEM厂商
		Assertions.assertEquals("S", vin.oemCode());
		// 生产序号
		Assertions.assertEquals("871", vin.prodNo());
	}

}
```

