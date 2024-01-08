import React from "react";
import { NextPage, GetStaticProps } from "next";
import { supabase } from "../../../utils/supabase";
import { Notice, Task } from "../../../types/types";
import CmpHeader from "../../../components/cmp_head";

// TODO: Next.js 13以降ではGetStaticPropsが使用できないためSWRに置き換えが必要
// export const getStaticProps: GetStaticProps = async () => {
//   console.log("ssg/page.tsx", "getStaticProps/ ssg invoked");

//   // todosテーブルから全てのレコードを取得
//   const { data: tasks } = await supabase
//     .from("todos")
//     .select("*")
//     .order("created_at", { ascending: true });

//   const { data: notices } = await supabase
//     .from("notices")
//     .select("*")
//     .order("created_at", { ascending: true });

//   // propsオブジェクトをリターン
//   return { props: { tasks, notices } };
// };

// TODO: 命名を後から変える
interface PageProps {
  tasks: Task[];
  notices: Notice[];
}

const Page: React.FC<PageProps> = ({ tasks, notices }) => {
  return (
    <>
      {/* ここにページのコンテンツを追加 */}
      <CmpHeader title='Todo' />
      <p className='mb-3 text-blue-500'>SSG</p>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <p className='text-lg font-extrabold'>{task.title}</p>
          </li>
        ))}
      </ul>
      <ul>
        {notices.map((notice) => (
          <li key={notice.id}>
            <p className='text-lg font-extrabold'>{notice.content}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Page;
