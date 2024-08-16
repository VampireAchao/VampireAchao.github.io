---
title: 'try()catch{}写法'
date: 2021-01-09 22:15:24
tags: java
---

> 当生活像一首歌那样轻快流畅时，笑颜常开乃易事；而在一切事都不妙时仍能微笑的人，是真正的乐观。——威尔科克斯

曾经我们使用`java`的`IO`流复制文件时是这么写的

```java
package com.ruben;

import java.io.*;
import java.util.Optional;

/**
 * @ClassName: FileDemo
 * @Description: 我还没有写描述
 * @Date: 2021/1/10 0010 21:38
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
public class FileDemo {
    private static final String FILE_PATH = "D:/file/files/ps/2077.png";
    private static final String TARGET_PATH = "D:/file/files/ps/1977.png";

    public static void main(String[] args) {
        InputStream dataInputStream = null;
        OutputStream output = null;
        try {
            dataInputStream = new FileInputStream(FILE_PATH);
            output = new FileOutputStream(TARGET_PATH);
            byte[] buffer = new byte[1024];
            int length;
            while ((length = dataInputStream.read(buffer)) > 0) {
                output.write(buffer, 0, length);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            Optional.ofNullable(output).ifPresent(outputStream -> {
                try {
                    outputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            });
            Optional.ofNullable(dataInputStream).ifPresent(inputStream -> {
                try {
                    inputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            });
        }
    }
}
```

可以看到在`finally`里我们关闭流的时候要写一大堆，非常麻烦

现在推荐使用这种写法

```java
package com.ruben;

import java.io.*;
import java.util.Optional;

/**
 * @ClassName: FileDemo
 * @Description: 我还没有写描述
 * @Date: 2021/1/10 0010 21:38
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
public class FileDemo {
    private static final String FILE_PATH = "D:/file/files/ps/2077.png";
    private static final String TARGET_PATH = "D:/file/files/ps/1977.png";

    public static void main(String[] args) {
        try (
                InputStream dataInputStream = new FileInputStream(FILE_PATH);
                OutputStream output = new FileOutputStream(TARGET_PATH)
        ) {
            byte[] buffer = new byte[1024];
            int length;
            while ((length = dataInputStream.read(buffer)) > 0) {
                output.write(buffer, 0, length);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

使用`try()catch{}`写法，可以自动关闭流

