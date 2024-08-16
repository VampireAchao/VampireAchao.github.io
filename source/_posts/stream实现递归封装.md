---
title: stream实现递归封装
date: 2022-08-23 16:15:37
tags: java
---

> 上帝等待着人类在智慧中获得新的童年。──泰戈尔

分享一个封装的树处理，源码在这：https://gitee.com/VampireAchao/stream-query

使用方式：

```java

    @Test
    void testToTree() {
        Consumer<Object> test = o -> {
            List<Student> studentTree = Steam
                    .of(
                            Student.builder().id(1L).name("dromara").build(),
                            Student.builder().id(2L).name("baomidou").build(),
                            Student.builder().id(3L).name("hutool").parentId(1L).build(),
                            Student.builder().id(4L).name("sa-token").parentId(1L).build(),
                            Student.builder().id(5L).name("mybatis-plus").parentId(2L).build(),
                            Student.builder().id(6L).name("looly").parentId(3L).build(),
                            Student.builder().id(7L).name("click33").parentId(4L).build(),
                            Student.builder().id(8L).name("jobob").parentId(5L).build()
                    )
                    // just 3 lambda,top parentId is null
                    .toTree(Student::getId, Student::getParentId, Student::setChildren);
            Assertions.assertEquals(asList(
                    Student.builder().id(1L).name("dromara")
                            .children(asList(
                                    Student.builder().id(3L).name("hutool").parentId(1L)
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
            ), studentTree);
        };
        test = test.andThen(o -> {
            List<Student> studentTree = Steam
                    .of(
                            Student.builder().id(1L).name("dromara").matchParent(true).build(),
                            Student.builder().id(2L).name("baomidou").matchParent(true).build(),
                            Student.builder().id(3L).name("hutool").parentId(1L).build(),
                            Student.builder().id(4L).name("sa-token").parentId(1L).build(),
                            Student.builder().id(5L).name("mybatis-plus").parentId(2L).build(),
                            Student.builder().id(6L).name("looly").parentId(3L).build(),
                            Student.builder().id(7L).name("click33").parentId(4L).build(),
                            Student.builder().id(8L).name("jobob").parentId(5L).build()
                    )
                    // just 4 lambda ,top by condition
                    .toTree(Student::getId, Student::getParentId, Student::setChildren, Student::getMatchParent);
            Assertions.assertEquals(asList(
                    Student.builder().id(1L).name("dromara").matchParent(true)
                            .children(asList(
                                    Student.builder().id(3L).name("hutool").parentId(1L)
                                            .children(singletonList(Student.builder().id(6L).name("looly").parentId(3L).build()))
                                            .build(),
                                    Student.builder().id(4L).name("sa-token").parentId(1L)
                                            .children(singletonList(Student.builder().id(7L).name("click33").parentId(4L).build()))
                                            .build()))
                            .build(),
                    Student.builder().id(2L).name("baomidou").matchParent(true)
                            .children(singletonList(
                                    Student.builder().id(5L).name("mybatis-plus").parentId(2L)
                                            .children(singletonList(
                                                    Student.builder().id(8L).name("jobob").parentId(5L).build()
                                            ))
                                            .build()))
                            .build()
            ), studentTree);
        });
        test.accept(new Object());
    }

    @Test
    void testFlatTree() {
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
        Assertions.assertEquals(asList(
                Student.builder().id(1L).name("dromara").build(),
                Student.builder().id(2L).name("baomidou").build(),
                Student.builder().id(3L).name("hutool").parentId(1L).build(),
                Student.builder().id(4L).name("sa-token").parentId(1L).build(),
                Student.builder().id(5L).name("mybatis-plus").parentId(2L).build(),
                Student.builder().id(6L).name("looly").parentId(3L).build(),
                Student.builder().id(7L).name("click33").parentId(4L).build(),
                Student.builder().id(8L).name("jobob").parentId(5L).build()
        ), Steam.of(studentTree).flatTree(Student::getChildren, Student::setChildren).sorted(Comparator.comparingLong(Student::getId)).toList());

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

