import { Notice, Task } from "../types/types";
import CmpHeader from "./cmp_head";

type _AllLists = {
  tasks: Task[];
  notices: Notice[];
};

const TodoLists: React.FC<_AllLists> = ({ tasks, notices }: _AllLists) => {
  return (
    <>
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

export default TodoLists;
