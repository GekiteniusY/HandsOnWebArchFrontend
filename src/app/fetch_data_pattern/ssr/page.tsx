import React from "react";
import { supabase } from "../../../../utils/supabase";
import { Notice, Task } from "../../../../types/types";
import CmpHeader from "../../../../components/cmp_head";
import TodoLists from "../../../../components/com_todoList";
import useSWR from "swr";
import CmpRenderType from "../../../../components/cmp_renderType";

// use clientをつけると、延々とgetDataが走り続けるので注意

// const fetcher = (url: string) => fetch(url).then((result) => result.json());

async function getData() {
  console.log("start getData at ssr/");

  // return Task[]
  const { data: tasks } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: true });

  if (tasks === undefined && tasks === null) {
    throw new Error("fetch failed at todo data: " + tasks);
  }

  // return Notice[]
  const { data: notices } = await supabase
    .from("notices")
    .select("*")
    .order("created_at", { ascending: true });

  if (notices === undefined && notices === null) {
    throw new Error("fetch failed at notice data: " + notices);
  }

  // 実際に使用するときはORMなどで型を満たしているか確認したのちに変換したほうが良さそう
  const tasksData: Task[] = tasks!.map((fetchedData) => {
    const task: Task = {
      id: fetchedData.id,
      created_at: fetchedData.created_at,
      title: fetchedData.title
        ? fetchedData.title
        : "no title data from database",
      user_id: fetchedData.user_id
        ? fetchedData.user_id
        : "no user_id data from database",
    };

    return task;
  });

  const noticesData: Notice[] = notices!.map((fetchedData) => {
    const notice: Notice = {
      id: fetchedData.id,
      created_at: fetchedData.created_at,
      content: fetchedData.content
        ? fetchedData.content
        : "no title data from database",
      user_id: fetchedData.user_id
        ? fetchedData.user_id
        : "no user_id data from database",
    };

    return notice;
  });

  return { tasks: tasksData, notices: noticesData };

  // SWRを使用するケース
  // const { data, error } = useSWR("", fetcher);
  // const tasks = data.tasks;
  // const notices = data.notices;
  // if (error) {
  //   throw new Error("Failed to fetch data: " + error);
  // }
  // return data;
}

const Page: React.FC = async ({}) => {
  const allListData = await getData();
  const tasks = allListData.tasks;
  const notices = allListData.notices;

  return (
    <>
      <CmpHeader title='Todo' />
      <CmpRenderType renderType={"Server Side Rendering"} />
      <br />
      <TodoLists
        tasks={tasks}
        notices={notices}
      />
    </>
  );
};

export default Page;
