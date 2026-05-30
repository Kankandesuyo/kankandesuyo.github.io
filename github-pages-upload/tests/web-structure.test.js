const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const webRoot = path.join(root, 'web');

[
  'index.html',
  'share.html',
  'styles.css',
  'app.js',
  'questions.js',
  'scoring.js',
  'report.js'
].forEach((file) => {
  assert.equal(fs.existsSync(path.join(webRoot, file)), true, `web/${file} should exist`);
});

const html = fs.readFileSync(path.join(webRoot, 'index.html'), 'utf8');
const shareHtml = fs.readFileSync(path.join(webRoot, 'share.html'), 'utf8');
[
  './styles.css',
  './questions.js',
  './scoring.js',
  './report.js',
  './app.js'
].forEach((asset) => {
  assert.match(html, new RegExp(asset.replace(/[./]/g, '\\$&')), `HTML should reference ${asset}`);
});

[
  '开始测试',
  '上一题',
  '下一题',
  '生成报告',
  '重新测试'
].forEach((text) => {
  assert.match(html, new RegExp(text), `HTML should include ${text}`);
});

const app = fs.readFileSync(path.join(webRoot, 'app.js'), 'utf8');
assert.match(app, /localStorage/, 'web app should keep browser-local draft state');
assert.match(app, /请选择一个答案/, 'web app should show inline validation');
assert.match(shareHtml, /<style>/, 'share.html should inline styles for single-file sharing');
assert.match(shareHtml, /OrientationQuestions/, 'share.html should inline question data');
assert.match(shareHtml, /开始测试/, 'share.html should include the web app UI');

const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
assert.match(readme, /网页版/);
assert.match(readme, /web\\index\.html/);
assert.match(readme, /web\\share\.html/);
assert.match(readme, /整个 `web` 文件夹/);
assert.match(readme, /GitHub Pages/);

const pagesWorkflow = fs.readFileSync(path.join(root, '.github', 'workflows', 'pages.yml'), 'utf8');
assert.match(pagesWorkflow, /upload-pages-artifact/);
assert.match(pagesWorkflow, /path: web/);

console.log('web structure tests passed');
