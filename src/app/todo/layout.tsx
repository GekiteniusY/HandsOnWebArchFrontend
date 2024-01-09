import React, { FC, ReactNode } from "react";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import Head from "next/head";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    // flex: フレックスボックスを使用
    // min-h-screen: コンテンツが画面よりも短い場合でも、画面全体を占有
    // flex-col: フレックスコンテナ内の子要素を縦方向に配置
    // items-center: 子要素を横方向に中央揃え
    // justify-center: 子要素を縦方向に対して中央揃え
    <div className='flex min-h-screen flex-col items-center justify-center font-mono text-3xl text-red-500'>
      {/* page.tsxからlayout.tsxに値を渡せないので（暗黙的にラップされているため）不要 */}
      {/* <Head> */}
      {/* propsのタイトルを表示 */}
      {/* <title>{title}</title> */}
      {/* </Head> */}
      <header></header>
      <main className='flex w-screen flex-1 flex-col items-center justify-center'>
        <div>{children}</div>
      </main>
      <footer className='flex h-12 w-full items-center justify-center border-t'>
        <CheckBadgeIcon className='h-6 w-6 text-blue-500' />
      </footer>
    </div>
  );
};

export default Layout;
