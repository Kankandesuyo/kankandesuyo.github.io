# 文雅性取向自我探索小程序

一个本地运行的原生微信小程序。用户完成 32 道选择题后，会生成一份温和、非诊断式的自我探索报告。

## 打开方式

### 微信小程序

1. 打开微信开发者工具。
2. 导入项目目录：`C:\Users\Lenovo\Documents\wx性取向测试`。
3. AppID 可使用测试号或继续使用 `touristappid`。
4. 编译后从首页开始测试。

### 网页版

1. 打开项目里的 `web\index.html`，即可在浏览器中使用网页版。
2. 如果要分享给别人，把整个 `web` 文件夹发给对方；对方解压后双击 `index.html` 就能打开。
3. 如果只想发一个文件，发送 `web\share.html`；电脑和手机浏览器都可以直接打开这个单文件版本。
4. 网页版不需要后端、不需要安装依赖，也不需要微信开发者工具。

### 发布成网站

项目已经包含 GitHub Pages 发布配置：`.github\workflows\pages.yml`。

1. 在 GitHub 新建一个仓库。
2. 把本项目推送到仓库的 `main` 或 `master` 分支。
3. 打开仓库的 `Settings` -> `Pages`，Source 选择 `GitHub Actions`。
4. 等待 Actions 运行完成后，GitHub 会生成一个 `https://用户名.github.io/仓库名/` 格式的网站地址。
5. 如果看到 404，确认仓库根目录存在 `index.html`，并且 Pages 选择的是 `GitHub Actions`，不是 `Deploy from a branch`。

## 隐私说明

- 不接后端。
- 不登录、不上传、不排名。
- 小程序答案仅保存在当次运行内存中，重新测试会清空。
- 网页版答案只保存在当前浏览器本地草稿中，重新测试会清空。

## 研究依据

题目和报告口径参考了性取向测量中的多维框架，包括 Kinsey Scale、Klein Sexual Orientation Grid、Sell Assessment、National Academies、Williams Institute SMART 和 APA 对 sexual orientation 的定义。详细说明见 `docs/research-basis.md`。

## 本地验证

```bash
npm test
```

测试会验证题库数量、每题选项数量，以及几类典型答案能生成合理报告。
