import CmpHeader from "../../../../components/com-header";
import CmpRenderType from "../../../../components/com-render-type";
import TodoLists from "../../../../components/com-todo-lists";
import { Notice, Task } from "../../../../types/types";
import { supabase } from "../../../../utils/supabase";

const Page: React.FC = async ({}) => {
  const { tasks: tasks, notices: notices } = await getData();

  return (
    <>
      <CmpHeader title='Todo' />
      <CmpRenderType renderType='Static Site Generation' />
      <br />
      <TodoLists
        tasks={tasks}
        notices={notices}
      />
    </>
  );
};
export default Page;

async function getData() {
  // APIのコール
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
  const taskS: string = "";

  // SWRを使用するケース
  // const { data, error } = useSWR("", fetcher);
  // const tasks = data.tasks;
  // const notices = data.notices;
  // if (error) {
  //   throw new Error("Failed to fetch data: " + error);
  // }
  // return data;

  // Pageに渡すデータはここで作成する
  return {
    tasks: tasksData,
    notices: noticesData,
  };
}
