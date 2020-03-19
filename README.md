# bank-monitor

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/nzws/bank-monitor/Node%20CI?style=for-the-badge)](https://github.com/nzws/bank-monitor/actions)
[![code style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge&logo=prettier)](https://prettier.io/)
[![dependabot enabled](https://img.shields.io/badge/dependabot-enabled-0366D6.svg?style=for-the-badge&logo=dependabot)](https://github.com/nzws/bank-monitor/pulls?utf8=%E2%9C%93&q=is%3Apr+label%3Adependencies+)

> An open online-banking app written in React Native.

<img src="https://assets-don.nzws.me/system/media_attachments/files/000/391/636/original/4c91a461a4480f40.png?1584517971" style="max-width: 300px;width:100%" />

## なにができるの？

- 複数口座の残高照会
- 履歴照会
- (楽天) ゆうちょから入金
- 新たな取引があった際、プッシュ通知
- 自分でサーバー動かせる

## 使い方

- **自己責任でご利用ください** お金が消えても補償できません
- iOS は動かしてないので動かないかも
- `GoogleService-Info.plist` と `google-services.json` は適当に作ってください
- `app.json` の値をそれぞれ変更してください
- FCM のサーバーキーを expo に紐づけてください

```bash
yarn
yarn b build
yarn f expo build:android # か iOS
cp packages/backend/config.sample.json packages/backend/config.json
vi packages/backend/config.json
```

- `config.json` は適当に設定してください (参考: @nzws/bank-js のドキュメント)
- 最後に、 `yarn b start` をデーモン作るなりして常時動くようにしておいてください

## License

- packages/backend: AGPL-3.0
- packages/frontend: See `packages/frontend/LICENSE.md`
