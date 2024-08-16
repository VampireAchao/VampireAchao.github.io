---
title: mac解压rar
date: 2023-12-14 21:42:19
tags: 软件及插件
---

> 掉头一去是风吹黑发，回首再来已雪满白头。——余光中

使用`unar`

```bash
brew install unar
```

然后解压：

```bash
Github-Id-VampireAchao:File achao$ unar ./flowable-service.rar 
./flowable-service.rar: RAR 5
  sys_menu.sql  (11073 B)... OK.
  templates.sql  (324598 B)... OK.
  workflow.sql  (260127 B)... OK.
  src/main/java/com/fjhrt/workflow/Application.java  (898 B)... OK.
  src/main/java/com/fjhrt/workflow/common/BaseController.java  (1002 B)... OK.
  src/main/java/com/fjhrt/workflow/common/BaseEntity.java  (1289 B)... OK.
  src/main/java/com/fjhrt/workflow/common/CodeGenerator.java  (9986 B)... OK.
  src/main/java/com/fjhrt/workflow/common/Constants.java  (340 B)... OK.
  src/main/java/com/fjhrt/workflow/common/MybatisObjectHandler.java  (1226 B)... OK.
  src/main/java/com/fjhrt/workflow/common/Result.java  (2932 B)... OK.
  src/main/java/com/fjhrt/workflow/config/DynamicMapperHandlerConfig.java  (1563 B)... OK.
  src/main/java/com/fjhrt/workflow/config/GlobalCorsConfig.java  (1524 B)... OK.
  src/main/java/com/fjhrt/workflow/config/MinioConfig.java  (960 B)... OK.
  src/main/java/com/fjhrt/workflow/config/MybatisPlusConfig.java  (1435 B)... OK.
  src/main/java/com/fjhrt/workflow/config/RedisConfig.java  (657 B)... OK.
  src/main/java/com/fjhrt/workflow/config/RestTemplateConfig.java  (1387 B)... OK.
  src/main/java/com/fjhrt/workflow/config/Swagger3Config.java  (2845 B)... OK.
  src/main/java/com/fjhrt/workflow/controller/ProcessController.java  (9054 B)... OK.
  src/main/java/com/fjhrt/workflow/delegate/AutoRejectTaskDelegate.java  (888 B)... OK.
  src/main/java/com/fjhrt/workflow/delegate/DelayDelegate.java  (3136 B)... OK.
  src/main/java/com/fjhrt/workflow/delegate/MessageDelegate.java  (11833 B)... OK.
  src/main/java/com/fjhrt/workflow/delegate/ServiceDelegate.java  (6839 B)... OK.
  src/main/java/com/fjhrt/workflow/dto/ApplyDTO.java  (235 B)... OK.
  src/main/java/com/fjhrt/workflow/dto/AttachmentDTO.java  (226 B)... OK.
  src/main/java/com/fjhrt/workflow/dto/FlowEngineDTO.java  (306 B)... OK.
  src/main/java/com/fjhrt/workflow/dto/HandleDataDTO.java  (1355 B)... OK.
  src/main/java/com/fjhrt/workflow/dto/ImplementStatusResVo.java  (637 B)... OK.
  src/main/java/com/fjhrt/workflow/dto/json/ChildNode.java  (1754 B)... OK.
  src/main/java/com/fjhrt/workflow/dto/json/ConditionInfo.java  (263 B)... OK.
  src/main/java/com/fjhrt/workflow/dto/json/Dept.java  (276 B)... OK.
  src/main/java/com/fjhrt/workflow/dto/json/EmailInfo.java  (207 B)... OK.
  src/main/java/com/fjhrt/workflow/dto/json/FormItem.java  (279 B)... OK.
  src/main/java/com/fjhrt/workflow/dto/json/FormItemProps.java  (225 B)... OK.
  src/main/java/com/fjhrt/workflow/dto/json/FormOperates.java  (198 B)... OK.
  src/main/java/com/fjhrt/workflow/dto/json/GroupsInfo.java  (234 B)... OK.
  src/main/java/com/fjhrt/workflow/dto/json/HttpInfo.java  (429 B)... OK.
  src/main/java/com/fjhrt/workflow/dto/json/LogoInfo.java  (152 B)... OK.
  src/main/java/com/fjhrt/workflow/dto/json/NotifyType.java  (148 B)... OK.
  src/main/java/com/fjhrt/workflow/dto/json/NotifyTypeInfo.java  (199 B)... OK.
  src/main/java/com/fjhrt/workflow/dto/json/Properties.java  (2143 B)... OK.
  src/main/java/com/fjhrt/workflow/dto/json/Role.java  (152 B)... OK.
  src/main/java/com/fjhrt/workflow/dto/json/RoleIC.java  (160 B)... OK.
  src/main/java/com/fjhrt/workflow/dto/json/SettingsInfo.java  (291 B)... OK.
  src/main/java/com/fjhrt/workflow/dto/json/UserInfo.java  (465 B)... OK.
  src/main/java/com/fjhrt/workflow/dto/PageDTO.java  (363 B)... OK.
  src/main/java/com/fjhrt/workflow/dto/StartProcessInstanceDTO.java  (643 B)... OK.
  src/main/java/com/fjhrt/workflow/dto/StartProjectProcessInstanceDTO.java  (354 B)... OK.
  src/main/java/com/fjhrt/workflow/dto/TaskDTO.java  (523 B)... OK.
  src/main/java/com/fjhrt/workflow/entity/DepartmentsEntity.java  (1313 B)... OK.
  src/main/java/com/fjhrt/workflow/entity/FormGroupsEntity.java  (1209 B)... OK.
  src/main/java/com/fjhrt/workflow/entity/ProcessEntity.java  (2638 B)... OK.
  src/main/java/com/fjhrt/workflow/entity/RolesEntity.java  (1212 B)... OK.
  src/main/java/com/fjhrt/workflow/entity/SysOrgEntity.java  (3374 B)... OK.
  src/main/java/com/fjhrt/workflow/entity/SysStaffOrg.java  (2111 B)... OK.
  src/main/java/com/fjhrt/workflow/entity/SysUserEntity.java  (6091 B)... OK.
  src/main/java/com/fjhrt/workflow/entity/TemplateGroupEntity.java  (1324 B)... OK.
  src/main/java/com/fjhrt/workflow/entity/TemplatesEntity.java  (2366 B)... OK.
  src/main/java/com/fjhrt/workflow/entity/UserDepartmentsEntity.java  (1259 B)... OK.
  src/main/java/com/fjhrt/workflow/entity/UserRolesEntity.java  (1236 B)... OK.
  src/main/java/com/fjhrt/workflow/entity/UsersEntity.java  (1799 B)... OK.
  src/main/java/com/fjhrt/workflow/exception/BusinessException.java  (694 B)... OK.
  src/main/java/com/fjhrt/workflow/exception/GlobalExceptionHandler.java  (1100 B)... OK.
  src/main/java/com/fjhrt/workflow/job/CustomJobCmd.java  (1960 B)... OK.
  src/main/java/com/fjhrt/workflow/job/CustomJobHandler.java  (847 B)... OK.
  src/main/java/com/fjhrt/workflow/listener/ApprovalListener.java  (20786 B)... OK.
  src/main/java/com/fjhrt/workflow/listener/ProcessListener.java  (7285 B)... OK.
  src/main/java/com/fjhrt/workflow/listener/TaskCreatedListener.java  (6809 B)... OK.
  src/main/java/com/fjhrt/workflow/mapper/DepartmentsMapper.java  (651 B)... OK.
  src/main/java/com/fjhrt/workflow/mapper/FormGroupsMapper.java  (332 B)... OK.
  src/main/java/com/fjhrt/workflow/mapper/ProcessMapper.java  (7639 B)... OK.
  src/main/java/com/fjhrt/workflow/mapper/RolesMapper.java  (314 B)... OK.
  src/main/java/com/fjhrt/workflow/mapper/TemplateGroupMapper.java  (852 B)... OK.
  src/main/java/com/fjhrt/workflow/mapper/TemplatesMapper.java  (1159 B)... OK.
  src/main/java/com/fjhrt/workflow/mapper/UserDepartmentsMapper.java  (356 B)... OK.
  src/main/java/com/fjhrt/workflow/mapper/UserRolesMapper.java  (338 B)... OK.
  src/main/java/com/fjhrt/workflow/mapper/UsersMapper.java  (1193 B)... OK.
  src/main/java/com/fjhrt/workflow/query/AbstractPageQuery.java  (597 B)... OK.
  src/main/java/com/fjhrt/workflow/query/AbstractQuery.java  (3096 B)... OK.
  src/main/java/com/fjhrt/workflow/query/ProcessDynamicQuery.java  (2010 B)... OK.
  src/main/java/com/fjhrt/workflow/query/ProcessDynamicQuery2.java  (3390 B)... OK.
  src/main/java/com/fjhrt/workflow/query/ProcessQuery.java  (1863 B)... OK.
  src/main/java/com/fjhrt/workflow/query/TemplateQuery.java  (1302 B)... OK.
  src/main/java/com/fjhrt/workflow/service/IDepartmentsService.java  (366 B)... OK.
  src/main/java/com/fjhrt/workflow/service/IFormGroupsService.java  (2173 B)... OK.
  src/main/java/com/fjhrt/workflow/service/impl/DepartmentsServiceImpl.java  (970 B)... OK.
  src/main/java/com/fjhrt/workflow/service/impl/FormGroupsServiceImpl.java  (13364 B)... OK.
  src/main/java/com/fjhrt/workflow/service/impl/ProcessServiceImpl.java  (3075 B)... OK.
  src/main/java/com/fjhrt/workflow/service/impl/RolesServiceImpl.java  (529 B)... OK.
  src/main/java/com/fjhrt/workflow/service/impl/TemplateGroupServiceImpl.java  (588 B)... OK.
  src/main/java/com/fjhrt/workflow/service/impl/TemplatesServiceImpl.java  (1673 B)... OK.
  src/main/java/com/fjhrt/workflow/service/impl/UserDepartmentsServiceImpl.java  (1938 B)... OK.
  src/main/java/com/fjhrt/workflow/service/impl/UserRolesServiceImpl.java  (569 B)... OK.
  src/main/java/com/fjhrt/workflow/service/impl/UsersServiceImpl.java  (529 B)... OK.
  src/main/java/com/fjhrt/workflow/service/IProcessService.java  (1002 B)... OK.
  src/main/java/com/fjhrt/workflow/service/IRolesService.java  (315 B)... OK.
  src/main/java/com/fjhrt/workflow/service/ITemplateGroupService.java  (342 B)... OK.
  src/main/java/com/fjhrt/workflow/service/ITemplatesService.java  (487 B)... OK.
  src/main/java/com/fjhrt/workflow/service/IUserDepartmentsService.java  (825 B)... OK.
  src/main/java/com/fjhrt/workflow/service/IUserRolesService.java  (339 B)... OK.
  src/main/java/com/fjhrt/workflow/service/IUsersService.java  (315 B)... OK.
  src/main/java/com/fjhrt/workflow/utils/BpmnModelUtils.java  (38309 B)... OK.
  src/main/java/com/fjhrt/workflow/utils/DingTalkUtils.java  (3074 B)... OK.
  src/main/java/com/fjhrt/workflow/utils/EmailUtils.java  (3930 B)... OK.
  src/main/java/com/fjhrt/workflow/utils/EntWechatUtils.java  (6864 B)... OK.
  src/main/java/com/fjhrt/workflow/utils/ExUtils.java  (9327 B)... OK.
  src/main/java/com/fjhrt/workflow/utils/MinioUtils.java  (8180 B)... OK.
  src/main/java/com/fjhrt/workflow/utils/RestTemplateUtils.java  (2423 B)... OK.
  src/main/java/com/fjhrt/workflow/utils/ResultCode.java  (529 B)... OK.
  src/main/java/com/fjhrt/workflow/utils/SmsUtils.java  (1655 B)... OK.
  src/main/java/com/fjhrt/workflow/utils/XSSEscape.java  (2575 B)... OK.
  src/main/java/com/fjhrt/workflow/vo/AttachmentVO.java  (171 B)... OK.
  src/main/java/com/fjhrt/workflow/vo/BiddingVO.java  (186 B)... OK.
  src/main/java/com/fjhrt/workflow/vo/CommentVO.java  (278 B)... OK.
  src/main/java/com/fjhrt/workflow/vo/ContractVO.java  (2399 B)... OK.
  src/main/java/com/fjhrt/workflow/vo/ErrorRspVo.java  (234 B)... OK.
  src/main/java/com/fjhrt/workflow/vo/FormGroupVo.java  (721 B)... OK.
  src/main/java/com/fjhrt/workflow/vo/HandleDataVO.java  (1867 B)... OK.
  src/main/java/com/fjhrt/workflow/vo/HistoryProcessInstanceVO.java  (980 B)... OK.
  src/main/java/com/fjhrt/workflow/vo/MultiVO.java  (280 B)... OK.
  src/main/java/com/fjhrt/workflow/vo/OptionVO.java  (236 B)... OK.
  src/main/java/com/fjhrt/workflow/vo/OrgTreeVo.java  (465 B)... OK.
  src/main/java/com/fjhrt/workflow/vo/PageVo.java  (698 B)... OK.
  src/main/java/com/fjhrt/workflow/vo/ProcessVo.java  (1019 B)... OK.
  src/main/java/com/fjhrt/workflow/vo/StatusVO.java  (386 B)... OK.
  src/main/java/com/fjhrt/workflow/vo/TaskDetailVO.java  (520 B)... OK.
  src/main/java/com/fjhrt/workflow/vo/TaskVO.java  (1539 B)... OK.
  src/main/java/com/fjhrt/workflow/vo/TemplateGroupBo.java  (585 B)... OK.
  src/main/java/com/fjhrt/workflow/vo/TemplateGroupVo.java  (854 B)... OK.
  src/main/java/com/fjhrt/workflow/vo/TemplateVo.java  (1430 B)... OK.
  src/main/resources/antisamy-ebay.xml  (73104 B)... OK.
  src/main/resources/antisamy-empty.xml  (2371 B)... OK.
  src/main/resources/application-dev.yml  (486 B)... OK.
  src/main/resources/application-prod.yml  (490 B)... OK.
  src/main/resources/application-test.yml  (484 B)... OK.
  src/main/resources/application.yml  (3718 B)... OK.
  src/test/java/com/fjhrt/workflow/SimpleTest.java  (1581 B)... OK.
  pom.xml  (8654 B)... OK.
  src/main/java/com/fjhrt/workflow/dto/json/  (dir)... OK.
  src/main/java/com/fjhrt/workflow/service/impl/  (dir)... OK.
  src/main/java/com/fjhrt/workflow/common/  (dir)... OK.
  src/main/java/com/fjhrt/workflow/config/  (dir)... OK.
  src/main/java/com/fjhrt/workflow/controller/  (dir)... OK.
  src/main/java/com/fjhrt/workflow/delegate/  (dir)... OK.
  src/main/java/com/fjhrt/workflow/dto/  (dir)... OK.
  src/main/java/com/fjhrt/workflow/entity/  (dir)... OK.
  src/main/java/com/fjhrt/workflow/exception/  (dir)... OK.
  src/main/java/com/fjhrt/workflow/job/  (dir)... OK.
  src/main/java/com/fjhrt/workflow/listener/  (dir)... OK.
  src/main/java/com/fjhrt/workflow/mapper/  (dir)... OK.
  src/main/java/com/fjhrt/workflow/query/  (dir)... OK.
  src/main/java/com/fjhrt/workflow/service/  (dir)... OK.
  src/main/java/com/fjhrt/workflow/urgeentity/  (dir)... OK.
  src/main/java/com/fjhrt/workflow/utils/  (dir)... OK.
  src/main/java/com/fjhrt/workflow/vo/  (dir)... OK.
  src/main/java/com/fjhrt/workflow/  (dir)... OK.
  src/test/java/com/fjhrt/workflow/  (dir)... OK.
  src/main/java/com/fjhrt/  (dir)... OK.
  src/test/java/com/fjhrt/  (dir)... OK.
  src/main/java/com/  (dir)... OK.
  src/main/resources/mapper/  (dir)... OK.
  src/test/java/com/  (dir)... OK.
  src/main/java/  (dir)... OK.
  src/main/resources/  (dir)... OK.
  src/test/java/  (dir)... OK.
  src/main/  (dir)... OK.
  src/test/  (dir)... OK.
  src/  (dir)... OK.
Successfully extracted to "flowable-service".
Github-Id-VampireAchao:File achao$ 
```
