// component/AddPopup.js
import { TaskContext } from "../contexts/TasksContext";
import { useContext, useState } from "react";
import MyButton from "./MyButton";

export default function AddPopup({ onClose }) {
  let { setTasks, tasks, notification } = useContext(TaskContext);
  let [inputAdd, setInputAdd] = useState("");

  function handelAdd() {
    if (inputAdd.trim() === "") return;
    setTasks([...tasks, { task: inputAdd, id: Date.now(), done: false }]);
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
          Write your new task:
        </h2>

        <div className="flex flex-col w-full gap-3">
          <input
            className="border-2 border-gray-300 rounded-lg p-3 outline-none focus:border-[#ae7dea]"
            value={inputAdd}
            onChange={(e) => setInputAdd(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handelAdd()}
            placeholder="Enter task description..."
            autoFocus
          />

          <div className="flex justify-end gap-3">
            <MyButton
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600"
            >
              Cancel
            </MyButton>
            <MyButton onClick={handelAdd}>Add</MyButton>
          </div>
        </div>
      </div>
    </div>
  );
}
