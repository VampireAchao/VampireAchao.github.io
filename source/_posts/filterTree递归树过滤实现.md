---
title: filterTree递归树过滤实现
date: 2022-11-11 13:31:35
tags: java
---

> 二人同心，其利断金；同心之言，其臭如兰——《周易·系辞上》

引入依赖：

```xml
<!-- https://search.maven.org/artifact/io.github.vampireachao/stream-query -->
<dependency>
    <groupId>io.github.vampireachao</groupId>
    <artifactId>stream-core</artifactId>
    <version>${stream-query-version}</version>
</dependency>
```

使用：

```java
  @Test
    void testFilterTree() {
        List<Student> studentTree = asList(
                Student.builder().id(1L).name("dromara")
                        .children(asList(Student.builder().id(3L).name("hutool").parentId(1L)
                                        .children(singletonList(Student.builder().id(6L).name("looly").parentId(3L).build()))
                                        .build(),
                                Student.builder().id(4L).name("sa-token").parentId(1L)
                                        .children(singletonList(Student.builder().id(7L).name("click33").parentId(4L).build()))
                                        .build()))
                        .build(),
                Student.builder().id(2L).name("baomidou")
                        .children(singletonList(
                                Student.builder().id(5L).name("mybatis-plus").parentId(2L)
                                        .children(singletonList(
                                                Student.builder().id(8L).name("jobob").parentId(5L).build()
                                        ))
                                        .build()))
                        .build()
        );
        Assertions.assertEquals(singletonList(
                Student.builder().id(1L).name("dromara")
                        .children(singletonList(Student.builder().id(3L).name("hutool").parentId(1L)
                                .children(singletonList(Student.builder().id(6L).name("looly").parentId(3L).build()))
                                .build()))
                        .build()), Steam.of(studentTree).filterTree(Student::getChildren, Student::setChildren, s -> "looly".equals(s.getName())).toList());

    }

  	@Data
    @Builder
    public static class Student {
        @Tolerate
        public Student() {
            // this is an accessible parameterless constructor.
        }

        private String name;
        private Integer age;
        private Long id;
        private Long parentId;
        private List<Student> children;
        private Boolean matchParent;
    }
```

