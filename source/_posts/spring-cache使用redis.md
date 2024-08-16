---
title: spring cache使用redis
date: 2023-01-26 10:57:25
tags: java
---

> 乐观意味着不对无可奈何的事情怨天尤人。怨天尤人是那些失去自我信赖的人的接口——雷音

首先引入`redis`、`json`依赖

```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-json</artifactId>
        </dependency>
```

然后进行配置

```java
package com.ruben.simplecache;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.cache.RedisCacheWriter;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@EnableCaching
@SpringBootApplication
public class SimpleCacheApplication {

    @Bean
    public CacheManager cacheManager(RedisConnectionFactory connectionFactory) {
        final RedisCacheWriter redisCacheWriter = RedisCacheWriter.lockingRedisCacheWriter(connectionFactory);
        final RedisCacheConfiguration cacheConfig = RedisCacheConfiguration.defaultCacheConfig()
                .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer()))
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer()));
        return new RedisCacheManager(redisCacheWriter, cacheConfig);
    }

    public static void main(String[] args) {
        SpringApplication.run(SimpleCacheApplication.class, args);
    }

}
```

别忘了给我们的实体类无参构造器

```java
package com.ruben.simplecache;

public class Book {

    private String isbn;
    private String title;

    public Book() {
    }

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

运行`AppRunner`

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

我们的持久层`SimpleBookRepository`代码和`AppRunner`一样，都不需要变动

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

运行结果：

![image-20230126111701695](/imgs/oss/picGo/image-20230126111701695.png)

可以看到其是使用注解上的`value`以及参数作为缓存的`key`，所以我们`updateByIsBn`需要改为用`String isbn`作为参数

该方法将由原本的根据`IsBn`更新，改为从数据库中查询数据，同步到缓存

```java
    @Override
    @CachePut("books")
    public Book updateByIsbn(String isbn) {
        final Book book = new Book(isbn, "Some book");
        log.warn("updateByIsbn called {}", book);
        simulateSlowService();
        return book;
    }
```

修改`AppRunner`后再次运行

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
        logger.info("isbn-1234 -->" + bookRepository.updateByIsbn("isbn-1234"));
        logger.info("isbn-4567 -->" + bookRepository.updateByIsbn("isbn-4567"));
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

![image-20230126112303472](/imgs/oss/picGo/image-20230126112303472.png)

