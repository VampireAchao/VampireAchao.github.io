---
title: full-stack-fastapi-template
date: 2024-03-17 20:51:59
tags: 前端
---

> 过一个平凡无趣的人生实在太容易了，你可以不读书，不冒险，不运动，不写作，不外出，不折腾。但是，人生最后悔的事情就是：我本可以。——陈素封

分享一个全栈框架

[GitHub - tiangolo/full-stack-fastapi-template: Full stack, modern web application template. Using FastAPI, React, SQLModel, PostgreSQL, Docker, GitHub Actions, automatic HTTPS and more.](https://github.com/tiangolo/full-stack-fastapi-template)

全栈、现代 Web 应用程序模板。使用 FastAPI、React、SQLModel、PostgreSQL、Docker、GitHub Actions、自动 HTTPS 等

- ⚡ 用于 Python 后端 API 的 FastAPI。
  - 🧰 用于 Python SQL 数据库交互 (ORM) 的 SQLModel。
  - 🔍 Pydantic，由 FastAPI 使用，用于数据验证和设置管理。
  - 💾 PostgreSQL 作为 SQL 数据库。
- 🚀 React 前端。
  - 💃 使用 TypeScript、hooks、Vite 和现代前端堆栈的其他部分。
  - 🎨 前端组件的 Chakra UI。
  - 🤖 自动生成的前端客户端。
  - 🦇 深色模式支持。
- 🐋 用于开发和生产的 Docker Compose。
- 🔒 默认情况下安全密码哈希。
- 🔑 JWT 令牌身份验证。
- 📫 基于电子邮件的密码恢复。
-  ✅ 使用 Pytest 进行测试。
- 📞 Traefik 作为反向代理/负载均衡器。
- 🚢 使用 Docker Compose 的部署说明，包括如何设置前端 Traefik 代理来处理自动 HTTPS 证书。
- 🏭 基于 GitHub Actions 的 CI（持续集成）和 CD（持续部署）。



后端文档: [backend/README.md](https://github.com/tiangolo/full-stack-fastapi-template/blob/master/backend/README.md)

前端文档: [frontend/README.md](https://github.com/tiangolo/full-stack-fastapi-template/blob/master/frontend/README.md)

部署文档: [deployment.md](https://github.com/tiangolo/full-stack-fastapi-template/blob/master/deployment.md)
