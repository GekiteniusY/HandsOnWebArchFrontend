"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { supabase } from "../../utils/supabase";

const SingUpForm = (props: {
  showModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const { showModal } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  const onSubmit = async (event: any) => {
    event.preventDefault();
    showModal(false);

    // emaiRedirectTo /auth/callbackのルーティングへのリンクの情報を設定
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });
      if (signUpError) {
        throw signUpError;
      }
    } catch (error) {
      alert("エラーが発生しました");
    }
  };

  // TODO: setEmailをラップする関数を作成する
  // TODO: setPasswordをラップする関数を作成する
  return (
    <form
      onSubmit={onSubmit}
      className='space-y-4'
    >
      <div>
        <label
          htmlFor='email'
          className='block mb-2 text-sm font-medium text-gray-900'
        >
          メールアドレス
        </label>
        <input
          type='email'
          name='email'
          id='email'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
          placeholder='name@company.com'
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label
          htmlFor='password'
          className='block mb-2 text-sm font-medium text-gray-900'
        >
          パスワード
        </label>
        <input
          type='password'
          name='password'
          id='password'
          placeholder='••••••••'
          className=''
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label
          htmlFor='passwordConf'
          className='block mb-2 text-sm font-medium text-gray-900'
        >
          パスワード（確認）
        </label>
        <input
          type='password'
          name='passwordConf'
          id='passwordConf'
          placeholder='••••••••'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
          required
          value={passwordConf}
          onChange={(e) => setPasswordConf(e.target.value)}
        />
      </div>
      <div>
        <button
          type='submit'
          className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
        >
          サインアップ
        </button>
      </div>
    </form>
  );
};

export default SingUpForm;
