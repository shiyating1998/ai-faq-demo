# SEO FAQ生成器 (Geo FAQ)

一个专业的SEO优化FAQ内容生成工具，旨在提升搜索引擎排名和AI模型引用概率。

## 🚀 功能特性

- **SEO优化**: 自动生成符合搜索引擎优化标准的FAQ内容
- **AI友好**: 优化内容结构，提高被ChatGPT、Claude等AI模型引用的概率
- **结构化数据**: 自动添加JSON-LD Schema.org标记
- **现代UI**: 使用Tailwind CSS构建的美观响应式界面
- **多页面应用**: 
  - 主页：展示核心功能和示例FAQ
  - 生成页面：AI驱动的FAQ内容生成
  - 主题库：预设FAQ主题浏览

## 🛠️ 技术栈

- **前端框架**: Next.js 14.1.3
- **UI框架**: React 18.2.0
- **样式**: Tailwind CSS
- **语言**: TypeScript
- **AI集成**: OpenAI API
- **SEO优化**: next-sitemap

## 📦 安装

1. 克隆项目
```bash
git clone <repository-url>
cd geo_faq
```

2. 安装依赖
```bash
npm install
```

3. 环境变量配置
创建 `.env.local` 文件并添加必要的环境变量：
```env
OPENAI_API_KEY=your_openai_api_key_here
```

## 🚀 启动项目

### 开发环境
```bash
npm run dev
```
访问 http://localhost:3000

### 生产构建
```bash
npm run build
npm start
```

### 生成站点地图
构建后会自动生成站点地图：
```bash
npm run postbuild
```

## 📂 项目结构

```
geo_faq/
├── pages/
│   ├── index.tsx          # 主页
│   ├── generate.tsx       # FAQ生成页面
│   ├── topics.tsx         # 主题库页面
│   ├── faq/              # FAQ详情页面
│   ├── api/              # API路由
│   └── _app.tsx          # 应用配置
├── components/
│   └── FormattedAnswer.tsx # 格式化答案组件
├── data/
│   └── faqs.ts           # FAQ数据
├── utils/                # 工具函数
├── styles/               # 样式文件
├── public/               # 静态资源
└── ...配置文件
```

## 🎯 使用指南

### 1. 生成FAQ内容
- 访问 `/generate` 页面
- 输入目标关键词或主题
- 选择生成参数
- 获得SEO优化的FAQ内容

### 2. 浏览主题库
- 访问 `/topics` 页面
- 浏览预设的FAQ主题分类
- 查看示例FAQ内容

### 3. SEO优化特性
- 自动生成JSON-LD结构化数据
- 符合Google Rich Snippets标准
- 优化的meta标签和描述
- 响应式设计确保移动端友好

## 🔧 配置文件

### Next.js配置
- `next-sitemap.config.js`: 站点地图生成配置
- `tailwind.config.js`: Tailwind CSS配置
- `tsconfig.json`: TypeScript配置

### 样式配置
项目使用Tailwind CSS进行样式管理，支持：
- 响应式设计
- 渐变背景
- 动画效果
- 现代化UI组件

## 🌐 部署

### Vercel部署（推荐）
1. 连接GitHub仓库到Vercel
2. 配置环境变量
3. 自动部署

### 其他平台
项目可部署到任何支持Next.js的平台：
- Netlify
- AWS Amplify
- Railway
- 自建服务器

## 📊 SEO优化最佳实践

本项目实现了以下SEO优化策略：
- 结构化数据标记（JSON-LD）
- 语义化HTML标签
- 优化的页面标题和描述
- 快速加载速度
- 移动端友好设计
- 清晰的URL结构

## 🤖 AI优化特性

为提高AI模型引用概率，项目采用：
- 清晰的内容层次结构
- 权威性的答案格式
- 适当的内容长度（80-150字）
- 专业术语和关键词优化

## 📈 性能优化

- Next.js静态生成
- 图片优化
- 代码分割
- CSS优化
- 自动生成sitemap

## 🛡️ 安全性

- 环境变量保护敏感信息
- API密钥安全管理
- 输入验证和清理

## 🤝 贡献

欢迎提交Issue和Pull Request来改进项目。

## 📄 许可证

[MIT License](LICENSE)

## 📞 支持

如有问题或建议，请创建Issue或联系维护者。

---

*让内容更智能，让引用更简单。* 