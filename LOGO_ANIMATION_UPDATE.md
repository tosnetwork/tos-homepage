# Logo 呼吸动画更新

## 📋 更新概述

移除 TOS Logo 的外框边框，只保留纯粹的呼吸动画效果（放大缩小），让图标看起来像在呼吸一样。

## ✅ 修改内容

### 文件：`css/animations.css`

#### 1. 简化 `.logo-wrapper` 样式

**之前（带边框和阴影）**：
```css
.logo-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background: transparent;
  border: 2px solid var(--primary-blue);        /* 移除 */
  border-radius: var(--radius-lg);              /* 移除 */
  box-shadow: 0 0 15px var(--primary-blue-glow); /* 移除 */
  animation: breathe 3s ease-in-out infinite;
  transition: all var(--transition-base);
}

.logo-wrapper:hover {
  transform: scale(1.05);
  border-color: var(--primary-blue-light);      /* 移除 */
  box-shadow: 0 0 25px rgba(74, 144, 226, 0.5); /* 移除 */
  animation: none;
}
```

**现在（纯净的呼吸动画）**：
```css
.logo-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  animation: breathe 3s ease-in-out infinite;
  transition: all var(--transition-base);
}

.logo-wrapper:hover {
  animation: none;
  transform: scale(1.05);
}
```

#### 2. 简化 `breathe` 动画

**之前（带阴影效果）**：
```css
@keyframes breathe {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 15px var(--primary-blue-glow); /* 移除 */
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 25px rgba(74, 144, 226, 0.5); /* 移除 */
  }
}
```

**现在（纯缩放动画）**：
```css
@keyframes breathe {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.08);  /* 放大到 108% */
  }
}
```

## 🎨 视觉效果变化

### 之前
```
┌─────────────┐
│   🔵 TOS    │  ← 蓝色边框 + 阴影
│             │
│  (呼吸时)   │
│   边框和    │
│   阴影变化  │
└─────────────┘
```

### 现在
```
   🔵 TOS       ← 无边框，纯净

 (呼吸时)
  🔵 TOS      ← 图标本身放大缩小
   (变大)

   🔵 TOS     ← 回到正常
  (变小)
```

## 📊 动画参数

| 参数 | 值 | 说明 |
|------|---|------|
| 持续时间 | 3s | 一个完整呼吸周期 |
| 缓动函数 | ease-in-out | 平滑的加速和减速 |
| 循环 | infinite | 无限循环 |
| 最小尺寸 | scale(1) | 100% 原始大小 |
| 最大尺寸 | scale(1.08) | 108% 放大 |
| 放大幅度 | 8% | 视觉上明显但不夸张 |

## ⏱️ 动画时间轴

```
0s    ─────●─────     1.5s   ─────●─────    3s
     scale(1)               scale(1.08)       scale(1)

     正常大小    →    逐渐放大    →    最大    →    逐渐缩小    →    正常大小
     ────────────────────────────────────────────────────────────────
     0%                    25%          50%          75%           100%
```

## 🎯 为什么这样改？

### 1. 更简洁的视觉
- ❌ 旧版：边框 + 阴影 + 缩放 = 视觉元素过多
- ✅ 新版：只有图标本身的缩放 = 更干净

### 2. 更专注的动画
- ❌ 旧版：多个元素同时变化，分散注意力
- ✅ 新版：只有图标大小变化，更容易理解

### 3. 更自然的呼吸感
- ❌ 旧版：边框和阴影变化看起来像"发光"
- ✅ 新版：纯粹的缩放看起来像真正的"呼吸"

### 4. 更现代的设计
- ❌ 旧版：装饰性边框显得过时
- ✅ 新版：极简风格更现代

## 🔧 自定义选项

### 调整呼吸幅度

在 `@keyframes breathe` 中修改：

```css
/* 更明显的呼吸（10% 放大）*/
50% {
  transform: scale(1.10);
}

/* 更微妙的呼吸（5% 放大）*/
50% {
  transform: scale(1.05);
}

/* 更夸张的呼吸（15% 放大）*/
50% {
  transform: scale(1.15);
}
```

### 调整呼吸速度

在 `.logo-wrapper` 中修改：

