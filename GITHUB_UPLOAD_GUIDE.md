# GitHub 上传指南

本文档说明如何只上传 `cocanvas-mvp` 文件夹到 GitHub，而不上传有错误的 `Cocanvas` 文件夹。

## 方法一：只初始化 cocanvas-mvp 为 Git 仓库（推荐✨）

这是最简单的方法，直接在 `cocanvas-mvp` 文件夹内初始化 Git。

### 步骤：

1. **打开 PowerShell 或命令提示符**

2. **进入 cocanvas-mvp 文件夹**
   ```powershell
   cd "C:\Users\董伯言\Desktop\business trail\cocanvas\cocanvas-mvp"
   ```

3. **初始化 Git 仓库**
   ```bash
   git init
   ```

4. **添加所有文件到暂存区**
   ```bash
   git add .
   ```

5. **创建初始提交**
   ```bash
   git commit -m "Initial commit: CoCanvas MVP 需求验证原型"
   ```

6. **在 GitHub 创建新仓库**
   - 访问 https://github.com/new
   - 仓库名称：`cocanvas-mvp` 或 `cocanvas-validation-mvp`
   - 描述：`CoCanvas 校园组队平台需求验证原型`
   - 选择 Public 或 Private
   - **不要**勾选 "Add a README file"（我们已经有了）
   - 点击"Create repository"

7. **关联远程仓库并推送**
   
   将下面命令中的 `YOUR_USERNAME` 替换为你的 GitHub 用户名：
   
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/cocanvas-mvp.git
   git branch -M main
   git push -u origin main
   ```

✅ 完成！现在只有 `cocanvas-mvp` 文件夹被上传到 GitHub。

---

## 方法二：在父目录使用 .gitignore（如果你想保留整个项目结构）

如果你希望在 `cocanvas` 父目录初始化 Git，但只上传 `cocanvas-mvp` 文件夹：

### 步骤：

1. **进入 cocanvas 父目录**
   ```powershell
   cd "C:\Users\董伯言\Desktop\business trail\cocanvas"
   ```

2. **创建 .gitignore 文件**
   
   创建文件 `.gitignore`，内容如下：
   ```
   # 忽略有错误的 Cocanvas 文件夹
   Cocanvas/
   
   # 忽略其他不需要的文件
   代码库/
   SmartApp-master/
   启动/
   需求验证.docx
   ```

3. **初始化 Git 并提交**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: CoCanvas MVP 验证原型"
   ```

4. **关联远程仓库并推送**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/cocanvas.git
   git branch -M main
   git push -u origin main
   ```

---

## 方法三：使用 Git Subtree（适合已有 Git 仓库的情况）

如果父目录已经是一个 Git 仓库，可以只推送子文件夹：

```bash
cd "C:\Users\董伯言\Desktop\business trail\cocanvas"
git subtree push --prefix=cocanvas-mvp origin main
```

---

## 推荐的仓库设置

### 仓库名称建议：
- `cocanvas-mvp`
- `cocanvas-validation-prototype`
- `campus-team-mvp`

### 仓库描述建议：
```
CoCanvas 校园组队平台需求验证原型 - 使用假门测试(Fake Door Test)验证大学生在线组队需求的真实性
```

### Topics（标签）建议：
```
wechat-miniprogram
mvp
lean-startup
fake-door-test
campus
team-building
validation
微信小程序
```

### README 预览

你的 README.md 已经很完善了，会在 GitHub 仓库首页自动显示。包含：
- 项目背景
- 验证目标
- 快速开始指南
- 功能说明
- 数据分析方法

---

## 上传后的操作建议

### 1. 添加 GitHub Topics

在 GitHub 仓库页面，点击设置图标，添加相关 topics。

### 2. 启用 GitHub Pages（可选）

如果你想展示项目文档：
- Settings → Pages
- Source: Deploy from a branch
- Branch: main / docs（如果有的话）

### 3. 添加 License

建议添加 MIT License：
- 在 GitHub 仓库页面点击 "Add file" → "Create new file"
- 文件名：`LICENSE`
- 选择 MIT License 模板

### 4. 创建 Release

当你完成验证后，可以创建一个 Release：
- 进入 Releases → Create a new release
- Tag: `v1.0.0`
- Title: `验证原型 v1.0 - 5天测试版`
- 描述：总结验证结果和数据

---

## 常见问题

### Q1: 提示 "Permission denied"？

**解决方案**：使用 HTTPS 方式，会提示输入 GitHub 用户名和密码（或 Personal Access Token）

或者配置 SSH Key：
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
# 将公钥添加到 GitHub Settings → SSH Keys
git remote set-url origin git@github.com:YOUR_USERNAME/cocanvas-mvp.git
```

### Q2: 推送失败，提示 "failed to push some refs"？

**解决方案**：
```bash
git pull origin main --rebase
git push origin main
```

### Q3: 不小心提交了不该提交的文件？

**解决方案**：
```bash
# 从 Git 中移除但保留本地文件
git rm --cached 文件名

# 添加到 .gitignore
echo "文件名" >> .gitignore

# 提交更改
git add .gitignore
git commit -m "Update .gitignore"
git push
```

---

## 验证上传成功

访问你的 GitHub 仓库页面，应该看到：

✅ 包含所有 `cocanvas-mvp` 文件夹的内容  
✅ README.md 正确显示  
✅ 没有 `Cocanvas` 文件夹  
✅ 所有文档都可以正常查看  

---

**祝上传顺利！🎉**

如有问题，可以查看 [GitHub 官方文档](https://docs.github.com)

