"use client";
import React, { useState, FormEventHandler } from "react";
import { ITask } from "@/types/task";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from "./Modal";
import { editTodo, getAllTodos, handleDelete, handleStatus } from "@/api";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task, setTaskList }) => {
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [taskToEditName, setTaskToEditName] = useState<string>(task.name);
  const [taskTodEdit, setTaskToEdit] = useState<string>(task.description);

  const handleToggleTodo = async () => {
    
    const newStatus = !task.is_completed;
    console.log("Toggle Todo:", task.id, "newStatus:", newStatus);
    await handleStatus(task.id, newStatus);

    const res = await getAllTodos();
    console.log("res", res);
    if (res.status === "success") {
      const taskList = await getAllTodos();
      setTaskList(taskList.data);
      console.log("taskList:", taskList);
    }
    //api
  };

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const trimmedTaskValue = taskToEditName.trim();
    const trimmedTaskDescription = taskTodEdit.trim();
    if (trimmedTaskValue.length > 10) {
      alert("任務名稱長度不可超過10個字");
      return;
    }
    if (trimmedTaskDescription.length > 30) {
      alert("任務描述長度不可超過30個字");
      return;
    }

    await editTodo(task.id, {
      name: taskToEditName,
      description: taskTodEdit,
      is_completed: false,
      created_at: new Date(),
      updated_at: new Date(),
    });
    setOpenModalEdit(false);
    const res = await getAllTodos();
    console.log("res", res);
    if (res.status === "success") {
      const taskList = await getAllTodos();
      setTaskList(taskList.data);
      console.log("taskList:", taskList);
    }
  };

  const handleDeleteTask = async (id: string) => {
    await handleDelete(task.id);

    setOpenModalDeleted(false);
    const res = await getAllTodos();
    console.log("res", res);
    if (res.status === "success") {
      const taskList = await getAllTodos();
      setTaskList(taskList.data);
      console.log("taskList:", taskList);
    }
  };
  

  //api
  return (
    <>
      <tr key={task.id}>
        <td>{task.name}</td>
        <td>{task.description}</td>

        <td>
          <input
            type="checkbox"
            checked={task.is_completed}
            onChange={handleToggleTodo}
          />
          {task.is_completed ? "完成" : "未完成"}
        </td>

        <td>{task.created_at.toLocaleString()}</td>

        <td className="flex gap-5">
          <FaEdit
            onClick={() => setOpenModalEdit(true)}
            cursor="pointer"
            className="text-blue-500"
            size={25}
          />
          <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
            <form onSubmit={handleSubmitEditTodo}>
              <h3 className="font-bold text-lg">更改任務</h3>
              <div className="modal-action">
                <input
                  required
                  value={taskToEditName}
                  onChange={(e) => setTaskToEditName(e.target.value)}
                  type="text"
                  placeholder="Name"
                  className="input input-bordered w-full"
                />
                <input
                  value={taskTodEdit}
                  onChange={(e) => setTaskToEdit(e.target.value)}
                  type="text"
                  placeholder="Description"
                  className="input input-bordered w-full"
                />
                <button type="submit" className="btn">
                  Submit
                </button>
              </div>
            </form>
          </Modal>

          <MdDelete
            onClick={() => setOpenModalDeleted(true)}
            cursor="pointer"
            className="text-red-500"
            size={25}
          />
          <Modal
            modalOpen={openModalDeleted}
            setModalOpen={setOpenModalDeleted}
          >
            <h3 className="text-lg">確定要刪除此任務?</h3>
            <div className="modal-action">
              <button onClick={() => handleDeleteTask(task.id)} className="btn">
                Yes
              </button>
            </div>
          </Modal>
        </td>
      </tr>
    </>
  );
};

export default Task;
