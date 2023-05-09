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
    id:1,
    option: true,
    key: 'old',
    list: ['20〜', '30〜', '40〜', '50〜', '60〜', '70〜'], 
    question: 'あなたは今いくつ？',
    example:[''],
    answer:''
  },
  {
    id:2,
    option:true,
    key: 'sex',
    list: ['女', '男'],
    question: 'あなたの性別は？',
    example:[''],
    answer:''
  },
  {
    id:3,
    option:true,
    key: 'like',
    list: ['甘いもの', '辛いもの'],
    question: '甘いものか、辛いものどちらが好き？',
    example:[''],
    answer:''
  },
  {
    id:4,
    option:true,
    key: 'frequency',
    list: ['週1回未満', '週1~4程度', 'ほぼ毎日'],
    question: 'お酒を飲む頻度はどのくらい？',
    example:[''],
    answer:''
  },
  {
    id:5,
    option:false,
    key: 'place',
    list: [],
    question: '今回お酒を飲むのはどんな時？どんな場所？',
    example:['デート','家飲み'],
    answer:''
  },
  {
    id:6,
    option:false,
    key: 'why',
    list: [],
    question: '今、どんな気分？',
    example:['のんびりしたい','妻と仲直りしたい'],
    answer:''
  },
]