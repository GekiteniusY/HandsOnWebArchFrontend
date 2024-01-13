"use client";

import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";

// TODO: 入力欄をコンポーネント化する
const SingInForm = (props: {
  showModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const { showModal } = props;

  return (
    // フォームの入力時の処理はlogin/route.tsxのPOSTで行われる
    <form
      action='/auth/login'
      method='post'
      className='space-y-4'
    >
      {/* メールアドレスの入力欄 */}
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
        />
      </div>
      {/* パスワードの入力欄 */}
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
          placeholder='•••••'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
        />
      </div>
      {/* パスワードを忘れた場合 */}
      <div>
        <Link
          className='font-medium text-xs text-blue-600 dark:text-blue-500 hover:underline'
          href={`${location.origin}/resetPassword`}
          onClick={() => showModal(false)}
        >
          パスワードを忘れた場合
        </Link>
      </div>
      {/* サインインボタン */}
      <div>
        <button className='w-full text-white bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue300 font-midium rounded-lg text-sm px-5 py-2.5 text-center'>
          サインイン
        </button>
      </div>
    </form>
  );
};

export default SingInForm;
