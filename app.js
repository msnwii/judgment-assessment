const App = {
  currentQuestion: 0,
  answers: [],
  
  init() {
    this.loadProgress();
    this.bindEvents();
    this.updateUI();
  },
  
  bindEvents() {
    document.getElementById('start-btn').addEventListener('click', () => this.startQuiz());
    document.getElementById('prev-btn').addEventListener('click', () => this.prevQuestion());
    document.getElementById('next-btn').addEventListener('click', () => this.nextQuestion());
    document.getElementById('restart-btn').addEventListener('click', () => this.restart());
    document.getElementById('copy-btn').addEventListener('click', () => this.copyResult());
  },
  
  loadProgress() {
    const saved = localStorage.getItem('judgment-assessment-progress');
    if (saved) {
      const data = JSON.parse(saved);
      this.currentQuestion = data.currentQuestion || 0;
      this.answers = data.answers || [];
    }
  },
  
  saveProgress() {
    localStorage.setItem('judgment-assessment-progress', JSON.stringify({
      currentQuestion: this.currentQuestion,
      answers: this.answers
    }));
  },
  
  clearProgress() {
    localStorage.removeItem('judgment-assessment-progress');
  },
  
  startQuiz() {
    document.getElementById('start-page').classList.add('hidden');
    document.getElementById('question-page').classList.remove('hidden');
    this.showQuestion();
  },
  
  showQuestion() {
    const question = scenarios[this.currentQuestion];
    const total = scenarios.length;
    
    document.getElementById('category-badge').textContent = question.category;
    document.getElementById('progress-text').textContent = `${this.currentQuestion + 1} / ${total}`;
    document.getElementById('progress-bar').style.width = `${((this.currentQuestion + 1) / total) * 100}%`;
    document.getElementById('scenario-text').textContent = question.scenario;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = option.text;
      btn.dataset.index = index;
      
      const savedAnswer = this.answers[this.currentQuestion];
      if (savedAnswer && savedAnswer.optionIndex === index) {
        btn.classList.add('selected');
      }
      
      btn.addEventListener('click', () => this.selectOption(index));
      optionsContainer.appendChild(btn);
    });
    
    document.getElementById('prev-btn').disabled = this.currentQuestion === 0;
    this.updateNextButton();
  },
  
  selectOption(index) {
    const question = scenarios[this.currentQuestion];
    const option = question.options[index];
    
    this.answers[this.currentQuestion] = {
      questionId: question.id,
      optionIndex: index,
      scores: option.scores,
      scenario: question.scenario,
      selectedText: option.text,
      analysis: question.analysis
    };
    
    document.querySelectorAll('.option-btn').forEach((btn, i) => {
      btn.classList.toggle('selected', i === index);
    });
    
    this.saveProgress();
    this.updateNextButton();
  },
  
  updateNextButton() {
    const nextBtn = document.getElementById('next-btn');
    const hasAnswer = this.answers[this.currentQuestion] !== undefined;
    
    if (this.currentQuestion === scenarios.length - 1) {
      nextBtn.textContent = '查看结果';
      nextBtn.disabled = !hasAnswer;
    } else {
      nextBtn.textContent = '下一题';
      nextBtn.disabled = !hasAnswer;
    }
  },
  
  prevQuestion() {
    if (this.currentQuestion > 0) {
      this.currentQuestion--;
      this.showQuestion();
    }
  },
  
  nextQuestion() {
    if (!this.answers[this.currentQuestion]) return;
    
    if (this.currentQuestion < scenarios.length - 1) {
      this.currentQuestion++;
      this.showQuestion();
    } else {
      this.showResult();
    }
  },
  
  showResult() {
    const result = generateResult(this.answers);
    
    document.getElementById('question-page').classList.add('hidden');
    document.getElementById('result-page').classList.remove('hidden');
    
    document.getElementById('profile-initial').textContent = result.profile.name.charAt(0);
    document.getElementById('profile-name').textContent = result.profile.name;
    document.getElementById('profile-description').textContent = result.profile.description;
    document.getElementById('total-score').textContent = result.totalScore + '分';
    
    this.renderScores(result.scores);
    this.renderStrengths(result.profile.strengths);
    this.renderSuggestions(result.suggestions);
    this.renderAnalysis();
    
    this.clearProgress();
  },
  
  renderScores(scores) {
    const container = document.getElementById('scores-container');
    container.innerHTML = '';
    
    const dimensions = [
      { key: 'aiJudgment', label: 'AI判断力', color: 'blue' },
      { key: 'decisionJudgment', label: '决策判断力', color: 'green' },
      { key: 'valueJudgment', label: '价值判断力', color: 'yellow' },
      { key: 'uniqueness', label: '独特性识别', color: 'purple' }
    ];
    
    dimensions.forEach(dim => {
      const score = scores[dim.key];
      const div = document.createElement('div');
      div.innerHTML = `
        <div class="flex justify-between items-center mb-1">
          <span class="text-sm font-medium text-slate-700">${dim.label}</span>
          <span class="text-sm font-bold text-slate-800">${score}分</span>
        </div>
        <div class="score-bar-container">
          <div class="score-bar ${dim.key}" style="width: ${score}%"></div>
        </div>
      `;
      container.appendChild(div);
    });
  },
  
  renderStrengths(strengths) {
    const list = document.getElementById('strengths-list');
    list.innerHTML = strengths.map(s => `<li class="strength-item">${s}</li>`).join('');
  },
  
  renderSuggestions(suggestions) {
    const container = document.getElementById('suggestions-container');
    container.innerHTML = suggestions.map(s => `
      <div class="suggestion-card ${s.priority}">
        <div class="font-medium text-slate-800 mb-1">${s.dimension} ${s.priority === 'high' ? '（重点提升）' : ''}</div>
        <p class="text-sm text-slate-600 mb-2">${s.suggestion}</p>
        <div class="text-xs text-slate-500">
          建议学习：${s.resources.join(' · ')}
        </div>
      </div>
    `).join('');
  },
  
  renderAnalysis() {
    const container = document.getElementById('analysis-container');
    container.innerHTML = this.answers.map(a => `
      <div class="analysis-card">
        <div class="question">Q${a.questionId}：${a.scenario}</div>
        <div class="answer">你的选择：${a.selectedText}</div>
        <div class="insight">💡 ${a.analysis}</div>
      </div>
    `).join('');
  },
  
  copyResult() {
    const result = generateResult(this.answers);
    const text = `【判断力测评结果】
    
我的判断力画像：${result.profile.name}
综合得分：${result.totalScore}分

各维度得分：
- AI判断力：${result.scores.aiJudgment}分
- 决策判断力：${result.scores.decisionJudgment}分
- 价值判断力：${result.scores.valueJudgment}分
- 独特性识别：${result.scores.uniqueness}分

${result.profile.description}

来测测你的判断力吧！`;

    navigator.clipboard.writeText(text).then(() => {
      this.showToast('已复制到剪贴板');
    }).catch(() => {
      this.showToast('复制失败，请手动复制');
    });
  },
  
  showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  },
  
  restart() {
    this.currentQuestion = 0;
    this.answers = [];
    this.clearProgress();
    
    document.getElementById('result-page').classList.add('hidden');
    document.getElementById('start-page').classList.remove('hidden');
  },
  
  updateUI() {
    if (this.answers.length > 0 && this.currentQuestion > 0) {
      document.getElementById('start-page').classList.add('hidden');
      document.getElementById('question-page').classList.remove('hidden');
      this.showQuestion();
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
