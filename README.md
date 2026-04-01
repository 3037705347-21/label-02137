# 图书管理系统 (Book Management System)

基于 Vue3 + Vite + Element Plus 构建的图书管理系统，支持用户登录认证、图书增删改查、分页搜索等功能。

## How to Run

### 方式一：Docker 运行（推荐）

```bash
# 在项目根目录执行
docker-compose up --build -d

# 查看运行状态
docker-compose ps

# 查看日志
docker-compose logs -f frontend-admin

# 停止服务
docker-compose down
```

### 方式二：本地开发运行

```bash
# 进入项目目录
cd frontend-admin

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 方式三：生产构建预览

```bash
cd frontend-admin
npm install
npm run build
npm run preview
```

## Services

| 服务名称 | 端口 | 说明 |
|---------|------|------|
| frontend-admin | 8081 | 图书管理系统前端服务 |

## 测试账号

| 用户名 | 密码 | 说明 |
|--------|------|------|
| admin | 123456 | 管理员账号 |

登录成功后显示：
- 姓名：平雨萌
- 学号：2023140023637

## 题目内容

严格按要求实现每一个功能。总体要求：
基于vite新建一个Vue3项目，项目名称命名为bookmanage。
项目采用Element Plus 、vue-axios、 vue-router、pinia 登技术进行开发。使用Element-plus进行页面 布局 ，使用前端 路由 实现各页面导航跳转，使用 pinia 管理用户登录状态和其他全局状态 ，以增强应用的状态管理能力。使用Mock.js 结合 Axios 模拟数据请求，实现对图书数据的增删改查操作。
界面布局应美观大方、页面交互方式友好，对数据进行修改的编辑、删除等重要操作须给出用户二次确认提示。
组件结构：
App.vue：根组件，作为项目的登录首页。
MainView.vue：主展示页面，显示欢迎语和登出按钮。
BookList.vue：图书列表页面。
BookAdd.vue：添加图书页面。
BookEdit.vue：图书编辑页面。
功能需求：
首页提供登录入口，输入用户名和密码后点击登录按钮，通过Mock.js 模拟登录接口请求（只有用户名：admin与密码：123456的组合，允许模拟登录成功，其他情况，则模拟登录失败场景并给出相关提示）。登录成功时需将自己的姓名和学号分别存入当前登录用户状态数据的name和id属性中。（我的学号：2023140023637，姓名：平雨萌）
模拟登录成功时跳转到MainView 页面，在 MainView 页面顶部需展示“欢迎XXX，ID：YYY”，其中“XXX”和“YYY”分别为从登录用户状态数据中取出的name和id。
已登录状态下，提供“登出”按钮，点击后模拟退出登录过程，重置 pinia 中的用户状态，返回登录页面，用户可重新登录。
所有图书管理页面（列表、新增、编辑）必须在已登录状态下才能访问，不允许未登录状态下直接访问到相关页面。
图书管理
1，使用el-pagination 实现图书列表分页展示效果。
2，支持通过文本框输入查询条件（至少实现两个查询条件）检索图书。
3，提供添加、编辑和删除单条图书信息的功能，所有操作均需调用Mock.js 模拟的数据接口，通过 Axios 发起请求。
4，利用pinia 管理本地存储的状态，图书信息的增删改查操作通过pinia进行状态同步，确保数据的一致性和可靠性。
5，图书信息的增、删、改、查相关的接口使用mockjs+axios进行模拟设计实现网络请求。
6，图书添加、编辑、删除接口中必须记录操作日志，使用consle.log模拟打印。

### 技术栈

- Vue 3.4
- Vite 5.1
- Element Plus 2.6
- Vue Router 4.3
- Pinia 2.1
- Axios 1.6
- Mock.js 1.1

## 项目结构

```
.
├── frontend-admin/              # 前端管理后台
│   ├── public/                  # 静态资源
│   │   └── vite.svg
│   ├── src/
│   │   ├── api/                 # API 接口封装
│   │   │   ├── book.js          # 图书相关接口
│   │   │   ├── request.js       # Axios 实例配置
│   │   │   └── user.js          # 用户相关接口
│   │   ├── mock/                # Mock 数据模拟
│   │   │   ├── book.js          # 图书接口模拟
│   │   │   ├── index.js         # Mock 入口
│   │   │   └── user.js          # 用户接口模拟
│   │   ├── router/              # 路由配置
│   │   │   └── index.js         # 路由定义与守卫
│   │   ├── stores/              # Pinia 状态管理
│   │   │   ├── book.js          # 图书状态
│   │   │   └── user.js          # 用户状态
│   │   ├── views/               # 页面组件
│   │   │   ├── BookAdd.vue      # 添加图书
│   │   │   ├── BookEdit.vue     # 编辑图书
│   │   │   ├── BookList.vue     # 图书列表
│   │   │   ├── LoginView.vue    # 登录页面
│   │   │   ├── MainView.vue     # 主布局页面
│   │   │   └── WelcomeView.vue  # 欢迎页面
│   │   ├── App.vue              # 根组件
│   │   └── main.js              # 应用入口
│   ├── .gitignore               # Git 忽略配置
│   ├── Dockerfile               # Docker 构建文件
│   ├── index.html               # HTML 入口
│   ├── nginx.conf               # Nginx 配置
│   ├── package.json             # 项目依赖
│   └── vite.config.js           # Vite 配置
├── .gitignore                   # 根目录 Git 忽略配置
├── docker-compose.yml           # Docker Compose 配置
└── README.md                    # 项目说明文档
```

## 界面设计规范

- 视觉分层：通过背景色、卡片阴影、边框区分功能区
- 布局对齐：使用 Flex 布局，间距统一（8px/16px/24px）
- 交互反馈：按钮有 Hover 效果，操作有 Toast/Message 提示
- 风格统一：字体颜色、字号、圆角风格全站一致

---

**开发者**：平雨萌
**学号**：2023140023637
