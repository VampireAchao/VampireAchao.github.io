---
title: xxl-job restful api
date: 2024-01-05 12:48:51
tags: java
---

> 谁若与集体脱离，谁的命运就要悲哀。——奥斯特洛夫斯基

昨天对接了`xxl-job`的`restful api`，发现其没有提供查询`job`信息的`api`，于是自己拓展

在原先`com.xxl.job.admin.controller.JobApiController#api`添加

```java
    /**
     * api
     *
     * @param uri
     * @param data
     * @return
     */
    @RequestMapping("/{uri}")
    @ResponseBody
    @PermissionLimit(limit=false)
    public ReturnT<?> api(HttpServletRequest request, @PathVariable("uri") String uri, @RequestBody(required = false) String data) {

        // valid
        if (!"POST".equalsIgnoreCase(request.getMethod())) {
            return new ReturnT<String>(ReturnT.FAIL_CODE, "invalid request, HttpMethod not support.");
        }
        if (uri==null || uri.trim().length()==0) {
            return new ReturnT<String>(ReturnT.FAIL_CODE, "invalid request, uri-mapping empty.");
        }
        if (XxlJobAdminConfig.getAdminConfig().getAccessToken()!=null
                && XxlJobAdminConfig.getAdminConfig().getAccessToken().trim().length()>0
                && !XxlJobAdminConfig.getAdminConfig().getAccessToken().equals(request.getHeader(XxlJobRemotingUtil.XXL_JOB_ACCESS_TOKEN))) {
            return new ReturnT<String>(ReturnT.FAIL_CODE, "The access token is wrong.");
        }

        // services mapping
        if ("callback".equals(uri)) {
            List<HandleCallbackParam> callbackParamList = GsonTool.fromJson(data, List.class, HandleCallbackParam.class);
            return adminBiz.callback(callbackParamList);
        } else if ("registry".equals(uri)) {
            RegistryParam registryParam = GsonTool.fromJson(data, RegistryParam.class);
            return adminBiz.registry(registryParam);
        } else if ("registryRemove".equals(uri)) {
            RegistryParam registryParam = GsonTool.fromJson(data, RegistryParam.class);
            return adminBiz.registryRemove(registryParam);
        } else if ("pageList".equals(uri)) {
            ReturnT<Map<String, Object>> success = new ReturnT<>();
            JobQuery jobQuery = GsonTool.fromJson(data, JobQuery.class);
            Map<String, Object> pageList = xxlJobService.pageList(
                    jobQuery.getStart(),
                    jobQuery.getLength(),
                    jobQuery.getJobGroup(),
                    jobQuery.getTriggerStatus(),
                    jobQuery.getJobDesc(),
                    jobQuery.getExecutorHandler(),
                    jobQuery.getAuthor());
            success.setContent(pageList);
            return success;
        } else {
            return new ReturnT<String>(ReturnT.FAIL_CODE, "invalid request, uri-mapping("+ uri +") not found.");
        }

    }
```

这里参数

```java
public class JobQuery {
        private Integer start;
        private Integer length;
        private Integer jobGroup;
        private Integer triggerStatus;
        private String jobDesc;
        private String executorHandler;
        private String author;

        public Integer getStart() {
            return start;
        }

        public void setStart(Integer start) {
            this.start = start;
        }

        public Integer getLength() {
            return length;
        }

        public void setLength(Integer length) {
            this.length = length;
        }

        public Integer getJobGroup() {
            return jobGroup;
        }

        public void setJobGroup(Integer jobGroup) {
            this.jobGroup = jobGroup;
        }

        public Integer getTriggerStatus() {
            return triggerStatus;
        }

        public void setTriggerStatus(Integer triggerStatus) {
            this.triggerStatus = triggerStatus;
        }

        public String getJobDesc() {
            return jobDesc;
        }

        public void setJobDesc(String jobDesc) {
            this.jobDesc = jobDesc;
        }

        public String getExecutorHandler() {
            return executorHandler;
        }

        public void setExecutorHandler(String executorHandler) {
            this.executorHandler = executorHandler;
        }

        public String getAuthor() {
            return author;
        }

        public void setAuthor(String author) {
            this.author = author;
        }
    }
```

然后是修改对应的`service`和`impl`的签名

`com.xxl.job.admin.service.XxlJobService#pageList`

