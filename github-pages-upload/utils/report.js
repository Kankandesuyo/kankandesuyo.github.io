function buildReport(scores) {
  const values = scores.dimensions.reduce((map, dimension) => {
    map[dimension.key] = dimension.value;
    return map;
  }, {});

  const low = normalizeInternal(scores.totals.low, scores.maximums.low);
  const opposite = values.opposite || 0;
  const same = values.same || 0;
  const multi = values.multi || 0;
  const exploration = values.exploration || 0;
  const romantic = values.romantic || 0;
  const physical = values.physical || 0;

  let type = 'exploring';
  let title = '你的吸引模式更接近：尚在探索型';
  let summary = '你的答案显示，自我理解仍在展开。此刻没有必要急着把自己放进固定名称里，保留观察也是一种清醒。';

  if (low >= 58 && low >= opposite && low >= same && low >= multi) {
    type = 'low-attraction';
    title = '你的吸引模式更接近：低吸引探索型';
    summary = '你的答案更强调安静、谨慎或较少出现的吸引体验。你可能需要更深的安全感，也可能只是并不常以恋爱或身体吸引来理解关系。';
  } else if (multi >= 45 && Math.abs(opposite - same) <= 26) {
    type = 'open-fluid';
    title = '你的吸引模式更接近：双向开放型';
    summary = '你的答案显示，吸引并不总被单一性别边界决定。气质、相处、信任和具体的人，可能比性别标签更能解释你的亲近感。';
  } else if (opposite >= same + 20 && opposite >= multi) {
    type = 'opposite-oriented';
    title = '你的吸引模式更接近：异性倾向型';
    summary = '你的答案较稳定地指向异性吸引。这个结果描述的是当前模式，不代表你必须用某个标签固定自己。';
  } else if (same >= opposite + 20 && same >= multi) {
    type = 'same-oriented';
    title = '你的吸引模式更接近：同性倾向型';
    summary = '你的答案较稳定地指向同性吸引。这个结果可以作为自我理解线索，但最终如何命名仍由你决定。';
  } else if (exploration >= 52) {
    type = 'open-fluid';
    title = '你的吸引模式更接近：多性别开放型';
    summary = '你的答案带有明显的开放和流动特征。你可能更适合用宽一些的语言描述自己，而不是急着得出单一结论。';
  }

  return {
    type,
    title,
    summary,
    dimensions: scores.dimensions,
    sections: [
      {
        heading: '情感与浪漫',
        body: romantic >= 45
          ? '你对陪伴、心动和亲密关系有较清楚的感受线索，可以继续观察这些线索通常在什么人身上出现。'
          : '你的浪漫感受可能较慢热或较含蓄。慢一点并不代表缺少能力，只是节奏不同。'
      },
      {
        heading: '身体吸引',
        body: physical >= 45
          ? '你能觉察到一定的身体层面吸引。它可以和浪漫喜欢一致，也可以不完全同步。'
          : '身体吸引在你的答案里并不突出。亲密关系仍可以由信任、理解和生活默契构成。'
      },
      {
        heading: '探索空间',
        body: exploration >= 45
          ? '你保留了探索和重新理解自己的空间。对复杂性的诚实，比匆忙得出答案更重要。'
          : '你的答案相对稳定。即便如此，稳定也不需要由外界替你命名。'
      }
    ],
    note: '本报告只是一份自我探索材料，不是医学、心理或身份诊断。你始终拥有解释自己、命名自己或暂不命名的权利。'
  };
}

function normalizeInternal(value, max) {
  if (!max) {
    return 0;
  }
  return Math.round((value / max) * 100);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    buildReport
  };
}

if (typeof window !== 'undefined') {
  window.OrientationReport = {
    buildReport
  };
}
