import React, { useState } from "react";
import { ITask } from "@/types/task";
import Task from "./Task";

interface TodoListProps {
  tasks: ITask[];
  setTaskList: React.Dispatch<React.SetStateAction<ITask[]>>;
}

const TodoList: React.FC<TodoListProps> = ({ tasks, setTaskList }) => {
  const [showCompleted, setShowCompleted] = useState<boolean>(true);

  const handleToggleView = (show: boolean) => {
    setShowCompleted(show);
  };

  const filteredTasks = showCompleted
    ? tasks.filter((task) => task.is_completed)
    : tasks;

  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <button className="btn" onClick={() => handleToggleView(true)}>
          已完成
        </button>
      </div>
      <div>
        <button className="btn" onClick={() => handleToggleView(false)}>全部</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>任務名稱</th>
            <th>任務描述</th>
            <th>完成狀態</th>
            <th>創建時間</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <Task key={task.id} task={task} setTaskList={setTaskList} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
