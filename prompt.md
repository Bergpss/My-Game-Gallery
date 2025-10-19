产品形态：网站。
一句话介绍产品功能：展示用户当前在玩、想要玩、已玩过、不玩了的游戏。
游戏数据来源：NeoDB
API示例：在 NeoDB-API-example.md 文件中
网站设计：干净、现代化
技术栈要求：尽量使用最先进的技术，例如：Next.js、tailwindcss等。
可以读取 NeoDB-API-example.md 文件

## NeoDB API 集成细节
- 用户通过 NeoDB 提供的 ACCESS_TOKEN 进行API认证，存储在环境变量中
- 暂不需要在网站上提供配置界面来更新 token，因为用户只有我一人，并且 token 是固定的
- 数据更新频率：每24小时一次，服务器端自动更新，使用 Next.js 的 revalidate 或 Server Actions 来实现你来判断，我无法判断

## 用户认证与数据
- 网站为单用户（只有我用于展示数据用）
- 数据需要本地缓存（可以提高网站的效率吗？），使用 Next.js 的缓存机制
- 首次访问时应直接从 API 取数据
- 游戏数量不到50个，你来判断是否需要处理分页

### 分页处理具体方案
```
方案 1：立即实现完整分页支持（推荐）

  优点：
  - 一次性解决未来问题，无需后续重构
  - 代码更健壮，适应数据增长
  - 性能更好（即使现在数据少，也为未来优化）

  实现方式：
  // 递归获取所有页面的数据
  async function fetchAllGames(shelfType: string) {
    let allGames = [];
    let currentPage = 1;
    let totalPages = 1;

    while (currentPage <= totalPages) {
      const response = await fetch(
        `https://neodb.social/api/me/shelf/${shelfType}?category=game&page=${currentPage}`
      );
      const data = await response.json();

      allGames = [...allGames, ...data.data];
      totalPages = data.pages;
      currentPage++;
    }

    return allGames;
  }

  理由：
  1. API 已经提供了完整的分页信息（pages 和 count），实现成本不高
  2. 避免未来的技术债务：当游戏数量增加到 100+ 时，你可能会忘记这个问题
  3. 代码质量更高：一次性做对，符合工程最佳实践
  4. 性能考虑：虽然现在数据少，但良好的架构为未来优化打基础

```

## 游戏分类展示
- 四种状态展示方式：分标签页展示

## 功能范围
- 需要搜索功能
    - 可搜索游戏名称，也就是 API示例 里的 title 和 localized_title
    - 支持模糊搜索
    - 需要支持实时搜索
- 不需要详情页，但支持点击游戏封面跳转到 NeoDB 的对应页，例如 API 示例里的 id 的值："id": "https://neodb.social/game/309pMURhdnq7lrXxNt4O1n"
- 不支持手动添加、编辑游戏状态，一切都从 NeoDB API 获取，也就是在 NeoDB 上编辑这些状态
- 需要支持统计功能，如：游戏数量、游戏时长（数据得从其他平台获取，比如：steam、PS、switch等）
- 游戏时长，暂不清楚是否可以直接获取平台的数据，可以暂时不实现

## 设计细节
- 支持深浅色模式切换，使用 next-themes 库来实现，默认主题：跟随系统
- 游戏展示以卡片形式，需要悬停效果（hover 时卡片放大）
- 需要展示游戏封面图，地址在 API示例 里的 cover_image_url
- 可以通过 URL 判断平台，external_resources，如包含 steampowered.com 就是 Steam，卡片上显示所属平台的图标
- 暂不需要显示评分
- 没有参考的网站，直接按照现代化、简洁风格设计
- 可以使用 shadcn/ui

## 部署方式
- Vercel 即可
- 需要自定义域名

## 响应式设计
- 需要支持移动端访问
- 不同屏幕尺寸下的卡片布局：（如桌面端一行4个，平板一行2个，手机一行1个）


## 项目结构
建议使用 Next.js 15 (App Router) + TypeScript，目录结构如下：
my-game-gallery/
├── app/
│   ├── layout.tsx          # 全局布局（主题切换）
│   ├── page.tsx             # 首页
│   └── api/
│       └── games/
│           └── route.ts     # API 路由（获取 NeoDB 数据）
├── components/
│   ├── GameCard.tsx         # 游戏卡片组件
│   ├── SearchBar.tsx        # 搜索栏组件
│   ├── TabNavigation.tsx    # 标签页导航
│   └── ThemeToggle.tsx      # 主题切换按钮
├── lib/
│   ├── neodb.ts             # NeoDB API 调用逻辑
│   └── types.ts             # TypeScript 类型定义
├── public/
│   └── platform-icons/      # 平台图标（Steam、PS、Switch等）
└── .env.local               # 环境变量（ACCESS_TOKEN）

## 技术栈确认
- 框架：Next.js 15 (App Router)
- 样式：Tailwind CSS + shadcn/ui（提供现代化的 UI 组件）
- 主题切换：next-themes
- 搜索：JavaScript原生实现
- 部署：Vercel