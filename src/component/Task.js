import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { TaskContext } from "../contexts/TasksContext";
import { useContext, useState } from "react";
import ConfermationMsg from "./ConfermationMsg";
import EditPopup from "./EditPopup";

export default function Task({
  task,
  className = "",
  taskId,
  done,
  isDisabled,
}) {
  let { setTasks, tasks, notification } = useContext(TaskContext);
  let [showConfirm, setShowConfirmPopup] = useState(false);
  let [showEditPopup, setShowEditPopup] = useState(false);

  function handelDelete() {
    if (isDisabled) return;
    let newTask = tasks.filter((t) => t.id !== taskId);
    setTasks(newTask);
    setShowConfirmPopup(false);
    notification("Task deleted successfully");
  }

  function handelCheck() {
    if (isDisabled) return;
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)));
    notification(done ? "Task marked as incomplete" : "Task completed!");
  }

  return (
    <>
      <div
        className={`flex items-center justify-between my-4 text-[#aeb0bb] ${className}`}
        style={{ opacity: isDisabled ? 0.7 : 1 }}
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
            style={{ pointerEvents: isDisabled ? "none" : "auto" }}
          />
          <span
            onClick={handelCheck}
            className={`cursor-pointer text-[#333] transition duration-300 flex-1 ${
              done ? `opacity-50 line-through` : `opacity-100`
            }`}
            style={{ pointerEvents: isDisabled ? "none" : "auto" }}
          >
            {task}
          </span>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={faTrash}
            className="text-red-700 mr-3 cursor-pointer hover:text-red-800"
            onClick={() => !isDisabled && setShowConfirmPopup(true)}
            style={{ pointerEvents: isDisabled ? "none" : "auto" }}
          />
          <FontAwesomeIcon
            icon={faPen}
            className="text-gray-500 cursor-pointer hover:text-gray-700"
            onClick={() => !isDisabled && setShowEditPopup(true)}
            style={{ pointerEvents: isDisabled ? "none" : "auto" }}
          />
        </div>
      </div>

      {showConfirm && (
        <ConfermationMsg
          onCancel={() => !isDisabled && setShowConfirmPopup(false)}
          onConfirm={handelDelete}
          isDisabled={isDisabled}
        />
      )}

      {showEditPopup && (
        <EditPopup
          onClose={() => !isDisabled && setShowEditPopup(false)}
          taskId={taskId}
          isDisabled={isDisabled}
        />
      )}
    </>
  );
}
