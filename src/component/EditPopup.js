// component/EditPopup.js
import { TaskContext } from "../contexts/TasksContext";
import { useContext, useState, useEffect } from "react";
import MyButton from "./MyButton";

export default function EditPopup({ onClose, taskId }) {
  let { setTasks, tasks, notification } = useContext(TaskContext);
  let [inputEdit, setInputEdit] = useState("");

  useEffect(() => {
    const taskToEdit = tasks.find((t) => t.id === taskId);
    if (taskToEdit) {
      setInputEdit(taskToEdit.task);
    }
  }, [taskId, tasks]);

  function handelEdit() {
    if (inputEdit.trim() === "") return;
    setTasks(
      tasks.map((t) => (t.id === taskId ? { ...t, task: inputEdit } : t))
    );
    onClose();
    notification();
  }

  return (
    <div>
      <div
        className="bg-black opacity-70 fixed inset-0 z-10"
        onClick={onClose}
      ></div>

      <div className="bg-white fixed p-6 z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center rounded-lg shadow-xl w-11/12 max-w-md">
        <h2 className="text-[#333] font-bold tracking-wider mb-4">
          Edit your task:
        </h2>

        <div className="flex flex-col w-full gap-3">
          <input
            className="border-2 border-gray-300 rounded-lg p-3 outline-none focus:border-[#ae7dea]"
            value={inputEdit}
            onChange={(e) => setInputEdit(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handelEdit()}
            autoFocus
          />

          <div className="flex justify-end gap-3">
            <MyButton
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600"
            >
              Cancel
            </MyButton>
            <MyButton onClick={handelEdit}>Save</MyButton>
          </div>
        </div>
      </div>
    </div>
  );
}
