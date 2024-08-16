---
title: github action
date: 2024-03-10 20:39:52
tags: 运维
---

> **人一辈子都在高潮——低潮中浮沉，唯有庸碌的人，生活才如死水一般。——傅雷**

分享一下`Github Action`的文档：

[GitHub Actions 快速入门 - GitHub 文档](https://docs.github.com/zh/actions/quickstart)

# GitHub Actions 快速入门

在 5 分钟或更短的时间内尝试 GitHub Actions 的功能。

## [Introduction  介绍](https://docs.github.com/zh/actions/quickstart#introduction)

You only need a GitHub repository to create and run a GitHub Actions workflow. In this guide, you'll add a workflow that demonstrates some of the essential features of GitHub Actions.  
您只需要 GitHub 存储库即可创建和运行 GitHub Actions 工作流程。在本指南中，您将添加一个工作流程来演示 GitHub Actions 的一些基本功能。

The following example shows you how GitHub Actions jobs can be automatically triggered, where they run, and how they can interact with the code in your repository.  
以下示例向您展示了如何自动触发 GitHub Actions 作业、它们运行的​​位置以及它们如何与存储库中的代码进行交互。

## [Creating your first workflow

创建您的第一个工作流程](https://docs.github.com/zh/actions/quickstart#creating-your-first-workflow)

1. Create a `.github/workflows` directory in your repository on GitHub if this directory does not already exist. The directory must have this exact name in order for GitHub to discover any GitHub Actions workflows that it contains.  
   如果此目录尚不存在，请在 GitHub 上的存储库中创建一个 `.github/workflows` 目录。该目录必须具有此确切名称，GitHub 才能发现它包含的任何 GitHub Actions 工作流程。

2. In the `.github/workflows` directory, create a file with the `.yml` or `.yaml` extension. This tutorial will use `github-actions-demo.yml` as the file name. For more information, see "[Creating new files](https://docs.github.com/en/repositories/working-with-files/managing-files/creating-new-files)."  
   在 `.github/workflows` 目录中，创建一个扩展名为 `.yml` 或 `.yaml` 的文件。本教程将使用 `github-actions-demo.yml` 作为文件名。有关详细信息，请参阅“创建新文件”。

3. Copy the following YAML contents into the `github-actions-demo.yml` file:  
   将以下 YAML 内容复制到 `github-actions-demo.yml` 文件中：
   
   YAML
   
   ```yaml
   name: GitHub Actions Demo
   run-name: ${{ github.actor }} is testing out GitHub Actions 🚀
   on: [push]
   jobs:
    Explore-GitHub-Actions:
      runs-on: ubuntu-latest
      steps:
        - run: echo "🎉 The job was automatically triggered by a ${{ github.event_name }} event."
        - run: echo "🐧 This job is now running on a ${{ runner.os }} server hosted by GitHub!"
        - run: echo "🔎 The name of your branch is ${{ github.ref }} and your repository is ${{ github.repository }}."
        - name: Check out repository code
          uses: actions/checkout@v4
        - run: echo "💡 The ${{ github.repository }} repository has been cloned to the runner."
        - run: echo "🖥️ The workflow is now ready to test your code on the runner."
        - name: List files in the repository
          run: |          ls ${{ github.workspace }}
        - run: echo "🍏 This job's status is ${{ job.status }}."
   ```

4. Scroll to the bottom of the page and select **Create a new branch for this commit and start a pull request**. Then, to create a pull request, click **Propose new file**.  
   滚动到页面底部并选择为此提交创建新分支并启动拉取请求。然后，要创建拉取请求，请单击“提议新文件”。
   
   ![Screenshot of the "Commit new file" area of the page.](https://docs.github.com/assets/cb-67313/images/help/repository/actions-quickstart-commit-new-file.png)

Committing the workflow file to a branch in your repository triggers the `push` event and runs your workflow.  
将工作流程文件提交到存储库中的分支会触发 `push` 事件并运行您的工作流程。

## [Viewing your workflow results

查看您的工作流程结果](https://docs.github.com/zh/actions/quickstart#viewing-your-workflow-results)

1. On GitHub.com, navigate to the main page of the repository.  
   在 GitHub.com 上，导航到存储库的主页。

2. Under your repository name, click  **Actions**.  
   在您的存储库名称下，单击操作。
   
   ![Screenshot of the tabs for the "github/docs" repository. The "Actions" tab is highlighted with an orange outline.](https://docs.github.com/assets/cb-15465/images/help/repository/actions-tab-global-nav-update.png)

3. In the left sidebar, click the workflow you want to display, in this example "GitHub Actions Demo."  
   在左侧边栏中，单击要显示的工作流程，在本例中为“GitHub Actions Demo”。
   
   ![Screenshot of the "Actions" page. The name of the example workflow, "GitHub Actions Demo", is highlighted by a dark orange outline.](https://docs.github.com/assets/cb-64036/images/help/repository/actions-quickstart-workflow-sidebar.png)

4. From the list of workflow runs, click the name of the run you want to see, in this example "USERNAME is testing out GitHub Actions."  
   从工作流运行列表中，单击要查看的运行的名称，在此示例中为“USERNAME istesting out GitHub Actions”。

5. In the left sidebar of the workflow run page, under **Jobs**, click the **Explore-GitHub-Actions** job.  
   在工作流运行页面左侧边栏中的“作业”下，单击“Explore-GitHub-Actions”作业。
   
   ![Screenshot of the "Workflow run" page. In the left sidebar, the "Explore-GitHub-Actions" job is highlighted with a dark orange outline.](https://docs.github.com/assets/cb-53821/images/help/repository/actions-quickstart-job.png)

6. The log shows you how each of the steps was processed. Expand any of the steps to view its details.  
   日志显示每个步骤的处理方式。展开任意步骤以查看其详细信息。
   
   ![Screenshot of steps run by the workflow.](https://docs.github.com/assets/cb-95213/images/help/repository/actions-quickstart-logs.png)
   
   For example, you can see the list of files in your repository:  
   例如，您可以查看存储库中的文件列表：![Screenshot of the "List files in the repository" step expanded to show the log output. The output for the step is highlighted with a dark orange highlight.](https://docs.github.com/assets/cb-53979/images/help/repository/actions-quickstart-log-detail.png)

The example workflow you just added is triggered each time code is pushed to the branch, and shows you how GitHub Actions can work with the contents of your repository. For an in-depth tutorial, see "[Understanding GitHub Actions](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions)."  
每次将代码推送到分支时都会触发您刚刚添加的示例工作流程，并向您展示 GitHub Actions 如何处理存储库的内容。有关深入的教程，请参阅“了解 GitHub 操作”。

## [More starter workflows](https://docs.github.com/zh/actions/quickstart#more-starter-workflows)

GitHub provides preconfigured starter workflows that you can customize to create your own continuous integration workflow. GitHub analyzes your code and shows you CI starter workflows that might be useful for your repository. For example, if your repository contains Node.js code, you'll see suggestions for Node.js projects. You can use starter workflows as a starting place to build your custom workflow or use them as-is.  
GitHub 提供了预配置的入门工作流程，您可以自定义这些工作流程以创建您自己的持续集成工作流程。 GitHub 会分析您的代码并向您展示可能对您的存储库有用的 CI 入门工作流程。例如，如果您的存储库包含 Node.js 代码，您将看到有关 Node.js 项目的建议。您可以使用入门工作流程作为构建自定义工作流程的起点，也可以按原样使用它们。

You can browse the full list of starter workflows in the [actions/starter-workflows](https://github.com/actions/starter-workflows) repository.  
您可以在 actions/starter-workflows 存储库中浏览入门工作流程的完整列表。

## [Next steps](https://docs.github.com/zh/actions/quickstart#next-steps)

GitHub Actions can help you automate nearly every aspect of your application development processes. Ready to get started? Here are some helpful resources for taking your next steps with GitHub Actions:  
GitHub Actions 可以帮助您自动化应用程序开发流程的几乎每个方面。准备好开始了吗？以下是一些有用的资源，可帮助您使用 GitHub Actions 采取后续步骤：

- For a quick way to create a GitHub Actions workflow, see "[Using starter workflows](https://docs.github.com/en/actions/learn-github-actions/using-starter-workflows)."  
  有关创建 GitHub Actions 工作流程的快速方法，请参阅“使用入门工作流程”。
- For continuous integration (CI) workflows to build and test your code, see "[Automating builds and tests](https://docs.github.com/en/actions/automating-builds-and-tests)."  
  有关构建和测试代码的持续集成 (CI) 工作流程，请参阅“自动化构建和测试”。
- For building and publishing packages, see "[Publishing packages](https://docs.github.com/en/actions/publishing-packages)."  
  有关构建和发布包的信息，请参阅“发布包”。
- For deploying projects, see "[Deployment](https://docs.github.com/en/actions/deployment)."  
  有关部署项目的信息，请参阅“部署”。
- For automating tasks and processes on GitHub, see "[Managing issues and pull requests](https://docs.github.com/en/actions/managing-issues-and-pull-requests)."  
  有关 GitHub 上的自动化任务和流程的信息，请参阅“管理问题和拉取请求”。
- For examples that demonstrate more complex features of GitHub Actions, including many of the above use cases, see "[Examples](https://docs.github.com/en/actions/examples)." You can see detailed examples that explain how to test your code on a runner, access the GitHub CLI, and use advanced features such as concurrency and test matrices.  
  有关演示 GitHub Actions 更复杂功能的示例（包括上述许多用例），请参阅“示例”。您可以查看详细的示例，这些示例解释了如何在运行器上测试代码、访问 GitHub CLI 以及使用并发和测试矩阵等高级功能。
- If you want to certify your proficiency in automating workflows and accelerating development with GitHub Actions, you can earn a GitHub Actions certificate with GitHub Certifications. For more information, see "[About GitHub Certifications](https://docs.github.com/en/get-started/showcase-your-expertise-with-github-certifications/about-github-certifications)."  
  如果您想证明您在自动化工作流程和使用 GitHub Actions 加速开发方面的熟练程度，您可以通过 GitHub Certifications 获得 GitHub Actions 证书。有关更多信息，请参阅“关于 GitHub 认证”。
