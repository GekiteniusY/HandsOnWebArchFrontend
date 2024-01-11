"use client";
import React, { useEffect, useState } from "react";
import { NextPage, GetStaticProps } from "next";
import { supabase } from "../../../../utils/supabase";
import { Notice, Task } from "../../../../types/types";
import CmpHeader from "../../../../components/com-header";
import TodoLists from "../../../../components/com-todo-lists";
import useSWR from "swr";
import CmpRenderType from "../../../../components/com-render-type";

const Page: React.FC = ({}) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [notices, setNotices] = useState<any[]>([]);

  useEffect(() => {
    // do something
    console.log("ssg/page.tsx", "useEffect invoked");

    const getAllLists = async () => {
      // todosテーブルから全てのレコードを取得
      const { data: tasks } = await supabase
        .from("todos")
        .select("*")
        .order("created_at", { ascending: true });
      if (tasks) {
        setTasks(tasks);
      }

      const { data: notices } = await supabase
        .from("notices")
        .select("*")
        .order("created_at", { ascending: true });
      if (notices) {
        setNotices(notices);
      }
    };

    getAllLists();

    return () => {
      // do shomething
    };
  }, []);

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
