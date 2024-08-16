---
title: spring-guides-accessing-data-jpa
date: 2023-03-13 22:02:18
tags: java
---

> 名誉过高，实在是一种害人的负担——福尔特尔

教程网址：https://spring.io/guides/gs/accessing-data-jpa

首先访问 [pre-initialized project](https://start.spring.io/#!type=maven-project&language=java&platformVersion=3.0.1&packaging=jar&jvmVersion=17&groupId=com.example&artifactId=accessing-data-jpa&name=accessing-data-jpa&description=Demo project for Spring Boot&packageName=com.example.accessing-data-jpa&dependencies=data-jpa,h2) 

直接点击`GENERATE`

![image-20230313220507421](/imgs/oss/blog/vampireachao/image-20230313220507421.png)

下载下来，解压并打开项目

![image-20230313220631376](/imgs/oss/blog/vampireachao/image-20230313220631376.png)

首先新建一个`Customer`类

```java
package com.example.accessingdatajpa;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Customer {

  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  private Long id;
  private String firstName;
  private String lastName;

  protected Customer() {}

  public Customer(String firstName, String lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  @Override
  public String toString() {
    return String.format(
        "Customer[id=%d, firstName='%s', lastName='%s']",
        id, firstName, lastName);
  }

  public Long getId() {
    return id;
  }

  public String getFirstName() {
    return firstName;
  }

  public String getLastName() {
    return lastName;
  }
}
```

然后编写一个简单的查询

```java
package com.example.accessingdatajpa;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface CustomerRepository extends CrudRepository<Customer, Long> {

  List<Customer> findByLastName(String lastName);

  Customer findById(long id);
}
```

在主启动类注入一个`demo`

```java
package com.example.accessingdatajpa;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AccessingDataJpaApplication {

	private static final Logger log = LoggerFactory.getLogger(AccessingDataJpaApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(AccessingDataJpaApplication.class, args);
	}

	@Bean
	public CommandLineRunner demo(CustomerRepository repository) {
		return (args) -> {
			// save a few customers
			repository.save(new Customer("Jack", "Bauer"));
			repository.save(new Customer("Chloe", "O'Brian"));
			repository.save(new Customer("Kim", "Bauer"));
			repository.save(new Customer("David", "Palmer"));
			repository.save(new Customer("Michelle", "Dessler"));

			// fetch all customers
			log.info("Customers found with findAll():");
			log.info("-------------------------------");
			for (Customer customer : repository.findAll()) {
				log.info(customer.toString());
			}
			log.info("");

			// fetch an individual customer by ID
			Customer customer = repository.findById(1L);
			log.info("Customer found with findById(1L):");
			log.info("--------------------------------");
			log.info(customer.toString());
			log.info("");

			// fetch customers by last name
			log.info("Customer found with findByLastName('Bauer'):");
			log.info("--------------------------------------------");
			repository.findByLastName("Bauer").forEach(bauer -> {
				log.info(bauer.toString());
			});
			// for (Customer bauer : repository.findByLastName("Bauer")) {
			//  log.info(bauer.toString());
			// }
			log.info("");
		};
	}

}
```

执行主启动类的`main`方法启动项目，成功输出

![image-20230313221351023](/imgs/oss/blog/vampireachao/image-20230313221351023.png)

```shell
== Customers found with findAll():
Customer[id=1, firstName='Jack', lastName='Bauer']
Customer[id=2, firstName='Chloe', lastName='O'Brian']
Customer[id=3, firstName='Kim', lastName='Bauer']
Customer[id=4, firstName='David', lastName='Palmer']
Customer[id=5, firstName='Michelle', lastName='Dessler']

== Customer found with findById(1L):
Customer[id=1, firstName='Jack', lastName='Bauer']

== Customer found with findByLastName('Bauer'):
Customer[id=1, firstName='Jack', lastName='Bauer']
Customer[id=3, firstName='Kim', lastName='Bauer']
```

