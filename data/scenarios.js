const scenarios = [
  {
    id: 1,
    category: 'AI判断力',
    scenario: '你让AI帮你写一份工作报告，AI给出了一个完整的报告。你的第一反应是？',
    options: [
      { text: '直接使用，反正AI写得比我好', scores: { aiJudgment: 0 } },
      { text: '快速浏览一遍，确认没有明显错误', scores: { aiJudgment: 2 } },
      { text: '对照原始需求逐项检查，验证每个关键点', scores: { aiJudgment: 4 } },
      { text: '让AI自己解释报告的逻辑，我再判断', scores: { aiJudgment: 3 } }
    ],
    analysis: 'AI输出需要验证。最佳做法是对照需求逐项检查，确保关键信息准确。"让AI解释逻辑"是进阶方法，但最终验证仍需自己完成。'
  },
  {
    id: 2,
    category: 'AI判断力',
    scenario: 'AI告诉你一个数据："2024年中国有3亿AI用户"。你如何判断这个数据是否可靠？',
    options: [
      { text: '相信AI，它应该有准确的数据来源', scores: { aiJudgment: 0 } },
      { text: '问AI数据来源是什么', scores: { aiJudgment: 2 } },
      { text: '自己搜索验证这个数据', scores: { aiJudgment: 4 } },
      { text: '问AI"这个数据有多个版本，哪个更准确"', scores: { aiJudgment: 3 } }
    ],
    analysis: 'AI可能"编造"数据。问来源是基础，但AI可能给出假来源。最佳做法是自己验证，或追问"有没有多个版本"来测试AI的一致性。'
  },
  {
    id: 3,
    category: 'AI判断力',
    scenario: '你问AI"我该不该跳槽"，AI给出了"建议跳槽"的回答。你会怎么处理这个建议？',
    options: [
      { text: '听AI的，它比我更客观', scores: { aiJudgment: 0 } },
      { text: '问AI为什么这么建议', scores: { aiJudgment: 2 } },
      { text: '告诉AI更多背景，看它是否会改变建议', scores: { aiJudgment: 3 } },
      { text: '意识到AI不了解我的具体情况，这个建议参考价值有限', scores: { aiJudgment: 4 } }
    ],
    analysis: 'AI不了解你的具体情况，给出的建议是"通用建议"。最佳判断是认识到这一点，把AI建议作为参考而非决策依据。'
  },
  {
    id: 4,
    category: 'AI判断力',
    scenario: '你让AI帮你分析"这个行业未来5年的发展趋势"。AI给出了详细预测。你如何看待这个预测？',
    options: [
      { text: 'AI有海量数据，预测应该比较准', scores: { aiJudgment: 0 } },
      { text: 'AI的预测有一定参考价值', scores: { aiJudgment: 2 } },
      { text: 'AI只能基于历史数据预测，对颠覆性变化无能为力', scores: { aiJudgment: 4 } },
      { text: '让AI给出多种可能情景，我来判断哪个更可能发生', scores: { aiJudgment: 3 } }
    ],
    analysis: 'AI预测的局限：基于历史数据，无法预测"黑天鹅"事件。最佳判断是认识这一局限，用AI生成多种情景，自己来判断可能性。'
  },
  {
    id: 5,
    category: '决策判断力',
    scenario: '公司有两个项目可选：项目A收益稳定但增长有限，项目B高风险高回报但可能失败。你会如何决策？',
    options: [
      { text: '选A，稳定最重要', scores: { decisionJudgment: 2 } },
      { text: '选B，高风险才有高回报', scores: { decisionJudgment: 2 } },
      { text: '分析两个项目的关键变量，设定决策条件', scores: { decisionJudgment: 4 } },
      { text: '问AI帮我分析利弊', scores: { aiJudgment: 1, decisionJudgment: 1 } }
    ],
    analysis: '没有"标准答案"的决策需要框架。最佳做法是识别关键变量（如失败概率、最大损失承受度），设定决策条件（"如果X发生，我选Y"）。'
  },
  {
    id: 6,
    category: '决策判断力',
    scenario: '你需要做一个重要决定，但只掌握了60%的信息，更多信息需要两周才能获取。但决策必须在明天做出。你会？',
    options: [
      { text: '等两周，信息不足不做决定', scores: { decisionJudgment: 1 } },
      { text: '今天就做决定，直觉往往是对的', scores: { decisionJudgment: 2 } },
      { text: '评估"做错决定的代价"和"等待的代价"，选择代价更小的', scores: { decisionJudgment: 4 } },
      { text: '让AI帮我分析现有信息', scores: { aiJudgment: 1, decisionJudgment: 1 } }
    ],
    analysis: '现实中大多数决策都在信息不足时做出。关键判断：比较"做错的代价"vs"等待的代价"。如果等待代价更高，就应该基于现有信息决策。'
  },
  {
    id: 7,
    category: '决策判断力',
    scenario: '你收到了3个工作offer，各有优劣。你会如何选择？',
    options: [
      { text: '选薪资最高的', scores: { decisionJudgment: 1 } },
      { text: '选大平台，以后跳槽更容易', scores: { decisionJudgment: 2 } },
      { text: '列出我未来3年最重要的3个目标，看哪个offer最匹配', scores: { decisionJudgment: 4 } },
      { text: '问AI帮我分析哪个offer更好', scores: { aiJudgment: 1, decisionJudgment: 1 } }
    ],
    analysis: '决策的本质是"匹配目标"。最佳做法是先明确自己的目标，再看哪个选项最匹配。没有目标的选择只是在随波逐流。'
  },
  {
    id: 8,
    category: '价值判断力',
    scenario: '你的下属在工作中犯了一个错误，客户发现了并投诉。你会如何处理？',
    options: [
      { text: '先安抚客户，再私下教育下属', scores: { valueJudgment: 3 } },
      { text: '让下属自己向客户道歉并承担责任', scores: { valueJudgment: 2 } },
      { text: '自己承担责任，然后帮助下属改进', scores: { valueJudgment: 4 } },
      { text: '找出是谁的问题，按公司规定处理', scores: { valueJudgment: 1 } }
    ],
    analysis: '这是"责任归属"的价值判断。最佳做法是管理者先承担责任（因为团队的问题就是管理者的责任），再帮助下属改进。这体现了"担当"的价值观。'
  },
  {
    id: 9,
    category: '价值判断力',
    scenario: '你的产品可以帮用户节省大量时间，但你知道用户会把省下的时间用来刷短视频，而不是做有意义的事。你会怎么想？',
    options: [
      { text: '这不关我的事，我只负责做好产品', scores: { valueJudgment: 1 } },
      { text: '有点纠结，但这确实是用户自己的选择', scores: { valueJudgment: 2 } },
      { text: '思考如何设计产品，引导用户把时间用在更好的地方', scores: { valueJudgment: 4 } },
      { text: '放弃这个产品，我不想"害"用户', scores: { valueJudgment: 3 } }
    ],
    analysis: '产品伦理的核心问题。最佳判断是在"满足需求"和"引导向善"之间找到平衡，而不是逃避责任或过度干预。'
  },
  {
    id: 10,
    category: '独特性识别',
    scenario: 'AI写了一篇文章，风格和你很像。你看到后是什么感觉？',
    options: [
      { text: '很好，以后可以让AI帮我写更多', scores: { uniqueness: 0 } },
      { text: '有点担心，AI是不是可以替代我了', scores: { uniqueness: 1 } },
      { text: '分析AI学到了什么，以及它缺少什么', scores: { uniqueness: 3 } },
      { text: '思考我的独特价值在哪里，AI无法替代什么', scores: { uniqueness: 4 } }
    ],
    analysis: 'AI可以模仿风格，但无法模仿"真实体验"和"原创洞见"。最佳判断是从被动恐惧转向主动思考：我的独特性到底是什么？'
  },
  {
    id: 11,
    category: '独特性识别',
    scenario: '有人问你"你的核心竞争力是什么"。你会怎么回答？',
    options: [
      { text: '我会用XX工具，有XX证书', scores: { uniqueness: 0 } },
      { text: '我有XX年的经验', scores: { uniqueness: 1 } },
      { text: '我擅长解决XX类问题，这需要综合多种能力', scores: { uniqueness: 3 } },
      { text: '我有独特的XX视角/方法论，这来自我的XX经历', scores: { uniqueness: 4 } }
    ],
    analysis: '工具和证书可以被学习，经验可以被积累，但"独特视角"和"方法论"来自个人经历的独特组合。最佳判断是认识到自己的独特性来源。'
  }
];

const dimensionLabels = {
  aiJudgment: 'AI判断力',
  decisionJudgment: '决策判断力',
  valueJudgment: '价值判断力',
  uniqueness: '独特性识别'
};

const dimensionDescriptions = {
  aiJudgment: '能否识别AI输出的质量，理解AI的能力边界',
  decisionJudgment: '在不确定情境中的决策能力',
  valueJudgment: '价值取向的清晰度，伦理判断的能力',
  uniqueness: '对自身独特性的认知和发展'
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { scenarios, dimensionLabels, dimensionDescriptions };
}