```java
public Map<String, Object> pageList(Integer start, Integer length, Integer jobGroup, Integer triggerStatus, String jobDesc, String executorHandler, String author);
```

`com.xxl.job.admin.service.impl.XxlJobServiceImpl#pageList`

```java
	@Override
	public Map<String, Object> pageList(Integer start, Integer length, Integer jobGroup, Integer triggerStatus, String jobDesc, String executorHandler, String author) {

		start = Optional.ofNullable(start).orElse(0);
		length = Optional.ofNullable(length).orElse(10);
		// page list
		List<XxlJobInfo> list = xxlJobInfoDao.pageList(start, length, jobGroup, triggerStatus, jobDesc, executorHandler, author);
		int list_count = xxlJobInfoDao.pageListCount(start, length, jobGroup, triggerStatus, jobDesc, executorHandler, author);

		// package result
		Map<String, Object> maps = new HashMap<String, Object>();
	    maps.put("recordsTotal", list_count);		// 总记录数
	    maps.put("recordsFiltered", list_count);	// 过滤后的总记录数
	    maps.put("data", list);  					// 分页列表
		return maps;
	}
```

然后是`mapper`

`com.xxl.job.admin.dao.XxlJobInfoDao`

```java
	public List<XxlJobInfo> pageList(@Param("offset") Integer offset,
									 @Param("pagesize") Integer pagesize,
									 @Param("jobGroup") Integer jobGroup,
									 @Param("triggerStatus") Integer triggerStatus,
									 @Param("jobDesc") String jobDesc,
									 @Param("executorHandler") String executorHandler,
									 @Param("author") String author);

	public int pageListCount(@Param("offset") Integer offset,
							 @Param("pagesize") Integer pagesize,
							 @Param("jobGroup") Integer jobGroup,
							 @Param("triggerStatus") Integer triggerStatus,
							 @Param("jobDesc") String jobDesc,
							 @Param("executorHandler") String executorHandler,
							 @Param("author") String author);
```

以及`XxlJobInfoMapper.xml`

```xml
	<select id="pageList" parameterType="java.util.HashMap" resultMap="XxlJobInfo">
		SELECT <include refid="Base_Column_List" />
		FROM xxl_job_info AS t
		<trim prefix="WHERE" prefixOverrides="AND | OR" >
			<if test="jobGroup != null and jobGroup gt 0">
				AND t.job_group = #{jobGroup}
			</if>
            <if test="triggerStatus != null and triggerStatus gte 0">
                AND t.trigger_status = #{triggerStatus}
            </if>
			<if test="jobDesc != null and jobDesc != ''">
				AND t.job_desc like CONCAT(CONCAT('%', #{jobDesc}), '%')
			</if>
			<if test="executorHandler != null and executorHandler != ''">
				AND t.executor_handler like CONCAT(CONCAT('%', #{executorHandler}), '%')
			</if>
			<if test="author != null and author != ''">
				AND t.author like CONCAT(CONCAT('%', #{author}), '%')
			</if>
		</trim>
		ORDER BY id DESC
		LIMIT #{offset}, #{pagesize}
	</select>

	<select id="pageListCount" parameterType="java.util.HashMap" resultType="int">
		SELECT count(1)
		FROM xxl_job_info AS t
		<trim prefix="WHERE" prefixOverrides="AND | OR" >
			<if test="jobGroup != null and jobGroup gt 0">
				AND t.job_group = #{jobGroup}
			</if>
			<if test="triggerStatus != null and triggerStatus gte 0">
                AND t.trigger_status = #{triggerStatus}
            </if>
			<if test="jobDesc != null and jobDesc != ''">
				AND t.job_desc like CONCAT(CONCAT('%', #{jobDesc}), '%')
			</if>
			<if test="executorHandler != null and executorHandler != ''">
				AND t.executor_handler like CONCAT(CONCAT('%', #{executorHandler}), '%')
			</if>
			<if test="author != null and author != ''">
				AND t.author like CONCAT(CONCAT('%', #{author}), '%')
			</if>
		</trim>
	</select>
```

至此，终于可以通过请求

```http
http://localhost:8080/xxl-job-admin/api/pageList
```

查询到`job`列表了，别忘了在`header`里携带`token`

```http
XXL-JOB-ACCESS-TOKEN:{xxl.job.accessToken}
```
