"use client";
import { getAllTodos } from "@/api";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";
import { useEffect, useState } from "react";

export default function Home() {

  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    (async () => {
      const tasks = await getAllTodos();

      console.log("🚀 ~ Home ~ tasks:", tasks);
      setTaskList(tasks.data);
    })();
  }, []);

  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Todo List App</h1>
        <AddTask setTaskList={setTaskList} />
      </div>
      <TodoList tasks={taskList} setTaskList={setTaskList} />
    </main>
  );
}
