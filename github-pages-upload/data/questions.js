const profileOptions = (idPrefix, labels) => ([
  {
    id: `${idPrefix}-opposite`,
    text: labels.opposite,
    scores: { opposite: 3, same: 0, multi: 0, romantic: 1, physical: 1, exploration: 0, low: 0 }
  },
  {
    id: `${idPrefix}-same`,
    text: labels.same,
    scores: { opposite: 0, same: 3, multi: 0, romantic: 1, physical: 1, exploration: 0, low: 0 }
  },
  {
    id: `${idPrefix}-open`,
    text: labels.open,
    scores: { opposite: 1, same: 1, multi: 3, romantic: 1, physical: 1, exploration: 2, low: 0 }
  },
  {
    id: `${idPrefix}-quiet`,
    text: labels.quiet,
    scores: { opposite: 0, same: 0, multi: 0, romantic: 0, physical: 0, exploration: 2, low: 3 }
  }
]);

const questions = [
  {
    id: 'q01',
    group: '情感吸引',
    title: '在日常生活里，你比较容易对哪类人产生轻微心动？',
    options: profileOptions('q01', {
      opposite: '主要是与自己性别不同的人',
      same: '主要是与自己性别相同的人',
      open: '不太受性别限制，气质和相处感更重要',
      quiet: '很少有这种心动，或暂时说不清'
    })
  },
  {
    id: 'q02',
    group: '情感吸引',
    title: '当你欣赏一个人时，最常出现的模式是？',
    options: profileOptions('q02', {
      opposite: '更常被异性的温柔、才华或气质吸引',
      same: '更常被同性的温柔、才华或气质吸引',
      open: '不同性别的人都可能让我产生欣赏和亲近感',
      quiet: '欣赏通常停留在尊重或美感，不太发展为吸引'
    })
  },
  {
    id: 'q03',
    group: '情感吸引',
    title: '如果某个人让你一天里反复想起，通常会是？',
    options: profileOptions('q03', {
      opposite: '异性更容易进入这种位置',
      same: '同性更容易进入这种位置',
      open: '性别并不稳定决定这件事',
      quiet: '这种情况很少发生，更多是被事情本身占据'
    })
  },
  {
    id: 'q04',
    group: '情感吸引',
    title: '你觉得“被某人吸引”这件事，对你来说更像？',
    options: profileOptions('q04', {
      opposite: '较明确地指向异性',
      same: '较明确地指向同性',
      open: '可能指向不同性别，边界比较柔和',
      quiet: '并不是生活里很核心或很清晰的感受'
    })
  },
  {
    id: 'q05',
    group: '浪漫亲密',
    title: '想象一次安静舒服的约会，你更自然想到？',
    options: profileOptions('q05', {
      opposite: '和异性一起散步、吃饭或看展',
      same: '和同性一起散步、吃饭或看展',
      open: '对象的性别不固定，关键是彼此自在',
      quiet: '更像是和自己、朋友或家人共度时间'
    })
  },
  {
    id: 'q06',
    group: '浪漫亲密',
    title: '谈到长期陪伴，你内心最容易接受的图景是？',
    options: profileOptions('q06', {
      opposite: '与异性建立稳定亲密关系',
      same: '与同性建立稳定亲密关系',
      open: '不同性别都有可能，取决于真实相处',
      quiet: '亲密陪伴可以重要，但不一定以恋爱形式出现'
    })
  },
  {
    id: 'q07',
    group: '浪漫亲密',
    title: '收到温柔而含蓄的示好时，哪种情况更可能让你认真考虑？',
    options: profileOptions('q07', {
      opposite: '来自异性时更容易被打动',
      same: '来自同性时更容易被打动',
      open: '来自不同性别都有可能被打动',
      quiet: '我通常需要很久才知道自己是否被打动'
    })
  },
  {
    id: 'q08',
    group: '浪漫亲密',
    title: '你对“恋人”这个角色的想象更接近？',
    options: profileOptions('q08', {
      opposite: '异性恋人更自然',
      same: '同性恋人更自然',
      open: '恋人的性别不是最关键的信息',
      quiet: '恋人这个角色本身对我并不总是必要'
    })
  },
  {
    id: 'q09',
    group: '身体吸引',
    title: '当你注意到一个人的外貌和气质时，身体层面的吸引更常来自？',
    options: profileOptions('q09', {
      opposite: '异性',
      same: '同性',
      open: '不同性别都可能',
      quiet: '我更多是审美欣赏，不常有身体吸引'
    })
  },
  {
    id: 'q10',
    group: '身体吸引',
    title: '你对亲密接触的想象通常更容易和谁联系在一起？',
    options: profileOptions('q10', {
      opposite: '异性',
      same: '同性',
      open: '不限定性别，取决于信任和情境',
      quiet: '这类想象较少，或需要很强的情感基础'
    })
  },
  {
    id: 'q11',
    group: '身体吸引',
    title: '面对影视或照片中的人物，你更容易被哪类呈现吸引？',
    options: profileOptions('q11', {
      opposite: '异性的魅力呈现',
      same: '同性的魅力呈现',
      open: '不同性别的魅力都可能打动我',
      quiet: '我更多关注画面、气质或故事，不太转为吸引'
    })
  },
  {
    id: 'q12',
    group: '身体吸引',
    title: '身体吸引和浪漫喜欢在你身上通常是什么关系？',
    options: profileOptions('q12', {
      opposite: '两者多半一起指向异性',
      same: '两者多半一起指向同性',
      open: '两者可能不完全同步，也可能指向不同对象',
      quiet: '身体吸引较弱，情感安全感更重要'
    })
  },
  {
    id: 'q13',
    group: '过往经验',
    title: '回看过去让你印象深的喜欢或好感，更常是？',
    options: profileOptions('q13', {
      opposite: '对异性的好感更明显',
      same: '对同性的好感更明显',
      open: '不同性别都出现过，或边界并不清楚',
      quiet: '很少有明确喜欢，更多是欣赏或依赖'
    })
  },
  {
    id: 'q14',
    group: '过往经验',
    title: '如果你曾有关系或暧昧经验，它们更像？',
    options: profileOptions('q14', {
      opposite: '主要发生在异性之间',
      same: '主要发生在同性之间',
      open: '不只一种性别，或不想按性别划分',
      quiet: '经验很少，或这些经验不能说明太多'
    })
  },
  {
    id: 'q15',
    group: '过往经验',
    title: '青春期或成长中最早的悸动，更接近？',
    options: profileOptions('q15', {
      opposite: '指向异性',
      same: '指向同性',
      open: '有过不同方向，或当时不懂如何命名',
      quiet: '并没有强烈悸动，记忆也比较淡'
    })
  },
  {
    id: 'q16',
    group: '过往经验',
    title: '别人问起你的感情经历时，你觉得最贴近的是？',
    options: profileOptions('q16', {
      opposite: '异性相关经历更能代表我',
      same: '同性相关经历更能代表我',
      open: '单一方向很难概括我',
      quiet: '经历不多，或我不想用经历定义自己'
    })
  },
  {
    id: 'q17',
    group: '身份认同',
    title: '如果必须选择一个临时描述，你更不排斥哪种说法？',
    options: profileOptions('q17', {
      opposite: '我大概偏异性恋',
      same: '我大概偏同性恋',
      open: '我可能是双性恋、泛性恋或开放型',
      quiet: '我还在探索，或不想使用固定标签'
    })
  },
  {
    id: 'q18',
    group: '身份认同',
    title: '听到别人谈论性取向标签时，你的感受更像？',
    options: profileOptions('q18', {
      opposite: '异性恋这个词较能安放我',
      same: '同性恋这个词较能安放我',
      open: '多元、双向或泛性的词更有空间',
      quiet: '标签有时让我紧张，我更愿意保留开放答案'
    })
  },
  {
    id: 'q19',
    group: '身份认同',
    title: '在安全的环境里，你更愿意怎样介绍自己的吸引模式？',
    options: profileOptions('q19', {
      opposite: '我主要被异性吸引',
      same: '我主要被同性吸引',
      open: '我会被不止一种性别吸引',
      quiet: '我不确定，或我的吸引较少出现'
    })
  },
  {
    id: 'q20',
    group: '身份认同',
    title: '你对“自我命名”的需求更接近？',
    options: profileOptions('q20', {
      opposite: '有一个偏异性恋的描述会让我安心',
      same: '有一个偏同性恋的描述会让我安心',
      open: '我需要能容纳复杂性的描述',
      quiet: '我暂时不需要明确命名'
    })
  },
  {
    id: 'q21',
    group: '生活选择',
    title: '选择恋爱题材作品时，哪类关系更容易让你代入？',
    options: profileOptions('q21', {
      opposite: '异性关系',
      same: '同性关系',
      open: '不同关系都能代入，重点是情感真实',
      quiet: '我更常被友情、成长或独处主题吸引'
    })
  },
  {
    id: 'q22',
    group: '生活选择',
    title: '朋友聊到理想伴侣时，你脑中浮现的形象通常是？',
    options: profileOptions('q22', {
      opposite: '异性形象更清楚',
      same: '同性形象更清楚',
      open: '形象会变化，性别不是固定前提',
      quiet: '很模糊，或我更看重生活方式是否合拍'
    })
  },
  {
    id: 'q23',
    group: '生活选择',
    title: '在社交场合里，你更容易注意到哪类人的亲密可能性？',
    options: profileOptions('q23', {
      opposite: '异性',
      same: '同性',
      open: '不同性别都可能，只是机会不同',
      quiet: '我很少自动想到亲密可能性'
    })
  },
  {
    id: 'q24',
    group: '生活选择',
    title: '如果未来生活很稳定，你希望亲密关系呈现为？',
    options: profileOptions('q24', {
      opposite: '与异性伴侣共建生活',
      same: '与同性伴侣共建生活',
      open: '与合适的人共建生活，不先限定性别',
      quiet: '也可能是单身、朋友共同体或非传统关系'
    })
  },
  {
    id: 'q25',
    group: '探索与流动',
    title: '你觉得自己的吸引方向随时间变化过吗？',
    options: profileOptions('q25', {
      opposite: '整体稳定地偏向异性',
      same: '整体稳定地偏向同性',
      open: '有变化，或不同阶段重点不同',
      quiet: '变化不明显，因为吸引本身就不常出现'
    })
  },
  {
    id: 'q26',
    group: '探索与流动',
    title: '遇到难以归类的心动时，你更可能？',
    options: profileOptions('q26', {
      opposite: '仍会把它理解为偶然，不改变偏异性倾向',
      same: '仍会把它理解为偶然，不改变偏同性倾向',
      open: '愿意承认它也是自我的一部分',
      quiet: '先观察，不急着解释'
    })
  },
  {
    id: 'q27',
    group: '探索与流动',
    title: '你对未来可能喜欢上不同性别的人，态度更像？',
    options: profileOptions('q27', {
      opposite: '可能性不大，我更清楚自己偏异性',
      same: '可能性不大，我更清楚自己偏同性',
      open: '我愿意保留这种可能性',
      quiet: '我连是否会喜欢上谁都不太确定'
    })
  },
  {
    id: 'q28',
    group: '探索与流动',
    title: '对你来说，“确定答案”重要吗？',
    options: profileOptions('q28', {
      opposite: '重要，我倾向于确认自己偏异性',
      same: '重要，我倾向于确认自己偏同性',
      open: '不必太固定，真实感受比答案更重要',
      quiet: '暂时不重要，我需要慢慢理解自己'
    })
  },
  {
    id: 'q29',
    group: '低吸引与边界',
    title: '你在生活中感到明显吸引的频率是？',
    options: profileOptions('q29', {
      opposite: '不算少，且主要指向异性',
      same: '不算少，且主要指向同性',
      open: '会出现，但对象性别并不固定',
      quiet: '很少，或比身边人低很多'
    })
  },
  {
    id: 'q30',
    group: '低吸引与边界',
    title: '建立亲密关系前，你通常需要什么？',
    options: profileOptions('q30', {
      opposite: '与异性的自然吸引和相处机会',
      same: '与同性的自然吸引和相处机会',
      open: '足够理解和信任，性别不先决定',
      quiet: '很深的安全感，否则很难产生吸引'
    })
  },
  {
    id: 'q31',
    group: '低吸引与边界',
    title: '别人描述强烈迷恋时，你的反应更像？',
    options: profileOptions('q31', {
      opposite: '能理解，尤其当对象是异性时',
      same: '能理解，尤其当对象是同性时',
      open: '能理解，但不觉得必须限定方向',
      quiet: '能尊重，但自己不常有类似体验'
    })
  },
  {
    id: 'q32',
    group: '低吸引与边界',
    title: '完成这份测试时，你最希望得到的是？',
    options: profileOptions('q32', {
      opposite: '确认自己偏异性倾向的线索',
      same: '确认自己偏同性倾向的线索',
      open: '理解复杂、多向或流动的自己',
      quiet: '获得允许自己不急着确定的空间'
    })
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    questions
  };
}

if (typeof window !== 'undefined') {
  window.OrientationQuestions = {
    questions
  };
}
