(function () {
  const STORAGE_KEY = 'orientation-web-draft-v1';
  const questions = window.OrientationQuestions.questions;
  const calculateScores = window.OrientationScoring.calculateScores;
  const buildReport = window.OrientationReport.buildReport;

  const state = {
    view: 'home',
    currentIndex: 0,
    answers: []
  };

  const elements = {
    homeView: document.getElementById('homeView'),
    testView: document.getElementById('testView'),
    resultView: document.getElementById('resultView'),
    startButton: document.getElementById('startButton'),
    counter: document.getElementById('counter'),
    groupLabel: document.getElementById('groupLabel'),
    progressFill: document.getElementById('progressFill'),
    questionTitle: document.getElementById('questionTitle'),
    optionsList: document.getElementById('optionsList'),
    inlineMessage: document.getElementById('inlineMessage'),
    prevButton: document.getElementById('prevButton'),
    nextButton: document.getElementById('nextButton'),
    reportTitle: document.getElementById('reportTitle'),
    reportSummary: document.getElementById('reportSummary'),
    dimensionsList: document.getElementById('dimensionsList'),
    sectionsList: document.getElementById('sectionsList'),
    reportNote: document.getElementById('reportNote'),
    restartButton: document.getElementById('restartButton')
  };

  function init() {
    restoreDraft();
    bindEvents();
    render();
  }

  function bindEvents() {
    elements.startButton.addEventListener('click', startTest);
    elements.prevButton.addEventListener('click', prevQuestion);
    elements.nextButton.addEventListener('click', nextQuestion);
    elements.restartButton.addEventListener('click', restart);
  }

  function startTest() {
    state.view = 'test';
    state.currentIndex = clampIndex(state.currentIndex);
    render();
    saveDraft();
  }

  function prevQuestion() {
    if (state.currentIndex === 0) {
      return;
    }
    state.currentIndex -= 1;
    elements.inlineMessage.textContent = '';
    render();
    saveDraft();
  }

  function nextQuestion() {
    const currentQuestion = questions[state.currentIndex];
    if (!findAnswer(currentQuestion.id)) {
      elements.inlineMessage.textContent = '请选择一个答案，再继续。';
      return;
    }

    if (state.currentIndex < questions.length - 1) {
      state.currentIndex += 1;
      elements.inlineMessage.textContent = '';
      render();
      saveDraft();
      return;
    }

    state.view = 'result';
    elements.inlineMessage.textContent = '';
    render();
    saveDraft();
  }

  function chooseOption(optionId) {
    const currentQuestion = questions[state.currentIndex];
    state.answers = state.answers.filter((answer) => answer.questionId !== currentQuestion.id);
    state.answers.push({
      questionId: currentQuestion.id,
      optionId
    });
    elements.inlineMessage.textContent = '';
    renderQuestion();
    saveDraft();
  }

  function restart() {
    state.view = 'test';
    state.currentIndex = 0;
    state.answers = [];
    localStorage.removeItem(STORAGE_KEY);
    render();
  }

  function render() {
    elements.homeView.classList.toggle('is-hidden', state.view !== 'home');
    elements.testView.classList.toggle('is-hidden', state.view !== 'test');
    elements.resultView.classList.toggle('is-hidden', state.view !== 'result');

    if (state.view === 'test') {
      renderQuestion();
    }

    if (state.view === 'result') {
      renderReport();
    }
  }

  function renderQuestion() {
    const currentQuestion = questions[state.currentIndex];
    const selected = findAnswer(currentQuestion.id);
    const currentNumber = state.currentIndex + 1;
    const progress = Math.round((currentNumber / questions.length) * 100);

    elements.counter.textContent = `${currentNumber} / ${questions.length}`;
    elements.groupLabel.textContent = currentQuestion.group;
    elements.progressFill.style.width = `${progress}%`;
    elements.questionTitle.textContent = currentQuestion.title;
    elements.prevButton.disabled = state.currentIndex === 0;
    elements.nextButton.textContent = state.currentIndex === questions.length - 1 ? '生成报告' : '下一题';
    elements.optionsList.innerHTML = '';

    currentQuestion.options.forEach((option) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `option-button${selected && selected.optionId === option.id ? ' is-selected' : ''}`;
      button.setAttribute('aria-pressed', selected && selected.optionId === option.id ? 'true' : 'false');
      button.addEventListener('click', () => chooseOption(option.id));

      const mark = document.createElement('span');
      mark.className = 'option-mark';
      mark.textContent = selected && selected.optionId === option.id ? '✓' : '';

      const text = document.createElement('span');
      text.className = 'option-text';
      text.textContent = option.text;

      button.append(mark, text);
      elements.optionsList.appendChild(button);
    });
  }

  function renderReport() {
    const scores = calculateScores(state.answers, questions);
    const report = buildReport(scores);

    elements.reportTitle.textContent = report.title;
    elements.reportSummary.textContent = report.summary;
    elements.reportNote.textContent = report.note;
    elements.dimensionsList.innerHTML = '';
    elements.sectionsList.innerHTML = '';

    report.dimensions.forEach((dimension) => {
      const item = document.createElement('div');
      item.className = 'dimension';
      item.innerHTML = `
        <div class="dimension-head">
          <span></span>
          <strong></strong>
        </div>
        <div class="bar-track"><div class="bar-fill"></div></div>
      `;
      item.querySelector('span').textContent = dimension.label;
      item.querySelector('strong').textContent = `${dimension.value}%`;
      item.querySelector('.bar-fill').style.width = `${dimension.value}%`;
      elements.dimensionsList.appendChild(item);
    });

    report.sections.forEach((section) => {
      const item = document.createElement('section');
      item.className = 'reading-section';
      const heading = document.createElement('h3');
      heading.textContent = section.heading;
      const body = document.createElement('p');
      body.textContent = section.body;
      item.append(heading, body);
      elements.sectionsList.appendChild(item);
    });
  }

  function findAnswer(questionId) {
    return state.answers.find((answer) => answer.questionId === questionId);
  }

  function clampIndex(index) {
    return Math.max(0, Math.min(index, questions.length - 1));
  }

  function saveDraft() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      view: state.view,
      currentIndex: state.currentIndex,
      answers: state.answers
    }));
  }

  function restoreDraft() {
    try {
      const draft = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (!draft || !Array.isArray(draft.answers)) {
        return;
      }
      state.view = ['home', 'test', 'result'].includes(draft.view) ? draft.view : 'home';
      state.currentIndex = clampIndex(Number(draft.currentIndex) || 0);
      state.answers = draft.answers.filter((answer) => answer.questionId && answer.optionId);
    } catch (error) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  init();
}());
