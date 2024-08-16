---
title: 为streampark新增用户资源转移功能
date: 2023-05-08 20:47:53
tags: java
---

> 凡事一俭，则谋生易足；谋生易足，则求人无争，亦于人无求。——钱泳

相关的`pr`：https://github.com/apache/incubator-streampark/pull/2734

对应的描述：

## What changes were proposed in this pull request

Issue Number: close [#2712](https://github.com/apache/incubator-streampark/issues/2712)

## Brief change log

1. Requirement:

- The administrator cancels the user deletion function and replaces it with disabling users.

![236688445-1e61b77d-7db5-4cec-9546-832bebb9dbbe](/imgs/oss/blog/vampireachao/236688445-1e61b77d-7db5-4cec-9546-832bebb9dbbe.png)


2. Detailed logic:

- The administrator cancels the user deletion function.
- When the user account is disabled, it cannot own resources (application and project ownership)
- Add resource transfer function to transfer disabled user resources to new users

<img width="961" alt="8f04aebad699a2e235467432a89f976" src="/imgs/oss/blog/vampireachao/236740402-898dedfd-bdcf-4dbc-a48f-f717806a52ca.png">


## Verifying this change

Change the user's status when the user has resources.

This change is already covered by existing tests, such as *UserServiceTest*.

This change added tests and can be verified as follows:

1. testLockUser in UserServiceTest
- This unit test covers different scenarios for locking and unlocking a user when they have no resources, as well as locking a user when they have resources and checking the different return results.
3. testTransferResource in UserServiceTest
- This unit test involves transferring a user's resources to another person.


## Does this pull request potentially affect one of the following parts
 - Dependencies (does it add or upgrade a dependency): 
 no