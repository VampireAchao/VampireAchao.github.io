---
title: Cacheable CacheEvict CachePut
date: 2023-01-25 15:44:53
tags: java
---

> 看书和学习是思想的经常营养，是思想的无穷发展——冈察洛夫

昨天写了[spring caching](https://VampireAchao.github.io/2023/01/24/spring-caching/)简单入门

今天把省下俩注解也说了

一共是

`@Cacheable`加缓存(缓存获取不到就调用方法获取结果再放入缓存)

`@CachePut`更新缓存，我下方的用法有误，应该和其余俩注解应用的方法参数保持一致，见[后续博客](/2023/01/26/spring-cache%E4%BD%BF%E7%94%A8redis/)

`@CacheEvict`删缓存

我们在`Repository`实现类加上这几个缓存注解

```java
package com.ruben.simplecache;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

@Component
public class SimpleBookRepository implements BookRepository {

    private static final Logger log = LoggerFactory.getLogger(SimpleBookRepository.class);

    @Override
    @Cacheable("books")
    public Book getByIsbn(String isbn) {
        simulateSlowService();
        log.warn("getByIsbn called {}", isbn);
        return new Book(isbn, "Some book");
    }

    @Override
    @CacheEvict("books")
    public Book removeByIsbn(String isbn) {
        log.warn("removeByIsbn called {}", isbn);
        simulateSlowService();
        return new Book(isbn, "Some book");
    }

    @Override
    @CachePut("books")
    // 此处应该和上方一样使用String isbn作为参数
    public Book updateByIsbn(Book book) {
        log.warn("updateByIsbn called {}", book);
        simulateSlowService();
        return book;
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

在`AppRunner`调用试试

```java
package com.ruben.simplecache;

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

        logger.info(".... Updating books");
        logger.info("isbn-1234 -->" + bookRepository.updateByIsbn(new Book("isbn-1234", "Some book")));
        logger.info("isbn-4567 -->" + bookRepository.updateByIsbn(new Book("isbn-4567", "Some book")));
        logger.info(".... Fetching books");
        logger.info("isbn-1234 -->" + bookRepository.getByIsbn("isbn-1234"));
        logger.info("isbn-4567 -->" + bookRepository.getByIsbn("isbn-4567"));

        logger.info("... Removing Books");
        logger.info("isbn-1234 -->" + bookRepository.removeByIsbn("isbn-1234"));
        logger.info("isbn-4567 -->" + bookRepository.removeByIsbn("isbn-4567"));
        logger.info(".... Fetching books");
        logger.info("isbn-1234 -->" + bookRepository.getByIsbn("isbn-1234"));
        logger.info("isbn-4567 -->" + bookRepository.getByIsbn("isbn-4567"));
    }

}
```

可以看到执行结果：

```shell
2023-01-25T15:38:29.004+08:00  INFO 31260 --- [           main] com.ruben.simplecache.AppRunner          : .... Fetching books
2023-01-25T15:38:32.008+08:00  WARN 31260 --- [           main] c.r.simplecache.SimpleBookRepository     : getByIsbn called isbn-1234
2023-01-25T15:38:32.009+08:00  INFO 31260 --- [           main] com.ruben.simplecache.AppRunner          : isbn-1234 -->Book{isbn='isbn-1234', title='Some book'}
2023-01-25T15:38:35.015+08:00  WARN 31260 --- [           main] c.r.simplecache.SimpleBookRepository     : getByIsbn called isbn-4567
2023-01-25T15:38:35.015+08:00  INFO 31260 --- [           main] com.ruben.simplecache.AppRunner          : isbn-4567 -->Book{isbn='isbn-4567', title='Some book'}
2023-01-25T15:38:35.016+08:00  INFO 31260 --- [           main] com.ruben.simplecache.AppRunner          : isbn-1234 -->Book{isbn='isbn-1234', title='Some book'}
2023-01-25T15:38:35.016+08:00  INFO 31260 --- [           main] com.ruben.simplecache.AppRunner          : isbn-4567 -->Book{isbn='isbn-4567', title='Some book'}
2023-01-25T15:38:35.016+08:00  INFO 31260 --- [           main] com.ruben.simplecache.AppRunner          : isbn-1234 -->Book{isbn='isbn-1234', title='Some book'}
2023-01-25T15:38:35.016+08:00  INFO 31260 --- [           main] com.ruben.simplecache.AppRunner          : isbn-1234 -->Book{isbn='isbn-1234', title='Some book'}
2023-01-25T15:38:35.016+08:00  INFO 31260 --- [           main] com.ruben.simplecache.AppRunner          : .... Updating books
2023-01-25T15:38:35.016+08:00  WARN 31260 --- [           main] c.r.simplecache.SimpleBookRepository     : updateByIsbn called Book{isbn='isbn-1234', title='Some book'}
2023-01-25T15:38:38.026+08:00  INFO 31260 --- [           main] com.ruben.simplecache.AppRunner          : isbn-1234 -->Book{isbn='isbn-1234', title='Some book'}
2023-01-25T15:38:38.026+08:00  WARN 31260 --- [           main] c.r.simplecache.SimpleBookRepository     : updateByIsbn called Book{isbn='isbn-4567', title='Some book'}
2023-01-25T15:38:41.028+08:00  INFO 31260 --- [           main] com.ruben.simplecache.AppRunner          : isbn-4567 -->Book{isbn='isbn-4567', title='Some book'}
2023-01-25T15:38:41.028+08:00  INFO 31260 --- [           main] com.ruben.simplecache.AppRunner          : .... Fetching books
2023-01-25T15:38:41.028+08:00  INFO 31260 --- [           main] com.ruben.simplecache.AppRunner          : isbn-1234 -->Book{isbn='isbn-1234', title='Some book'}
2023-01-25T15:38:41.028+08:00  INFO 31260 --- [           main] com.ruben.simplecache.AppRunner          : isbn-4567 -->Book{isbn='isbn-4567', title='Some book'}
2023-01-25T15:38:41.028+08:00  INFO 31260 --- [           main] com.ruben.simplecache.AppRunner          : ... Removing Books
2023-01-25T15:38:41.028+08:00  WARN 31260 --- [           main] c.r.simplecache.SimpleBookRepository     : removeByIsbn called isbn-1234
2023-01-25T15:38:44.029+08:00  INFO 31260 --- [           main] com.ruben.simplecache.AppRunner          : isbn-1234 -->Book{isbn='isbn-1234', title='Some book'}
2023-01-25T15:38:44.030+08:00  WARN 31260 --- [           main] c.r.simplecache.SimpleBookRepository     : removeByIsbn called isbn-4567
2023-01-25T15:38:47.030+08:00  INFO 31260 --- [           main] com.ruben.simplecache.AppRunner          : isbn-4567 -->Book{isbn='isbn-4567', title='Some book'}
2023-01-25T15:38:47.030+08:00  INFO 31260 --- [           main] com.ruben.simplecache.AppRunner          : .... Fetching books
2023-01-25T15:38:50.044+08:00  WARN 31260 --- [           main] c.r.simplecache.SimpleBookRepository     : getByIsbn called isbn-1234
2023-01-25T15:38:50.044+08:00  INFO 31260 --- [           main] com.ruben.simplecache.AppRunner          : isbn-1234 -->Book{isbn='isbn-1234', title='Some book'}
2023-01-25T15:38:53.045+08:00  WARN 31260 --- [           main] c.r.simplecache.SimpleBookRepository     : getByIsbn called isbn-4567
2023-01-25T15:38:53.045+08:00  INFO 31260 --- [           main] com.ruben.simplecache.AppRunner          : isbn-4567 -->Book{isbn='isbn-4567', title='Some book'}
```

