"use client";

import Modal from "./Modal";
import { addTodo, getAllTodos } from "@/api";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";

const AddTask = ({ setTaskList }) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");
  const [newTaskDescription, setNewTaskDescription] = useState<string>("");

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const trimmedTaskValue = newTaskValue.trim();
    const trimmedTaskDescription = newTaskDescription.trim();

    if (trimmedTaskValue.length > 10) {
      alert("任務名稱長度不可超過10個字");
      return;
    }
    if (trimmedTaskDescription.length > 30) {
      alert("任務描述長度不可超過30個字");
      return;
    }

    const res = await addTodo({
      name: newTaskValue,
      description: newTaskDescription,
      is_completed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    setNewTaskValue("");
    setNewTaskDescription("");
    setModalOpen(false);

    console.log(res);
    //如果成功就打這支api，拿到回來的資料存進tasklist裡面
    if (res.status === "success") {
      const taskList = await getAllTodos();
      setTaskList(taskList.data);
      console.log("taskList:" ,taskList)
    }
  };
  return (
    <>
      <div>
        <button
          onClick={() => setModalOpen(true)}
          className="btn btn-primary w-full"
        >
          新增任務
        </button>
      </div>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className="font-bold text-lg">新增任務</h3>
          <div className="modal-action">
            <input
              required
              value={newTaskValue}
              onChange={(e) => setNewTaskValue(e.target.value)}
              type="text"
              placeholder="Name"
              className="input input-bordered w-full"
            />
            <input
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
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
    </>
  );
};

export default AddTask;
