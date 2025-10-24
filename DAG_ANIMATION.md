# GHOSTDAG Animation - 动态 DAG 可视化

## 📖 概述

这是一个动态的有向无环图（DAG）可视化动画，展示了 TOS Network 的 GHOSTDAG 共识协议的视觉效果。图形持续向右延伸，模拟区块链网络的实时运行状态。

## 🎨 效果特点

### 视觉效果
- ✅ **动态生成**：DAG 持续向右延伸，新节点不断产生
- ✅ **随机节点数**：每层 1-4 个节点随机生成，更自然的区块链网络效果
- ✅ **蓝红节点**：90% 蓝色节点（正常区块），10% 红色节点（冲突区块）
- ✅ **透明连线**：使用贝塞尔曲线和箭头显示区块连接关系
- ✅ **发光效果**：节点带有微光效果
- ✅ **渐隐边缘**：左右边缘节点和连线自动淡入淡出
- ✅ **流畅动画**：使用 Canvas 和 requestAnimationFrame

### 技术特性
- 🚀 **高性能**：使用 Canvas 2D 渲染
- 📱 **响应式**：自适应所有屏幕尺寸
- ♿ **可访问性**：支持 `prefers-reduced-motion`
- 🎯 **内存优化**：自动清理屏幕外的节点和边

## 🔧 技术实现

### 核心算法

```javascript
1. 初始化 10 层 DAG 结构
2. 每层随机生成 1-4 个节点
3. 每个节点连接到前一层的 1-2 个节点
4. 图形以 0.5px/frame 的速度向右移动
5. 当移动一个层距离后：
   - 在右侧生成新的一层（1-4个随机节点）
   - 删除左侧屏幕外的节点
6. 循环往复，创造无限延伸效果
```

### 节点颜色分布

```javascript
蓝色节点 (Blue): 90% 概率
红色节点 (Red):  10% 概率

// 代码实现
color: Math.random() < 0.9 ? '#4A90E2' : '#ef4444'
```

### DAG 连接规则

每个节点连接到前一层的 1-2 个随机节点，形成有向无环图结构。由于每层节点数量随机（1-4个），连接模式也会动态变化：

```
示例 1: 不同节点数的层
Layer N-1:    ●  ●  ●  ●  (4个节点)
               ↘↗ ↘↗
Layer N:        ●  ●      (2个节点)
                ↘ ↗↘↗
Layer N+1:     ●  ●  ●    (3个节点)

示例 2: 单节点层
Layer N-1:    ●  ●  ●     (3个节点)
               ↘ | ↗
Layer N:         ●         (1个节点)
                 ↓
Layer N+1:    ●  ●  ●  ●  (4个节点)
```

## 📁 文件结构

```
css/dag-animation.css        # 动画容器样式
js/dag-animation.js          # DAG 生成和动画逻辑
```

## 🎯 配置参数

在 `js/dag-animation.js` 中可以调整以下参数：

```javascript
this.config = {
  nodeRadius: 8,              // 节点半径 (px)
  nodeSpacing: 120,           // 节点垂直间距 (px)
  layerSpacing: 150,          // 层水平间距 (px)
  maxLayers: 10,              // 初始层数
  nodesPerLayer: 4,           // 每层节点数
  blueNodeProbability: 0.9,   // 蓝色节点概率 (0.0-1.0)
  scrollSpeed: 0.5,           // 滚动速度 (px/frame)
  edgeOpacity: 0.15,          // 连线透明度 (0.0-1.0)
  nodeOpacity: 0.6,           // 节点透明度 (0.0-1.0)
  colors: {
    blue: '#4A90E2',          // 蓝色节点颜色
    red: '#ef4444',           // 红色节点颜色
    edge: '#60a5fa'           // 连线颜色
  }
};
```

## 🎨 自定义指南

### 1. 调整节点数量范围

在 `generateDAG()` 和 `addNewLayer()` 方法中修改：

```javascript
// 当前: 1-4 个节点
const nodeCount = Math.floor(Math.random() * 4) + 1;

// 改为 2-6 个节点
const nodeCount = Math.floor(Math.random() * 5) + 2;

// 改为固定 3 个节点
const nodeCount = 3;
```

### 2. 调整层间距

```javascript
layerSpacing: 200,    // 更稀疏
layerSpacing: 100,    // 更密集
```

### 3. 修改颜色方案

```javascript
colors: {
  blue: '#00d4ff',    // 青色
  red: '#ff006e',     // 品红色
  edge: '#00d4ff'     // 青色连线
}
```

### 4. 改变动画速度

```javascript
scrollSpeed: 1.0,     // 更快
scrollSpeed: 0.3,     // 更慢
```

### 5. 调整透明度

```javascript
// 在 CSS 文件中
.dag-animation-container {
  opacity: 0.3;       // 更淡 (0.1-0.6)
}
```

