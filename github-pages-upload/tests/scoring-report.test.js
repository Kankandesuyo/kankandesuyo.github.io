const assert = require('node:assert/strict');

const { questions } = require('../data/questions');
const { calculateScores } = require('../utils/scoring');
const { buildReport } = require('../utils/report');

function answersFor(optionIndex) {
  return questions.map((question) => ({
    questionId: question.id,
    optionId: question.options[optionIndex].id
  }));
}

function alternatingAnswers() {
  return questions.map((question, index) => ({
    questionId: question.id,
    optionId: question.options[index % question.options.length].id
  }));
}

function reportFor(answers) {
  const scores = calculateScores(answers, questions);
  return buildReport(scores);
}

assert.equal(questions.length, 32, 'question bank should contain exactly 32 questions');
questions.forEach((question) => {
  assert.equal(question.options.length, 4, `${question.id} should have four options`);
});

{
  const report = reportFor(answersFor(0));
  assert.equal(report.type, 'opposite-oriented');
  assert.match(report.title, /异性倾向/);
}

{
  const report = reportFor(answersFor(1));
  assert.equal(report.type, 'same-oriented');
  assert.match(report.title, /同性倾向/);
}

{
  const report = reportFor(answersFor(2));
  assert.equal(report.type, 'open-fluid');
  assert.match(report.title, /双向开放|多性别/);
}

{
  const report = reportFor(answersFor(3));
  assert.equal(report.type, 'low-attraction');
  assert.match(report.title, /低吸引|安静/);
}

{
  const report = reportFor(alternatingAnswers());
  assert.notEqual(report.type, 'opposite-oriented');
  assert.ok(report.sections.length >= 3, 'report should include multiple interpretation sections');
}

console.log('scoring/report tests passed');
