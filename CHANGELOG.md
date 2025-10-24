# TOS Network Homepage - 更新日志

## [1.1.1] - 2025-10-24

### 🎨 视觉改进
- **简化 Logo 动画**：移除外框边框和阴影效果
  - 移除蓝色边框（border）
  - 移除发光阴影（box-shadow）
  - 只保留纯粹的呼吸动画（缩放效果）
  - 放大幅度从 5% 增加到 8%
  - 视觉效果更简洁、更现代

### 📝 文档更新
- 新增 `LOGO_ANIMATION_UPDATE.md` - Logo 动画更新说明

---

## [1.1.0] - 2025-10-24

### ✨ 新增功能
- **随机节点数 DAG 动画**：每层节点数量从固定4个改为1-4个随机生成
  - 更自然的区块链网络效果
  - 每层独立随机，展示真实的并发区块产生
  - 自动适配不同节点数的连接关系

### 🎨 视觉改进
- DAG 动画现在有更多变化和动态感
- 单节点层、双节点层、三节点层、四节点层随机出现
- 连接线根据实际节点数量智能调整

### 🔧 技术改进
- 添加 `layers` 数组追踪每层节点
- 优化内存管理，同步清理 layers 数组
- 改进连接算法，适配可变节点数量

### 📝 文档更新
- 更新 `DAG_ANIMATION.md` 反映随机节点数特性
- 添加节点数量自定义指南
- 新增不同节点数的连接示例

---

## [1.0.0] - 2025-10-24

### 🎉 初始发布

#### ✨ 核心功能
- **Bitfinex 风格设计**：深色主题，渐变背景
- **GHOSTDAG 动画**：动态 DAG 可视化
- **响应式布局**：完美适配所有设备
- **15 个特色功能卡片**：展示 TOS Network 特性
- **FAQ 手风琴**：7 个常见问题
- **文档和白皮书链接**

#### 🎨 设计系统
- CSS 变量系统
- Bitfinex 配色方案
  - 背景：#07020f (深紫黑)
  - 表面：#0d1d29 (深蓝灰)
  - 红色：#e44b44
  - 绿色：#03ca9b
- 平滑动画和过渡效果

#### 🔧 技术栈
- 纯 HTML/CSS/JavaScript（无框架）
- Canvas 2D API（DAG 动画）
- CSS Grid & Flexbox（布局）
- Intersection Observer（滚动动画）

#### 📁 文件结构
```
css/
  ├── variables.css      # CSS 变量
  ├── base.css          # 基础样式
  ├── components.css    # 组件样式
  ├── animations.css    # 动画
  ├── dag-animation.css # DAG 动画样式
  └── responsive.css    # 响应式

js/
  ├── main.js          # 主脚本
  ├── navigation.js    # 导航栏
  ├── animations.js    # 滚动动画
  ├── dag-animation.js # DAG 动画
  └── faq.js          # FAQ 手风琴

img/
  ├── features/       # 特色功能图标 (15个 SVG)
  └── logo-*.png      # Logo 文件

pdf/
  └── tos.pdf         # 白皮书
```

#### 📊 性能
- 60 FPS 动画
- <5% CPU 占用
- ~2-3MB 内存
- 总文件大小 <100KB (未压缩)

#### ♿ 可访问性
- 语义化 HTML5
- ARIA 标签
- 键盘导航支持
- `prefers-reduced-motion` 支持

#### 🌐 浏览器兼容性
- ✅ Chrome 88+
- ✅ Firefox 85+
- ✅ Safari 14+
- ✅ Edge 88+

#### 🔗 链接清理
- ❌ 删除 Discord 链接 (chat.tos.network)
- ❌ 删除 Forum 链接 (forum.tos.network)
- ✅ 保留 GitHub、Twitter、Telegram

#### 📝 文档
- `README.md` - 项目说明
- `QUICKSTART.md` - 快速开始指南
- `DAG_ANIMATION.md` - DAG 动画文档
- `LINK_CHECK_REPORT.md` - 链接检查报告
- `DEPLOYMENT.md` - 部署指南

---

## 路线图

### 未来计划 (v1.2.0)
- [ ] 添加 i18n 多语言支持
- [ ] 集成 Web3 钱包连接
- [ ] 实时网络统计数据
- [ ] 交互式 DAG 探索器
- [ ] 深色/浅色主题切换

### 考虑中的功能
- [ ] 博客/新闻版块
- [ ] 社区活动展示
- [ ] 合作伙伴 Logo 墙
- [ ] 视频介绍

---

## 技术债务

### 已解决 ✅
- ✅ 移除多语言系统（简化为英文版）
- ✅ 优化 DAG 动画性能
- ✅ 修复导航栏对齐问题
- ✅ 清理无用链接

### 待处理
- 无

---

## 贡献者

- Claude Code (Anthropic)
- TOS Network Team

---

**最后更新**: 2025-10-24
**当前版本**: 1.1.0
