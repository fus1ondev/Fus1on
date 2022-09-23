---
layout: src/layouts/PostLayout.astro
title: 3回目のリニューアル
pubDate: 2022-08-29
thumbnail: suwa-lake.jpg
draft: false
---

当サイト「Fus1on」の3回目のリニューアルを行いました。

## 技術スタック

### フレームワーク：Astro

v2で使用していたNext.jsではなくAstroを採用しました。

https://astro.build/

JSを取り除いた静的なページを生成してくれて、読み込み速度も改善した気がします。

また、後述する「`zenn-markdown-html`」を使用するのに一部Reactコンポーネントを使用しました。
Reactのようなフレームワークを簡単に組み込めるので便利です。

### デザイン：フレームワーク不使用、SCSS

Chakra UIなどのCSSフレームワークも使用しませんでしたが、SCSSは使いました。（Astroでの設定も簡単でした）

また、記事部分には`zenn-content-css`を元にダークモード対応したものを使用しています。

### Markdownレンダリング：Remark、Prism.js

Astroと`zenn-markdown-html`の相性が良くなかったので、Astroの標準機能であるRemarkによるレンダリングを使用しました。

シンタックスハイライトは標準ではShikiが使われていますが、Zennのテーマを流用するためにPrism.jsに変更しました。

### ホスティング：Vercel、Cloudinary

無難にVercelにデプロイしています。Astroとの相性も問題ないです。

また、画像はCloudinaryから最適化して配信しています。

Astroや`zenn-markdown-html`での画像の扱いが上手くいかなかったので外部URLを使いたかったという理由もあります。

### アナリティクス：umami

Googleアナリティクスではなく、umamiというNext.js製のツールをRailwayでセルフホストしています。

https://zenn.dev/fus1ondev/articles/umami-railway