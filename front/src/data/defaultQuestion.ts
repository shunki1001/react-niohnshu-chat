const defaultQuestion = [
    'こんにちは！',
    '「日本酒姉妹」チャンネルの姉と',
    '妹です！',
    'みなさんに日本酒とアテをおすすめします！',
    '私の質問に答えていってくださいね',
  ]
export default defaultQuestion

export const choice = [
  {
    index:1,
    key: 'old',
    list: ['20〜', '30〜', '40〜', '50〜', '60〜', '70〜'], 
    question: '年齢を教えてください',
  },
  {
    index:2,
    key: 'sex',
    list: ['女', '男'],
    question: '性別を教えてください',
  },
  
  {
    index:3,
    key: 'feel',
    list: ['リラックスしたい', 'お祝いしたい', 'とにかく飲みたい'],
    question: '今のお気持ちを教えてください',
  }
]