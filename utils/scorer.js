const MAX_SCORES = {
  aiJudgment: 16,
  decisionJudgment: 12,
  valueJudgment: 8,
  uniqueness: 8
};

const profileTypes = [
  {
    name: '审慎判断者',
    condition: (scores) => scores.aiJudgment >= 75 && scores.decisionJudgment >= 60,
    description: '你善于在复杂情况下做出审慎的判断，特别是在AI时代，你能够理性地评估AI输出的价值，并在决策中保持清晰的思路。',
    strengths: ['善于验证信息', '决策有框架', '不被表面现象迷惑'],
    improvements: ['可以更信任自己的直觉', '在紧急情况下可以更快决策']
  },
  {
    name: '直觉决策者',
    condition: (scores) => scores.decisionJudgment >= 70 && scores.valueJudgment >= 60,
    description: '你依赖直觉和价值观做出决策，在不确定的环境中能够快速行动。你的判断往往基于丰富的经验和清晰的价值观。',
    strengths: ['决策速度快', '价值观清晰', '行动力强'],
    improvements: ['可以增加信息验证环节', '在重大决策前可以更系统地分析']
  },
  {
    name: '价值导向者',
    condition: (scores) => scores.valueJudgment >= 75,
    description: '你的判断深受价值观影响，在做决定时会优先考虑伦理和长远影响。你是一个有原则的决策者。',
    strengths: ['原则性强', '考虑长远', '有社会责任感'],
    improvements: ['可以更灵活地处理短期利益', '在紧急情况下可以更快权衡']
  },
  {
    name: '独特洞察者',
    condition: (scores) => scores.uniqueness >= 75,
    description: '你对自己的独特性有清晰的认知，知道自己的价值所在。在AI时代，你能够找到自己的定位，发挥不可替代的作用。',
    strengths: ['自我认知清晰', '知道自己的价值', '善于发挥优势'],
    improvements: ['可以进一步提升AI判断力', '在决策中可以更系统地思考']
  },
  {
    name: 'AI时代探索者',
    condition: (scores) => scores.aiJudgment >= 60 && scores.uniqueness >= 60,
    description: '你正在探索AI时代的新可能，既能够利用AI的能力，又保持着自己的独特性。你是一个善于学习和适应的人。',
    strengths: ['善于学习新事物', '保持开放心态', '平衡AI与自我'],
    improvements: ['可以更系统地建立决策框架', '进一步明确自己的价值观']
  },
  {
    name: '成长中的判断者',
    condition: () => true,
    description: '你正在发展自己的判断力，这是一个持续成长的过程。通过更多的实践和反思，你的判断力会不断提升。',
    strengths: ['有成长空间', '保持学习态度', '愿意反思改进'],
    improvements: ['建立系统的判断框架', '增强对AI的理解', '明确自己的价值观']
  }
];

function calculateScores(answers) {
  const rawScores = {
    aiJudgment: 0,
    decisionJudgment: 0,
    valueJudgment: 0,
    uniqueness: 0
  };

  answers.forEach(answer => {
    const { scores } = answer;
    Object.keys(scores).forEach(dimension => {
      if (rawScores.hasOwnProperty(dimension)) {
        rawScores[dimension] += scores[dimension];
      }
    });
  });

  const normalizedScores = {};
  Object.keys(rawScores).forEach(dimension => {
    normalizedScores[dimension] = Math.round((rawScores[dimension] / MAX_SCORES[dimension]) * 100);
  });

  return { rawScores, normalizedScores };
}

function getProfile(scores) {
  const matchingProfile = profileTypes.find(profile => profile.condition(scores));
  return matchingProfile || profileTypes[profileTypes.length - 1];
}

function getImprovementSuggestions(scores) {
  const suggestions = [];

  if (scores.aiJudgment < 50) {
    suggestions.push({
      dimension: 'AI判断力',
      priority: 'high',
      suggestion: '建议学习AI的工作原理和局限性，培养验证AI输出的习惯。在使用AI时，始终保持"验证思维"。',
      resources: ['了解AI幻觉现象', '学习提示词工程', '建立AI输出验证清单']
    });
  } else if (scores.aiJudgment < 75) {
    suggestions.push({
      dimension: 'AI判断力',
      priority: 'medium',
      suggestion: '你对AI有一定的判断力，可以进一步提升。尝试让AI解释其推理过程，并交叉验证关键信息。',
      resources: ['深入学习AI能力边界', '练习追问技巧']
    });
  }

  if (scores.decisionJudgment < 50) {
    suggestions.push({
      dimension: '决策判断力',
      priority: 'high',
      suggestion: '建议建立系统的决策框架。在面临选择时，先明确目标，再列出选项，评估每个选项的利弊。',
      resources: ['学习决策矩阵', '了解机会成本概念', '练习设定决策条件']
    });
  } else if (scores.decisionJudgment < 75) {
    suggestions.push({
      dimension: '决策判断力',
      priority: 'medium',
      suggestion: '你的决策能力不错，可以进一步提升。尝试在决策前明确"什么情况下我会改变决定"。',
      resources: ['学习预承诺策略', '练习情景规划']
    });
  }

  if (scores.valueJudgment < 50) {
    suggestions.push({
      dimension: '价值判断力',
      priority: 'high',
      suggestion: '建议花时间思考你的核心价值观是什么。在做决定时，问问自己"这符合我的价值观吗？"',
      resources: ['列出你的核心价值观', '思考职业伦理问题', '阅读伦理决策案例']
    });
  } else if (scores.valueJudgment < 75) {
    suggestions.push({
      dimension: '价值判断力',
      priority: 'medium',
      suggestion: '你有较清晰的价值观，可以进一步深化。尝试在复杂情境中练习价值权衡。',
      resources: ['学习价值冲突处理', '练习伦理推理']
    });
  }

  if (scores.uniqueness < 50) {
    suggestions.push({
      dimension: '独特性识别',
      priority: 'high',
      suggestion: '建议思考：什么经历塑造了现在的你？你的独特视角来自哪里？AI无法替代你什么？',
      resources: ['梳理个人经历', '识别独特技能组合', '思考AI无法模仿的能力']
    });
  } else if (scores.uniqueness < 75) {
    suggestions.push({
      dimension: '独特性识别',
      priority: 'medium',
      suggestion: '你对自己的独特性有一定认知，可以进一步深化。尝试将你的独特性转化为具体的价值输出。',
      resources: ['发展独特方法论', '记录原创洞见']
    });
  }

  return suggestions.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

function generateResult(answers) {
  const { rawScores, normalizedScores } = calculateScores(answers);
  const profile = getProfile(normalizedScores);
  const suggestions = getImprovementSuggestions(normalizedScores);

  const totalScore = Math.round(
    (normalizedScores.aiJudgment + normalizedScores.decisionJudgment + 
     normalizedScores.valueJudgment + normalizedScores.uniqueness) / 4
  );

  return {
    scores: normalizedScores,
    rawScores,
    totalScore,
    profile,
    suggestions,
    completedAt: new Date().toISOString()
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    calculateScores, 
    getProfile, 
    getImprovementSuggestions, 
    generateResult,
    MAX_SCORES,
    dimensionLabels,
    dimensionDescriptions 
  };
}
