import React from "react";

// ログイン後のユーザープロフィールページ
// TODO: actionのパスがハードコーディングされているため、ディレクトリ変更でズレる
const Profile = () => {
  return (
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-20 text-center '>
      <h1 className='text-2xl font-bold'>ログイン中です</h1>
      <div className='pt-10'>
        <form
          action='api_handler/auth/logout'
          method='post'
        >
          <button
            type='submit'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
          >
            ログアウト
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
