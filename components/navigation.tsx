"use client";

import { Session } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import ModalCore from "./modal-core";
import { ModalType } from "./ modal/modal-type";
import { FlexMinWidth } from "../const/screen-width";

// TODO: 横幅を小さくしたときにナビゲーションメニューが隠れる→ハンバーガメニューに変更する

// ナビゲーションメニューのコンポーネント
// 画面上部にナビゲーションメニューを表示する
const Navigation = ({ session }: { session: Session | null }) => {
  const pathname = usePathname();
  const router = useRouter();

  // セッションが無かった場合、トップページへリダイレクト
  if (session === null && pathname?.includes("/profile")) {
    router.push("/");
  }

  // ハンバーガメニューの開閉状態と画面サイズの状態
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(true);

  // ハンバーガメニュー制御用のuseEffect
  useEffect(() => {
    // ウィンドウのリサイズイベントをリッスンして画面幅が変更されたら状態を更新
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > FlexMinWidth);
    };

    // 初回レンダリング時とリサイズ時にイベントリスナーを登録
    handleResize();
    window.addEventListener("resize", handleResize);

    // コンポーネントがアンマウントされるときにイベントリスナーを解除
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // TODO: ハンバーガメニューのアイコンを用意する、Close, Openのところを置き換える
  // TODO: サインアウト状態の見せ方を設計して修正する
  return (
    <header>
      {/* ハンバーガーアイコンのボタン */}
      <button
        onClick={() => setMenuOpen(!isMenuOpen)}
        className='md:hidden'
      >
        here is humburger menu
        <br />
        {isMenuOpen ? "Close" : "Open"}
      </button>

      {/* 画面幅が小さい場合：ハンバーガメニューのリスト */}
      <nav
        className={`md:hidden ${
          isMenuOpen ? "flex" : "hidden"
        } flex-col space-y-4`}
      >
        <div>
          <Link
            href='/'
            className='text-gray-600 hover:text-blue-600'
          >
            Home
          </Link>
        </div>
        {session ? (
          <>
            <div>
              <Link
                href='/profile'
                className='text-gray-600 hover:text-blue-600'
              >
                Profile
              </Link>
            </div>
          </>
        ) : (
          <>
            {/* サインイン用のモーダル */}
            <div>
              <ModalCore modalType={ModalType.SignIn}></ModalCore>
            </div>
            {/* サインアウト用のモーダル */}
            <div>
              <ModalCore modalType={ModalType.SignUp}></ModalCore>
            </div>
          </>
        )}
      </nav>

      {/* 画面幅が大きい場合：通常のナビゲーションメニュー */}
      <div className='flex items-center justify-between px-4 py-2 bg-white shadow-md'>
        <nav className='md:flex hidden space-x-10'>
          <div>
            {/* Homeへの遷移メニューはセッション情報によらず表示 */}
            <Link
              href='/'
              className='text-gray-600 hover:text-blue-600'
            >
              Home
            </Link>
          </div>
          {/* Home以外の遷移メニューはセッション情報の有無で分岐 */}
          {session ? (
            <div>
              <Link
                href='/profile'
                className='text-gray-600 hover:text-blue-600'
              >
                Profile
              </Link>
            </div>
          ) : (
            <>
              {/* サインイン用のモーダル */}
              <div>
                <ModalCore modalType={ModalType.SignIn}></ModalCore>
              </div>
              {/* サインアウト用のモーダル */}
              <div>
                <ModalCore modalType={ModalType.SignUp}></ModalCore>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
