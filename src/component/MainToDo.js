// component/MainToDo.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import MyButton from "./MyButton";
import { TaskContext } from "../contexts/TasksContext";
import { useContext, useState } from "react";
import Task from "./Task";
import AddPopup from "./AddPopup";

export default function MainToDo() {
  let { tasks, filter, setFilter } = useContext(TaskContext);
  let [showAddPopup, setShowAddPopup] = useState(false);
  let [showMenu, setShowMenu] = useState(false);

  let menuList = [
    { label: "All", value: "all" },
    { label: "Completed", value: "completed" },
    { label: "Uncompleted", value: "uncompleted" },
  ];

  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.done === true;
    if (filter === "uncompleted") return t.done === false;
    return true;
  });

  return (
    <>
      <div className="w-full max-w-[500px] m-auto min-h-screen flex flex-col justify-center p-4">
        <div className="shadow-lg flex bg-[#ae7dea] text-white p-3 items-center text-[20px] tracking-wider my-8 relative rounded-lg">
          <FontAwesomeIcon
            icon={faBars}
            className="cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          />

          {showMenu && (
            <ul className="absolute list-none top-full left-0 mt-2 bg-[#ae7dea] text-white z-10 text-[15px] w-32 shadow-lg rounded-md overflow-hidden">
              {menuList.map((e, i) => (
                <li
                  key={e.value}
                  onClick={() => {
                    setFilter(e.value);
                    setShowMenu(false);
                  }}
                  className={`p-3 cursor-pointer transition duration-200 ${
                    filter === e.value
                      ? "bg-white text-[#ae7dea] font-bold"
                      : "hover:bg-[#9b6bd1]"
                  } ${
                    i === menuList.length - 1 ? "" : "border-b border-white/20"
                  }`}
                >
                  {e.label}
                </li>
              ))}
            </ul>
          )}

          <div className="flex-1 text-center">
            <h1 className="font-semibold">Website Todo</h1>
          </div>
        </div>

        <div className="bg-white p-4 shadow-lg rounded-lg relative min-h-[200px]">
          {filteredTasks.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No tasks found</p>
          ) : (
            filteredTasks.map((t, i) => (
              <Task
                key={t.id}
                task={t.task}
                className={i === filteredTasks.length - 1 ? "mb-10" : ""}
                taskId={t.id}
                done={t.done}
              />
            ))
          )}

          <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2">
            <MyButton
              className="flex items-center gap-2"
              onClick={() => setShowAddPopup(true)}
            >
              <FontAwesomeIcon icon={faPlus} className="text-[14px]" />
              <span>New Task</span>
            </MyButton>
          </div>
        </div>
      </div>

      {showAddPopup && <AddPopup onClose={() => setShowAddPopup(false)} />}
    </>
  );
}
