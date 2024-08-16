---
title: r2dbc事务处理
date: 2023-10-30 18:24:27
tags: java
---

> 劳动创造了人本身。——恩格斯

官方`demo`：

https://github.com/spring-projects/spring-data-examples/blob/main/r2dbc/example/src/main/java/example/springdata/r2dbc/basics/TransactionalService.java

```java
/*
 * Copyright 2019-2021 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package example.springdata.r2dbc.basics;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author Oliver Drotbohm
 */
@Component
@RequiredArgsConstructor
class TransactionalService {

	private final @NonNull CustomerRepository repository;

	/**
	 * Saves the given {@link Customer} unless its firstname is "Dave".
	 *
	 * @param customer must not be {@literal null}.
	 * @return
	 */
	@Transactional
	public Mono<Customer> save(Customer customer) {

		return repository.save(customer).map(it -> {

			if (it.firstname().equals("Dave")) {
				throw new IllegalStateException();
			} else {
				return it;
			}
		});
	}
}
```

可以看到是支持`Transactional`的

当然我们可以手动回滚事务，配置：

```java
import io.r2dbc.spi.ConnectionFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.r2dbc.connection.R2dbcTransactionManager;
import org.springframework.transaction.ReactiveTransactionManager;
import org.springframework.transaction.reactive.TransactionalOperator;

@Configuration
public class R2dbcConfig {

    @Bean
    public ReactiveTransactionManager reactiveTransactionManager(ConnectionFactory connectionFactory) {
        return new R2dbcTransactionManager(connectionFactory);
    }

    @Bean
    public TransactionalOperator transactionalOperator(ReactiveTransactionManager txm) {
        return TransactionalOperator.create(txm);
    }

}
```

使用：

```java
    @Resource
    private TransactionalOperator transactionalOperator;
    
    @Test
    void test() {
        var user = new User();
        user.setId(1L);
        user.setName("test");
        transactionalOperator.execute(transactionStatus -> {
                    transactionStatus.setRollbackOnly();
                    return r2dbcEntityOperations.insert(user)
                            .thenMany(userRepository.findAll());
                }).as(StepVerifier::create)
                .expectNextMatches(e -> true).verifyComplete();
    }
```
