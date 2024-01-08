import React, { FC, ReactNode } from "react";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import Head from "next/head";

// const Layout: FC = ({ children }) => {
//   return (
//     <div className='flex min-h-screen flex-col items-center justify-center font-mono text-3xl text-red-500'>
//       <header></header>
//       <main className='flex w-screen flex-1 flex-col items-center justify-center'>
//         <div>{children}</div>
//       </main>
//       <footer className='flex h-12 w-full items-center justify-center border-t'>
//         <CheckBadgeIcon className='h-6 w-6 text-blue-500' />
//       </footer>
//     </div>
//   );
// };

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center font-mono text-3xl text-red-500'>
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
