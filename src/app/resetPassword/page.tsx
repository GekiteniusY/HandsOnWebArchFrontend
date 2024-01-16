"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthError } from "@supabase/supabase-js";
import React, { useState } from "react";

// パスワードリセット前のメール送信用画面
const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isSend, setIsSend] = useState(false);

  // SupabaseのAuthError
  const [error, setError] = useState<AuthError | null>(null);

  // メールアドレスの送信処理
  // TODO: リセットメールが2通飛ぶ事象が発生
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // イベントの伝達阻止
    event.preventDefault();

    // TODO:エラー時にアプリケーションが止まってしまうロジックを修正
    try {
      const supabase = createClientComponentClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${location.origin}/resetPassword/inputPassword`,
      });
      if (error) {
        setError(error);
        throw error;
      }
      setIsSend(true);
    } catch (e) {
      console.log(e);
    }
  };

  // エラーが発生した場合はエラー画面を表示
  if (error) {
    return (
      <div className='mx-auto max-w-7 px-4 sm:px-6 lg:px-8 pb-16 pt-20 text-center lg:pt-32'>
        <p>エラーが発生しました</p>
        <p>{JSON.stringify(error, null, 2)}</p>
      </div>
    );
  }

  // 送信処理が完了したら完了画面を表示
  if (isSend) {
    return (
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-20 text-center lg:pt-32'>
        <p>メールを送信しました</p>
      </div>
    );
  }

  // TODO: setEmailをラップする関数を作る
  return (
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-20 text-center lg:pt-32'>
      <p>アカウントに結びついているメールアドレスを入力してください</p>
      <form
        onSubmit={onSubmit}
        className='pt-10'
      >
        <input
          type='email'
          placeholder='メールアドレス'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 md:w-2/3 lg:w-1/2 p-2.5'
        />
        <button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus: ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 text-center'
        >
          送信
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
