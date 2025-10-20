# My Game Gallery

一个现代化的游戏收藏展示网站，使用 NeoDB API 展示您的游戏收藏。

## 功能特性

- 📊 **四种游戏状态**：想玩、在玩、已玩过、不玩了
- 🔍 **实时搜索**：支持模糊搜索游戏名称（包括本地化标题）
- 🎮 **平台识别**：自动识别并显示游戏平台图标（Steam、PlayStation、Switch、Xbox）
- 🌓 **深浅色主题**：支持系统主题自动切换
- 📱 **响应式设计**：完美适配桌面、平板和移动设备
- ⚡ **性能优化**：24小时数据缓存，快速加载

## 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS + shadcn/ui
- **主题**: next-themes
- **图标**: Lucide React
- **部署**: Vercel

## 快速开始

### 1. 克隆项目

```bash
git clone <your-repo-url>
cd My-Game-Gallery
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

复制 `.env.local.example` 并重命名为 `.env.local`：

```bash
cp .env.local.example .env.local
```

然后编辑 `.env.local`，填入您的 NeoDB Access Token：

```env
NEODB_ACCESS_TOKEN=your_access_token_here
```

**如何获取 NeoDB Access Token：**

1. 访问 [NeoDB](https://neodb.social/)
2. 登录您的账号
3. 进入设置页面
4. 在 API 设置中生成 Access Token

### 4. 运行开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

### 5. 构建生产版本

```bash
npm run build
npm start
```

## 使用说明

### 添加平台标签

为了在游戏卡片上显示平台图标，您需要在 NeoDB 上为每个游戏添加平台标签：

支持的平台标签：

- **Steam**: `steam` 或 `pc`
- **PlayStation**: `ps4`、`ps5`、`playstation`、`ps`
- **Nintendo Switch**: `switch` 或 `ns`
- **Xbox**: `xbox`、`xsx`、`xss`、`xb`

例如，如果您在 PS5 上玩了《最后生还者》，可以在 NeoDB 上为该游戏添加 `ps5` 标签。

### 搜索功能

- 使用顶部搜索栏即可搜索游戏
- 支持快捷键：`Cmd/Ctrl + K` 快速聚焦到搜索栏
- 支持搜索游戏名称和所有本地化标题

## 项目结构

```
my-game-gallery/
├── app/
│   ├── api/
│   │   └── games/          # API 路由
│   ├── layout.tsx          # 全局布局
│   ├── page.tsx            # 首页
│   └── globals.css         # 全局样式
├── components/
│   ├── game-card.tsx       # 游戏卡片组件
│   ├── search-bar.tsx      # 搜索栏组件
│   ├── tab-navigation.tsx  # 标签页导航
│   ├── theme-toggle.tsx    # 主题切换按钮
│   └── theme-provider.tsx  # 主题提供者
├── lib/
│   ├── neodb.ts           # NeoDB API 调用逻辑
│   ├── types.ts           # TypeScript 类型定义
│   └── utils.ts           # 工具函数
├── public/
│   └── platform-icons/    # 平台图标
└── .env.local            # 环境变量（不提交到 Git）
```

## 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 上导入项目
3. 在 Vercel 项目设置中添加环境变量 `NEODB_ACCESS_TOKEN`
4. 部署完成！

## 自定义域名

在 Vercel 项目设置中的 "Domains" 选项卡中添加您的自定义域名。

## 常见问题

### Q: 为什么看不到游戏数据？

A: 请确保：

1. 已正确配置 `.env.local` 中的 `NEODB_ACCESS_TOKEN`
2. Token 有效且具有访问权限
3. 在 NeoDB 上至少添加了一些游戏

### Q: 如何更新游戏数据？

A: 项目使用 24 小时缓存机制。数据会自动在 24 小时后刷新。如需立即刷新，可以重启开发服务器或重新部署。

### Q: 支持哪些平台？

A: 目前支持 Steam、PlayStation、Nintendo Switch 和 Xbox。您可以在 `lib/types.ts` 中的 `PLATFORM_CONFIG` 添加更多平台。

## 开发计划

- [ ] 添加游戏时长统计（需要集成其他平台 API）
- [ ] 添加游戏评分显示
- [ ] 支持更多平台
- [ ] 添加游戏统计图表
- [ ] 导出功能

## 许可证

MIT

## 鸣谢

- 数据来源：[NeoDB](https://neodb.social/)
- UI 组件：[shadcn/ui](https://ui.shadcn.com/)
- 图标：[Lucide](https://lucide.dev/)
