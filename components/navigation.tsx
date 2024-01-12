"use client";

import { Session } from "@supabase/supabase-js";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import ModalCore from "./modal-core";
import { ModalType } from "./ modal/modal-type";

// ナビゲーションメニューのコンポーネント
// 画面上部にナビゲーションメニューを表示する
const Navigation = ({ session }: { session: Session | null }) => {
  const pathname = usePathname();
  const router = useRouter();

  // セッションが無かった場合、トップページへリダイレクト
  if (session === null && pathname?.includes("/profile")) {
    router.push("/");
  }

  return (
    <header>
      <div className='flex items-center justify-between px-4 py-2 bg-white shadow-md'>
        <nav className='hidden md:flex space-x-'>
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
                <ModalCore modalType={ModalType.SingIn}></ModalCore>
              </div>
              {/* サインアウト用のモーダル */}
              <div>
                <ModalCore modalType={ModalType.SingOut}></ModalCore>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
