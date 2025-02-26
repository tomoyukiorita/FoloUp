# プロジェクト構造説明

このドキュメントでは、FoloUpプロジェクトのディレクトリ構造と各ファイル・ディレクトリの役割について説明します。

## ルートディレクトリ構造

```
FoloUp/
├── .next/                  # Next.jsのビルド出力ディレクトリ
├── .github/                # GitHub関連の設定ファイル
├── .vscode/               # VSCode設定ファイル
├── node_modules/          # npm/yarnパッケージの依存関係
├── public/                # 静的ファイル配置ディレクトリ
├── src/                   # ソースコードのメインディレクトリ
├── .env                   # 環境変数設定ファイル
├── .env.example          # 環境変数のサンプルファイル
├── .eslintrc.js          # ESLint設定ファイル
├── .gitignore            # Gitの除外設定ファイル
├── CONTRIBUTING.md       # コントリビューションガイドライン
├── LICENSE               # ライセンスファイル
├── README.md             # プロジェクト説明ファイル
├── components.json       # UIコンポーネント設定
├── next-env.d.ts         # Next.js用TypeScript定義
├── next.config.js        # Next.js設定ファイル
├── package.json          # プロジェクト依存関係と設定
├── postcss.config.js     # PostCSS設定ファイル
├── supabase_schema.sql   # Supabaseデータベーススキーマ
├── tailwind.config.ts    # Tailwind CSS設定ファイル
├── tsconfig.json         # TypeScript設定ファイル
└── yarn.lock             # Yarn依存関係ロックファイル

## src/ディレクトリ構造

src/
├── actions/              # サーバーアクションとAPI関連の処理
├── app/                  # Next.jsアプリケーションのルーティングとページ
├── components/          # 再利用可能なUIコンポーネント
├── contexts/            # Reactコンテキスト
├── lib/                 # ユーティリティ関数とライブラリ
├── services/           # 外部サービスとの連携処理
├── types/              # TypeScript型定義
└── middleware.ts       # Next.jsミドルウェア設定

## 主要ファイル・ディレクトリの説明

### 設定ファイル
- `.env`: 環境変数設定（非公開）
- `.env.example`: 環境変数のサンプル（公開用）
- `tsconfig.json`: TypeScriptのコンパイラ設定
- `next.config.js`: Next.jsフレームワークの設定
- `tailwind.config.ts`: UIスタイリングのTailwind CSS設定

### ソースコード（src/）
- `actions/`: サーバーサイドの処理やAPIエンドポイント
- `app/`: ページコンポーネントとルーティング
- `components/`: 再利用可能なUIパーツ
- `contexts/`: アプリケーション全体で共有する状態管理
- `services/`: 外部サービス（Supabaseなど）との連携処理
- `types/`: TypeScript型定義ファイル

### データベース
- `supabase_schema.sql`: Supabaseデータベースのスキーマ定義

### ドキュメント
- `README.md`: プロジェクトの概要と開発手順
- `CONTRIBUTING.md`: コントリビューションガイドライン
- `LICENSE`: ライセンス情報
```

このプロジェクトはNext.js、TypeScript、Tailwind
CSS、Supabaseを使用したモダンなウェブアプリケーションです。
ディレクトリ構造は機能ごとに明確に分離され、保守性と拡張性を考慮した設計となっています。
