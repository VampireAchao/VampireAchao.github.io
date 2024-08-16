---
title: 配置github的issue模板
date: 2024-07-20 20:41:14
tags: 小技巧
---

> 宿命论是那些缺乏意志力的弱者的借口。 —— 罗曼·罗兰

文档如下：

[为仓库配置议题模板 - GitHub 文档](https://docs.github.com/zh/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository)

这里有个`demo`

```yml
name: Bug Report
description: File a bug report.
title: "[Bug]: "
labels: ["bug", "triage"]
projects: ["octo-org/1", "octo-org/44"]
assignees:
  - octocat
body:
  - type: markdown
    attributes:
      value: |
        Thanks for taking the time to fill out this bug report!
  - type: input
    id: contact
    attributes:
      label: Contact Details
      description: How can we get in touch with you if we need more info?
      placeholder: ex. email@example.com
    validations:
      required: false
  - type: textarea
    id: what-happened
    attributes:
      label: What happened?
      description: Also tell us, what did you expect to happen?
      placeholder: Tell us what you see!
      value: "A bug happened!"
    validations:
      required: true
  - type: dropdown
    id: version
    attributes:
      label: Version
      description: What version of our software are you running?
      options:
        - 1.0.2 (Default)
        - 1.0.3 (Edge)
      default: 0
    validations:
      required: true
  - type: dropdown
    id: browsers
    attributes:
      label: What browsers are you seeing the problem on?
      multiple: true
      options:
        - Firefox
        - Chrome
        - Safari
        - Microsoft Edge
  - type: textarea
    id: logs
    attributes:
      label: Relevant log output
      description: Please copy and paste any relevant log output. This will be automatically formatted into code, so no need for backticks.
      render: shell
  - type: checkboxes
    id: terms
    attributes:
      label: Code of Conduct
      description: By submitting this issue, you agree to follow our [Code of Conduct](https://example.com). 
      options:
        - label: I agree to follow this project's Code of Conduct
          required: true

```

需要放到`.github/ISSUE_TEMPLATE` 文件夹
