"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthError } from "@supabase/supabase-js";
import React, { useState } from "react";

// パスワード再設定用の画面
const InputPasswordForReset = () => {
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [isSend, setIsSend] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);

  // 新しいパスワードの送信処理
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // イベントの伝達阻止
    event.preventDefault();
    try {
      const supabase = createClientComponentClient();
      const { error } = await supabase.auth.updateUser({ password: password });
      if (error) {
        setError(error);
        throw error;
      }
      setIsSend(true);
    } catch (e) {
      console.log(e);
    }
  };

  if (error) {
    return (
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-20 text-center lg:pt-32'>
        <p>エラーが発生しました</p>
        <p>{JSON.stringify(error, null, 2)}</p>
      </div>
    );
  }

  // TODO: 更新後のX秒後にサインイン画面へリダイレクト処理を実装
  if (isSend) {
    return (
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-20 text-center lg:pt-32'>
        <p>パスワードを更新しました</p>
      </div>
    );
  }

  // TODO: setPasswordをラップする関数を作る、with バリデーション
  return (
    <div className='mx-auto max-w-7xl md:w-1/2 lg:w-1/4 px-4 sm:px-6 lg:px-8 pb-16 pt-20 text-center lg:pt-32'>
      <p>新しいパスワードを入力してください</p>
      <form
        onSubmit={onSubmit}
        className='pt-10 text-left'
      >
        <div>
          <label
            htmlFor='password'
            className='block mb-2 text-sm font-medium text-gray-900'
          ></label>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='••••••••'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=''
          />
        </div>
        <div className='pt-5'>
          <label
            htmlFor='passwordConf'
            className='block mb-2 text-sm font-medium text-gray-900'
          ></label>
          <input
            type='password'
            name='passwordConf'
            id='passwordConf'
            placeholder='••••••••'
            required
            value={passwordConf}
            onChange={(e) => setPasswordConf(e.target.value)}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rouded-lg focus:ring-glue-500 focus:border-blue-500 block w-full p-2.5'
          />
        </div>
        <div className='text-center mt-5'>
          <button
            type='submit'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center'
          >
            送信
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputPasswordForReset;
