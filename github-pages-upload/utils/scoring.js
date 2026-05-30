const DIMENSIONS = [
  { key: 'opposite', label: '异性倾向' },
  { key: 'same', label: '同性倾向' },
  { key: 'multi', label: '多性别开放度' },
  { key: 'romantic', label: '浪漫吸引' },
  { key: 'physical', label: '身体吸引' },
  { key: 'exploration', label: '探索/流动性' }
];

const INTERNAL_KEYS = ['low'];
const ALL_KEYS = DIMENSIONS.map((dimension) => dimension.key).concat(INTERNAL_KEYS);

function emptyTotals() {
  return ALL_KEYS.reduce((totals, key) => {
    totals[key] = 0;
    return totals;
  }, {});
}

function calculateScores(answers, questions) {
  const totals = emptyTotals();
  const maximums = emptyTotals();
  const answerMap = (answers || []).reduce((map, answer) => {
    map[answer.questionId] = answer.optionId;
    return map;
  }, {});

  questions.forEach((question) => {
    ALL_KEYS.forEach((key) => {
      const maxForQuestion = Math.max(...question.options.map((option) => option.scores[key] || 0));
      maximums[key] += maxForQuestion;
    });

    const selected = question.options.find((option) => option.id === answerMap[question.id]);
    if (!selected) {
      return;
    }

    ALL_KEYS.forEach((key) => {
      totals[key] += selected.scores[key] || 0;
    });
  });

  const dimensions = DIMENSIONS.map((dimension) => ({
    key: dimension.key,
    label: dimension.label,
    value: normalize(totals[dimension.key], maximums[dimension.key])
  }));

  return {
    totals,
    maximums,
    dimensions,
    completion: questions.length ? Math.round((answers.length / questions.length) * 100) : 0,
    answeredCount: answers.length,
    totalCount: questions.length
  };
}

function normalize(value, max) {
  if (!max) {
    return 0;
  }
  return Math.round((value / max) * 100);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DIMENSIONS,
    calculateScores
  };
}

if (typeof window !== 'undefined') {
  window.OrientationScoring = {
    DIMENSIONS,
    calculateScores
  };
}
