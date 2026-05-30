const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const appConfig = JSON.parse(fs.readFileSync(path.join(root, 'app.json'), 'utf8'));

assert.deepEqual(appConfig.pages, [
  'pages/index/index',
  'pages/test/test',
  'pages/result/result'
]);

appConfig.pages.forEach((page) => {
  ['js', 'json', 'wxml', 'wxss'].forEach((extension) => {
    const filePath = path.join(root, `${page}.${extension}`);
    assert.equal(fs.existsSync(filePath), true, `${page}.${extension} should exist`);
  });
});

const researchPath = path.join(root, 'docs', 'research-basis.md');
assert.equal(fs.existsSync(researchPath), true, 'research basis document should exist');

const research = fs.readFileSync(researchPath, 'utf8');
[
  'Kinsey',
  'Klein',
  'Sell',
  'National Academies',
  'Williams Institute',
  'APA'
].forEach((term) => {
  assert.match(research, new RegExp(term), `research document should mention ${term}`);
});

const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
assert.match(readme, /不接后端/);
assert.match(readme, /npm test/);

console.log('miniapp structure tests passed');
