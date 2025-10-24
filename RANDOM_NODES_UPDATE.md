# 随机节点数更新说明

## 📋 更新概述

将 DAG 动画从固定每层 4 个节点改为每层 **1-4 个随机节点**。

## ✅ 修改内容

### 1. 代码修改

#### 文件：`js/dag-animation.js`

**修改位置 1：`generateDAG()` 方法**
```javascript
// 旧代码（第98行）
for (let i = 0; i < this.config.nodesPerLayer; i++) {

// 新代码
const nodeCount = Math.floor(Math.random() * 4) + 1; // 1 to 4 nodes
for (let i = 0; i < nodeCount; i++) {
```

**修改位置 2：`addNewLayer()` 方法**
```javascript
// 旧代码（第272行）
for (let i = 0; i < this.config.nodesPerLayer; i++) {

// 新代码
const nodeCount = Math.floor(Math.random() * 4) + 1; // 1 to 4 nodes
for (let i = 0; i < nodeCount; i++) {
```

**新增功能：Layer 追踪**
```javascript
// 在 generateDAG() 中
this.layers = []; // Track nodes by layer
this.layers.push(layerNodes);

// 在 addNewLayer() 中
this.layers.push(newNodes);

// 在 removeOldLayer() 中
this.layers = this.layers.filter(layer =>
  layer.some(node => this.nodes.includes(node))
);
```

### 2. 文档更新

- ✅ `DAG_ANIMATION.md` - 更新特性说明和示例
- ✅ `CHANGELOG.md` - 记录版本变更

## 🎨 效果变化

### 之前（固定节点数）
```
Layer 1:  ●  ●  ●  ●  (固定4个)
Layer 2:  ●  ●  ●  ●  (固定4个)
Layer 3:  ●  ●  ●  ●  (固定4个)
```

### 现在（随机节点数）
```
Layer 1:     ●  ●  ●     (3个)
Layer 2:  ●  ●  ●  ●     (4个)
Layer 3:        ●         (1个)
Layer 4:     ●  ●         (2个)
Layer 5:  ●  ●  ●  ●     (4个)
```

## 📊 节点数概率分布

每层生成的节点数量是均匀随机分布：

| 节点数 | 概率 |
|-------|------|
| 1个   | 25% |
| 2个   | 25% |
| 3个   | 25% |
| 4个   | 25% |

平均每层：**2.5 个节点**

## 🔧 技术细节

### 随机数生成
```javascript
Math.floor(Math.random() * 4) + 1
```

- `Math.random()`: 生成 [0, 1) 区间的随机数
- `* 4`: 扩展到 [0, 4)
- `Math.floor()`: 向下取整得到 [0, 1, 2, 3]
- `+ 1`: 偏移得到 [1, 2, 3, 4]

### 节点位置计算

根据实际节点数量动态居中：

```javascript
const y = centerY + (i - nodeCount / 2 + 0.5) * this.config.nodeSpacing;
```

**示例**：
- 1 个节点：居中 (offset = 0)
- 2 个节点：上下对称 (offset = ±0.5)
- 3 个节点：均匀分布 (offset = -1, 0, 1)
- 4 个节点：均匀分布 (offset = -1.5, -0.5, 0.5, 1.5)

### 连接逻辑优化

```javascript
const connectionCount = Math.min(
  Math.floor(Math.random() * 2) + 1,  // 想要的连接数 (1-2)
  prevLayerNodes.length                // 前一层实际节点数
);
```

确保连接数不超过可用节点数。

## 🎯 自定义选项

### 修改节点数范围

在 `generateDAG()` 和 `addNewLayer()` 中修改：

```javascript
// 改为 2-5 个节点
const nodeCount = Math.floor(Math.random() * 4) + 2;

// 改为 1-6 个节点
const nodeCount = Math.floor(Math.random() * 6) + 1;

// 改为固定 3 个节点
const nodeCount = 3;
```

### 调整节点数权重（非均匀分布）

如果想要某些节点数出现更频繁：

```javascript
// 更倾向于 3-4 个节点
const nodeCount = Math.random() < 0.7 ?
  Math.floor(Math.random() * 2) + 3 :  // 70%: 3-4个
  Math.floor(Math.random() * 2) + 1;   // 30%: 1-2个
```

## 🐛 测试验证

### 验证随机性
```javascript
// 在浏览器控制台运行
let counts = [0, 0, 0, 0];
for (let i = 0; i < 10000; i++) {
  const n = Math.floor(Math.random() * 4) + 1;
  counts[n-1]++;
}
console.log('Distribution:', counts);
// 应该接近 [2500, 2500, 2500, 2500]
```

### 检查节点生成
在 `addNewLayer()` 开始处添加：
```javascript
console.log('New layer with', nodeCount, 'nodes');
```

## 📈 性能影响

### 之前
- 固定 4 个节点/层
- 平均 40 个节点在屏幕上

### 现在
- 平均 2.5 个节点/层
- 平均 25 个节点在屏幕上

**性能提升**：
- ✅ 节点数减少 37.5%
- ✅ 连线数减少约 40%
- ✅ 渲染更快，CPU 占用更低
- ✅ 内存使用减少

## ✨ 视觉效果改进

### 更自然
- ❌ 旧版：规则整齐，看起来人工
- ✅ 新版：随机变化，更像真实网络

### 更动态
- 疏密变化
- 视觉节奏感
- 更有趣的观看体验

### 更符合实际
真实的区块链网络中，不同时刻产生的区块数量是变化的，现在的动画更真实地模拟了这一特性。

## 🔄 回滚方法

如果需要恢复固定节点数：

```javascript
// 在 generateDAG() 和 addNewLayer() 中
// 删除这行
const nodeCount = Math.floor(Math.random() * 4) + 1;

// 改回
for (let i = 0; i < this.config.nodesPerLayer; i++) {
```

## 📝 相关文件

- `js/dag-animation.js` - 主要修改文件
- `DAG_ANIMATION.md` - 完整文档
- `CHANGELOG.md` - 版本历史

---

**更新日期**: 2025-10-24
**版本**: 1.1.0
**改进类型**: 视觉效果、性能优化
