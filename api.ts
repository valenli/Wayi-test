"use client";
import { ITask } from "./types/task";

const baseURL = "https://wayi.league-funny.com/api";

export const getAllTodos = async () => {
  const res = await fetch(`${baseURL}/task`, { cache: "no-store" });
  if (!res.ok) return [];
  const todos = await res.json();
  return todos;
};

export const addTodo = async (todo: ITask): Promise<ITask> => {
  const res = await fetch(`${baseURL}/task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  const newTodo = await res.json();
  console.log(newTodo);

  return newTodo;
};
export const editTodo = async (id: number, todo: ITask) => {
  const res = await fetch(`${baseURL}/task/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  return res;
};
export const handleStatus = async (id: number, todo: ITask) => {
  const res = await fetch(`${baseURL}/task/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  return res;
};
export const handleDelete = async (id: number) => {
  const res = await fetch(`${baseURL}/task/${id}`, {
    method: "DELETE",
  });
  return res;
};
