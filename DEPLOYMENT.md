# TOS Network Homepage - 部署指南

## 📋 部署前检查清单

### ✅ 代码验证
- [ ] 运行 `./check.sh` 确认所有文件存在
- [ ] 在本地测试所有功能正常
- [ ] 检查浏览器控制台无错误
- [ ] 验证所有链接可用
- [ ] 确认移动端响应式正常

### ✅ 性能优化（可选）

#### 1. 压缩 CSS
```bash
# 安装 csso (如果没有)
npm install -g csso-cli

# 压缩 CSS 文件
csso css/variables.css -o css/variables.min.css
csso css/base.css -o css/base.min.css
csso css/components.css -o css/components.min.css
csso css/animations.css -o css/animations.min.css
csso css/responsive.css -o css/responsive.min.css
```

然后更新 index.html 中的引用：
```html
<link rel="stylesheet" href="css/variables.min.css">
<link rel="stylesheet" href="css/base.min.css">
<!-- ... -->
```

#### 2. 压缩 JavaScript
```bash
# 安装 terser (如果没有)
npm install -g terser

# 压缩 JS 文件
terser js/main.js -o js/main.min.js -c -m
terser js/navigation.js -o js/navigation.min.js -c -m
terser js/animations.js -o js/animations.min.js -c -m
terser js/faq.js -o js/faq.min.js -c -m
```

然后更新 index.html 中的引用：
```html
<script src="js/main.min.js"></script>
<script src="js/navigation.min.js"></script>
<!-- ... -->
```

#### 3. 图片优化
SVG 图标已经是优化的格式，无需进一步处理。

### ✅ 服务器配置

#### Nginx 配置示例
```nginx
server {
    listen 80;
    server_name tos.network www.tos.network;
    root /var/www/tos-homepage;
    index index.html;

    # Gzip 压缩
    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
    gzip_min_length 1000;

    # 缓存静态资源
    location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # HTML 不缓存
    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache";
    }

    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

#### Apache .htaccess 配置
```apache
# 启用压缩
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript image/svg+xml
</IfModule>

# 缓存静态资源
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType text/html "access plus 0 seconds"
</IfModule>

# 重定向到 HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

## 🚀 部署步骤

### 方法 1: Git 部署

1. **推送到 Git 仓库**
```bash
cd /Users/tomisetsu/tos-network/tos-homepage
git add .
git commit -m "Redesign TOS homepage with Bitfinex style"
git push origin master
```

2. **在服务器上拉取**
```bash
ssh user@tos.network
cd /var/www
git clone https://github.com/tos-network/tos-homepage.git
# 或者更新: git pull origin master
```

### 方法 2: FTP/SFTP 上传

1. **压缩必要文件**
```bash
cd /Users/tomisetsu/tos-network/tos-homepage
tar -czf tos-homepage.tar.gz \
  index.html \
  css/ \
  js/ \
  img/ \
  pdf/ \
  favicon.ico \
  logo.ico
```

2. **上传到服务器**
```bash
scp tos-homepage.tar.gz user@tos.network:/var/www/
ssh user@tos.network
cd /var/www
tar -xzf tos-homepage.tar.gz
```

### 方法 3: CDN 部署 (推荐)

使用 Cloudflare, Vercel, 或 Netlify:

#### Vercel
```bash
npm install -g vercel
cd /Users/tomisetsu/tos-network/tos-homepage
vercel --prod
```

#### Netlify
```bash
npm install -g netlify-cli
cd /Users/tomisetsu/tos-network/tos-homepage
netlify deploy --prod --dir .
```

## 🔐 安全检查

### SSL/TLS
- [ ] 启用 HTTPS
- [ ] 配置 SSL 证书（Let's Encrypt）
- [ ] 强制重定向 HTTP 到 HTTPS
- [ ] 配置 HSTS 头

### 安全头
```
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com; img-src 'self' data: https:; script-src 'self' 'unsafe-inline'
```

## 📊 监控和分析

### Google Analytics (可选)
在 `</head>` 前添加：
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Plausible Analytics (推荐 - 隐私友好)
```html
<script defer data-domain="tos.network" src="https://plausible.io/js/script.js"></script>
```

## 🧪 部署后测试

### 基本检查
- [ ] 访问 https://tos.network
- [ ] 检查所有页面元素加载
- [ ] 测试所有链接
- [ ] 验证移动端显示
- [ ] 检查浏览器控制台

### 性能测试
- [ ] Google PageSpeed Insights
  - https://pagespeed.web.dev/
- [ ] GTmetrix
  - https://gtmetrix.com/
- [ ] WebPageTest
  - https://www.webpagetest.org/

### SEO 检查
- [ ] Google Search Console 提交
- [ ] 生成并提交 sitemap.xml
- [ ] 验证 meta 标签
- [ ] 检查 robots.txt

## 📈 性能优化建议

### 图片优化
虽然使用了 SVG，但如果添加 PNG/JPG：
```bash
# 安装 imagemin
npm install -g imagemin-cli

# 优化图片
imagemin img/*.png --out-dir=img/optimized
```

### 字体优化
使用 font-display: swap 确保文字快速显示：
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&family=Montserrat:wght@600;700;800&display=swap');
```

### Lazy Loading
如果页面变长，可以添加图片懒加载：
```html
<img src="placeholder.jpg" data-src="actual-image.jpg" loading="lazy">
```

## 🔄 回滚计划

### 如果需要回滚到旧版本

#### 方法 1: 使用备份
```bash
cp index.html.backup index.html
```

#### 方法 2: Git 回滚
```bash
git revert HEAD
git push origin master
```

#### 方法 3: 保留旧版本
在部署前，重命名旧文件：
```bash
mv index.html index.html.old.v1
cp index.html.new index.html
```

## 📝 部署记录

### 部署信息模板
```
部署日期: ___________
部署人员: ___________
版本号: 2.0.0
Git Commit: ___________
服务器: ___________
域名: tos.network
SSL: Yes/No
CDN: Yes/No
监控: Yes/No

测试结果:
- 功能测试: Pass/Fail
- 性能测试: Pass/Fail
- 移动端测试: Pass/Fail
- 浏览器兼容: Pass/Fail

问题记录:
1.
2.

备注:
```

## 🆘 故障排除

### 常见问题

#### 1. CSS 不加载
**检查**:
- 文件路径是否正确
- 服务器 MIME 类型配置
- 浏览器缓存

**解决**:
```bash
# 清除浏览器缓存
Ctrl+Shift+R (Chrome/Firefox)
Cmd+Shift+R (Mac)
```

#### 2. JavaScript 错误
**检查**:
- 浏览器控制台
- 文件加载顺序
- 跨域问题

#### 3. 图标不显示
**检查**:
- SVG 文件路径
- 服务器 SVG MIME 类型
- Content-Security-Policy 头

#### 4. 移动端布局问题
**检查**:
- viewport meta 标签
- 响应式 CSS 加载
- 媒体查询断点

## 📞 支持

部署过程中遇到问题？

- **GitHub Issues**: https://github.com/tos-network/tos-homepage/issues
- **Discord**: https://chat.tos.network/
- **Forum**: https://forum.tos.network/

---

## ✅ 部署检查表

最后的检查：

- [ ] 代码已在本地完整测试
- [ ] 所有文件已准备就绪
- [ ] 服务器配置已完成
- [ ] SSL 证书已配置
- [ ] DNS 已正确指向
- [ ] 监控和分析已设置
- [ ] 备份已创建
- [ ] 团队已通知
- [ ] 文档已更新

**准备部署！** 🚀

---

**文档版本**: 1.0
**最后更新**: 2025-10-24
