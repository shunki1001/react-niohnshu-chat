import * as functions from "firebase-functions";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

// import cors from 'cors';
// const corsOptions = {
//   origin:'https://nihonshu-f58f5.web.app'
// }
const app = express();


// OpenAI APIの認証情報
const openaiApiKey = process.env.REACT_APP_API_KEY;
console.log(openaiApiKey)
const openaiApiUrl = 'https://api.openai.com/v1/chat/completions';

// JSONのパーサー
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cors(corsOptions))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://nihonshu-f58f5.web.app");
  // res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// GETメソッドの処理
app.get('/process', async (req, res) => {
  try {
    // リクエストボディを取得
    const {old, sex, like,frequency,place,why} = req.query;

    const chat:string = `
    下記の6つの情報から、おすすめの日本酒とおつまみを理由と共に提案してください。。
    年齢：${old},性別：${sex},好み：${like},お酒を飲む頻度：${frequency},今回お酒を飲む機会：${place},今回お酒を飲む目的：${why}
    # 出力形式
    お酒：
    理由：
    おつまみ：
    理由：
    `

    // OpenAI APIの呼び出し
    const response = await axios({
      method: 'post',
      url: `${openaiApiUrl}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
      },
      data: {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "system", "content": chat}]
      }
    });

    // レスポンスのJSON化と送信
    console.log(response.data.choices[0].message.content)
    res.json({
      result: response.data.choices[0].message.content
    });
  } catch (err) {
    // エラー処理
    console.error(err);
    res.status(500).send(err);
  }
});

// サーバーの起動
// app.listen(port, () => console.log(`Server running on port ${port}`));
export const api = functions.https.onRequest(app);