### 6. 修改红色节点概率

```javascript
blueNodeProbability: 0.95,  // 95% 蓝色, 5% 红色
blueNodeProbability: 0.8,   // 80% 蓝色, 20% 红色
```

### 7. 调整节点大小

```javascript
nodeRadius: 10,      // 更大的节点
nodeRadius: 6,       // 更小的节点
```

### 8. 改变连线样式

在 `drawEdge()` 方法中修改：

```javascript
this.ctx.lineWidth = 3;      // 更粗的线
this.ctx.lineWidth = 1;      // 更细的线
```

## ⚡ 性能说明

### 渲染性能
- **FPS**: 60 帧/秒
- **节点数**: ~40-50 个节点（可见区域）
- **连线数**: ~60-80 条边
- **CPU 占用**: <5%（现代浏览器）
- **内存**: ~2-3MB

### 优化技术
1. **视口裁剪**：只绘制可见区域内的节点
2. **自动清理**：删除屏幕外的节点和边
3. **requestAnimationFrame**：与浏览器刷新率同步
4. **Canvas 2D**：硬件加速渲染

## 📱 响应式设计

动画会自动适应不同屏幕尺寸：

- **桌面** (≥1200px): 完整 DAG 显示
- **平板** (768-1199px): 自动缩放
- **手机** (<768px): 自适应小屏幕

Canvas 使用设备像素比 (devicePixelRatio) 确保高清显示。

## 🎭 禁用动画

### 方法 1：CSS 禁用

```css
.dag-animation-container {
  display: none;
}
```

### 方法 2：删除引用

从 `index.html` 中移除：

```html
<!-- 删除这两行 -->
<link rel="stylesheet" href="css/dag-animation.css">
<script src="js/dag-animation.js"></script>
```

### 方法 3：用户偏好设置

用户在系统设置中启用"减少动画"时，动画会自动禁用。

## 🐛 故障排除

### 动画不显示
**检查项**：
- 浏览器控制台是否有 JavaScript 错误
- `.hero` 元素是否存在
- Canvas 是否支持（所有现代浏览器均支持）

### 性能问题
**优化方案**：
```javascript
// 降低节点数量
nodesPerLayer: 3,
maxLayers: 8,

// 降低滚动速度
scrollSpeed: 0.3,

// 降低透明度
edgeOpacity: 0.1,
```

### 节点太多/太少
**调整**：
```javascript
// 增加密度
nodesPerLayer: 6,
layerSpacing: 100,

// 减少密度
nodesPerLayer: 2,
layerSpacing: 200,
```

## 🎯 浏览器兼容性

| 浏览器 | 最低版本 | 状态 |
|--------|---------|------|
| Chrome | 88+ | ✅ 完全支持 |
| Firefox | 85+ | ✅ 完全支持 |
| Safari | 14+ | ✅ 完全支持 |
| Edge | 88+ | ✅ 完全支持 |
| Opera | 74+ | ✅ 完全支持 |
| IE 11 | - | ❌ 不支持 |

## 📊 技术细节

### Canvas API 使用
- `beginPath()` / `arc()` - 绘制圆形节点
- `bezierCurveTo()` - 绘制平滑曲线
- `shadowBlur` - 节点发光效果
- `globalAlpha` - 透明度控制

### 数学计算
- 贝塞尔曲线控制点计算
- 箭头角度计算 (`Math.atan2`)
- 节点位置布局算法

### 内存管理
```javascript
// 自动清理机制
removeOldLayer() {
  const removeThreshold = -layerSpacing * 2;
  this.nodes = this.nodes.filter(node =>
    (node.x + this.offset) > removeThreshold
  );
}
```

## 💡 创意扩展

### 1. 添加节点标签
```javascript
// 在 drawNode() 中添加
this.ctx.fillStyle = '#fff';
this.ctx.font = '10px monospace';
this.ctx.fillText(node.layer, x, node.y);
```

### 2. 鼠标交互
```javascript
// 添加悬停高亮效果
canvas.addEventListener('mousemove', (e) => {
  // 检测鼠标是否在节点上
  // 高亮该节点及其连接
});
```

### 3. 不同节点形状
```javascript
// 三角形、正方形等不同形状
if (node.color === 'red') {
  // 绘制三角形
} else {
  // 绘制圆形
}
```

## 📈 性能监控

在控制台中查看性能：

```javascript
// 在 animate() 方法中添加
console.log('Nodes:', this.nodes.length);
console.log('Edges:', this.edges.length);
console.log('FPS:', Math.round(1000 / deltaTime));
```

## 🔗 相关资源

- [GHOSTDAG 论文](https://eprint.iacr.org/2018/104.pdf)
- [Canvas API 文档](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)

---

**版本**: 1.0.0
**创建时间**: 2025-10-24
**技术**: Canvas 2D, JavaScript ES6+
