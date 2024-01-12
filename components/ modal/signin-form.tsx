"use client";

import React, { Dispatch, SetStateAction } from "react";

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
      <div></div>
      <div></div>
    </form>
  );
};

export default SingInForm;
