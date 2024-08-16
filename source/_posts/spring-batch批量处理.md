---
title: spring-batch批量处理
date: 2023-01-28 22:01:15
tags: java
---

> 没有一个人能真正理解另一个人的烦恼或喜悦——舒伯特

按照文档：https://spring.io/guides/gs/batch-processing/

新建一个项目

![image-20230128220511002](/imgs/oss/blog/vampireachao/image-20230128220511002.png)

勾选`Spring Batch`以及`HyperSQL Database`

![image-20230128220609051](/imgs/oss/blog/vampireachao/image-20230128220609051.png)

点击`create`

在`resources`下面新建我们的数据文件

`sample-data.csv`

```csv
Jill,Doe
Joe,Doe
Justin,Doe
Jane,Doe
John,Doe
```

`schema-all.sql`

```sql
DROP TABLE people IF EXISTS;

CREATE TABLE people  (
    person_id BIGINT IDENTITY NOT NULL PRIMARY KEY,
    first_name VARCHAR(20),
    last_name VARCHAR(20)
);
```

然后新建一个`Person`业务类

```java
package com.example.batchprocessing;

public class Person {

  private String lastName;
  private String firstName;

  public Person() {
  }

  public Person(String firstName, String lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getFirstName() {
    return firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  @Override
  public String toString() {
    return "firstName: " + firstName + ", lastName: " + lastName;
  }

}
```

然后是批量处理类，实现`ItemProcessor`接口，这里是将原本`Person`中的`firstName`和`lastName`转大写

```java
package com.example.batchprocessing;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.batch.item.ItemProcessor;

public class PersonItemProcessor implements ItemProcessor<Person, Person> {

  private static final Logger log = LoggerFactory.getLogger(PersonItemProcessor.class);

  @Override
  public Person process(final Person person) throws Exception {
    final String firstName = person.getFirstName().toUpperCase();
    final String lastName = person.getLastName().toUpperCase();

    final Person transformedPerson = new Person(firstName, lastName);

    log.info("Converting (" + person + ") into (" + transformedPerson + ")");

    return transformedPerson;
  }

}
```

然后是配置类`BatchConfiguration`

```java
package com.ruben.simplebatchprocessing;

import org.springframework.batch.item.database.BeanPropertyItemSqlParameterSourceProvider;
import org.springframework.batch.item.database.JdbcBatchItemWriter;
import org.springframework.batch.item.database.builder.JdbcBatchItemWriterBuilder;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.builder.FlatFileItemReaderBuilder;
import org.springframework.batch.item.file.mapping.BeanWrapperFieldSetMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import javax.sql.DataSource;

/**
 * BatchConfiguration
 *
 * @author VampireAchao
 * @since 2023/1/28
 */
@Configuration
public class BatchConfiguration {

    @Bean
    public FlatFileItemReader<Person> reader() {
        return new FlatFileItemReaderBuilder<Person>()
                .name("personItemReader")
                .resource(new ClassPathResource("sample-data.csv"))
                .delimited()
                .names(new String[]{"firstName", "lastName"})
                .fieldSetMapper(new BeanWrapperFieldSetMapper<Person>() {{
                    setTargetType(Person.class);
                }})
                .build();
    }

    @Bean
    public PersonItemProcessor processor() {
        return new PersonItemProcessor();
    }

    @Bean
    public JdbcBatchItemWriter<Person> writer(DataSource dataSource) {
        return new JdbcBatchItemWriterBuilder<Person>()
                .itemSqlParameterSourceProvider(new BeanPropertyItemSqlParameterSourceProvider<>())
                .sql("INSERT INTO people (first_name, last_name) VALUES (:firstName, :lastName)")
                .dataSource(dataSource)
                .build();
    }
    

}

```

这里`reader`读取`resources`目录下的`sample-data.csv`并且转化为`Person`对象

`processor`负责对`Person`转换大写的处理

`writer`负责使用单个`Person`以及`jdbc`作为目标写入数据

然后我们再到`BatchConfiguration`中新建这两个方法

```java
    @Bean
    public Job importUserJob(JobRepository jobRepository,
                             JobCompletionNotificationListener listener, Step step1) {
        return new JobBuilder("importUserJob")
                .repository(jobRepository)
                .incrementer(new RunIdIncrementer())
                .listener(listener)
                .flow(step1)
                .end()
                .build();
    }

    @Bean
    public Step step1(JobRepository jobRepository,
                      PlatformTransactionManager transactionManager, JdbcBatchItemWriter<Person> writer) {
        return new StepBuilder("step1")
                .repository(jobRepository)
                .<Person, Person>chunk(10)
                .reader(reader())
                .processor(processor())
                .writer(writer)
                .transactionManager(transactionManager)
                .build();
    }
```

`importUserJob`返回一个`org.springframework.batch.core.Job`，表示单个任务

`step1`返回一个`org.springframework.batch.core.Step`，表示单个步骤

任务是由步骤构建的，其中每个步骤都可以包括一个`reader`、一个`processor`和一个`writer`。

在这个任务中，用到一个`incrementer`，因为任务使用数据库来维护执行状态。

然后使用`flow`列出每个步骤（尽管此作业只有一个步骤）。使用`end`表示作业结束

在`step1`中，定义一次要写入多少数据（`10`），然后配置读取器`reader`、处理器`processor`和写入器`writer`

这里`listener`是监听器，我们可以对任务状态进行监听，例如此处的任务完成后查询并输出

```java
package com.example.batchprocessing;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.listener.JobExecutionListenerSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class JobCompletionNotificationListener extends JobExecutionListenerSupport {

  private static final Logger log = LoggerFactory.getLogger(JobCompletionNotificationListener.class);

  private final JdbcTemplate jdbcTemplate;

  @Autowired
  public JobCompletionNotificationListener(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  @Override
  public void afterJob(JobExecution jobExecution) {
    if(jobExecution.getStatus() == BatchStatus.COMPLETED) {
      log.info("!!! JOB FINISHED! Time to verify the results");

      jdbcTemplate.query("SELECT first_name, last_name FROM people",
        (rs, row) -> new Person(
          rs.getString(1),
          rs.getString(2))
      ).forEach(person -> log.info("Found <" + person + "> in the database."));
    }
  }
}
```

运行主启动类

```java
package com.ruben.simplebatchprocessing;

import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableBatchProcessing
public class SimpleBatchProcessingApplication {

    public static void main(String[] args) {
        System.exit(SpringApplication.exit(SpringApplication.run(SimpleBatchProcessingApplication.class, args)));
    }

}
```

运行结果：

![image-20230128231318595](/imgs/oss/blog/vampireachao/image-20230128231318595.png)