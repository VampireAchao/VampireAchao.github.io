---
title: spring caching
date: 2023-01-24 10:41:19
tags: java
---

> 凡事必须要有统一和决断，因此，胜利不站在智慧的一方，而站在自信的一方。——拿破仑

官方文档：https://spring.io/guides/gs/caching/

引入依赖：

```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-cache</artifactId>
        </dependency>
```

准备一个`Book`类

```java
package com.example.caching;

public class Book {

  private String isbn;
  private String title;

  public Book(String isbn, String title) {
    this.isbn = isbn;
    this.title = title;
  }

  public String getIsbn() {
    return isbn;
  }

  public void setIsbn(String isbn) {
    this.isbn = isbn;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  @Override
  public String toString() {
    return "Book{" + "isbn='" + isbn + '\'' + ", title='" + title + '\'' + '}';
  }

}
```

写个接口

```java
package com.example.caching;

public interface BookRepository {

  Book getByIsbn(String isbn);

}
```

然后是对应的接口实现类，此处模拟从数据库查询`Book`对象的数据，期间会`sleep`三秒

```java
package com.example.caching;

import org.springframework.stereotype.Component;

@Component
public class SimpleBookRepository implements BookRepository {

  @Override
  public Book getByIsbn(String isbn) {
    simulateSlowService();
    return new Book(isbn, "Some book");
  }

  // Don't do this at home
  private void simulateSlowService() {
    try {
      long time = 3000L;
      Thread.sleep(time);
    } catch (InterruptedException e) {
      throw new IllegalStateException(e);
    }
  }

}
```

我们主启动类目前很干净

```java
package com.example.caching;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CachingApplication {

  public static void main(String[] args) {
    SpringApplication.run(CachingApplication.class, args);
  }

}
```

新建一个启动时加载的类，此处会调用`6`次获取`Book`方法

```java
package com.example.caching;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class AppRunner implements CommandLineRunner {

  private static final Logger logger = LoggerFactory.getLogger(AppRunner.class);

  private final BookRepository bookRepository;

  public AppRunner(BookRepository bookRepository) {
    this.bookRepository = bookRepository;
  }

  @Override
  public void run(String... args) throws Exception {
    logger.info(".... Fetching books");
    logger.info("isbn-1234 -->" + bookRepository.getByIsbn("isbn-1234"));
    logger.info("isbn-4567 -->" + bookRepository.getByIsbn("isbn-4567"));
    logger.info("isbn-1234 -->" + bookRepository.getByIsbn("isbn-1234"));
    logger.info("isbn-4567 -->" + bookRepository.getByIsbn("isbn-4567"));
    logger.info("isbn-1234 -->" + bookRepository.getByIsbn("isbn-1234"));
    logger.info("isbn-1234 -->" + bookRepository.getByIsbn("isbn-1234"));
  }

}
```

我们启动一下项目，发现正常执行，每三秒输出一个`Book`对象

![image-20230124104459500](/imgs/oss/picGo/image-20230124104459500.png)

我们给实现类的获取`book`方法加一个`@Cacheable("books")`注解

```java
package com.example.caching;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

@Component
public class SimpleBookRepository implements BookRepository {

  @Override
  @Cacheable("books")
  public Book getByIsbn(String isbn) {
    simulateSlowService();
    return new Book(isbn, "Some book");
  }

  // Don't do this at home
  private void simulateSlowService() {
    try {
      long time = 3000L;
      Thread.sleep(time);
    } catch (InterruptedException e) {
      throw new IllegalStateException(e);
    }
  }

}
```

并在主启动类加一个`@EnableCaching`注解开启缓存

```java
package com.example.caching;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class CachingApplication {

  public static void main(String[] args) {
    SpringApplication.run(CachingApplication.class, args);
  }

}
```

再次启动，发现缓存生效，后续的数据瞬间获取到

![image-20230124104737558](/imgs/oss/picGo/image-20230124104737558.png)