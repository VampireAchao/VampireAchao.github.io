---
title: java读取本地目录的文件转换为list
date: 2021-08-19 21:38:34
tags: java
---

> 不在沉默中爆发，就在沉默中灭亡。——鲁迅

我读取了我的全部博客内容并转换成了一个`List<String>`

代码如下：

```java
import java.io.*;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

class Scratch {
    public static void main(String[] args) throws Exception {
        List<File> fileNames = getFileNames("D:/file/blog/backup/blog/source/_posts/");
        List<String> collect = fileNames.parallelStream().map(Scratch::readFile).collect(Collectors.toList());
        collect.forEach(System.out::println);
    }

    private static List<File> getFileNames(String filePath) {
        File file = new File(filePath);
        //判断文件或目录是否存在
        if (!file.exists()) {
            System.err.println("【" + filePath + " not exists】");
        }
        return Optional.ofNullable(file.listFiles()).map(Arrays::asList).orElseGet(Collections::emptyList);
    }


    /**
     * 将文本文件中的内容读入到buffer中
     *
     * @param buffer buffer
     * @param file   文件路径
     * @throws IOException 异常
     * @author cn.outofmemory
     * @date 2013-1-7
     */
    public static void readToBuffer(StringBuffer buffer, File file) throws IOException {
        InputStream is = new FileInputStream(file);
        String line; // 用来保存每行读取的内容
        BufferedReader reader = new BufferedReader(new InputStreamReader(is));
        line = reader.readLine(); // 读取第一行
        while (line != null) { // 如果 line 为空说明读完了
            buffer.append(line); // 将读到的内容添加到 buffer 中
            buffer.append("\n"); // 添加换行符
            line = reader.readLine(); // 读取下一行
        }
        reader.close();
        is.close();
    }

    /**
     * 读取文本文件内容
     *
     * @param file 文件所在路径
     * @return 文本内容
     * @throws IOException 异常
     * @author cn.outofmemory
     * @date 2013-1-7
     */
    public static String readFile(File file) {
        StringBuffer sb = new StringBuffer();
        try {
            readToBuffer(sb, file);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return sb.toString();
    }
}
```

效果如下：

![image-20210819214039510](/imgs/oss/picGo/image-20210819214039510.png)

