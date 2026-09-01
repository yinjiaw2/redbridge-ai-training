# Redbridge 客户对话训练平台

独立的 Phase 1 客户沟通情景训练项目，使用 Next.js、TypeScript 和 Tailwind CSS。

Phase 1 仅使用关键词驱动的 Mock Customer Engine，不连接 OpenAI、Claude 或其他 AI 服务。

## 本地运行

```bash
npm install
npm run dev
```

打开 `http://127.0.0.1:3000`，登录页可直接选择学员端或管理员端。

## 主要目录

- `app/`：学员端、管理员端和训练界面
- `services/customer-response/`：客户回复服务接口与 Mock 实现
- `prisma/schema.prisma`：Phase 1 PostgreSQL 数据模型
- `future/ai/`：未来 AI Provider 接入说明
- `docs/IMPLEMENTATION.md`：结构、路由与增量开发计划

## 演示账号

- 管理员：`admin@example.com`
- 学员：`student@example.com`

当前界面为可交互 MVP；正式部署前仍需将演示状态连接到 Prisma API，并在服务端实施角色授权。
