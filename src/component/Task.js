// component/Task.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { TaskContext } from "../contexts/TasksContext";
import { useContext, useState } from "react";
import ConfermationMsg from "./ConfermationMsg";
import EditPopup from "./EditPopup";

export default function Task({ task, className = "", taskId, done }) {
  let { setTasks, tasks, notification } = useContext(TaskContext);
  let [showConfirm, setShowConfirmPopup] = useState(false);
  let [showEditPopup, setShowEditPopup] = useState(false);

  function handelDelete() {
    let newTask = tasks.filter((t) => t.id !== taskId);
    setTasks(newTask);
    setShowConfirmPopup(false);
    notification();
  }

  function handelCheck() {
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)));
    notification();
  }

  return (
    <>
      <div
        className={`flex items-center justify-between my-4 text-[#aeb0bb] ${className}`}
      >
        <div className="flex items-center flex-1">
          <FontAwesomeIcon
            icon={faCheck}
            className={`mr-3 text-green-700 cursor-pointer rounded-full transition duration-300 p-1 ${
              done
                ? `bg-green-700 text-white opacity-100`
                : `opacity-20 hover:opacity-40`
            }`}
            onClick={handelCheck}
          />
          <span
            onClick={handelCheck}
            className={`cursor-pointer text-[#333] transition duration-300 flex-1 ${
              done ? `opacity-50 line-through` : `opacity-100`
            }`}
          >
            {task}
          </span>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={faTrash}
            className="text-red-700 mr-3 cursor-pointer hover:text-red-800"
            onClick={() => setShowConfirmPopup(true)}
          />
          <FontAwesomeIcon
            icon={faPen}
            className="text-gray-500 cursor-pointer hover:text-gray-700"
            onClick={() => setShowEditPopup(true)}
          />
        </div>
      </div>

      {showConfirm && (
        <ConfermationMsg
          onCancel={() => setShowConfirmPopup(false)}
          onConfirm={handelDelete}
        />
      )}

      {showEditPopup && (
        <EditPopup onClose={() => setShowEditPopup(false)} taskId={taskId} />
      )}
    </>
  );
}