```css
/* 更快的呼吸（2秒一次）*/
animation: breathe 2s ease-in-out infinite;

/* 更慢的呼吸（4秒一次）*/
animation: breathe 4s ease-in-out infinite;

/* 极慢的呼吸（5秒一次，更放松）*/
animation: breathe 5s ease-in-out infinite;
```

### 改变缓动函数

```css
/* 线性变化（机械感）*/
animation: breathe 3s linear infinite;

/* 先快后慢 */
animation: breathe 3s ease-out infinite;

/* 先慢后快 */
animation: breathe 3s ease-in infinite;

/* 弹性效果 */
animation: breathe 3s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
```

### 添加延迟（错开动画）

如果页面上有多个呼吸元素：

```css
.logo-wrapper:nth-child(1) {
  animation-delay: 0s;
}

.logo-wrapper:nth-child(2) {
  animation-delay: 1s;  /* 延迟1秒 */
}

.logo-wrapper:nth-child(3) {
  animation-delay: 2s;  /* 延迟2秒 */
}
```

## 🎭 禁用动画

### 方法 1：CSS 禁用

```css
.logo-wrapper {
  animation: none;
}
```

### 方法 2：只在悬停时显示动画

```css
.logo-wrapper {
  animation: none;
}

.logo-wrapper:hover {
  animation: breathe 3s ease-in-out infinite;
}
```

### 方法 3：用户偏好自动禁用

已经支持！在 `prefers-reduced-motion` 媒体查询中：

```css
@media (prefers-reduced-motion: reduce) {
  .logo-wrapper {
    animation: none;
  }
}
```

## 📱 移动端优化

如果想在移动端禁用或调整：

```css
@media (max-width: 768px) {
  .logo-wrapper {
    /* 禁用动画 */
    animation: none;

    /* 或者更微妙的动画 */
    animation: breathe 4s ease-in-out infinite;
  }

  @keyframes breathe {
    50% {
      transform: scale(1.03); /* 更小的变化 */
    }
  }
}
```

## 🐛 故障排除

### Logo 不动了
**原因**：可能被其他样式覆盖
**解决**：
```css
.logo-wrapper {
  animation: breathe 3s ease-in-out infinite !important;
}
```

### 动画太快/太慢
**解决**：调整持续时间（见上方"调整呼吸速度"）

### 动画不平滑
**检查**：
- 浏览器性能
- CSS 是否有冲突的 transform
- 是否有 JavaScript 干扰

### 悬停时动画继续
这是预期行为。如果想悬停时停止：
```css
.logo-wrapper:hover {
  animation-play-state: paused;
}
```

## 💡 创意扩展

### 1. 添加旋转
```css
@keyframes breathe {
  0%, 100% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.08) rotate(5deg);
  }
}
```

### 2. 添加垂直移动
```css
@keyframes breathe {
  0%, 100% {
    transform: scale(1) translateY(0);
  }
  50% {
    transform: scale(1.08) translateY(-2px);
  }
}
```

### 3. 添加透明度变化
```css
@keyframes breathe {
  0%, 100% {
    transform: scale(1);
    opacity: 0.9;
  }
  50% {
    transform: scale(1.08);
    opacity: 1;
  }
}
```

### 4. 不同的呼吸节奏
```css
/* 快速呼吸-停顿-快速呼吸 */
@keyframes breathe {
  0%, 100% { transform: scale(1); }
  15% { transform: scale(1.08); }
  30%, 70% { transform: scale(1); }
  85% { transform: scale(1.08); }
}
```

## 🎬 效果预览

当前效果：
1. **开始**：Logo 正常大小
2. **1.5秒**：Logo 逐渐放大到 108%
3. **3秒**：Logo 逐渐缩小回 100%
4. **循环**：重复上述过程

看起来就像 Logo 在轻轻地呼吸，非常自然和流畅！

## 🔄 回滚方法

如果想恢复原来的边框样式：

```css
.logo-wrapper {
  padding: 8px;
  border: 2px solid var(--primary-blue);
  border-radius: var(--radius-lg);
  box-shadow: 0 0 15px var(--primary-blue-glow);
}

@keyframes breathe {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 15px var(--primary-blue-glow);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 25px rgba(74, 144, 226, 0.5);
  }
}
```

## 📝 相关文件

- `css/animations.css` - 主要修改文件
- `index.html` - Logo HTML 结构

---

**更新日期**: 2025-10-24
**版本**: 1.1.1
**改进类型**: 视觉效果、简化设计
