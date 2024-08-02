import os

import requests
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from functions_wrapper import entrypoint

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": os.environ["CORS_URL"]}})

# OpenAI APIの認証情報
openai_api_key = os.environ["API_KEY"]
openai_api_url = "https://api.openai.com/v1/chat/completions"


@app.route("/process", methods=["GET"])
def process():
    try:
        # リクエストパラメータを取得
        old = request.args.get("old")
        sex = request.args.get("sex")
        like = request.args.get("like")
        frequency = request.args.get("frequency")
        place = request.args.get("place")
        why = request.args.get("why")

        chat = f"""
        下記の6つの情報から、おすすめの日本酒とおつまみを理由と共に提案してください。
        年齢：{old},性別：{sex},好み：{like},お酒を飲む頻度：{frequency},今回お酒を飲む機会：{place},今回お酒を飲む目的：{why}
        # 出力形式
        お酒：
        理由：
        おつまみ：
        理由：
        """

        # OpenAI APIの呼び出し
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {openai_api_key}",
        }

        data = {
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "system", "content": chat}],
        }

        response = requests.post(openai_api_url, headers=headers, json=data)
        response_data = response.json()

        # レスポンスのJSON化と送信
        result = response_data["choices"][0]["message"]["content"]
        return (jsonify({"result": result}), 200)

    except Exception as err:
        # エラー処理
        print(err)
        return str(err), 500


app_wrap = lambda request: entrypoint(app, request)

# サーバーの起動
if __name__ == "__main__":
    app.run(debug=True)
