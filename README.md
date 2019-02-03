設定方法

1.パッケージをインストール
>cd /
>npm i

>cd /functions
>npm i


2.firebaseが使えるようするキーを取得
api-keys/firebase-secret.json.example
functions/api-keys/firebase-secret.json.example
を参照

こちらから設定ファイルを取得
https://console.firebase.google.com/u/0/

ダウンロードしたjsonファイル名を変更

※２つのjsonファイルを格納するので注意


3.起動（参考URL：https://qiita.com/kohashi/items/43ea22f61ade45972881）

パーミッションの権限が足りないと言われたため
>sudo npm i -g firebase-tools

>firebase login

Success! Logged in as メールアドレス
がでればOK

>cd /functions

パーミッションの権限が足りないと言われたため
>sudo npm run serve


firebase更新方法
>npm run deploy
