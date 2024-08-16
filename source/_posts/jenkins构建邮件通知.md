---
title: jenkins构建邮件通知
date: 2020-08-02 21:31:23
tags: java
---

开启邮箱的SMTP服务，复制授权码

![image-20200722211412870](/imgs/oss/picGo/image-20200722211412870.png)

下载插件

![image-20200722203941940](/imgs/oss/picGo/image-20200722203941940.png)

然后点击<code>Jenkins</code>的设置，注意密码是填我们上面复制的授权码

e44f883aaca356d9

![image-20200722211753164](/imgs/oss/picGo/image-20200722211753164.png)

![image-20200722211858097](/imgs/oss/picGo/image-20200722211858097.png)

然后在我们的项目目录下编写`email`模板

![image-20200726193925442](/imgs/oss/picGo/image-20200726193925442.png)

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${ENV, var="JOB_NAME"}-第${BUILD_NUMBER}次构建日志</title>
</head>

<body leftmargin="8" marginwidth="0" topmargin="8" marginheight="4"
      offset="0">
<table class="table" width="1000" border="1" cellspacing="0" cellpadding="5">
    <caption align="center"><h3>项目构建信息</h3></caption>
    <thead>
    <tr>
        <th>构建项目-<b>${PROJECT_NAME}</b></th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><font color="#CC0000"><b>构建结果 - ${BUILD_STATUS}</b></font></td>
    </tr>
    <tr>
        <td>测试数量-${TEST_COUNTS, var="total"}</td>
    </tr>
    </tbody>
    <tr>
        本邮件由系统自动发出，无需回复！<br/>
        各位同事，大家好，以下为${PROJECT_NAME}项目构建信息</br>
    </tr>

    <tr>
        <td><br/>
            <b><font color="#0B610B">构建报告</font></b>
            <hr size="2" width="100%" align="center"/>
            <ul>
                <li>构建报告：<a href="${BUILD_URL}allure/">${PROJECT_URL}allure/</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><br/>
            <b><font color="#0B610B">构建信息</font></b>
            <hr size="2" width="100%" align="center"/>
            <ul>
                <li>项目名称: ${PROJECT_NAME}</li>
                <li>构建编号: 第${BUILD_NUMBER}次构建</li>
                <li>触发原因：${CAUSE}</li>
                <li>构建状态：${BUILD_STATUS}</li>
                <li>构建日志：<a href="${BUILD_URL}console">${BUILD_URL}console</a></li>
                <li>构建 Url: <a href="${BUILD_URL}">${BUILD_URL}</a></li>
                <li>工作目录: <a href="${PROJECT_URL}ws">${PROJECT_URL}ws</a></li>
                <li>项目 Url: <a href="${PROJECT_URL}">${PROJECT_URL}</a></li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>
            <b><font color="#0B610B">构建详细信息</font></b>
            <hr size="2" width="100%" align="center"/>
            <ul>
                <li>BRANCH_NAME: ${BRANCH_NAME}</li>
                <li>CHANGE_ID: ${CHANGE_ID}</li>
                <li>CHANGE_URL: ${CHANGE_URL}</li>
                <li>CHANGE_TITLE: ${CHANGE_TITLE}</li>
                <li>CHANGE_AUTHOR: ${CHANGE_AUTHOR}</li>
                <li>CHANGE_AUTHOR_DISPLAY_NAME: ${CHANGE_AUTHOR_DISPLAY_NAME}</li>
                <li>CHANGE_AUTHOR_EMAIL: ${CHANGE_AUTHOR_EMAIL}</li>
                <li>CHANGE_TARGET: ${CHANGE_TARGET}</li>
                <li>BUILD_NUMBER: ${BUILD_NUMBER}</li>
                <li>BUILD_DISPLAY_NAME: ${BUILD_DISPLAY_NAME}</li>
                <li>BUILD_ID: ${BUILD_ID}</li>
                <li>JOB_NAME: ${JOB_NAME}</li>
                <li>JOB_BASE_NAME: ${JOB_BASE_NAME}</li>
                <li>BUILD_TAG: ${BUILD_TAG}</li>
                <li>EXECUTOR_NUMBER: ${EXECUTOR_NUMBER}</li>
                <li>NODE_NAME: ${NODE_NAME}</li>
                <li>NODE_LABELS: ${NODE_LABELS}</li>
                <li>WORKSPACE: ${WORKSPACE}</li>
                <li>JENKINS_HOME: ${JENKINS_HOME}</li>
                <li>JENKINS_URL: ${JENKINS_URL}</li>
                <li>BUILD_URL: ${BUILD_URL}</li>
                <li>JOB_URL: ${JOB_URL}</li>
                <li>GIT_COMMIT: ${GIT_COMMIT}</li>
                <li>GIT_PREVIOUS_COMMIT: ${GIT_PREVIOUS_COMMIT}</li>
                <li>GIT_PREVIOUS_SUCCESSFUL_COMMIT: ${GIT_PREVIOUS_SUCCESSFUL_COMMIT}</li>
                <li>GIT_BRANCH: ${GIT_BRANCH}</li>
                <li>GIT_LOCAL_BRANCH: ${GIT_LOCAL_BRANCH}</li>
                <li>GIT_URL: ${GIT_URL}</li>
                <li>GIT_COMMITTER_NAME: ${GIT_COMMITTER_NAME}</li>
                <li>GIT_AUTHOR_NAME: ${GIT_AUTHOR_NAME}</li>
                <li>GIT_COMMITTER_EMAIL: ${GIT_COMMITTER_EMAIL}</li>
                <li>GIT_AUTHOR_EMAIL: ${GIT_AUTHOR_EMAIL}</li>
                <li>MERCURIAL_REVISION: ${MERCURIAL_REVISION}</li>
                <li>MERCURIAL_REVISION_SHORT: ${MERCURIAL_REVISION_SHORT}</li>
                <li>MERCURIAL_REVISION_NUMBER: ${MERCURIAL_REVISION_NUMBER}</li>
                <li>MERCURIAL_REVISION_BRANCH: ${MERCURIAL_REVISION_BRANCH}</li>
                <li>MERCURIAL_REPOSITORY_URL: ${MERCURIAL_REPOSITORY_URL}</li>
                <li>SVN_REVISION: ${SVN_REVISION}</li>
                <li>SVN_URL: ${SVN_URL}</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>
            <h4><font color="#0B610B">失败用例</font></h4>
            ${FAILED_TESTS}<br/>
        </td>
    </tr>

    <tr>
        <td>
            <h4><font color="#0B610B">最近提交(#$GIT_REVISION)</font></h4>
            <!--
            <ul>
                ${CHANGES_SINCE_LAST_SUCCESS, reverse=true, format="%c", changesFormat="
                <li>%d [%a] %m</li>
                "}
            </ul>
            <-->
        </td>
    </tr>
    <tr>
        <td>
            <b><font color="#0B610B">变更信息:</font></b>
            <hr size="2" width="100%" align="center"/>
        </td>
    </tr>
    <tr>
        <td>
            <ul>
                <li>
                    上次构建成功后变化 : ${CHANGES_SINCE_LAST_SUCCESS, reverse=true, format="%c", changesFormat="<li>%d [%a] %m</li>"}
                </li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>
            <ul>
                <li>上次构建不稳定后变化 : ${CHANGES_SINCE_LAST_UNSTABLE, reverse=true, format="%c", changesFormat="<li>%d [%a] %m</li>"}
                </li>
            </ul>
        </td>
    <tr>
        <td>
            <ul>
                <li>历史变更记录 : <a href="${PROJECT_URL}changes">${PROJECT_URL}changes</a></li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>
            <ul>
                <li>变更集:${JELLY_SCRIPT,template="html"}</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><b><font color="#0B610B">构建日志 (最后 200行):</font></b>
            <hr size="2" width="100%" align="center"/>
        </td>
    </tr>
    <tr>
        <td><textarea cols="120" rows="30" readonly="readonly"
                      style="font-family: Courier New">${BUILD_LOG, maxLines=200}</textarea>
        </td>
    </tr>
</table>
</body>
</html>
```

里面的`KEY`的含义可以在

![image-20200726194302497](/imgs/oss/picGo/image-20200726194302497.png)

展开看到

##### 内容令牌参考

```java
Arguments may be given for each token in the form name="value" for strings and in the form name=value for booleans and numbers. In string arguments, escape ", \, and line terminators (\n or \r\n) with a \, e.g. arg1="\"quoted\""; arg2="c:\\path"; and arg3="one\ntwo". The brackets may be omitted if there are no arguments.

Examples: $TOKEN, ${TOKEN}, ${TOKEN, count=100}, ${ENV, var="PATH"}

Project Tokens
${DEFAULT_SUBJECT}
This is the default email subject that is configured in Jenkinss system configuration page.
${DEFAULT_CONTENT}
This is the default email content that is configured in Jenkinss system configuration page.
${DEFAULT_PRESEND_SCRIPT}
This is the default pre-send script content that is configured in Jenkinss system configuration. This is the only token supported in the pre-send script entry field.
${DEFAULT_POSTSEND_SCRIPT}
This is the default post-send script content that is configured in Jenkinss system configuration. This is the only token supported in the post-send script entry field.
${PROJECT_DEFAULT_SUBJECT}
This is the default email subject for this project. The result of using this token in the advanced configuration is what is in the Default Subject field above. WARNING: Do not use this token in the Default Subject or Content fields. Doing this has an undefined result.
${PROJECT_DEFAULT_CONTENT}
This is the default email content for this project. The result of using this token in the advanced configuration is what is in the Default Content field above. WARNING: Do not use this token in the Default Subject or Content fields. Doing this has an undefined result.

Extended Email Publisher Specific Tokens
${JELLY_SCRIPT,template="TEMPLATE_NAME"}
Custom message content generated from a Jelly script template. There are two templates provided: "html" and "text". Custom Jelly templates should be placed in <tt>$JENKINS_HOME/email-templates</tt>. When using custom templates, the template filename without ".jelly" should be used for the "template" argument. You may also use the Config File Provider plugin to manage your templates. Prefix the managed file NAME with "managed:" for the template parameter. (Example: <tt>${JELLY_SCRIPT, template="managed:ManagedFileName"}</tt>)
${SCRIPT}
Custom message content generated from a Groovy script. Custom scripts should be placed in <tt>$JENKINS_HOME/email-templates</tt>. When using a custom script the plugin will look in the resources forthe email-ext plugin first, and then in the <tt>$JENKINS_HOME/email-templates</tt>directory. No other directories will be searched. You may also use the Config File Provider plugin to manage your scripts. Prefix the managed file NAME with <tt>managed:</tt> for the template or script parameter. (Example: <tt>${SCRIPT, template="managed:ManagedFileName"}</tt>)
script
When this is used, only the last value in the script will be used in the expansion (script and template can not be used together).
template
The template in Groovy's SimpleTemplateEngine format.
${TEMPLATE}
Custom message content generated from a template file. Custom templates should be placed in <tt>$JENKINS_HOME/email-templates</tt>. When using a custom script the plugin will look in the resources forthe email-ext plugin first, and then in the <tt>$JENKINS_HOME/email-templates</tt>directory. No other directories will be searched. You may also use the Config File Provider plugin to manage your templates. Use the "Custom File" config type for the template. Prefix the managed file NAME with "managed:" for the file parameter. (Example: <tt>${TEMPLATE, file="managed:ManagedFileName"}</tt>)
file
The template in plain text format.

Token Macro Plugin Tokens
${FAILED_TESTS}
Displays failing unit test information, if any tests failed.
showStack
Shows stack trace in failing test output. Defaults to true.
showMessage
Shows error message in failing test output. Defaults to true.
maxTests
Display at most this many tests. No limit is set by default.
onlyRegressions
Display only the failing tests that are different from previous builds. Defaults to false.
escapeHtml
If set to true escapes characters in errors details and stack traces using HTML entities. Defaults to false.

${TEST_COUNTS,var="TYPE"}
Displays the number of tests based on the type (var) passed in (total, pass, fail, skip). Defaults to total.

${GIT_BRANCH}
Expands to the name of the branch that was built.
Parameters
all
If specified, all the branches that point to the given commit is listed. By default, the token expands to just one of them.
fullName
If specified, this token expands to the full branch name, such as 'origin/master'. Otherwise, it only expands to the short name, such as 'master'.

${GIT_REVISION}
Expands to the Git SHA1 commit ID that points to the commit that was built.
Parameters
length=N (optional, default to 40)
Specify the commit ID length. Full SHA1 commit ID is 40 character long, but it is common to cut it off at 8 or 12 as that often provide enough uniqueness and is a lot more legible.

${ADMIN_EMAIL}
Displays the email address for the Jenkins administrator

${BUILD_CAUSE} ${CAUSE}
Displays the cause of the build.

${BUILD_LOG_EXCERPT}
Displays an excerpt from the build log.
start
Regular expression to match the excerpt starting line (matching line is excluded).
end
Regular expression to match the excerpt ending line (matching line is excluded).
See java.util.regex.Pattern

${BUILD_LOG}
Displays the end of the build log.
maxLines
Display at most this many lines of the log. Defaults to 250.
escapeHtml
If true, HTML is escape. Defaults to false.

${BUILD_LOG_MULTILINE_REGEX}
Displays build log segments that match the regular expression.
regex
java.util.regex.Pattern
Segments of the build log that match this regular expression are included. See also null. No default. Required parameter
maxMatches
The maximum number of matches to include. If 0, all matches will be included. Defaults to 0.
showTruncatedLines
If true, include [...truncated ### lines...] lines. Defaults to true.
substText
If non-null, insert this text into the email rather than the entire segment. Defaults to null.
escapeHtml
If true, escape HTML. Defaults to false.
matchedSegmentHtmlStyle
If non-null, output HTML. Matched lines will become <b style="your-style-value">html escaped matched lines</b>. Defaults to null.

${BUILD_LOG_REGEX}
Displays lines from the build log that match the regular expression.
regex
Lines that match this regular expression are included. See also java.util.regex.Pattern.Defaults to "(?i)\\b(error|exception|fatal|fail(ed|ure)|un(defined|resolved))\\b"
linesBefore
The number of lines to include before the matching line. Lines that overlap with another match or linesAfter are only inlcuded once. Defaults to 0.
linesAfter
The number of lines to include after the matching line. Lines that overlap with another match or linesBefore are only included once. Defaults to 0.
maxMatches
The maximum number of matches to include from the head of the log. If 0, all matches will be included. Defaults to 0.
maxTailMatches
The maximum number of matches to include from the tail of the log. When combined with maxMatches, it further limits the matches to the tail end of matched results. If 0, all matches will be included. Defaults to 0.
showTruncatedLines
If true, include [...truncated ### lines...] lines. Defaults to true.
substText
If non-null, insert this text into the email rather than the entire line. Defaults to null.
escapeHtml
If true, escape HTML. Defauts to false.
matchedLineHtmlStyle
If non-null, output HTML. Matched lines will become <b style="your-style-value"> html escaped matched line</b>. Defaults to null.
addNewline
If true, adds a newline after subsText. Defaults to true.
defaultValue
This value will be used if nothing is replaced.
greedy
When false and maxMatches is non-zero it causes more conservative addition of results when used with other parameters such as linesBefore and linesAfter

${BUILD_NUMBER}
Expands to the current build number, a sequential auto-incrementing unique number that identifies the build, such as "125"

${BUILD_STATUS}
Displays the status of the current build. (failing, success, etc...)

${BUILD_URL}
Displays the URL for the current build

${CHANGES_SINCE_LAST_BUILD} ${CHANGES}
Displays the changes since the last build.
showDependencies
If true, changes to projects this build depends on are shown. Defaults to false
showPaths
If true, the paths, modified by a commit are shown. Defaults to false
format
For each commit listed, a string containing %X, where %x is one of:
%a
author
%d
date
%m
message
%p
path
%r
revision
Not all revision systems support %d and %r. If specified showPaths argument is ignored. Defaults to "[%a] %m\\n"

pathFormat
A string containing %p to indicate how to print paths. Defaults to "\\t%p\\n"
regex
A regular expression.
replace
A replacement for all sub-strings of the change message that match the given regular expression.
default
Message to use when no changes are detected. Defaults to "No changes\n"

${CHANGES_SINCE_LAST_SUCCESS}
Displays the changes since the last successful build.
reverse
If true, show most recent builds at the top instead of the bottom. Defaults to false.
format
For each build listed, a string containing %X, where %X is one of
%c
changes
%n
build number
Defaults to Changes for Build #%n\n%c\n

changesFormat
For each change in a build. See ${CHANGES_SINCE_LAST_BUILD} for placeholders.
Following Parameters are also supported: showPaths, pathFormat, showDependencies, dateFormat, regex, replace, default. See ${CHANGES_SINCE_LAST_BUILD} details.

${CHANGES_SINCE_LAST_UNSTABLE}
Expands to the changes since the last unstable or successful build.
reverse
If true, show most recent builds at the top instead of the bottom. Defaults to false.
format
For each build listed, a string containing %X, where %X is one of
%c
changes
%n
build number
Defaults to Changes for Build #%n\n%c\n

changesFormat
For each change in a build. See ${CHANGES_SINCE_LAST_BUILD} for placeholders.
Following Parameters are also supported: showPaths, pathFormat, showDependencies, dateFormat, regex, replace, default. See ${CHANGES_SINCE_LAST_BUILD} details.

${ENV,var="VARIABLENAME"}
Expands to an environment variable (specified here as VARIABLENAME) from the build environment. Note that this does not include any variables set by the build scripts themselves, only those set by Jenkins and other plugins.

${JENKINS_URL}
Displays the URL to the Jenkins server. (You can change this on the system configuration page.)

${JOB_DESCRIPTION}
Displays the description of the job.


${LOG_REGEX}
Uses a regular expression to find a single log entry and generates a new output using the capture groups from it. This is partially based on the description-setter plugin (https://github.com/jenkinsci/description-setter-plugin).

${PROJECT_NAME}
Displays the project's full name. (See AbstractProject.getFullDisplayName)
${PROJECT_DISPLAY_NAME}
Displays the project's display name. (See AbstractProject.getDisplayName)

${PROJECT_URL}
Displays a URL to the project's page.

${PROPFILE,file="FILENAME",property="PROPERTYNAME"}
Expands to the value of a property in a property file. The filename is relative to the build workspace root.

${FILE,path="PATH"}
Expands to the contents of a file. The file path is relative to the build workspace root.

${XML,file="FILE",xpath="XPATH"}
Expands to the result(s) of an XPath expression run against the given XML file.
If the XPath evaluates to more than one value, then a semicolon-separated string is returned.
The file path is relative to the build workspace root.

In addition to the tokens, you can modify the result of the token expansion using parameter expansions. They follow similar rules as bash Parameter Expansions. The supported expansions are: ${#TOKEN} which resolves to the length of the expanded token value, ${TOKEN:offset:length} which takes a substring of the token result (length is optional and offset and length can both be negative), ${TOKEN#pattern} which matches the pattern against the start of the expanded token and removes it if it, ${TOKEN%pattern} which matches the pattern against the end of the expanded token and removes it it if matches.
```

然后我们根据上面的字典继续来编写脚本

先去生成脚本

![image-20200726205246978](/imgs/oss/picGo/image-20200726205246978.png)

```groovy
post {
  always {
    // One or more steps need to be included within each condition's block.
  }
}
```

然后是脚本(内容意义可以在上面找到)

```groovy
emailext body: '${FILE,path="email.html"}', subject: '构建通知：${PROJECT_NAME} - Build # ${BUILD_NUMBER} - ${BUILD_STATUS}!', to: '1441470436@qq.com'
```

生成片段

```groovy
pipeline {
    agent any

    stages {
        stage('pull') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/${branches}']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: '83039753-8e29-49c9-8e1a-f2c33c4cb847', url: 'git@121.89.163.191:root/rubenweicowbeer.git']]])
            }
        }
        stage('build') {
            steps {
                sh label: '', script: 'mvn clean package'
            }
        }
        stage('publish') {
            steps {
                deploy adapters: [tomcat8(credentialsId: '15efa4d4-9b32-4c8d-a0b6-2aa89b72191f', path: '', url: 'http://121.89.163.191:8080')], contextPath: null, war: 'target/*.war'
            }
        }
    }
    post {
        always {
            emailext(
                body: '${FILE,path="email.html"}',
                subject: '构建通知：${PROJECT_NAME} - Build # ${BUILD_NUMBER} - ${BUILD_STATUS}!', 
                to: '1441470436@qq.com,achao1441470436@gmail.com'
            )
        }
    }
}
```

放入项目

![image-20200726211843085](/imgs/oss/picGo/image-20200726211843085.png)

更改类型

![image-20200726214412979](/imgs/oss/picGo/image-20200726214412979.png)

勾选`Allow sending to unregistered  users`

![image-20200726215218666](/imgs/oss/picGo/image-20200726215218666.png)

`push`后点击构建

顺带一提，可以安装一个`workspace cleanup plugin`插件

然后在构建后操作里勾选，可以清理缓存

收到邮件后就是这样啦

![image-20200726225511282](/imgs/oss/picGo/image-20200726225511282.png)