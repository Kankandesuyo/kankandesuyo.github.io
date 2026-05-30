const { questions } = require('../../data/questions');
const { calculateScores } = require('../../utils/scoring');
const { buildReport } = require('../../utils/report');

Page({
  data: {
    questions,
    currentIndex: 0,
    currentNumber: 1,
    total: questions.length,
    progress: 0,
    currentQuestion: questions[0],
    selectedOptionId: '',
    answers: [],
    isLast: false
  },

  onLoad() {
    this.refreshState(0);
  },

  chooseOption(event) {
    const optionId = event.currentTarget.dataset.optionId;
    const currentQuestion = this.data.currentQuestion;
    const answers = this.data.answers.filter((answer) => answer.questionId !== currentQuestion.id);
    answers.push({
      questionId: currentQuestion.id,
      optionId
    });

    this.setData({
      answers,
      selectedOptionId: optionId
    });
  },

  prevQuestion() {
    if (this.data.currentIndex === 0) {
      return;
    }
    this.refreshState(this.data.currentIndex - 1);
  },

  nextQuestion() {
    if (!this.data.selectedOptionId) {
      wx.showToast({
        title: '请选择一个答案',
        icon: 'none'
      });
      return;
    }

    if (!this.data.isLast) {
      this.refreshState(this.data.currentIndex + 1);
      return;
    }

    const app = getApp();
    const scores = calculateScores(this.data.answers, questions);
    app.globalData.answers = this.data.answers;
    app.globalData.report = buildReport(scores);
    wx.redirectTo({
      url: '/pages/result/result'
    });
  },

  refreshState(nextIndex) {
    const currentQuestion = questions[nextIndex];
    const existingAnswer = this.data.answers.find((answer) => answer.questionId === currentQuestion.id);
    this.setData({
      currentIndex: nextIndex,
      currentNumber: nextIndex + 1,
      progress: Math.round(((nextIndex + 1) / questions.length) * 100),
      currentQuestion,
      selectedOptionId: existingAnswer ? existingAnswer.optionId : '',
      isLast: nextIndex === questions.length - 1
    });
  }
});
